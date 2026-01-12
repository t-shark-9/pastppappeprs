import { r as reactExports, j as jsxRuntimeExports, aR as ArrowLeft, X, ao as Menu, al as BookOpen, bm as CircleCheckBig, Z as TriangleAlert, b1 as List, ax as FileText, aK as Clock, bs as ExternalLink } from './vendor-react-BeQHm2Hb.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { B as Button } from './index-C9tyh6tO.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from './card-BTaNjRSt.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-D8pTTJCu.js';
import { P as Progress } from './progress-BjrBDcIN.js';
import { u as useSEO } from './use-seo-B_kpg7C4.js';
import { b as iaGuidanceData, a as iaEssayStructureData } from './data-ia-DxRN8XI2.js';
import { c as useParams, u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
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

const subjectToStructureKey = {
  "biology": "biology-ia",
  "chemistry": "chemistry-ia",
  "physics": "physics-ia",
  "business-management": "business-management-ia",
  "economics": "economics-ia",
  "psychology": "psychology-ia",
  "computer_science": "computer-science-ia",
  "history": "history-ia",
  "geography": "geography-ia",
  "math-aa": "math-aa-ia",
  "math-ai": "math-ai-ia"
};
function CitationCard({ citation, isMain = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-lg border ${isMain ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-border"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: citation.title }),
        isMain && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Primary Source" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-1", children: [
        citation.organization,
        " (",
        citation.year,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: citation.type })
    ] }),
    citation.url && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-8 w-8 p-0", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: citation.url, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" }) }) })
  ] }) });
}
function IAWritingGuide() {
  const { subject, section } = useParams();
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = reactExports.useState(true);
  const subjectData = subject ? iaGuidanceData[subject] : null;
  useSEO(subject === "biology" ? "biology" : subject === "chemistry" ? "chemistry" : subject === "business-management" ? "business" : subject === "economics" ? "economics" : subject === "physics" ? "physics" : subject === "mathematics" ? "mathematics" : subject === "history" ? "history" : subject === "psychology" ? "psychology" : "iaGuides");
  if (!subjectData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-4xl mx-auto px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Subject Not Found" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "The requested subject is not available. Please choose from the available IA guides." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => navigate("/homepage/ia-guides"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          "Back to IA Guides"
        ] })
      ] })
    ] }) }) });
  }
  if (section && subjectData.sections[section]) {
    const sectionData = subjectData.sections[section];
    const sectionKeys = Object.keys(subjectData.sections);
    const currentIndex = sectionKeys.indexOf(section);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sr-only", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { children: [
        subjectData.title,
        " - ",
        sectionData.title,
        " - Complete IA Writing Guide"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
        sidebarVisible && /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block w-64 xl:w-72 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Guide Sections" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-6 w-6",
                    onClick: () => setSidebarVisible(false),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: subjectData.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-1 pt-0", children: [
              sectionKeys.map((key, index) => {
                const secData = subjectData.sections[key];
                const isActive = key === section;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => navigate(`/homepage/ia-guides/${subject}/${key}`),
                    className: `w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: index + 1 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2", children: secData.title })
                    ] })
                  },
                  key
                );
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 mt-3 border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "w-full",
                  onClick: () => navigate(`/homepage/ia-guides/${subject}`),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-3 w-3" }),
                    "Back to Overview"
                  ]
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                Math.round((currentIndex + 1) / sectionKeys.length * 100),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: (currentIndex + 1) / sectionKeys.length * 100 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Section ",
              currentIndex + 1,
              " of ",
              sectionKeys.length
            ] })
          ] }) }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-6 py-16 space-y-8", children: [
          !sidebarVisible && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setSidebarVisible(true),
              className: "mb-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "mr-2 h-4 w-4" }),
                "Show Navigation"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => navigate(`/homepage/ia-guides/${subject}`),
                className: "lg:hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold mb-2", children: [
                subjectData.title,
                ": ",
                sectionData.title
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: subjectData.weighting }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: subjectData.wordCount })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }),
              "Overview"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg", children: sectionData.content }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-green-700 dark:text-green-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5" }),
                "Key Tips"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: sectionData.tips.map((tip, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: tip })
              ] }, index)) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-red-700 dark:text-red-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }),
                "Common Mistakes"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: sectionData.commonMistakes.map((mistake, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: mistake })
              ] }, index)) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => navigate(`/homepage/ia-guides/${subject}`), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
              "Back to ",
              subjectData.title,
              " Overview"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/homepage/ia-guides"), children: "View All IA Guides" })
          ] }) }) })
        ] }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sr-only", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { children: [
      subjectData.title,
      " IA Writing Guide - Complete Guide with Examples and Tips"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-6 py-16 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BackButton,
          {
            fallbackPath: "/homepage/ia-guides",
            size: "icon",
            tooltip: "Back to IA Guides"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-bold mb-2", children: [
            subjectData.title,
            " IA Writing Guide"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground mb-4", children: subjectData.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-sm", children: subjectData.weighting }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-sm", children: subjectData.wordCount })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "overview", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "overview", children: "Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "criteria", children: "Assessment Criteria" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "structure", children: "Structure" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "sections", children: "Writing Guide" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "examples", children: "Sample Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "timeline", children: "Timeline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "references", children: "References" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "overview", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
            "What is the ",
            subjectData.title,
            " IA?"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg", children: subjectData.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-muted/50 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-primary mb-2", children: subjectData.weighting }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "of final grade" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-muted/50 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-primary mb-2", children: subjectData.wordCount }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "word limit" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-muted/50 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-primary mb-2", children: Object.keys(subjectData.assessmentCriteria).length }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "assessment criteria" })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "criteria", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: Object.entries(subjectData.assessmentCriteria).map(([criterion, details]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Criterion ",
                criterion,
                ": ",
                details.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: details.marks })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: details.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-3", children: "Key Points for Success:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: details.keyPoints.map((point, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: point })
            ] }, index)) })
          ] })
        ] }, criterion)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "structure", className: "space-y-6", children: (() => {
          const structureKey = subject ? subjectToStructureKey[subject] : null;
          const structureData = structureKey ? iaEssayStructureData[structureKey] : null;
          if (!structureData) {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-12 w-12 mx-auto mb-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-2", children: "Structure Guide Coming Soon" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "The detailed structure guide for this subject is currently being developed." })
            ] }) });
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
                "Format Requirements"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/50 rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Font" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: structureData.formatRequirements.font })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/50 rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Font Size" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: structureData.formatRequirements.fontSize })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/50 rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Line Spacing" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: structureData.formatRequirements.lineSpacing })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/50 rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Margins" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: structureData.formatRequirements.margins })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: structureData.totalWordCount }),
                  structureData.pageLimit && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: structureData.pageLimit })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-5 w-5" }),
                  "Required Sections"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                  "Follow this structure for your ",
                  structureData.assessmentType
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: structureData.structure.map((section2, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-lg p-4 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm", children: index + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: section2.heading }),
                    section2.wordCount && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: section2.wordCount })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: section2.description }),
                  section2.subheadings && section2.subheadings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 pl-4 border-l-2 border-muted", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Suggested subheadings:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-sm space-y-1", children: section2.subheadings.map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-muted-foreground", children: [
                      "• ",
                      sub
                    ] }, i)) })
                  ] }),
                  section2.tips.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-1", children: section2.tips.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tip })
                  ] }, i)) })
                ] })
              ] }) }, index)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-red-600 dark:text-red-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }),
                  "Common Mistakes"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: structureData.commonMistakes.map((mistake, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mistake })
                ] }, index)) }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-green-600 dark:text-green-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5" }),
                  "Examiner Tips"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: structureData.examinerTips.map((tip, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tip })
                ] }, index)) }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Bibliography Requirements" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: structureData.bibliography.required ? "default" : "secondary", children: structureData.bibliography.required ? "Required" : "Optional" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                    "Style: ",
                    structureData.bibliography.style
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: structureData.bibliography.notes })
              ] })
            ] })
          ] });
        })() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "sections", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: Object.entries(subjectData.sections).map(([sectionKey, sectionData]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "shadow-soft cursor-pointer hover:shadow-md transition-shadow",
            onClick: () => navigate(`/homepage/ia-guides/${subject}/${sectionKey}`),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between", children: [
                sectionData.title,
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 rotate-180" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: sectionData.content }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                    sectionData.tips.length,
                    " tips"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                    sectionData.commonMistakes.length,
                    " common mistakes"
                  ] })
                ] })
              ] })
            ]
          },
          sectionKey
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "examples", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Sample Research Questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
              "Here are examples of strong research questions for ",
              subjectData.title,
              " IAs:"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: subjectData.sampleQuestions.map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-muted/30 rounded-lg border-l-4 border-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: question }) }, index)) }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "timeline", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }),
              "IA Timeline & Planning"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
              "Recommended timeline for completing your ",
              subjectData.title,
              " IA successfully:"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: subjectData.timeline.map((phase, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold", children: index + 1 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: phase.phase }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: phase.duration })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: phase.activities.map((activity, actIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: activity })
                ] }, actIndex)) })
              ] })
            ] }),
            index < subjectData.timeline.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-4 top-10 w-0.5 h-6 bg-border" })
          ] }, index)) }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "references", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
              "Official IB Sources"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "This guide is based on official International Baccalaureate documents and assessment procedures." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-3", children: "Primary Reference" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CitationCard, { citation: subjectData.officialGuide, isMain: true })
            ] }),
            subjectData.additionalReferences && subjectData.additionalReferences.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-3", children: "Additional References" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: subjectData.additionalReferences.map((citation, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(CitationCard, { citation }, index)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2 text-blue-900 dark:text-blue-100", children: "Disclaimer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-blue-800 dark:text-blue-200", children: "This content is based on official IB documents but is not endorsed by the International Baccalaureate Organization. Students should always refer to the most current official IB guides and consult with their teachers for the most up-to-date requirements." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => window.open("https://www.ibo.org/", "_blank"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
              "Visit Official IB Website"
            ] }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Need Help with Your IA?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Use our AI-powered writing tools to plan, draft, and refine your Internal Assessment. Get personalized feedback and guidance throughout your research process." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", onClick: () => navigate("/work"), children: "Start Writing Your IA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", onClick: () => navigate("/homepage/ia-guides"), children: "View All IA Guides" })
        ] })
      ] }) }) })
    ] })
  ] });
}

export { IAWritingGuide as default };
