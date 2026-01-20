import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { StandingToolbar } from "@/components/ui/standing-toolbar";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { BlockNoteEditor } from "@/components/editors/BlockNoteEditor";
import { Save, Loader2, FileDown, FileUp, ChevronLeft, ChevronRight, List, Brain, Plus, Trash2, Sparkles, GraduationCap, RotateCcw, RefreshCw, Share2, Bookmark, BookOpen, Eye, X, Settings } from "lucide-react";
import { toast } from "sonner";
import { useAutoSave } from "@/hooks/use-auto-save";
import { ImportToBlockNoteModal } from "@/components/editor/ImportToBlockNoteModal";
import { ExportDropdown } from "@/components/editor/ExportDropdown";
import { Block } from "@blocknote/core";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Collaboration features removed

const SUBJECTS = [
  { value: "biology", label: "Biology" },
  { value: "chemistry", label: "Chemistry" },
  { value: "physics", label: "Physics" },
  { value: "math-aa", label: "Math AA" },
  { value: "math-ai", label: "Math AI" },
  { value: "economics", label: "Economics" },
  { value: "business", label: "Business Management" },
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "english", label: "English A" },
  { value: "language-b", label: "Language B" },
  { value: "visual-arts", label: "Visual Arts" },
  { value: "tok", label: "Theory of Knowledge" },
  { value: "ee", label: "Extended Essay" },
  { value: "cas", label: "CAS" },
  { value: "other", label: "Other" },
];

interface Flashcard {
  id: string;
  front: string;
  back: string;
  deck_id: string;
  source_block_id?: string;
  interval: number;
  repetitions: number;
  ease_factor: number;
  next_review_date: string;
}

interface FlashcardDeck {
  id: string;
  title: string;
  description?: string;
  note_id?: string;
  flashcards?: Flashcard[];
}

