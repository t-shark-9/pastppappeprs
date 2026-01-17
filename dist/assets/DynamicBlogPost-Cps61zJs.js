import { c_ as useQuery, j as jsxRuntimeExports, aR as ArrowLeft, aM as Calendar, aK as Clock, d0 as Markdown, dK as Tag } from './vendor-react-BeQHm2Hb.js';
import { B as Button, s as supabase } from './index-C9tyh6tO.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { A as ArticleWrapper } from './ArticleWrapper-YJLbhrQd.js';
import { S as Skeleton } from './skeleton-4z5lkfNh.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { c as useParams, u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
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

function DynamicBlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const { data, error: error2 } = await supabase.from("blogs").select("*").eq("slug", slug).eq("status", "published").single();
      if (error2) throw error2;
      supabase.from("blogs").update({ view_count: (data.view_count || 0) + 1 }).eq("id", data.id).then(() => {
      });
      return data;
    },
    enabled: !!slug
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-3/4 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-1/2 mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
      ] })
    ] }) });
  }
  if (error || !blog) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-4", children: "Blog Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "The blog post you're looking for doesn't exist or has been removed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => navigate("/homepage/blog"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        "Back to Blog"
      ] })
    ] }) });
  }
  const publishedDate = new Date(blog.published_at || blog.created_at);
  const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ArticleWrapper,
    {
      title: blog.title,
      description: blog.description,
      datePublished: blog.published_at || blog.created_at,
      category: blog.category,
      keywords: blog.keywords,
      author: blog.author,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/homepage/blog", className: "mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: blog.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
              publishedDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              readingTime,
              " min read"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-bold mb-4", children: blog.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground leading-relaxed", children: blog.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "prose prose-lg dark:prose-invert max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Markdown,
          {
            components: {
              h1: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mt-12 mb-6 text-blue-600 dark:text-blue-400", children }),
              h2: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mt-12 mb-6 text-blue-600 dark:text-blue-400", children }),
              h3: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold mt-8 mb-4", children }),
              p: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg leading-relaxed mb-6", children }),
              ul: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 my-6 ml-6", children }),
              ol: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3 my-6 ml-6 list-decimal", children }),
              li: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-lg leading-relaxed", children }),
              blockquote: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "border-l-4 border-primary pl-6 my-6 italic bg-primary/5 py-4 rounded-r-lg", children }),
              strong: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold text-foreground", children }),
              em: ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic", children })
            },
            children: blog.content
          }
        ) }),
        blog.keywords && blog.keywords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-12 pt-8 border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-4 w-4 text-muted-foreground" }),
          blog.keywords.map((keyword, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-sm", children: keyword }, index))
        ] }) })
      ]
    }
  );
}

export { DynamicBlogPost as default };
