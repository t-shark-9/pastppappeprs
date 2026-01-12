import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle, Clock, AlertTriangle, ExternalLink, FileText, X, Menu, List } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useSEO } from "@/hooks/use-seo";
import iaGuidanceData from "@/data/iaGuidanceData";
import { iaEssayStructureData } from "@/data/iaEssayStructureData";
import { useState, useEffect } from "react";

// Map iaGuidanceData subject keys to iaEssayStructureData keys
const subjectToStructureKey: Record<string, string> = {
  'biology': 'biology-ia',
  'chemistry': 'chemistry-ia',
  'physics': 'physics-ia',
  'business-management': 'business-management-ia',
  'economics': 'economics-ia',
  'psychology': 'psychology-ia',
  'computer_science': 'computer-science-ia',
  'history': 'history-ia',
  'geography': 'geography-ia',
  'math-aa': 'math-aa-ia',
  'math-ai': 'math-ai-ia',
};

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

export default function IAWritingGuide() {
  const { subject, section } = useParams();
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const subjectData = subject ? iaGuidanceData[subject] : null;

  // SEO optimization - dynamic based on subject
  useSEO(subject === 'biology' ? 'biology' : 
         subject === 'chemistry' ? 'chemistry' :
         subject === 'business-management' ? 'business' :
         subject === 'economics' ? 'economics' :
         subject === 'physics' ? 'physics' :
         subject === 'mathematics' ? 'mathematics' :
         subject === 'history' ? 'history' :
         subject === 'psychology' ? 'psychology' : 'iaGuides');

  if (!subjectData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <div className="container max-w-4xl mx-auto px-6 py-16">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Subject Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The requested subject is not available. Please choose from the available IA guides.
              </p>
              <Button onClick={() => navigate("/homepage/ia-guides")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to IA Guides
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If viewing a specific section
  if (section && subjectData.sections[section]) {
    const sectionData = subjectData.sections[section];
    const sectionKeys = Object.keys(subjectData.sections);
    const currentIndex = sectionKeys.indexOf(section);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <header className="sr-only">
          <h1>{subjectData.title} - {sectionData.title} - Complete IA Writing Guide</h1>
        </header>

        <div className="flex">
          {/* Sticky Navigation Sidebar */}
          {sidebarVisible && (
            <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
              <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto p-6">
                <Card className="shadow-soft">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Guide Sections</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setSidebarVisible(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {subjectData.title}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-1 pt-0">
                    {sectionKeys.map((key, index) => {
                      const secData = subjectData.sections[key];
                      const isActive = key === section;
                      return (
                        <button
                          key={key}
                          onClick={() => navigate(`/homepage/ia-guides/${subject}/${key}`)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground font-medium'
                              : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold">{index + 1}</span>
                            <span className="line-clamp-2">{secData.title}</span>
                          </div>
                        </button>
                      );
                    })}
                    <div className="pt-3 mt-3 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => navigate(`/homepage/ia-guides/${subject}`)}
                      >
                        <ArrowLeft className="mr-2 h-3 w-3" />
                        Back to Overview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Progress Indicator */}
                <Card className="shadow-soft mt-4">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{Math.round(((currentIndex + 1) / sectionKeys.length) * 100)}%</span>
                      </div>
                      <Progress value={((currentIndex + 1) / sectionKeys.length) * 100} />
                      <p className="text-xs text-muted-foreground">
                        Section {currentIndex + 1} of {sectionKeys.length}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="container max-w-4xl mx-auto px-6 py-16 space-y-8">
              {/* Show sidebar toggle when hidden */}
              {!sidebarVisible && (
                <div className="hidden lg:block">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSidebarVisible(true)}
                    className="mb-4"
                  >
                    <Menu className="mr-2 h-4 w-4" />
                    Show Navigation
                  </Button>
                </div>
              )}

              {/* Header */}
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/homepage/ia-guides/${subject}`)}
                  className="lg:hidden"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {subjectData.title}: {sectionData.title}
                  </h1>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{subjectData.weighting}</Badge>
                    <Badge variant="outline">{subjectData.wordCount}</Badge>
                  </div>
                </div>
              </div>

          {/* Section Content */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">{sectionData.content}</p>
            </CardContent>
          </Card>

          {/* Tips and Common Mistakes */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  Key Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {sectionData.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  Common Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {sectionData.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => navigate(`/homepage/ia-guides/${subject}`)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to {subjectData.title} Overview
                </Button>
                <Button onClick={() => navigate("/homepage/ia-guides")}>
                  View All IA Guides
                </Button>
              </div>
            </CardContent>
          </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main subject overview page
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <header className="sr-only">
        <h1>{subjectData.title} IA Writing Guide - Complete Guide with Examples and Tips</h1>
      </header>

      <div className="container max-w-6xl mx-auto px-6 py-16 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <BackButton
            fallbackPath="/homepage/ia-guides"
            size="icon"
            tooltip="Back to IA Guides"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{subjectData.title} IA Writing Guide</h1>
            <p className="text-xl text-muted-foreground mb-4">{subjectData.description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-sm">
                {subjectData.weighting}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {subjectData.wordCount}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="criteria">Assessment Criteria</TabsTrigger>
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="sections">Writing Guide</TabsTrigger>
            <TabsTrigger value="examples">Sample Questions</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>What is the {subjectData.title} IA?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">{subjectData.description}</p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">{subjectData.weighting}</div>
                    <div className="text-sm text-muted-foreground">of final grade</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">{subjectData.wordCount}</div>
                    <div className="text-sm text-muted-foreground">word limit</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">{Object.keys(subjectData.assessmentCriteria).length}</div>
                    <div className="text-sm text-muted-foreground">assessment criteria</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="criteria" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(subjectData.assessmentCriteria).map(([criterion, details]) => (
                <Card key={criterion} className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Criterion {criterion}: {details.name}</span>
                      <Badge variant="secondary">{details.marks}</Badge>
                    </CardTitle>
                    <p className="text-muted-foreground">{details.description}</p>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3">Key Points for Success:</h4>
                    <ul className="space-y-2">
                      {details.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            {(() => {
              const structureKey = subject ? subjectToStructureKey[subject] : null;
              const structureData = structureKey ? iaEssayStructureData[structureKey] : null;
              
              if (!structureData) {
                return (
                  <Card className="shadow-soft">
                    <CardContent className="py-12 text-center">
                      <List className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">Structure Guide Coming Soon</h3>
                      <p className="text-muted-foreground">
                        The detailed structure guide for this subject is currently being developed.
                      </p>
                    </CardContent>
                  </Card>
                );
              }
              
              return (
                <>
                  {/* Format Requirements */}
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Format Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-sm text-muted-foreground">Font</div>
                          <div className="font-medium">{structureData.formatRequirements.font}</div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-sm text-muted-foreground">Font Size</div>
                          <div className="font-medium">{structureData.formatRequirements.fontSize}</div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-sm text-muted-foreground">Line Spacing</div>
                          <div className="font-medium">{structureData.formatRequirements.lineSpacing}</div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-sm text-muted-foreground">Margins</div>
                          <div className="font-medium">{structureData.formatRequirements.margins}</div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-4">
                        <Badge variant="secondary">{structureData.totalWordCount}</Badge>
                        {structureData.pageLimit && <Badge variant="outline">{structureData.pageLimit}</Badge>}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Structure Sections */}
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <List className="h-5 w-5" />
                        Required Sections
                      </CardTitle>
                      <p className="text-muted-foreground">
                        Follow this structure for your {structureData.assessmentType}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {structureData.structure.map((section, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-card">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                              {index + 1}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{section.heading}</h4>
                                {section.wordCount && (
                                  <Badge variant="outline" className="text-xs">{section.wordCount}</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{section.description}</p>
                              {section.subheadings && section.subheadings.length > 0 && (
                                <div className="mt-2 pl-4 border-l-2 border-muted">
                                  <p className="text-xs text-muted-foreground mb-1">Suggested subheadings:</p>
                                  <ul className="text-sm space-y-1">
                                    {section.subheadings.map((sub, i) => (
                                      <li key={i} className="text-muted-foreground">• {sub}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {section.tips.length > 0 && (
                                <div className="mt-3 space-y-1">
                                  {section.tips.map((tip, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm">
                                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>{tip}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Common Mistakes & Examiner Tips */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="shadow-soft">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <AlertTriangle className="h-5 w-5" />
                          Common Mistakes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {structureData.commonMistakes.map((mistake, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span>{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="shadow-soft">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <CheckCircle className="h-5 w-5" />
                          Examiner Tips
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {structureData.examinerTips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Bibliography Requirements */}
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle>Bibliography Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 mb-3">
                        <Badge variant={structureData.bibliography.required ? "default" : "secondary"}>
                          {structureData.bibliography.required ? "Required" : "Optional"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Style: {structureData.bibliography.style}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{structureData.bibliography.notes}</p>
                    </CardContent>
                  </Card>
                </>
              );
            })()}
          </TabsContent>

          <TabsContent value="sections" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(subjectData.sections).map(([sectionKey, sectionData]) => (
                <Card key={sectionKey} className="shadow-soft cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => navigate(`/homepage/ia-guides/${subject}/${sectionKey}`)}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {sectionData.title}
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{sectionData.content}</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {sectionData.tips.length} tips
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {sectionData.commonMistakes.length} common mistakes
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Sample Research Questions</CardTitle>
                <p className="text-muted-foreground">
                  Here are examples of strong research questions for {subjectData.title} IAs:
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subjectData.sampleQuestions.map((question, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                      <p className="font-medium">{question}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  IA Timeline & Planning
                </CardTitle>
                <p className="text-muted-foreground">
                  Recommended timeline for completing your {subjectData.title} IA successfully:
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjectData.timeline.map((phase, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{phase.phase}</h3>
                            <Badge variant="outline">{phase.duration}</Badge>
                          </div>
                          <ul className="space-y-1">
                            {phase.activities.map((activity, actIndex) => (
                              <li key={actIndex} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {index < subjectData.timeline.length - 1 && (
                        <div className="absolute left-4 top-10 w-0.5 h-6 bg-border" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="references" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Official IB Sources
                </CardTitle>
                <p className="text-muted-foreground">
                  This guide is based on official International Baccalaureate documents and assessment procedures.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Primary Reference</h4>
                  <CitationCard citation={subjectData.officialGuide} isMain={true} />
                </div>
                
                {subjectData.additionalReferences && subjectData.additionalReferences.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Additional References</h4>
                    <div className="space-y-2">
                      {subjectData.additionalReferences.map((citation, index) => (
                        <CitationCard key={index} citation={citation} />
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">Disclaimer</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    This content is based on official IB documents but is not endorsed by the International Baccalaureate Organization. 
                    Students should always refer to the most current official IB guides and consult with their teachers for the most up-to-date requirements.
                  </p>
                </div>
                
                <div className="text-center">
                  <Button variant="outline" onClick={() => window.open('https://www.ibo.org/', '_blank')}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Official IB Website
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="shadow-soft bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Need Help with Your IA?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Use our AI-powered writing tools to plan, draft, and refine your Internal Assessment. 
                Get personalized feedback and guidance throughout your research process.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Button size="lg" onClick={() => navigate("/work")}>
                  Start Writing Your IA
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/homepage/ia-guides")}>
                  View All IA Guides
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}