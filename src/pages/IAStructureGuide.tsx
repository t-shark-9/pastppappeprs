import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  BookOpen, 
  List, 
  AlertTriangle, 
  Lightbulb, 
  ChevronRight,
  CheckCircle2,
  Clock,
  FileEdit,
  GraduationCap
} from "lucide-react";
import iaEssayStructureData, { SubjectStructure, StructureSection } from "@/data/iaEssayStructureData";

// Subject navigation data organized by group
const subjectGroups = [
  {
    group: "Group 1: Language & Literature",
    subjects: [
      { id: "english-a-literature-hl-essay", name: "English A: Literature HL Essay" },
      { id: "english-a-literature-paper-1", name: "English A: Literature Paper 1" },
    ]
  },
  {
    group: "Group 2: Language Acquisition",
    subjects: [
      { id: "language-b-written-assignment", name: "Language B Written Assignment" },
    ]
  },
  {
    group: "Group 3: Individuals & Societies",
    subjects: [
      { id: "history-ia", name: "History IA" },
      { id: "economics-ia", name: "Economics IA Portfolio" },
      { id: "geography-ia", name: "Geography IA" },
      { id: "psychology-ia", name: "Psychology IA" },
      { id: "business-management-ia", name: "Business Management IA" },
    ]
  },
  {
    group: "Group 4: Sciences",
    subjects: [
      { id: "biology-ia", name: "Biology IA" },
      { id: "chemistry-ia", name: "Chemistry IA" },
      { id: "physics-ia", name: "Physics IA" },
      { id: "computer-science-ia", name: "Computer Science IA" },
    ]
  },
  {
    group: "Group 5: Mathematics",
    subjects: [
      { id: "math-aa-ia", name: "Math AA Exploration" },
      { id: "math-ai-ia", name: "Math AI Exploration" },
    ]
  },
  {
    group: "Core Requirements",
    subjects: [
      { id: "extended-essay", name: "Extended Essay" },
      { id: "tok-essay", name: "TOK Essay" },
    ]
  }
];

function StructureSectionCard({ section, index }: { section: StructureSection; index: number }) {
  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
          {index + 1}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-lg">{section.heading}</h4>
            {section.wordCount && (
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {section.wordCount}
              </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground">{section.description}</p>
          
          {section.subheadings && section.subheadings.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-muted-foreground mb-1">Suggested subheadings:</p>
              <div className="flex flex-wrap gap-1">
                {section.subheadings.map((sub, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {sub}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {section.tips.length > 0 && (
            <div className="mt-3 space-y-1">
              <p className="text-sm font-medium flex items-center gap-1">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                Tips:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-5">
                {section.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SubjectStructureView({ data }: { data: SubjectStructure }) {
  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge>{data.assessmentType}</Badge>
            <Badge variant="secondary">{data.weighting}</Badge>
          </div>
          <CardTitle className="text-2xl mt-2">{data.subject}</CardTitle>
          <CardDescription className="text-lg">
            Word Limit: <strong>{data.totalWordCount}</strong>
            {data.pageLimit && <> | Page Limit: <strong>{data.pageLimit}</strong></>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Format Requirements */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <FileEdit className="w-4 h-4" />
              Formatting Requirements
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Font:</span>
                <p className="font-medium">{data.formatRequirements.font}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Size:</span>
                <p className="font-medium">{data.formatRequirements.fontSize}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Spacing:</span>
                <p className="font-medium">{data.formatRequirements.lineSpacing}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Margins:</span>
                <p className="font-medium">{data.formatRequirements.margins}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Structure Sections */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <List className="w-5 h-5" />
          Required Structure & Headings
        </h3>
        <div className="space-y-4">
          {data.structure.map((section, index) => (
            <StructureSectionCard key={index} section={section} index={index} />
          ))}
        </div>
      </div>

      {/* Bibliography & Appendices */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Bibliography */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Bibliography
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <span className="text-muted-foreground">Required:</span>{" "}
              <Badge variant={data.bibliography.required ? "default" : "secondary"}>
                {data.bibliography.required ? "Yes" : "No"}
              </Badge>
            </p>
            <p>
              <span className="text-muted-foreground">Citation Style:</span>{" "}
              <span className="font-medium">{data.bibliography.style}</span>
            </p>
            <p className="text-sm text-muted-foreground">{data.bibliography.notes}</p>
          </CardContent>
        </Card>

        {/* Appendices */}
        {data.appendices && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Appendices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <span className="text-muted-foreground">Allowed:</span>{" "}
                <Badge variant={data.appendices.allowed ? "default" : "secondary"}>
                  {data.appendices.allowed ? "Yes" : "No"}
                </Badge>
              </p>
              {data.appendices.allowed && data.appendices.includes.length > 0 && (
                <div>
                  <span className="text-muted-foreground">May include:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.appendices.includes.map((item, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{item}</Badge>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-sm text-muted-foreground">{data.appendices.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Common Mistakes & Tips */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Common Mistakes */}
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-5 h-5" />
              Common Mistakes to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Examiner Tips */}
        <Card className="border-green-200 dark:border-green-900">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-green-600 dark:text-green-400">
              <GraduationCap className="w-5 h-5" />
              Examiner Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.examinerTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Subject Index Page
function SubjectIndex() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold">IA & Essay Structure Guides</h1>
        <p className="text-lg text-muted-foreground">
          Complete structural requirements, heading outlines, and layout guidelines for all IB Internal Assessments and essays.
        </p>
      </div>

      <div className="grid gap-6">
        {subjectGroups.map((group) => (
          <Card key={group.group}>
            <CardHeader>
              <CardTitle className="text-lg">{group.group}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {group.subjects.map((subject) => (
                  <Link key={subject.id} to={`/homepage/ia-structure/${subject.id}`}>
                    <Button variant="outline" className="w-full justify-between h-auto py-3">
                      <span className="text-left">{subject.name}</span>
                      <ChevronRight className="w-4 h-4 ml-2 flex-shrink-0" />
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Pro Tip</h3>
              <p className="text-muted-foreground text-sm">
                These structure guides are based on official IB requirements. Always check with your teacher 
                for any subject-specific modifications your school may require. Use these outlines as templates 
                when starting your IA or essay.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Main Component
export default function IAStructureGuide() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  
  const subjectData = subjectId ? iaEssayStructureData[subjectId] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <BackButton 
            fallbackPath={subjectId ? "/homepage/ia-structure" : "/homepage"}
            size="icon"
            tooltip={subjectId ? "Back to All Subjects" : "Back to Home"}
          />
          {subjectId && subjectData && (
            <div>
              <p className="text-sm text-muted-foreground">Structure Guide</p>
              <h1 className="text-2xl font-bold">{subjectData.subject}</h1>
            </div>
          )}
        </div>

        {/* Main Content */}
        {subjectId && subjectData ? (
          <SubjectStructureView data={subjectData} />
        ) : subjectId && !subjectData ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">Subject structure guide not found.</p>
              <Button onClick={() => navigate("/homepage/ia-structure")}>
                View All Subjects
              </Button>
            </CardContent>
          </Card>
        ) : (
          <SubjectIndex />
        )}
      </div>
    </div>
  );
}
