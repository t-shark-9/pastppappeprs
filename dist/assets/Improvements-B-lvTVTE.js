import { r as reactExports, j as jsxRuntimeExports, ca as ArrowUp, aC as Trash2, bl as Send } from './vendor-react-BeQHm2Hb.js';
import { o as useToast, u as useAuth, s as supabase, B as Button } from './index-C9tyh6tO.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from './card-BTaNjRSt.js';
import { I as Input } from './input-2hnN3JAu.js';
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

function Improvements() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [improvements, setImprovements] = reactExports.useState([]);
  const [newSuggestion, setNewSuggestion] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [currentUserId, setCurrentUserId] = reactExports.useState(null);
  const isAdmin = user?.email === "mail@tjark-osterloh.de";
  reactExports.useEffect(() => {
    loadImprovements();
    getCurrentUser();
  }, []);
  const getCurrentUser = async () => {
    const { data: { user: user2 } } = await supabase.auth.getUser();
    setCurrentUserId(user2?.id || null);
  };
  const loadImprovements = async () => {
    setIsLoading(true);
    const { data: { user: user2 } } = await supabase.auth.getUser();
    const { data: improvementsData, error: improvementsError } = await supabase.from("improvements").select("*").order("created_at", { ascending: false });
    if (improvementsError) {
      console.error("Error loading improvements:", improvementsError);
      setIsLoading(false);
      return;
    }
    const { data: votesData, error: votesError } = await supabase.from("improvement_votes").select("improvement_id, user_id");
    if (votesError) {
      console.error("Error loading votes:", votesError);
    }
    const improvementsWithVotes = improvementsData?.map((improvement) => {
      const votes = votesData?.filter((v) => v.improvement_id === improvement.id) || [];
      return {
        ...improvement,
        vote_count: votes.length,
        user_voted: user2 ? votes.some((v) => v.user_id === user2.id) : false
      };
    }).sort((a, b) => b.vote_count - a.vote_count) || [];
    setImprovements(improvementsWithVotes);
    setIsLoading(false);
  };
  const handleVote = async (improvementId, currentlyVoted) => {
    const { data: { user: user2 } } = await supabase.auth.getUser();
    if (!user2) {
      toast({
        title: "Authentication required",
        description: "Please sign in to vote on improvements.",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }
    if (currentlyVoted) {
      const { error } = await supabase.from("improvement_votes").delete().eq("improvement_id", improvementId).eq("user_id", user2.id);
      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove vote. Please try again.",
          variant: "destructive"
        });
        return;
      }
    } else {
      const { error } = await supabase.from("improvement_votes").insert({
        improvement_id: improvementId,
        user_id: user2.id
      });
      if (error) {
        toast({
          title: "Error",
          description: "Failed to vote. Please try again.",
          variant: "destructive"
        });
        return;
      }
    }
    loadImprovements();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newSuggestion.trim()) return;
    const { data: { user: user2 } } = await supabase.auth.getUser();
    if (!user2) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit suggestions.",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.from("improvements").insert({
      title: newSuggestion.trim(),
      user_id: user2.id
    });
    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit suggestion. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    window.gtag?.("event", "submit_improvement", {
      user_id: user2.id
    });
    toast({
      title: "Success",
      description: "Your suggestion has been submitted!"
    });
    setNewSuggestion("");
    setIsSubmitting(false);
    loadImprovements();
  };
  const handleDelete = async (improvementId) => {
    if (!isAdmin) return;
    const { error } = await supabase.from("improvements").delete().eq("id", improvementId);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete improvement. Please try again.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Success",
      description: "Improvement deleted successfully."
    });
    loadImprovements();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-6 py-16 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BackButton,
        {
          fallbackPath: "/",
          size: "icon",
          tooltip: "Back to Home"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: "Feature Improvements" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-8 text-center text-muted-foreground", children: "Loading suggestions..." }) }) : improvements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-8 text-center text-muted-foreground", children: "No suggestions yet. Be the first to add one!" }) }) : improvements.map((improvement) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft hover:shadow-medium transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: improvement.user_voted ? "default" : "outline",
          size: "sm",
          onClick: () => handleVote(improvement.id, improvement.user_voted),
          className: "flex flex-col items-center gap-1 h-auto py-2 px-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: improvement.vote_count })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: improvement.title }),
        improvement.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: improvement.description })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => handleDelete(improvement.id),
          className: "text-destructive hover:text-destructive",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
        }
      )
    ] }) }) }, improvement.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-medium sticky bottom-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "text",
          placeholder: "Suggest a new improvement...",
          value: newSuggestion,
          onChange: (e) => setNewSuggestion(e.target.value),
          disabled: isSubmitting,
          className: "flex-1"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: isSubmitting || !newSuggestion.trim(),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
        }
      )
    ] }) }) })
  ] }) });
}

export { Improvements as default };
