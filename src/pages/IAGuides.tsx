import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Award, FileText, List } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/use-seo";
import { ArticleWrapper } from "@/components/seo/ArticleWrapper";
import { SchoolProgramPrompt } from "@/components/prompts/SchoolProgramPrompt";

export default function IAGuides() {
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
  
  // SEO optimization
  useSEO('iaGuides');

  const subjectGroups = [
    {
      title: "Group 1: Studies in Language and Literature",
      subjects: [
        { name: "Language A: Language and Literature", path: "/homepage/ia-guides/language_a_lang_lit" },
        { name: "Language A: Literature", path: "/homepage/ia-guides/language_a_literature" },
      ]
    },
    {
      title: "Group 2: Language Acquisition",
      subjects: [
        { name: "Language B", path: "/homepage/ia-guides/language_b" },
        { name: "Language Ab Initio", path: "/homepage/ia-guides/ab_initio" },
      ]
    },
    {
      title: "Group 3: Individuals and Societies",
      subjects: [
        { name: "Business Management", path: "/homepage/ia-guides/business-management" },
        { name: "Economics", path: "/homepage/ia-guides/economics" },
        { name: "Psychology", path: "/homepage/ia-guides/psychology" },
        { name: "History", path: "/homepage/ia-guides/history" },
        { name: "Geography", path: "/homepage/ia-guides/geography" },
        { name: "Global Politics", path: "/homepage/ia-guides/global_politics" },
        { name: "Philosophy", path: "/homepage/ia-guides/philosophy" },
      ]
    },
    {
      title: "Group 4: Sciences",
      subjects: [
        { name: "Biology", path: "/homepage/ia-guides/biology" },
        { name: "Chemistry", path: "/homepage/ia-guides/chemistry" },
        { name: "Physics", path: "/homepage/ia-guides/physics" },
        { name: "Computer Science", path: "/homepage/ia-guides/computer_science" },
        { name: "Design Technology", path: "/homepage/ia-guides/design_technology" },
        { name: "Environmental Systems and Societies (ESS)", path: "/homepage/ia-guides/environmental_systems" },
        { name: "Sports, Exercise and Health Science (SEHS)", path: "/homepage/ia-guides/sehs" },
      ]
    },
    {
      title: "Group 5: Mathematics",
      subjects: [
        { name: "Mathematics: Analysis and Approaches (AA)", path: "/homepage/ia-guides/math_aa" },
        { name: "Mathematics: Applications and Interpretation (AI)", path: "/homepage/ia-guides/math_ai" },
      ]
    },
    {
      title: "Group 6: The Arts",
      subjects: [
        { name: "Visual Arts", path: "/homepage/ia-guides/visual_arts" },
        { name: "Music", path: "/homepage/ia-guides/music" },
        { name: "Theatre", path: "/homepage/ia-guides/theatre" },
        { name: "Film", path: "/homepage/ia-guides/film" },
        { name: "Dance", path: "/homepage/ia-guides/dance" },
      ]
    }
  ];

  return (
    <ArticleWrapper
      title="IB Internal Assessment Guides - Complete IA Writing Help for All Subjects"
      description="Step-by-step writing guidance for IB Internal Assessments in all subjects. Learn IA requirements, structure, and assessment criteria for Business, Economics, Sciences, Arts and more."
      datePublished="2024-02-01T00:00:00Z"
      dateModified="2024-12-24T00:00:00Z"
      category="IB Internal Assessment"
      keywords={[
        "IB Internal Assessment",
        "IA guides",
        "IA writing",
        "Biology IA",
        "Chemistry IA",
        "Economics IA",
        "Business Management IA",
        "IB coursework"
      ]}
    >
      <BackButton fallbackPath="/" className="mb-6" />
      
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold">IB Internal Assessment Guides</h1>
        </div>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Step-by-step writing guidance for all IB subjects.
        </p>
      </header>

      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            What is an Internal Assessment (IA)?
          </h2>
          
          <p className="text-lg leading-relaxed mb-6">
            The Internal Assessment (IA) is a significant piece of coursework completed during your IB Diploma Programme 
            that contributes 20-25% of your final grade in most subjects. It's your opportunity to demonstrate deep 
            understanding through independent research and investigation.
          </p>
          
          <div className="bg-blue-50/50 dark:bg-blue-950/20 p-8 rounded-lg space-y-4">
            <p className="font-medium text-lg">Each subject has unique IA requirements, but all assessments evaluate:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1.5">•</span>
                <span>Personal engagement with the topic and research question</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1.5">•</span>
                <span>Exploration of relevant concepts and methodology</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1.5">•</span>
                <span>Analysis and evaluation of collected data or evidence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1.5">•</span>
                <span>Communication of ideas with proper structure and citations</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Why IAs Matter */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
            Why Your IA Matters
          </h2>
          
          <p className="text-lg mb-6">Internal Assessments are crucial for several reasons beyond your IB grade:</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-green-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-2">University Applications</h3>
              <p className="leading-relaxed">IAs demonstrate research skills and academic independence valued by universities worldwide.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-2">Significant Weight</h3>
              <p className="leading-relaxed">Contributing 20-25% to your final grade, a strong IA can push you to the next grade boundary.</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-2">Skill Development</h3>
              <p className="leading-relaxed">Develop critical thinking, research methodology, and academic writing skills for university.</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-2">Personal Interest</h3>
              <p className="leading-relaxed">Choose topics you're passionate about, making learning more engaging and meaningful.</p>
            </div>
          </div>
        </section>

        {/* Quick Links to Structure Guides */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <List className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-3 flex-1">
              <h2 className="text-xl font-bold">IA & Essay Structure Guides</h2>
              <p className="text-muted-foreground">
                Each IA guide below includes a "Structure" tab with exact headings, formatting requirements, and word count breakdowns.
                You can also browse all structure guides in one place.
              </p>
              <Button onClick={() => navigate("/homepage/ia-structure")} variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Browse All Structure Guides
              </Button>
            </div>
          </div>
        </section>

        {/* Subject Groups */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
            IA Guides by Subject
          </h2>
          <p className="text-lg mb-8">
            Select your subject below to view comprehensive IA writing guidance including assessment criteria, 
            sample research questions, common pitfalls, and step-by-step timelines.
          </p>

          {/* Info Notice */}
          <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border-l-4 border-blue-500 mb-8">
            <p className="leading-relaxed">
              <strong>Complete Coverage:</strong> We now have detailed IA guides for all six IB subject groups, 
              covering Languages, Individuals and Societies, Sciences, Mathematics, and The Arts.
            </p>
          </div>
          
          <div className="space-y-8">
            {subjectGroups.map((group, index) => (
              <div key={index} className="border-l-4 border-primary pl-8 py-6">
                <h3 className="text-2xl font-bold mb-6">{group.title}</h3>
                <div className="grid gap-3">
                  {group.subjects.map((subject, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleSubjectClick(subject.path)}
                      className="text-left p-4 rounded-lg border bg-card hover:shadow-md transition-shadow hover:border-primary"
                    >
                      <span className="font-medium text-lg">{subject.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <SchoolProgramPrompt 
          open={showProgramPrompt} 
          onOpenChange={setShowProgramPrompt}
          onComplete={handlePromptComplete}
          context="assignment"
        />

        {/* IA Timeline */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-accent-600 dark:text-accent-400">
            Typical IA Timeline
          </h2>
          
          <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 p-8 rounded-lg border-l-4 border-primary">
            <p className="font-semibold text-lg mb-6">Most successful IAs follow this approximate timeline:</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1.5">•</span>
                <span><strong className="font-semibold">Months 1-2:</strong> Topic selection and research question development</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1.5">•</span>
                <span><strong className="font-semibold">Months 2-4:</strong> Research, data collection, and experimentation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1.5">•</span>
                <span><strong className="font-semibold">Months 4-5:</strong> Analysis and evaluation of findings</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1.5">•</span>
                <span><strong className="font-semibold">Month 6:</strong> Writing and formatting the final submission</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1.5">•</span>
                <span><strong className="font-semibold">Final Week:</strong> Proofreading, citations check, and submission</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="text-center space-y-6 bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold">Ready to Start Your IA?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our AI-powered writing tools to plan, research, and write your Internal Assessment with expert guidance.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button size="lg" onClick={() => navigate("/work")}>
                Start Writing
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/homepage/grade")}>
                Grade Your Work
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/homepage/grade-boundaries")}>
                View Grade Boundaries
              </Button>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="text-sm text-muted-foreground text-center leading-relaxed max-w-4xl mx-auto">
          This content has been developed independently and is not endorsed by the International Baccalaureate Organization. 
          IB is a registered trademark of the International Baccalaureate Organization. All IA guidance is based on official 
          IB subject guides including Biology Guide 2025, Chemistry Guide 2025, Business Management Guide 2024, and related documents.
        </p>
      </div>
    </ArticleWrapper>
  );
}