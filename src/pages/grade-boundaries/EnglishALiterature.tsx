import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export default function EnglishALiteratureGradeBoundaries() {
  const navigate = useNavigate();

  const slBoundaries = [
    { grade: 7, paper1: "14-20", paper2: "22-30", io: "34-40", final: "73-100%" },
    { grade: 6, paper1: "12-13", paper2: "17-21", io: "29-33", final: "60-72%" },
    { grade: 5, paper1: "11", paper2: "12-16", io: "24-28", final: "49-59%" },
    { grade: 4, paper1: "9-10", paper2: "7-11", io: "19-23", final: "35-48%" },
    { grade: 3, paper1: "7-8", paper2: "5-6", io: "13-18", final: "25-34%" },
    { grade: 2, paper1: "4-6", paper2: "3-4", io: "7-12", final: "13-24%" },
    { grade: 1, paper1: "0-3", paper2: "0-2", io: "0-6", final: "0-12%" },
  ];

  const hlBoundaries = [
    { grade: 7, paper1: "28-40", paper2: "22-30", io: "34-40", hlEssay: "18-20", final: "76-100%" },
    { grade: 6, paper1: "24-27", paper2: "17-21", io: "29-33", hlEssay: "15-17", final: "62-75%" },
    { grade: 5, paper1: "20-23", paper2: "12-16", io: "24-28", hlEssay: "13-14", final: "50-61%" },
    { grade: 4, paper1: "16-19", paper2: "7-11", io: "19-23", hlEssay: "10-12", final: "37-49%" },
    { grade: 3, paper1: "13-15", paper2: "5-6", io: "13-18", hlEssay: "7-9", final: "27-36%" },
    { grade: 2, paper1: "7-12", paper2: "3-4", io: "7-12", hlEssay: "4-6", final: "14-26%" },
    { grade: 1, paper1: "0-6", paper2: "0-2", io: "0-6", hlEssay: "0-3", final: "0-13%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* SEO Header */}
      <header className="sr-only">
        <h1>IB English A Literature Grade Boundaries 2025 - SL and HL Complete Guide</h1>
      </header>

      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          <BackButton
            fallbackPath="/grade-boundaries"
            size="icon"
            tooltip="Back to Grade Boundaries"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">IB English A Literature Grade Boundaries</h1>
            <p className="text-muted-foreground mt-2">May 2025 Examination Session</p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="shadow-medium border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Understanding English A Literature Assessment</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  IB English A Literature assesses your ability to analyze literary texts, construct well-argued 
                  interpretations, and communicate ideas effectively. The course is available at both Standard Level (SL) 
                  and Higher Level (HL), with HL students completing additional components.
                </p>
                <p>
                  The grade boundaries below show the approximate marks needed for each grade. Use these to set 
                  realistic targets for your papers, Individual Oral (IO), and HL Essay.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SL Boundaries */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Standard Level (SL) Grade Boundaries</h2>
          
          <Card className="shadow-soft overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-lg">SL Assessment Components</CardTitle>
              <div className="text-sm text-muted-foreground grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                <div>Paper 1: 20 marks (35%)</div>
                <div>Paper 2: 30 marks (35%)</div>
                <div>IO: 40 marks (30%)</div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Grade</TableHead>
                    <TableHead>Paper 1</TableHead>
                    <TableHead>Paper 2</TableHead>
                    <TableHead>Individual Oral</TableHead>
                    <TableHead>Final Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {slBoundaries.map((row) => (
                    <TableRow key={row.grade}>
                      <TableCell className="font-bold">{row.grade}</TableCell>
                      <TableCell>{row.paper1}</TableCell>
                      <TableCell>{row.paper2}</TableCell>
                      <TableCell>{row.io}</TableCell>
                      <TableCell className="font-medium">{row.final}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* HL Boundaries */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Higher Level (HL) Grade Boundaries</h2>
          
          <Card className="shadow-soft overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-lg">HL Assessment Components</CardTitle>
              <div className="text-sm text-muted-foreground grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                <div>Paper 1: 40 marks (35%)</div>
                <div>Paper 2: 30 marks (25%)</div>
                <div>IO: 40 marks (20%)</div>
                <div>HL Essay: 20 marks (20%)</div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Grade</TableHead>
                    <TableHead>Paper 1</TableHead>
                    <TableHead>Paper 2</TableHead>
                    <TableHead>IO</TableHead>
                    <TableHead>HL Essay</TableHead>
                    <TableHead>Final</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hlBoundaries.map((row) => (
                    <TableRow key={row.grade}>
                      <TableCell className="font-bold">{row.grade}</TableCell>
                      <TableCell>{row.paper1}</TableCell>
                      <TableCell>{row.paper2}</TableCell>
                      <TableCell>{row.io}</TableCell>
                      <TableCell>{row.hlEssay}</TableCell>
                      <TableCell className="font-medium">{row.final}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Component Tips */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Tips for Each Component</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Paper 1: Guided Literary Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-2">
                <p>Analyze an unseen literary passage. Focus on:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Clear thesis statement addressing the guiding question</li>
                  <li>Analysis of literary techniques (imagery, symbolism, tone)</li>
                  <li>Well-organized paragraph structure</li>
                  <li>Effective use of quotations as evidence</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Paper 2: Comparative Essay</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-2">
                <p>Compare two works studied in class. Key strategies:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Choose works that offer meaningful comparison points</li>
                  <li>Integrate both works throughout your essay</li>
                  <li>Address the question directly with a clear argument</li>
                  <li>Demonstrate deep knowledge of both texts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Individual Oral (IO)</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-2">
                <p>15-minute oral connecting a literary and non-literary text:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Choose texts with clear thematic connections</li>
                  <li>Practice timing (10 min presentation + 5 min Q&A)</li>
                  <li>Prepare for a range of possible questions</li>
                  <li>Show genuine engagement with both texts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">HL Essay (HL Only)</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-2">
                <p>1,200-1,500 word essay on a work studied. Success tips:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Develop an original, arguable thesis</li>
                  <li>Focus on a specific aspect of the text</li>
                  <li>Use formal academic writing style</li>
                  <li>Include proper citations and bibliography</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Subjects */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Related Grade Boundaries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/homepage/grade-boundaries/english-a-language-literature")}>
                English A: Language and Literature
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/homepage/grade-boundaries/language-b")}>
                Language B
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/homepage/core/extended-essay")}>
                Extended Essay
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/homepage/grade-boundaries")}>
                All Subjects
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Need Help With Your Literature Essays?</h2>
          <p className="text-muted-foreground">
            Use our AI-powered writing tools to structure your literary analysis and get feedback on your essays.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button size="lg" onClick={() => navigate("/work")}>
              Start Writing
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/homepage/grade-boundaries")}>
              View All Subjects
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center">
          Grade boundaries are based on recent IB examination sessions and may vary. This content is not endorsed by 
          the International Baccalaureate Organization. IB is a registered trademark of the IBO.
        </p>
      </div>
    </div>
  );
}
