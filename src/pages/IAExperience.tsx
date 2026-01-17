import { BookOpen, ExternalLink, Lightbulb, Target, Users, Award, Clock } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArticleWrapper } from "@/components/seo/ArticleWrapper";

export default function IAExperience() {
  const navigate = useNavigate();

  return (
    <ArticleWrapper
      title="The IA Writing Experience - Complete Internal Assessment Guide"
      description="Understanding what the Internal Assessment is all about and how to approach it successfully. Learn about IA structure, timeline, grading, and best practices for IB students."
      datePublished="2024-02-10T00:00:00Z"
      dateModified="2024-12-24T00:00:00Z"
      category="IB Internal Assessment"
      keywords={[
        "IB Internal Assessment",
        "IA writing",
        "IB IA guide",
        "internal assessment tips",
        "IB research",
        "IA experience",
        "IB Diploma",
        "subject IA"
      ]}
    >
      <BackButton fallbackPath="/homepage/ia-guides" className="mb-6" />
      
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold">The IA Writing Experience</h1>
        </div>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Understanding what the Internal Assessment is all about and how to approach it successfully.
        </p>
      </header>

      <div className="space-y-12">
        {/* Overview */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            What is an Internal Assessment?
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            The Internal Assessment (IA) is a crucial component of your IB Diploma Programme, representing 
            a significant portion of your final grade in most subjects. It's your opportunity to demonstrate 
            independent research, critical thinking, and analytical skills on a topic of your choice within 
            your subject area.
          </p>
          
          <div className="bg-primary/5 p-8 rounded-lg border-l-4 border-primary space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <Target className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg mb-1">Purpose</p>
                  <p className="text-muted-foreground">Demonstrate subject mastery through independent investigation</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg mb-1">Timeline</p>
                  <p className="text-muted-foreground">Typically completed over several months in Year 2</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Award className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg mb-1">Weighting</p>
                  <p className="text-muted-foreground">Usually 20-25% of your final grade</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Users className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg mb-1">Support</p>
                  <p className="text-muted-foreground">Supervised by your subject teacher with guidance</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Journey */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
            The IA Journey: What to Expect
          </h2>
          <p className="text-lg mb-6">The IA process is a learning experience that develops essential academic skills.</p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-2">1. Topic Selection</h3>
              <p className="leading-relaxed">
                Choose a topic that genuinely interests you and has enough scope for investigation. 
                The best IAs come from authentic curiosity and personal connection to the subject matter.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-2">2. Research & Planning</h3>
              <p className="leading-relaxed">
                Conduct background research, develop your research question, and plan your methodology. 
                This phase is crucial for setting a strong foundation for your investigation.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-2">3. Data Collection & Analysis</h3>
              <p className="leading-relaxed">
                Gather your data through experiments, surveys, or other appropriate methods. 
                Apply relevant analytical techniques to extract meaningful insights from your findings.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-2">4. Writing & Refinement</h3>
              <p className="leading-relaxed">
                Write your IA following the subject-specific structure and criteria. 
                Multiple drafts and revisions are expected - this is where your argument crystallizes.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-2">5. Final Submission</h3>
              <p className="leading-relaxed">
                Polish your work, ensure all requirements are met, and submit on time. 
                Your teacher will assess it internally before it may be moderated by the IB.
              </p>
            </div>
          </div>
        </section>

        {/* Key Skills */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
            Key Skills You'll Develop
          </h2>
          
          <div className="bg-purple-50/50 dark:bg-purple-950/20 p-8 rounded-lg space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Scientific Method</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Data Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Academic Writing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Critical Thinking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Research Methods</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Time Management</span>
              </div>
            </div>
          </div>
        </section>

        {/* External Resources */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-accent-600 dark:text-accent-400">
            Learn from Past Examples
          </h2>
          <p className="text-lg mb-6">See high-scoring IA examples to understand what excellence looks like.</p>
          
          <div className="bg-accent/10 p-8 rounded-lg border-l-4 border-accent space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Clastify</h3>
              <p className="leading-relaxed mb-4">
                Browse thousands of exemplar IB Internal Assessments across all subjects. 
                See real examples with examiner feedback and learn from top-scoring work.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1.5">•</span>
                  <span>Filter by subject and grade achieved</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1.5">•</span>
                  <span>Read examiner comments and feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1.5">•</span>
                  <span>Understand what makes a high-scoring IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1.5">•</span>
                  <span>Get inspiration for your own investigation</span>
                </li>
              </ul>
              <Button variant="default" asChild>
                <a 
                  href="https://www.clastify.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Visit Clastify
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="bg-background/50 p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground italic">
                <strong>Tip:</strong> While examples are helpful for understanding structure and expectations, 
                remember that your IA must be entirely your own original work. Use examples for 
                guidance on formatting and approach, not to copy content or ideas.
              </p>
            </div>
          </div>
        </section>

        {/* Back to Guides */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Continue Your Journey</h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button 
              onClick={() => navigate('/homepage/ia-guides')}
              className="text-left p-6 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <BookOpen className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-2">IA Writing Guides</h3>
              <p className="text-sm text-muted-foreground">Subject-specific guidance</p>
            </button>
            
            <button 
              onClick={() => navigate('/homepage/grade-boundaries')}
              className="text-left p-6 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <Award className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Grade Boundaries</h3>
              <p className="text-sm text-muted-foreground">IA grade conversion</p>
            </button>
            
            <button 
              onClick={() => navigate('/homepage/exam-resources')}
              className="text-left p-6 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <Target className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Exam Resources</h3>
              <p className="text-sm text-muted-foreground">Study materials</p>
            </button>
          </div>
        </section>
      </div>
    </ArticleWrapper>
  );
}
