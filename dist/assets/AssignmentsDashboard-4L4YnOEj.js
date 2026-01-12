import { r as reactExports, j as jsxRuntimeExports, $ as LoaderCircle, aL as FilePen, aQ as Plus, bC as Search, bD as Filter, bE as ArrowUpDown, aI as EllipsisVertical, aJ as SquarePen, aC as Trash2, a0 as CloudOff, aK as Clock, aA as CircleCheck, al as BookOpen, ap as PenLine } from './vendor-react-BeQHm2Hb.js';
import { u as useAuth, b as useGhostSession, s as supabase, B as Button, D as DropdownMenu, f as DropdownMenuTrigger, g as DropdownMenuContent, h as DropdownMenuItem } from './index-C9tyh6tO.js';
import { u as useSEO } from './use-seo-B_kpg7C4.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from './card-BTaNjRSt.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { I as Input } from './input-2hnN3JAu.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-DtVQdYEt.js';
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
function AssignmentsDashboard() {
  useSEO("dashboard");
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { ghostAssignments, deleteGhostAssignment, createGhostAssignment } = useGhostSession();
  const [assignments, setAssignments] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [creatingAssignment, setCreatingAssignment] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [filterSubject, setFilterSubject] = reactExports.useState("all");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [sortBy, setSortBy] = reactExports.useState("updated");
  reactExports.useEffect(() => {
    if (authLoading) return;
    loadAssignments();
  }, [user, authLoading, ghostAssignments]);
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
          updated_at: ga.created_at,
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
      console.error("Failed to load assignments:", error);
      ue.error("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };
  const handleCreateAssignment = async () => {
    if (creatingAssignment) return;
    setCreatingAssignment(true);
    try {
      if (!user) {
        const ghostId = createGhostAssignment({
          title: "Untitled Assignment",
          subject: "other",
          task_type: "essay",
          status: "draft"
        });
        navigate(`/work/assignment/${ghostId}?edit=true`);
      } else {
        navigate("/work/assignment/new");
      }
    } catch (error) {
      console.error("Failed to create assignment:", error);
      ue.error("Failed to create assignment");
    } finally {
      setCreatingAssignment(false);
    }
  };
  const handleMoveToTrash = async (assignmentId, isGhost, e) => {
    e.stopPropagation();
    if (isGhost) {
      deleteGhostAssignment(assignmentId);
      setAssignments(assignments.filter((a) => a.id !== assignmentId));
      ue.success("Assignment deleted");
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
      ue.success("Assignment moved to trash");
    } catch (error) {
      console.error("Failed to move to trash:", error);
      ue.error("Failed to move assignment to trash");
    }
  };
  const getSubjectInfo = (subjectValue) => {
    return SUBJECTS.find((s) => s.value === subjectValue) || { label: subjectValue, color: "bg-gray-500/10 text-gray-700" };
  };
  const getStatusInfo = (status) => {
    return STATUS_CONFIG[status] || STATUS_CONFIG.draft;
  };
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) || assignment.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === "all" || assignment.subject === filterSubject;
    const matchesStatus = filterStatus === "all" || assignment.status === filterStatus;
    return matchesSearch && matchesSubject && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "created":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "deadline":
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case "updated":
      default:
        return new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime();
    }
  });
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/work" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FilePen, { className: "h-6 w-6 text-primary" }),
            "My Assignments"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            assignments.length,
            " assignment",
            assignments.length !== 1 ? "s" : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreateAssignment, disabled: creatingAssignment, children: [
        creatingAssignment ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "New Assignment"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search assignments...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "pl-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterSubject, onValueChange: setFilterSubject, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "w-[160px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "h-4 w-4 mr-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Subject" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Subjects" }),
          SUBJECTS.map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: subject.value, children: subject.label }, subject.value))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterStatus, onValueChange: setFilterStatus, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[140px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
          Object.entries(STATUS_CONFIG).map(([value, config]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value, children: config.label }, value))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortBy, onValueChange: (v) => setSortBy(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "w-[140px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-4 w-4 mr-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sort" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "updated", children: "Last Updated" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "created", children: "Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "title", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "deadline", children: "Deadline" })
        ] })
      ] })
    ] }),
    filteredAssignments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilePen, { className: "h-12 w-12 text-muted-foreground/50 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-2", children: searchQuery || filterSubject !== "all" || filterStatus !== "all" ? "No matching assignments" : "No assignments yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center mb-4 max-w-md", children: searchQuery || filterSubject !== "all" || filterStatus !== "all" ? "Try adjusting your filters or search query" : "Create your first assignment to get started with IB essay writing" }),
      !searchQuery && filterSubject === "all" && filterStatus === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreateAssignment, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Create Assignment"
      ] })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: filteredAssignments.map((assignment) => {
      const subjectInfo = getSubjectInfo(assignment.subject);
      const statusInfo = getStatusInfo(assignment.status);
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
                formatDistanceToNow(new Date(assignment.updated_at || assignment.created_at), { addSuffix: true })
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
  ] }) });
}

export { AssignmentsDashboard as default };
