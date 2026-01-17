import { r as reactExports, j as jsxRuntimeExports, cp as EyeOff, bJ as Eye, aA as CircleCheck, cq as FileCheck, al as BookOpen, bq as ChevronUp, aj as ChevronDown, bI as RotateCcw, az as Sparkles, cr as Root2, cs as Item2, ct as Indicator, ab as Circle, R as React__default, ax as FileText, cu as Building2, cv as TrendingUp, cw as Laptop, cx as Calculator, an as Zap, cn as Beaker, co as Dna, bD as Filter, cy as ListChecks, cd as PenTool, cl as Play, aP as ChevronLeft, cz as Timer, a2 as ChevronRight, $ as LoaderCircle, av as GraduationCap, X, bC as Search, aM as Calendar, aK as Clock, bw as Atom, cA as Leaf, cB as Activity, cC as Shuffle, bW as Globe, aG as Brain, cb as Download, bx as Palette } from './vendor-react-BeQHm2Hb.js';
import { g as getAllSubjects, p as paperQuestions } from './data-exams-paper-BOO5-hy6.js';
import { g as getAllFullQuestionSubjects, f as fullQuestions } from './data-exams-full-qMJxY5lx.js';
import { B as Button, i as cn, T as Tooltip, c as TooltipTrigger, d as TooltipContent } from './index-C9tyh6tO.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-BTaNjRSt.js';
import { T as Textarea } from './textarea-1gnjGx7F.js';
import { L as Label } from './label-BfT9c56I.js';
import { P as Progress } from './progress-BjrBDcIN.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-DtVQdYEt.js';
import { g as getAllUnifiedExamSubjects, a as getUnifiedExamsBySubject, u as unifiedExamPapers } from './data-exams-BrJf5nRQ.js';
import { I as Input } from './input-2hnN3JAu.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-D8pTTJCu.js';
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from './accordion-DC352Etu.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from './dialog-BQ4GVXEh.js';
import { S as ScrollArea } from './scroll-area-DHtqER3G.js';
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

