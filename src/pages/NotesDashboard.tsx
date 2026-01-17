import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useSEO } from "@/hooks/use-seo";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Plus, 
  FileText, 
  BookOpen, 
  Clock, 
  MoreVertical, 
  Trash2, 
  Edit, 
  Search,
  Filter,
  Folder,
  Loader2,
  ArrowUpDown
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Note {
  id: string;
  title: string;
  subject: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  preview?: string;
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

export default function NotesDashboard() {
  useSEO('dashboard');
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingNote, setCreatingNote] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"updated" | "created" | "title">("updated");

  useEffect(() => {
    loadNotes();
  }, [user]);

  const loadNotes = async () => {
    try {
      if (!user) {
        // Load from localStorage for guest users
        const savedNotes = localStorage.getItem('guest_notes');
        if (savedNotes) {
          const parsedNotes = JSON.parse(savedNotes);
          setNotes(parsedNotes);
        }
        setLoading(false);
        return;
      }

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

      // Generate preview for each note
      const notesWithPreview = (data || []).map(note => ({
        ...note,
        subject: (note as any).subject || 'other',
        preview: generatePreview(note.content),
      }));

      setNotes(notesWithPreview);
    } catch (error) {
      console.error("Failed to load notes:", error);
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const generatePreview = (content: string): string => {
    try {
      if (typeof content === 'string') {
        // Try to parse as JSON (BlockNote content)
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          // Extract text from first few blocks
          const text = parsed
            .slice(0, 3)
            .map((block: any) => {
              if (block.content && Array.isArray(block.content)) {
                return block.content
                  .map((item: any) => {
                    if (typeof item === 'string') return item;
                    if (item?.text) return item.text;
                    return '';
                  })
                  .join('');
              }
              return '';
            })
            .join(' ')
            .trim();
          return text.substring(0, 150) + (text.length > 150 ? '...' : '');
        }
      }
      return 'No content';
    } catch {
      return 'No content';
    }
  };

  const createNote = async () => {
    if (creatingNote) return;
    setCreatingNote(true);

    try {
      const noteData = {
        title: 'Untitled Note',
        subject: 'other',
        content: JSON.stringify([]),
        user_id: user?.id || 'guest',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (!user) {
        // Guest mode - save to localStorage
        const noteWithId = {
          ...noteData,
          id: `guest_${Date.now()}`,
        };
        const savedNotes = localStorage.getItem('guest_notes');
        const existingNotes = savedNotes ? JSON.parse(savedNotes) : [];
        const updatedNotes = [noteWithId, ...existingNotes];
        localStorage.setItem('guest_notes', JSON.stringify(updatedNotes));
        navigate(`/work/notes/edit/${noteWithId.id}`);
      } else {
        // Logged in - save to Supabase
        const { data, error } = await supabase
          .from("notes")
          .insert([noteData])
          .select()
          .single();

        if (error) throw error;
        navigate(`/work/notes/edit/${data.id}`);
      }
    } catch (error) {
      console.error("Failed to create note:", error);
      toast.error("Failed to create note");
    } finally {
      setCreatingNote(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      if (!user) {
        // Guest mode
        const savedNotes = localStorage.getItem('guest_notes');
        if (savedNotes) {
          const existingNotes = JSON.parse(savedNotes);
          const updatedNotes = existingNotes.filter((n: Note) => n.id !== noteId);
          localStorage.setItem('guest_notes', JSON.stringify(updatedNotes));
          setNotes(updatedNotes);
        }
        toast.success("Note deleted");
        return;
      }

      const { error } = await supabase
        .from("notes")
        .delete()
        .eq("id", noteId);

      if (error) throw error;

      setNotes(notes.filter(n => n.id !== noteId));
      toast.success("Note deleted");
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error("Failed to delete note");
    }
  };

  // Filter and sort notes
  const filteredNotes = notes
    .filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           note.preview?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = filterSubject === "all" || note.subject === filterSubject;
      return matchesSearch && matchesSubject;
    })
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "created") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

  // Group notes by subject
  const notesBySubject = filteredNotes.reduce((acc, note) => {
    if (!acc[note.subject]) {
      acc[note.subject] = [];
    }
    acc[note.subject].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  const getSubjectInfo = (subjectValue: string) => {
    return SUBJECTS.find(s => s.value === subjectValue) || SUBJECTS[SUBJECTS.length - 1];
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <BackButton fallbackPath="/work" className="mb-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">My Notes</h1>
                <p className="text-muted-foreground">
                  Organize your study notes by subject
                </p>
              </div>
            </div>
            <Button onClick={createNote} disabled={creatingNote}>
              {creatingNote ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              New Note
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {SUBJECTS.map(subject => (
                <SelectItem key={subject.value} value={subject.value}>
                  {subject.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Last Updated</SelectItem>
              <SelectItem value="created">Date Created</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notes Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery || filterSubject !== "all" ? "No notes found" : "No notes yet"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || filterSubject !== "all" 
                ? "Try adjusting your search or filters"
                : "Create your first note to get started"}
            </p>
            {!searchQuery && filterSubject === "all" && (
              <Button onClick={createNote} disabled={creatingNote}>
                {creatingNote ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                Create Note
              </Button>
            )}
          </Card>
        ) : (
          <div className="space-y-8">
            {Object.entries(notesBySubject).map(([subject, subjectNotes]) => {
              const subjectInfo = getSubjectInfo(subject);
              return (
                <div key={subject}>
                  <div className="flex items-center gap-2 mb-4">
                    <Folder className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">{subjectInfo.label}</h2>
                    <Badge variant="secondary">{subjectNotes.length}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subjectNotes.map(note => (
                      <Card
                        key={note.id}
                        className="group hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => navigate(`/work/notes/edit/${note.id}`)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-lg truncate">
                                {note.title}
                              </CardTitle>
                              <Badge className={`mt-2 ${subjectInfo.color}`} variant="secondary">
                                {subjectInfo.label}
                              </Badge>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/work/notes/edit/${note.id}`);
                                }}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNote(note.id);
                                  }}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                            {note.preview || 'No content yet'}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>
                              {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
