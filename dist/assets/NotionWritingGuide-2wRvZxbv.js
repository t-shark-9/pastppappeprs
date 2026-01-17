import { j as jsxRuntimeExports, ce as Blocks, az as Sparkles, cf as Keyboard, c9 as Layers, ax as FileText, b3 as Type, b1 as List, aw as Lightbulb } from './vendor-react-BeQHm2Hb.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription } from './card-BTaNjRSt.js';
import { B as Badge } from './badge-B04EGB2M.js';
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
import './index-C9tyh6tO.js';
import './vendor-react-router-D-UwvF_4.js';
import './vendor-supabase-B1aOSilF.js';

function NotionWritingGuide() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/work", className: "mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Blocks, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: "Notion-Style Writing System" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Learn how to use our powerful block-based editor for structured, organized writing." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6 shadow-strong", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary" }),
        "What is Block-Based Writing?"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Our editor uses a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "block-based system" }),
          " inspired by Notion, where each piece of content (paragraph, heading, list, etc.) is a separate block. This gives you incredible flexibility to organize, rearrange, and format your work."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/5 p-4 rounded-lg border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Think of it like LEGO blocks:" }),
          " Each block is independent, but together they build something amazing. You can move, delete, or transform blocks at any time."
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6 shadow-strong", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500", children: "Getting Started" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Creating and Editing Blocks" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Master the basics of block manipulation" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard, { className: "h-4 w-4 text-blue-500" }),
            "Creating New Blocks"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-6 space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mt-0.5", children: "Enter" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Press ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-2 py-1 text-xs bg-muted rounded", children: "Enter" }),
                " at the end of a block to create a new one below"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mt-0.5", children: "/" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Type ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-2 py-1 text-xs bg-muted rounded", children: "/" }),
                " to open the block menu and choose a block type"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mt-0.5", children: "+" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Click the ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "+" }),
                " button on the left side of any block to insert one above or below"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-4 border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4 text-blue-500" }),
            "Transforming Block Types"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-6 space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You can change any block into a different type at any time:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 list-disc pl-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                "Click the ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "⋮⋮" }),
                " (drag handle) on the left of a block"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: 'Select "Turn into" from the menu' }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Choose your desired block type" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-4 border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4 text-blue-500" }),
            "Moving and Rearranging"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-6 space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Reorganize your content by dragging blocks:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 list-disc pl-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                "Hover over the left side of a block to see the drag handle ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "⋮⋮" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Click and drag the handle to move the block" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Drop it at any position in your document" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6 shadow-strong", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-purple-500", children: "Block Types" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Available Block Types" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Different blocks for different content" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-4 hover:border-primary/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-purple-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm", children: "Paragraph" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Default block type. Use for regular body text and content." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Default" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-4 hover:border-primary/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4 text-purple-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm", children: "Headings (H1-H3)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Structure your document with different heading levels." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "/heading1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "/h1" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-4 hover:border-primary/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4 text-purple-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm", children: "Bulleted List" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Create unordered lists with bullet points." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "/bullet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "*" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-4 hover:border-primary/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4 text-purple-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm", children: "Numbered List" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Create ordered lists with automatic numbering." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "/numbered" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "1." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-4 hover:border-primary/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-purple-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm", children: "Quote Block" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Highlight important quotes or excerpts." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "/quote" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-4 hover:border-primary/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-purple-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm", children: "Code Block" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Format code snippets with syntax highlighting." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "/code" }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6 shadow-strong", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500", children: "Formatting" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Text Formatting Options" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Style your text within blocks" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm", children: "Keyboard Shortcuts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Bold" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded", children: "Cmd/Ctrl + B" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Italic" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded", children: "Cmd/Ctrl + I" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("u", { children: "Underline" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded", children: "Cmd/Ctrl + U" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "Code" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded", children: "Cmd/Ctrl + E" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm", children: "Markdown Syntax" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Bold" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded", children: "**text**" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Italic" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded", children: "*text*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "Code" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded", children: "`text`" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/50 p-4 rounded-lg mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Pro Tip:" }),
          " Select text to see the formatting toolbar appear above your selection. This gives you quick access to all formatting options."
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6 shadow-strong", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-orange-500", children: "Advanced" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Advanced Features" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Power user techniques" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l-4 border-orange-500 pl-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "Multi-Block Selection" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Select multiple blocks at once to perform bulk operations:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-1 list-disc pl-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Click the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "⋮⋮" }),
              " handle on the first block"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Hold ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-2 py-0.5 text-xs bg-muted rounded", children: "Shift" }),
              " and click another block's handle"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All blocks in between will be selected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Delete, move, or transform them together" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l-4 border-orange-500 pl-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "Slash Commands Menu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
            "Type ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-2 py-0.5 text-xs bg-muted rounded", children: "/" }),
            " anywhere to open a menu of all available block types and actions:"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-2 py-1 rounded", children: "/heading" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-2 py-1 rounded", children: "/bullet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-2 py-1 rounded", children: "/numbered" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-2 py-1 rounded", children: "/quote" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-2 py-1 rounded", children: "/code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-2 py-1 rounded", children: "/table" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l-4 border-orange-500 pl-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "Undo & Redo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Made a mistake? No problem:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Undo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded", children: "Cmd/Ctrl + Z" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Redo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded", children: "Cmd/Ctrl + Shift + Z" })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6 shadow-strong border-2 border-primary/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-5 w-5 text-yellow-500" }),
        "Best Practices for Block Writing"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2 text-sm", children: "✓ Use Headings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Structure your work with H1, H2, and H3 headings. This creates a clear hierarchy." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2 text-sm", children: "✓ One Idea Per Block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Keep blocks focused. Each paragraph should contain one main idea." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2 text-sm", children: "✓ Use Lists Wisely" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Lists are great for enumerating points, but don't overuse them." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2 text-sm", children: "✓ Rearrange Freely" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Don't be afraid to move blocks around to find the best structure." })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-strong bg-green-500/5 border-green-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-green-500/10 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-green-600 dark:text-green-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-1", children: "Auto-Save Enabled" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: `Your work is automatically saved every few seconds. You'll see a "Saving..." indicator when changes are being saved, and "All changes saved" when complete. No need to worry about losing your progress!` })
      ] })
    ] }) }) })
  ] }) });
}

export { NotionWritingGuide as default };