async function loadPapersIndex() {
  try {
    const response = await fetch("/papers/papers-index.json");
    if (!response.ok) {
      throw new Error(`Failed to load papers index: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading papers index:", error);
    throw error;
  }
}
async function loadPaperContent(filepath) {
  try {
    const response = await fetch(`/papers/${filepath}`);
    if (!response.ok) {
      throw new Error(`Failed to load paper: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error loading paper content:", error);
    throw error;
  }
}
async function loadMarkScheme(filepath) {
  try {
    const response = await fetch(`/papers/${filepath}`);
    if (!response.ok) {
      throw new Error(`Failed to load mark scheme: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error loading mark scheme:", error);
    throw error;
  }
}

function parseQuestions(content) {
  const lines = content.split("\n");
  let title = "";
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim()) {
      title = lines[i].trim();
      break;
    }
  }
  const questions = [];
  const blocks = content.split(/\n(?=\d+\.\s*\n)/);
  for (const block of blocks) {
    const match = block.match(/^(\d+)\.\s*\n([\s\S]*)/);
    if (!match) continue;
    const number = match[1];
    const remaining = match[2];
    const solutionMatch = remaining.match(/Solution[:\s]*([A-D])?[:\s]*/i);
    let solutionAnswer = "";
    let solutionExplanation = "";
    let questionContent = remaining;
    if (solutionMatch && solutionMatch.index !== void 0) {
      questionContent = remaining.substring(0, solutionMatch.index).trim();
      solutionAnswer = solutionMatch[1] || "";
      const afterSolution = remaining.substring(solutionMatch.index + solutionMatch[0].length);
      solutionExplanation = afterSolution.trim();
    }
    questions.push({
      number,
      content: questionContent,
      solutionAnswer,
      solutionExplanation
    });
  }
  return { title, questions };
}
function QuestionCard$1({ question, showSolution }) {
  const lines = question.content.split("\n").filter((l) => l.trim());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-mono text-lg font-bold shrink-0", children: question.number }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 mb-4", children: lines.map((line, i) => {
      const trimmed = line.trim();
      const isOption = /^[A-D]\.\s/.test(trimmed);
      if (isOption) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pl-4 py-2 my-1 rounded-lg bg-muted/50 border-l-2 border-primary/30 font-mono text-sm text-foreground/80",
            children: trimmed
          },
          i
        );
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed text-sm font-mono", children: trimmed }, i);
    }) }),
    (question.solutionAnswer || question.solutionExplanation) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
      "p-4 rounded-lg border transition-all duration-300",
      showSolution ? "bg-green-500/5 border-green-500/20" : "bg-muted/30 border-border"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        showSolution ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(
          "text-sm font-medium",
          showSolution ? "text-green-600" : "text-muted-foreground"
        ), children: "Solution" })
      ] }),
      showSolution ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        question.solutionAnswer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full bg-green-500/20 text-green-600 font-bold text-sm", children: question.solutionAnswer }) }),
        question.solutionExplanation && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed whitespace-pre-line font-mono", children: question.solutionExplanation })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: 'Click "Show Solutions" to reveal' })
    ] })
  ] });
}
function PaperContentViewer({ content, isMarkScheme = false }) {
  const [showSolutions, setShowSolutions] = reactExports.useState(isMarkScheme);
  const { title, questions } = reactExports.useMemo(() => parseQuestions(content), [content]);
  if (questions.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-sm text-foreground/90 whitespace-pre-wrap font-mono leading-relaxed", children: content }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-4 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
        questions.length,
        " ",
        questions.length === 1 ? "question" : "questions"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: () => setShowSolutions(!showSolutions),
        className: "gap-2",
        children: showSolutions ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }),
          "Hide Solutions"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
          "Show Solutions"
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: questions.map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuestionCard$1,
      {
        question,
        showSolution: showSolutions
      },
      index
    )) })
  ] });
}

function QuestionCard({ question }) {
  const [selectedAnswer, setSelectedAnswer] = reactExports.useState(null);
  const [showAnswer, setShowAnswer] = reactExports.useState(false);
  const parseQuestion = (text) => {
    const lines = text.split("\n").filter((l) => l.trim());
    const options2 = [];
    let questionText2 = "";
    for (const line of lines) {
      const optionMatch = line.match(/^([A-D])\.?\s+(.+)$/);
      if (optionMatch) {
        options2.push({ letter: optionMatch[1], text: optionMatch[2] });
      } else {
        questionText2 += (questionText2 ? "\n" : "") + line;
      }
    }
    return { questionText: questionText2, options: options2 };
  };
  const { questionText, options } = parseQuestion(question.text);
  const year = question.year || question.source?.match(/(\d{4})/)?.[1] || null;
  const session = question.session || (question.source?.includes("November") ? "November" : "May");
  const sessionCode = session === "November" ? "N" : "M";
  const level = question.level || "SL";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-mono text-lg font-bold shrink-0", children: question.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: question.topic }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: level }),
      year && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
        sessionCode,
        year.slice(2)
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed whitespace-pre-line text-sm mb-4 font-mono", children: questionText }),
    options.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setSelectedAnswer(option.letter),
        className: cn(
          "w-full text-left pl-4 py-3 rounded-lg border transition-all duration-200 font-mono text-sm",
          selectedAnswer === option.letter ? "bg-primary/10 border-primary/50 text-foreground" : "bg-muted/30 border-transparent hover:bg-muted/50 text-foreground/80"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold mr-2", children: [
            option.letter,
            "."
          ] }),
          option.text
        ]
      },
      option.letter
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => setShowAnswer(!showAnswer),
          className: "gap-2 text-muted-foreground",
          children: [
            showAnswer ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
            showAnswer ? "Hide Answer" : "Show Answer"
          ]
        }
      ),
      selectedAnswer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary" }),
        "Selected: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: selectedAnswer })
      ] })
    ] }),
    showAnswer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-green-500/5 border border-green-500/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "Answer key not available. Check the mark scheme for the correct answer." }) })
  ] });
}

function FullQuestionCard({ question, onComplete, showSource = true }) {
  const [partAnswers, setPartAnswers] = reactExports.useState({});
  const [isContextExpanded, setIsContextExpanded] = reactExports.useState(true);
  const [allSubmitted, setAllSubmitted] = reactExports.useState(false);
  const [showAllMarkSchemes, setShowAllMarkSchemes] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const initialAnswers = {};
    question.parts.forEach((part) => {
      initialAnswers[part.partId] = {
        partId: part.partId,
        answer: "",
        isSubmitted: false,
        showMarkScheme: false
      };
    });
    setPartAnswers(initialAnswers);
    setAllSubmitted(false);
    setShowAllMarkSchemes(false);
  }, [question.id]);
  const handleAnswerChange = (partId, answer) => {
    setPartAnswers((prev) => ({
      ...prev,
      [partId]: {
        ...prev[partId],
        answer
      }
    }));
  };
  const handleSubmitPart = (partId) => {
    setPartAnswers((prev) => ({
      ...prev,
      [partId]: {
        ...prev[partId],
        isSubmitted: true
      }
    }));
  };
  const handleSubmitAll = () => {
    const allAnswered = question.parts.every(
      (part) => partAnswers[part.partId]?.answer.trim().length > 0
    );
    if (!allAnswered) {
      const newAnswers = { ...partAnswers };
      question.parts.forEach((part) => {
        if (newAnswers[part.partId]?.answer.trim().length > 0) {
          newAnswers[part.partId].isSubmitted = true;
        }
      });
      setPartAnswers(newAnswers);
    } else {
      const newAnswers = { ...partAnswers };
      Object.keys(newAnswers).forEach((key) => {
        newAnswers[key].isSubmitted = true;
      });
      setPartAnswers(newAnswers);
      setAllSubmitted(true);
      onComplete?.(question.id);
    }
  };
  const handleToggleMarkScheme = (partId) => {
    setPartAnswers((prev) => ({
      ...prev,
      [partId]: {
        ...prev[partId],
        showMarkScheme: !prev[partId]?.showMarkScheme
      }
    }));
  };
  const handleToggleAllMarkSchemes = () => {
    const newState = !showAllMarkSchemes;
    setShowAllMarkSchemes(newState);
    const newAnswers = { ...partAnswers };
    Object.keys(newAnswers).forEach((key) => {
      newAnswers[key].showMarkScheme = newState;
    });
    setPartAnswers(newAnswers);
  };
  const handleReset = () => {
    const resetAnswers = {};
    question.parts.forEach((part) => {
      resetAnswers[part.partId] = {
        partId: part.partId,
        answer: "",
        isSubmitted: false,
        showMarkScheme: false
      };
    });
    setPartAnswers(resetAnswers);
    setShowAllMarkSchemes(false);
    setAllSubmitted(false);
  };
  const answeredCount = question.parts.filter(
    (part) => partAnswers[part.partId]?.answer.trim().length > 0
  ).length;
  question.parts.filter(
    (part) => partAnswers[part.partId]?.isSubmitted
  ).length;
  const hasAnyMarkScheme = question.parts.some((p) => p.markScheme);
  const cleanDisplayText = (text) => {
    return text.replace(/\n20EP\d+/g, "").replace(/\n–\d+–\s+M\d+\/\d+\/\w+\/\w+\/\w+\/\w+/g, "").replace(/\. \. \./g, "").replace(/^\.\s+$/gm, "").replace(/\n{3,}/g, "\n\n").trim();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full border-2 border-muted/50 hover:border-primary/20 transition-all duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs font-medium", children: [
            "Q",
            question.questionNumber
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
            question.totalMarks,
            " marks"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: cn(
                "text-xs",
                question.level === "HL" ? "border-orange-500 text-orange-600" : "border-blue-500 text-blue-600"
              ),
              children: question.level
            }
          ),
          question.paper && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs text-muted-foreground", children: question.paper }),
          hasAnyMarkScheme && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs border-green-500 text-green-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "h-3 w-3 mr-1" }),
            "Mark Scheme"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg font-semibold text-foreground", children: question.subject }),
        showSource && /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { className: "text-sm text-muted-foreground mt-1", children: [
          question.source,
          " ",
          question.timezone && `• ${question.timezone}`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: allSubmitted ? "default" : "secondary",
          className: cn(
            "text-xs",
            allSubmitted && "bg-green-600 hover:bg-green-700"
          ),
          children: [
            answeredCount,
            "/",
            question.parts.length,
            " parts"
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      question.context && question.context !== "See question parts below." && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 border border-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setIsContextExpanded(!isContextExpanded),
            className: "w-full flex items-center justify-between p-3 text-left hover:bg-muted/60 transition-colors rounded-t-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "Question Context" })
              ] }),
              isContextExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground" })
            ]
          }
        ),
        isContextExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 pt-0 border-t border-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap leading-relaxed", children: cleanDisplayText(question.context) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: question.parts.map((part, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        PartCard,
        {
          part,
          answer: partAnswers[part.partId]?.answer || "",
          isSubmitted: partAnswers[part.partId]?.isSubmitted || false,
          showMarkScheme: partAnswers[part.partId]?.showMarkScheme || false,
          onAnswerChange: (answer) => handleAnswerChange(part.partId, answer),
          onSubmit: () => handleSubmitPart(part.partId),
          onToggleMarkScheme: () => handleToggleMarkScheme(part.partId),
          cleanDisplayText
        },
        `${question.id}-${part.partId}-${index}`
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 pt-4 border-t flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleReset,
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
                "Reset All"
              ]
            }
          ),
          hasAnyMarkScheme && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: showAllMarkSchemes ? "secondary" : "outline",
              size: "sm",
              onClick: handleToggleAllMarkSchemes,
              className: "gap-2",
              children: [
                showAllMarkSchemes ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }),
                showAllMarkSchemes ? "Hide Mark Schemes" : "Show Mark Schemes"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: allSubmitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-green-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Completed!" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleSubmitAll,
            className: "gap-2",
            disabled: answeredCount === 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
              "Submit All Answers"
            ]
          }
        ) })
      ] })
    ] })
  ] });
}
function PartCard({
  part,
  answer,
  isSubmitted,
  showMarkScheme,
  onAnswerChange,
  onSubmit,
  onToggleMarkScheme,
  cleanDisplayText
}) {
  const rowCount = Math.min(Math.max(part.marks * 2, 3), 10);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-lg border p-4 transition-all duration-200",
        isSubmitted ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900" : "bg-card border-muted hover:border-primary/30"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: isSubmitted ? "default" : "secondary",
                className: cn(
                  "text-xs font-mono",
                  isSubmitted && "bg-green-600"
                ),
                children: part.partId || "Q"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
              part.marks,
              " ",
              part.marks === 1 ? "mark" : "marks"
            ] }),
            part.markScheme && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs border-green-500/50 text-green-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "h-3 w-3" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            part.markScheme && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: onToggleMarkScheme,
                className: "text-xs h-7 gap-1",
                children: [
                  showMarkScheme ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
                  showMarkScheme ? "Hide" : "Show",
                  " Answer"
                ]
              }
            ),
            isSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-green-600 flex-shrink-0" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mb-3 whitespace-pre-wrap leading-relaxed", children: cleanDisplayText(part.text) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: answer,
              onChange: (e) => onAnswerChange(e.target.value),
              placeholder: `Write your answer here... (suggested: ~${part.marks * 25} words)`,
              rows: rowCount,
              className: cn(
                "resize-none text-sm transition-all",
                isSubmitted && "bg-white dark:bg-background"
              ),
              disabled: isSubmitted
            }
          ),
          showMarkScheme && part.markScheme && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "h-4 w-4 text-green-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-green-700 dark:text-green-400", children: "Mark Scheme Answer" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-green-800 dark:text-green-300 whitespace-pre-wrap leading-relaxed", children: cleanDisplayText(part.markScheme) })
          ] }),
          !isSubmitted && answer.trim().length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: onSubmit,
              className: "text-xs gap-1 h-7",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                "Mark as done"
              ]
            }
          ) })
        ] })
      ]
    }
  );
}

const RadioGroup = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { className: cn("grid gap-2", className), ...props, ref });
});
RadioGroup.displayName = Root2.displayName;
const RadioGroupItem = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })
    }
  );
});
RadioGroupItem.displayName = Item2.displayName;

const SUBJECT_ICONS$1 = {
  Biology: Dna,
  Chemistry: Beaker,
  Physics: Zap,
  Mathematics: Calculator,
  "Computer Science": Laptop,
  Economics: TrendingUp,
  "Business Management": Building2
};
function ExamPractice({ onBack }) {
  const [selectedSubject, setSelectedSubject] = reactExports.useState("Chemistry");
  const [selectedPaperType, setSelectedPaperType] = reactExports.useState("all");
  const [selectedYear, setSelectedYear] = reactExports.useState("all");
  const [selectedLevel, setSelectedLevel] = reactExports.useState("all");
  const [selectedSession, setSelectedSession] = reactExports.useState("all");
  const [selectedExamId, setSelectedExamId] = reactExports.useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = reactExports.useState(0);
  const [completedQuestions, setCompletedQuestions] = reactExports.useState(/* @__PURE__ */ new Set());
  const [mcqAnswers, setMcqAnswers] = reactExports.useState({});
  const [examStarted, setExamStarted] = reactExports.useState(false);
  const [startTime, setStartTime] = reactExports.useState(null);
  const [elapsedTime, setElapsedTime] = reactExports.useState(0);
  const [showResults, setShowResults] = reactExports.useState(false);
  const subjects = reactExports.useMemo(() => getAllUnifiedExamSubjects(), []);
  const availableYears = reactExports.useMemo(() => {
    const exams = getUnifiedExamsBySubject(selectedSubject);
    const years = [...new Set(exams.map((e) => e.year))].filter((y) => y && y !== "").sort((a, b) => parseInt(b) - parseInt(a));
    return years;
  }, [selectedSubject]);
  const availableLevels = reactExports.useMemo(() => {
    const exams = getUnifiedExamsBySubject(selectedSubject);
    return [...new Set(exams.map((e) => e.level))].filter((l) => l && l !== "").sort();
  }, [selectedSubject]);
  const availableSessions = reactExports.useMemo(() => {
    const exams = getUnifiedExamsBySubject(selectedSubject);
    return [...new Set(exams.map((e) => e.session))].filter((s) => s && s !== "").sort();
  }, [selectedSubject]);
  const subjectExams = reactExports.useMemo(() => {
    let exams = getUnifiedExamsBySubject(selectedSubject);
    if (selectedPaperType !== "all") {
      exams = exams.filter((e) => e.paperType === selectedPaperType);
    }
    if (selectedYear !== "all") {
      exams = exams.filter((e) => e.year === selectedYear);
    }
    if (selectedLevel !== "all") {
      exams = exams.filter((e) => e.level === selectedLevel);
    }
    if (selectedSession !== "all") {
      exams = exams.filter((e) => e.session === selectedSession);
    }
    return exams.sort((a, b) => {
      if (b.year !== a.year) return parseInt(b.year) - parseInt(a.year);
      if (a.paper !== b.paper) return a.paper.localeCompare(b.paper);
      return a.level.localeCompare(b.level);
    });
  }, [selectedSubject, selectedPaperType, selectedYear, selectedLevel, selectedSession]);
  const selectedExam = reactExports.useMemo(() => {
    return unifiedExamPapers.find((e) => e.id === selectedExamId);
  }, [selectedExamId]);
  React__default.useEffect(() => {
    let interval;
    if (examStarted && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1e3));
      }, 1e3);
    }
    return () => clearInterval(interval);
  }, [examStarted, startTime]);
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const handleStartExam = () => {
    setExamStarted(true);
    setStartTime(/* @__PURE__ */ new Date());
    setCurrentQuestionIndex(0);
    setCompletedQuestions(/* @__PURE__ */ new Set());
    setMcqAnswers({});
    setShowResults(false);
  };
  const handleResetExam = () => {
    setExamStarted(false);
    setStartTime(null);
    setElapsedTime(0);
    setCurrentQuestionIndex(0);
    setCompletedQuestions(/* @__PURE__ */ new Set());
    setMcqAnswers({});
    setShowResults(false);
  };
  const handleQuestionComplete = (questionId) => {
    setCompletedQuestions((prev) => new Set(prev).add(questionId));
  };
  const handleMCQAnswer = (questionId, answer) => {
    setMcqAnswers((prev) => ({ ...prev, [questionId]: answer }));
    handleQuestionComplete(questionId);
  };
  const handleNextQuestion = () => {
    if (selectedExam && currentQuestionIndex < selectedExam.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };
  const handleFinishExam = () => {
    setShowResults(true);
  };
  const examCounts = reactExports.useMemo(() => {
    const subjectExams2 = getUnifiedExamsBySubject(selectedSubject);
    return {
      all: subjectExams2.length,
      mcq: subjectExams2.filter((e) => e.paperType === "mcq").length,
      long: subjectExams2.filter((e) => e.paperType === "long").length
    };
  }, [selectedSubject]);
  if (!examStarted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Full Exam Practice" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
            "Practice complete past papers with ",
            unifiedExamPapers.length,
            " available exams (MCQ + Long Answer)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: subjects.map((subject) => {
            const Icon = SUBJECT_ICONS$1[subject] || BookOpen;
            const count = getUnifiedExamsBySubject(subject).length;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: selectedSubject === subject ? "default" : "outline",
                size: "sm",
                onClick: () => {
                  setSelectedSubject(subject);
                  setSelectedExamId(null);
                },
                className: "gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: subject }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-1 text-xs", children: count })
                ]
              },
              subject
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-4 p-4 bg-muted/30 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Filter:" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: selectedPaperType === "all" ? "default" : "outline",
                  size: "sm",
                  onClick: () => {
                    setSelectedPaperType("all");
                    setSelectedExamId(null);
                  },
                  children: [
                    "All (",
                    examCounts.all,
                    ")"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: selectedPaperType === "mcq" ? "default" : "outline",
                  size: "sm",
                  onClick: () => {
                    setSelectedPaperType("mcq");
                    setSelectedExamId(null);
                  },
                  className: "gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-4 w-4" }),
                    "MCQ (",
                    examCounts.mcq,
                    ")"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: selectedPaperType === "long" ? "default" : "outline",
                  size: "sm",
                  onClick: () => {
                    setSelectedPaperType("long");
                    setSelectedExamId(null);
                  },
                  className: "gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "h-4 w-4" }),
                    "Essay (",
                    examCounts.long,
                    ")"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedYear, onValueChange: (v) => {
              setSelectedYear(v);
              setSelectedExamId(null);
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[120px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Years" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Years" }),
                availableYears.map((year) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: year, children: year }, year))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedSession, onValueChange: (v) => {
              setSelectedSession(v);
              setSelectedExamId(null);
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[140px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Sessions" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Sessions" }),
                availableSessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: session, children: session }, session))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedLevel, onValueChange: (v) => {
              setSelectedLevel(v);
              setSelectedExamId(null);
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[100px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Level" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Levels" }),
                availableLevels.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: level, children: level }, level))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-sm", children: [
              subjectExams.length,
              " exams"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-sm", children: [
              availableYears.length,
              " years"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2 lg:grid-cols-3", children: subjectExams.map((exam) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: cn(
                "cursor-pointer transition-all hover:border-primary/50",
                selectedExamId === exam.id && "border-primary ring-2 ring-primary/20"
              ),
              onClick: () => setSelectedExamId(exam.id),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    exam.paperType === "mcq" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-4 w-4 text-blue-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "h-4 w-4 text-purple-500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-sm", children: exam.paper }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        exam.session,
                        " ",
                        exam.year,
                        " ",
                        exam.timezone && `• ${exam.timezone}`
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: cn(
                        "text-xs",
                        exam.level === "HL" ? "border-orange-500 text-orange-600" : "border-blue-500 text-blue-600"
                      ),
                      children: exam.level
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3 w-3" }),
                    exam.questionCount,
                    " Qs"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    exam.totalMarks,
                    " marks"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: cn(
                        "text-xs px-1.5",
                        exam.paperType === "mcq" ? "border-blue-400 text-blue-600" : "border-purple-400 text-purple-600"
                      ),
                      children: exam.paperType === "mcq" ? "MCQ" : "Essay"
                    }
                  ),
                  exam.hasMarkScheme && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs border-green-500 text-green-600 px-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "h-3 w-3" }) })
                ] })
              ] })
            },
            exam.id
          )) }),
          subjectExams.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "No ",
              selectedPaperType !== "all" ? selectedPaperType.toUpperCase() + " " : "",
              "exams found for ",
              selectedSubject,
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "link", onClick: () => setSelectedPaperType("all"), children: "Show all paper types" })
          ] })
        ] })
      ] }),
      selectedExam && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            selectedExam.paperType === "mcq" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-6 w-6 text-blue-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "h-6 w-6 text-purple-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg", children: [
                selectedExam.subject,
                " ",
                selectedExam.paper,
                " - ",
                selectedExam.level
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
                selectedExam.session,
                " ",
                selectedExam.year,
                " ",
                selectedExam.timezone && `• ${selectedExam.timezone}`
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleStartExam, className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4" }),
            "Start Exam"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-muted/50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: selectedExam.questionCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Questions" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-muted/50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: selectedExam.totalMarks }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Marks" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-muted/50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: selectedExam.paperType === "mcq" ? "MCQ" : "Essay" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Type" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-muted/50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: selectedExam.hasMarkScheme ? "✓" : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Mark Scheme" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-muted/50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: selectedExam.paper === "Paper 1" ? "1h" : selectedExam.paper === "Paper 2" ? "1h 15m" : "1h 15m" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Suggested Time" })
          ] })
        ] }) })
      ] })
    ] });
  }
  if (!selectedExam) return null;
  const currentQuestion = selectedExam.questions[currentQuestionIndex];
  const progress = completedQuestions.size / selectedExam.questions.length * 100;
  const isMCQ = currentQuestion.type === "mcq";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "sticky top-0 z-10 bg-background/95 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: handleResetExam, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 mr-1" }),
          "Exit"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          selectedExam.paperType === "mcq" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-4 w-4 text-blue-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "h-4 w-4 text-purple-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium text-sm", children: [
              selectedExam.subject,
              " ",
              selectedExam.paper,
              " - ",
              selectedExam.level
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              selectedExam.session,
              " ",
              selectedExam.year
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatTime(elapsedTime) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            completedQuestions.size,
            "/",
            selectedExam.questions.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "w-24 h-2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: handleFinishExam,
            className: "gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
              "Finish"
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: selectedExam.questions.map((q, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: currentQuestionIndex === idx ? "default" : completedQuestions.has(q.id) ? "secondary" : "outline",
        size: "sm",
        className: cn(
          "min-w-[40px] h-8",
          completedQuestions.has(q.id) && currentQuestionIndex !== idx && "bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
        ),
        onClick: () => setCurrentQuestionIndex(idx),
        children: idx + 1
      },
      q.id
    )) }) }) }),
    currentQuestion && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: isMCQ ? (
      // MCQ Question Card
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-3 w-3" }),
            "Question ",
            currentQuestionIndex + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "1 mark" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm dark:prose-invert max-w-none mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "whitespace-pre-wrap font-sans text-sm bg-muted/50 p-4 rounded-lg", children: currentQuestion.text }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            RadioGroup,
            {
              value: mcqAnswers[currentQuestion.id] || "",
              onValueChange: (value) => handleMCQAnswer(currentQuestion.id, value),
              className: "space-y-3",
              children: ["A", "B", "C", "D"].map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "flex items-center space-x-3 p-3 rounded-lg border transition-colors",
                    mcqAnswers[currentQuestion.id] === option ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: option, id: `q${currentQuestion.id}-${option}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: `q${currentQuestion.id}-${option}`,
                        className: "flex-1 cursor-pointer font-medium",
                        children: option
                      }
                    )
                  ]
                },
                option
              ))
            }
          )
        ] })
      ] })
    ) : (
      // Long Answer Question Card
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FullQuestionCard,
        {
          question: {
            id: currentQuestion.id,
            questionNumber: currentQuestion.questionNumber,
            context: currentQuestion.context,
            parts: currentQuestion.parts,
            totalMarks: currentQuestion.totalMarks,
            subject: selectedExam.subject,
            year: selectedExam.year,
            session: selectedExam.session,
            level: selectedExam.level,
            paper: selectedExam.paper,
            timezone: selectedExam.timezone,
            source: `${selectedExam.session} ${selectedExam.year}`,
            hasMarkScheme: currentQuestion.parts.some((p) => p.markScheme !== null)
          },
          onComplete: handleQuestionComplete,
          showSource: false
        }
      )
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: handlePrevQuestion,
          disabled: currentQuestionIndex === 0,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 mr-1" }),
            "Previous"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        "Question ",
        currentQuestionIndex + 1,
        " of ",
        selectedExam.questions.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleNextQuestion,
          disabled: currentQuestionIndex === selectedExam.questions.length - 1,
          children: [
            "Next",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1" })
          ]
        }
      )
    ] }),
    showResults && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-primary bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12 text-primary mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-1", children: "Exam Review" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Time spent: ",
          formatTime(elapsedTime)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-background rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-600", children: completedQuestions.size }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Answered" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-background rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-orange-600", children: selectedExam.questions.length - completedQuestions.size }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Unanswered" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-background rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: selectedExam.totalMarks }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Marks" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: handleResetExam, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4 mr-2" }),
          "Try Another Exam"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowResults(false), children: "Review Answers" })
      ] })
    ] }) })
  ] });
}

