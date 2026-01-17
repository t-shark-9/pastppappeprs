import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useSEO } from "@/hooks/use-seo";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SchoolProgramPrompt, getSchoolProgram } from "@/components/prompts/SchoolProgramPrompt";
import { 
  Plus, 
  Brain, 
  Clock, 
  MoreVertical, 
  Trash2, 
  Edit, 
  Search,
  GraduationCap,
  Layers,
  ChevronDown,
  ChevronRight,
  BookOpen,
  FileText,
  Sparkles,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const safeTimeDistance = (dateStr: string | null | undefined) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (e) {
    return "";
  }
};

interface FlashcardDeck {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
  subject?: string;
  note_id?: string;
  card_count?: number;
}

interface Note {
  id: string;
  title: string;
  subject: string;
  content: string;
  headings?: string[];
}

const SUBJECTS = [
  { value: "biology", label: "Biology", color: "bg-green-500/10 text-green-700 dark:text-green-400" },
  { value: "chemistry", label: "Chemistry", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  { value: "physics", label: "Physics", color: "bg-purple-500/10 text-purple-700 dark:text-purple-400" },
  { value: "math-aa", label: "Math AA", color: "bg-red-500/10 text-red-700 dark:text-red-400" },
  { value: "math-ai", label: "Math AI", color: "bg-orange-500/10 text-orange-700 dark:text-orange-400" },
  { value: "economics", label: "Economics", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" },
  { value: "business", label: "Business Management", color: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400" },
  { value: "history", label: "History", color: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  { value: "geography", label: "Geography", color: "bg-teal-500/10 text-teal-700 dark:text-teal-400" },
  { value: "english", label: "English A", color: "bg-pink-500/10 text-pink-700 dark:text-pink-400" },
  { value: "language-b", label: "Language B", color: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400" },
  { value: "visual-arts", label: "Visual Arts", color: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400" },
  { value: "tok", label: "Theory of Knowledge", color: "bg-violet-500/10 text-violet-700 dark:text-violet-400" },
  { value: "ee", label: "Extended Essay", color: "bg-rose-500/10 text-rose-700 dark:text-rose-400" },
  { value: "cas", label: "CAS", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
  { value: "other", label: "Other", color: "bg-gray-500/10 text-gray-700 dark:text-gray-400" },
];

export default function Flashcards() {
  useSEO('flashcards');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [dueCardCounts, setDueCardCounts] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set(['all']));
  
  // Create deck dialog
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newDeckTitle, setNewDeckTitle] = useState("");
  const [newDeckSubject, setNewDeckSubject] = useState("");
  const [newDeckDescription, setNewDeckDescription] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [suggestedNames, setSuggestedNames] = useState<string[]>([]);
  
  // Rename dialog
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [renamingDeck, setRenamingDeck] = useState<FlashcardDeck | null>(null);
  const [renameTitle, setRenameTitle] = useState("");
  
  // School program prompt
  const [showProgramPrompt, setShowProgramPrompt] = useState(false);
  const [hasSchoolProgram, setHasSchoolProgram] = useState(false);

  // Handler for opening create dialog - prompt for program first if needed
  const handleCreateDeck = () => {
    if (!hasSchoolProgram) {
      setShowProgramPrompt(true);
    } else {
      setShowCreateDialog(true);
    }
  };

  useEffect(() => {
    // Check for school program
    const program = getSchoolProgram();
    setHasSchoolProgram(!!program);
    
    loadDecks();
    loadNotes();
  }, [user]);

  const loadDecks = async () => {
    try {
      if (!user) {
        // Load from localStorage for guest users
        const savedDecks = localStorage.getItem('flashcard_decks');
        if (savedDecks) {
          setDecks(JSON.parse(savedDecks));
        }
        setLoading(false);
        return;
      }

      const { data, error } = await (supabase as any)
        .from("flashcard_decks")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      
      const decksWithCount = await Promise.all((data || []).map(async (deck: FlashcardDeck) => {
        const { count } = await (supabase as any)
          .from("flashcards")
          .select("*", { count: 'exact', head: true })
          .eq("deck_id", deck.id);
        
        return { ...deck, card_count: count || 0 };
      }));

      setDecks(decksWithCount);
      
      // Load due card counts
      const dueCounts: Record<string, number> = {};
      for (const deck of decksWithCount) {
        const { count } = await (supabase as any)
          .from("flashcards")
          .select("*", { count: 'exact', head: true })
          .eq("deck_id", deck.id)
          .lte("next_review_date", new Date().toISOString());
        dueCounts[deck.id] = count || 0;
      }
      setDueCardCounts(dueCounts);
      
    } catch (error) {
      console.error("Failed to load decks:", error);
      toast.error("Failed to load flashcard decks");
    } finally {
      setLoading(false);
    }
  };

  const loadNotes = async () => {
    try {
      if (!user) {
        const savedNotes = localStorage.getItem('guest_notes');
        if (savedNotes) {
          const parsedNotes = JSON.parse(savedNotes);
          setNotes(parsedNotes.map((n: Note) => ({
            ...n,
            headings: extractHeadings(n.content)
          })));
        }
        return;
      }

      const { data, error } = await supabase
        .from("notes")
        .select("id, title, subject, content")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      
      setNotes((data as any[] || []).map((n: any) => ({
        id: n.id,
        title: n.title,
        subject: n.subject || 'other',
        content: n.content,
        headings: extractHeadings(n.content)
      })));
    } catch (error) {
      console.error("Failed to load notes:", error);
    }
  };

  const extractHeadings = (content: string): string[] => {
    try {
      if (typeof content === 'string') {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          return parsed
            .filter((block: any) => block.type === 'heading')
            .map((block: any) => {
              if (block.content && Array.isArray(block.content)) {
                return block.content
                  .map((item: any) => {
                    if (typeof item === 'string') return item;
                    if (item?.text) return item.text;
                    return '';
                  })
                  .join('')
                  .trim();
              }
              return '';
            })
            .filter(Boolean);
        }
      }
      return [];
    } catch {
      return [];
    }
  };

  const handleNoteSelect = (noteId: string) => {
    setSelectedNoteId(noteId);
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setNewDeckSubject(note.subject);
      // Suggest headings as deck names
      const headings = note.headings || [];
      setSuggestedNames([note.title, ...headings].filter(Boolean));
    }
  };

  const createDeck = async () => {
    if (!newDeckTitle.trim()) {
      toast.error("Please provide a deck name");
      return;
    }

    try {
      const deckData: any = {
        title: newDeckTitle.trim(),
        description: newDeckDescription.trim() || null,
        user_id: user?.id || 'guest',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (!user) {
        const deckWithId = {
          ...deckData,
          id: `local_deck_${Date.now()}`,
          subject: newDeckSubject || 'other',
          note_id: selectedNoteId,
          card_count: 0,
        };
        const savedDecks = localStorage.getItem('flashcard_decks');
        const existingDecks = savedDecks ? JSON.parse(savedDecks) : [];
        const updatedDecks = [deckWithId, ...existingDecks];
        localStorage.setItem('flashcard_decks', JSON.stringify(updatedDecks));
        setDecks(updatedDecks);
        toast.success("Deck created!");
      } else {
        const { data, error } = await (supabase as any)
          .from("flashcard_decks")
          .insert([deckData])
          .select()
          .single();

        if (error) throw error;
        
        setDecks([{ ...data, card_count: 0, subject: newDeckSubject || 'other' }, ...decks]);
        toast.success("Deck created!");
      }

      setShowCreateDialog(false);
      setNewDeckTitle("");
      setNewDeckSubject("");
      setNewDeckDescription("");
      setSelectedNoteId(null);
      setSuggestedNames([]);
    } catch (error) {
      console.error("Failed to create deck:", error);
      toast.error("Failed to create deck");
    }
  };

  const renameDeck = async () => {
    if (!renamingDeck || !renameTitle.trim()) return;

    try {
      if (!user) {
        const updatedDecks = decks.map(d => 
          d.id === renamingDeck.id ? { ...d, title: renameTitle.trim() } : d
        );
        localStorage.setItem('flashcard_decks', JSON.stringify(updatedDecks));
        setDecks(updatedDecks);
      } else {
        const { error } = await (supabase as any)
          .from("flashcard_decks")
          .update({ title: renameTitle.trim() })
          .eq("id", renamingDeck.id);

        if (error) throw error;
        setDecks(decks.map(d => 
          d.id === renamingDeck.id ? { ...d, title: renameTitle.trim() } : d
        ));
      }

      toast.success("Deck renamed");
      setShowRenameDialog(false);
      setRenamingDeck(null);
      setRenameTitle("");
    } catch (error) {
      console.error("Failed to rename deck:", error);
      toast.error("Failed to rename deck");
    }
  };

  const deleteDeck = async (deckId: string) => {
    if (!confirm("Are you sure you want to delete this deck? All cards will be lost.")) return;

    try {
      if (!user) {
        const updatedDecks = decks.filter(d => d.id !== deckId);
        localStorage.setItem('flashcard_decks', JSON.stringify(updatedDecks));
        localStorage.removeItem(`flashcards_${deckId}`);
        setDecks(updatedDecks);
      } else {
        const { error } = await (supabase as any)
          .from("flashcard_decks")
          .delete()
          .eq("id", deckId);

        if (error) throw error;
        setDecks(decks.filter(d => d.id !== deckId));
      }

      toast.success("Deck deleted");
    } catch (error) {
      console.error("Failed to delete deck:", error);
      toast.error("Failed to delete deck");
    }
  };

  const getSubjectColor = (subject?: string) => {
    return SUBJECTS.find(s => s.value === subject)?.color || "bg-gray-500/10 text-gray-700 dark:text-gray-400";
  };

  const getSubjectLabel = (subject?: string) => {
    return SUBJECTS.find(s => s.value === subject)?.label || "Other";
  };

  // Filter and group decks
  const filteredDecks = decks.filter(deck => {
    const matchesSearch = deck.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === "all" || deck.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const decksBySubject = filteredDecks.reduce((acc, deck) => {
    const subject = deck.subject || 'other';
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(deck);
    return acc;
  }, {} as Record<string, FlashcardDeck[]>);

  const toggleSubject = (subject: string) => {
    const newExpanded = new Set(expandedSubjects);
    if (newExpanded.has(subject)) {
      newExpanded.delete(subject);
    } else {
      newExpanded.add(subject);
    }
    setExpandedSubjects(newExpanded);
  };

  const totalDueCards = Object.values(dueCardCounts).reduce((a, b) => a + b, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <BackButton fallbackPath="/work" />
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                Flashcards
              </h1>
              <p className="text-muted-foreground text-sm">
                {decks.length} decks • {totalDueCards} cards due for review
              </p>
            </div>
          </div>
          <Button onClick={handleCreateDeck}>
            <Plus className="h-4 w-4 mr-2" />
            New Deck
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search decks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {SUBJECTS.map((subject) => (
                <SelectItem key={subject.value} value={subject.value}>
                  {subject.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quick Study Button */}
        {totalDueCards > 0 && (
          <Card className="mb-6 border-primary/50 bg-primary/5">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Ready to study?</p>
                    <p className="text-sm text-muted-foreground">
                      You have {totalDueCards} cards due for review
                    </p>
                  </div>
                </div>
                <Button onClick={() => navigate('/work/study')}>
                  Start Review
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Decks by Subject */}
        {decks.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Brain className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No flashcard decks yet</h3>
              <p className="text-muted-foreground text-center mb-4 max-w-md">
                Create your first deck to start studying. You can create decks from your notes 
                and use headings as suggested deck names.
              </p>
              <Button onClick={handleCreateDeck}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Deck
              </Button>
            </CardContent>
          </Card>
        ) : filterSubject === "all" ? (
          // Show grouped by subject
          <div className="space-y-4">
            {Object.entries(decksBySubject).map(([subject, subjectDecks]) => (
              <Collapsible
                key={subject}
                open={expandedSubjects.has(subject) || expandedSubjects.has('all')}
                onOpenChange={() => toggleSubject(subject)}
              >
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardContent className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {expandedSubjects.has(subject) || expandedSubjects.has('all') ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <Badge variant="secondary" className={getSubjectColor(subject)}>
                            {getSubjectLabel(subject)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {subjectDecks.length} deck{subjectDecks.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {subjectDecks.reduce((sum, d) => sum + (dueCardCounts[d.id] || 0), 0) > 0 && (
                            <Badge variant="outline" className="text-orange-600 border-orange-300">
                              {subjectDecks.reduce((sum, d) => sum + (dueCardCounts[d.id] || 0), 0)} due
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 ml-6">
                    {subjectDecks.map((deck) => (
                      <DeckCard
                        key={deck.id}
                        deck={deck}
                        dueCount={dueCardCounts[deck.id] || 0}
                        onStudy={() => navigate(`/work/study?deck=${deck.id}`)}
                        onEdit={() => {
                          setRenamingDeck(deck);
                          setRenameTitle(deck.title);
                          setShowRenameDialog(true);
                        }}
                        onDelete={() => deleteDeck(deck.id)}
                        getSubjectColor={getSubjectColor}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        ) : (
          // Show filtered list
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDecks.map((deck) => (
              <DeckCard
                key={deck.id}
                deck={deck}
                dueCount={dueCardCounts[deck.id] || 0}
                onStudy={() => navigate(`/work/study?deck=${deck.id}`)}
                onEdit={() => {
                  setRenamingDeck(deck);
                  setRenameTitle(deck.title);
                  setShowRenameDialog(true);
                }}
                onDelete={() => deleteDeck(deck.id)}
                getSubjectColor={getSubjectColor}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Deck Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Deck</DialogTitle>
            <DialogDescription>
              Create a flashcard deck to organize your study cards. You can link it to a note
              to get suggested names from headings.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Link to Note (optional) */}
            {notes.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Link to Note (optional)</label>
                <Select value={selectedNoteId || ""} onValueChange={handleNoteSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a note..." />
                  </SelectTrigger>
                  <SelectContent>
                    {notes.map((note) => (
                      <SelectItem key={note.id} value={note.id}>
                        <div className="flex items-center gap-2">
                          <FileText className="h-3 w-3" />
                          {note.title}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Suggested Names from Note Headings */}
            {suggestedNames.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-primary" />
                  Suggested Names
                </label>
                <ScrollArea className="h-[100px] border rounded-md p-2">
                  <div className="space-y-1">
                    {suggestedNames.map((name, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left h-auto py-1.5"
                        onClick={() => setNewDeckTitle(name)}
                      >
                        {index === 0 ? (
                          <BookOpen className="h-3 w-3 mr-2 shrink-0" />
                        ) : (
                          <span className="w-3 mr-2 text-muted-foreground text-xs">H{index}</span>
                        )}
                        <span className="truncate">{name}</span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Deck Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Deck Name</label>
              <Input
                placeholder="Enter deck name..."
                value={newDeckTitle}
                onChange={(e) => setNewDeckTitle(e.target.value)}
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select value={newDeckSubject} onValueChange={setNewDeckSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject..." />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description (optional)</label>
              <Input
                placeholder="Add a description..."
                value={newDeckDescription}
                onChange={(e) => setNewDeckDescription(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={createDeck} disabled={!newDeckTitle.trim()}>
              Create Deck
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Deck Dialog */}
      <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Deck</DialogTitle>
          </DialogHeader>
          <Input
            value={renameTitle}
            onChange={(e) => setRenameTitle(e.target.value)}
            placeholder="Deck name"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRenameDialog(false)}>
              Cancel
            </Button>
            <Button onClick={renameDeck}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* School Program Prompt - shown when needed */}
      <SchoolProgramPrompt
        open={showProgramPrompt}
        onOpenChange={setShowProgramPrompt}
        onComplete={() => {
          setHasSchoolProgram(true);
          setShowCreateDialog(true);
        }}
        context="flashcards"
      />
    </div>
  );
}

// Deck Card Component
function DeckCard({
  deck,
  dueCount,
  onStudy,
  onEdit,
  onDelete,
  getSubjectColor,
}: {
  deck: FlashcardDeck;
  dueCount: number;
  onStudy: () => void;
  onEdit: () => void;
  onDelete: () => void;
  getSubjectColor: (subject?: string) => string;
}) {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base line-clamp-1">{deck.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {deck.description && (
          <CardDescription className="line-clamp-2">{deck.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Layers className="h-4 w-4" />
            {deck.card_count || 0} cards
          </div>
          {dueCount > 0 && (
            <Badge variant="outline" className="text-orange-600 border-orange-300">
              {dueCount} due
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {safeTimeDistance(deck.updated_at)}
          </div>
          <Button size="sm" onClick={onStudy} disabled={(deck.card_count || 0) === 0}>
            <GraduationCap className="h-4 w-4 mr-1" />
            Study
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
