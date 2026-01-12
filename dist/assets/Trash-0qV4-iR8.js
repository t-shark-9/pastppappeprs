import { r as reactExports, j as jsxRuntimeExports, aC as Trash2, aA as CircleCheck, aK as Clock, bI as RotateCcw } from './vendor-react-BeQHm2Hb.js';
import { u as useAuth, s as supabase, T as Tooltip, c as TooltipTrigger, B as Button, d as TooltipContent } from './index-C9tyh6tO.js';
import { C as Card, a as CardHeader, d as CardContent, b as CardTitle, c as CardDescription } from './card-BTaNjRSt.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
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
import './vendor-datefns-Cgc6WLhj.js';
import './vendor-syncfusion-B9hbBizT.js';
import './vendor-ketcher-B9jnF8te.js';
import './vendor-supabase-B1aOSilF.js';

function Trash() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [deletedDrafts, setDeletedDrafts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth");
      return;
    }
    loadDeletedDrafts();
  }, [user, authLoading, navigate]);
  const loadDeletedDrafts = async () => {
    try {
      const { data, error } = await supabase.from("drafts").select(`
          id,
          assignment_id,
          deleted_at,
          assignment:assignments!inner(
            id,
            title,
            subject,
            task_type,
            deadline,
            status,
            created_at
          )
        `).not("deleted_at", "is", null).order("deleted_at", { ascending: false });
      if (error) throw error;
      setDeletedDrafts(data || []);
    } catch (error) {
      console.error("Failed to load deleted drafts:", error);
      ue.error("Failed to load trash");
    } finally {
      setLoading(false);
    }
  };
  const handleRestore = async (draftId) => {
    try {
      const { error } = await supabase.from("drafts").update({ deleted_at: null }).eq("id", draftId);
      if (error) throw error;
      setDeletedDrafts(deletedDrafts.filter((d) => d.id !== draftId));
      ue.success("Draft restored successfully");
    } catch (error) {
      console.error("Failed to restore:", error);
      ue.error("Failed to restore draft");
    }
  };
  const handlePermanentDelete = async (draftId) => {
    if (!confirm("Are you sure you want to permanently delete this draft? This cannot be undone.")) {
      return;
    }
    try {
      const draft = deletedDrafts.find((d) => d.id === draftId);
      if (!draft) return;
      const assignmentId = draft.assignment_id;
      await supabase.from("coaching_sessions").delete().eq("assignment_id", assignmentId);
      await supabase.from("reviews").delete().eq("assignment_id", assignmentId);
      await supabase.from("outlines").delete().eq("assignment_id", assignmentId);
      await supabase.from("plans").delete().eq("assignment_id", assignmentId);
      await supabase.from("drafts").delete().eq("assignment_id", assignmentId);
      const { error } = await supabase.from("assignments").delete().eq("id", assignmentId);
      if (error) throw error;
      setDeletedDrafts(deletedDrafts.filter((d) => d.id !== draftId));
      ue.success("Draft permanently deleted");
    } catch (error) {
      console.error("Failed to delete:", error);
      ue.error("Failed to delete draft");
    }
  };
  const handleEmptyTrash = async () => {
    if (!confirm("Are you sure you want to permanently delete ALL drafts in trash? This cannot be undone.")) {
      return;
    }
    try {
      const assignmentIds = deletedDrafts.map((d) => d.assignment_id);
      await supabase.from("coaching_sessions").delete().in("assignment_id", assignmentIds);
      await supabase.from("reviews").delete().in("assignment_id", assignmentIds);
      await supabase.from("outlines").delete().in("assignment_id", assignmentIds);
      await supabase.from("plans").delete().in("assignment_id", assignmentIds);
      await supabase.from("drafts").delete().in("assignment_id", assignmentIds);
      const { error } = await supabase.from("assignments").delete().in("id", assignmentIds);
      if (error) throw error;
      setDeletedDrafts([]);
      ue.success("Trash emptied successfully");
    } catch (error) {
      console.error("Failed to empty trash:", error);
      ue.error("Failed to empty trash");
    }
  };
  const getStatusColor = (status) => {
    const colors = {
      draft: "bg-muted text-muted-foreground",
      planning: "bg-accent/20 text-accent-foreground",
      outlining: "bg-primary/20 text-primary",
      writing: "bg-warning/20 text-warning-foreground",
      reviewing: "bg-secondary/50 text-secondary-foreground",
      complete: "bg-success/20 text-success"
    };
    return colors[status] || "bg-muted";
  };
  const formatDate = (dateString) => {
    if (!dateString) return "No deadline";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto p-6 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BackButton,
          {
            fallbackPath: "/dashboard",
            size: "icon",
            tooltip: "Back to Dashboard",
            className: "mb-4"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight", children: "Trash" })
        ] })
      ] }),
      deletedDrafts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            size: "icon",
            onClick: handleEmptyTrash,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Empty Trash" }) })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 bg-muted rounded w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-1/2 mt-2" })
    ] }) }, i)) }) : deletedDrafts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-2", children: "Trash is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Deleted drafts will appear here" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: deletedDrafts.map((draft) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "shadow-soft transition-all group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "truncate", children: draft.assignment.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { className: "flex items-center gap-2 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: draft.assignment.subject.replace("_", " ") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: draft.assignment.task_type })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
                "Deleted ",
                formatDate(draft.deleted_at)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: getStatusColor(draft.assignment.status), children: [
              draft.assignment.status === "complete" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 mr-1" }) : null,
              draft.assignment.status
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 mr-1" }),
              formatDate(draft.assignment.deadline)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => handleRestore(draft.id),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4 mr-1" }),
                    "Restore"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "destructive",
                  size: "sm",
                  onClick: () => handlePermanentDelete(draft.id),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }) })
        ]
      },
      draft.id
    )) })
  ] }) });
}

export { Trash as default };
