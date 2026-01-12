import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle, Clock, AlertTriangle, ExternalLink, FileText, Award, Target, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useSEO } from "@/hooks/use-seo";
import { extendedEssayData } from "@/data/ee_tok_data";
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

export default function ExtendedEssayGuide() {
  const { section } = useParams();
  const navigate = useNavigate();

  // SEO optimization
  useSEO('extendedEssay');

  // If viewing a specific section
  if (section && extendedEssayData.sections[section]) {
    const sectionData = extendedEssayData.sections[section];

    return (
      <ArticleWrapper
        title={`Extended Essay Guide - ${sectionData.title}`}
        description={`Complete guide to IB Extended Essay: ${sectionData.title}. Learn key requirements, structure, and tips for achieving top marks in your EE.`}
        datePublished="2024-01-20T00:00:00Z"
        dateModified="2024-12-24T00:00:00Z"
        category="IB Extended Essay"
        keywords={[
          "IB Extended Essay",
          "EE guide",
          "Extended Essay writing",
          "IB EE requirements",
          "4000 word essay",
          "IB research",
          sectionData.title
        ]}
      >
        <header className="sr-only">
          <h1>{extendedEssayData.title} - {sectionData.title} - Complete Extended Essay Writing Guide</h1>
        </header>

        <div className="container max-w-4xl mx-auto px-6 py-16 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <BackButton
              fallbackPath="/extended-essay"
              size="icon"
              tooltip="Back to EE Overview"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {extendedEssayData.title}: {sectionData.title}
              </h1>
              <div className="flex gap-2">
                <Badge variant="secondary">{extendedEssayData.weighting}</Badge>
                <Badge variant="outline">{extendedEssayData.wordCount}</Badge>
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
            <Button variant="outline" onClick={() => navigate(`/extended-essay`)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Overview
            </Button>
            <Button onClick={() => navigate(`/extended-essay/criteria`)}>
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
      title="IB Extended Essay Guide - Complete Writing Guide & Requirements"
      description="Comprehensive guide to the IB Extended Essay (EE). Learn structure, subject selection, research methods, and assessment criteria for your 4000-word research paper."
      datePublished="2024-01-20T00:00:00Z"
      dateModified="2024-12-24T00:00:00Z"
      category="IB Extended Essay"
      keywords={[
        "IB Extended Essay",
        "EE guide",
        "Extended Essay writing",
        "IB EE requirements",
        "4000 word essay",
        "IB research",
        "EE assessment criteria",
        "IB core"
      ]}
    >
      <header className="sr-only">
        <h1>IB Extended Essay - Complete Guide for IB Diploma Students</h1>
      </header>

      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">{extendedEssayData.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {extendedEssayData.description}
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {extendedEssayData.weighting}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {extendedEssayData.wordCount}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="criteria">Assessment Criteria</TabsTrigger>
            <TabsTrigger value="sections">Writing Guide</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="examples">Sample Topics</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  What is the Extended Essay?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {extendedEssayData.sections.overview.content.split('\n\n').map((paragraph, i) => (
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
                    Key Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Develop independent research skills
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Deepen understanding of a subject area
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Improve academic writing abilities
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Enhance critical thinking skills
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Time Commitment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Research Phase</span>
                        <span>40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Writing Phase</span>
                        <span>35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Revision Phase</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assessment Criteria Tab */}
          <TabsContent value="criteria" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Extended Essay Assessment Criteria</CardTitle>
                <p className="text-sm text-muted-foreground">
                  The EE is assessed using 12 criteria (A-K) worth a total of 34 marks
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {Object.entries(extendedEssayData.assessmentCriteria).map(([key, criterion]) => (
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

          {/* Writing Guide Sections */}
          <TabsContent value="sections" className="space-y-6">
            <div className="grid gap-4">
              {Object.entries(extendedEssayData.sections).map(([key, section]) => (
                <Card key={key} className="shadow-soft hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/extended-essay/${key}`)}>
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
                  Extended Essay Timeline
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Typical 18-month timeline for completing the Extended Essay
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {extendedEssayData.timeline.map((phase, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        {index < extendedEssayData.timeline.length - 1 && (
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

          {/* Sample Topics Tab */}
          <TabsContent value="examples" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Sample Extended Essay Topics</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Examples of successful research questions across different subjects
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700 dark:text-green-400">Biology</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        "To what extent does temperature affect the rate of photosynthesis in Elodea canadensis?"
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        "How do different concentrations of salt affect seed germination in Zea mays?"
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">History</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        "How significant was the role of propaganda in maintaining Stalin's regime in the Soviet Union from 1924-1953?"
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        "To what extent did economic factors contribute to the fall of the Roman Empire?"
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">English Literature</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        "How does Margaret Atwood use dystopian elements in The Handmaid's Tale to critique patriarchal structures?"
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        "In what ways does Shakespeare use the motif of appearance vs. reality in Hamlet?"
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-orange-700 dark:text-orange-400">Mathematics</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        "How can the mathematics of cryptography be applied to ensure data security?"
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        "To what extent can non-Euclidean geometries be applied to real-world problems?"
                      </li>
                    </ul>
                  </div>
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
                  Primary sources for Extended Essay requirements and guidelines
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <CitationCard citation={extendedEssayData.officialGuide} isMain={true} />
                {extendedEssayData.additionalReferences.map((citation, index) => (
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