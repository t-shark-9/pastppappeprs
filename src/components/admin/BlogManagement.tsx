import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Sparkles, Eye, Globe, RefreshCw, Trash2, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReactMarkdown from 'react-markdown';

interface GeneratedBlog {
  title: string;
  description: string;
  content: string;
  keywords: string[];
  category: string;
  slug: string;
}

interface DatabaseBlog {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  status: string;
  view_count: number;
  created_at: string;
  published_at: string;
}

export function BlogManagement() {
  const queryClient = useQueryClient();
  
  // Manual generation state
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("Educational, informative, and student-friendly");
  const [targetUrl, setTargetUrl] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedBlog, setGeneratedBlog] = useState<GeneratedBlog | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Automated crawl state
  const [blogPageUrl, setBlogPageUrl] = useState("");
  const [maxBlogs, setMaxBlogs] = useState(5);
  const [crawling, setCrawling] = useState(false);
  const [crawlResults, setCrawlResults] = useState<{ slug: string; title: string }[] | null>(null);

  // Fetch existing blogs from database
  const { data: existingBlogs, isLoading: loadingBlogs } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, slug, title, description, category, status, view_count, created_at, published_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as DatabaseBlog[];
    },
  });

  // Delete blog mutation
  const deleteBlogMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      toast.success("Blog deleted");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete blog");
    },
  });

  // Manual blog generation
  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setGenerating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("No session");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            topic,
            style,
            targetUrl: targetUrl.trim() || undefined,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate blog");
      }

      const blog = await response.json();
      setGeneratedBlog(blog);
      toast.success("Blog generated! Click 'Save to Database' to publish.");
    } catch (error: any) {
      console.error("Error generating blog:", error);
      toast.error(error.message || "Failed to generate blog");
    } finally {
      setGenerating(false);
    }
  };

  // Save generated blog to database
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
        status: "published",
      });

      if (error) throw error;

      toast.success("Blog saved and published!");
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      setGeneratedBlog(null);
      setTopic("");
      setTargetUrl("");
    } catch (error: any) {
      toast.error(error.message || "Failed to save blog");
    }
  };

  // Automated crawl and generate
  const handleCrawlAndGenerate = async () => {
    if (!blogPageUrl.trim()) {
      toast.error("Please enter a blog page URL");
      return;
    }

    setCrawling(true);
    setCrawlResults(null);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      // Step 1: Extract blog links
      toast.info("Extracting blog links...");
      const extractResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/crawl-and-generate-blogs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            action: "extract-links",
            blogPageUrl: blogPageUrl.trim(),
            maxBlogs,
          }),
        }
      );

      if (!extractResponse.ok) {
        const error = await extractResponse.json();
        throw new Error(error.error || "Failed to extract links");
      }

      const { links } = await extractResponse.json();
      
      if (!links || links.length === 0) {
        toast.warning("No blog posts found on the page");
        setCrawling(false);
        return;
      }

      toast.info(`Found ${links.length} blogs. Generating...`);

      // Step 2: Generate each blog one by one
      const results: { slug: string; title: string }[] = [];
      let skipped = 0;
      
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        toast.info(`Generating blog ${i + 1}/${links.length}: ${link.title?.substring(0, 30) || 'Untitled'}...`);
        
        try {
          const genResponse = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/crawl-and-generate-blogs`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
              },
              body: JSON.stringify({
                action: "generate-blog",
                blogUrl: link.url,
                blogTitle: link.title,
              }),
            }
          );

          const result = await genResponse.json();
          
          if (genResponse.ok && result.success) {
            results.push({ slug: result.slug, title: result.title });
          } else if (result.skipped) {
            skipped++;
            toast.warning(`Skipped duplicate: ${result.title?.substring(0, 30) || 'Unknown'}`);
          } else {
            console.error(`Failed to generate blog: ${result.error}`);
          }
        } catch (genError) {
          console.error(`Error generating blog:`, genError);
        }

        // Small delay between requests
        if (i < links.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      setCrawlResults(results);
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      
      if (skipped > 0) {
        toast.success(`Generated ${results.length} blogs, skipped ${skipped} duplicates`);
      } else {
        toast.success(`Generated ${results.length} of ${links.length} blogs!`);
      }
    } catch (error: any) {
      console.error("Error crawling blogs:", error);
      toast.error(error.message || "Failed to crawl and generate blogs");
    } finally {
      setCrawling(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="automated" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="automated">
            <Globe className="h-4 w-4 mr-2" />
            Auto-Generate
          </TabsTrigger>
          <TabsTrigger value="manual">
            <Sparkles className="h-4 w-4 mr-2" />
            Manual
          </TabsTrigger>
          <TabsTrigger value="manage">
            <RefreshCw className="h-4 w-4 mr-2" />
            Manage ({existingBlogs?.length || 0})
          </TabsTrigger>
        </TabsList>

        {/* Automated Crawl Tab */}
        <TabsContent value="automated">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Automated Blog Generator
              </CardTitle>
              <CardDescription>
                Paste a blog index URL (e.g., Revision Dojo's blog page) and AI will crawl all blog posts, 
                then generate original content inspired by each one. Blogs are automatically saved to the database.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="blogPageUrl">Blog Index Page URL *</Label>
                <Input
                  id="blogPageUrl"
                  type="url"
                  placeholder="https://revisiondojo.com/blog"
                  value={blogPageUrl}
                  onChange={(e) => setBlogPageUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  The AI will find all blog links on this page and generate original content for each
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxBlogs">Maximum Blogs to Generate</Label>
                <Input
                  id="maxBlogs"
                  type="number"
                  min={1}
                  max={20}
                  value={maxBlogs}
                  onChange={(e) => setMaxBlogs(parseInt(e.target.value) || 5)}
                />
                <p className="text-xs text-muted-foreground">
                  Limit the number of blogs to generate (1-20). Each takes ~30 seconds.
                </p>
              </div>

              <Button
                onClick={handleCrawlAndGenerate}
                disabled={crawling || !blogPageUrl.trim()}
                className="w-full"
                size="lg"
              >
                {crawling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Crawling & Generating... (this may take a few minutes)
                  </>
                ) : (
                  <>
                    <Globe className="mr-2 h-4 w-4" />
                    Crawl & Auto-Generate Blogs
                  </>
                )}
              </Button>

              {crawlResults && crawlResults.length > 0 && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="font-medium text-green-700 dark:text-green-300 mb-2">
                    ✅ Successfully generated {crawlResults.length} blogs!
                  </p>
                  <ul className="space-y-1 text-sm">
                    {crawlResults.map((blog, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{blog.slug}</Badge>
                        <span className="text-muted-foreground">{blog.title}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3">
                    These blogs are now live at /homepage/blog/[slug]
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manual Generation Tab */}
        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Manual Blog Generator
              </CardTitle>
              <CardDescription>
                Generate a single blog article with custom topic and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Blog Topic *</Label>
                <Input
                  id="topic"
                  placeholder="e.g., How to Write a TOK Essay, Biology IA Tips, etc."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Writing Style</Label>
                <Textarea
                  id="style"
                  placeholder="Describe the desired writing style..."
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetUrl">Reference URL (Optional)</Label>
                <Input
                  id="targetUrl"
                  type="url"
                  placeholder="https://example.com/reference-article"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generating || !topic.trim()}
                className="w-full"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Blog
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {generatedBlog && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Generated: {generatedBlog.title}</CardTitle>
                <CardDescription>{generatedBlog.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>{generatedBlog.category}</Badge>
                  <Badge variant="outline">/{generatedBlog.slug}</Badge>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button onClick={() => setShowPreview(true)} variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button onClick={handleSaveToDatabase}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Save to Database (Publish)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Manage Blogs Tab */}
        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Manage Published Blogs</CardTitle>
              <CardDescription>
                View, edit, or delete your dynamically generated blogs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingBlogs ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : existingBlogs && existingBlogs.length > 0 ? (
                <div className="space-y-3">
                  {existingBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{blog.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="secondary" className="text-xs">
                            {blog.category}
                          </Badge>
                          <span>•</span>
                          <span>{blog.view_count || 0} views</span>
                          <span>•</span>
                          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`/homepage/blog/${blog.slug}`, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this blog?")) {
                              deleteBlogMutation.mutate(blog.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No blogs in database yet.</p>
                  <p className="text-sm">Use Auto-Generate or Manual tabs to create blogs.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{generatedBlog?.title}</DialogTitle>
            <DialogDescription>{generatedBlog?.description}</DialogDescription>
          </DialogHeader>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {generatedBlog && <ReactMarkdown>{generatedBlog.content}</ReactMarkdown>}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPreview(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