export default function NotesEditor() {
  const navigate = useNavigate();
  const { noteId: routeNoteId } = useParams<{ noteId: string }>();
  const { user } = useAuth();
  const { flags } = useFeatureFlags();
  const isMobile = useIsMobile();
  const [content, setContent] = useState("");
  const [noteId, setNoteId] = useState<string | null>(routeNoteId || null);
  const [noteTitle, setNoteTitle] = useState("Untitled Note");
  const [noteSubject, setNoteSubject] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [blockNoteEditor, setBlockNoteEditor] = useState<any>(null);
  const [commandHandler, setCommandHandler] = useState<((command: string, selectedText?: string) => void) | null>(null);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  
  // Collaboration disabled
  const ydoc = null;
  const provider = null;
  const isConnected = false;
  const activeUsers: any[] = [];
  const collaborators: any[] = [];
  const isOwner = true;
  const canEdit = true;

  // Get user color for collaboration
  const getUserColor = (userId: string): string => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };
  
  // Panel states
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(() => {
    const saved = localStorage.getItem('notes-left-panel-collapsed');
    return saved === 'true';
  });
  const [leftPanelSize, setLeftPanelSize] = useState(() => {
    const saved = localStorage.getItem('notes-left-panel-size');
    return saved ? parseFloat(saved) : 20;
  });
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(() => {
    const saved = localStorage.getItem('notes-right-panel-collapsed');
    return saved === 'true';
  });
  const [rightPanelSize, setRightPanelSize] = useState(() => {
    const saved = localStorage.getItem('notes-right-panel-size');
    return saved ? parseFloat(saved) : 25;
  });

  // Flashcard states
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [showCreateDeckDialog, setShowCreateDeckDialog] = useState(false);
  const [showAddCardDialog, setShowAddCardDialog] = useState(false);
  const [newDeckTitle, setNewDeckTitle] = useState("");
  const [newCardFront, setNewCardFront] = useState("");
  const [newCardBack, setNewCardBack] = useState("");
  const [newCardHeadingId, setNewCardHeadingId] = useState<string | null>(null);
  const [generatingCards, setGeneratingCards] = useState(false);
  const [convertingCards, setConvertingCards] = useState(false);
  
  // Subject picker dialog
  const [showSubjectDialog, setShowSubjectDialog] = useState(false);
  const [previousTitle, setPreviousTitle] = useState("Untitled Note");
  
  // TOC-aware flashcard generation
  const [selectedHeadingForCards, setSelectedHeadingForCards] = useState<string | null>(null);
  const [generatingCardsForHeading, setGeneratingCardsForHeading] = useState<string | null>(null);
  const [generatingAllCards, setGeneratingAllCards] = useState(false);
  
  // Flashcard preview modal
  const [previewingCard, setPreviewingCard] = useState<Flashcard | null>(null);
  const [previewFlipped, setPreviewFlipped] = useState(false);

  // Extract headings from content for table of contents
  const tableOfContents = useMemo(() => {
    if (!blockNoteEditor?.document) return [];
    
    const headings: Array<{ id: string; level: number; text: string }> = [];
    
    blockNoteEditor.document.forEach((block: any, index: number) => {
      if (block.type === 'heading') {
        const level = block.props?.level || 1;
        let text = '';
        
        if (block.content && Array.isArray(block.content)) {
          text = block.content
            .map((item: any) => {
              if (typeof item === 'string') return item;
              if (item && typeof item === 'object' && 'text' in item) {
                return item.text;
              }
              return '';
            })
            .join('')
            .trim();
        }
        
        headings.push({
          id: block.id || `heading-${index}`,
          level,
          text: text || '(Untitled)',
        });
      }
    });
    
    return headings;
  }, [blockNoteEditor?.document]);

  // Find :: patterns in content for explicit flashcard conversion
  const flashcardPatterns = useMemo(() => {
    if (!blockNoteEditor?.document) return [];
    
    const patterns: Array<{ blockId: string; front: string; back: string; fullText: string }> = [];
    
    const extractText = (content: any[]): string => {
      return content
        .map((item: any) => {
          if (typeof item === 'string') return item;
          if (item && typeof item === 'object' && 'text' in item) {
            return item.text;
          }
          return '';
        })
        .join('');
    };
    
    blockNoteEditor.document.forEach((block: any) => {
      if (block.content && Array.isArray(block.content)) {
        const text = extractText(block.content);
        const match = text.match(/^(.+?)::(.+)$/);
        if (match) {
          patterns.push({
            blockId: block.id,
            front: match[1].trim(),
            back: match[2].trim(),
            fullText: text,
          });
        }
      }
    });
    
    return patterns;
  }, [blockNoteEditor?.document]);

  useEffect(() => {
    localStorage.setItem('notes-left-panel-collapsed', leftPanelCollapsed.toString());
  }, [leftPanelCollapsed]);

  useEffect(() => {
    localStorage.setItem('notes-left-panel-size', leftPanelSize.toString());
  }, [leftPanelSize]);

  useEffect(() => {
    localStorage.setItem('notes-right-panel-collapsed', rightPanelCollapsed.toString());
  }, [rightPanelCollapsed]);

  useEffect(() => {
    localStorage.setItem('notes-right-panel-size', rightPanelSize.toString());
  }, [rightPanelSize]);

  const scrollToHeading = (blockId: string) => {
    if (!blockNoteEditor) return;
    
    try {
      const blockElement = document.querySelector(`[data-id="${blockId}"]`);
      if (blockElement) {
        blockElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } catch (error) {
      console.error("Failed to scroll to heading:", error);
    }
  };

  useEffect(() => {
    if (routeNoteId) {
      setNoteId(routeNoteId);
      loadNote(routeNoteId);
    }
    loadDecks();
  }, [user, routeNoteId]);

  const loadNote = async (id: string) => {
    try {
      // If not logged in, use localStorage only
      if (!user) {
        const savedNotes = localStorage.getItem('guest_notes');
        if (savedNotes) {
          const notes = JSON.parse(savedNotes);
          const note = notes.find((n: any) => n.id === id);
          if (note) {
            setContent(note.content || '');
            setNoteTitle(note.title || 'Untitled Note');
            setNoteSubject(note.subject || '');
          }
        }
        setLoading(false);
        return;
      }

      // Try to load from Supabase
      const { data: noteData, error } = await supabase
        .from("notes")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Supabase error:", error);
        toast.error("Failed to load note");
        navigate('/work/notes');
        return;
      }

      if (noteData) {
        setNoteTitle(noteData.title || 'Untitled Note');
        // Content is stored as JSONB, convert to string for editor
        setContent(typeof noteData.content === 'string' 
          ? noteData.content 
          : JSON.stringify(noteData.content));
      }
    } catch (error: any) {
      console.error("Failed to load note:", error);
      toast.error("Failed to load note");
      navigate('/work/notes');
    } finally {
      setLoading(false);
    }
  };

  const loadNotes = async () => {
    // Deprecated - notes are now loaded by ID only
    setLoading(false);
  };

  const loadDecks = async () => {
    try {
      // If no user, load from localStorage (filter by current note_id)
      if (!user) {
        const savedDecks = localStorage.getItem('flashcard_decks');
        if (savedDecks) {
          const allDecks = JSON.parse(savedDecks);
          // Filter to only show decks linked to this note
          const decksData = noteId 
            ? allDecks.filter((d: FlashcardDeck) => d.note_id === noteId)
            : allDecks;
          setDecks(decksData || []);
          if (decksData && decksData.length > 0 && !selectedDeckId) {
            setSelectedDeckId(decksData[0].id);
          }
        }
        return;
      }

      // For logged in users, only load decks linked to this note
      const query = (supabase as any)
        .from("flashcard_decks")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });
      
      // Filter by note_id if we have one
      if (noteId) {
        query.eq("note_id", noteId);
      }

      const { data, error } = await query;

      if (error && error.code !== 'PGRST116') {
        console.error("Failed to load decks:", error);
        return;
      }

      setDecks(data || []);
      if (data && data.length > 0 && !selectedDeckId) {
        setSelectedDeckId(data[0].id);
      }
    } catch (error) {
      console.error("Failed to load decks:", error);
    }
  };

  const loadFlashcards = useCallback(async () => {
    if (!selectedDeckId) {
      setFlashcards([]);
      return;
    }

    try {
      // If no user, load from localStorage
      if (!user) {
        const savedCards = localStorage.getItem(`flashcards_${selectedDeckId}`);
        if (savedCards) {
          setFlashcards(JSON.parse(savedCards) || []);
        } else {
          setFlashcards([]);
        }
        return;
      }

      const { data, error } = await (supabase as any)
        .from("flashcards")
        .select("*")
        .eq("deck_id", selectedDeckId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load flashcards:", error);
        return;
      }

      setFlashcards(data || []);
    } catch (error) {
      console.error("Failed to load flashcards:", error);
    }
  }, [selectedDeckId, user]);

  useEffect(() => {
    loadFlashcards();
  }, [loadFlashcards]);

  const autoSaveNotes = async () => {
    if (!noteId) return;
    
    try {
      // Save to localStorage as backup (works for all users)
      if (!user) {
        const savedNotes = localStorage.getItem('guest_notes');
        const notes = savedNotes ? JSON.parse(savedNotes) : [];
        const noteIndex = notes.findIndex((n: any) => n.id === noteId);
        if (noteIndex >= 0) {
          notes[noteIndex].title = noteTitle;
          notes[noteIndex].subject = noteSubject;
          notes[noteIndex].content = content;
          notes[noteIndex].updated_at = new Date().toISOString();
        } else {
          // Note doesn't exist, create it
          notes.push({
            id: noteId,
            title: noteTitle,
            subject: noteSubject || 'other',
            content: content,
            user_id: 'guest',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
        localStorage.setItem('guest_notes', JSON.stringify(notes));
        return;
      }
      
      // Try to save to Supabase only if logged in
      if (user?.id && noteId) {
        await supabase
          .from("notes")
          .update({ 
            title: noteTitle,
            subject: noteSubject || 'other',
            content: content,
            updated_at: new Date().toISOString()
          })
          .eq("id", noteId);
      }
    } catch (error: any) {
      console.error("Auto-save failed:", error);
    }
  };
  
  // Handle title change and trigger subject dialog
  const handleTitleChange = (newTitle: string) => {
    setNoteTitle(newTitle);
    
    // If title changed from default "Untitled Note" and subject is not set, show dialog
    if (previousTitle === "Untitled Note" && newTitle !== "Untitled Note" && !noteSubject) {
      // Delay showing dialog to allow typing to complete
      setTimeout(() => {
        if (newTitle.trim() && newTitle !== "Untitled Note") {
          setShowSubjectDialog(true);
        }
      }, 1500);
    }
  };
  
  // Handle title blur - check if should show subject dialog
  const handleTitleBlur = () => {
    if (noteTitle !== "Untitled Note" && noteTitle.trim() && !noteSubject) {
      setShowSubjectDialog(true);
      setPreviousTitle(noteTitle);
    }
  };
  const { debouncedSave } = useAutoSave({
    onSave: autoSaveNotes,
    delay: 2000,
  });

  // Auto-save on content, title, or subject changes
  useEffect(() => {
    if ((content || noteTitle !== "Untitled Note" || noteSubject) && !loading) {
      debouncedSave();
    }
  }, [content, noteTitle, noteSubject, debouncedSave, loading]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await autoSaveNotes();
      window.gtag?.('event', 'save_notes', {
        user_id: user?.id
      });
      toast.success("Notes saved successfully!");
    } catch (error: any) {
      toast.error("Failed to save notes");
    } finally {
      setSaving(false);
    }
  };

  // Auto-create a deck with the given title (used for auto-generating decks from headings)
  const autoCreateDeck = async (title: string): Promise<string | null> => {
    try {
      // If no user, save to localStorage
      if (!user) {
        const newDeck = {
          id: `local_deck_${Date.now()}`,
          title: title.trim(),
          created_at: new Date().toISOString(),
        };
        const updatedDecks = [newDeck, ...decks];
        setDecks(updatedDecks);
        localStorage.setItem('flashcard_decks', JSON.stringify(updatedDecks));
        setSelectedDeckId(newDeck.id);
        return newDeck.id;
      }

      const { data, error } = await (supabase as any)
        .from("flashcard_decks")
        .insert({
          user_id: user.id,
          title: title.trim(),
          note_id: noteId,
        })
        .select()
        .single();

      if (error) throw error;

      setDecks([data, ...decks]);
      setSelectedDeckId(data.id);
      return data.id;
    } catch (error) {
      console.error("Failed to auto-create deck:", error);
      return null;
    }
  };

  const createDeck = async () => {
    if (!newDeckTitle.trim()) return;

    const deckId = await autoCreateDeck(newDeckTitle.trim());
    if (deckId) {
      setNewDeckTitle("");
      setShowCreateDeckDialog(false);
      toast.success("Deck created!");
    } else {
      toast.error("Failed to create deck");
    }
  };

  const deleteDeck = async (deckId: string) => {
    try {
      // If no user, delete from localStorage
      if (!user) {
        const updatedDecks = decks.filter(d => d.id !== deckId);
        setDecks(updatedDecks);
        localStorage.setItem('flashcard_decks', JSON.stringify(updatedDecks));
        localStorage.removeItem(`flashcards_${deckId}`);
        if (selectedDeckId === deckId) {
          setSelectedDeckId(updatedDecks.length > 0 ? updatedDecks[0].id : null);
        }
        toast.success("Deck deleted");
        return;
      }

      const { error } = await (supabase as any)
        .from("flashcard_decks")
        .delete()
        .eq("id", deckId);

      if (error) throw error;

      setDecks(decks.filter(d => d.id !== deckId));
      if (selectedDeckId === deckId) {
        setSelectedDeckId(decks.length > 1 ? decks.find(d => d.id !== deckId)?.id || null : null);
      }
      toast.success("Deck deleted");
    } catch (error) {
      console.error("Failed to delete deck:", error);
      toast.error("Failed to delete deck");
    }
  };

  const addCard = async () => {
    if (!newCardFront.trim() || !newCardBack.trim() || !selectedDeckId) return;

    try {
      // If no user, save to localStorage
      if (!user) {
        const newCard = {
          id: `local_card_${Date.now()}`,
          deck_id: selectedDeckId,
          front: newCardFront.trim(),
          back: newCardBack.trim(),
          heading_id: newCardHeadingId || undefined,
          created_at: new Date().toISOString(),
          interval: 0,
          repetitions: 0,
          ease_factor: 2.5,
          next_review_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        const updatedCards = [newCard, ...flashcards];
        setFlashcards(updatedCards);
        localStorage.setItem(`flashcards_${selectedDeckId}`, JSON.stringify(updatedCards));
        setNewCardFront("");
        setNewCardBack("");
        setNewCardHeadingId(null);
        setShowAddCardDialog(false);
        toast.success("Card added!");
        return;
      }

      const { data, error } = await (supabase as any)
        .from("flashcards")
        .insert({
          deck_id: selectedDeckId,
          front: newCardFront.trim(),
          back: newCardBack.trim(),
          heading_id: newCardHeadingId || null,
        })
        .select()
        .single();

      if (error) throw error;

      setFlashcards([data, ...flashcards]);
      setNewCardFront("");
      setNewCardBack("");
      setNewCardHeadingId(null);
      setShowAddCardDialog(false);
      toast.success("Card added!");
    } catch (error) {
      console.error("Failed to add card:", error);
      toast.error("Failed to add card");
    }
  };

  const deleteCard = async (cardId: string) => {
    try {
      // If no user, delete from localStorage
      if (!user) {
        const updatedCards = flashcards.filter(c => c.id !== cardId);
        setFlashcards(updatedCards);
        if (selectedDeckId) {
          localStorage.setItem(`flashcards_${selectedDeckId}`, JSON.stringify(updatedCards));
        }
        toast.success("Card deleted");
        return;
      }

      const { error } = await (supabase as any)
        .from("flashcards")
        .delete()
        .eq("id", cardId);

      if (error) throw error;

      setFlashcards(flashcards.filter(c => c.id !== cardId));
      toast.success("Card deleted");
    } catch (error) {
      console.error("Failed to delete card:", error);
      toast.error("Failed to delete card");
    }
  };

  const generateFlashcardsFromAI = async () => {
    if (!selectedDeckId || !blockNoteEditor?.document) {
      toast.error("Please select a deck first");
      return;
    }

    setGeneratingCards(true);
    try {
      // Extract text from all blocks
      const extractText = (blocks: any[]): string => {
        return blocks.map(block => {
          let text = '';
          if (block.content && Array.isArray(block.content)) {
            text = block.content
              .map((item: any) => {
                if (typeof item === 'string') return item;
                if (item && typeof item === 'object' && 'text' in item) {
                  return item.text;
                }
                return '';
              })
              .join('');
          }
          if (block.children && Array.isArray(block.children)) {
            text += '\n' + extractText(block.children);
          }
          return text;
        }).filter(t => t.trim()).join('\n');
      };

      const noteContent = extractText(blockNoteEditor.document);
      
      if (!noteContent.trim()) {
        toast.error("No content to generate flashcards from");
        return;
      }

      const { data, error } = await supabase.functions.invoke('generate-flashcards', {
        body: { content: noteContent, count: 10 }
      });

      if (error) throw error;

      if (!data?.flashcards || data.flashcards.length === 0) {
        toast.error("No flashcards could be generated");
        return;
      }

      // Insert generated flashcards
      const cardsToInsert = data.flashcards.map((card: { front: string; back: string }) => ({
        deck_id: selectedDeckId,
        front: card.front,
        back: card.back,
      }));

      const { data: insertedCards, error: insertError } = await (supabase as any)
        .from("flashcards")
        .insert(cardsToInsert)
        .select();

      if (insertError) throw insertError;

      setFlashcards([...(insertedCards || []), ...flashcards]);
      toast.success(`Generated ${insertedCards?.length || 0} flashcards!`);
    } catch (error) {
      console.error("Failed to generate flashcards:", error);
      toast.error("Failed to generate flashcards");
    } finally {
      setGeneratingCards(false);
    }
  };

  const convertPatternsToCards = async () => {
    if (!selectedDeckId || flashcardPatterns.length === 0) {
      toast.error("No :: patterns found to convert");
      return;
    }

    setConvertingCards(true);
    try {
      const cardsToInsert = flashcardPatterns.map(pattern => ({
        deck_id: selectedDeckId,
        front: pattern.front,
        back: pattern.back,
        source_block_id: pattern.blockId,
      }));

      const { data: insertedCards, error } = await (supabase as any)
        .from("flashcards")
        .insert(cardsToInsert)
        .select();

      if (error) throw error;

      setFlashcards([...(insertedCards || []), ...flashcards]);
      toast.success(`Converted ${insertedCards?.length || 0} patterns to flashcards!`);
    } catch (error) {
      console.error("Failed to convert patterns:", error);
      toast.error("Failed to convert patterns");
    } finally {
      setConvertingCards(false);
    }
  };

  // Get content under a specific heading until the next heading of same or higher level
  const getContentUnderHeading = (headingId: string): string => {
    if (!blockNoteEditor?.document) return '';
    
    const blocks = blockNoteEditor.document;
    let startIndex = -1;
    let headingLevel = 0;
    
    // Find the heading
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].id === headingId) {
        startIndex = i;
        headingLevel = blocks[i].props?.level || 1;
        break;
      }
    }
    
    if (startIndex === -1) return '';
    
    // Extract content until next heading of same or higher level
    const contentBlocks = [];
    for (let i = startIndex + 1; i < blocks.length; i++) {
      const block = blocks[i];
      if (block.type === 'heading') {
        const currentLevel = block.props?.level || 1;
        if (currentLevel <= headingLevel) break;
      }
      contentBlocks.push(block);
    }
    
    // Extract text from blocks
    const extractText = (blocks: any[]): string => {
      return blocks.map(block => {
        let text = '';
        if (block.content && Array.isArray(block.content)) {
          text = block.content
            .map((item: any) => {
              if (typeof item === 'string') return item;
              if (item && typeof item === 'object' && 'text' in item) {
                return item.text;
              }
              return '';
            })
            .join('');
        }
        if (block.children && Array.isArray(block.children)) {
          text += '\n' + extractText(block.children);
        }
        return text;
      }).filter(t => t.trim()).join('\n');
    };
    
    return extractText(contentBlocks);
  };

  // Generate flashcards for content under a specific heading
  const generateFlashcardsForHeading = async (headingId: string, headingText: string) => {
    let deckId = selectedDeckId;
    
    // Auto-create deck using heading text if no deck selected
    if (!deckId) {
      const newDeckId = await autoCreateDeck(headingText || noteTitle || "Flashcards");
      if (!newDeckId) {
        toast.error("Failed to create deck");
        return;
      }
      deckId = newDeckId;
      toast.success(`Created deck "${headingText || noteTitle || "Flashcards"}"`);
    }

    setGeneratingCardsForHeading(headingId);
    try {
      const content = getContentUnderHeading(headingId);
      
      if (!content.trim()) {
        toast.error("No content found under this heading");
        return;
      }

      const { data, error } = await supabase.functions.invoke('generate-flashcards', {
        body: { content: `Topic: ${headingText}\n\n${content}`, count: 5 }
      });

      if (error) throw error;

      if (!data?.flashcards || data.flashcards.length === 0) {
        toast.error("No flashcards could be generated");
        return;
      }

      // Insert generated flashcards - handle both guest and signed-in users
      if (!user) {
        // Save to localStorage for guests
        const newCards = data.flashcards.map((card: { front: string; back: string }) => ({
          id: `local_card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          deck_id: deckId,
          front: card.front,
          back: card.back,
          source_block_id: headingId,
          interval: 0,
          repetitions: 0,
          ease_factor: 2.5,
          next_review_date: new Date().toISOString(),
        }));
        const updatedCards = [...newCards, ...flashcards];
        setFlashcards(updatedCards);
        localStorage.setItem(`flashcards_${deckId}`, JSON.stringify(updatedCards));
        toast.success(`Generated ${newCards.length} flashcards for "${headingText}"!`);
      } else {
        const cardsToInsert = data.flashcards.map((card: { front: string; back: string }) => ({
          deck_id: deckId,
          front: card.front,
          back: card.back,
          source_block_id: headingId,
        }));

        const { data: insertedCards, error: insertError } = await (supabase as any)
          .from("flashcards")
          .insert(cardsToInsert)
          .select();

        if (insertError) throw insertError;

        setFlashcards([...(insertedCards || []), ...flashcards]);
        toast.success(`Generated ${insertedCards?.length || 0} flashcards for "${headingText}"!`);
      }
    } catch (error) {
      console.error("Failed to generate flashcards for heading:", error);
      toast.error("Failed to generate flashcards");
    } finally {
      setGeneratingCardsForHeading(null);
    }
  };

  // Generate flashcards for all headings (preventing duplicates)
  const generateFlashcardsForAllHeadings = async () => {
    let deckId = selectedDeckId;
    
    // Auto-create deck using note title if no deck selected
    if (!deckId) {
      if (tableOfContents.length === 0) {
        toast.error("No headings found in your notes");
        return;
      }
      const newDeckId = await autoCreateDeck(noteTitle || "Flashcards");
      if (!newDeckId) {
        toast.error("Failed to create deck");
        return;
      }
      deckId = newDeckId;
      toast.success(`Created deck "${noteTitle || "Flashcards"}"`);
    }
    
    if (tableOfContents.length === 0) {
      toast.error("No headings found in your notes");
      return;
    }

    setGeneratingAllCards(true);
    let totalGenerated = 0;
    const allNewCards: Flashcard[] = [];

    try {
      for (const heading of tableOfContents) {
        // Check if this heading already has flashcards
        const existingCards = flashcards.filter(c => c.source_block_id === heading.id);
        if (existingCards.length > 0) {
          // Skip headings that already have cards
          continue;
        }

        const content = getContentUnderHeading(heading.id);
        if (!content.trim()) continue;

        try {
          const { data, error } = await supabase.functions.invoke('generate-flashcards', {
            body: { content: `Topic: ${heading.text}\n\n${content}`, count: 3 }
          });

          if (error || !data?.flashcards) continue;

          // Check for duplicate fronts before inserting
          const existingFronts = new Set([
            ...flashcards.map(c => c.front.toLowerCase().trim()),
            ...allNewCards.map(c => c.front.toLowerCase().trim())
          ]);

          const uniqueCards = data.flashcards.filter(
            (card: { front: string; back: string }) => 
              !existingFronts.has(card.front.toLowerCase().trim())
          );

          if (uniqueCards.length === 0) continue;

          // Handle both guest and signed-in users
          if (!user) {
            // Save to localStorage for guests
            const newCards = uniqueCards.map((card: { front: string; back: string }) => ({
              id: `local_card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              deck_id: deckId,
              front: card.front,
              back: card.back,
              source_block_id: heading.id,
              interval: 0,
              repetitions: 0,
              ease_factor: 2.5,
              next_review_date: new Date().toISOString(),
            }));
            allNewCards.push(...newCards);
            totalGenerated += newCards.length;
          } else {
            const cardsToInsert = uniqueCards.map((card: { front: string; back: string }) => ({
              deck_id: deckId,
              front: card.front,
              back: card.back,
              source_block_id: heading.id,
            }));

            const { data: insertedCards, error: insertError } = await (supabase as any)
              .from("flashcards")
              .insert(cardsToInsert)
              .select();

            if (!insertError && insertedCards) {
              allNewCards.push(...insertedCards);
              totalGenerated += insertedCards.length;
            }
          }
        } catch {
          // Continue to next heading if one fails
        }
      }

      // Save to localStorage for guests
      if (!user && allNewCards.length > 0) {
        const updatedCards = [...allNewCards, ...flashcards];
        localStorage.setItem(`flashcards_${deckId}`, JSON.stringify(updatedCards));
      }

      setFlashcards([...allNewCards, ...flashcards]);
      toast.success(`Generated ${totalGenerated} flashcards across all headings!`);
    } catch (error) {
      console.error("Failed to generate flashcards:", error);
      toast.error("Failed to generate flashcards");
    } finally {
      setGeneratingAllCards(false);
    }
  };

  // Group flashcards by heading
  const flashcardsByHeading = useMemo(() => {
    const grouped: Record<string, Flashcard[]> = { ungrouped: [] };
    
    // Initialize with all headings (including those without flashcards)
    tableOfContents.forEach(heading => {
      grouped[heading.id] = [];
    });
    
    // Sort flashcards into groups
    flashcards.forEach(card => {
      if (card.source_block_id && grouped[card.source_block_id]) {
        grouped[card.source_block_id].push(card);
      } else {
        grouped.ungrouped.push(card);
      }
    });
    
    return grouped;
  }, [flashcards, tableOfContents]);

  const selectedDeck = decks.find(d => d.id === selectedDeckId);
  const dueCards = flashcards.filter(c => new Date(c.next_review_date) <= new Date());

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm shrink-0 z-50">
        <div className={`container mx-auto ${isMobile ? 'px-3 py-2' : 'px-4 py-4'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <BackButton
                fallbackPath="/work/notes"
                size="sm"
                label={!isMobile ? "Back" : undefined}
                className="gap-1 md:gap-2"
              />
              <div>
                <Input
                  value={noteTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  onBlur={handleTitleBlur}
                  className="text-lg md:text-2xl font-semibold border-0 px-0 focus-visible:ring-0 h-auto"
                  placeholder="Note title..."
                />
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              {!isMobile && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/account')}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowImportModal(true)}
                    className="gap-2"
                  >
                    <FileUp className="h-4 w-4" />
                    Import
                  </Button>
                  <ExportDropdown
                    blocks={blockNoteEditor?.document || []}
                    title="My Notes"
                    pageCount={1}
                  />
                  
                  {/* Collaboration UI removed */}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {isMobile ? (
          /* Mobile: Full-width editor only */
          <div className="h-full overflow-y-auto">
            <div className="container mx-auto px-3 py-4">
              <div className="bg-card rounded-lg shadow-soft border border-border p-4">
                {flags.standingToolbar && (
                  <div className="mb-4">
                    <StandingToolbar 
                      onCommand={commandHandler || (() => {})} 
                      editor={editorInstance}
                    />
                  </div>
                )}
                <BlockNoteEditor
                  initialContent={content}
                  onChange={setContent}
                  placeholder="Start writing your notes..."
                  disablePagination={true}
                  onEditorReady={setBlockNoteEditor}
                  collaboration={ydoc && provider ? {
                    ydoc,
                    provider,
                    user: user ? {
                      name: user.email || 'Anonymous',
                      color: getUserColor(user.id),
                    } : undefined,
                  } : undefined}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Desktop: Resizable three-column layout */
          <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Table of Contents */}
          {!leftPanelCollapsed && (
            <>
              <ResizablePanel
                defaultSize={leftPanelSize}
                minSize={15}
                maxSize={35}
                onResize={(size) => setLeftPanelSize(size)}
                className="relative"
              >
                <div className="h-full flex flex-col bg-muted/30 border-r">
                  <div className="p-4 border-b bg-card/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <List className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-sm">Table of Contents</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setLeftPanelCollapsed(true)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <ScrollArea className="flex-1 p-4">
                    {tableOfContents.length === 0 ? (
                      <div className="text-sm text-muted-foreground text-center py-8">
                        <List className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No headings yet</p>
                        <p className="text-xs mt-1">Add headings to create a table of contents</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {tableOfContents.map((heading, index) => (
                          <button
                            key={`${heading.id}-${index}`}
                            onClick={() => scrollToHeading(heading.id)}
                            className="w-full text-left px-3 py-2 rounded-md hover:bg-accent/50 transition-colors group text-sm"
                            style={{
                              paddingLeft: `${(heading.level - 1) * 12 + 12}px`,
                            }}
                          >
                            <span className={`block truncate ${
                              heading.level === 1 ? 'font-semibold' : 
                              heading.level === 2 ? 'font-medium' : 
                              'font-normal text-muted-foreground'
                            }`}>
                              {heading.text || '(Untitled)'}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
            </>
          )}

          {/* Main Editor Panel */}
          <ResizablePanel defaultSize={leftPanelCollapsed && rightPanelCollapsed ? 100 : leftPanelCollapsed ? 75 : rightPanelCollapsed ? 80 : 55}>
            <div className="h-full flex flex-col relative">
              {/* Toggle button for collapsed left panel */}
              {leftPanelCollapsed && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 left-4 z-10 h-8 w-8 bg-card/80 backdrop-blur-sm border shadow-sm"
                  onClick={() => setLeftPanelCollapsed(false)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}

              {/* Toggle button for collapsed right panel */}
              {rightPanelCollapsed && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 h-8 w-8 bg-card/80 backdrop-blur-sm border shadow-sm"
                  onClick={() => setRightPanelCollapsed(false)}
                  title="Show Flashcards"
                >
                  <Brain className="h-4 w-4" />
                </Button>
              )}

              <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-4 py-8">
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-card rounded-lg shadow-soft border border-border p-6">
                      {flags.standingToolbar && (
                        <div className="mb-4">
                          <StandingToolbar 
                            onCommand={commandHandler || (() => {})} 
                            editor={editorInstance}
                          />
                        </div>
                      )}
                      <BlockNoteEditor
                        initialContent={content}
                        onChange={setContent}
                        placeholder="Start writing your notes... Use term::definition to create flashcards"
                        disablePagination={true}
                        onEditorReady={setBlockNoteEditor}
                        collaboration={ydoc && provider ? {
                          ydoc,
                          provider,
                          user: user ? {
                            name: user.email || 'Anonymous',
                            color: getUserColor(user.id),
                          } : undefined,
                        } : undefined}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>

          {/* Right Panel - Flashcards */}
          {!rightPanelCollapsed && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel
                defaultSize={rightPanelSize}
                minSize={20}
                maxSize={40}
                onResize={(size) => setRightPanelSize(size)}
                className="relative"
              >
                <div className="h-full flex flex-col bg-muted/30 border-l">
                  <div className="p-4 border-b bg-card/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-sm">Flashcards</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setRightPanelCollapsed(true)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-3 border-b space-y-2">
                    {/* Action Buttons - Add Card and Generate */}
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 min-w-0 text-xs h-8"
                              onClick={() => setShowAddCardDialog(true)}
                            >
                              <Plus className="h-3 w-3 shrink-0" />
                              <span className="ml-1 truncate hidden min-[200px]:inline">Add Card</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Add flashcard</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {tableOfContents.length > 0 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1 min-w-0 text-xs h-8"
                                onClick={generateFlashcardsForAllHeadings}
                                disabled={generatingAllCards}
                              >
                                {generatingAllCards ? (
                                  <Loader2 className="h-3 w-3 shrink-0 animate-spin" />
                                ) : (
                                  <Sparkles className="h-3 w-3 shrink-0" />
                                )}
                                <span className="ml-1 truncate hidden min-[200px]:inline">Generate</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Generate flashcards for all headings</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>

                    {/* :: Pattern Converter */}
                    {flashcardPatterns.length > 0 && selectedDeckId && (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full text-xs h-7"
                        onClick={convertPatternsToCards}
                        disabled={convertingCards}
                      >
                        {convertingCards ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <RotateCcw className="h-3 w-3 mr-1" />
                        )}
                        Convert {flashcardPatterns.length} :: patterns
                      </Button>
                    )}
                  </div>
                  
                  <ScrollArea className="flex-1 p-3">
                    {tableOfContents.length === 0 && flashcards.length === 0 ? (
                      <div className="text-sm text-muted-foreground text-center py-8">
                        <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No flashcards yet</p>
                        <p className="text-xs mt-1">Add headings to your notes to organize flashcards</p>
                        <p className="text-xs mt-1">Use <code className="bg-muted px-1 rounded">term::definition</code> syntax</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Flashcards grouped by heading */}
                        {tableOfContents.map((heading) => {
                          const headingCards = flashcardsByHeading[heading.id] || [];
                          return (
                            <div key={heading.id} className="space-y-1">
                              <div 
                                className="flex items-center justify-between gap-2 py-1 px-2 rounded bg-muted/50"
                                style={{ paddingLeft: `${(heading.level - 1) * 8 + 8}px` }}
                              >
                                <span className="text-xs font-medium truncate flex-1">
                                  {heading.text}
                                  {headingCards.length > 0 && (
                                    <span className="text-muted-foreground ml-1">({headingCards.length})</span>
                                  )}
                                </span>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 shrink-0"
                                        onClick={() => generateFlashcardsForHeading(heading.id, heading.text)}
                                        disabled={generatingCardsForHeading === heading.id}
                                      >
                                        {generatingCardsForHeading === heading.id ? (
                                          <Loader2 className="h-3 w-3 animate-spin" />
                                        ) : (
                                          <Plus className="h-3 w-3" />
                                        )}
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="left">
                                      <p>{headingCards.length > 0 ? 'Add more flashcards' : 'Create flashcards'}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              {headingCards.map((card) => (
                                <Card 
                                  key={card.id} 
                                  className="group cursor-pointer hover:border-primary/50 transition-colors ml-2"
                                  onClick={() => {
                                    setPreviewingCard(card);
                                    setPreviewFlipped(false);
                                  }}
                                >
                                  <CardContent className="p-2">
                                    <div className="flex justify-between items-start gap-2">
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium truncate">{card.front}</p>
                                      </div>
                                      <div className="flex gap-1">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setPreviewingCard(card);
                                            setPreviewFlipped(false);
                                          }}
                                        >
                                          <Eye className="h-3 w-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            deleteCard(card.id);
                                          }}
                                        >
                                          <Trash2 className="h-3 w-3 text-destructive" />
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          );
                        })}
                        
                        {/* Ungrouped flashcards */}
                        {flashcardsByHeading.ungrouped.length > 0 && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 py-1 px-2 rounded bg-muted/50">
                              <span className="text-xs font-medium text-muted-foreground">
                                Other ({flashcardsByHeading.ungrouped.length})
                              </span>
                            </div>
                            {flashcardsByHeading.ungrouped.map((card) => (
                              <Card 
                                key={card.id} 
                                className="group cursor-pointer hover:border-primary/50 transition-colors ml-2"
                                onClick={() => {
                                  setPreviewingCard(card);
                                  setPreviewFlipped(false);
                                }}
                              >
                                <CardContent className="p-2">
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-medium truncate">{card.front}</p>
                                    </div>
                                    <div className="flex gap-1">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setPreviewingCard(card);
                                          setPreviewFlipped(false);
                                        }}
                                      >
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deleteCard(card.id);
                                        }}
                                      >
                                        <Trash2 className="h-3 w-3 text-destructive" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </ScrollArea>

                  {/* Deck Stats */}
                  {selectedDeck && flashcards.length > 0 && (
                    <div className="p-3 border-t bg-card/50 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Total: {flashcards.length}</span>
                        <span>Due: {dueCards.length}</span>
                      </div>
                    </div>
                  )}
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
        )}
      </main>

      {/* Create Deck Dialog */}
      <Dialog open={showCreateDeckDialog} onOpenChange={setShowCreateDeckDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Deck</DialogTitle>
            <DialogDescription>
              Create a flashcard deck to organize your study materials.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Deck name..."
              value={newDeckTitle}
              onChange={(e) => setNewDeckTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createDeck()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDeckDialog(false)}>
              Cancel
            </Button>
            <Button onClick={createDeck} disabled={!newDeckTitle.trim()}>
              Create Deck
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Card Dialog */}
      <Dialog open={showAddCardDialog} onOpenChange={setShowAddCardDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Flashcard</DialogTitle>
            <DialogDescription>
              Add a new flashcard to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Heading (Optional)</label>
              <Select value={newCardHeadingId || "ungrouped"} onValueChange={(val) => setNewCardHeadingId(val === "ungrouped" ? null : val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a heading..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ungrouped">No heading (ungrouped)</SelectItem>
                  {tableOfContents.map(heading => (
                    <SelectItem key={heading.id} value={heading.id}>
                      {heading.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Front (Question/Term)</label>
              <Input
                placeholder="Enter the question or term..."
                value={newCardFront}
                onChange={(e) => setNewCardFront(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Back (Answer/Definition)</label>
              <Input
                placeholder="Enter the answer or definition..."
                value={newCardBack}
                onChange={(e) => setNewCardBack(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCard()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCardDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addCard} disabled={!newCardFront.trim() || !newCardBack.trim()}>
              Add Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ImportToBlockNoteModal
        open={showImportModal}
        onOpenChange={setShowImportModal}
        onInsert={(blocks) => {
          if (blockNoteEditor) {
            const currentBlocks = blockNoteEditor.document;
            blockNoteEditor.replaceBlocks(
              blockNoteEditor.document,
              [...currentBlocks, ...blocks]
            );
            toast.success("Content imported successfully");
          }
        }}
      />

      {/* Subject Picker Dialog */}
      <Dialog open={showSubjectDialog} onOpenChange={setShowSubjectDialog}>
        <DialogContent className="z-[100]">
          <DialogHeader>
            <DialogTitle>Select a Subject</DialogTitle>
            <DialogDescription>
              Choose a subject to organize your note "{noteTitle}"
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select 
              value={noteSubject || undefined} 
              onValueChange={(value) => {
                setNoteSubject(value);
                setShowSubjectDialog(false);
                toast.success(`Subject set to ${SUBJECTS.find(s => s.value === value)?.label || value}`);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a subject..." />
              </SelectTrigger>
              <SelectContent className="z-[101]">
                {SUBJECTS.map((subject) => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubjectDialog(false)}>
              Skip for now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Flashcard Preview Modal - Full screen overlay like settings */}
      {previewingCard && (
        <div className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 h-10 w-10"
            onClick={() => setPreviewingCard(null)}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4">
            <Card 
              className="cursor-pointer transition-all duration-300 transform hover:scale-[1.02]"
              onClick={() => setPreviewFlipped(!previewFlipped)}
            >
              <CardContent className="p-12 min-h-[300px] flex flex-col items-center justify-center text-center">
                {!previewFlipped ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">Question</p>
                    <p className="text-2xl font-semibold">{previewingCard.front}</p>
                    <p className="text-sm text-muted-foreground mt-8">Click to reveal answer</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">Answer</p>
                    <p className="text-xl">{previewingCard.back}</p>
                    <p className="text-sm text-muted-foreground mt-8">Click to show question</p>
                  </>
                )}
              </CardContent>
            </Card>
            
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setPreviewingCard(null)}
              >
                Close
              </Button>
              <Button
                variant="secondary"
                onClick={async () => {
                  const cardToRegenerate = previewingCard;
                  setPreviewingCard(null);
                  toast.loading("Regenerating card...", { id: "regen" });
                  try {
                    const { data, error } = await supabase.functions.invoke('generate-flashcards', {
                      body: { content: cardToRegenerate.front, count: 1, regenerate: true }
                    });
                    if (error) throw error;
                    if (data?.flashcards?.[0]) {
                      const { error: updateError } = await (supabase as any)
                        .from("flashcards")
                        .update({ 
                          front: data.flashcards[0].front, 
                          back: data.flashcards[0].back 
                        })
                        .eq("id", cardToRegenerate.id);
                      if (updateError) throw updateError;
                      setFlashcards(cards => cards.map(c => 
                        c.id === cardToRegenerate.id 
                          ? { ...c, front: data.flashcards[0].front, back: data.flashcards[0].back }
                          : c
                      ));
                      toast.success("Card regenerated!", { id: "regen" });
                    }
                  } catch (error) {
                    toast.error("Failed to regenerate card", { id: "regen" });
                  }
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  deleteCard(previewingCard.id);
                  setPreviewingCard(null);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Card
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
