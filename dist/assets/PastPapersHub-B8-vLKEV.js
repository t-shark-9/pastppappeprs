import { j as jsxRuntimeExports, ax as FileText, al as BookOpen, az as Sparkles, cd as PenTool, aB as ArrowRight, bw as Atom, bC as Search, cm as CirclePlus, cn as Beaker, co as Dna } from './vendor-react-BeQHm2Hb.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-BTaNjRSt.js';
import { B as Button } from './index-C9tyh6tO.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
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

function PastPapersHub() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/work" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4", children: "Past Papers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-xl mx-auto", children: "Choose how you want to practice with IB past papers" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "group cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all duration-300",
          onClick: () => navigate("/work/past-papers/browse"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Browse & Practice" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-base", children: "Access the full past papers library with advanced filtering and practice modes" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Browse Papers" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "MCQ Practice" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Long Answer" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Full Exam" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "w-full justify-between group-hover:bg-primary/10", children: [
                "Open Browse & Practice",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform" })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "group cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all duration-300",
          onClick: () => navigate("/work/past-papers/ai"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-purple-500/10 text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "h-6 w-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "AI Question Lab" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-base", children: "Generate AI-powered question variations and create custom questions" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-purple-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Search Questions" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 text-purple-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Create New" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Beaker, { className: "h-4 w-4 text-purple-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Chemistry" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Dna, { className: "h-4 w-4 text-purple-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Biology" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "w-full justify-between group-hover:bg-purple-500/10", children: [
                "Open AI Question Lab",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform" })
              ] })
            ] })
          ]
        }
      )
    ] })
  ] }) });
}

export { PastPapersHub as default };
