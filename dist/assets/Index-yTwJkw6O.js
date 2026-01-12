import { r as reactExports, j as jsxRuntimeExports, aw as Lightbulb, ax as FileText, ay as GripVertical, ap as PenLine, az as Sparkles, $ as LoaderCircle, aA as CircleCheck, aB as ArrowRight, av as GraduationCap, al as BookOpen } from './vendor-react-BeQHm2Hb.js';
import { a as useIsMobile, B as Button, u as useAuth, b as useGhostSession, T as Tooltip, c as TooltipTrigger, d as TooltipContent } from './index-C9tyh6tO.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from './card-BTaNjRSt.js';
import { T as Textarea } from './textarea-1gnjGx7F.js';
import { L as Label } from './label-BfT9c56I.js';
import { B as BlockNoteEditor } from './BlockNoteEditor-DmwbzBh6.js';
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
import './dialog-BQ4GVXEh.js';
import './input-2hnN3JAu.js';
import './select-DtVQdYEt.js';
import './tabs-D8pTTJCu.js';
import './scroll-area-DHtqER3G.js';
import './badge-B04EGB2M.js';
import './vendor-recharts-Cv4BIV0T.js';
import './popover-sIxpjwXN.js';
import './switch-CK-TAwbC.js';
import './vendor-katex-LkNY165q.js';
import './vendor-fuse-Gm-adH5Q.js';

function PreviewPlanningSection() {
  const [idea] = reactExports.useState(
    "I want to explore how the Treaty of Versailles contributed to economic instability in Germany and ultimately led to the rise of extremist political movements in the 1920s and 1930s."
  );
  const coaching = {
    questions: [
      "What specific economic mechanisms did the Treaty impose that created instability?",
      "How did German citizens perceive the reparations compared to their wartime experience?",
      "What role did inflation play in undermining democratic institutions?"
    ],
    thesisPattern: "[Economic factor] combined with [social factor] created conditions that [political outcome]"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-medium h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-5 w-5 text-primary" }),
      "Idea Builder Preview"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Your Initial Idea" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: idea,
            readOnly: true,
            rows: 4,
            className: "resize-none bg-muted/50"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t pt-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm mb-2", children: "AI Coaching Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: coaching.questions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm p-2 rounded bg-accent/10 border border-accent/20", children: q }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm mb-2", children: "Thesis Pattern" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm p-2 rounded bg-primary/10 border border-primary/20 italic", children: coaching.thesisPattern })
        ] })
      ] })
    ] })
  ] });
}

const demoSections = [
  {
    title: "Introduction",
    bullets: ["Historical context of WWI aftermath", "Treaty of Versailles overview", "Thesis statement"]
  },
  {
    title: "Economic Impact",
    bullets: ["War reparations burden", "Hyperinflation crisis", "Unemployment rates"]
  },
  {
    title: "Political Consequences",
    bullets: ["Weimar Republic instability", "Rise of extremist parties", "Public sentiment shift"]
  },
  {
    title: "Conclusion",
    bullets: ["Summary of key factors", "Historical significance", "Broader implications"]
  }
];
function PreviewOutlineSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-medium h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-accent-foreground" }),
      "Outline Builder Preview"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: demoSections.map((section, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm", children: section.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 ml-6", children: section.bullets.map((bullet, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: bullet })
      ] }, i)) })
    ] }) }, idx)) })
  ] });
}

const globalInflationChart = "/assets/global-inflation-chart-DNfecQZ4.png";

