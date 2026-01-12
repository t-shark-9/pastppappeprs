import { useEffect, useMemo, useState } from "react";
import {
  loadMarkScheme,
  loadPaperContent,
  loadPapersIndex,
  PastPaper,
} from "@/services/localPaperService";
import { PaperContentViewer } from "@/components/past-papers/PaperContentViewer";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SUBJECT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  biology: FileText,
  chemistry: FileText,
  physics: FileText,
  math_aa: FileText,
  math_ai: FileText,
  computer_science: FileText,
  business_management: FileText,
  economics: FileText,
  geography: FileText,
  history: FileText,
  psychology: FileText,
  design_technology: FileText,
};

function SubjectIcon({ subject }: { subject: string }) {
  const key = subject.toLowerCase();
  const Icon = SUBJECT_ICONS[key] || FileText;
  return <Icon className="h-4 w-4" />;
}

export default function PastPapersNew() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSession, setSelectedSession] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const [selectedPaper, setSelectedPaper] = useState<PastPaper | null>(null);
  const [showMarkScheme, setShowMarkScheme] = useState(false);

  const [papers, setPapers] = useState<PastPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [paperContent, setPaperContent] = useState<string>("");
  const [markSchemeContent, setMarkSchemeContent] = useState<string>("");
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    loadPapersIndex()
      .then((index) => {
        setPapers(index.papers);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message ?? "Failed to load papers index");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedPaper) return;

    setLoadingContent(true);
    setPaperContent("");
    setMarkSchemeContent("");
    setShowMarkScheme(false);

    loadPaperContent(selectedPaper.filepath)
      .then((content) => {
        setPaperContent(content);
      })
      .catch((err) => {
        console.error("Error loading paper content:", err);
        setPaperContent("Failed to load paper content");
      })
      .finally(() => {
        setLoadingContent(false);
      });

    if (selectedPaper.markSchemeFile) {
      loadMarkScheme(selectedPaper.markSchemeFile)
        .then((content) => setMarkSchemeContent(content))
        .catch((err) => {
          console.error("Error loading mark scheme:", err);
          setMarkSchemeContent("Failed to load mark scheme");
        });
    }
  }, [selectedPaper]);

  const availableYears = useMemo(() => {
    const years = new Set(papers.map((p) => p.year));
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [papers]);

  const availableSubjects = useMemo(() => {
    const subjects = new Set(papers.map((p) => p.subject));
    return Array.from(subjects).sort();
  }, [papers]);

  const filteredPapers = useMemo(() => {
    let filtered = papers;

    if (selectedSubject !== "all") filtered = filtered.filter((p) => p.subject === selectedSubject);
    if (selectedYear !== "all") filtered = filtered.filter((p) => p.year === selectedYear);
    if (selectedSession !== "all") filtered = filtered.filter((p) => p.session === selectedSession);
    if (selectedLevel !== "all") filtered = filtered.filter((p) => p.level === selectedLevel);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.subject.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.filepath.toLowerCase().includes(q),
      );
    }

    return filtered;
  }, [papers, searchQuery, selectedSubject, selectedYear, selectedSession, selectedLevel]);

  const groupedPapers = useMemo(() => {
    const grouped: Record<string, Record<string, PastPaper[]>> = {};

    for (const paper of filteredPapers) {
      const yearKey = paper.year.toString();
      const sessionKey = paper.session;

      grouped[yearKey] ||= {};
      grouped[yearKey][sessionKey] ||= [];
      grouped[yearKey][sessionKey].push(paper);
    }

    return grouped;
  }, [filteredPapers]);

  const hasActiveFilters =
    selectedSubject !== "all" ||
    selectedYear !== "all" ||
    selectedSession !== "all" ||
    selectedLevel !== "all" ||
    searchQuery.trim() !== "";

  const clearFilters = () => {
    setSelectedSubject("all");
    setSelectedYear("all");
    setSelectedSession("all");
    setSelectedLevel("all");
    setSearchQuery("");
  };

  const stats = useMemo(() => {
    const subjects = new Set(papers.map((p) => p.subject));
    const withMarkSchemes = papers.filter((p) => p.markSchemeFile).length;

    return {
      totalPapers: papers.length,
      totalSubjects: subjects.size,
      withMarkSchemes,
    };
  }, [papers]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading papers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Papers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <BackButton fallbackPath="/dashboard" />

          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">IB Past Papers</h1>
              </div>
              <p className="text-muted-foreground">
                Browse and search examination papers and mark schemes.
              </p>
            </div>

            <div className="flex gap-3">
              <Card className="px-4 py-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stats.totalPapers.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Papers</div>
                </div>
              </Card>
              <Card className="px-4 py-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stats.totalSubjects.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Subjects</div>
                </div>
              </Card>
              <Card className="px-4 py-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stats.withMarkSchemes.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Mark schemes</div>
                </div>
              </Card>
            </div>
          </div>
        </header>

        <section className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear all
                  </Button>
                )}
              </div>
              <CardDescription>
                Removed the massive embedded question-bank files to prevent build out-of-memory errors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative lg:col-span-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search papers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {availableSubjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {availableYears.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSession} onValueChange={setSelectedSession}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Sessions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    <SelectItem value="May">May Session</SelectItem>
                    <SelectItem value="November">November Session</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="HL">Higher Level (HL)</SelectItem>
                    <SelectItem value="SL">Standard Level (SL)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredPapers.length}</span> papers
              {hasActiveFilters && " (filtered)"}
            </p>
          </div>

          {filteredPapers.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h2 className="text-lg font-medium mb-2">No papers found</h2>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search query.</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedPapers)
                .sort(([a], [b]) => parseInt(b) - parseInt(a))
                .map(([year, sessions]) => (
                  <Card key={year}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        {year} Examination Session
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="multiple" className="space-y-2">
                        {Object.entries(sessions).map(([session, sessionPapers]) => (
                          <AccordionItem
                            key={session}
                            value={`${year}-${session}`}
                            className="border rounded-lg px-4"
                          >
                            <AccordionTrigger className="hover:no-underline py-3">
                              <div className="flex items-center gap-3">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{session} {year}</span>
                                <Badge variant="secondary" className="ml-2">
                                  {sessionPapers.length} papers
                                </Badge>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-4">
                              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {sessionPapers.map((paper) => (
                                  <Card
                                    key={paper.id}
                                    className={cn(
                                      "cursor-pointer hover:shadow-md transition-all border-2",
                                      "hover:border-primary/30",
                                    )}
                                    onClick={() => setSelectedPaper(paper)}
                                  >
                                    <CardContent className="p-4">
                                      <div className="flex items-start justify-between gap-2 mb-2">
                                        <div className={cn("p-2 rounded-lg", "bg-muted")}
                                          aria-label={`${paper.subject} icon`}
                                        >
                                          <SubjectIcon subject={paper.subject} />
                                        </div>
                                        <div className="flex gap-1">
                                          <Badge variant="outline" className="text-xs">
                                            {paper.level}
                                          </Badge>
                                          <Badge variant="outline" className="text-xs">
                                            {paper.timezone}
                                          </Badge>
                                        </div>
                                      </div>
                                      <h3 className="font-medium text-sm mb-1">{paper.subject}</h3>
                                      <p className="text-xs text-muted-foreground">Paper {paper.paperNumber}</p>
                                      <div className="mt-3 flex items-center gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 text-xs gap-1"
                                        >
                                          <Eye className="h-3 w-3" />
                                          View
                                        </Button>
                                        {paper.markSchemeFile && (
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Badge variant="secondary" className="text-xs gap-1">
                                                <CheckCircle2 className="h-3 w-3" />
                                                MS
                                              </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>Mark Scheme Available</TooltipContent>
                                          </Tooltip>
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </section>

        {/* Paper Detail Dialog */}
        <Dialog open={!!selectedPaper} onOpenChange={(open) => !open && setSelectedPaper(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            {selectedPaper && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", "bg-muted")}
                      aria-label={`${selectedPaper.subject} icon`}
                    >
                      <SubjectIcon subject={selectedPaper.subject} />
                    </div>
                    <div>
                      <div>{selectedPaper.subject}</div>
                      <div className="text-sm font-normal text-muted-foreground">
                        Paper {selectedPaper.paperNumber} • {selectedPaper.session} {selectedPaper.year} • {selectedPaper.timezone} {selectedPaper.level}
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      variant={!showMarkScheme ? "default" : "outline"}
                      onClick={() => setShowMarkScheme(false)}
                      className="gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Question Paper
                    </Button>

                    {selectedPaper.markSchemeFile && (
                      <Button
                        variant={showMarkScheme ? "default" : "outline"}
                        onClick={() => setShowMarkScheme(true)}
                        className="gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Mark Scheme
                      </Button>
                    )}
                  </div>

                  <ScrollArea className="h-[500px] border rounded-lg p-4 bg-muted/20">
                    {loadingContent ? (
                      <div className="text-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                        <p className="text-muted-foreground">Loading content...</p>
                      </div>
                    ) : (
                      <PaperContentViewer
                        content={showMarkScheme ? markSchemeContent : paperContent}
                        isMarkScheme={showMarkScheme}
                      />
                    )}
                  </ScrollArea>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => {
                        const content = showMarkScheme ? markSchemeContent : paperContent;
                        const blob = new Blob([content], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download =
                          showMarkScheme && selectedPaper.markSchemeFile
                            ? selectedPaper.markSchemeFile.split("/").pop() || "markscheme.txt"
                            : selectedPaper.filepath.split("/").pop() || "paper.txt";
                        a.click();
                      }}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
