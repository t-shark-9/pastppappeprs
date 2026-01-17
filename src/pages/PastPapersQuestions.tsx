import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useChemistryQuestions, useBiologyQuestions, usePhysicsQuestions } from "@/hooks/useLazyData";
import { QuestionCard } from "@/components/past-papers/QuestionCard";
import { ManipulatedResult } from "@/components/past-papers/ManipulatedResult";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { 
  Atom, Sparkles, Beaker, Dna, Zap, Search, Filter, 
  ChevronLeft, ChevronRight, X, ArrowLeft, SlidersHorizontal,
  Clock, BookOpen, Target, Shuffle, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BackButton } from "@/components/ui/back-button";
import { cn } from "@/lib/utils";

interface ManipulationResult {
  original: string;
  manipulated: string;
  type: string;
}

interface Question {
  id: number;
  text: string;
  topic: string;
  source?: string;
  options?: string[];
  answer?: string;
  explanation?: string;
}

// Topic mapping for better organization
const CHEMISTRY_TOPICS = [
  "Stoichiometry",
  "Bonding",
  "Organic Chemistry",
  "Equilibrium",
  "Thermodynamics",
  "Kinetics",
  "Electrochemistry",
  "Acids and Bases",
  "Redox",
  "General Chemistry",
];

const BIOLOGY_TOPICS = [
  "Cell Biology",
  "Molecular Biology",
  "Genetics",
  "Ecology",
  "Evolution",
  "Human Physiology",
  "Plant Biology",
  "General Biology",
];

const PHYSICS_TOPICS = [
  "Mechanics",
  "Thermal Physics",
  "Waves",
  "Electricity",
  "Magnetism",
  "Atomic Physics",
  "Quantum Physics",
  "General Physics",
];

const ITEMS_PER_PAGE = 10;

