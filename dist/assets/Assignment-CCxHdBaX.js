import { r as reactExports, j as jsxRuntimeExports, $ as LoaderCircle, aM as Calendar, aN as Save, aB as ArrowRight } from './vendor-react-BeQHm2Hb.js';
import { c as useParams, d as useSearchParams, u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
import { u as useAuth, b as useGhostSession, s as supabase, B as Button, i as cn } from './index-C9tyh6tO.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { I as Input } from './input-2hnN3JAu.js';
import { L as Label } from './label-BfT9c56I.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-BTaNjRSt.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { C as Calendar$1 } from './calendar-DjSFnPgs.js';
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from './popover-sIxpjwXN.js';
import { o as format } from './vendor-datefns-Cgc6WLhj.js';
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

function Assignment() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { getGhostAssignment, updateGhostAssignment } = useGhostSession();
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(true);
  const [assignment, setAssignment] = reactExports.useState(null);
  const [title, setTitle] = reactExports.useState("");
  const [subject, setSubject] = reactExports.useState("");
  const [taskType, setTaskType] = reactExports.useState("");
  const [deadline, setDeadline] = reactExports.useState();
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const isGhostAssignment = id?.startsWith("ghost_");
  const editMode = searchParams.get("edit") === "true";
  reactExports.useEffect(() => {
    if (authLoading) return;
    if (!id) {
      ue.error("No assignment ID provided");
      navigate("/work");
      return;
    }
    loadAssignment();
  }, [user, authLoading, id, navigate]);
  const loadAssignment = async () => {
    if (!id) {
      navigate("/work");
      return;
    }
    try {
      setLoading(true);
      if (isGhostAssignment) {
        const ghostAssignment = getGhostAssignment(id);
        if (!ghostAssignment) {
          ue.error("Assignment not found");
          navigate("/work");
          return;
        }
        setAssignment(ghostAssignment);
        setTitle(ghostAssignment.title || "");
        setSubject(ghostAssignment.subject || "");
        setTaskType(ghostAssignment.task_type || "");
        setDeadline(ghostAssignment.deadline ? new Date(ghostAssignment.deadline) : void 0);
        if (editMode) {
          setLoading(false);
          return;
        }
        switch (ghostAssignment.status) {
          case "draft":
          case "planning":
            navigate(`/work/assignment/${id}/plan`);
            break;
          case "outlining":
            navigate(`/work/assignment/${id}/outline`);
            break;
          case "writing":
          case "reviewing":
          case "complete":
            navigate(`/work/assignment/${id}/draft`);
            break;
          default:
            navigate(`/work/assignment/${id}/plan`);
        }
        return;
      }
      const { data: assignmentData, error } = await supabase.from("assignments").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      if (!assignmentData) {
        ue.error("Assignment not found");
        navigate("/work");
        return;
      }
      setAssignment(assignmentData);
      setTitle(assignmentData.title || "");
      setSubject(assignmentData.subject || "");
      setTaskType(assignmentData.task_type || "");
      setDeadline(assignmentData.deadline ? new Date(assignmentData.deadline) : void 0);
      if (editMode) {
        setLoading(false);
        return;
      }
      switch (assignmentData.status) {
        case "draft":
        case "planning":
          navigate(`/work/assignment/${id}/plan`);
          break;
        case "outlining":
          navigate(`/work/assignment/${id}/outline`);
          break;
        case "writing":
        case "reviewing":
        case "complete":
          navigate(`/work/assignment/${id}/draft`);
          break;
        default:
          navigate(`/work/assignment/${id}/plan`);
      }
    } catch (error) {
      ue.error("Failed to load assignment");
      navigate("/work");
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    if (!title.trim()) {
      ue.error("Please enter a title");
      return;
    }
    try {
      setIsSaving(true);
      if (isGhostAssignment) {
        updateGhostAssignment(id, {
          title,
          subject,
          task_type: taskType,
          deadline: deadline?.toISOString()
        });
        ue.success("Assignment updated");
      } else {
        const { error } = await supabase.from("assignments").update({
          title,
          subject,
          task_type: taskType,
          deadline: deadline?.toISOString()
        }).eq("id", id);
        if (error) throw error;
        ue.success("Assignment updated");
      }
    } catch (error) {
      ue.error("Failed to update assignment");
    } finally {
      setIsSaving(false);
    }
  };
  const handleContinue = () => {
    navigate(`/work/assignment/${id}/plan`);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl mx-auto px-6 py-16 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BackButton,
        {
          fallbackPath: "/work",
          size: "icon",
          tooltip: "Back to Dashboard"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: "Edit Assignment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Update assignment details" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Assignment Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Edit the details of your assignment" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "title",
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: "e.g., Biology IA - Enzyme Activity"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "subject", children: "Subject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "subject",
              value: subject,
              onChange: (e) => setSubject(e.target.value),
              placeholder: "e.g., Biology, Chemistry, etc.",
              disabled: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Subject cannot be changed after creation" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "taskType", children: "Task Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "taskType",
              value: taskType,
              onChange: (e) => setTaskType(e.target.value),
              placeholder: "e.g., IA, EE, etc.",
              disabled: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Task type cannot be changed after creation" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Deadline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: cn(
                  "w-full justify-start text-left font-normal",
                  !deadline && "text-muted-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mr-2 h-4 w-4" }),
                  deadline ? format(deadline, "PPP") : "Pick a deadline"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Calendar$1,
              {
                mode: "single",
                selected: deadline,
                onSelect: setDeadline,
                initialFocus: true
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSave,
              disabled: isSaving,
              variant: "outline",
              className: "flex-1",
              children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                "Saving..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
                "Save Changes"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleContinue, className: "flex-1", children: [
            "Continue to Plan",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-2" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}

export { Assignment as default };
