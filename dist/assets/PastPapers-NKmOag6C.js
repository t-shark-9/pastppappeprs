import { j as jsxRuntimeExports, r as reactExports, az as Sparkles, cN as Database, $ as LoaderCircle, _ as RefreshCw, cO as WandSparkles, bq as ChevronUp, aj as ChevronDown, bw as Atom, bC as Search, cm as CirclePlus, cn as Beaker, co as Dna, an as Zap } from './vendor-react-BeQHm2Hb.js';
import { c as chemistryQuestions, b as biologyQuestions, p as physicsQuestions } from './data-past-papers-DNz6MKBl.js';
import { Q as QuestionCard, M as ManipulatedResult } from './ManipulatedResult-D-tRig77.js';
import { B as Button, s as supabase, t as toast } from './index-C9tyh6tO.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-DtVQdYEt.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from './card-BTaNjRSt.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-D8pTTJCu.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
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
import './vendor-react-router-D-UwvF_4.js';
import './vendor-supabase-B1aOSilF.js';

function MoleculeBackground() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 overflow-hidden pointer-events-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow", style: { animationDelay: "1s" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/3 w-64 h-64 bg-cyan/5 rounded-full blur-3xl animate-float" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 w-full h-full opacity-20", xmlns: "http://www.w3.org/2000/svg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("pattern", { id: "molecules", x: "0", y: "0", width: "100", height: "100", patternUnits: "userSpaceOnUse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "10", cy: "10", r: "1.5", fill: "hsl(var(--primary))" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "30", r: "1", fill: "hsl(var(--accent))" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "80", cy: "60", r: "1.5", fill: "hsl(var(--primary))" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "30", cy: "80", r: "1", fill: "hsl(var(--cyan))" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "10", y1: "10", x2: "50", y2: "30", stroke: "hsl(var(--primary))", strokeWidth: "0.3", opacity: "0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "50", y1: "30", x2: "80", y2: "60", stroke: "hsl(var(--accent))", strokeWidth: "0.3", opacity: "0.5" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#molecules)" })
    ] })
  ] });
}

function CreateQuestions() {
  const [subject, setSubject] = reactExports.useState("chemistry");
  const [topic, setTopic] = reactExports.useState("all");
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [generatedQuestions, setGeneratedQuestions] = reactExports.useState([]);
  const [databaseQuestions, setDatabaseQuestions] = reactExports.useState([]);
  const [expandedQuestion, setExpandedQuestion] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("generate");
  const getTopics = () => {
    const questions = subject === "chemistry" ? chemistryQuestions : subject === "biology" ? biologyQuestions : physicsQuestions;
    const topics = [...new Set(questions.map((q) => q.topic))];
    return topics.sort();
  };
  const getFilteredQuestions = () => {
    const questions = subject === "chemistry" ? chemistryQuestions : subject === "biology" ? biologyQuestions : physicsQuestions;
    if (topic && topic !== "all") {
      return questions.filter((q) => q.topic === topic);
    }
    return questions;
  };
  const loadDatabaseQuestions = async () => {
    const { data, error } = await supabase.from("generated_questions").select("*").eq("subject", subject).order("created_at", { ascending: false });
    if (error) {
      console.error("Error loading database questions:", error);
      return;
    }
    setDatabaseQuestions(data || []);
  };
  reactExports.useEffect(() => {
    loadDatabaseQuestions();
  }, [subject]);
  const handleGenerate = async (type) => {
    const filteredQuestions = getFilteredQuestions();
    if (filteredQuestions.length === 0) {
      toast({
        title: "No questions found",
        description: "Please select a topic with available questions",
        variant: "destructive"
      });
      return;
    }
    setIsGenerating(true);
    setGeneratedQuestions([]);
    try {
      const { data, error } = await supabase.functions.invoke("generate-questions", {
        body: {
          subject,
          topic: topic || "General",
          generationType: type,
          sourceQuestions: filteredQuestions.slice(0, 15).map((q) => ({
            id: q.id,
            text: q.text,
            topic: q.topic
          })),
          count: 10
        }
      });
      if (error) throw error;
      if (data.error) {
        throw new Error(data.error);
      }
      setGeneratedQuestions(data.generated || []);
      loadDatabaseQuestions();
      toast({
        title: "Questions Generated",
        description: `Successfully generated ${data.count} new questions`
      });
    } catch (error) {
      console.error("Error generating questions:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate questions",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  const QuestionCard = ({ question, showSource = false }) => {
    const isExpanded = expandedQuestion === question.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-card border-border hover:border-primary/30 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium", children: question.topic }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize", children: question.generation_type })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 text-sm whitespace-pre-line mb-3", children: question.generated_question }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => setExpandedQuestion(isExpanded ? null : question.id),
          className: "gap-2 text-muted-foreground",
          children: [
            isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" }),
            isExpanded ? "Hide Details" : "Show Markscheme"
          ]
        }
      ),
      isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-4 border-t border-border pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-sm text-primary mb-2", children: "Markscheme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground whitespace-pre-line", children: question.markscheme })
        ] }),
        question.calculation && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-sm text-primary mb-2", children: "Calculation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground whitespace-pre-line font-mono", children: question.calculation })
        ] }),
        showSource && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-sm text-muted-foreground mb-2", children: "Source Question" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 whitespace-pre-line", children: question.source_question_text })
        ] })
      ] })
    ] }) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full max-w-md mx-auto grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "generate", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
        "Generate"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "database", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4" }),
        "Database"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "generate", className: "space-y-6 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Filters" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Subject" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: subject, onValueChange: (v) => {
                setSubject(v);
                setTopic("");
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "chemistry", children: "Chemistry" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "biology", children: "Biology" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "physics", children: "Physics" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Topic" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: topic, onValueChange: setTopic, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All topics" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All topics" }),
                  getTopics().map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t))
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            getFilteredQuestions().length,
            " questions available with current filters"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Generate Questions" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "AI will generate 10 unique questions based on your filters. Questions are saved globally and won't be duplicated." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => handleGenerate("rephrase"),
                disabled: isGenerating,
                className: "gap-2",
                children: [
                  isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                  "Rephrase"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => handleGenerate("rewrite"),
                disabled: isGenerating,
                variant: "secondary",
                className: "gap-2",
                children: [
                  isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-4 h-4" }),
                  "Rewrite"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Rephrase:" }),
              " Same numbers and data, different wording"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Rewrite:" }),
              " New question inspired by the original"
            ] })
          ] })
        ] })
      ] }),
      generatedQuestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold", children: [
          "Newly Generated (",
          generatedQuestions.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: generatedQuestions.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionCard, { question: q, showSource: true }, q.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "database", className: "space-y-6 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold", children: [
          "Saved Questions (",
          databaseQuestions.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: subject, onValueChange: setSubject, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "chemistry", children: "Chemistry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "biology", children: "Biology" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "physics", children: "Physics" })
          ] })
        ] })
      ] }),
      databaseQuestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "No generated questions yet for ",
          subject,
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Generate some questions to see them here!" })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: databaseQuestions.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionCard, { question: q, showSource: true }, q.id)) })
    ] })
  ] }) });
}

