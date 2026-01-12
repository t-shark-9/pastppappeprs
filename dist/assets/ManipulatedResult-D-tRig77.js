import { j as jsxRuntimeExports, _ as RefreshCw, az as Sparkles, cv as TrendingUp, cO as WandSparkles, r as reactExports, X, a9 as Check, bS as Copy } from './vendor-react-BeQHm2Hb.js';
import { B as Button, t as toast } from './index-C9tyh6tO.js';

function QuestionCard({ question, onManipulate, isLoading }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group bg-gradient-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-glow animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold", children: question.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium", children: question.topic })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed whitespace-pre-line text-sm mb-6 font-mono", children: question.text }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => onManipulate(question, "rephrase"),
          disabled: isLoading,
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
            "Rephrase"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => onManipulate(question, "simplify"),
          disabled: isLoading,
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
            "Simplify"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => onManipulate(question, "advanced"),
          disabled: isLoading,
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
            "Advanced"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => onManipulate(question, "similar"),
          disabled: isLoading,
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-3.5 h-3.5" }),
            "Similar"
          ]
        }
      )
    ] })
  ] });
}

const typeLabels = {
  rephrase: { label: "Rephrased", color: "text-primary" },
  simplify: { label: "Simplified", color: "text-green" },
  advanced: { label: "Advanced", color: "text-amber" },
  similar: { label: "Similar Question", color: "text-purple" }
};
function ManipulatedResult({ original, manipulated, type, onClose }) {
  const [copied, setCopied] = reactExports.useState(false);
  const typeInfo = typeLabels[type] || { label: type, color: "text-primary" };
  const handleCopy = async () => {
    await navigator.clipboard.writeText(manipulated);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Question copied to clipboard"
    });
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-2xl bg-card border border-border rounded-2xl p-6 shadow-2xl animate-slide-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onClose,
        className: "absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-muted-foreground" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-sm font-semibold ${typeInfo.color}`, children: [
        typeInfo.label,
        " Version"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-foreground mt-1", children: "AI-Generated Question Variation" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-secondary/50 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-2", children: "Original" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/70 whitespace-pre-line font-mono", children: original })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-primary/5 border border-primary/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary uppercase tracking-wide mb-2", children: "Generated" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground whitespace-pre-line font-mono leading-relaxed", children: manipulated })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: onClose, children: "Close" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "default", onClick: handleCopy, className: "gap-2", children: [
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
        copied ? "Copied!" : "Copy Question"
      ] })
    ] })
  ] }) });
}

export { ManipulatedResult as M, QuestionCard as Q };
