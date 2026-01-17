import { r as reactExports, j as jsxRuntimeExports, aj as ChevronDown, aM as Calendar } from './vendor-react-BeQHm2Hb.js';
import { u as useAuth, b as useGhostSession, B as Button, i as cn, s as supabase } from './index-C9tyh6tO.js';
import { I as Input } from './input-2hnN3JAu.js';
import { L as Label } from './label-BfT9c56I.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from './card-BTaNjRSt.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-DtVQdYEt.js';
import { C as Calendar$1 } from './calendar-DjSFnPgs.js';
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from './popover-sIxpjwXN.js';
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from './accordion-DC352Etu.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
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

function CreateAssignment() {
  const { user, loading: authLoading } = useAuth();
  const { createGhostAssignment } = useGhostSession();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [userProfile, setUserProfile] = reactExports.useState(null);
  const [isIBUser, setIsIBUser] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [subject, setSubject] = reactExports.useState("");
  const [subjectLabel, setSubjectLabel] = reactExports.useState("");
  const [taskType, setTaskType] = reactExports.useState("");
  const [deadline, setDeadline] = reactExports.useState();
  const [subjectPopoverOpen, setSubjectPopoverOpen] = reactExports.useState(false);
  const subjectGroups = [
    {
      name: "Core",
      subjects: [
        { value: "tok", label: "Theory of Knowledge", taskTypes: ["tok_exhibition", "tok_essay"] }
      ]
    },
    {
      name: "Group 1: Studies in Language and Literature",
      subjects: [
        { value: "lang_a_literature", label: "Language A: Literature", taskTypes: ["ia", "ee"] },
        { value: "lang_a_lang_lit", label: "Language A: Language and Literature", taskTypes: ["ia", "ee"] },
        { value: "literature_performance", label: "Literature and Performance", taskTypes: ["ia", "ee"] }
      ]
    },
    {
      name: "Group 2: Language Acquisition",
      subgroups: [
        {
          name: "Classical Languages",
          subjects: [
            { value: "latin", label: "Latin", taskTypes: ["ia", "ee"] },
            { value: "classical_greek", label: "Classical Greek", taskTypes: ["ia", "ee"] }
          ]
        },
        {
          name: "Language Ab Initio",
          subjects: [
            { value: "arabic_ab", label: "Arabic Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "chinese_ab", label: "Chinese Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "french_ab", label: "French Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "german_ab", label: "German Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "hindi_ab", label: "Hindi Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "japanese_ab", label: "Japanese Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "korean_ab", label: "Korean Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "portuguese_ab", label: "Portuguese Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "russian_ab", label: "Russian Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "spanish_ab", label: "Spanish Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "other_ab", label: "Other Ab Initio Language", taskTypes: ["ia", "ee"] }
          ]
        },
        {
          name: "Language B",
          subjects: [
            { value: "english_b", label: "English B", taskTypes: ["ia", "ee"] },
            { value: "french_b", label: "French B", taskTypes: ["ia", "ee"] },
            { value: "german_b", label: "German B", taskTypes: ["ia", "ee"] },
            { value: "spanish_b", label: "Spanish B", taskTypes: ["ia", "ee"] },
            { value: "italian_b", label: "Italian B", taskTypes: ["ia", "ee"] },
            { value: "japanese_b", label: "Japanese B", taskTypes: ["ia", "ee"] },
            { value: "mandarin_b", label: "Mandarin B", taskTypes: ["ia", "ee"] },
            { value: "other_b", label: "Other Language B", taskTypes: ["ia", "ee"] }
          ]
        }
      ]
    },
    {
      name: "Group 3: Individuals and Societies",
      subjects: [
        { value: "business_management", label: "Business Management", taskTypes: ["ia", "ee"] },
        { value: "digital_society", label: "Digital Society", taskTypes: ["ia", "ee"] },
        { value: "economics", label: "Economics", taskTypes: ["ia", "ee"] },
        { value: "geography", label: "Geography", taskTypes: ["ia", "ee"] },
        { value: "global_politics", label: "Global Politics", taskTypes: ["ia", "ee"] },
        { value: "history", label: "History", taskTypes: ["ia", "ee"] },
        { value: "philosophy", label: "Philosophy", taskTypes: ["ia", "ee"] },
        { value: "psychology", label: "Psychology", taskTypes: ["ia", "ee"] },
        { value: "social_cultural_anthropology", label: "Social and Cultural Anthropology", taskTypes: ["ia", "ee"] },
        { value: "world_religions", label: "World Religions", taskTypes: ["ia", "ee"] }
      ]
    },
    {
      name: "Group 4: Sciences",
      subjects: [
        { value: "biology", label: "Biology", taskTypes: ["ia", "ee"] },
        { value: "chemistry", label: "Chemistry", taskTypes: ["ia", "ee"] },
        { value: "physics", label: "Physics", taskTypes: ["ia", "ee"] },
        { value: "computer_science", label: "Computer Science", taskTypes: ["ia", "ee"] },
        { value: "design_technology", label: "Design Technology", taskTypes: ["ia", "ee"] },
        { value: "ess", label: "Environmental Systems and Societies", taskTypes: ["ia", "ee"] },
        { value: "sehs", label: "Sports, Exercise and Health Science", taskTypes: ["ia", "ee"] }
      ]
    },
    {
      name: "Group 5: Mathematics",
      subjects: [
        { value: "math_aa", label: "Mathematics: Analysis and Approaches", taskTypes: ["ia", "ee"] },
        { value: "math_ai", label: "Mathematics: Applications and Interpretation", taskTypes: ["ia", "ee"] }
      ]
    },
    {
      name: "Group 6: The Arts",
      subjects: [
        { value: "visual_arts", label: "Visual Arts", taskTypes: ["ia", "ee"] },
        { value: "music", label: "Music", taskTypes: ["ia", "ee"] },
        { value: "theatre", label: "Theatre", taskTypes: ["ia", "ee"] },
        { value: "dance", label: "Dance", taskTypes: ["ia", "ee"] },
        { value: "film", label: "Film", taskTypes: ["ia", "ee"] }
      ]
    }
  ];
  const getAvailableTaskTypes = () => {
    if (!subject) return [];
    for (const group of subjectGroups) {
      if (group.subjects) {
        const found = group.subjects.find((s) => s.value === subject);
        if (found) return found.taskTypes;
      }
      if (group.subgroups) {
        for (const subgroup of group.subgroups) {
          const found = subgroup.subjects.find((s) => s.value === subject);
          if (found) return found.taskTypes;
        }
      }
    }
    return ["ia", "ee"];
  };
  const taskTypeLabels = {
    tok_exhibition: "ToK Exhibition",
    tok_essay: "ToK Essay",
    ia: "Internal Assessment (IA)",
    ee: "Extended Essay (EE)"
  };
  reactExports.useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase.from("profiles").select("school_program, education_type").eq("id", user.id).single();
      if (!error && data) {
        setUserProfile(data);
        setIsIBUser(data.school_program?.toLowerCase() === "ib");
      }
    };
    loadUserProfile();
  }, [user]);
  reactExports.useEffect(() => {
    const availableTypes = getAvailableTaskTypes();
    if (taskType && !availableTypes.includes(taskType)) {
      setTaskType("");
    }
  }, [subject]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const skipPlanning = !subject || !taskType;
      if (!user) {
        const ghostAssignment = createGhostAssignment({
          title: title || "Untitled Assignment",
          subject: subject || null,
          task_type: taskType || null,
          status: skipPlanning ? "outline" : "planning"
        });
        ue.success("Assignment created!");
        const targetPath2 = skipPlanning ? `/work/assignment/${ghostAssignment.id}/outline` : `/work/assignment/${ghostAssignment.id}/plan`;
        navigate(targetPath2);
        return;
      }
      let rubricId = null;
      if (subject && taskType) {
        const { data: rubrics } = await supabase.from("rubrics").select("id").eq("subject", subject).eq("task_type", taskType).eq("is_default", true).limit(1);
        rubricId = rubrics?.[0]?.id || null;
      }
      const { data, error } = await supabase.from("assignments").insert([{
        user_id: user.id,
        title: title || "Untitled Assignment",
        ...subject && { subject },
        ...taskType && { task_type: taskType },
        rubric_id: rubricId,
        deadline: deadline?.toISOString(),
        status: skipPlanning ? "outline" : "planning"
      }]).select().single();
      if (error) throw error;
      window.gtag?.("event", "create_assignment", {
        subject: subject || "none",
        task_type: taskType || "none"
      });
      ue.success("Assignment created!");
      const targetPath = skipPlanning ? `/work/assignment/${data.id}/outline` : `/work/assignment/${data.id}/plan`;
      navigate(targetPath);
    } catch (error) {
      ue.error(error.message || "Failed to create assignment");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-2xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BackButton,
        {
          fallbackPath: "/work",
          size: "icon",
          tooltip: "Back to Work",
          className: "mb-4"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight", children: "Create New Assignment" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-strong", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Assignment Details" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Assignment Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "title",
              placeholder: "e.g., Macbeth Literary Analysis",
              value: title,
              onChange: (e) => setTitle(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "subject", children: "Subject" }),
            isIBUser || !user ? (
              // IB users get the full subject dropdown
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open: subjectPopoverOpen, onOpenChange: setSubjectPopoverOpen, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    id: "subject",
                    variant: "outline",
                    role: "combobox",
                    className: cn(
                      "w-full justify-between font-normal",
                      !subject && "text-muted-foreground"
                    ),
                    children: [
                      subjectLabel || "Select subject",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-[400px] p-0 bg-background max-h-[400px] overflow-y-auto", align: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "multiple", className: "w-full", children: subjectGroups.map((group, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `group-${idx}`, className: "border-b last:border-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "px-4 py-2 hover:bg-muted/50 hover:no-underline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: group.name }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 px-2 pb-2", children: [
                    group.subjects?.map((subj) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          setSubject(subj.value);
                          setSubjectLabel(subj.label);
                          setSubjectPopoverOpen(false);
                        },
                        className: cn(
                          "w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors",
                          subject === subj.value && "bg-muted text-primary font-medium"
                        ),
                        children: subj.label
                      },
                      subj.value
                    )),
                    group.subgroups?.map((subgroup, subIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: subgroup.name }),
                      subgroup.subjects.map((subj) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setSubject(subj.value);
                            setSubjectLabel(subj.label);
                            setSubjectPopoverOpen(false);
                          },
                          className: cn(
                            "w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors pl-6",
                            subject === subj.value && "bg-muted text-primary font-medium"
                          ),
                          children: subj.label
                        },
                        subj.value
                      ))
                    ] }, subIdx))
                  ] }) })
                ] }, idx)) }) })
              ] })
            ) : (
              // Non-IB users get a simple text input
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "subject",
                  placeholder: "e.g., English, Mathematics, History...",
                  value: subjectLabel || subject,
                  onChange: (e) => {
                    const value = e.target.value;
                    setSubject(value);
                    setSubjectLabel(value);
                  }
                }
              )
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "task-type", children: "Task Type" }),
            isIBUser || !user ? (
              // IB users get specific task types based on subject
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: taskType,
                  onValueChange: setTaskType,
                  disabled: !subject,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "task-type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: subject ? "Select task type" : "Select a subject first" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: getAvailableTaskTypes().map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: type, children: taskTypeLabels[type] || type }, type)) })
                  ]
                }
              )
            ) : (
              // Non-IB users get a simple text input
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "task-type",
                  placeholder: "e.g., Essay, Report (optional)",
                  value: taskType,
                  onChange: (e) => setTaskType(e.target.value)
                }
              )
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Deadline (Optional)" }),
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
                onSelect: (date) => {
                  setDeadline(date);
                  if (date && date < /* @__PURE__ */ new Date()) {
                    ue.warning("You are setting a deadline in the past.");
                  }
                },
                initialFocus: true
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: isLoading,
            className: "flex-1",
            children: isLoading ? "Creating..." : subject && taskType ? "Start Planning" : "Start Writing"
          }
        ) })
      ] }) })
    ] })
  ] }) });
}

export { CreateAssignment as default };