function PastPapers() {
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [activeSubject, setActiveSubject] = reactExports.useState("chemistry");
  const [mainTab, setMainTab] = reactExports.useState("search");
  const handleManipulate = async (question, type) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("manipulate-question", {
        body: { question: question.text, manipulationType: type }
      });
      if (error) {
        throw error;
      }
      if (data.error) {
        throw new Error(data.error);
      }
      setResult({
        original: question.text,
        manipulated: data.manipulated,
        type
      });
    } catch (error) {
      console.error("Error manipulating question:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate question variation",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MoleculeBackground, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 container mx-auto px-4 py-12 max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/homepage" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center mb-12 animate-slide-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center gap-3 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "w-12 h-12 text-primary animate-float" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-accent absolute -top-1 -right-1" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-gradient-primary mb-4", children: "IB Science AI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-xl mx-auto", children: "Transform your science questions with AI-powered variations. Search existing papers or create new questions instantly." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: mainTab, onValueChange: setMainTab, className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full max-w-md mx-auto grid-cols-2 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "search", className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
            "Search"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "create", className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
            "Create"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "search", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 mb-8 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Beaker, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                chemistryQuestions.length + biologyQuestions.length + physicsQuestions.length,
                " Questions"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "4 Variation Types" })
            ] })
          ] }),
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40 flex items-center justify-center bg-background/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "w-16 h-16 text-primary animate-spin", style: { animationDuration: "2s" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 w-16 h-16 border-2 border-primary/30 rounded-full animate-ping" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Generating variation..." })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "chemistry", className: "w-full", onValueChange: setActiveSubject, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full max-w-md mx-auto grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "chemistry", className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Beaker, { className: "w-4 h-4" }),
                "Chemistry"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "biology", className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Dna, { className: "w-4 h-4" }),
                "Biology"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "physics", className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                "Physics"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "chemistry", className: "space-y-4 mt-8", children: chemistryQuestions.map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { animationDelay: `${index * 50}ms` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              QuestionCard,
              {
                question,
                onManipulate: handleManipulate,
                isLoading
              }
            ) }, question.id)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "biology", className: "space-y-4 mt-8", children: biologyQuestions.map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { animationDelay: `${index * 50}ms` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              QuestionCard,
              {
                question,
                onManipulate: handleManipulate,
                isLoading
              }
            ) }, question.id)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "physics", className: "space-y-4 mt-8", children: physicsQuestions.map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { animationDelay: `${index * 50}ms` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              QuestionCard,
              {
                question,
                onManipulate: handleManipulate,
                isLoading
              }
            ) }, question.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "create", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreateQuestions, {}) })
      ] }),
      result && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ManipulatedResult,
        {
          original: result.original,
          manipulated: result.manipulated,
          type: result.type,
          onClose: () => setResult(null)
        }
      )
    ] })
  ] });
}

export { PastPapers as default };
