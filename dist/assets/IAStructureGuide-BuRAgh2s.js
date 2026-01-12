import { j as jsxRuntimeExports, aL as FilePen, b1 as List, al as BookOpen, ax as FileText, Z as TriangleAlert, av as GraduationCap, a2 as ChevronRight, aw as Lightbulb, aK as Clock, aA as CircleCheck } from './vendor-react-BeQHm2Hb.js';
import { c as useParams, u as useNavigate, L as Link } from './vendor-react-router-D-UwvF_4.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { B as Button } from './index-C9tyh6tO.js';
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle, c as CardDescription } from './card-BTaNjRSt.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { a as iaEssayStructureData } from './data-ia-DxRN8XI2.js';
import './vendor-react-dom-b1tP6waW.js';
import './vendor-misc-CQ2gQV2M.js';
import './vendor-utils-B8uxCDj6.js';
import './vendor-export-COR0N_gy.js';
import './vendor-blocknote-BAmltmDn.js';
import './vendor-prosemirror-l_ukq4jw.js';
import './vendor-yjs-BarRwqAh.js';
import './vendor-tiptap-tuOT8GNt.js';
import './vendor-mantine-CpjnkULY.js';
import './vendor-radix-BjF_gpzx.js';
import './vendor-i18n-BRT6rIp6.js';
import './vendor-datefns-Cgc6WLhj.js';
import './vendor-syncfusion-B9hbBizT.js';
import './vendor-ketcher-B9jnF8te.js';
import './vendor-supabase-B1aOSilF.js';

const subjectGroups = [
  {
    group: "Group 1: Language & Literature",
    subjects: [
      { id: "english-a-literature-hl-essay", name: "English A: Literature HL Essay" },
      { id: "english-a-literature-paper-1", name: "English A: Literature Paper 1" }
    ]
  },
  {
    group: "Group 2: Language Acquisition",
    subjects: [
      { id: "language-b-written-assignment", name: "Language B Written Assignment" }
    ]
  },
  {
    group: "Group 3: Individuals & Societies",
    subjects: [
      { id: "history-ia", name: "History IA" },
      { id: "economics-ia", name: "Economics IA Portfolio" },
      { id: "geography-ia", name: "Geography IA" },
      { id: "psychology-ia", name: "Psychology IA" },
      { id: "business-management-ia", name: "Business Management IA" }
    ]
  },
  {
    group: "Group 4: Sciences",
    subjects: [
      { id: "biology-ia", name: "Biology IA" },
      { id: "chemistry-ia", name: "Chemistry IA" },
      { id: "physics-ia", name: "Physics IA" },
      { id: "computer-science-ia", name: "Computer Science IA" }
    ]
  },
  {
    group: "Group 5: Mathematics",
    subjects: [
      { id: "math-aa-ia", name: "Math AA Exploration" },
      { id: "math-ai-ia", name: "Math AI Exploration" }
    ]
  },
  {
    group: "Core Requirements",
    subjects: [
      { id: "extended-essay", name: "Extended Essay" },
      { id: "tok-essay", name: "TOK Essay" }
    ]
  }
];
function StructureSectionCard({ section, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-lg p-4 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm", children: index + 1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-lg", children: section.heading }),
        section.wordCount && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 mr-1" }),
          section.wordCount
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: section.description }),
      section.subheadings && section.subheadings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground mb-1", children: "Suggested subheadings:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: section.subheadings.map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: sub }, i)) })
      ] }),
      section.tips.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4 text-yellow-500" }),
          "Tips:"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-sm text-muted-foreground space-y-1 ml-5", children: section.tips.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mt-1 text-green-500 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tip })
        ] }, i)) })
      ] })
    ] })
  ] }) });
}
function SubjectStructureView({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { children: data.assessmentType }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: data.weighting })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl mt-2", children: data.subject }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { className: "text-lg", children: [
          "Word Limit: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: data.totalWordCount }),
          data.pageLimit && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            " | Page Limit: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: data.pageLimit })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold mb-2 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilePen, { className: "w-4 h-4" }),
          "Formatting Requirements"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Font:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: data.formatRequirements.font })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Size:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: data.formatRequirements.fontSize })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Spacing:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: data.formatRequirements.lineSpacing })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Margins:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: data.formatRequirements.margins })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-5 h-5" }),
        "Required Structure & Headings"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.structure.map((section, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(StructureSectionCard, { section, index }, index)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5" }),
          "Bibliography"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Required:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: data.bibliography.required ? "default" : "secondary", children: data.bibliography.required ? "Yes" : "No" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Citation Style:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: data.bibliography.style })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: data.bibliography.notes })
        ] })
      ] }),
      data.appendices && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" }),
          "Appendices"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Allowed:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: data.appendices.allowed ? "default" : "secondary", children: data.appendices.allowed ? "Yes" : "No" })
          ] }),
          data.appendices.allowed && data.appendices.includes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "May include:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: data.appendices.includes.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: item }, i)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: data.appendices.notes })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-red-200 dark:border-red-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg flex items-center gap-2 text-red-600 dark:text-red-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }),
          "Common Mistakes to Avoid"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: data.commonMistakes.map((mistake, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 mt-0.5", children: "✗" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mistake })
        ] }, i)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-green-200 dark:border-green-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg flex items-center gap-2 text-green-600 dark:text-green-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-5 h-5" }),
          "Examiner Tips"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: data.examinerTips.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 mt-0.5", children: "✓" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tip })
        ] }, i)) }) })
      ] })
    ] })
  ] });
}
function SubjectIndex() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: "IA & Essay Structure Guides" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Complete structural requirements, heading outlines, and layout guidelines for all IB Internal Assessments and essays." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: subjectGroups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: group.group }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-2", children: group.subjects.map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/homepage/ia-structure/${subject.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full justify-between h-auto py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-left", children: subject.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-2 flex-shrink-0" })
      ] }) }, subject.id)) }) })
    ] }, group.group)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-8 h-8 text-primary flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-1", children: "Pro Tip" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "These structure guides are based on official IB requirements. Always check with your teacher for any subject-specific modifications your school may require. Use these outlines as templates when starting your IA or essay." })
      ] })
    ] }) }) })
  ] });
}
function IAStructureGuide() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const subjectData = subjectId ? iaEssayStructureData[subjectId] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto px-4 py-8 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BackButton,
        {
          fallbackPath: subjectId ? "/homepage/ia-structure" : "/homepage",
          size: "icon",
          tooltip: subjectId ? "Back to All Subjects" : "Back to Home"
        }
      ),
      subjectId && subjectData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Structure Guide" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: subjectData.subject })
      ] })
    ] }),
    subjectId && subjectData ? /* @__PURE__ */ jsxRuntimeExports.jsx(SubjectStructureView, { data: subjectData }) : subjectId && !subjectData ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Subject structure guide not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/homepage/ia-structure"), children: "View All Subjects" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SubjectIndex, {})
  ] }) });
}

export { IAStructureGuide as default };
