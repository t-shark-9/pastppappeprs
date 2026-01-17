import { cR as Root2, r as reactExports, j as jsxRuntimeExports, cS as Portal2, cT as Content2, cU as Title2, cV as Description2, cW as Cancel, cX as Action, cY as Overlay2, cZ as useQueryClient, c_ as useQuery, c$ as useMutation, bW as Globe, az as Sparkles, _ as RefreshCw, $ as LoaderCircle, bJ as Eye, bs as ExternalLink, aC as Trash2, d0 as Markdown, d1 as Mail, aQ as Plus, X, bl as Send } from './vendor-react-BeQHm2Hb.js';
import { i as cn, j as buttonVariants, B as Button, s as supabase, u as useAuth, a as useIsMobile } from './index-C9tyh6tO.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { I as Input } from './input-2hnN3JAu.js';
import { T as Textarea } from './textarea-1gnjGx7F.js';
import { L as Label } from './label-BfT9c56I.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-CP2-oe9M.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-BQ4GVXEh.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-BTaNjRSt.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-D8pTTJCu.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
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

const AlertDialog = Root2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props });
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Title2, { ref, className: cn("text-lg font-semibold", className), ...props }));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Description2, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;

function BlogManagement() {
  const queryClient = useQueryClient();
  const [topic, setTopic] = reactExports.useState("");
  const [style, setStyle] = reactExports.useState("Educational, informative, and student-friendly");
  const [targetUrl, setTargetUrl] = reactExports.useState("");
  const [generating, setGenerating] = reactExports.useState(false);
  const [generatedBlog, setGeneratedBlog] = reactExports.useState(null);
  const [showPreview, setShowPreview] = reactExports.useState(false);
  const [blogPageUrl, setBlogPageUrl] = reactExports.useState("");
  const [maxBlogs, setMaxBlogs] = reactExports.useState(5);
  const [crawling, setCrawling] = reactExports.useState(false);
  const [crawlResults, setCrawlResults] = reactExports.useState(null);
  const { data: existingBlogs, isLoading: loadingBlogs } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blogs").select("id, slug, title, description, category, status, view_count, created_at, published_at").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    }
  });
  const deleteBlogMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      ue.success("Blog deleted");
    },
    onError: (error) => {
      ue.error(error.message || "Failed to delete blog");
    }
  });
  const handleGenerate = async () => {
    if (!topic.trim()) {
      ue.error("Please enter a topic");
      return;
    }
    setGenerating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No session");
      }
      const response = await fetch(
        `${"https://jimfuknlntcqgtqfwcod.supabase.co"}/functions/v1/generate-blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`
          },
          body: JSON.stringify({
            topic,
            style,
            targetUrl: targetUrl.trim() || void 0
          })
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate blog");
      }
      const blog = await response.json();
      setGeneratedBlog(blog);
      ue.success("Blog generated! Click 'Save to Database' to publish.");
    } catch (error) {
      console.error("Error generating blog:", error);
      ue.error(error.message || "Failed to generate blog");
    } finally {
      setGenerating(false);
    }
  };
  const handleSaveToDatabase = async () => {
    if (!generatedBlog) return;
    try {
      const { error } = await supabase.from("blogs").insert({
        slug: generatedBlog.slug,
        title: generatedBlog.title,
        description: generatedBlog.description,
        content: generatedBlog.content,
        category: generatedBlog.category,
        keywords: generatedBlog.keywords,
        status: "published"
      });
      if (error) throw error;
      ue.success("Blog saved and published!");
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      setGeneratedBlog(null);
      setTopic("");
      setTargetUrl("");
    } catch (error) {
      ue.error(error.message || "Failed to save blog");
    }
  };
  const handleCrawlAndGenerate = async () => {
    if (!blogPageUrl.trim()) {
      ue.error("Please enter a blog page URL");
      return;
    }
    setCrawling(true);
    setCrawlResults(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");
      ue.info("Extracting blog links...");
      const extractResponse = await fetch(
        `${"https://jimfuknlntcqgtqfwcod.supabase.co"}/functions/v1/crawl-and-generate-blogs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`
          },
          body: JSON.stringify({
            action: "extract-links",
            blogPageUrl: blogPageUrl.trim(),
            maxBlogs
          })
        }
      );
      if (!extractResponse.ok) {
        const error = await extractResponse.json();
        throw new Error(error.error || "Failed to extract links");
      }
      const { links } = await extractResponse.json();
      if (!links || links.length === 0) {
        ue.warning("No blog posts found on the page");
        setCrawling(false);
        return;
      }
      ue.info(`Found ${links.length} blogs. Generating...`);
      const results = [];
      let skipped = 0;
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        ue.info(`Generating blog ${i + 1}/${links.length}: ${link.title?.substring(0, 30) || "Untitled"}...`);
        try {
          const genResponse = await fetch(
            `${"https://jimfuknlntcqgtqfwcod.supabase.co"}/functions/v1/crawl-and-generate-blogs`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`
              },
              body: JSON.stringify({
                action: "generate-blog",
                blogUrl: link.url,
                blogTitle: link.title
              })
            }
          );
          const result = await genResponse.json();
          if (genResponse.ok && result.success) {
            results.push({ slug: result.slug, title: result.title });
          } else if (result.skipped) {
            skipped++;
            ue.warning(`Skipped duplicate: ${result.title?.substring(0, 30) || "Unknown"}`);
          } else {
            console.error(`Failed to generate blog: ${result.error}`);
          }
        } catch (genError) {
          console.error(`Error generating blog:`, genError);
        }
        if (i < links.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1e3));
        }
      }
      setCrawlResults(results);
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      if (skipped > 0) {
        ue.success(`Generated ${results.length} blogs, skipped ${skipped} duplicates`);
      } else {
        ue.success(`Generated ${results.length} of ${links.length} blogs!`);
      }
    } catch (error) {
      console.error("Error crawling blogs:", error);
      ue.error(error.message || "Failed to crawl and generate blogs");
    } finally {
      setCrawling(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "automated", className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "automated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4 mr-2" }),
          "Auto-Generate"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "manual", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 mr-2" }),
          "Manual"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "manage", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 mr-2" }),
          "Manage (",
          existingBlogs?.length || 0,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "automated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5" }),
            "Automated Blog Generator"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Paste a blog index URL (e.g., Revision Dojo's blog page) and AI will crawl all blog posts, then generate original content inspired by each one. Blogs are automatically saved to the database." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blogPageUrl", children: "Blog Index Page URL *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "blogPageUrl",
                type: "url",
                placeholder: "https://revisiondojo.com/blog",
                value: blogPageUrl,
                onChange: (e) => setBlogPageUrl(e.target.value)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "The AI will find all blog links on this page and generate original content for each" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "maxBlogs", children: "Maximum Blogs to Generate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "maxBlogs",
                type: "number",
                min: 1,
                max: 20,
                value: maxBlogs,
                onChange: (e) => setMaxBlogs(parseInt(e.target.value) || 5)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Limit the number of blogs to generate (1-20). Each takes ~30 seconds." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleCrawlAndGenerate,
              disabled: crawling || !blogPageUrl.trim(),
              className: "w-full",
              size: "lg",
              children: crawling ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                "Crawling & Generating... (this may take a few minutes)"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "mr-2 h-4 w-4" }),
                "Crawl & Auto-Generate Blogs"
              ] })
            }
          ),
          crawlResults && crawlResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-green-700 dark:text-green-300 mb-2", children: [
              "✅ Successfully generated ",
              crawlResults.length,
              " blogs!"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-sm", children: crawlResults.map((blog, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: blog.slug }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: blog.title })
            ] }, i)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3", children: "These blogs are now live at /homepage/blog/[slug]" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "manual", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }),
              "Manual Blog Generator"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Generate a single blog article with custom topic and settings" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "topic", children: "Blog Topic *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "topic",
                  placeholder: "e.g., How to Write a TOK Essay, Biology IA Tips, etc.",
                  value: topic,
                  onChange: (e) => setTopic(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "style", children: "Writing Style" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "style",
                  placeholder: "Describe the desired writing style...",
                  value: style,
                  onChange: (e) => setStyle(e.target.value),
                  rows: 2
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "targetUrl", children: "Reference URL (Optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "targetUrl",
                  type: "url",
                  placeholder: "https://example.com/reference-article",
                  value: targetUrl,
                  onChange: (e) => setTargetUrl(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleGenerate,
                disabled: generating || !topic.trim(),
                className: "w-full",
                children: generating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                  "Generating..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mr-2 h-4 w-4" }),
                  "Generate Blog"
                ] })
              }
            )
          ] })
        ] }),
        generatedBlog && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
              "Generated: ",
              generatedBlog.title
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: generatedBlog.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { children: generatedBlog.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                "/",
                generatedBlog.slug
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowPreview(true), variant: "outline", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "mr-2 h-4 w-4" }),
                "Preview"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSaveToDatabase, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mr-2 h-4 w-4" }),
                "Save to Database (Publish)"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "manage", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Manage Published Blogs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "View, edit, or delete your dynamically generated blogs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadingBlogs ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }) }) : existingBlogs && existingBlogs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: existingBlogs.map((blog) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-4 border rounded-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: blog.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: blog.category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    blog.view_count || 0,
                    " views"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(blog.created_at).toLocaleDateString() })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => window.open(`/homepage/blog/${blog.slug}`, "_blank"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      if (confirm("Are you sure you want to delete this blog?")) {
                        deleteBlogMutation.mutate(blog.id);
                      }
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
                  }
                )
              ] })
            ]
          },
          blog.id
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No blogs in database yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Use Auto-Generate or Manual tabs to create blogs." })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showPreview, onOpenChange: setShowPreview, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-4xl max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: generatedBlog?.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: generatedBlog?.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-slate dark:prose-invert max-w-none", children: generatedBlog && /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { children: generatedBlog.content }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowPreview(false), children: "Close" }) })
    ] }) })
  ] });
}

function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useIsMobile();
  const [users, setUsers] = reactExports.useState([]);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [loadingUsers, setLoadingUsers] = reactExports.useState(true);
  const [deleteUserId, setDeleteUserId] = reactExports.useState(null);
  const [deleting, setDeleting] = reactExports.useState(false);
  const [showNewsletterDialog, setShowNewsletterDialog] = reactExports.useState(false);
  const [newsletterSubject, setNewsletterSubject] = reactExports.useState("");
  const [newsletterHeading, setNewsletterHeading] = reactExports.useState("");
  const [newsletterContent, setNewsletterContent] = reactExports.useState("");
  const [newsletterFeatures, setNewsletterFeatures] = reactExports.useState([""]);
  const [newsletterCtaText, setNewsletterCtaText] = reactExports.useState("Try It Now");
  const [newsletterCtaUrl, setNewsletterCtaUrl] = reactExports.useState("");
  const [sendingNewsletter, setSendingNewsletter] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }
    if (user) {
      const ADMIN_EMAIL = "mail@tjark-osterloh.de";
      if (user.email === ADMIN_EMAIL) {
        setIsAdmin(true);
        fetchUsers();
      } else {
        ue.error("Unauthorized: Admin access denied");
        navigate("/work");
      }
    }
  }, [user, loading, navigate]);
  const fetchUsers = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No session");
      }
      const response = await fetch(
        `${"https://jimfuknlntcqgtqfwcod.supabase.co"}/functions/v1/admin-users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`
          },
          body: JSON.stringify({ action: "list" })
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();
      setUsers(result.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      ue.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };
  const handleDeleteUser = async () => {
    if (!deleteUserId) return;
    setDeleting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No session");
      }
      const response = await fetch(
        `${"https://jimfuknlntcqgtqfwcod.supabase.co"}/functions/v1/admin-users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`
          },
          body: JSON.stringify({ action: "delete", userId: deleteUserId })
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete user");
      }
      ue.success("User deleted successfully");
      setUsers(users.filter((u) => u.id !== deleteUserId));
      setDeleteUserId(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      ue.error(error instanceof Error ? error.message : "Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };
  const addFeatureField = () => {
    setNewsletterFeatures([...newsletterFeatures, ""]);
  };
  const removeFeatureField = (index) => {
    setNewsletterFeatures(newsletterFeatures.filter((_, i) => i !== index));
  };
  const updateFeature = (index, value) => {
    const updated = [...newsletterFeatures];
    updated[index] = value;
    setNewsletterFeatures(updated);
  };
  const resetNewsletterForm = () => {
    setNewsletterSubject("");
    setNewsletterHeading("");
    setNewsletterContent("");
    setNewsletterFeatures([""]);
    setNewsletterCtaText("Try It Now");
    setNewsletterCtaUrl("");
  };
  const handleSendNewsletter = async () => {
    if (!newsletterSubject.trim() || !newsletterHeading.trim() || !newsletterContent.trim()) {
      ue.error("Please fill in subject, heading, and content");
      return;
    }
    setSendingNewsletter(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No session");
      }
      const features = newsletterFeatures.filter((f) => f.trim());
      const response = await fetch(
        `${"https://jimfuknlntcqgtqfwcod.supabase.co"}/functions/v1/send-newsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`
          },
          body: JSON.stringify({
            subject: newsletterSubject.trim(),
            heading: newsletterHeading.trim(),
            content: newsletterContent.trim(),
            features,
            ctaText: newsletterCtaText.trim(),
            ctaUrl: newsletterCtaUrl.trim()
          })
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to send newsletter");
      }
      ue.success(`Newsletter sent to ${result.sent} users!`);
      if (result.failed > 0) {
        ue.warning(`${result.failed} emails failed to send`);
      }
      setShowNewsletterDialog(false);
      resetNewsletterForm();
    } catch (error) {
      console.error("Error sending newsletter:", error);
      ue.error(error instanceof Error ? error.message : "Failed to send newsletter");
    } finally {
      setSendingNewsletter(false);
    }
  };
  if (loading || !isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto py-8 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BackButton,
          {
            fallbackPath: "/dashboard",
            size: "icon",
            tooltip: "Back to Dashboard"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Admin Panel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage users and communications" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowNewsletterDialog(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 mr-2" }),
        "Send Newsletter"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "users", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "users", children: [
          "Users (",
          users.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "blogs", children: "Blogs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "communications", children: "Communications" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "users", children: loadingUsers ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "Loading users..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "School" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Roles" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Last Sign In" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: u.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: u.full_name || "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: u.school_name || "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: u.roles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: role }, role)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: new Date(u.created_at).toLocaleDateString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: u.last_sign_in ? new Date(u.last_sign_in).toLocaleDateString() : "Never" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => setDeleteUserId(u.id),
              disabled: u.id === user?.id,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
            }
          ) })
        ] }, u.id)) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "blogs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogManagement, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "communications", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Email Communications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Send newsletters and announcements to all users" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowNewsletterDialog(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 mr-2" }),
          "Compose Newsletter"
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!deleteUserId, onOpenChange: () => setDeleteUserId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete User Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Are you sure you want to delete this user account? This action cannot be undone. All user data, assignments, and drafts will be permanently deleted." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deleting, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: handleDeleteUser,
            disabled: deleting,
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            children: deleting ? "Deleting..." : "Delete"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showNewsletterDialog, onOpenChange: setShowNewsletterDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Compose Newsletter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Send an email to all ",
          users.length,
          " registered users about new features"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "subject", children: "Email Subject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "subject",
              placeholder: "New Features in TooEssay!",
              value: newsletterSubject,
              onChange: (e) => setNewsletterSubject(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "heading", children: "Email Heading" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "heading",
              placeholder: "Exciting New Features Just Launched!",
              value: newsletterHeading,
              onChange: (e) => setNewsletterHeading(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "content", children: "Main Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "content",
              placeholder: "We're excited to announce some amazing new features that will help you write better essays...",
              value: newsletterContent,
              onChange: (e) => setNewsletterContent(e.target.value),
              rows: 4
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Feature List (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: addFeatureField, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
              "Add Feature"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: newsletterFeatures.map((feature, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: `Feature ${index + 1}...`,
                value: feature,
                onChange: (e) => updateFeature(index, e.target.value)
              }
            ),
            newsletterFeatures.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                onClick: () => removeFeatureField(index),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ctaText", children: "Button Text" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ctaText",
                placeholder: "Try It Now",
                value: newsletterCtaText,
                onChange: (e) => setNewsletterCtaText(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ctaUrl", children: "Button URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ctaUrl",
                placeholder: "https://tooessay.com/dashboard",
                value: newsletterCtaUrl,
                onChange: (e) => setNewsletterCtaUrl(e.target.value)
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowNewsletterDialog(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSendNewsletter, disabled: sendingNewsletter, children: sendingNewsletter ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
          "Sending..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4 mr-2" }),
          "Send to ",
          users.length,
          " Users"
        ] }) })
      ] })
    ] }) })
  ] });
}

export { Admin as default };
