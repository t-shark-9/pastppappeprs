import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { BookOpen, GraduationCap, Globe, Users } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import { ArticleWrapper } from "@/components/seo/ArticleWrapper";

export default function EducationalSystems() {
  const navigate = useNavigate();

  const systems = [
    {
      name: "International Baccalaureate (IB)",
      country: "Global",
      duration: "2 years (Grades 11-12)",
      grading: "7-point scale (1-7)",
      maxScore: "45 points",
      subjects: "6 subjects + Core (TOK, EE, CAS)",
      recognition: "Worldwide",
      highlights: ["Global curriculum", "Critical thinking focus", "Internationally recognized"]
    },
    {
      name: "German Abitur",
      country: "Germany",
      duration: "2-3 years (Grades 11-13)",
      grading: "15-point scale (0-15) → Grade 1.0-6.0",
      maxScore: "900 points (≈ Grade 1.0)",
      subjects: "Advanced + Basic courses",
      recognition: "EU + International",
      highlights: ["Subject specialization", "Flexible course selection", "Strong academic preparation"]
    },
    {
      name: "Swedish Gymnasium",
      country: "Sweden",
      duration: "3 years",
      grading: "6-point scale (A-F)",
      maxScore: "Grade A (20 points)",
      subjects: "Core + Programme subjects",
      recognition: "Nordic + EU",
      highlights: ["Flexible programmes", "Work experience focus", "Democratic values emphasis"]
    },
    {
      name: "British A-Levels",
      country: "UK + International",
      duration: "2 years (Grades 12-13)",
      grading: "A*-U scale",
      maxScore: "Multiple A*",
      subjects: "3-4 subjects typically",
      recognition: "Commonwealth + International",
      highlights: ["Subject depth", "University preparation", "Flexible combinations"]
    },
    {
      name: "IGCSE",
      country: "UK + International",
      duration: "2 years (Grades 9-10)",
      grading: "9-1 scale (9 highest)",
      maxScore: "Grade 9s across subjects",
      subjects: "5-14 subjects typically",
      recognition: "International (pre-university)",
      highlights: ["Foundation level", "Broad curriculum", "Skills-based assessment"]
    }
  ];

  const conversionTable = [
    { ib: "7", abitur: "1.0-1.2", swedish: "A", aLevel: "A*", igcse: "9" },
    { ib: "6", abitur: "1.3-1.7", swedish: "B", aLevel: "A", igcse: "8" },
    { ib: "5", abitur: "1.8-2.5", swedish: "C", aLevel: "B", igcse: "7" },
    { ib: "4", abitur: "2.6-3.5", swedish: "D", aLevel: "C", igcse: "6" },
    { ib: "3", abitur: "3.6-4.5", swedish: "E", aLevel: "D", igcse: "5" },
    { ib: "2", abitur: "4.6-5.5", swedish: "F", aLevel: "E", igcse: "4" },
    { ib: "1", abitur: "6.0", swedish: "F", aLevel: "U", igcse: "3-1" },
  ];

  return (
    <ArticleWrapper
      title="Educational Systems Comparison - IB, Abitur, A-Levels & More"
      description="Understanding different qualification systems worldwide. Compare IB, German Abitur, Swedish Gymnasium, British A-Levels, and IGCSE systems with grade conversion tables."
      datePublished="2024-03-05T00:00:00Z"
      dateModified="2024-12-24T00:00:00Z"
      category="Educational Systems"
      keywords={[
        "IB comparison",
        "educational systems",
        "Abitur vs IB",
        "A-levels comparison",
        "grade conversion",
        "international curriculum",
        "IGCSE",
        "Swedish Gymnasium"
      ]}
    >
      <BackButton fallbackPath="/" className="mb-6" />
      
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold">Educational Systems Comparison</h1>
        </div>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Understanding different qualification systems worldwide.
        </p>
      </header>

      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            Why Compare Educational Systems?
          </h2>
          
          <p className="text-lg leading-relaxed mb-6">
            With globalization and international mobility, understanding different educational systems is crucial for students, parents, and educators. Whether you're planning to study abroad, considering different curricula, or need to convert grades between systems, this guide provides comprehensive information.
          </p>
          
          <div className="bg-blue-50/50 dark:bg-blue-950/20 p-8 rounded-lg space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">University Applications</h3>
                  <p className="text-muted-foreground">Compare qualifications for international university admissions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Grade Conversion</h3>
                  <p className="text-muted-foreground">Understand how grades translate between different systems</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">System Selection</h3>
                  <p className="text-muted-foreground">Choose the right educational path for your goals</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Systems Overview */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
            Educational Systems Overview
          </h2>
          <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
            Educational Systems Overview
          </h2>
          
          <div className="space-y-8">
            {systems.map((system, index) => (
              <div key={index} className="border-l-4 border-primary pl-8 py-6">
                <h3 className="text-2xl font-bold mb-2">{system.name}</h3>
                <p className="text-lg text-muted-foreground mb-6">{system.country} • {system.duration}</p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">Grading</h4>
                    <p className="font-medium">{system.grading}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">Max Score</h4>
                    <p className="font-medium">{system.maxScore}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">Subjects</h4>
                    <p className="font-medium">{system.subjects}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">Recognition</h4>
                    <p className="font-medium">{system.recognition}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {system.highlights.map((highlight, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-md font-medium">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Grade Conversion Table */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
            Grade Conversion Reference
          </h2>
          <p className="text-lg mb-6">
            Approximate grade equivalencies between different systems. Note: Actual conversions may vary by institution and context.
          </p>
          
          <div className="bg-purple-50/50 dark:bg-purple-950/20 p-8 rounded-lg">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">IB Grade</TableHead>
                    <TableHead className="font-semibold">German Abitur</TableHead>
                    <TableHead className="font-semibold">Swedish Grade</TableHead>
                    <TableHead className="font-semibold">A-Level</TableHead>
                    <TableHead className="font-semibold">IGCSE</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conversionTable.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.ib}</TableCell>
                      <TableCell>{row.abitur}</TableCell>
                      <TableCell>{row.swedish}</TableCell>
                      <TableCell>{row.aLevel}</TableCell>
                      <TableCell>{row.igcse}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 p-4 bg-background/50 rounded-lg border">
              <p className="text-sm text-muted-foreground">
                <strong>Important:</strong> These are general equivalencies. Always check specific university requirements and use official grade conversion tools when applying to institutions. Some universities may have their own conversion scales or additional requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed System Information */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-orange-600 dark:text-orange-400">
            Detailed System Information
          </h2>
          <h2 className="text-3xl font-bold mb-8 text-orange-600 dark:text-orange-400">
            Detailed System Information
          </h2>
          
          {/* IB System */}
          <div className="border-l-4 border-blue-500 pl-8 py-6 mb-8">
            <h3 className="text-2xl font-bold mb-4">International Baccalaureate (IB) Diploma</h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Structure</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span>6 subjects from different groups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span>3 Higher Level (HL) and 3 Standard Level (SL)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span>Core components: TOK, EE, CAS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span>Total: 42 points + 3 bonus points</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Assessment</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span>External examinations (70-80%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span>Internal assessments (20-30%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span>Graded 1-7 per subject</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span>Passing grade: 24 points minimum</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">Global Recognition</h4>
              <p className="leading-relaxed">
                The IB Diploma is recognized by over 5,000 universities worldwide. It's designed to develop international-mindedness and critical thinking skills. Many universities offer advanced standing or credits for IB courses.
              </p>
            </div>
          </div>

          {/* German Abitur */}
          <div className="border-l-4 border-green-500 pl-8 py-6 mb-8">
            <h3 className="text-2xl font-bold mb-4">German Abitur</h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Structure</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1.5">•</span>
                    <span>Qualification phase: 4 semesters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1.5">•</span>
                    <span>Advanced courses (Leistungskurse): 2-3 subjects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1.5">•</span>
                    <span>Basic courses: Multiple subjects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1.5">•</span>
                    <span>Final exams in 4-5 subjects</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Grading</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1.5">•</span>
                    <span>15-point scale (15 = excellent, 0 = fail)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1.5">•</span>
                    <span>Converted to final grade 1.0-6.0</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1.5">•</span>
                    <span>Grade 1.0 = 900 points (maximum)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1.5">•</span>
                    <span>Grade 4.0 = 300 points (minimum to pass)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">University Access</h4>
              <p className="leading-relaxed">
                The Abitur provides general university entrance qualification (Allgemeine Hochschulreife) in Germany. It's also recognized throughout the EU and by many international universities. Some competitive programs require specific grades or additional entrance exams.
              </p>
            </div>
          </div>

          {/* Swedish System */}
          <div className="border-l-4 border-purple-500 pl-8 py-6">
            <h3 className="text-2xl font-bold mb-4">Swedish Gymnasium</h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Structure</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1.5">•</span>
                    <span>3-year upper secondary education</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1.5">•</span>
                    <span>Choice of 18 national programmes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1.5">•</span>
                    <span>Core subjects + programme-specific</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1.5">•</span>
                    <span>Individual choice courses available</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Grading</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1.5">•</span>
                    <span>A-F scale (A-E passing, F failing)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1.5">•</span>
                    <span>Point values: A=20, B=17.5, C=15, D=12.5, E=10</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1.5">•</span>
                    <span>Merit rating calculated from grades</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1.5">•</span>
                    <span>University selection based on merit points</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">Higher Education Access</h4>
              <p className="leading-relaxed">
                Swedish gymnasium certificate provides eligibility for higher education in Sweden and other Nordic countries. Universities use merit ratings and specific subject requirements for admissions. Alternative paths include Swedish Scholastic Aptitude Test (SweSAT).
              </p>
            </div>
          </div>
        </section>

        {/* University Application Tips */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-accent-600 dark:text-accent-400">
            University Application Tips
          </h2>
          
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-lg border-l-4 border-primary">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">For International Applications</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>Research specific university conversion methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>Check if credential evaluation is required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>Prepare official transcripts and translations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>Consider additional standardized tests (SAT, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>Apply early - conversion processes take time</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Resources</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>DAAD Database (German universities)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>UCAS Tariff Calculator (UK universities)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>World Education Services (WES)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>National academic recognition centers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>University international offices</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <div className="text-center space-y-6 bg-muted/30 p-8 rounded-lg">
            <h3 className="text-2xl font-bold">Need Help With Your Academic Journey?</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're working on IB assessments, German Abitur projects, or any other academic qualification, 
              our AI-powered tools can provide personalized guidance and feedback.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button size="lg" onClick={() => navigate("/homepage/grade-boundaries")}>
                View Grade Boundaries
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/work")}>
                Start Writing
              </Button>
            </div>
          </div>
        </section>
      </div>
    </ArticleWrapper>
  );
}