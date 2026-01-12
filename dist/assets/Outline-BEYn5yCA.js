import { r as reactExports, j as jsxRuntimeExports, ay as GripVertical, aC as Trash2, aQ as Plus, $ as LoaderCircle, aw as Lightbulb, aP as ChevronLeft, aR as ArrowLeft, aB as ArrowRight } from './vendor-react-BeQHm2Hb.js';
import { B as Button, u as useAuth, e as useFeatureFlags, a as useIsMobile, s as supabase } from './index-C9tyh6tO.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { C as Card, a as CardHeader, d as CardContent, b as CardTitle } from './card-BTaNjRSt.js';
import { I as Input } from './input-2hnN3JAu.js';
import { T as Textarea } from './textarea-1gnjGx7F.js';
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

const essayTemplate = [
  { id: "1", title: "Introduction", bullets: ["Hook the reader with an engaging opening", "Provide essential context", "State your thesis clearly"], order: 0 },
  { id: "2", title: "Context & Background", bullets: ["Establish historical/literary context", "Define key terms and concepts"], order: 1 },
  { id: "3", title: "Main Argument", bullets: ["Present your central claim", "Support with evidence and analysis"], order: 2 },
  { id: "4", title: "Evidence & Analysis", bullets: ["Use PEEL structure: Point, Evidence, Explanation, Link", "Include textual evidence/data", "Analyze rather than describe"], order: 3 },
  { id: "5", title: "Counterargument", bullets: ["Acknowledge opposing viewpoints", "Refute or concede appropriately"], order: 4 },
  { id: "6", title: "Conclusion", bullets: ["Restate thesis in new words", "Synthesize key points", "Offer broader significance"], order: 5 }
];
const iaTemplate = [
  {
    id: "1",
    title: "Introduction & Research Question",
    bullets: [
      "Personal engagement: Why did you choose this topic?",
      "State research question clearly with variables (IV, DV)",
      "Include a justified hypothesis",
      "Relevant biological/chemical/physical theory with citations"
    ],
    order: 0
  },
  {
    id: "2",
    title: "Methodology",
    bullets: [
      "List all materials and equipment",
      "Identify variables: Independent, Dependent, Controlled",
      "Write numbered step-by-step procedure (replicable)",
      "Justify method choices",
      "Address safety and ethical considerations",
      "Include diagram of experimental setup"
    ],
    order: 1
  },
  {
    id: "3",
    title: "Raw Data",
    bullets: [
      "Present all collected data in clear, labeled tables",
      "Include units and uncertainties (±)",
      "Record all trials (minimum 5 trials per IV value)",
      "Note qualitative observations"
    ],
    order: 2
  },
  {
    id: "4",
    title: "Processed Data & Analysis",
    bullets: [
      "Calculate averages and standard deviation",
      "Show sample calculations",
      "Create graphs with error bars and line of best fit",
      "Propagate uncertainties",
      "Analyze trends and patterns in detail"
    ],
    order: 3
  },
  {
    id: "5",
    title: "Conclusion",
    bullets: [
      "State whether hypothesis was supported",
      "Summarize key findings",
      "Relate back to scientific theory",
      "Discuss significance of results"
    ],
    order: 4
  },
  {
    id: "6",
    title: "Evaluation",
    bullets: [
      "Identify systematic and random errors",
      "Discuss limitations of method and their impact",
      "Suggest specific, realistic improvements",
      "Consider reliability and validity",
      "Propose extensions for further investigation"
    ],
    order: 5
  }
];
const eeTemplate = [
  {
    id: "1",
    title: "Introduction",
    bullets: [
      "Hook: Engage the reader with significance of topic",
      "State research question clearly",
      "Provide context and background for the investigation",
      "Outline the scope and approach of your essay",
      "Preview the structure of your argument"
    ],
    order: 0
  },
  {
    id: "2",
    title: "Literature Review / Background",
    bullets: [
      "Survey existing scholarship on your topic",
      "Identify key debates and perspectives",
      "Explain relevant theories and concepts",
      "Establish gaps your research will address",
      "Cite sources properly throughout"
    ],
    order: 1
  },
  {
    id: "3",
    title: "Methodology / Approach",
    bullets: [
      "Explain your research methods and approach",
      "Justify why this methodology is appropriate",
      "Describe sources/data you will analyze",
      "Address any limitations of your approach"
    ],
    order: 2
  },
  {
    id: "4",
    title: "Analysis & Discussion",
    bullets: [
      "Present your evidence and analysis",
      "Organize thematically or chronologically",
      "Include multiple perspectives where relevant",
      "Connect analysis directly to research question",
      "Use topic sentences to guide the reader"
    ],
    order: 3
  },
  {
    id: "5",
    title: "Conclusion",
    bullets: [
      "Answer your research question directly",
      "Summarize key findings and arguments",
      "Discuss implications and significance",
      "Acknowledge limitations",
      "Suggest areas for further research"
    ],
    order: 4
  },
  {
    id: "6",
    title: "Reflection (RPPF)",
    bullets: [
      "Reflect on what you learned about the topic",
      "Discuss challenges faced during research",
      "Consider how your understanding evolved",
      "Reflect on skills developed as a researcher"
    ],
    order: 5
  }
];
const tokTemplate = [
  {
    id: "1",
    title: "Introduction",
    bullets: [
      "Unpack the prescribed title / knowledge question",
      "Define key terms in the title",
      "State your thesis / main argument",
      "Preview the Areas of Knowledge you will explore"
    ],
    order: 0
  },
  {
    id: "2",
    title: "First Area of Knowledge",
    bullets: [
      "Develop a claim related to the knowledge question",
      "Use a specific real-life example to support",
      "Analyze using Ways of Knowing (WoKs)",
      "Connect back to the prescribed title"
    ],
    order: 1
  },
  {
    id: "3",
    title: "Second Area of Knowledge",
    bullets: [
      "Develop a contrasting or complementary claim",
      "Use a different real-life example",
      "Compare/contrast with first AOK",
      "Explore different perspectives"
    ],
    order: 2
  },
  {
    id: "4",
    title: "Counterclaims & Perspectives",
    bullets: [
      "Present alternative viewpoints",
      "Challenge your own claims",
      "Consider cultural, historical, or personal perspectives",
      "Evaluate the strength of counterclaims"
    ],
    order: 3
  },
  {
    id: "5",
    title: "Implications & Connections",
    bullets: [
      "Discuss broader implications for knowledge",
      "Connect insights across AOKs",
      "Consider real-world significance",
      "Reflect on limitations of your analysis"
    ],
    order: 4
  },
  {
    id: "6",
    title: "Conclusion",
    bullets: [
      "Synthesize your argument",
      "Provide a nuanced answer to the knowledge question",
      "Acknowledge complexity and ambiguity",
      "End with a thought-provoking insight"
    ],
    order: 5
  }
];
const commentaryTemplate = [
  {
    id: "1",
    title: "Introduction",
    bullets: [
      "Identify genre, form, and purpose of the text",
      "Comment on overall tone/mood",
      "State what the text is about (theme)",
      "Preview your analytical approach"
    ],
    order: 0
  },
  {
    id: "2",
    title: "Context & Setting",
    bullets: [
      "Discuss narrative voice/perspective",
      "Analyze the opening lines closely",
      "Comment on structural choices",
      "Establish the dramatic situation"
    ],
    order: 1
  },
  {
    id: "3",
    title: "Literary Devices & Language",
    bullets: [
      "Analyze diction and word choices",
      "Examine metaphors, similes, and symbols",
      "Discuss imagery and sensory details",
      "Explain the effect on the reader"
    ],
    order: 2
  },
  {
    id: "4",
    title: "Themes & Meaning",
    bullets: [
      "Identify central themes",
      "Trace how themes develop",
      "Connect literary features to thematic meaning",
      "Consider ambiguity and complexity"
    ],
    order: 3
  },
  {
    id: "5",
    title: "Structure & Form",
    bullets: [
      "Analyze how the text is organized",
      "Discuss rhythm, meter, or pacing",
      "Examine the ending and resolution",
      "Comment on the overall structure"
    ],
    order: 4
  },
  {
    id: "6",
    title: "Conclusion",
    bullets: [
      "Synthesize your analysis",
      "Reflect on the text's overall effect",
      "Comment on the author's success",
      "Avoid introducing new points"
    ],
    order: 5
  }
];
const outlineTemplates = {
  essay: essayTemplate,
  commentary: commentaryTemplate,
  tok: tokTemplate,
  ia: iaTemplate,
  ee: eeTemplate,
  other: essayTemplate
  // Default to essay structure
};
function getOutlineTemplate(taskType) {
  const template = outlineTemplates[taskType] || essayTemplate;
  return template.map((section, index) => ({
    ...section,
    id: String(index + 1),
    bullets: [...section.bullets]
  }));
}

