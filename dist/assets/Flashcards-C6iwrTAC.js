import { c6 as Root, c7 as CollapsibleTrigger$1, c8 as CollapsibleContent$1, r as reactExports, j as jsxRuntimeExports, $ as LoaderCircle, aG as Brain, aQ as Plus, bC as Search, av as GraduationCap, aj as ChevronDown, a2 as ChevronRight, ax as FileText, az as Sparkles, al as BookOpen, aI as EllipsisVertical, aJ as SquarePen, aC as Trash2, c9 as Layers, aK as Clock } from './vendor-react-BeQHm2Hb.js';
import { u as useNavigate, d as useSearchParams } from './vendor-react-router-D-UwvF_4.js';
import { u as useAuth, s as supabase, B as Button, D as DropdownMenu, f as DropdownMenuTrigger, g as DropdownMenuContent, h as DropdownMenuItem } from './index-C9tyh6tO.js';
import { u as useSEO } from './use-seo-B_kpg7C4.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle, c as CardDescription } from './card-BTaNjRSt.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { I as Input } from './input-2hnN3JAu.js';
import { S as ScrollArea } from './scroll-area-DHtqER3G.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-BQ4GVXEh.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-DtVQdYEt.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
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

const Collapsible = Root;
const CollapsibleTrigger = CollapsibleTrigger$1;
const CollapsibleContent = CollapsibleContent$1;

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
function Flashcards() {
  useSEO("flashcards");
  const navigate = useNavigate();
  useSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = reactExports.useState(true);
  const [decks, setDecks] = reactExports.useState([]);
  const [notes, setNotes] = reactExports.useState([]);
  const [dueCardCounts, setDueCardCounts] = reactExports.useState({});
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [filterSubject, setFilterSubject] = reactExports.useState("all");
  const [expandedSubjects, setExpandedSubjects] = reactExports.useState(/* @__PURE__ */ new Set(["all"]));
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const [newDeckTitle, setNewDeckTitle] = reactExports.useState("");
  const [newDeckSubject, setNewDeckSubject] = reactExports.useState("");
  const [newDeckDescription, setNewDeckDescription] = reactExports.useState("");
  const [selectedNoteId, setSelectedNoteId] = reactExports.useState(null);
  const [suggestedNames, setSuggestedNames] = reactExports.useState([]);
  const [showRenameDialog, setShowRenameDialog] = reactExports.useState(false);
  const [renamingDeck, setRenamingDeck] = reactExports.useState(null);
  const [renameTitle, setRenameTitle] = reactExports.useState("");
  reactExports.useEffect(() => {
    loadDecks();
    loadNotes();
  }, [user]);
  const loadDecks = async () => {
    try {
      if (!user) {
        const savedDecks = localStorage.getItem("flashcard_decks");
        if (savedDecks) {
          setDecks(JSON.parse(savedDecks));
        }
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.from("flashcard_decks").select("*").eq("user_id", user.id).order("updated_at", { ascending: false });
      if (error) throw error;
      const decksWithCount = await Promise.all((data || []).map(async (deck) => {
        const { count } = await supabase.from("flashcards").select("*", { count: "exact", head: true }).eq("deck_id", deck.id);
        return { ...deck, card_count: count || 0 };
      }));
      setDecks(decksWithCount);
      const dueCounts = {};
      for (const deck of decksWithCount) {
        const { count } = await supabase.from("flashcards").select("*", { count: "exact", head: true }).eq("deck_id", deck.id).lte("next_review_date", (/* @__PURE__ */ new Date()).toISOString());
        dueCounts[deck.id] = count || 0;
      }
      setDueCardCounts(dueCounts);
    } catch (error) {
      console.error("Failed to load decks:", error);
      ue.error("Failed to load flashcard decks");
    } finally {
      setLoading(false);
    }
  };
  const loadNotes = async () => {
    try {
      if (!user) {
        const savedNotes = localStorage.getItem("guest_notes");
        if (savedNotes) {
          const parsedNotes = JSON.parse(savedNotes);
          setNotes(parsedNotes.map((n) => ({
            ...n,
            headings: extractHeadings(n.content)
          })));
        }
        return;
      }
      const { data, error } = await supabase.from("notes").select("id, title, subject, content").eq("user_id", user.id).order("updated_at", { ascending: false });
      if (error) throw error;
      setNotes((data || []).map((n) => ({
        id: n.id,
        title: n.title,
        subject: n.subject || "other",
        content: n.content,
        headings: extractHeadings(n.content)
      })));
    } catch (error) {
      console.error("Failed to load notes:", error);
    }
  };
  const extractHeadings = (content) => {
    try {
      if (typeof content === "string") {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          return parsed.filter((block) => block.type === "heading").map((block) => {
            if (block.content && Array.isArray(block.content)) {
              return block.content.map((item) => {
                if (typeof item === "string") return item;
                if (item?.text) return item.text;
                return "";
              }).join("").trim();
            }
            return "";
          }).filter(Boolean);
        }
      }
      return [];
    } catch {
      return [];
    }
  };
  const handleNoteSelect = (noteId) => {
    setSelectedNoteId(noteId);
    const note = notes.find((n) => n.id === noteId);
    if (note) {
      setNewDeckSubject(note.subject);
      const headings = note.headings || [];
      setSuggestedNames([note.title, ...headings].filter(Boolean));
    }
  };
  const createDeck = async () => {
    if (!newDeckTitle.trim()) {
      ue.error("Please provide a deck name");
      return;
    }
    try {
      const deckData = {
        title: newDeckTitle.trim(),
        description: newDeckDescription.trim() || null,
        user_id: user?.id || "guest",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (!user) {
        const deckWithId = {
          ...deckData,
          id: `local_deck_${Date.now()}`,
          subject: newDeckSubject || "other",
          note_id: selectedNoteId,
          card_count: 0
        };
        const savedDecks = localStorage.getItem("flashcard_decks");
        const existingDecks = savedDecks ? JSON.parse(savedDecks) : [];
        const updatedDecks = [deckWithId, ...existingDecks];
        localStorage.setItem("flashcard_decks", JSON.stringify(updatedDecks));
        setDecks(updatedDecks);
        ue.success("Deck created!");
      } else {
        const { data, error } = await supabase.from("flashcard_decks").insert([deckData]).select().single();
        if (error) throw error;
        setDecks([{ ...data, card_count: 0, subject: newDeckSubject || "other" }, ...decks]);
        ue.success("Deck created!");
      }
      setShowCreateDialog(false);
      setNewDeckTitle("");
      setNewDeckSubject("");
      setNewDeckDescription("");
      setSelectedNoteId(null);
      setSuggestedNames([]);
    } catch (error) {
      console.error("Failed to create deck:", error);
      ue.error("Failed to create deck");
    }
  };
  const renameDeck = async () => {
    if (!renamingDeck || !renameTitle.trim()) return;
    try {
      if (!user) {
        const updatedDecks = decks.map(
          (d) => d.id === renamingDeck.id ? { ...d, title: renameTitle.trim() } : d
        );
        localStorage.setItem("flashcard_decks", JSON.stringify(updatedDecks));
        setDecks(updatedDecks);
      } else {
        const { error } = await supabase.from("flashcard_decks").update({ title: renameTitle.trim() }).eq("id", renamingDeck.id);
        if (error) throw error;
        setDecks(decks.map(
          (d) => d.id === renamingDeck.id ? { ...d, title: renameTitle.trim() } : d
        ));
      }
      ue.success("Deck renamed");
      setShowRenameDialog(false);
      setRenamingDeck(null);
      setRenameTitle("");
    } catch (error) {
      console.error("Failed to rename deck:", error);
      ue.error("Failed to rename deck");
    }
  };
  const deleteDeck = async (deckId) => {
    if (!confirm("Are you sure you want to delete this deck? All cards will be lost.")) return;
    try {
      if (!user) {
        const updatedDecks = decks.filter((d) => d.id !== deckId);
        localStorage.setItem("flashcard_decks", JSON.stringify(updatedDecks));
        localStorage.removeItem(`flashcards_${deckId}`);
        setDecks(updatedDecks);
      } else {
        const { error } = await supabase.from("flashcard_decks").delete().eq("id", deckId);
        if (error) throw error;
        setDecks(decks.filter((d) => d.id !== deckId));
      }
      ue.success("Deck deleted");
    } catch (error) {
      console.error("Failed to delete deck:", error);
      ue.error("Failed to delete deck");
    }
  };
  const getSubjectColor = (subject) => {
    return SUBJECTS.find((s) => s.value === subject)?.color || "bg-gray-500/10 text-gray-700 dark:text-gray-400";
  };
  const getSubjectLabel = (subject) => {
    return SUBJECTS.find((s) => s.value === subject)?.label || "Other";
  };
  const filteredDecks = decks.filter((deck) => {
    const matchesSearch = deck.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === "all" || deck.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });
  const decksBySubject = filteredDecks.reduce((acc, deck) => {
    const subject = deck.subject || "other";
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(deck);
    return acc;
  }, {});
  const toggleSubject = (subject) => {
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/work" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-6 w-6 text-primary" }),
              "Flashcards"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              decks.length,
              " decks • ",
              totalDueCards,
              " cards due for review"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowCreateDialog(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
          "New Deck"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search decks...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterSubject, onValueChange: setFilterSubject, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by subject" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Subjects" }),
            SUBJECTS.map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: subject.value, children: subject.label }, subject.value))
          ] })
        ] })
      ] }),
      totalDueCards > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mb-6 border-primary/50 bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Ready to study?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "You have ",
              totalDueCards,
              " cards due for review"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/work/study"), children: "Start Review" })
      ] }) }) }),
      decks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-12 w-12 text-muted-foreground/50 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-2", children: "No flashcard decks yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center mb-4 max-w-md", children: "Create your first deck to start studying. You can create decks from your notes and use headings as suggested deck names." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowCreateDialog(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
          "Create Your First Deck"
        ] })
      ] }) }) : filterSubject === "all" ? (
        // Show grouped by subject
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Object.entries(decksBySubject).map(([subject, subjectDecks]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Collapsible,
          {
            open: expandedSubjects.has(subject) || expandedSubjects.has("all"),
            onOpenChange: () => toggleSubject(subject),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "cursor-pointer hover:bg-muted/50 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  expandedSubjects.has(subject) || expandedSubjects.has("all") ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: getSubjectColor(subject), children: getSubjectLabel(subject) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                    subjectDecks.length,
                    " deck",
                    subjectDecks.length !== 1 ? "s" : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: subjectDecks.reduce((sum, d) => sum + (dueCardCounts[d.id] || 0), 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-orange-600 border-orange-300", children: [
                  subjectDecks.reduce((sum, d) => sum + (dueCardCounts[d.id] || 0), 0),
                  " due"
                ] }) })
              ] }) }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 ml-6", children: subjectDecks.map((deck) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                DeckCard,
                {
                  deck,
                  dueCount: dueCardCounts[deck.id] || 0,
                  onStudy: () => navigate(`/work/study?deck=${deck.id}`),
                  onEdit: () => {
                    setRenamingDeck(deck);
                    setRenameTitle(deck.title);
                    setShowRenameDialog(true);
                  },
                  onDelete: () => deleteDeck(deck.id),
                  getSubjectColor
                },
                deck.id
              )) }) })
            ]
          },
          subject
        )) })
      ) : (
        // Show filtered list
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredDecks.map((deck) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DeckCard,
          {
            deck,
            dueCount: dueCardCounts[deck.id] || 0,
            onStudy: () => navigate(`/work/study?deck=${deck.id}`),
            onEdit: () => {
              setRenamingDeck(deck);
              setRenameTitle(deck.title);
              setShowRenameDialog(true);
            },
            onDelete: () => deleteDeck(deck.id),
            getSubjectColor
          },
          deck.id
        )) })
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showCreateDialog, onOpenChange: setShowCreateDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Deck" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create a flashcard deck to organize your study cards. You can link it to a note to get suggested names from headings." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        notes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Link to Note (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedNoteId || "", onValueChange: handleNoteSelect, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a note..." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: notes.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: note.id, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3 w-3" }),
              note.title
            ] }) }, note.id)) })
          ] })
        ] }),
        suggestedNames.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-medium flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-primary" }),
            "Suggested Names"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[100px] border rounded-md p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: suggestedNames.map((name, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full justify-start text-left h-auto py-1.5",
              onClick: () => setNewDeckTitle(name),
              children: [
                index === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3 mr-2 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-3 mr-2 text-muted-foreground text-xs", children: [
                  "H",
                  index
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: name })
              ]
            },
            index
          )) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Deck Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Enter deck name...",
              value: newDeckTitle,
              onChange: (e) => setNewDeckTitle(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Subject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newDeckSubject, onValueChange: setNewDeckSubject, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select subject..." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SUBJECTS.map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: subject.value, children: subject.label }, subject.value)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Description (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Add a description...",
              value: newDeckDescription,
              onChange: (e) => setNewDeckDescription(e.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowCreateDialog(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: createDeck, disabled: !newDeckTitle.trim(), children: "Create Deck" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showRenameDialog, onOpenChange: setShowRenameDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Rename Deck" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: renameTitle,
          onChange: (e) => setRenameTitle(e.target.value),
          placeholder: "Deck name"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowRenameDialog(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: renameDeck, children: "Save" })
      ] })
    ] }) })
  ] });
}
function DeckCard({
  deck,
  dueCount,
  onStudy,
  onEdit,
  onDelete,
  getSubjectColor
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "hover:border-primary/50 transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base line-clamp-1", children: deck.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: onEdit, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4 mr-2" }),
              "Rename"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: onDelete, className: "text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
              "Delete"
            ] })
          ] })
        ] })
      ] }),
      deck.description && /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "line-clamp-2", children: deck.description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }),
          deck.card_count || 0,
          " cards"
        ] }),
        dueCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-orange-600 border-orange-300", children: [
          dueCount,
          " due"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
          formatDistanceToNow(new Date(deck.updated_at), { addSuffix: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: onStudy, disabled: (deck.card_count || 0) === 0, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4 mr-1" }),
          "Study"
        ] })
      ] })
    ] })
  ] });
}

export { Flashcards as default };
