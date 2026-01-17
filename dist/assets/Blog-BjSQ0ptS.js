import { c_ as useQuery, j as jsxRuntimeExports, az as Sparkles, al as BookOpen, aw as Lightbulb, av as GraduationCap, dJ as Library, aM as Calendar, aK as Clock } from './vendor-react-BeQHm2Hb.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-BTaNjRSt.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { S as Skeleton } from './skeleton-4z5lkfNh.js';
import { s as supabase } from './index-C9tyh6tO.js';
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

function Blog() {
  const navigate = useNavigate();
  const { data: dynamicBlogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blogs").select("id, slug, title, description, category, created_at, published_at, content").eq("status", "published").order("published_at", { ascending: false }).limit(20);
      if (error) throw error;
      return data;
    }
  });
  const featuredSections = [
    {
      title: "How to Write an Essay",
      description: "Step-by-step essay writing guide",
      icon: BookOpen,
      path: "/homepage/blog/essay-guide"
    },
    {
      title: "IA Experience",
      description: "Internal Assessment tips and insights",
      icon: Lightbulb,
      path: "/homepage/blog/ia-experience"
    },
    {
      title: "Exam Resources",
      description: "Study materials and exam preparation",
      icon: GraduationCap,
      path: "/homepage/blog/exam-resources"
    },
    {
      title: "Educational Systems",
      description: "Understanding different curricula",
      icon: Library,
      path: "/homepage/blog/educational-systems"
    }
  ];
  const getReadingTime = (content) => {
    return Math.ceil(content.split(/\s+/).length / 200);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-background to-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/homepage" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent", children: "Blog & Resources" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Guides, tips, and educational resources for IB students" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-primary" }),
        "Featured Guides"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-6", children: featuredSections.map((section) => {
        const Icon = section.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] border-2 border-primary/20",
            onClick: () => navigate(section.path),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: section.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: section.description })
              ] })
            ] }) })
          },
          section.path
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6 text-primary" }),
        "Latest Articles"
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-full mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
      ] }) }, i)) }) : dynamicBlogs && dynamicBlogs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: dynamicBlogs.map((blog) => {
        const publishedDate = new Date(blog.published_at || blog.created_at);
        const readingTime = getReadingTime(blog.content);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col",
            onClick: () => navigate(`/homepage/blog/${blog.slug}`),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: blog.category }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "line-clamp-2 text-lg", children: blog.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "line-clamp-2", children: blog.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
                  publishedDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                  readingTime,
                  " min"
                ] })
              ] }) })
            ]
          },
          blog.id
        );
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No articles yet. Check back soon!" })
      ] })
    ] })
  ] }) }) });
}

export { Blog as default };
