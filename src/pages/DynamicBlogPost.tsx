import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BackButton } from "@/components/ui/back-button";
import { ArticleWrapper } from "@/components/seo/ArticleWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  keywords: string[];
  author: string;
  created_at: string;
  published_at: string;
  view_count: number;
}

export default function DynamicBlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) throw error;
      
      // Increment view count (fire and forget)
      supabase
        .from("blogs")
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq("id", data.id)
        .then(() => {});

      return data as Blog;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/homepage/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const publishedDate = new Date(blog.published_at || blog.created_at);
  const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200);

  return (
    <ArticleWrapper
      title={blog.title}
      description={blog.description}
      datePublished={blog.published_at || blog.created_at}
      category={blog.category}
      keywords={blog.keywords}
      author={blog.author}
    >
      <BackButton fallbackPath="/homepage/blog" className="mb-6" />
      
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{blog.category}</Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {publishedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readingTime} min read
          </Badge>
        </div>
        
        <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {blog.description}
        </p>
      </header>

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h2 className="text-3xl font-bold mt-12 mb-6 text-blue-600 dark:text-blue-400">
                {children}
              </h2>
            ),
            h2: ({ children }) => (
              <h2 className="text-3xl font-bold mt-12 mb-6 text-blue-600 dark:text-blue-400">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl font-semibold mt-8 mb-4">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-lg leading-relaxed mb-6">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="space-y-3 my-6 ml-6">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="space-y-3 my-6 ml-6 list-decimal">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="text-lg leading-relaxed">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary pl-6 my-6 italic bg-primary/5 py-4 rounded-r-lg">
                {children}
              </blockquote>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic">{children}</em>
            ),
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </article>

      {/* Keywords */}
      {blog.keywords && blog.keywords.length > 0 && (
        <footer className="mt-12 pt-8 border-t">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {blog.keywords.map((keyword, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {keyword}
              </Badge>
            ))}
          </div>
        </footer>
      )}
    </ArticleWrapper>
  );
}
