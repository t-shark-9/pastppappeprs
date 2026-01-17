import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Clock, Search, Copy, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import Fuse from "fuse.js";

interface Note {
  id: string;
  title: string;
  subject: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
  preview?: string;
  plainText?: string;
}

interface NotesSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsertText?: (text: string) => void;
  onOpenNote?: (noteId: string) => void;
}

const SUBJECTS: Record<string, { label: string; color: string }> = {
  biology: { label: "Biology", color: "bg-green-500/10 text-green-700 dark:text-green-400" },
  chemistry: { label: "Chemistry", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  physics: { label: "Physics", color: "bg-purple-500/10 text-purple-700 dark:text-purple-400" },
  "math-aa": { label: "Math AA", color: "bg-red-500/10 text-red-700 dark:text-red-400" },
  "math-ai": { label: "Math AI", color: "bg-orange-500/10 text-orange-700 dark:text-orange-400" },
  economics: { label: "Economics", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" },
  business: { label: "Business", color: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400" },
  history: { label: "History", color: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  geography: { label: "Geography", color: "bg-teal-500/10 text-teal-700 dark:text-teal-400" },
  english: { label: "English", color: "bg-pink-500/10 text-pink-700 dark:text-pink-400" },
  "language-b": { label: "Language B", color: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400" },
  "visual-arts": { label: "Visual Arts", color: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400" },
  tok: { label: "TOK", color: "bg-violet-500/10 text-violet-700 dark:text-violet-400" },
  ee: { label: "Extended Essay", color: "bg-rose-500/10 text-rose-700 dark:text-rose-400" },
  cas: { label: "CAS", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
  other: { label: "Other", color: "bg-gray-500/10 text-gray-700 dark:text-gray-400" },
};

// Extract plain text from BlockNote content
function extractPlainText(content: string): string {
  try {
    if (typeof content === "string") {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed
          .map((block: any) => {
            if (block.content && Array.isArray(block.content)) {
              return block.content
                .map((item: any) => {
                  if (typeof item === "string") return item;
                  if (item?.text) return item.text;
                  return "";
                })
                .join("");
            }
            return "";
          })
          .join("\n")
          .trim();
      }
    }
  } catch {
    // Not JSON, return as-is
  }
  return content || "";
}

export function NotesSearchDialog({
  open,
  onOpenChange,
  onInsertText,
  onOpenNote,
}: NotesSearchDialogProps) {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Load notes
  useEffect(() => {
    if (!open) return;
    
    const loadNotes = async () => {
      setLoading(true);
      try {
        if (!user) {
          // Load from localStorage for guest users
          const savedNotes = localStorage.getItem("guest_notes");
          if (savedNotes) {
            const parsed = JSON.parse(savedNotes);
            const notesWithText = parsed.map((note: Note) => ({
              ...note,
              plainText: extractPlainText(note.content),
            }));
            setNotes(notesWithText);
          }
        } else {
          const { data, error } = await supabase
            .from("notes")
            .select("*")
            .eq("user_id", user.id)
            .order("updated_at", { ascending: false });

          if (error) {
            console.error("Failed to load notes:", error);
            toast.error("Failed to load notes");
            return;
          }

          const notesWithText = (data || []).map((note: any) => ({
            ...note,
            subject: note.subject || "other",
            plainText: extractPlainText(note.content),
          }));
          setNotes(notesWithText);
        }
      } catch (error) {
        console.error("Failed to load notes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [open, user]);

  // Create Fuse instance for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(notes, {
      keys: [
        { name: "title", weight: 2 },
        { name: "plainText", weight: 1 },
        { name: "subject", weight: 0.5 },
      ],
      threshold: 0.4,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
    });
  }, [notes]);

  // Filter notes based on search
  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) {
      return notes.slice(0, 20); // Show recent notes
    }
    return fuse.search(searchQuery).slice(0, 20).map((result) => result.item);
  }, [notes, searchQuery, fuse]);

  // Handle note selection
  const handleSelect = useCallback(
    (note: Note) => {
      setSelectedNote(note);
    },
    []
  );

  // Copy text from note
  const handleCopyText = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    },
    []
  );

  // Insert text into editor
  const handleInsert = useCallback(
    (text: string) => {
      if (onInsertText) {
        onInsertText(text);
        onOpenChange(false);
        toast.success("Text inserted!");
      }
    },
    [onInsertText, onOpenChange]
  );

  // Open note in new tab
  const handleOpenNote = useCallback(
    (noteId: string) => {
      if (onOpenNote) {
        onOpenNote(noteId);
      } else {
        window.open(`/notes/${noteId}`, "_blank");
      }
      onOpenChange(false);
    },
    [onOpenNote, onOpenChange]
  );

  // Get preview snippet with search term highlighted
  const getPreviewSnippet = (note: Note, maxLength = 200): string => {
    const text = note.plainText || "";
    if (!searchQuery.trim()) {
      return text.substring(0, maxLength) + (text.length > maxLength ? "..." : "");
    }

    // Find the position of the search term
    const lowerText = text.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) {
      return text.substring(0, maxLength) + (text.length > maxLength ? "..." : "");
    }

    // Extract snippet around the match
    const start = Math.max(0, index - 50);
    const end = Math.min(text.length, index + searchQuery.length + 150);
    let snippet = text.substring(start, end);

    if (start > 0) snippet = "..." + snippet;
    if (end < text.length) snippet = snippet + "...";

    return snippet;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 gap-0">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Notes
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[calc(80vh-80px)]">
          {/* Search Input */}
          <div className="px-4 pb-2">
            <Command className="rounded-lg border shadow-none">
              <CommandInput
                placeholder="Search your notes..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="h-10"
              />
            </Command>
          </div>

          <div className="flex flex-1 min-h-0 px-4 pb-4 gap-4">
            {/* Notes List */}
            <ScrollArea className="flex-1 border rounded-lg">
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              ) : filteredNotes.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                  <FileText className="h-10 w-10 mb-2 opacity-50" />
                  <p>{searchQuery ? "No notes found" : "No notes yet"}</p>
                  <p className="text-sm">
                    {searchQuery ? "Try a different search term" : "Create notes to search them here"}
                  </p>
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  {filteredNotes.map((note) => (
                    <button
                      key={note.id}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedNote?.id === note.id
                          ? "bg-accent"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => handleSelect(note)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="font-medium truncate">{note.title}</span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {getPreviewSnippet(note, 100)}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`shrink-0 ${SUBJECTS[note.subject]?.color || SUBJECTS.other.color}`}
                        >
                          {SUBJECTS[note.subject]?.label || note.subject}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Note Preview */}
            {selectedNote && (
              <div className="flex-1 border rounded-lg flex flex-col min-w-0">
                <div className="p-3 border-b bg-muted/30">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium truncate">{selectedNote.title}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenNote(selectedNote.id)}
                        className="p-1.5 rounded hover:bg-accent transition-colors"
                        title="Open note"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`mt-1 ${SUBJECTS[selectedNote.subject]?.color || SUBJECTS.other.color}`}
                  >
                    {SUBJECTS[selectedNote.subject]?.label || selectedNote.subject}
                  </Badge>
                </div>
                <ScrollArea className="flex-1 p-3">
                  <div className="text-sm whitespace-pre-wrap">
                    {selectedNote.plainText || "No content"}
                  </div>
                </ScrollArea>
                <div className="p-2 border-t bg-muted/30 flex gap-2">
                  <button
                    onClick={() => handleCopyText(selectedNote.plainText || "")}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border hover:bg-accent transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    Copy All
                  </button>
                  {onInsertText && (
                    <button
                      onClick={() => handleInsert(selectedNote.plainText || "")}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Insert
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
