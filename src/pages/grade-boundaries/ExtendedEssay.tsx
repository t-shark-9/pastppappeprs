import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export default function ExtendedEssayGradeBoundaries() {
  const navigate = useNavigate();

  const data = [
    { grade: "A", range: "27-34", desc: "Excellent Performance" },
    { grade: "B", range: "21-26", desc: "Good Performance" },
    { grade: "C", range: "14-20", desc: "Satisfactory Performance" },
    { grade: "D", range: "7-13", desc: "Mediocre Performance" },
    { grade: "E", range: "0-6", desc: "Elementary Performance" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div className="flex items-center gap-4">
          <BackButton
            fallbackPath="/homepage/grade-boundaries"
            size="icon"
            tooltip="Back to Grade Boundaries"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Extended Essay (EE) Grade Boundaries</h1>
            <p className="text-muted-foreground mt-2">May 2025 Examination Session</p>
          </div>
        </div>

        <Card className="shadow-soft overflow-hidden">
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-lg">Bonus Points Matrix</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
             <div className="prose dark:prose-invert max-w-none">
              <p>
                The Extended Essay is a core component. Combined with TOK, it contributes up to 3 points to your total Diploma score.
                Failure to submit an EE or receiving an 'E' grade will result in failing the Diploma.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft overflow-hidden">
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-lg">Grade Boundaries</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Total Score: 34 marks
            </p>
          </CardHeader>
          <CardContent className="p-0">
             <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Grade</TableHead>
                    <TableHead>Score Range /34</TableHead>
                    <TableHead>Descriptor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.grade}>
                      <TableCell className="font-bold text-lg">{row.grade}</TableCell>
                      <TableCell className="font-medium">{row.range}</TableCell>
                      <TableCell className="text-muted-foreground">{row.desc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-soft h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                 Assessment Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-[auto_1fr] gap-3 text-sm">
                <div className="font-bold text-primary">A</div>
                <div>Focus and Method (6 marks)</div>
                <div className="font-bold text-primary">B</div>
                <div>Knowledge and Understanding (6 marks)</div>
                <div className="font-bold text-primary">C</div>
                <div>Critical Thinking (12 marks)</div>
                <div className="font-bold text-primary">D</div>
                <div>Presentation (4 marks)</div>
                <div className="font-bold text-primary">E</div>
                <div>Engagement (6 marks)</div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-md transition-shadow cursor-pointer border-primary/20 bg-primary/5" onClick={() => navigate("/work")}>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full gap-4">
              <h3 className="font-semibold text-lg">Structure Your EE</h3>
              <p className="text-sm text-muted-foreground">
                Use our specialized Extended Essay templates to organize your 4000 words.
              </p>
              <Button>Start Writing</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