function DraggableOutlineSections({
  sections,
  onUpdateSection,
  onAddBullet,
  onAddSection,
  onDeleteSection,
  onDeleteBullet,
  enabled = true
}) {
  const [draggedSection, setDraggedSection] = reactExports.useState(null);
  const [draggedBullet, setDraggedBullet] = reactExports.useState(null);
  const [dragOverTarget, setDragOverTarget] = reactExports.useState(null);
  const handleSectionDragStart = (e, sectionId) => {
    if (!enabled) return;
    setDraggedSection(sectionId);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleSectionDragOver = (e, sectionId) => {
    if (!enabled) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedSection && draggedSection !== sectionId) {
      setDragOverTarget({ type: "section", sectionId });
    }
  };
  const handleSectionDrop = (e, targetSectionId) => {
    if (!enabled || !draggedSection || draggedSection === targetSectionId) return;
    e.preventDefault();
    const draggedIdx = sections.findIndex((s) => s.id === draggedSection);
    const targetIdx = sections.findIndex((s) => s.id === targetSectionId);
    if (draggedIdx !== -1 && targetIdx !== -1) {
      const newSections = [...sections];
      const [movedSection] = newSections.splice(draggedIdx, 1);
      newSections.splice(targetIdx, 0, movedSection);
      newSections.forEach((section, index) => {
        section.order = index;
      });
      onUpdateSection("reorder", "sections", newSections);
    }
    setDraggedSection(null);
    setDragOverTarget(null);
  };
  const handleBulletDragStart = (e, sectionId, bulletIndex) => {
    if (!enabled) return;
    setDraggedBullet({ sectionId, bulletIndex });
    e.dataTransfer.effectAllowed = "move";
  };
  const handleBulletDragOver = (e, sectionId, bulletIndex) => {
    if (!enabled || !draggedBullet) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedBullet.sectionId !== sectionId || draggedBullet.bulletIndex !== bulletIndex) {
      setDragOverTarget({ type: "bullet", sectionId, bulletIndex });
    }
  };
  const handleBulletDrop = (e, targetSectionId, targetBulletIndex) => {
    if (!enabled || !draggedBullet) return;
    e.preventDefault();
    const { sectionId: sourceSectionId, bulletIndex: sourceBulletIndex } = draggedBullet;
    if (sourceSectionId === targetSectionId && sourceBulletIndex === targetBulletIndex) {
      setDraggedBullet(null);
      setDragOverTarget(null);
      return;
    }
    const sourceSection = sections.find((s) => s.id === sourceSectionId);
    const targetSection = sections.find((s) => s.id === targetSectionId);
    if (sourceSection && targetSection) {
      const sourceBullets = [...sourceSection.bullets];
      const targetBullets = [...targetSection.bullets];
      const [movedBullet] = sourceBullets.splice(sourceBulletIndex, 1);
      if (sourceSectionId === targetSectionId) {
        sourceBullets.splice(targetBulletIndex, 0, movedBullet);
        onUpdateSection(sourceSectionId, "bullets", sourceBullets);
      } else {
        targetBullets.splice(targetBulletIndex, 0, movedBullet);
        onUpdateSection(sourceSectionId, "bullets", sourceBullets);
        onUpdateSection(targetSectionId, "bullets", targetBullets);
      }
    }
    setDraggedBullet(null);
    setDragOverTarget(null);
  };
  const handleDragEnd = () => {
    setDraggedSection(null);
    setDraggedBullet(null);
    setDragOverTarget(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    sections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: `border-2 transition-all ${dragOverTarget?.type === "section" && dragOverTarget.sectionId === section.id ? "border-accent bg-accent/10" : "border-border"} ${draggedSection === section.id ? "opacity-50 scale-95" : ""}`,
        draggable: enabled,
        onDragStart: (e) => handleSectionDragStart(e, section.id),
        onDragOver: (e) => handleSectionDragOver(e, section.id),
        onDrop: (e) => handleSectionDrop(e, section.id),
        onDragEnd: handleDragEnd,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 group", children: [
            enabled && /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4 text-muted-foreground cursor-grab" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: section.title,
                onChange: (e) => onUpdateSection(section.id, "title", e.target.value),
                className: "font-semibold text-lg border-0 p-0 h-auto focus-visible:ring-0 flex-1",
                placeholder: "Section title..."
              }
            ),
            onDeleteSection && sections.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0",
                onClick: () => onDeleteSection(section.id),
                title: "Delete section",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
            section.bullets.map((bullet, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex gap-2 transition-all group ${dragOverTarget?.type === "bullet" && dragOverTarget.sectionId === section.id && dragOverTarget.bulletIndex === idx ? "bg-accent/20 border-2 border-dashed border-accent rounded" : ""} ${draggedBullet?.sectionId === section.id && draggedBullet?.bulletIndex === idx ? "opacity-50 scale-95" : ""}`,
                draggable: enabled && bullet.trim() !== "",
                onDragStart: (e) => handleBulletDragStart(e, section.id, idx),
                onDragOver: (e) => handleBulletDragOver(e, section.id, idx),
                onDrop: (e) => handleBulletDrop(e, section.id, idx),
                onDragEnd: handleDragEnd,
                children: [
                  enabled && bullet.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-3 w-3 text-muted-foreground cursor-grab" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground mt-2", children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      value: bullet,
                      onChange: (e) => {
                        const newBullets = [...section.bullets];
                        newBullets[idx] = e.target.value;
                        onUpdateSection(section.id, "bullets", newBullets);
                      },
                      placeholder: "Add a key point or sub-topic...",
                      rows: 2,
                      className: "flex-1"
                    }
                  ),
                  onDeleteBullet && section.bullets.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 self-start mt-1",
                      onClick: () => onDeleteBullet(section.id, idx),
                      title: "Delete bullet",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 text-destructive" })
                    }
                  )
                ]
              },
              idx
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => onAddBullet(section.id),
                className: "mt-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3 mr-1" }),
                  "Add bullet"
                ]
              }
            )
          ] })
        ]
      },
      section.id
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: onAddSection, className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
      "Add Section"
    ] })
  ] });
}

function Outline() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const { flags } = useFeatureFlags();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [assignment, setAssignment] = reactExports.useState(null);
  const [plan, setPlan] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [leftPanelCollapsed, setLeftPanelCollapsed] = reactExports.useState(() => {
    const saved = localStorage.getItem("outline-left-panel-collapsed");
    return saved === "true";
  });
  const [leftPanelWidth, setLeftPanelWidth] = reactExports.useState(() => {
    const saved = localStorage.getItem("outline-left-panel-width");
    return saved ? parseInt(saved) : 320;
  });
  const [sections, setSections] = reactExports.useState(() => getOutlineTemplate("essay"));
  reactExports.useEffect(() => {
    if (authLoading) return;
    loadAssignment();
    const planSubscription = supabase.channel(`plan-changes-${id}`).on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "plans",
        filter: `assignment_id=eq.${id}`
      },
      async (payload) => {
        console.log("Plan changed:", payload);
        const { data: planData } = await supabase.from("plans").select("*").eq("assignment_id", id).single();
        if (planData) {
          setPlan({
            thesis: planData.thesis || void 0,
            constraints: planData.constraints || void 0,
            sections: planData.sections || void 0
          });
        }
      }
    ).subscribe();
    return () => {
      planSubscription.unsubscribe();
    };
  }, [user, authLoading, id, navigate]);
  reactExports.useEffect(() => {
    localStorage.setItem("outline-left-panel-collapsed", leftPanelCollapsed.toString());
  }, [leftPanelCollapsed]);
  reactExports.useEffect(() => {
    localStorage.setItem("outline-left-panel-width", leftPanelWidth.toString());
  }, [leftPanelWidth]);
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
            const taskType2 = ghostAssignment.task_type || "essay";
            const template2 = getOutlineTemplate(taskType2);
            const savedPlan = localStorage.getItem(`plan_${id}`);
            if (savedPlan) {
              const planData2 = JSON.parse(savedPlan);
              setPlan({
                thesis: planData2.thesis || void 0,
                constraints: planData2.constraints || void 0,
                sections: planData2.sections || void 0
              });
            }
            const savedOutline = localStorage.getItem(`outline_${id}`);
            if (savedOutline) {
              setSections(JSON.parse(savedOutline));
            } else {
              const planData2 = savedPlan ? JSON.parse(savedPlan) : null;
              if (planData2?.thesis) {
                setSections(template2.map(
                  (section) => section.title === "Introduction" ? { ...section, bullets: [planData2.thesis || "", ...section.bullets.slice(1)] } : section
                ));
              } else {
                setSections(template2);
              }
            }
          }
        }
        setLoading(false);
        return;
      }
      const { data: assignmentData, error: assignmentError } = await supabase.from("assignments").select("*").eq("id", id).single();
      if (assignmentError) throw assignmentError;
      setAssignment(assignmentData);
      const taskType = assignmentData.task_type || "essay";
      const template = getOutlineTemplate(taskType);
      const { data: planData } = await supabase.from("plans").select("*").eq("assignment_id", id).maybeSingle();
      if (planData) {
        setPlan({
          thesis: planData.thesis || void 0,
          constraints: planData.constraints || void 0,
          sections: planData.sections || void 0
        });
      }
      const { data: outlineData } = await supabase.from("outlines").select("*").eq("assignment_id", id).maybeSingle();
      if (outlineData && outlineData.sections) {
        setSections(outlineData.sections);
      } else {
        if (planData?.thesis) {
          setSections(template.map(
            (section) => section.title === "Introduction" ? { ...section, bullets: [planData.thesis || "", ...section.bullets.slice(1)] } : section
          ));
        } else {
          setSections(template);
        }
      }
    } catch (error) {
      ue.error("Failed to load assignment");
    } finally {
      setLoading(false);
    }
  };
  const updateSectionTitle = (sectionId, title) => {
    setSections(sections.map((s) => s.id === sectionId ? { ...s, title } : s));
  };
  const updateBullet = (sectionId, bulletIndex, value) => {
    setSections(sections.map((s) => {
      if (s.id === sectionId) {
        const newBullets = [...s.bullets];
        newBullets[bulletIndex] = value;
        return { ...s, bullets: newBullets };
      }
      return s;
    }));
  };
  const addBullet = (sectionId) => {
    setSections(sections.map(
      (s) => s.id === sectionId ? { ...s, bullets: [...s.bullets, ""] } : s
    ));
  };
  const addSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: "New Section",
      bullets: [""],
      order: sections.length
    };
    setSections([...sections, newSection]);
  };
  const deleteSection = (sectionId) => {
    if (sections.length <= 1) return;
    setSections(sections.filter((s) => s.id !== sectionId));
  };
  const deleteBullet = (sectionId, bulletIndex) => {
    setSections(sections.map((s) => {
      if (s.id === sectionId && s.bullets.length > 1) {
        const newBullets = s.bullets.filter((_, idx) => idx !== bulletIndex);
        return { ...s, bullets: newBullets };
      }
      return s;
    }));
  };
  const handleSectionUpdate = (id2, field, value) => {
    if (id2 === "reorder" && field === "sections") {
      setSections(value);
    } else if (field === "title") {
      updateSectionTitle(id2, value);
    } else if (field === "bullets") {
      setSections(sections.map((s) => s.id === id2 ? { ...s, bullets: value } : s));
    } else if (field === "bullet") {
      updateBullet(id2, value.index, value.value);
    }
  };
  const saveOutline = async () => {
    try {
      const { data: existingOutline } = await supabase.from("outlines").select("id").eq("assignment_id", id).single();
      if (existingOutline) {
        await supabase.from("outlines").update({ sections }).eq("id", existingOutline.id);
      } else {
        await supabase.from("outlines").insert([{
          assignment_id: id,
          sections
        }]);
      }
    } catch (error) {
      throw error;
    }
  };
  const { debouncedSave } = useAutoSave({
    onSave: saveOutline,
    delay: 2e3
  });
  reactExports.useEffect(() => {
    if (sections.length > 0 && !loading) {
      debouncedSave();
    }
  }, [sections, debouncedSave, loading]);
  const handleSave = async () => {
    try {
      await saveOutline();
      await supabase.from("assignments").update({ status: "draft" }).eq("id", id);
      window.gtag?.("event", "save_outline", {
        assignment_id: id
      });
      ue.success("Outline saved!");
      navigate(`/work/assignment/${id}/draft`);
    } catch (error) {
      ue.error("Failed to save outline");
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `container mx-auto ${isMobile ? "px-3 py-2" : "px-6 py-4"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BackButton,
        {
          fallbackPath: `/work/assignment/${id}/plan`,
          size: "sm",
          tooltip: "Back to Plan"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: `${isMobile ? "text-base" : "text-xl"} font-bold truncate`, children: assignment?.title }),
        !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Outline & Flow" })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex ${isMobile ? "flex-col" : ""} h-[calc(100vh-73px)]`, children: [
      !isMobile && !leftPanelCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "aside",
        {
          className: "border-r bg-card/30 backdrop-blur-sm overflow-y-auto transition-all resize-x",
          style: {
            width: `${leftPanelWidth}px`,
            minWidth: "200px",
            maxWidth: "600px"
          },
          onMouseUp: (e) => {
            const width = e.target.offsetWidth;
            if (width >= 200) {
              setLeftPanelWidth(width);
            }
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-5 w-5 text-primary" }),
                "Your Plan"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-6 w-6",
                  onClick: () => setLeftPanelCollapsed(true),
                  title: "Hide Your Plan",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
                }
              )
            ] }),
            plan ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              plan.thesis && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Thesis" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm p-3 rounded-lg bg-primary/10 border border-primary/20", children: plan.thesis })
              ] }),
              plan.constraints && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Constraints" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm p-3 rounded-lg bg-muted/50 border", children: plan.constraints })
              ] }),
              plan.sections && plan.sections.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Plan Sections" }),
                plan.sections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm", children: section.title || "Untitled Section" }),
                  section.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground whitespace-pre-wrap", children: section.notes })
                ] }) }, section.id))
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No plan created yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "link",
                  size: "sm",
                  className: "mt-2",
                  onClick: () => navigate(`/work/assignment/${id}/plan`),
                  children: "Go to Plan Builder"
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 overflow-y-auto relative", children: [
        !isMobile && leftPanelCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "absolute top-4 left-4 z-10 h-8 w-8 bg-card/80 backdrop-blur-sm border shadow-sm",
            onClick: () => setLeftPanelCollapsed(false),
            title: "Show Your Plan",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `container max-w-4xl mx-auto ${isMobile ? "p-3" : "p-6"} space-y-6`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: `flex items-center gap-2 ${isMobile ? "text-base" : ""}`, children: [
              flags.draggableBullets && /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4 text-muted-foreground" }),
              "Build Your Structure"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DraggableOutlineSections,
              {
                sections,
                onUpdateSection: handleSectionUpdate,
                onAddBullet: addBullet,
                onAddSection: addSection,
                onDeleteSection: deleteSection,
                onDeleteBullet: deleteBullet,
                enabled: flags.draggableBullets
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex ${isMobile ? "flex-col" : ""} gap-3 pb-6`, children: [
            !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => navigate(`/work/assignment/${id}/plan`), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
              "Back to Plan"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => navigate("/work"), className: isMobile ? "" : "flex-1", children: "Save & Exit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSave, className: isMobile ? "" : "flex-1", children: [
              "Save & Continue to Draft",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-2" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}

export { Outline as default };