export default function PastPapersQuestions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const initialSubject = searchParams.get("subject") || "chemistry";
  
  const [activeSubject, setActiveSubject] = useState<string>(initialSubject);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ManipulationResult | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Lazy load question data
  const { data: chemistryData, loading: chemLoading } = useChemistryQuestions();
  const { data: biologyData, loading: bioLoading } = useBiologyQuestions();
  const { data: physicsData, loading: physLoading } = usePhysicsQuestions();
  
  const dataLoading = chemLoading || bioLoading || physLoading;

  // Get questions for current subject
  const allQuestions = useMemo(() => {
    const questions = (() => {
      switch (activeSubject) {
        case "chemistry":
          return chemistryData;
        case "biology":
          return biologyData;
        case "physics":
          return physicsData;
        default:
          return chemistryData;
      }
    })();
    return (questions || []) as Question[];
  }, [activeSubject, chemistryData, biologyData, physicsData]);

  // Get topics for current subject
  const topics = useMemo(() => {
    switch (activeSubject) {
      case "chemistry":
        return CHEMISTRY_TOPICS;
      case "biology":
        return BIOLOGY_TOPICS;
      case "physics":
        return PHYSICS_TOPICS;
      default:
        return [];
    }
  }, [activeSubject]);

  // Extract years from questions
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    allQuestions.forEach(q => {
      const match = q.source?.match(/(\d{4})/);
      if (match) {
        years.add(match[1]);
      }
    });
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [allQuestions]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    let questions = [...allQuestions];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      questions = questions.filter(q => 
        q.text.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query)
      );
    }

    // Topic filter
    if (selectedTopic !== "all") {
      questions = questions.filter(q => 
        q.topic.toLowerCase().includes(selectedTopic.toLowerCase())
      );
    }

    // Year filter
    if (selectedYear !== "all") {
      questions = questions.filter(q => 
        q.source?.includes(selectedYear)
      );
    }

    return questions;
  }, [allQuestions, searchQuery, selectedTopic, selectedYear]);

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredQuestions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredQuestions, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSubject, searchQuery, selectedTopic, selectedYear]);

  // Update URL when subject changes
  useEffect(() => {
    setSearchParams({ subject: activeSubject });
  }, [activeSubject, setSearchParams]);

  const handleManipulate = async (question: Question, type: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('manipulate-question', {
        body: { question: question.text, manipulationType: type }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setResult({
        original: question.text,
        manipulated: data.manipulated,
        type: type
      });
    } catch (error) {
      console.error('Error manipulating question:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate question variation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTopic("all");
    setSelectedYear("all");
  };

  const hasActiveFilters = searchQuery || selectedTopic !== "all" || selectedYear !== "all";

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    const question = allQuestions[randomIndex];
    // Find the page containing this question
    const questionIndex = filteredQuestions.findIndex(q => q.id === question.id);
    if (questionIndex >= 0) {
      setCurrentPage(Math.floor(questionIndex / ITEMS_PER_PAGE) + 1);
    }
  };

  const SubjectIcon = ({ subject, className }: { subject: string; className?: string }) => {
    switch (subject) {
      case "chemistry":
        return <Beaker className={className} />;
      case "biology":
        return <Dna className={className} />;
      case "physics":
        return <Zap className={className} />;
      default:
        return <Atom className={className} />;
    }
  };

  const subjectColor = {
    chemistry: "text-blue-600",
    biology: "text-green-600",
    physics: "text-purple-600",
  }[activeSubject] || "text-primary";

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <BackButton fallbackPath="/homepage/past-papers" />
          
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg bg-primary/10", subjectColor)}>
                <SubjectIcon subject={activeSubject} className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Practice Questions</h1>
                <p className="text-muted-foreground text-sm">
                  {filteredQuestions.length} questions available
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={getRandomQuestion} className="gap-2">
                <Shuffle className="h-4 w-4" />
                Random Question
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    !
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Subject Tabs */}
        <Tabs value={activeSubject} onValueChange={setActiveSubject} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="chemistry" className="gap-2">
              <Beaker className="h-4 w-4" />
              Chemistry
            </TabsTrigger>
            <TabsTrigger value="biology" className="gap-2">
              <Dna className="h-4 w-4" />
              Biology
            </TabsTrigger>
            <TabsTrigger value="physics" className="gap-2">
              <Zap className="h-4 w-4" />
              Physics
            </TabsTrigger>
          </TabsList>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="animate-in fade-in slide-in-from-top-2 duration-200">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter Questions
                  </h3>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  {/* Topic Filter */}
                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Topics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Topics</SelectItem>
                      {topics.map(topic => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Year Filter */}
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {availableYears.map(year => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Bar */}
          <div className="flex items-center justify-between py-2 px-1">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {filteredQuestions.length} questions
              </span>
              {hasActiveFilters && (
                <span className="flex items-center gap-1 text-primary">
                  <Filter className="h-3 w-3" />
                  Filtered
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages || 1}
            </div>
          </div>

          {/* Questions List */}
          <TabsContent value={activeSubject} className="space-y-4 mt-0">
            {isLoading && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <Atom className="w-16 h-16 text-primary animate-spin" style={{ animationDuration: "2s" }} />
                    <div className="absolute inset-0 w-16 h-16 border-2 border-primary/30 rounded-full animate-ping" />
                  </div>
                  <p className="text-muted-foreground font-medium">Generating variation...</p>
                </div>
              </div>
            )}

            {paginatedQuestions.length === 0 ? (
              <Card className="p-12 text-center">
                <Search className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No questions found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <>
                {paginatedQuestions.map((question, index) => (
                  <div 
                    key={question.id} 
                    className="animate-in fade-in slide-in-from-bottom-2"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <QuestionCard
                      question={question}
                      onManipulate={handleManipulate}
                      isLoading={isLoading}
                    />
                  </div>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        let pageNum: number;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            className="w-9"
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* AI Features Card */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI-Powered Question Variations</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Click on any question to generate variations using AI:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="gap-1">
                    <Target className="h-3 w-3" />
                    Simplify
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    Rephrase
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    Make Harder
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <BookOpen className="h-3 w-3" />
                    Similar Question
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Result Modal */}
        {result && (
          <ManipulatedResult
            original={result.original}
            manipulated={result.manipulated}
            type={result.type}
            onClose={() => setResult(null)}
          />
        )}
      </div>
    </div>
  );
}
