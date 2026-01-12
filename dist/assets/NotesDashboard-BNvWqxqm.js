import { r as reactExports, j as jsxRuntimeExports, al as BookOpen, $ as LoaderCircle, aQ as Plus, bC as Search, bD as Filter, bE as ArrowUpDown, ax as FileText, bF as Folder, aI as EllipsisVertical, aJ as SquarePen, aC as Trash2, aK as Clock } from './vendor-react-BeQHm2Hb.js';
import { u as useAuth, s as supabase, B as Button, D as DropdownMenu, f as DropdownMenuTrigger, g as DropdownMenuContent, h as DropdownMenuItem } from './index-C9tyh6tO.js';
import { u as useSEO } from './use-seo-B_kpg7C4.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from './card-BTaNjRSt.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { I as Input } from './input-2hnN3JAu.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-DtVQdYEt.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
import { F as formatDistanceToNow } from './vendor-datefns-Cgc6WLhj.js';
import './vendor-react-dom-b1tP6waW.js';
import './vendor-export-COR0N_gy.js';
import './vendor-blocknote-BAmltmDn.js';
import './vendor-prosemirror-l_ukq4jw.js';
import './vendor-yjs-BarRwqAh.js';
import './vendor-tiptap-tuOT8GNt.js';
import './vendor-mantine-CpjnkULY.js';
import './vendor-utils-B8uxCDj6.js';
import './vendor-radix-BjF_gpzx.js';
import './vendor-i18n-BRT6rIp6.js';
import './vendor-syncfusion-B9hbBizT.js';
import './vendor-ketcher-B9jnF8te.js';
import './vendor-supabase-B1aOSilF.js';

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
  { value: "other", label: "Other", color: "bg-gray-500/10 text-gray-700 dark:text-gray-400" }
];
function NotesDashboard() {
  useSEO("dashboard");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notes, setNotes] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [creatingNote, setCreatingNote] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [filterSubject, setFilterSubject] = reactExports.useState("all");
  const [sortBy, setSortBy] = reactExports.useState("updated");
  reactExports.useEffect(() => {
    loadNotes();
  }, [user]);
  const loadNotes = async () => {
    try {
      if (!user) {
        const savedNotes = localStorage.getItem("guest_notes");
        if (savedNotes) {
          const parsedNotes = JSON.parse(savedNotes);
          setNotes(parsedNotes);
        }
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.from("notes").select("*").eq("user_id", user.id).order("updated_at", { ascending: false });
      if (error) {
        console.error("Failed to load notes:", error);
        ue.error("Failed to load notes");
        return;
      }
      const notesWithPreview = (data || []).map((note) => ({
        ...note,
        subject: note.subject || "other",
        preview: generatePreview(note.content)
      }));
      setNotes(notesWithPreview);
    } catch (error) {
      console.error("Failed to load notes:", error);
      ue.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };
  const generatePreview = (content) => {
    try {
      if (typeof content === "string") {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          const text = parsed.slice(0, 3).map((block) => {
            if (block.content && Array.isArray(block.content)) {
              return block.content.map((item) => {
                if (typeof item === "string") return item;
                if (item?.text) return item.text;
                return "";
              }).join("");
            }
            return "";
          }).join(" ").trim();
          return text.substring(0, 150) + (text.length > 150 ? "..." : "");
        }
      }
      return "No content";
    } catch {
      return "No content";
    }
  };
  const createNote = async () => {
    if (creatingNote) return;
    setCreatingNote(true);
    try {
      const noteData = {
        title: "Untitled Note",
        subject: "other",
        content: JSON.stringify([]),
        user_id: user?.id || "guest",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (!user) {
        const noteWithId = {
          ...noteData,
          id: `guest_${Date.now()}`
        };
        const savedNotes = localStorage.getItem("guest_notes");
        const existingNotes = savedNotes ? JSON.parse(savedNotes) : [];
        const updatedNotes = [noteWithId, ...existingNotes];
        localStorage.setItem("guest_notes", JSON.stringify(updatedNotes));
        navigate(`/work/notes/edit/${noteWithId.id}`);
      } else {
        const { data, error } = await supabase.from("notes").insert([noteData]).select().single();
        if (error) throw error;
        navigate(`/work/notes/edit/${data.id}`);
      }
    } catch (error) {
      console.error("Failed to create note:", error);
      ue.error("Failed to create note");
    } finally {
      setCreatingNote(false);
    }
  };
  const deleteNote = async (noteId) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      if (!user) {
        const savedNotes = localStorage.getItem("guest_notes");
        if (savedNotes) {
          const existingNotes = JSON.parse(savedNotes);
          const updatedNotes = existingNotes.filter((n) => n.id !== noteId);
          localStorage.setItem("guest_notes", JSON.stringify(updatedNotes));
          setNotes(updatedNotes);
        }
        ue.success("Note deleted");
        return;
      }
      const { error } = await supabase.from("notes").delete().eq("id", noteId);
      if (error) throw error;
      setNotes(notes.filter((n) => n.id !== noteId));
      ue.success("Note deleted");
    } catch (error) {
      console.error("Failed to delete note:", error);
      ue.error("Failed to delete note");
    }
  };
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.preview?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === "all" || note.subject === filterSubject;
    return matchesSearch && matchesSubject;
  }).sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "created") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
  });
  const notesBySubject = filteredNotes.reduce((acc, note) => {
    if (!acc[note.subject]) {
      acc[note.subject] = [];
    }
    acc[note.subject].push(note);
    return acc;
  }, {});
  const getSubjectInfo = (subjectValue) => {
    return SUBJECTS.find((s) => s.value === subjectValue) || SUBJECTS[SUBJECTS.length - 1];
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/work", className: "mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "My Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Organize your study notes by subject" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: createNote, disabled: creatingNote, children: [
          creatingNote ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
          "New Note"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search notes...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "pl-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterSubject, onValueChange: setFilterSubject, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "w-full sm:w-[200px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "h-4 w-4 mr-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by subject" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Subjects" }),
          SUBJECTS.map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: subject.value, children: subject.label }, subject.value))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortBy, onValueChange: (v) => setSortBy(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "w-full sm:w-[180px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-4 w-4 mr-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sort by" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "updated", children: "Last Updated" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "created", children: "Date Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "title", children: "Title A-Z" })
        ] })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Loading notes..." })
    ] }) : filteredNotes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-2", children: searchQuery || filterSubject !== "all" ? "No notes found" : "No notes yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: searchQuery || filterSubject !== "all" ? "Try adjusting your search or filters" : "Create your first note to get started" }),
      !searchQuery && filterSubject === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: createNote, disabled: creatingNote, children: [
        creatingNote ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Create Note"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: Object.entries(notesBySubject).map(([subject, subjectNotes]) => {
      const subjectInfo = getSubjectInfo(subject);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: subjectInfo.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: subjectNotes.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: subjectNotes.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "group hover:shadow-lg transition-all cursor-pointer",
            onClick: () => navigate(`/work/notes/edit/${note.id}`),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg truncate", children: note.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `mt-2 ${subjectInfo.color}`, variant: "secondary", children: subjectInfo.label })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" })
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: (e) => {
                      e.stopPropagation();
                      navigate(`/work/notes/edit/${note.id}`);
                    }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4 mr-2" }),
                      "Edit"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      DropdownMenuItem,
                      {
                        onClick: (e) => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        },
                        className: "text-destructive",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
                          "Delete"
                        ]
                      }
                    )
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-3 mb-3", children: note.preview || "No content yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDistanceToNow(new Date(note.updated_at), { addSuffix: true }) })
                ] })
              ] })
            ]
          },
          note.id
        )) })
      ] }, subject);
    }) })
  ] }) });
}

export { NotesDashboard as default };
