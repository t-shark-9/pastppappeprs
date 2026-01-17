import { j as jsxRuntimeExports, dG as BookMarked, bm as CircleCheckBig, Z as TriangleAlert, aR as ArrowLeft, aG as Brain, al as BookOpen, cQ as Target, bJ as Eye, aK as Clock, ax as FileText, bs as ExternalLink } from './vendor-react-BeQHm2Hb.js';
import { B as Button } from './index-C9tyh6tO.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from './card-BTaNjRSt.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-D8pTTJCu.js';
import { u as useSEO } from './use-seo-B_kpg7C4.js';
import { t as theoryOfKnowledgeData } from './ee_tok_data--bquyOo3.js';
import { A as ArticleWrapper } from './ArticleWrapper-YJLbhrQd.js';
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
function TheoryOfKnowledgeGuide() {
  const { section } = useParams();
  const navigate = useNavigate();
  useSEO("theoryOfKnowledge");
  if (section && theoryOfKnowledgeData.sections[section]) {
    const sectionData = theoryOfKnowledgeData.sections[section];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ArticleWrapper,
      {
        title: `Theory of Knowledge Guide - ${sectionData.title}`,
        description: `Complete guide to IB Theory of Knowledge: ${sectionData.title}. Master TOK concepts, essay writing, and assessment criteria.`,
        datePublished: "2024-01-25T00:00:00Z",
        dateModified: "2024-12-24T00:00:00Z",
        category: "IB Theory of Knowledge",
        keywords: [
          "IB TOK",
          "Theory of Knowledge",
          "TOK essay",
          "TOK guide",
          "IB core",
          "knowledge questions",
          sectionData.title
        ],
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sr-only", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { children: [
            theoryOfKnowledgeData.title,
            " - ",
            sectionData.title,
            " - Complete TOK Guide"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-6 py-16 space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                BackButton,
                {
                  fallbackPath: "/theory-of-knowledge",
                  size: "icon",
                  tooltip: "Back to TOK Overview"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold mb-2", children: [
                  theoryOfKnowledgeData.title,
                  ": ",
                  sectionData.title
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: theoryOfKnowledgeData.weighting }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: theoryOfKnowledgeData.wordCount })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "h-5 w-5" }),
                sectionData.title
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-slate dark:prose-invert max-w-none", children: sectionData.content.split("\n\n").map((paragraph, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-muted-foreground leading-relaxed", children: paragraph }, i)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" }),
                    "Tips for Success"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: sectionData.tips.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-green-700 dark:text-green-300 flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 mt-1.5", children: "•" }),
                    tip
                  ] }, i)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
                    "Common Mistakes to Avoid"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: sectionData.commonMistakes.map((mistake, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-amber-700 dark:text-amber-300 flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500 mt-1.5", children: "•" }),
                    mistake
                  ] }, i)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => navigate(`/theory-of-knowledge`), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
                "Back to Overview"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => navigate(`/theory-of-knowledge/criteria`), children: [
                "View Assessment Criteria",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "ml-2 h-4 w-4 rotate-180" })
              ] })
            ] })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ArticleWrapper,
    {
      title: "IB Theory of Knowledge Guide - Complete TOK Essay & Exhibition Guide",
      description: "Comprehensive guide to IB Theory of Knowledge (TOK). Learn about knowledge questions, areas of knowledge, ways of knowing, and the TOK essay and exhibition.",
      datePublished: "2024-01-25T00:00:00Z",
      dateModified: "2024-12-24T00:00:00Z",
      category: "IB Theory of Knowledge",
      keywords: [
        "IB TOK",
        "Theory of Knowledge",
        "TOK essay",
        "TOK exhibition",
        "TOK guide",
        "IB core",
        "knowledge questions",
        "areas of knowledge"
      ],
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sr-only", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "IB Theory of Knowledge - Complete TOK Guide for IB Diploma Students" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-6 py-16 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-8 w-8 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: theoryOfKnowledgeData.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: theoryOfKnowledgeData.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-lg px-4 py-2", children: theoryOfKnowledgeData.weighting }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-lg px-4 py-2", children: theoryOfKnowledgeData.wordCount })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "overview", className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "overview", children: "Overview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "framework", children: "Knowledge Framework" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "criteria", children: "Assessment Criteria" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "sections", children: "TOK Guide" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "timeline", children: "Timeline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "references", children: "References" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "overview", className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }),
                  "What is Theory of Knowledge?"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-slate dark:prose-invert max-w-none", children: theoryOfKnowledgeData.sections.overview.content.split("\n\n").map((paragraph, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-muted-foreground leading-relaxed", children: paragraph }, i)) }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-5 w-5 text-green-600" }),
                    "TOK Components"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-primary rounded-full mt-2" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium", children: "TOK Essay" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "1,600-word response to a prescribed title" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-primary rounded-full mt-2" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium", children: "TOK Exhibition" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Visual presentation exploring a knowledge question" })
                      ] })
                    ] })
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-5 w-5 text-blue-600" }),
                    "Core Concepts"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "AOKs" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Areas of Knowledge" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "WOKs" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Ways of Knowing" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "KQ" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Knowledge Questions" })
                    ] })
                  ] }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "framework", className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Areas of Knowledge (AOKs)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Different ways we organize knowledge" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
                    "Mathematics",
                    "Natural Sciences",
                    "Human Sciences",
                    "History",
                    "The Arts",
                    "Ethics",
                    "Religious Knowledge Systems",
                    "Indigenous Knowledge Systems"
                  ].map((aok, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-2 rounded bg-muted/50", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-primary rounded-full" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: aok })
                  ] }, i)) }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Ways of Knowing (WOKs)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Methods through which we acquire knowledge" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
                    "Sense Perception",
                    "Reason",
                    "Language",
                    "Emotion",
                    "Faith",
                    "Imagination",
                    "Intuition",
                    "Memory"
                  ].map((wok, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-2 rounded bg-muted/50", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-primary rounded-full" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: wok })
                  ] }, i)) }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Knowledge Framework Elements" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Five elements for analyzing how knowledge is organized and acquired" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "1. Scope & Applications" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "What is this area about? What problems can it solve?" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "2. Concepts & Language" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "What key concepts and terminology are used?" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "3. Methodology" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "What methods are used to produce knowledge?" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "4. Historical Development" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "How has this area developed over time?" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "5. Links to Personal Knowledge" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "How does this connect to what we know personally?" })
                  ] })
                ] }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "criteria", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "TOK Assessment Criteria" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "TOK Essay (67%) and TOK Exhibition (33%) assessed separately" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: Object.entries(theoryOfKnowledgeData.assessmentCriteria).map(([key, criterion]) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-l-4 border-l-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-lg", children: [
                    "Criterion ",
                    key,
                    ": ",
                    criterion.name
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
                    criterion.marks,
                    " marks"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: criterion.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-medium text-sm mb-2", children: "Key Points:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-sm space-y-1", children: criterion.keyPoints.map((point, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1.5", children: "•" }),
                    point
                  ] }, i)) })
                ] })
              ] }) }, key)) }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "sections", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: Object.entries(theoryOfKnowledgeData.sections).map(([key, section2]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "shadow-soft hover:shadow-md transition-shadow cursor-pointer",
                onClick: () => navigate(`/theory-of-knowledge/${key}`),
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between", children: [
                    section2.title,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 rotate-180 text-muted-foreground" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: section2.content.split("\n\n")[0] })
                ] })
              },
              key
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "timeline", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }),
                  "TOK Course Timeline"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Two-year TOK course structure with key milestones" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: theoryOfKnowledgeData.timeline.map((phase, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 bg-primary rounded-full" }),
                  index < theoryOfKnowledgeData.timeline.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-16 bg-border mt-2" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 pb-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: phase.phase }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: phase.duration }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-sm space-y-1", children: phase.activities.map((activity, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1.5", children: "•" }),
                    activity
                  ] }, i)) })
                ] })
              ] }, index)) }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "references", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Official IB References" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Primary sources for TOK course requirements and guidelines" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CitationCard, { citation: theoryOfKnowledgeData.officialGuide, isMain: true }),
                theoryOfKnowledgeData.additionalReferences.map((citation, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(CitationCard, { citation }, index))
              ] })
            ] }) })
          ] })
        ] })
      ]
    }
  );
}

export { TheoryOfKnowledgeGuide as default };
