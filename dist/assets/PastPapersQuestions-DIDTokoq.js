import { r as reactExports, j as jsxRuntimeExports, cC as Shuffle, cP as SlidersHorizontal, cn as Beaker, co as Dna, an as Zap, bD as Filter, X, bC as Search, al as BookOpen, bw as Atom, aP as ChevronLeft, a2 as ChevronRight, az as Sparkles, cQ as Target, aK as Clock } from './vendor-react-BeQHm2Hb.js';
import { d as useSearchParams, u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
import { c as chemistryQuestions, p as physicsQuestions, b as biologyQuestions } from './data-past-papers-DNz6MKBl.js';
import { Q as QuestionCard, M as ManipulatedResult } from './ManipulatedResult-D-tRig77.js';
import { i as cn, B as Button, s as supabase, t as toast } from './index-C9tyh6tO.js';
import { C as Card, d as CardContent } from './card-BTaNjRSt.js';
import { I as Input } from './input-2hnN3JAu.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-D8pTTJCu.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-DtVQdYEt.js';
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
import './vendor-supabase-B1aOSilF.js';

const CHEMISTRY_TOPICS = [
  "Stoichiometry",
  "Bonding",
  "Organic Chemistry",
  "Equilibrium",
  "Thermodynamics",
  "Kinetics",
  "Electrochemistry",
  "Acids and Bases",
  "Redox",
  "General Chemistry"
];
const BIOLOGY_TOPICS = [
  "Cell Biology",
  "Molecular Biology",
  "Genetics",
  "Ecology",
  "Evolution",
  "Human Physiology",
  "Plant Biology",
  "General Biology"
];
const PHYSICS_TOPICS = [
  "Mechanics",
  "Thermal Physics",
  "Waves",
  "Electricity",
  "Magnetism",
  "Atomic Physics",
  "Quantum Physics",
  "General Physics"
];
const ITEMS_PER_PAGE = 10;
function PastPapersQuestions() {
  const [searchParams, setSearchParams] = useSearchParams();
  useNavigate();
  const initialSubject = searchParams.get("subject") || "chemistry";
  const [activeSubject, setActiveSubject] = reactExports.useState(initialSubject);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedTopic, setSelectedTopic] = reactExports.useState("all");
  const [selectedYear, setSelectedYear] = reactExports.useState("all");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const allQuestions = reactExports.useMemo(() => {
    switch (activeSubject) {
      case "chemistry":
        return chemistryQuestions;
      case "biology":
        return biologyQuestions;
      case "physics":
        return physicsQuestions;
      default:
        return chemistryQuestions;
    }
  }, [activeSubject]);
  const topics = reactExports.useMemo(() => {
    switch (activeSubject) {
      case "chemistry":
        return CHEMISTRY_TOPICS;
      case "biology":
        return BIOLOGY_TOPICS;
      case "physics":
        return PHYSICS_TOPICS;
      default:
        return [];
    }
  }, [activeSubject]);
  const availableYears = reactExports.useMemo(() => {
    const years = /* @__PURE__ */ new Set();
    allQuestions.forEach((q) => {
      const match = q.source?.match(/(\d{4})/);
      if (match) {
        years.add(match[1]);
      }
    });
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [allQuestions]);
  const filteredQuestions = reactExports.useMemo(() => {
    let questions = [...allQuestions];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      questions = questions.filter(
        (q) => q.text.toLowerCase().includes(query) || q.topic.toLowerCase().includes(query)
      );
    }
    if (selectedTopic !== "all") {
      questions = questions.filter(
        (q) => q.topic.toLowerCase().includes(selectedTopic.toLowerCase())
      );
    }
    if (selectedYear !== "all") {
      questions = questions.filter(
        (q) => q.source?.includes(selectedYear)
      );
    }
    return questions;
  }, [allQuestions, searchQuery, selectedTopic, selectedYear]);
  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
  const paginatedQuestions = reactExports.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredQuestions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredQuestions, currentPage]);
  reactExports.useEffect(() => {
    setCurrentPage(1);
  }, [activeSubject, searchQuery, selectedTopic, selectedYear]);
  reactExports.useEffect(() => {
    setSearchParams({ subject: activeSubject });
  }, [activeSubject, setSearchParams]);
  const handleManipulate = async (question, type) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("manipulate-question", {
        body: { question: question.text, manipulationType: type }
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
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
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTopic("all");
    setSelectedYear("all");
  };
  const hasActiveFilters = searchQuery || selectedTopic !== "all" || selectedYear !== "all";
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    const question = allQuestions[randomIndex];
    const questionIndex = filteredQuestions.findIndex((q) => q.id === question.id);
    if (questionIndex >= 0) {
      setCurrentPage(Math.floor(questionIndex / ITEMS_PER_PAGE) + 1);
    }
  };
  const SubjectIcon = ({ subject, className }) => {
    switch (subject) {
      case "chemistry":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Beaker, { className });
      case "biology":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Dna, { className });
      case "physics":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className });
    }
  };
  const subjectColor = {
    chemistry: "text-blue-600",
    biology: "text-green-600",
    physics: "text-purple-600"
  }[activeSubject] || "text-primary";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/homepage/past-papers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-2 rounded-lg bg-primary/10", subjectColor), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubjectIcon, { subject: activeSubject, className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Practice Questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              filteredQuestions.length,
              " questions available"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: getRandomQuestion, className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shuffle, { className: "h-4 w-4" }),
            "Random Question"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setShowFilters(!showFilters),
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
                "Filters",
                hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-1 h-5 w-5 p-0 flex items-center justify-center", children: "!" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeSubject, onValueChange: setActiveSubject, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full max-w-md mx-auto grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "chemistry", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Beaker, { className: "h-4 w-4" }),
          "Chemistry"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "biology", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Dna, { className: "h-4 w-4" }),
          "Biology"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "physics", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
          "Physics"
        ] })
      ] }),
      showFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "animate-in fade-in slide-in-from-top-2 duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "h-4 w-4" }),
            "Filter Questions"
          ] }),
          hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: clearFilters, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-1" }),
            "Clear"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search questions...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "pl-9"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedTopic, onValueChange: setSelectedTopic, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Topics" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Topics" }),
              topics.map((topic) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: topic, children: topic }, topic))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedYear, onValueChange: setSelectedYear, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Years" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Years" }),
              availableYears.map((year) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: year, children: year }, year))
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
            filteredQuestions.length,
            " questions"
          ] }),
          hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "h-3 w-3" }),
            "Filtered"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          "Page ",
          currentPage,
          " of ",
          totalPages || 1
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: activeSubject, className: "space-y-4 mt-0", children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40 flex items-center justify-center bg-background/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "w-16 h-16 text-primary animate-spin", style: { animationDuration: "2s" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 w-16 h-16 border-2 border-primary/30 rounded-full animate-ping" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Generating variation..." })
        ] }) }),
        paginatedQuestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-12 w-12 mx-auto text-muted-foreground/50 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-2", children: "No questions found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Try adjusting your filters or search query" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: clearFilters, children: "Clear Filters" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          paginatedQuestions.map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "animate-in fade-in slide-in-from-bottom-2",
              style: { animationDelay: `${index * 50}ms` },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuestionCard,
                {
                  question,
                  onManipulate: handleManipulate,
                  isLoading
                }
              )
            },
            question.id
          )),
          totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 pt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
                disabled: currentPage === 1,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 mr-1" }),
                  "Previous"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: [...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: currentPage === pageNum ? "default" : "outline",
                  size: "sm",
                  className: "w-9",
                  onClick: () => setCurrentPage(pageNum),
                  children: pageNum
                },
                pageNum
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
                disabled: currentPage === totalPages,
                children: [
                  "Next",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-1", children: "AI-Powered Question Variations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Click on any question to generate variations using AI:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-3 w-3" }),
            "Simplify"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
            "Rephrase"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            "Make Harder"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3" }),
            "Similar Question"
          ] })
        ] })
      ] })
    ] }) }) }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ManipulatedResult,
      {
        original: result.original,
        manipulated: result.manipulated,
        type: result.type,
        onClose: () => setResult(null)
      }
    )
  ] }) });
}

export { PastPapersQuestions as default };
