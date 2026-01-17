import { r as reactExports, j as jsxRuntimeExports, $ as LoaderCircle, aw as Lightbulb, aQ as Plus, aC as Trash2, aB as ArrowRight } from './vendor-react-BeQHm2Hb.js';
import { u as useAuth, s as supabase, T as Tooltip, c as TooltipTrigger, B as Button, d as TooltipContent } from './index-C9tyh6tO.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { T as Textarea } from './textarea-1gnjGx7F.js';
import { L as Label } from './label-BfT9c56I.js';
import { I as Input } from './input-2hnN3JAu.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription } from './card-BTaNjRSt.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { u as useAutoSave } from './use-auto-save-DEAQNb2a.js';
import { c as useParams, u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
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

function IdeaBuilder() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [assignment, setAssignment] = reactExports.useState(null);
  const [rubric, setRubric] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [coaching, setCoaching] = reactExports.useState(null);
  const [isCoaching, setIsCoaching] = reactExports.useState(false);
  const [currentIdea, setCurrentIdea] = reactExports.useState("");
  const [thesis, setThesis] = reactExports.useState("");
  const [constraints, setConstraints] = reactExports.useState("");
  const [sections, setSections] = reactExports.useState([
    { id: "1", title: "Key Points", notes: "" }
  ]);
  reactExports.useEffect(() => {
    if (authLoading) return;
    loadAssignment();
  }, [user, authLoading, id]);
  const isGhostAssignment = id?.startsWith("ghost_");
  const loadAssignment = async () => {
    try {
      if (isGhostAssignment) {
        const savedAssignments = localStorage.getItem("ghost_assignments");
        if (savedAssignments) {
          const assignments = JSON.parse(savedAssignments);
          const ghostAssignment = assignments.find((a) => a.id === id);
          if (ghostAssignment) {
            setAssignment(ghostAssignment);
            const savedPlan = localStorage.getItem(`plan_${id}`);
            if (savedPlan) {
              const planData2 = JSON.parse(savedPlan);
              setThesis(planData2.thesis || "");
              setConstraints(planData2.constraints || "");
            }
          }
        }
        setLoading(false);
        return;
      }
      const { data: assignmentData, error: assignmentError } = await supabase.from("assignments").select("*").eq("id", id).single();
      if (assignmentError) throw assignmentError;
      setAssignment(assignmentData);
      if (assignmentData.rubric_id) {
        const { data: rubricData, error: rubricError } = await supabase.from("rubrics").select("*").eq("id", assignmentData.rubric_id).single();
        if (!rubricError && rubricData) {
          setRubric(rubricData);
        }
      }
      const { data: planData } = await supabase.from("plans").select("*").eq("assignment_id", id).single();
      if (planData) {
        setThesis(planData.thesis || "");
        setConstraints(planData.constraints || "");
      }
    } catch (error) {
      ue.error("Failed to load assignment");
    } finally {
      setLoading(false);
    }
  };
  const handleGetCoaching = async () => {
    if (!currentIdea.trim()) {
      ue.error("Please describe your idea first");
      return;
    }
    setIsCoaching(true);
    try {
      const { data, error } = await supabase.functions.invoke("coach-plan", {
        body: {
          subject: assignment.subject,
          taskType: assignment.task_type,
          currentIdea,
          rubric: rubric?.criteria || []
        }
      });
      if (error) throw error;
      setCoaching(data);
      ue.success("Coaching received!");
    } catch (error) {
      console.error("Coaching error:", error);
      ue.error(error.message || "Failed to get coaching");
    } finally {
      setIsCoaching(false);
    }
  };
  const autoSavePlan = async () => {
    try {
      const { data: existingPlan } = await supabase.from("plans").select("id").eq("assignment_id", id).single();
      if (existingPlan) {
        await supabase.from("plans").update({
          thesis,
          constraints
        }).eq("id", existingPlan.id);
      } else {
        await supabase.from("plans").insert({
          assignment_id: id,
          thesis,
          constraints
        });
      }
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };
  const { debouncedSave } = useAutoSave({
    onSave: autoSavePlan,
    delay: 2e3
  });
  reactExports.useEffect(() => {
    if (thesis || constraints || sections.length > 0) {
      debouncedSave();
    }
  }, [thesis, constraints, sections, debouncedSave]);
  const handleSave = async () => {
    try {
      await autoSavePlan();
      await supabase.from("assignments").update({ status: "outlining" }).eq("id", id);
      window.gtag?.("event", "save_plan", {
        assignment_id: id
      });
      ue.success("Plan saved!");
      navigate(`/work/assignment/${id}/outline`);
    } catch (error) {
      ue.error("Failed to save plan");
    }
  };
  const addSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: "",
      notes: ""
    };
    setSections([...sections, newSection]);
  };
  const removeSection = (sectionId) => {
    if (sections.length > 1) {
      setSections(sections.filter((s) => s.id !== sectionId));
    }
  };
  const updateSection = (sectionId, field, value) => {
    setSections(sections.map(
      (s) => s.id === sectionId ? { ...s, [field]: value } : s
    ));
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BackButton,
        {
          fallbackPath: `/work/assignment/${id}?edit=true`,
          size: "icon",
          tooltip: "Edit Assignment Details",
          className: "mb-4"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight", children: assignment?.title }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-5 w-5" }),
              "Develop Your Idea"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "idea", children: "What's your current idea or research question?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "idea",
                    placeholder: "Describe your initial thoughts, what interests you about this topic, and what you'd like to explore...",
                    value: currentIdea,
                    onChange: (e) => setCurrentIdea(e.target.value),
                    rows: 6
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleGetCoaching,
                  disabled: isCoaching || !currentIdea.trim(),
                  className: "w-full",
                  children: isCoaching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                    "Getting Coaching..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-4 w-4 mr-2" }),
                    "Get AI Coaching"
                  ] })
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Describe your initial thoughts and get AI coaching to refine your approach" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Plan Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Based on the coaching, refine your approach" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "thesis", children: "Working Thesis / Research Question" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "thesis",
                  placeholder: "Your main argument or research question...",
                  value: thesis,
                  onChange: (e) => setThesis(e.target.value),
                  rows: 3
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "constraints", children: "Constraints & Requirements" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "constraints",
                  placeholder: "Word count, specific requirements, etc.",
                  value: constraints,
                  onChange: (e) => setConstraints(e.target.value),
                  rows: 2
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Plan Sections" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: addSection,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3 mr-1" }),
                      "Add Section"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-2 group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "Section title...",
                      value: section.title,
                      onChange: (e) => updateSection(section.id, "title", e.target.value),
                      className: "font-semibold"
                    }
                  ),
                  sections.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      className: "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0",
                      onClick: () => removeSection(section.id),
                      title: "Delete section",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    placeholder: "Notes and key ideas for this section...",
                    value: section.notes,
                    onChange: (e) => updateSection(section.id, "notes", e.target.value),
                    rows: 3
                  }
                )
              ] }) }, section.id)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => navigate("/work"), className: "flex-1", children: "Save & Exit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSave, className: "flex-1", children: [
            "Save & Continue to Outline",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-2" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-medium sticky top-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "AI Coach" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: !coaching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: 'Describe your idea and click "Get AI Coaching" to receive personalized guidance' })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3 text-sm", children: "Clarifying Questions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: coaching.questions.map((question, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm p-3 rounded-lg bg-accent/10 border border-accent/20", children: question }, i)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2 text-sm", children: "Thesis Pattern" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm p-3 rounded-lg bg-primary/10 border border-primary/20 italic", children: coaching.thesisPattern })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3 text-sm", children: "Evidence Checklist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: coaching.evidenceChecklist.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success mt-0.5", children: "✓" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
              ] }, i)) })
            ] })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Questions and guidance to develop your idea" }) })
      ] }) })
    ] })
  ] }) });
}

export { IdeaBuilder as default };