const SUBJECT_ICONS = {
  chemistry: Beaker,
  biology: Dna,
  physics: Zap,
  math_aa: Calculator,
  math_ai: Calculator,
  computer_science: Laptop,
  business_management: Building2,
  economics: TrendingUp,
  geography: Globe,
  history: BookOpen,
  psychology: Brain,
  design_technology: Palette
};
const SUBJECT_COLORS = {
  chemistry: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  biology: "bg-green-500/10 text-green-600 border-green-500/20",
  physics: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  math_aa: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  math_ai: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  computer_science: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  business_management: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  economics: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  geography: "bg-teal-500/10 text-teal-600 border-teal-500/20",
  history: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  psychology: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  design_technology: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20"
};
function PastPapers() {
  useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("browse");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedSubject, setSelectedSubject] = reactExports.useState("all");
  const [selectedYear, setSelectedYear] = reactExports.useState("all");
  const [selectedSession, setSelectedSession] = reactExports.useState("all");
  const [selectedLevel, setSelectedLevel] = reactExports.useState("all");
  const [selectedPaper, setSelectedPaper] = reactExports.useState(null);
  const [showMarkScheme, setShowMarkScheme] = reactExports.useState(false);
  const [papers, setPapers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [paperContent, setPaperContent] = reactExports.useState("");
  const [markSchemeContent, setMarkSchemeContent] = reactExports.useState("");
  const [loadingContent, setLoadingContent] = reactExports.useState(false);
  const [practiceSubject, setPracticeSubject] = reactExports.useState("Biology");
  const [practiceTopic, setPracticeTopic] = reactExports.useState("all");
  const [practiceYear, setPracticeYear] = reactExports.useState("all");
  const [practiceLevel, setPracticeLevel] = reactExports.useState("all");
  const [practiceShuffled, setPracticeShuffled] = reactExports.useState(false);
  const [practicePage, setPracticePage] = reactExports.useState(1);
  const QUESTIONS_PER_PAGE = 20;
  const [longAnswerSubject, setLongAnswerSubject] = reactExports.useState("Biology");
  const [longAnswerTopic, setLongAnswerTopic] = reactExports.useState("all");
  const [longAnswerYear, setLongAnswerYear] = reactExports.useState("all");
  const [longAnswerLevel, setLongAnswerLevel] = reactExports.useState("all");
  const [longAnswerShuffled, setLongAnswerShuffled] = reactExports.useState(false);
  const [longAnswerPage, setLongAnswerPage] = reactExports.useState(1);
  const LONG_ANSWER_PER_PAGE = 10;
  const practiceSubjects = reactExports.useMemo(() => getAllSubjects(), []);
  const subjectQuestions = reactExports.useMemo(() => {
    return paperQuestions.filter((q) => q.subject === practiceSubject);
  }, [practiceSubject]);
  const practiceTopics = reactExports.useMemo(() => {
    const topicSet = new Set(subjectQuestions.map((q) => q.topic));
    return Array.from(topicSet).sort();
  }, [subjectQuestions]);
  const practiceYears = reactExports.useMemo(() => {
    const yearSet = new Set(subjectQuestions.map((q) => q.year).filter((y) => y));
    return Array.from(yearSet).sort().reverse();
  }, [subjectQuestions]);
  const practiceLevels = reactExports.useMemo(() => {
    const levelSet = new Set(subjectQuestions.map((q) => q.level));
    return Array.from(levelSet).sort();
  }, [subjectQuestions]);
  const filteredPracticeQuestions = reactExports.useMemo(() => {
    let questions = [...subjectQuestions];
    if (practiceTopic !== "all") {
      questions = questions.filter((q) => q.topic === practiceTopic);
    }
    if (practiceYear !== "all") {
      questions = questions.filter((q) => q.year === practiceYear);
    }
    if (practiceLevel !== "all") {
      questions = questions.filter((q) => q.level === practiceLevel);
    }
    if (practiceShuffled) {
      questions = questions.sort(() => Math.random() - 0.5);
    }
    return questions;
  }, [subjectQuestions, practiceTopic, practiceYear, practiceLevel, practiceShuffled]);
  const practiceTotalPages = Math.ceil(filteredPracticeQuestions.length / QUESTIONS_PER_PAGE);
  const paginatedPracticeQuestions = reactExports.useMemo(() => {
    const start = (practicePage - 1) * QUESTIONS_PER_PAGE;
    return filteredPracticeQuestions.slice(start, start + QUESTIONS_PER_PAGE);
  }, [filteredPracticeQuestions, practicePage]);
  const practiceSubjectCounts = reactExports.useMemo(() => {
    const counts = {};
    for (const subject of practiceSubjects) {
      counts[subject] = paperQuestions.filter((q) => q.subject === subject).length;
    }
    return counts;
  }, [practiceSubjects]);
  const longAnswerSubjects = reactExports.useMemo(() => {
    return getAllFullQuestionSubjects();
  }, []);
  const subjectLongAnswerQuestions = reactExports.useMemo(() => {
    return fullQuestions.filter((q) => q.subject === longAnswerSubject);
  }, [longAnswerSubject]);
  const longAnswerTopics = reactExports.useMemo(() => {
    const topicSet = new Set(subjectLongAnswerQuestions.map((q) => q.paper));
    return Array.from(topicSet).sort();
  }, [subjectLongAnswerQuestions]);
  const longAnswerYears = reactExports.useMemo(() => {
    const yearSet = new Set(subjectLongAnswerQuestions.map((q) => q.year).filter((y) => y));
    return Array.from(yearSet).sort().reverse();
  }, [subjectLongAnswerQuestions]);
  const longAnswerLevels = reactExports.useMemo(() => {
    const levelSet = new Set(subjectLongAnswerQuestions.map((q) => q.level));
    return Array.from(levelSet).sort();
  }, [subjectLongAnswerQuestions]);
  const filteredLongAnswerQuestions = reactExports.useMemo(() => {
    let questions = [...subjectLongAnswerQuestions];
    if (longAnswerTopic !== "all") {
      questions = questions.filter((q) => q.paper === longAnswerTopic);
    }
    if (longAnswerYear !== "all") {
      questions = questions.filter((q) => q.year === longAnswerYear);
    }
    if (longAnswerLevel !== "all") {
      questions = questions.filter((q) => q.level === longAnswerLevel);
    }
    if (longAnswerShuffled) {
      questions = questions.sort(() => Math.random() - 0.5);
    }
    return questions;
  }, [subjectLongAnswerQuestions, longAnswerTopic, longAnswerYear, longAnswerLevel, longAnswerShuffled]);
  const longAnswerTotalPages = Math.ceil(filteredLongAnswerQuestions.length / LONG_ANSWER_PER_PAGE);
  const paginatedLongAnswerQuestions = reactExports.useMemo(() => {
    const start = (longAnswerPage - 1) * LONG_ANSWER_PER_PAGE;
    return filteredLongAnswerQuestions.slice(start, start + LONG_ANSWER_PER_PAGE);
  }, [filteredLongAnswerQuestions, longAnswerPage]);
  const longAnswerSubjectCounts = reactExports.useMemo(() => {
    const counts = {};
    for (const subject of longAnswerSubjects) {
      counts[subject] = fullQuestions.filter((q) => q.subject === subject).length;
    }
    return counts;
  }, [longAnswerSubjects]);
  reactExports.useEffect(() => {
    loadPapersIndex().then((index) => {
      setPapers(index.papers);
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);
  reactExports.useEffect(() => {
    if (selectedPaper) {
      setLoadingContent(true);
      setPaperContent("");
      setMarkSchemeContent("");
      loadPaperContent(selectedPaper.filepath).then((content) => {
        setPaperContent(content);
        setLoadingContent(false);
      }).catch((err) => {
        console.error("Error loading paper content:", err);
        setPaperContent("Failed to load paper content");
        setLoadingContent(false);
      });
      if (selectedPaper.markSchemeFile) {
        loadMarkScheme(selectedPaper.markSchemeFile).then((content) => {
          setMarkSchemeContent(content);
        }).catch((err) => {
          console.error("Error loading mark scheme:", err);
          setMarkSchemeContent("Failed to load mark scheme");
        });
      }
    }
  }, [selectedPaper]);
  const availableYears = reactExports.useMemo(() => {
    const years = new Set(papers.map((p) => p.year));
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [papers]);
  const availableSubjects = reactExports.useMemo(() => {
    const subjects = new Set(papers.map((p) => p.subject));
    return Array.from(subjects).sort();
  }, [papers]);
  const filteredPapers = reactExports.useMemo(() => {
    let filtered = papers;
    if (selectedSubject !== "all") {
      filtered = filtered.filter((p) => p.subject === selectedSubject);
    }
    if (selectedYear !== "all") {
      filtered = filtered.filter((p) => p.year === selectedYear);
    }
    if (selectedSession !== "all") {
      filtered = filtered.filter((p) => p.session === selectedSession);
    }
    if (selectedLevel !== "all") {
      filtered = filtered.filter((p) => p.level === selectedLevel);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) => p.subject.toLowerCase().includes(query) || p.title.toLowerCase().includes(query) || p.filepath.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [papers, selectedSubject, selectedYear, selectedSession, selectedLevel, searchQuery]);
  const groupedPapers = reactExports.useMemo(() => {
    const grouped = {};
    filteredPapers.forEach((paper) => {
      const yearKey = paper.year.toString();
      const sessionKey = paper.session;
      if (!grouped[yearKey]) {
        grouped[yearKey] = {};
      }
      if (!grouped[yearKey][sessionKey]) {
        grouped[yearKey][sessionKey] = [];
      }
      grouped[yearKey][sessionKey].push(paper);
    });
    return grouped;
  }, [filteredPapers]);
  const clearFilters = () => {
    setSelectedSubject("all");
    setSelectedYear("all");
    setSelectedSession("all");
    setSelectedLevel("all");
    setSearchQuery("");
  };
  const hasActiveFilters = selectedSubject !== "all" || selectedYear !== "all" || selectedSession !== "all" || selectedLevel !== "all" || searchQuery !== "";
  const stats = reactExports.useMemo(() => {
    const subjects = new Set(papers.map((p) => p.subject));
    const withMarkSchemes = papers.filter((p) => p.markSchemeFile !== null).length;
    return {
      totalPapers: papers.length,
      totalSubjects: subjects.size,
      withMarkSchemes
    };
  }, [papers]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin mx-auto mb-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading papers..." })
    ] }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-destructive", children: "Error Loading Papers" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => window.location.reload(), className: "mt-4", children: "Retry" })
      ] })
    ] }) });
  }
  const SubjectIcon = ({ subject }) => {
    const Icon = SUBJECT_ICONS[subject] || FileText;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "IB Past Papers" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Browse, search, and practice with official IB examination papers and mark schemes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-primary", children: stats.totalPapers.toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Papers" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-primary", children: paperQuestions.length.toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "MCQ" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-primary", children: fullQuestions.length.toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Long Answer" })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: (v) => setActiveTab(v), className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full max-w-3xl grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "browse", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
          "Browse Papers"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "questions", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          "MCQ Practice"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "longanswer", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "h-4 w-4" }),
          "Long Answer"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "fullexam", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
          "Full Exam"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "browse", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "h-4 w-4" }),
              "Filters"
            ] }),
            hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: clearFilters, className: "text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-1" }),
              "Clear all"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative lg:col-span-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search papers...",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  className: "pl-9"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedSubject, onValueChange: setSelectedSubject, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Subjects" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Subjects" }),
                availableSubjects.map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: subject, children: subject }, subject))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedYear, onValueChange: setSelectedYear, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Years" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Years" }),
                availableYears.map((year) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: year.toString(), children: year }, year))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedSession, onValueChange: setSelectedSession, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Sessions" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Sessions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "May", children: "May Session" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "November", children: "November Session" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedLevel, onValueChange: setSelectedLevel, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Levels" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Levels" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "HL", children: "Higher Level (HL)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "SL", children: "Standard Level (SL)" })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Showing ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: filteredPapers.length }),
          " papers",
          hasActiveFilters && " (filtered)"
        ] }) }),
        filteredPapers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-12 w-12 mx-auto text-muted-foreground/50 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-2", children: "No papers found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Try adjusting your filters or search query" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: clearFilters, children: "Clear Filters" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: Object.entries(groupedPapers).sort(([a], [b]) => parseInt(b) - parseInt(a)).map(([year, sessions]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-primary" }),
            year,
            " Examination Session"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "multiple", className: "space-y-2", children: Object.entries(sessions).map(([session, papers2]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `${year}-${session}`, className: "border rounded-lg px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "hover:no-underline py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                session,
                " ",
                year
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ml-2", children: [
                papers2.length,
                " papers"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "pt-2 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: papers2.map((paper) => {
              const colorClass = SUBJECT_COLORS[paper.subject] || "bg-gray-500/10 text-gray-600 border-gray-500/20";
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                Card,
                {
                  className: cn(
                    "cursor-pointer hover:shadow-md transition-all border-2",
                    "hover:border-primary/30"
                  ),
                  onClick: () => setSelectedPaper(paper),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-2 rounded-lg", colorClass), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubjectIcon, { subject: paper.subject }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: paper.level }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: paper.timezone })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-sm mb-1", children: paper.subject }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Paper ",
                      paper.paperNumber
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "h-7 text-xs gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
                        "View"
                      ] }),
                      paper.markSchemeFile && /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                          "MS"
                        ] }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Mark Scheme Available" })
                      ] })
                    ] })
                  ] })
                },
                paper.id
              );
            }) }) })
          ] }, session)) }) })
        ] }, year)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "questions", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "h-5 w-5 text-primary" }),
              "Practice Questions"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
              paperQuestions.length.toLocaleString(),
              " extracted Paper 1 questions across ",
              practiceSubjects.length,
              " subjects"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: practiceSubjects.filter((s) => practiceSubjectCounts[s] > 50).sort((a, b) => practiceSubjectCounts[b] - practiceSubjectCounts[a]).slice(0, 6).map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: practiceSubject === subject ? "default" : "outline",
                size: "sm",
                onClick: () => {
                  setPracticeSubject(subject);
                  setPracticeTopic("all");
                  setPracticeYear("all");
                  setPracticeLevel("all");
                  setPracticePage(1);
                },
                className: "gap-1.5",
                children: [
                  subject === "Chemistry" && /* @__PURE__ */ jsxRuntimeExports.jsx(Beaker, { className: "h-4 w-4" }),
                  subject === "Biology" && /* @__PURE__ */ jsxRuntimeExports.jsx(Dna, { className: "h-4 w-4" }),
                  subject === "Physics" && /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
                  subject === "English" && /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
                  subject === "ESS" && /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-4 w-4" }),
                  subject === "SEHS" && /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: subject }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-1 text-xs", children: practiceSubjectCounts[subject] })
                ]
              },
              subject
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 p-4 bg-muted/30 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Filter:" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: practiceTopic,
                  onValueChange: (v) => {
                    setPracticeTopic(v);
                    setPracticePage(1);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Topics" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Topics" }),
                      practiceTopics.map((topic) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: topic, children: topic }, topic))
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: practiceYear,
                  onValueChange: (v) => {
                    setPracticeYear(v);
                    setPracticePage(1);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[120px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Years" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Years" }),
                      practiceYears.map((year) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: year, children: year }, year))
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: practiceLevel,
                  onValueChange: (v) => {
                    setPracticeLevel(v);
                    setPracticePage(1);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[100px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Level" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Levels" }),
                      practiceLevels.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: level, children: level }, level))
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: practiceShuffled ? "default" : "outline",
                  size: "sm",
                  onClick: () => {
                    setPracticeShuffled(!practiceShuffled);
                    setPracticePage(1);
                  },
                  className: "gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shuffle, { className: "w-4 h-4" }),
                    "Shuffle"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-4 my-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-sm", children: [
                filteredPracticeQuestions.length.toLocaleString(),
                " questions"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-sm", children: [
                practiceTopics.length,
                " topics"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-sm", children: [
                practiceYears.length,
                " years"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: paginatedPracticeQuestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No questions found with current filters." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "link",
              onClick: () => {
                setPracticeTopic("all");
                setPracticeYear("all");
                setPracticeLevel("all");
              },
              children: "Clear filters"
            }
          )
        ] }) : paginatedPracticeQuestions.map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          QuestionCard,
          {
            question
          },
          `${question.id}-${index}`
        )) }),
        practiceTotalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setPracticePage((p) => Math.max(1, p - 1)),
              disabled: practicePage === 1,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                "Previous"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            "Page ",
            practicePage,
            " of ",
            practiceTotalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setPracticePage((p) => Math.min(practiceTotalPages, p + 1)),
              disabled: practicePage === practiceTotalPages,
              children: [
                "Next",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "longanswer", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "h-5 w-5 text-primary" }),
              "Long Answer Questions"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
              fullQuestions.length.toLocaleString(),
              " full Paper 2/3 questions with context across ",
              longAnswerSubjects.length,
              " subjects"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: longAnswerSubjects.filter((s) => longAnswerSubjectCounts[s] > 10).sort((a, b) => longAnswerSubjectCounts[b] - longAnswerSubjectCounts[a]).slice(0, 8).map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: longAnswerSubject === subject ? "default" : "outline",
                size: "sm",
                onClick: () => {
                  setLongAnswerSubject(subject);
                  setLongAnswerTopic("all");
                  setLongAnswerYear("all");
                  setLongAnswerLevel("all");
                  setLongAnswerPage(1);
                },
                className: "gap-1.5",
                children: [
                  subject === "Chemistry" && /* @__PURE__ */ jsxRuntimeExports.jsx(Beaker, { className: "h-4 w-4" }),
                  subject === "Biology" && /* @__PURE__ */ jsxRuntimeExports.jsx(Dna, { className: "h-4 w-4" }),
                  subject === "Physics" && /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
                  subject === "English" && /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
                  subject === "ESS" && /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-4 w-4" }),
                  subject === "Mathematics" && /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "h-4 w-4" }),
                  subject === "History" && /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
                  subject === "Computer Science" && /* @__PURE__ */ jsxRuntimeExports.jsx(Laptop, { className: "h-4 w-4" }),
                  subject === "Economics" && /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
                  subject === "Business Management" && /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4" }),
                  subject === "Geography" && /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }),
                  subject === "Psychology" && /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: subject }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-1 text-xs", children: longAnswerSubjectCounts[subject].toLocaleString() })
                ]
              },
              subject
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 p-4 bg-muted/30 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Filter:" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: longAnswerTopic,
                  onValueChange: (v) => {
                    setLongAnswerTopic(v);
                    setLongAnswerPage(1);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Papers" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Papers" }),
                      longAnswerTopics.map((topic) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: topic, children: topic }, topic))
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: longAnswerYear,
                  onValueChange: (v) => {
                    setLongAnswerYear(v);
                    setLongAnswerPage(1);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[120px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Years" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Years" }),
                      longAnswerYears.map((year) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: year, children: year }, year))
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: longAnswerLevel,
                  onValueChange: (v) => {
                    setLongAnswerLevel(v);
                    setLongAnswerPage(1);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[100px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Level" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Levels" }),
                      longAnswerLevels.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: level, children: level }, level))
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: longAnswerShuffled ? "default" : "outline",
                  size: "sm",
                  onClick: () => {
                    setLongAnswerShuffled(!longAnswerShuffled);
                    setLongAnswerPage(1);
                  },
                  className: "gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shuffle, { className: "w-4 h-4" }),
                    "Shuffle"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-4 my-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-sm", children: [
                filteredLongAnswerQuestions.length.toLocaleString(),
                " questions"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-sm", children: [
                longAnswerTopics.length,
                " papers"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-sm", children: [
                longAnswerYears.length,
                " years"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: paginatedLongAnswerQuestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No questions found with current filters." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "link",
              onClick: () => {
                setLongAnswerTopic("all");
                setLongAnswerYear("all");
                setLongAnswerLevel("all");
              },
              children: "Clear filters"
            }
          )
        ] }) : paginatedLongAnswerQuestions.map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          FullQuestionCard,
          {
            question
          },
          `${question.id}-${index}`
        )) }),
        longAnswerTotalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setLongAnswerPage((p) => Math.max(1, p - 1)),
              disabled: longAnswerPage === 1,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                "Previous"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            "Page ",
            longAnswerPage,
            " of ",
            longAnswerTotalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setLongAnswerPage((p) => Math.min(longAnswerTotalPages, p + 1)),
              disabled: longAnswerPage === longAnswerTotalPages,
              children: [
                "Next",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "fullexam", className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExamPractice, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedPaper, onOpenChange: (open) => !open && setSelectedPaper(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-4xl max-h-[90vh]", children: selectedPaper && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-2 rounded-lg", SUBJECT_COLORS[selectedPaper.subject.toLowerCase()] || "bg-gray-500/10"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubjectIcon, { subject: selectedPaper.subject.toLowerCase() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: selectedPaper.subject }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-normal text-muted-foreground", children: [
            "Paper ",
            selectedPaper.paperNumber,
            " • ",
            selectedPaper.session,
            " ",
            selectedPaper.year,
            " • ",
            selectedPaper.timezone,
            " ",
            selectedPaper.level
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: !showMarkScheme ? "default" : "outline",
              onClick: () => setShowMarkScheme(false),
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
                "Question Paper"
              ]
            }
          ),
          selectedPaper.markSchemeFile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: showMarkScheme ? "default" : "outline",
              onClick: () => setShowMarkScheme(true),
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
                "Mark Scheme"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[500px] border rounded-lg p-4 bg-muted/20", children: loadingContent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin mx-auto mb-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading content..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          PaperContentViewer,
          {
            content: showMarkScheme ? markSchemeContent : paperContent,
            isMarkScheme: showMarkScheme
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
              selectedPaper.session,
              " ",
              selectedPaper.year
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: selectedPaper.level }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: selectedPaper.timezone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "gap-2",
                onClick: () => {
                  const blob = new Blob([showMarkScheme ? markSchemeContent : paperContent], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = selectedPaper.filepath.split("/").pop() || "paper.txt";
                  a.click();
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                  "Download"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", onClick: () => setSelectedPaper(null), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }),
              "Close"
            ] })
          ] })
        ] })
      ] })
    ] }) }) })
  ] }) });
}

export { PastPapers as default };
