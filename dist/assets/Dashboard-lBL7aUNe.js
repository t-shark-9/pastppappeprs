import { r as reactExports, j as jsxRuntimeExports, aC as Trash2, aD as User, aE as LogOut, a0 as CloudOff, aF as ClipboardList, ax as FileText, aG as Brain, aH as FileQuestion, al as BookOpen, aI as EllipsisVertical, aJ as SquarePen, aK as Clock, aA as CircleCheck, ap as PenLine, aL as FilePen } from './vendor-react-BeQHm2Hb.js';
import { u as useAuth, b as useGhostSession, s as supabase, e as useFeatureFlags, a as useIsMobile, T as Tooltip, c as TooltipTrigger, B as Button, d as TooltipContent, D as DropdownMenu, f as DropdownMenuTrigger, g as DropdownMenuContent, h as DropdownMenuItem } from './index-C9tyh6tO.js';
import { u as useSEO } from './use-seo-B_kpg7C4.js';
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle, c as CardDescription } from './card-BTaNjRSt.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
import { F as formatDistanceToNow, o as format } from './vendor-datefns-Cgc6WLhj.js';
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

function useGhostMigration() {
  const { user } = useAuth();
  const { ghostAssignments, clearGhostData } = useGhostSession();
  const hasMigrated = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const shouldMigrate = localStorage.getItem("tooessay_migrate_ghost_after_auth");
    if (user && shouldMigrate === "true" && ghostAssignments.length > 0 && !hasMigrated.current) {
      hasMigrated.current = true;
      migrateGhostData();
    }
  }, [user, ghostAssignments]);
  const migrateGhostData = async () => {
    if (!user) return;
    localStorage.removeItem("tooessay_migrate_ghost_after_auth");
    try {
      let migratedCount = 0;
      for (const ghostAssignment of ghostAssignments) {
        const { data: newAssignment, error: assignmentError } = await supabase.from("assignments").insert([{
          user_id: user.id,
          title: ghostAssignment.title,
          subject: ghostAssignment.subject,
          task_type: ghostAssignment.task_type,
          status: ghostAssignment.status
        }]).select().single();
        if (assignmentError) {
          console.error("Failed to migrate assignment:", assignmentError);
          continue;
        }
        if (ghostAssignment.plan) {
          await supabase.from("plans").insert([{
            assignment_id: newAssignment.id,
            ...ghostAssignment.plan
          }]);
        }
        if (ghostAssignment.outline) {
          await supabase.from("outlines").insert([{
            assignment_id: newAssignment.id,
            sections: ghostAssignment.outline.sections || []
          }]);
        }
        if (ghostAssignment.draft) {
          await supabase.from("drafts").insert([{
            assignment_id: newAssignment.id,
            content: ghostAssignment.draft.content,
            word_count: ghostAssignment.draft.word_count || 0
          }]);
        }
        migratedCount++;
      }
      if (migratedCount > 0) {
        ue.success(`Saved ${migratedCount} draft${migratedCount > 1 ? "s" : ""} to your account!`);
        clearGhostData();
      }
    } catch (error) {
      console.error("Failed to migrate ghost data:", error);
      ue.error("Failed to save some drafts to your account");
    }
  };
  return { migrateGhostData };
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
  { value: "other", label: "Other", color: "bg-gray-500/10 text-gray-700 dark:text-gray-400" }
];
const STATUS_CONFIG = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FilePen, { className: "h-3 w-3" }) },
  planning: { label: "Planning", color: "bg-accent/20 text-accent-foreground", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3 w-3" }) },
  outlining: { label: "Outlining", color: "bg-primary/20 text-primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3" }) },
  writing: { label: "Writing", color: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3 w-3" }) },
  reviewing: { label: "Reviewing", color: "bg-blue-500/20 text-blue-700 dark:text-blue-400", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3" }) },
  complete: { label: "Complete", color: "bg-green-500/20 text-green-700 dark:text-green-400", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }) }
};
function Dashboard() {
  const { user, signOut, loading: authLoading } = useAuth();
  const { ghostAssignments, deleteGhostAssignment, createGhostAssignment, isGhostMode } = useGhostSession();
  const { flags } = useFeatureFlags();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [assignments, setAssignments] = reactExports.useState([]);
  const [recentNotes, setRecentNotes] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [creatingGhost, setCreatingGhost] = reactExports.useState(false);
  useSEO("dashboard");
  useGhostMigration();
  reactExports.useEffect(() => {
    if (authLoading) return;
    loadAssignments();
    loadRecentNotes();
  }, [user, authLoading, ghostAssignments]);
  const loadRecentNotes = async () => {
    try {
      if (!user) {
        const savedNotes = localStorage.getItem("guest_notes");
        if (savedNotes) {
          const notes = JSON.parse(savedNotes);
          const sorted = notes.sort(
            (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          ).slice(0, 3);
          setRecentNotes(sorted);
        }
        return;
      }
      const { data, error } = await supabase.from("notes").select("id, title, updated_at").eq("user_id", user.id).order("updated_at", { ascending: false }).limit(3);
      if (error) {
        console.error("Failed to load recent notes:", error);
        return;
      }
      setRecentNotes(data || []);
    } catch (error) {
      console.error("Failed to load recent notes:", error);
    }
  };
  const loadAssignments = async () => {
    try {
      let combinedAssignments = [];
      if (ghostAssignments.length > 0) {
        const ghostMapped = ghostAssignments.map((ga) => ({
          id: ga.id,
          title: ga.title,
          subject: ga.subject,
          task_type: ga.task_type,
          deadline: null,
          status: ga.status,
          created_at: ga.created_at,
          isGhost: true
        }));
        combinedAssignments = [...ghostMapped];
      }
      if (user) {
        const { data: allAssignments, error: assignmentsError } = await supabase.from("assignments").select("*").order("created_at", { ascending: false });
        if (assignmentsError) throw assignmentsError;
        const { data: drafts, error: draftsError } = await supabase.from("drafts").select("assignment_id, deleted_at");
        if (draftsError) throw draftsError;
        const draftStatusMap = new Map(
          drafts?.map((d) => [d.assignment_id, d.deleted_at]) || []
        );
        const activeAssignments = (allAssignments || []).filter((assignment) => {
          const deletedAt = draftStatusMap.get(assignment.id);
          return !deletedAt;
        });
        combinedAssignments = [
          ...combinedAssignments,
          ...activeAssignments.map((a) => ({ ...a, isGhost: false }))
        ];
      }
      setAssignments(combinedAssignments);
    } catch (error) {
      ue.error("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };
  const handleMoveToTrash = async (assignmentId, isGhost, e) => {
    e.stopPropagation();
    if (isGhost) {
      deleteGhostAssignment(assignmentId);
      setAssignments(assignments.filter((a) => a.id !== assignmentId));
      ue.success("Draft deleted");
      return;
    }
    try {
      const { data: draft, error: fetchError } = await supabase.from("drafts").select("id").eq("assignment_id", assignmentId).maybeSingle();
      if (fetchError) throw fetchError;
      if (draft) {
        const { error: deleteError } = await supabase.from("drafts").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", draft.id);
        if (deleteError) throw deleteError;
      }
      setAssignments(assignments.filter((a) => a.id !== assignmentId));
      ue.success("Draft moved to trash");
    } catch (error) {
      console.error("Failed to move to trash:", error);
      ue.error("Failed to move draft to trash");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `container max-w-6xl mx-auto ${isMobile ? "p-3" : "p-6"} space-y-6 md:space-y-8`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: `${isMobile ? "text-2xl" : "text-4xl"} font-bold tracking-tight`, children: "My Work" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        user && !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/work/trash"), variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Trash" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/work/account"), variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Account" }) })
        ] }),
        user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: signOut, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Sign Out" }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/auth"), variant: "default", size: "sm", children: "Sign In" })
      ] })
    ] }),
    isGhostMode && !user && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-destructive/50 bg-destructive/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CloudOff, { className: "h-5 w-5 text-destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-destructive", children: "You're in guest mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your work is saved locally. Sign in to save it permanently." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/auth"), size: "sm", children: "Sign In to Save" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid gap-4 ${isMobile ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-4"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: `cursor-pointer hover:shadow-lg transition-all border-2 border-primary/30 hover:border-primary bg-card ${isMobile ? "" : "md:col-span-2"}`,
            onClick: () => navigate("/work/assignments"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-8 w-8 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "My Assignments" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "View and manage all your IB assignments" })
              ] })
            ] }) })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "View and manage all your assignments in one place. Filter by subject, status, and deadline." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "cursor-pointer hover:shadow-lg transition-all border-2 border-dashed hover:border-primary/50 bg-card",
            onClick: () => navigate("/work/notes"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "My Notes" })
            ] }) })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Quick notes and ideas with BlockNote editor. Capture thoughts, brainstorm ideas, and organize information with block-based editing." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "cursor-pointer hover:shadow-lg transition-all border-2 border-dashed hover:border-primary/50 bg-card",
            onClick: () => navigate("/work/flashcards"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Flashcards" })
            ] }) })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Study with flashcards organized by subject. Create decks from your notes and use spaced repetition for effective learning." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "cursor-pointer hover:shadow-lg transition-all border-2 border-dashed hover:border-primary/50 bg-card",
            onClick: () => navigate("/work/past-papers"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileQuestion, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Past Papers" })
            ] }) })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Browse and practice with past exam papers. Generate AI variations to test your understanding." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "cursor-pointer hover:shadow-lg transition-all border-2 border-dashed hover:border-primary/50 bg-card",
            onClick: () => navigate("/work/books"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Books" })
            ] }) })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Browse recommended reading materials organized by subjects. Discover books relevant to your studies." }) })
      ] })
    ] }),
    assignments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Continue Your Work" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => navigate("/work/assignments"), children: "View All" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: assignments.slice(0, 6).map((assignment) => {
        const subjectInfo = SUBJECTS.find((s) => s.value === assignment.subject) || { label: assignment.subject, color: "bg-gray-500/10 text-gray-700" };
        const statusInfo = STATUS_CONFIG[assignment.status] || STATUS_CONFIG.draft;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "cursor-pointer hover:shadow-lg transition-all hover:border-primary/50 group",
            onClick: () => navigate(`/work/assignment/${assignment.id}`),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg line-clamp-2 group-hover:text-primary transition-colors", children: assignment.title || "Untitled Assignment" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: (e) => {
                        e.stopPropagation();
                        navigate(`/work/assignment/${assignment.id}?edit=true`);
                      }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4 mr-2" }),
                        "Edit Details"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        DropdownMenuItem,
                        {
                          className: "text-destructive",
                          onClick: (e) => handleMoveToTrash(assignment.id, assignment.isGhost || false, e),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
                            "Move to Trash"
                          ]
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: subjectInfo.color, variant: "secondary", children: subjectInfo.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: statusInfo.color, variant: "secondary", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", children: statusInfo.icon }),
                    statusInfo.label
                  ] }),
                  assignment.isGhost && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CloudOff, { className: "h-3 w-3 mr-1" }),
                    "Local"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                  formatDistanceToNow(new Date(assignment.created_at), { addSuffix: true })
                ] }),
                assignment.deadline && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Due:" }),
                  format(new Date(assignment.deadline), "MMM d, yyyy")
                ] })
              ] }) })
            ]
          },
          assignment.id
        );
      }) })
    ] })
  ] }) });
}

export { Dashboard as default };
