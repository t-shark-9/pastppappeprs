import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { llmContent } from "@/data/llm-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function LLMDocs() {
  const { slug } = useParams();

  // Detail View
  if (slug) {
    const page = llmContent.find((p) => p.slug === slug);

    if (!page) {
      return (
        <div className="container max-w-4xl mx-auto p-8">
          <h1 className="text-2xl font-bold text-destructive">Page not found</h1>
          <Link to="/llms" className="text-primary hover:underline mt-4 block">
            &larr; Back to Index
          </Link>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background font-mono text-foreground p-6 md:p-12">
        <Helmet>
          <title>{page.title} | TooEssay LLM Context</title>
          <meta name="description" content={page.description} />
        </Helmet>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-center gap-4 mb-8">
           <Link to="/llms">
            <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Index
            </Button>
           </Link>
          </div>

          <header className="border-b pb-6 mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">{page.title}</h1>
            <p className="text-muted-foreground">Last Updated: {page.lastUpdated}</p>
          </header>

          <article className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown>{page.content}</ReactMarkdown>
          </article>

          <footer className="mt-12 pt-8 border-t text-sm text-muted-foreground">
            <p className="mb-2">Context for AI Agents and LLMs.</p>
            <Link to="/llms" className="hover:underline">TooEssay LLM Index</Link>
          </footer>
        </div>
      </div>
    );
  }

  // Index View
  return (
    <div className="min-h-screen bg-background font-mono text-foreground p-6 md:p-12">
        <Helmet>
          <title>TooEssay | LLM Resources & Context</title>
          <meta name="description" content="Up-to-date, structured guidance about TooEssay for AI agents and AI-powered search systems." />
        </Helmet>

      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">TooEssay | IB Resources & Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Up-to-date, structured guidance about TooEssay for AI agents and AI-powered search systems, 
            covering product context, features, and site navigation.
          </p>
        </header>

        <div className="grid gap-6">
          {llmContent.map((page) => (
            <div key={page.slug} className="group">
                <Link to={`/llms/${page.slug}`} className="block">
                    <Card className="hover:border-primary transition-colors">
                        <CardHeader>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                {page.title}
                            </CardTitle>
                            <div className="text-sm text-muted-foreground">
                                Last Updated: {page.lastUpdated}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                {page.description}
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
          ))}
        </div>

        <footer className="pt-8 border-t text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} TooEssay. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