const PREVIEW_AI_USAGE_KEY = "preview-ai-usage";
const MAX_FREE_AI_COMMANDS = 1;
function InteractiveDraftPreview() {
  const navigate = useNavigate();
  const [aiUsageCount, setAiUsageCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const usage = parseInt(localStorage.getItem(PREVIEW_AI_USAGE_KEY) || "0");
    setAiUsageCount(usage);
  }, []);
  const previewBlocks = [
    {
      type: "heading",
      props: { level: 2, textAlignment: "left" },
      content: [{ type: "text", text: "Economic Impact of the Treaty of Versailles", styles: {} }]
    },
    {
      type: "paragraph",
      content: [{
        type: "text",
        text: "The Treaty of Versailles imposed severe economic penalties on Germany following World War I. The most significant of these was the reparations clause, which required Germany to pay substantial sums to the Allied powers. This financial burden, combined with the loss of industrial territories, created a devastating economic crisis that would shape European politics for decades.",
        styles: {}
      }]
    },
    {
      type: "table",
      content: {
        type: "tableContent",
        rows: [
          {
            cells: [
              [{ type: "text", text: "Year", styles: { bold: true } }],
              [{ type: "text", text: "Reparations Paid (Gold Marks)", styles: { bold: true } }],
              [{ type: "text", text: "Inflation Rate (%)", styles: { bold: true } }]
            ]
          },
          {
            cells: [
              [{ type: "text", text: "1921", styles: {} }],
              [{ type: "text", text: "2.5 billion", styles: {} }],
              [{ type: "text", text: "35.2", styles: {} }]
            ]
          },
          {
            cells: [
              [{ type: "text", text: "1922", styles: {} }],
              [{ type: "text", text: "1.8 billion", styles: {} }],
              [{ type: "text", text: "189.5", styles: {} }]
            ]
          },
          {
            cells: [
              [{ type: "text", text: "1923", styles: {} }],
              [{ type: "text", text: "0.5 billion", styles: {} }],
              [{ type: "text", text: "29,500", styles: {} }]
            ]
          }
        ]
      }
    },
    {
      type: "blockMath",
      props: {
        latex: "R = \\frac{P \\times r \\times (1+r)^n}{(1+r)^n - 1}",
        mode: "block"
      }
    },
    {
      type: "image",
      props: {
        url: globalInflationChart,
        caption: "Figure 1: Global inflation trends following the Treaty of Versailles",
        textAlignment: "center"
      }
    },
    {
      type: "paragraph",
      content: [{
        type: "text",
        text: "The hyperinflation of 1923 remains one of history's most dramatic economic collapses. At its peak, prices doubled every few days, and workers required wheelbarrows full of cash to purchase basic necessities. This crisis fundamentally undermined public faith in democratic institutions and created conditions that would eventually contribute to political extremism.",
        styles: {}
      }]
    },
    {
      type: "paragraph",
      content: [{
        type: "text",
        text: "Try typing / to see available commands like /table, /drawing, /inline math, or select text to use AI commands!",
        styles: { italic: true }
      }]
    }
  ];
  const initialContent = previewBlocks;
  const handleAICommandAttempt = () => {
    const currentUsage = parseInt(localStorage.getItem(PREVIEW_AI_USAGE_KEY) || "0");
    if (currentUsage >= MAX_FREE_AI_COMMANDS) {
      ue("Sign up for unlimited AI commands!", {
        action: {
          label: "Sign Up",
          onClick: () => navigate("/auth")
        }
      });
      return false;
    }
    const newUsage = currentUsage + 1;
    localStorage.setItem(PREVIEW_AI_USAGE_KEY, String(newUsage));
    setAiUsageCount(newUsage);
    return true;
  };
  reactExports.useEffect(() => {
    window.__previewAICheck = handleAICommandAttempt;
    return () => {
      delete window.__previewAICheck;
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg overflow-hidden max-h-[600px] overflow-y-auto bg-background shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
            .interactive-preview .bn-add-block-button { display: none !important; }
            .interactive-preview .word-count-footer { display: none !important; }
            .interactive-preview .bn-container { min-height: auto !important; }
          ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "interactive-preview", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      BlockNoteEditor,
      {
        initialContent,
        placeholder: "Start writing or type / for commands..."
      }
    ) })
  ] }) });
}

function PreviewDraftSection() {
  const isMobile = useIsMobile();
  const a4Width = 794;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-medium h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-5 w-5 text-success" }),
      "Block Editor Preview"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0 md:p-6", children: isMobile ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "origin-top-left",
        style: {
          width: a4Width,
          transform: `scale(${(window.innerWidth - 32) / a4Width})`,
          transformOrigin: "top left",
          height: "auto"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(InteractiveDraftPreview, {})
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(InteractiveDraftPreview, {}) })
  ] });
}

const responses = {
  define: "Hyperinflation: extremely rapid or out of control inflation, where prices increase exponentially.",
  explain: "Hyperinflation occurs when a country's monetary system collapses, often due to excessive money printing to pay debts. In Weimar Germany, this happened when the government printed money to pay war reparations, causing the currency to lose almost all value.",
  synonym: "Alternatives for 'devastated': destroyed, ruined, crippled, decimated, shattered"
};
function PreviewAIFeatures() {
  const [selectedWord, setSelectedWord] = reactExports.useState("hyperinflation");
  const [activeCommand, setActiveCommand] = reactExports.useState("define");
  const handleCommand = (command, word) => {
    setSelectedWord(word);
    setActiveCommand(command);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-medium h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-warning" }),
      "AI Commands Preview"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-lg p-4 bg-card/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm leading-relaxed", children: [
        "The",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "bg-accent/20 px-1 rounded cursor-pointer hover:bg-accent/30 transition-colors",
            onClick: () => setSelectedWord("hyperinflation"),
            children: "hyperinflation"
          }
        ),
        " ",
        "crisis in Weimar Germany",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "bg-accent/20 px-1 rounded cursor-pointer hover:bg-accent/30 transition-colors",
            onClick: () => setSelectedWord("devastated"),
            children: "devastated"
          }
        ),
        " ",
        "the economy."
      ] }) }),
      selectedWord && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Selected word:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm bg-primary/10 px-2 py-1 rounded", children: selectedWord })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => handleCommand("define", selectedWord),
              children: "/define"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => handleCommand("explain", selectedWord),
              children: "/explain"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => handleCommand("synonym", selectedWord),
              children: "/synonym"
            }
          )
        ] }),
        activeCommand && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded bg-muted border animate-in fade-in-50 duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm italic text-muted-foreground", children: responses[activeCommand] }) })
      ] }),
      !selectedWord && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-6 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Click on highlighted words above to try AI commands" }) })
    ] })
  ] });
}

