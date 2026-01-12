import { r as reactExports, j as jsxRuntimeExports, cg as Root, ch as Track, ci as Range, cj as Thumb, az as Sparkles, ck as Pause, cl as Play, bI as RotateCcw } from './vendor-react-BeQHm2Hb.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { i as cn, B as Button } from './index-C9tyh6tO.js';
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from './card-BTaNjRSt.js';
import { T as Textarea } from './textarea-1gnjGx7F.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { u as useSEO } from './use-seo-B_kpg7C4.js';
import { a as useLocation } from './vendor-react-router-D-UwvF_4.js';
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

const Slider = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Root,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Track, { className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = Root.displayName;

function SpeedReader() {
  useSEO("speedReader");
  const location = useLocation();
  const [text, setText] = reactExports.useState("");
  const [words, setWords] = reactExports.useState([]);
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [speed, setSpeed] = reactExports.useState(500);
  const intervalRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (location.state?.text) {
      setText(location.state.text);
    }
  }, [location.state]);
  const interval = 60 / speed * 1e3;
  reactExports.useEffect(() => {
    if (text.trim()) {
      const wordArray = text.split(/\s+/).filter((word) => word.length > 0);
      setWords(wordArray);
      setCurrentIndex(0);
    } else {
      setWords([]);
      setCurrentIndex(0);
    }
  }, [text]);
  reactExports.useEffect(() => {
    if (isPlaying && words.length > 0) {
      if (currentIndex >= words.length) {
        setIsPlaying(false);
        return;
      }
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= words.length) {
            setIsPlaying(false);
            return prev;
          }
          return next;
        });
      }, interval);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isPlaying, words.length, interval, currentIndex]);
  const togglePlay = reactExports.useCallback(() => {
    if (words.length === 0) return;
    if (currentIndex >= words.length) {
      setCurrentIndex(0);
    }
    setIsPlaying(!isPlaying);
  }, [words.length, currentIndex, isPlaying]);
  const reset = reactExports.useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);
  const loadSample = reactExports.useCallback(() => {
    const sampleText = `Speed reading is a collection of reading methods which attempt to increase rates of reading without greatly reducing comprehension or retention. Methods include chunking and eliminating subvocalization. The many available speed-reading training programs include books, videos, software, and seminars.

There is little scientific evidence regarding speed reading, and as a result its value is contested. Cognitive neuroscientist Stanislas Dehaene says that claims of reading speeds of above 500 words per minute "must be viewed with skepticism" and that above 300 wpm people must start to use things like skimming or scanning which do not qualify as reading.

The average adult reads prose text at 250 to 300 words per minute. While proofreaders tasked with detecting errors read more slowly at 200 wpm. Higher reading speeds are claimed through speed reading programs.

This speed reading application helps you practice the technique of presenting one word at a time in a fixed position, allowing your eyes to stay focused while your brain processes each word individually. This method can help reduce subvocalization and improve reading efficiency for certain types of content.`;
    setText(sampleText);
  }, []);
  const progress = words.length > 0 ? (currentIndex + 1) / words.length * 100 : 0;
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "Escape") {
        e.preventDefault();
        reset();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, reset]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto px-6 py-16 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BackButton,
        {
          fallbackPath: "/",
          size: "icon",
          tooltip: "Back to Home"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold", children: "Speed Reader" }),
          location.state?.source && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-sm", children: location.state.source })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Read faster by focusing on one word at a time" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-medium border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-primary" }),
        "What is Speed Reading?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: 'Speed reading is a technique that presents one word at a time in a fixed position, allowing your eyes to stay focused while your brain processes each word individually. This method helps reduce subvocalization (internally "saying" words) and can significantly improve reading efficiency. The average person reads at 250-300 words per minute, but with practice, you can increase this to 400-600 WPM while maintaining comprehension.' })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Enter Your Text" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Paste or type your text here...",
            value: text,
            onChange: (e) => setText(e.target.value),
            rows: 8,
            className: "resize-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: loadSample, variant: "outline", size: "sm", children: "Load Sample Text" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[200px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-lg border-2 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center px-6", children: words.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-medium text-muted-foreground italic", children: "Enter some text to begin..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-6xl md:text-7xl font-bold text-foreground animate-in fade-in zoom-in duration-200", children: words[currentIndex] || "Ready to start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg text-muted-foreground", children: [
          "Word ",
          currentIndex + 1,
          " of ",
          words.length
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full bg-primary transition-all duration-300 ease-out",
          style: { width: `${progress}%` }
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Reading Speed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-primary", children: [
            speed,
            " WPM"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Slider,
          {
            value: [speed],
            onValueChange: (value) => setSpeed(value[0]),
            min: 100,
            max: 1e3,
            step: 50,
            className: "w-full"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Slow (100 WPM)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Fast (1000 WPM)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: togglePlay,
            disabled: words.length === 0,
            size: "lg",
            className: "min-w-[140px]",
            children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "mr-2 h-5 w-5" }),
              "Pause"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "mr-2 h-5 w-5" }),
              currentIndex >= words.length ? "Replay" : "Start"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: reset,
            variant: "outline",
            size: "lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "mr-2 h-4 w-4" }),
              "Reset"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-2 py-1 bg-muted rounded border text-xs font-mono", children: "Space" }),
        " to play/pause",
        " • ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-2 py-1 bg-muted rounded border text-xs font-mono", children: "Esc" }),
        " to reset"
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Speed Reading Tips" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Stay Centered:" }),
            " Focus your eyes on the center of the display area"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Avoid Subvocalization:" }),
            ' Try not to "say" the words in your head'
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Start Slow:" }),
            " Begin with comfortable speeds (250-300 WPM) and gradually increase"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Practice Regularly:" }),
            " Consistent practice helps improve reading efficiency"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Test Comprehension:" }),
            " After reading, test your understanding of the content"
          ] })
        ] })
      ] }) })
    ] })
  ] }) });
}

export { SpeedReader as default };
