import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export default function TOKGradeBoundaries() {
  const navigate = useNavigate();

  const data = [
    { grade: "A", range: "22-30", exhibition: "8-10", essay: "14-20" },
    { grade: "B", range: "16-21", exhibition: "6-7", essay: "10-13" },
    { grade: "C", range: "10-15", exhibition: "4-5", essay: "6-9" },
    { grade: "D", range: "4-9", exhibition: "2-3", essay: "2-5" },
    { grade: "E", range: "0-3", exhibition: "0-1", essay: "0-1" },
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
            <h1 className="text-3xl md:text-4xl font-bold">Theory of Knowledge (TOK) Grade Boundaries</h1>
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
                TOK and the Extended Essay combine to give up to 3 core points. 
                Getting an 'E' in either TOK or EE results in a failing condition for the Diploma.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft overflow-hidden">
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-lg">Grade Boundaries</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Total Score: 30 marks (Exhibition: 10 marks | Essay: 20 marks)
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Grade</TableHead>
                    <TableHead>Total Score /30</TableHead>
                    <TableHead>Exhibition (Approx.) /10</TableHead>
                    <TableHead>Essay (Approx.) /20</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.grade}>
                      <TableCell className="font-bold text-lg">{row.grade}</TableCell>
                      <TableCell className="font-medium">{row.range}</TableCell>
                      <TableCell className="text-muted-foreground">{row.exhibition}</TableCell>
                      <TableCell className="text-muted-foreground">{row.essay}</TableCell>
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
                 Tips for High Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-1 text-primary">TOK Exhibition</h3>
                <p className="text-sm text-muted-foreground">
                  Focus on clearly linking your three objects to the prompt. Justify inclusion specifically.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1 text-primary">TOK Essay</h3>
                <p className="text-sm text-muted-foreground">
                  Explore multiple perspectives (AoKs). Use real-world examples, not just hypothetical ones.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-md transition-shadow cursor-pointer border-primary/20 bg-primary/5" onClick={() => navigate("/work")}>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full gap-4">
              <h3 className="font-semibold text-lg">Write Better TOK Essays</h3>
              <p className="text-sm text-muted-foreground">
                Use our AI writing assistant to check your knowledge questions and arguments.
              </p>
              <Button>Start Writing</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