function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createGhostAssignment } = useGhostSession();
  const [creatingGhost, setCreatingGhost] = reactExports.useState(false);
  useIsMobile();
  const handleGetStarted = () => {
    navigate("/work");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-6 py-16 space-y-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl md:text-6xl font-bold tracking-tight", children: "Making Writing Essays Too EASY" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", onClick: handleGetStarted, disabled: creatingGhost, children: creatingGhost ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }),
          "Creating..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Start Writing",
          /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "ml-2 h-5 w-5" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-center", children: "How It Works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft hover:shadow-medium transition-all cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-6 w-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "1. Plan" })
            ] }) }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Define your thesis, audience, and key questions. Get Socratic prompts to sharpen your thinking." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft hover:shadow-medium transition-all cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "2. Outline" })
            ] }) }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Build your essay structure with draggable sections. AI suggests improvements without writing for you." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft hover:shadow-medium transition-all cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-6 w-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "3. Draft" })
            ] }) }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Write with LaTeX math support, inline AI commands (/define, /explain), and rich formatting." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft hover:shadow-medium transition-all cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "4. Review" })
            ] }) }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Get rubric-aligned feedback highlighting strengths and top 3 fixes with actionable micro-scaffolds." }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-center", children: "What You Can Do" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 grid-cols-1 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Block-Based Editor" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "LaTeX equations (inline and block)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Images, tables, and drawings" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Drag-and-drop reordering" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Auto table of contents" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "AI Commands" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "/define - Quick definitions" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "/explain - Concept clarification" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "/synonym - Word alternatives" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "/drawing - Add illustrations" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Document Import" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "HTML files with images" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Markdown documents" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "ZIP archives (Google Docs)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Auto image upload & linking" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 mt-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold", children: "See It In Action" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewPlanningSection, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewOutlineSection, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewDraftSection, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewAIFeatures, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", onClick: handleGetStarted, disabled: creatingGhost, children: creatingGhost ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }),
          "Creating..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Try the Full Experience",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-4", children: "IB Resources at Your Fingertips" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground", children: "Access comprehensive guides and data for your IB journey" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft hover:shadow-md transition-shadow cursor-pointer", onClick: () => navigate("/homepage/grade-boundaries"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5 text-primary" }),
            "Grade Boundaries"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Comprehensive grade boundaries for all IB subjects. Know exactly what scores you need for each grade level." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-primary font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Explore All Subjects" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft hover:shadow-md transition-shadow cursor-pointer", onClick: () => navigate("/homepage/ia-guides"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-primary" }),
            "IA Writing Guides"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Master your Internal Assessments with detailed guides, assessment criteria, and expert tips for every subject." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-primary font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Start Your IA Journey" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-black text-white py-12 mt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-4", children: "IBDP Guide" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Your comprehensive platform for IB Diploma Programme assignments, research, and academic excellence." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-4", children: "Navigation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/"), className: "text-gray-400 hover:text-white transition-colors", children: "Home" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/work"), className: "text-gray-400 hover:text-white transition-colors", children: "Work" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/work/books"), className: "text-gray-400 hover:text-white transition-colors", children: "Books" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/work/notes"), className: "text-gray-400 hover:text-white transition-colors", children: "Notes" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-4", children: "Resources" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/us/about"), className: "text-gray-400 hover:text-white transition-colors", children: "About Us" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/us/plan"), className: "text-gray-400 hover:text-white transition-colors", children: "Our Plan" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/blog/essay-guide"), className: "text-gray-400 hover:text-white transition-colors", children: "How to Write Essays" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/speed-reader"), className: "text-gray-400 hover:text-white transition-colors", children: "Speed Reader" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/us/improvements"), className: "text-gray-400 hover:text-white transition-colors", children: "Feedback" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/us/contact"), className: "text-gray-400 hover:text-white transition-colors", children: "Contact" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/grade-boundaries"), className: "text-gray-400 hover:text-white transition-colors", children: "Grade Boundaries" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/ia-guides"), className: "text-gray-400 hover:text-white transition-colors", children: "IA Writing Guides" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/blog/ia-experience"), className: "text-gray-400 hover:text-white transition-colors", children: "IA Experience" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/blog/exam-resources"), className: "text-gray-400 hover:text-white transition-colors", children: "Exam Resources" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/blog/educational-systems"), className: "text-gray-400 hover:text-white transition-colors", children: "Educational Systems" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-4", children: "Legal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/legal/privacy"), className: "text-gray-400 hover:text-white transition-colors", children: "Privacy Policy" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/legal/terms"), className: "text-gray-400 hover:text-white transition-colors", children: "Terms of Service" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/homepage/legal/imprint"), className: "text-gray-400 hover:text-white transition-colors", children: "Imprint" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 pt-8 border-t border-gray-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-400", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " IBDP Guide. All rights reserved."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Designed for International Baccalaureate Diploma Programme students worldwide." })
      ] })
    ] }) })
  ] });
}

export { Index as default };
