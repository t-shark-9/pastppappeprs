import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

interface GradeBoundaryRow {
  grade: number;
  [key: string]: string | number;
}

interface GradeBoundaryTableProps {
  title: string;
  subtitle: string;
  headers: string[];
  slData?: GradeBoundaryRow[];
  hlData?: GradeBoundaryRow[];
  slOnly?: GradeBoundaryRow[];
  slComponents?: string;
  hlComponents?: string;
  tips?: { title: string; content: string }[];
  relatedSubjects?: { name: string; path: string }[];
  ctaText?: string;
}

export function GradeBoundaryTemplate({
  title,
  subtitle,
  headers,
  slData,
  hlData,
  slOnly,
  slComponents,
  hlComponents,
  tips,
  relatedSubjects,
  ctaText = "Need help with your coursework?",
}: GradeBoundaryTableProps) {
  const navigate = useNavigate();

  const renderTable = (data: GradeBoundaryRow[], level: string, components?: string) => (
    <Card className="shadow-soft overflow-hidden">
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-lg">{level} Grade Boundaries</CardTitle>
        {components && (
          <p className="text-sm text-muted-foreground mt-2">{components}</p>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header, i) => (
                  <TableHead key={i} className={i === 0 ? "w-16" : ""}>
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.grade}>
                  {headers.map((header, i) => {
                    const key = header.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const value = i === 0 ? row.grade : row[Object.keys(row)[i]];
                    return (
                      <TableCell 
                        key={i} 
                        className={i === 0 || i === headers.length - 1 ? "font-bold" : ""}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <header className="sr-only">
        <h1>{title} - Complete Guide for SL and HL</h1>
      </header>

      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          <BackButton
            fallbackPath="/homepage/grade-boundaries"
            size="icon"
            tooltip="Back to Grade Boundaries"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            <p className="text-muted-foreground mt-2">{subtitle}</p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="shadow-medium border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Understanding the Grade Boundaries</h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  The grade boundaries below show the approximate marks needed for each grade (1-7). 
                  These boundaries are based on recent IB examination sessions and serve as a planning guide.
                </p>
                <p>
                  Remember that boundaries can vary slightly between examination sessions depending on 
                  overall difficulty and student performance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SL Only Table (for subjects like ESS) */}
        {slOnly && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Grade Boundaries</h2>
            {renderTable(slOnly, "Standard Level", slComponents)}
          </div>
        )}

        {/* SL Boundaries */}
        {slData && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Standard Level (SL) Grade Boundaries</h2>
            {renderTable(slData, "SL", slComponents)}
          </div>
        )}

        {/* HL Boundaries */}
        {hlData && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Higher Level (HL) Grade Boundaries</h2>
            {renderTable(hlData, "HL", hlComponents)}
          </div>
        )}

        {/* Tips */}
        {tips && tips.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Study Tips</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {tips.map((tip, i) => (
                <Card key={i} className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm">
                    {tip.content}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Related Subjects */}
        {relatedSubjects && relatedSubjects.length > 0 && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Related Grade Boundaries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {relatedSubjects.map((subject, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate(subject.path)}
                  >
                    {subject.name}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/homepage/grade-boundaries")}
                >
                  All Subjects
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">{ctaText}</h2>
          <p className="text-muted-foreground">
            Use our AI-powered writing tools to improve your essays and IAs.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button size="lg" onClick={() => navigate("/work")}>
              Start Writing
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/homepage/grade-boundaries")}>
              View All Subjects
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate("/homepage/ia-guides")}>
              IA Writing Guides
            </Button>
            {/* Add assessment criteria button if it's a subject page */}
            {window.location.pathname.includes('/homepage/grade-boundaries/') && 
             !window.location.pathname.includes('/criteria') &&
             window.location.pathname !== '/homepage/grade-boundaries/' && (
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => {
                  const subject = window.location.pathname.replace('/homepage/grade-boundaries/', '');
                  navigate(`/homepage/grade-boundaries/${subject}/criteria`);
                }}
              >
                View Assessment Criteria
              </Button>
            )}
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
