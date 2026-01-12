import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle, Clock, AlertTriangle, ExternalLink, FileText, Award, Target, BookMarked, Brain, Eye, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useSEO } from "@/hooks/use-seo";
import { theoryOfKnowledgeData } from "@/data/ee_tok_data";
import { ArticleWrapper } from "@/components/seo/ArticleWrapper";

// Citation component for displaying official IB references
function CitationCard({ citation, isMain = false }: { citation: any; isMain?: boolean }) {
  return (
    <div className={`p-3 rounded-lg border ${isMain ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-border'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">{citation.title}</span>
            {isMain && <Badge variant="secondary" className="text-xs">Primary Source</Badge>}
          </div>
          <p className="text-xs text-muted-foreground mb-1">
            {citation.organization} ({citation.year})
          </p>
          <Badge variant="outline" className="text-xs capitalize">
            {citation.type}
          </Badge>
        </div>
        {citation.url && (
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
            <a href={citation.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

export default function TheoryOfKnowledgeGuide() {
  const { section } = useParams();
  const navigate = useNavigate();

  // SEO optimization
  useSEO('theoryOfKnowledge');

  // If viewing a specific section
  if (section && theoryOfKnowledgeData.sections[section]) {
    const sectionData = theoryOfKnowledgeData.sections[section];

    return (
      <ArticleWrapper
        title={`Theory of Knowledge Guide - ${sectionData.title}`}
        description={`Complete guide to IB Theory of Knowledge: ${sectionData.title}. Master TOK concepts, essay writing, and assessment criteria.`}
        datePublished="2024-01-25T00:00:00Z"
        dateModified="2024-12-24T00:00:00Z"
        category="IB Theory of Knowledge"
        keywords={[
          "IB TOK",
          "Theory of Knowledge",
          "TOK essay",
          "TOK guide",
          "IB core",
          "knowledge questions",
          sectionData.title
        ]}
      >
        <header className="sr-only">
          <h1>{theoryOfKnowledgeData.title} - {sectionData.title} - Complete TOK Guide</h1>
        </header>

        <div className="container max-w-4xl mx-auto px-6 py-16 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <BackButton
              fallbackPath="/theory-of-knowledge"
              size="icon"
              tooltip="Back to TOK Overview"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {theoryOfKnowledgeData.title}: {sectionData.title}
              </h1>
              <div className="flex gap-2">
                <Badge variant="secondary">{theoryOfKnowledgeData.weighting}</Badge>
                <Badge variant="outline">{theoryOfKnowledgeData.wordCount}</Badge>
              </div>
            </div>
          </div>

          {/* Section Content */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookMarked className="h-5 w-5" />
                {sectionData.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {sectionData.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tips */}
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Tips for Success
                </h4>
                <ul className="space-y-2">
                  {sectionData.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                      <span className="text-green-500 mt-1.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Mistakes */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Common Mistakes to Avoid
                </h4>
                <ul className="space-y-2">
                  {sectionData.commonMistakes.map((mistake, i) => (
                    <li key={i} className="text-sm text-amber-700 dark:text-amber-300 flex items-start gap-2">
                      <span className="text-amber-500 mt-1.5">•</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate(`/theory-of-knowledge`)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Overview
            </Button>
            <Button onClick={() => navigate(`/theory-of-knowledge/criteria`)}>
              View Assessment Criteria
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>
    </ArticleWrapper>
    );
  }

  // Main overview page
  return (
    <ArticleWrapper
      title="IB Theory of Knowledge Guide - Complete TOK Essay & Exhibition Guide"
      description="Comprehensive guide to IB Theory of Knowledge (TOK). Learn about knowledge questions, areas of knowledge, ways of knowing, and the TOK essay and exhibition."
      datePublished="2024-01-25T00:00:00Z"
      dateModified="2024-12-24T00:00:00Z"
      category="IB Theory of Knowledge"
      keywords={[
        "IB TOK",
        "Theory of Knowledge",
        "TOK essay",
        "TOK exhibition",
        "TOK guide",
        "IB core",
        "knowledge questions",
        "areas of knowledge"
      ]}
    >
      <header className="sr-only">
        <h1>IB Theory of Knowledge - Complete TOK Guide for IB Diploma Students</h1>
      </header>

      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">{theoryOfKnowledgeData.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {theoryOfKnowledgeData.description}
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {theoryOfKnowledgeData.weighting}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {theoryOfKnowledgeData.wordCount}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="framework">Knowledge Framework</TabsTrigger>
            <TabsTrigger value="criteria">Assessment Criteria</TabsTrigger>
            <TabsTrigger value="sections">TOK Guide</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  What is Theory of Knowledge?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {theoryOfKnowledgeData.sections.overview.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    TOK Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">TOK Essay</h4>
                        <p className="text-sm text-muted-foreground">1,600-word response to a prescribed title</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">TOK Exhibition</h4>
                        <p className="text-sm text-muted-foreground">Visual presentation exploring a knowledge question</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    Core Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">AOKs</Badge>
                      <span className="text-sm">Areas of Knowledge</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">WOKs</Badge>
                      <span className="text-sm">Ways of Knowing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">KQ</Badge>
                      <span className="text-sm">Knowledge Questions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Knowledge Framework Tab */}
          <TabsContent value="framework" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Areas of Knowledge (AOKs)</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Different ways we organize knowledge
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "Mathematics",
                      "Natural Sciences",
                      "Human Sciences",
                      "History",
                      "The Arts",
                      "Ethics",
                      "Religious Knowledge Systems",
                      "Indigenous Knowledge Systems"
                    ].map((aok, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">{aok}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Ways of Knowing (WOKs)</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Methods through which we acquire knowledge
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "Sense Perception",
                      "Reason",
                      "Language",
                      "Emotion",
                      "Faith",
                      "Imagination",
                      "Intuition",
                      "Memory"
                    ].map((wok, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">{wok}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Knowledge Framework Elements</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Five elements for analyzing how knowledge is organized and acquired
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">1. Scope & Applications</h4>
                    <p className="text-sm text-muted-foreground">
                      What is this area about? What problems can it solve?
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">2. Concepts & Language</h4>
                    <p className="text-sm text-muted-foreground">
                      What key concepts and terminology are used?
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">3. Methodology</h4>
                    <p className="text-sm text-muted-foreground">
                      What methods are used to produce knowledge?
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">4. Historical Development</h4>
                    <p className="text-sm text-muted-foreground">
                      How has this area developed over time?
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">5. Links to Personal Knowledge</h4>
                    <p className="text-sm text-muted-foreground">
                      How does this connect to what we know personally?
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessment Criteria Tab */}
          <TabsContent value="criteria" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>TOK Assessment Criteria</CardTitle>
                <p className="text-sm text-muted-foreground">
                  TOK Essay (67%) and TOK Exhibition (33%) assessed separately
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {Object.entries(theoryOfKnowledgeData.assessmentCriteria).map(([key, criterion]) => (
                    <Card key={key} className="border-l-4 border-l-primary/20">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-lg">
                            Criterion {key}: {criterion.name}
                          </h4>
                          <Badge variant="secondary">{criterion.marks} marks</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {criterion.description}
                        </p>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <h5 className="font-medium text-sm mb-2">Key Points:</h5>
                          <ul className="text-sm space-y-1">
                            {criterion.keyPoints.map((point, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1.5">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TOK Guide Sections */}
          <TabsContent value="sections" className="space-y-6">
            <div className="grid gap-4">
              {Object.entries(theoryOfKnowledgeData.sections).map(([key, section]) => (
                <Card key={key} className="shadow-soft hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/theory-of-knowledge/${key}`)}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {section.title}
                      <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {section.content.split('\n\n')[0]}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  TOK Course Timeline
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Two-year TOK course structure with key milestones
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {theoryOfKnowledgeData.timeline.map((phase, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        {index < theoryOfKnowledgeData.timeline.length - 1 && (
                          <div className="w-px h-16 bg-border mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h4 className="font-semibold">{phase.phase}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{phase.duration}</p>
                        <ul className="text-sm space-y-1">
                          {phase.activities.map((activity, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1.5">•</span>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* References Tab */}
          <TabsContent value="references" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Official IB References</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Primary sources for TOK course requirements and guidelines
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <CitationCard citation={theoryOfKnowledgeData.officialGuide} isMain={true} />
                {theoryOfKnowledgeData.additionalReferences.map((citation, index) => (
                  <CitationCard key={index} citation={citation} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ArticleWrapper>
  );
}