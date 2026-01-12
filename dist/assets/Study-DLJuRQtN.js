import { r as reactExports, j as jsxRuntimeExports, $ as LoaderCircle, aG as Brain, aA as CircleCheck, az as Sparkles, bI as RotateCcw, c5 as CircleX, a2 as ChevronRight } from './vendor-react-BeQHm2Hb.js';
import { u as useNavigate, d as useSearchParams } from './vendor-react-router-D-UwvF_4.js';
import { u as useAuth, s as supabase, B as Button } from './index-C9tyh6tO.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { C as Card, d as CardContent } from './card-BTaNjRSt.js';
import { P as Progress } from './progress-BjrBDcIN.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-DtVQdYEt.js';
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

function calculateSM2(card, quality) {
  let { interval, repetitions, ease_factor } = card;
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease_factor);
    }
    repetitions += 1;
  }
  ease_factor = Math.max(
    1.3,
    ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );
  const nextReview = /* @__PURE__ */ new Date();
  nextReview.setDate(nextReview.getDate() + interval);
  return {
    interval,
    repetitions,
    ease_factor: parseFloat(ease_factor.toFixed(2)),
    next_review_date: nextReview.toISOString()
  };
}
function Study() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = reactExports.useState(true);
  const [decks, setDecks] = reactExports.useState([]);
  const [selectedDeckId, setSelectedDeckId] = reactExports.useState(searchParams.get("deck"));
  const [cards, setCards] = reactExports.useState([]);
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [isFlipped, setIsFlipped] = reactExports.useState(false);
  const [studyComplete, setStudyComplete] = reactExports.useState(false);
  const [stats, setStats] = reactExports.useState({ correct: 0, incorrect: 0, total: 0 });
  reactExports.useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    loadDecks();
  }, [user, navigate]);
  const loadDecks = async () => {
    try {
      const { data, error } = await supabase.from("flashcard_decks").select("id, title").eq("user_id", user?.id).order("created_at", { ascending: false });
      if (error) throw error;
      setDecks(data || []);
      const deckFromUrl = searchParams.get("deck");
      if (deckFromUrl && data?.some((d) => d.id === deckFromUrl)) {
        setSelectedDeckId(deckFromUrl);
      } else if (data && data.length > 0 && !selectedDeckId) {
        setSelectedDeckId(data[0].id);
      }
    } catch (error) {
      console.error("Failed to load decks:", error);
      ue.error("Failed to load decks");
    } finally {
      setLoading(false);
    }
  };
  const loadDueCards = reactExports.useCallback(async () => {
    if (!selectedDeckId) return;
    try {
      const { data, error } = await supabase.from("flashcards").select("*").eq("deck_id", selectedDeckId).lte("next_review_date", (/* @__PURE__ */ new Date()).toISOString()).order("next_review_date", { ascending: true });
      if (error) throw error;
      const shuffled = (data || []).sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setCurrentIndex(0);
      setIsFlipped(false);
      setStudyComplete(shuffled.length === 0);
      setStats({ correct: 0, incorrect: 0, total: shuffled.length });
    } catch (error) {
      console.error("Failed to load cards:", error);
      ue.error("Failed to load flashcards");
    }
  }, [selectedDeckId]);
  reactExports.useEffect(() => {
    if (selectedDeckId) {
      loadDueCards();
    }
  }, [loadDueCards, selectedDeckId]);
  const handleAnswer = async (quality) => {
    if (currentIndex >= cards.length) return;
    const currentCard2 = cards[currentIndex];
    const updates = calculateSM2(currentCard2, quality);
    try {
      await supabase.from("flashcards").update({
        ...updates,
        last_review_date: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", currentCard2.id);
      await supabase.from("flashcard_reviews").insert({
        flashcard_id: currentCard2.id,
        user_id: user?.id,
        quality
      });
      if (quality >= 3) {
        setStats((prev) => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        setStats((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
      }
      if (currentIndex + 1 >= cards.length) {
        setStudyComplete(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setIsFlipped(false);
      }
    } catch (error) {
      console.error("Failed to update card:", error);
      ue.error("Failed to save progress");
    }
  };
  const resetStudy = () => {
    loadDueCards();
  };
  const currentCard = cards[currentIndex];
  const progress = cards.length > 0 ? currentIndex / cards.length * 100 : 0;
  const selectedDeck = decks.find((d) => d.id === selectedDeckId);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border bg-card/50 backdrop-blur-sm shrink-0 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BackButton,
          {
            fallbackPath: "/notes",
            size: "sm",
            label: "Back to Notes",
            className: "gap-2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "Study Mode" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedDeckId || "", onValueChange: setSelectedDeckId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a deck..." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: decks.map((deck) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: deck.id, children: deck.title }, deck.id)) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-2xl", children: !selectedDeckId ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-2", children: "No Deck Selected" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Select a deck to start studying" })
    ] }) : studyComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-12 text-center", children: stats.total === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-16 w-16 mx-auto mb-4 text-success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-2", children: "All Caught Up!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-6", children: [
        "No cards are due for review in ",
        selectedDeck?.title || "this deck",
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BackButton,
        {
          fallbackPath: "/notes",
          label: "Back to Notes",
          className: "gap-2"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-16 w-16 mx-auto mb-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-2", children: "Study Session Complete!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-8 my-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-success", children: stats.correct }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Correct" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-destructive", children: stats.incorrect }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Needs Review" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-primary", children: stats.total }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Total" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: resetStudy, className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
          "Study Again"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BackButton,
          {
            fallbackPath: "/notes",
            label: "Back to Notes",
            className: "gap-2"
          }
        )
      ] })
    ] }) }) : currentCard ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Card ",
            currentIndex + 1,
            " of ",
            cards.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            Math.round(progress),
            "% complete"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "perspective-1000 cursor-pointer",
          onClick: () => setIsFlipped(!isFlipped),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: `relative min-h-[300px] transition-all duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`,
              style: {
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  CardContent,
                  {
                    className: "absolute inset-0 p-8 flex flex-col items-center justify-center backface-hidden",
                    style: { backfaceVisibility: "hidden" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-4", children: "Question" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-center font-medium", children: currentCard.front }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 text-xs text-muted-foreground", children: "Click to reveal answer" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  CardContent,
                  {
                    className: "absolute inset-0 p-8 flex flex-col items-center justify-center bg-primary/5",
                    style: {
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-4", children: "Answer" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-center", children: currentCard.back })
                    ]
                  }
                )
              ]
            }
          )
        }
      ),
      isFlipped && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "flex-col h-auto py-4 border-destructive/50 hover:bg-destructive/10 hover:border-destructive",
            onClick: () => handleAnswer(0),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-5 w-5 mb-1 text-destructive" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: "Again" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "1 min" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "flex-col h-auto py-4 border-orange-500/50 hover:bg-orange-500/10 hover:border-orange-500",
            onClick: () => handleAnswer(2),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 mb-1 text-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: "Hard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "1 day" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "flex-col h-auto py-4 border-primary/50 hover:bg-primary/10 hover:border-primary",
            onClick: () => handleAnswer(3),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 mb-1 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: "Good" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                currentCard.interval || 1,
                " days"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "flex-col h-auto py-4 border-success/50 hover:bg-success/10 hover:border-success",
            onClick: () => handleAnswer(5),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 mb-1 text-success" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: "Easy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                Math.round((currentCard.interval || 1) * 1.5),
                " days"
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-muted-foreground", children: [
        "Press ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-1.5 py-0.5 bg-muted rounded", children: "Space" }),
        " to flip •",
        /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-1.5 py-0.5 bg-muted rounded ml-1", children: "1-4" }),
        " to answer"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin mx-auto text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Loading cards..." })
    ] }) }) })
  ] });
}

export { Study as default };
