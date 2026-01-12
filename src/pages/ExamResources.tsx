import { BookOpen, ExternalLink, FileText, Target, Brain, Clock } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArticleWrapper } from "@/components/seo/ArticleWrapper";

export default function ExamResources() {
  const navigate = useNavigate();

  return (
    <ArticleWrapper
      title="IB Exam Resources - Past Papers & Revision Materials"
      description="Essential resources for IB exam preparation: past papers, mark schemes, and revision tools. Learn effective study strategies and access official IBO resources."
      datePublished="2024-02-20T00:00:00Z"
      dateModified="2024-12-24T00:00:00Z"
      category="IB Exam Preparation"
      keywords={[
        "IB past papers",
        "IB exam resources",
        "IB revision",
        "mark schemes",
        "exam preparation",
        "IB study materials",
        "specimen papers",
        "IBO resources"
      ]}
    >
      <BackButton fallbackPath="/" className="mb-6" />
      
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold">IB Exam Resources</h1>
        </div>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Essential resources for exam preparation: past papers, mark schemes, and revision tools.
        </p>
      </header>

      <div className="space-y-12">
        {/* Overview */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            Preparing for IB Exams
          </h2>
          
          <p className="text-lg leading-relaxed mb-6">
            Success in IB exams requires thorough preparation using authentic materials. Past papers are 
            invaluable for understanding question formats, time management, and the depth of knowledge required. 
            Combined with comprehensive revision resources, you can build confidence and maximize your performance.
          </p>
          
          <div className="bg-blue-50/50 dark:bg-blue-950/20 p-8 rounded-lg space-y-6">
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex gap-3">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg mb-1">Past Papers</p>
                  <p className="text-muted-foreground">Practice with real exam questions</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg mb-1">Mark Schemes</p>
                  <p className="text-muted-foreground">Understand grading criteria</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg mb-1">Study Materials</p>
                  <p className="text-muted-foreground">Comprehensive revision guides</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Study Tips */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
            Effective Study Strategies
          </h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-2">1. Start Early</h3>
              <p className="leading-relaxed">Begin practicing with past papers at least 2-3 months before exams</p>
            </div>
            <div className="border-l-4 border-green-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-2">2. Time Yourself</h3>
              <p className="leading-relaxed">Practice under exam conditions to improve time management</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-2">3. Review Mark Schemes</h3>
              <p className="leading-relaxed">Study what examiners look for in responses and how marks are allocated</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-2">4. Identify Patterns</h3>
              <p className="leading-relaxed">Notice recurring topics and question styles across different years</p>
            </div>
          </div>
        </section>

        {/* Resource 1: IBDocuments */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
            IBDocs.re - Past Papers Repository
          </h2>
          <p className="text-lg mb-6">Comprehensive collection of IB past papers and mark schemes.</p>
          
          <div className="bg-accent/10 p-8 rounded-lg border-l-4 border-accent space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">What's Available</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1.5">•</span>
                  <span>Past papers from all IB Diploma subjects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1.5">•</span>
                  <span>Mark schemes and examiner reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1.5">•</span>
                  <span>Papers from multiple years and exam sessions (May/November)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1.5">•</span>
                  <span>Both SL and HL materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1.5">•</span>
                  <span>Specimen papers for new curricula</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background/50 p-4 rounded-lg border">
              <p className="font-medium mb-3">How to Use:</p>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Navigate to your subject and level (SL/HL)</li>
                <li>Download past papers by year and session</li>
                <li>Review corresponding mark schemes after attempting questions</li>
                <li>Read examiner reports to understand common mistakes</li>
              </ol>
            </div>
            
            <Button variant="default" asChild>
              <a 
                href="https://ibdocs.re" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Visit IBDocs.re
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* Resource 2: Revision Dojo */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-orange-600 dark:text-orange-400">
            Revision Dojo - Interactive Study Platform
          </h2>
          <p className="text-lg mb-6">Question banks, flashcards, and study tools for comprehensive revision.</p>
          
          <div className="bg-orange-50/50 dark:bg-orange-950/20 p-8 rounded-lg border-l-4 border-orange-500 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Features & Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1.5">•</span>
                  <span>Organized question banks sorted by topic and difficulty</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1.5">•</span>
                  <span>Interactive flashcards for key concepts and definitions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1.5">•</span>
                  <span>Progress tracking to identify weak areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1.5">•</span>
                  <span>Detailed explanations for answers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1.5">•</span>
                  <span>Covers multiple IB subjects with focused content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1.5">•</span>
                  <span>Regular updates with new questions and materials</span>
                </li>
              </ul>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-background/50 p-4 rounded-lg border">
                <p className="font-medium mb-1">Best For</p>
                <p className="text-sm text-muted-foreground">Topic-specific practice and active recall</p>
              </div>
              <div className="bg-background/50 p-4 rounded-lg border">
                <p className="font-medium mb-1">Focus Areas</p>
                <p className="text-sm text-muted-foreground">Sciences, Mathematics, Economics</p>
              </div>
            </div>
            
            <Button variant="default" asChild>
              <a 
                href="https://revisiondojo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Visit Revision Dojo
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-accent-600 dark:text-accent-400">
            Making the Most of These Resources
          </h2>
          
          <div className="space-y-4">
            <div className="bg-accent/5 p-6 rounded-lg border-l-4 border-accent">
              <h3 className="font-semibold text-lg mb-2">Create a Study Schedule</h3>
              <p className="text-muted-foreground">Plan which papers to complete each week leading up to exams</p>
            </div>
            <div className="bg-accent/5 p-6 rounded-lg border-l-4 border-accent">
              <h3 className="font-semibold text-lg mb-2">Mix Old and Recent Papers</h3>
              <p className="text-muted-foreground">Combine older papers for practice with recent ones for current format</p>
            </div>
            <div className="bg-accent/5 p-6 rounded-lg border-l-4 border-accent">
              <h3 className="font-semibold text-lg mb-2">Self-Mark Honestly</h3>
              <p className="text-muted-foreground">Use mark schemes rigorously to identify areas for improvement</p>
            </div>
            <div className="bg-accent/5 p-6 rounded-lg border-l-4 border-accent">
              <h3 className="font-semibold text-lg mb-2">Study Groups</h3>
              <p className="text-muted-foreground">Discuss challenging questions with peers for deeper understanding</p>
            </div>
          </div>
        </section>

        {/* Important Note */}
        <section>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-8 rounded-lg border-l-4 border-yellow-500">
            <div className="flex gap-4">
              <div className="text-4xl">⚠️</div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Academic Integrity</h3>
                <p className="leading-relaxed">
                  These resources are for practice and revision purposes only. Always follow your school's 
                  policies regarding past paper use. Never submit past paper solutions as your own work in 
                  assessments or use them inappropriately during exam preparation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <div className="flex justify-center pt-8">
          <BackButton 
            fallbackPath="/"
            variant="outline" 
            label="Back to Home"
            className="gap-2"
          />
        </div>
      </div>
    </ArticleWrapper>
  );
}
