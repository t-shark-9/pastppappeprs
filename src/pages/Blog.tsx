import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Lightbulb, GraduationCap, Library, Calendar, Clock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DynamicBlog {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
  published_at: string;
  content: string;
}

export default function Blog() {
  const navigate = useNavigate();

  // Fetch dynamic blogs from database
  const { data: dynamicBlogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, slug, title, description, category, created_at, published_at, content")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as DynamicBlog[];
    },
  });

  // Static featured sections
  const featuredSections = [
    {
      title: "How to Write an Essay",
      description: "Step-by-step essay writing guide",
      icon: BookOpen,
      path: "/homepage/blog/essay-guide",
    },
    {
      title: "IA Experience",
      description: "Internal Assessment tips and insights",
      icon: Lightbulb,
      path: "/homepage/blog/ia-experience",
    },
    {
      title: "Exam Resources",
      description: "Study materials and exam preparation",
      icon: GraduationCap,
      path: "/homepage/blog/exam-resources",
    },
    {
      title: "Educational Systems",
      description: "Understanding different curricula",
      icon: Library,
      path: "/homepage/blog/educational-systems",
    },
  ];

  const getReadingTime = (content: string) => {
    return Math.ceil(content.split(/\s+/).length / 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <BackButton fallbackPath="/homepage" />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Blog & Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guides, tips, and educational resources for IB students
            </p>
          </div>

          {/* Featured Guides */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Featured Guides
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredSections.map((section) => {
                const Icon = section.icon;
                return (
                  <Card
                    key={section.path}
                    className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] border-2 border-primary/20"
                    onClick={() => navigate(section.path)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{section.title}</CardTitle>
                          <CardDescription>{section.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Dynamic Blog Posts */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Latest Articles
            </h2>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : dynamicBlogs && dynamicBlogs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dynamicBlogs.map((blog) => {
                  const publishedDate = new Date(blog.published_at || blog.created_at);
                  const readingTime = getReadingTime(blog.content);
                  
                  return (
                    <Card
                      key={blog.id}
                      className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col"
                      onClick={() => navigate(`/homepage/blog/${blog.slug}`)}
                    >
                      <CardHeader className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {blog.category}
                          </Badge>
                        </div>
                        <CardTitle className="line-clamp-2 text-lg">
                          {blog.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {blog.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {publishedDate.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {readingTime} min
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No articles yet. Check back soon!</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
