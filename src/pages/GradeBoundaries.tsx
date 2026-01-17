import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SchoolProgramPrompt } from "@/components/prompts/SchoolProgramPrompt";

export default function GradeBoundaries() {
  const navigate = useNavigate();
  const [showProgramPrompt, setShowProgramPrompt] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const handleSubjectClick = (path: string) => {
    // Check if user has already selected a role/program
    const hasRole = localStorage.getItem("tooessay_ghost_user_type");
    
    if (!hasRole) {
      setPendingPath(path);
      setShowProgramPrompt(true);
    } else {
      navigate(path);
    }
  };

  const handlePromptComplete = () => {
    if (pendingPath) {
      navigate(pendingPath);
      setPendingPath(null);
    }
  };

  const subjectGroups = [
    {
      title: "Group 1: Studies in Language and Literature",
      subjects: [
        { name: "English A: Literature", path: "/homepage/grade-boundaries/english-a-literature" },
        { name: "English A: Language and Literature", path: "/homepage/grade-boundaries/english-a-language-literature" },
        { name: "Language A: Literature and Performance", path: "/homepage/grade-boundaries/language-a-literature-performance" },
      ]
    },
    {
      title: "Group 2: Language Acquisition",
      subjects: [
        { name: "Language B (English, Spanish, French, etc.)", path: "/homepage/grade-boundaries/language-b" },
        { name: "Language ab initio", path: "/homepage/grade-boundaries/ab-initio" },
        { name: "Classical Languages (Latin, Greek)", path: "/homepage/grade-boundaries/classical-languages" },
      ]
    },
    {
      title: "Group 3: Individuals and Societies",
      subjects: [
        { name: "Economics", path: "/homepage/grade-boundaries/economics" },
        { name: "Business Management", path: "/homepage/grade-boundaries/business-management" },
        { name: "History", path: "/homepage/grade-boundaries/history" },
        { name: "Geography", path: "/homepage/grade-boundaries/geography" },
        { name: "Psychology", path: "/homepage/grade-boundaries/psychology" },
        { name: "Global Politics", path: "/homepage/grade-boundaries/global-politics" },
        { name: "Philosophy", path: "/homepage/grade-boundaries/philosophy" },
        { name: "Digital Society (ITGS)", path: "/homepage/grade-boundaries/digital-society" },
        { name: "Social and Cultural Anthropology", path: "/homepage/grade-boundaries/anthropology" },
        { name: "World Religions", path: "/homepage/grade-boundaries/world-religions" },
      ]
    },
    {
      title: "Group 4: Sciences",
      subjects: [
        { name: "Biology", path: "/homepage/grade-boundaries/biology" },
        { name: "Chemistry", path: "/homepage/grade-boundaries/chemistry" },
        { name: "Physics", path: "/homepage/grade-boundaries/physics" },
        { name: "Computer Science", path: "/homepage/grade-boundaries/computer-science" },
        { name: "Design Technology", path: "/homepage/grade-boundaries/design-technology" },
        { name: "Environmental Systems and Societies (ESS)", path: "/homepage/grade-boundaries/ess" },
        { name: "Sports, Exercise and Health Science", path: "/homepage/grade-boundaries/sehs" },
      ]
    },
    {
      title: "Group 5: Mathematics",
      subjects: [
        { name: "Mathematics: Analysis and Approaches (AA)", path: "/homepage/grade-boundaries/math-aa" },
        { name: "Mathematics: Applications and Interpretation (AI)", path: "/homepage/grade-boundaries/math-ai" },
      ]
    },
    {
      title: "Group 6: The Arts",
      subjects: [
        { name: "Visual Arts", path: "/homepage/grade-boundaries/visual-arts" },
        { name: "Music", path: "/homepage/grade-boundaries/music" },
        { name: "Theatre", path: "/homepage/grade-boundaries/theatre" },
        { name: "Film", path: "/homepage/grade-boundaries/film" },
        { name: "Dance", path: "/homepage/grade-boundaries/dance" },
      ]
    },
    {
      title: "Core Components",
      subjects: [
        { name: "Theory of Knowledge (TOK)", path: "/homepage/grade-boundaries/tok" },
        { name: "Extended Essay (EE)", path: "/homepage/grade-boundaries/extended-essay" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* SEO Header - Hidden visually but good for SEO */}
      <header className="sr-only">
        <h1>IB Grade Boundaries 2025 - Complete Guide for All Subjects</h1>
      </header>

      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          <BackButton
            fallbackPath="/"
            size="icon"
            tooltip="Back to Home"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">IB Grade Boundaries</h1>
            <p className="text-muted-foreground mt-2">Complete guide for May 2025 examination session</p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="shadow-medium border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">What Are IB Grade Boundaries?</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  IB grade boundaries determine the minimum marks required to achieve each grade (1-7) in your IB subjects. 
                  These boundaries are set by the IB after each examination session and can vary from year to year based on 
                  exam difficulty and overall student performance.
                </p>
                <p>
                  Understanding grade boundaries helps you:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Set realistic target scores for each paper and component</li>
                  <li>Identify which components to focus on for maximum impact</li>
                  <li>Track your progress during revision and mock exams</li>
                  <li>Reduce exam anxiety by knowing exactly what's needed</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How Grade Boundaries Work */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">How IB Grading Works</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  The IB uses criterion-referenced assessment, meaning your grade reflects your achievement against 
                  set standards, not how you compare to other students. Each subject has multiple components 
                  (papers, IAs, orals) that combine into your final grade.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Grade 7 (Excellent)</h3>
                    <p className="text-sm">Typically requires 70-80%+ of total marks. Demonstrates excellent understanding and application.</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Grade 6 (Very Good)</h3>
                    <p className="text-sm">Usually around 60-70%. Shows very good understanding with minor gaps.</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Grade 5 (Good)</h3>
                    <p className="text-sm">Generally 50-60%. Demonstrates good understanding of most concepts.</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Grade 4 (Satisfactory)</h3>
                    <p className="text-sm">Around 40-50%. Shows satisfactory understanding, the minimum passing grade for HL.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject Groups */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Grade Boundaries by Subject</h2>
          <p className="text-muted-foreground">
            Select your subject below to view detailed grade boundaries for each component including papers, 
            internal assessments, and orals.
          </p>
          
          {subjectGroups.map((group, index) => (
            <Card key={index} className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">{group.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {group.subjects.map((subject, subIndex) => (
                    <Button
                      key={subIndex}
                      variant="ghost"
                      className="justify-start h-auto py-3 px-4 text-left hover:bg-muted"
                      onClick={() => handleSubjectClick(subject.path)}
                    >
                      <span className="text-foreground">{subject.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <SchoolProgramPrompt 
          open={showProgramPrompt} 
          onOpenChange={setShowProgramPrompt}
          onComplete={handlePromptComplete}
          context="grading"
        />

        {/* Important Notes */}
        <Card className="shadow-medium bg-gradient-to-br from-warning/5 to-orange-500/5 border-warning/20">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Important Notes</h3>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-1">•</span>
                  <span>Grade boundaries are set after each examination session and may change.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-1">•</span>
                  <span>The boundaries shown are based on recent examination sessions and serve as a guide.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-1">•</span>
                  <span>Internal Assessment (IA) boundaries remain relatively stable across sessions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-1">•</span>
                  <span>Use these as planning tools, not guarantees of specific grades.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Need Help With Your IB Work?</h2>
          <p className="text-muted-foreground">
            Use our AI-powered writing tools to improve your essays, IAs, and Extended Essays.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button size="lg" onClick={() => navigate("/work")}>
              Start Writing
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center">
          This content has been developed independently and is not endorsed by the International Baccalaureate Organization. 
          IB is a registered trademark of the International Baccalaureate Organization.
        </p>
      </div>
    </div>
  );
}
