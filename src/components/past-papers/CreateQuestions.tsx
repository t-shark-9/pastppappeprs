import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Wand2, Loader2, Database, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { chemistryQuestions } from "@/data/past-papers/chemistryQuestions_extracted";
import { biologyQuestions } from "@/data/past-papers/biologyQuestions_extracted";
import { physicsQuestions } from "@/data/past-papers/physicsQuestions_extracted";

interface GeneratedQuestion {
  id: string;
  subject: string;
  topic: string;
  generation_type: string;
  source_question_id: number;
  source_question_text: string;
  generated_question: string;
  markscheme: string;
  calculation: string | null;
  created_at: string;
}

export function CreateQuestions() {
  const [subject, setSubject] = useState<string>("chemistry");
  const [topic, setTopic] = useState<string>("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [databaseQuestions, setDatabaseQuestions] = useState<GeneratedQuestion[]>([]);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("generate");

  // Get unique topics for selected subject
  const getTopics = () => {
    const questions = subject === "chemistry" 
      ? chemistryQuestions 
      : subject === "biology" 
        ? biologyQuestions 
        : physicsQuestions;
    
    const topics = [...new Set(questions.map(q => q.topic))];
    return topics.sort();
  };

  // Get filtered questions based on subject and topic
  const getFilteredQuestions = () => {
    const questions = subject === "chemistry" 
      ? chemistryQuestions 
      : subject === "biology" 
        ? biologyQuestions 
        : physicsQuestions;
    
    if (topic && topic !== "all") {
      return questions.filter(q => q.topic === topic);
    }
    return questions;
  };

  // Load database questions
  const loadDatabaseQuestions = async () => {
    const { data, error } = await supabase
      .from('generated_questions')
      .select('*')
      .eq('subject', subject)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading database questions:', error);
      return;
    }

    setDatabaseQuestions((data || []) as GeneratedQuestion[]);
  };

  useEffect(() => {
    loadDatabaseQuestions();
  }, [subject]);

  const handleGenerate = async (type: 'rephrase' | 'rewrite') => {
    const filteredQuestions = getFilteredQuestions();
    
    if (filteredQuestions.length === 0) {
      toast({
        title: "No questions found",
        description: "Please select a topic with available questions",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedQuestions([]);

    try {
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: {
          subject,
          topic: topic || "General",
          generationType: type,
          sourceQuestions: filteredQuestions.slice(0, 15).map(q => ({
            id: q.id,
            text: q.text,
            topic: q.topic,
          })),
          count: 10,
        },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedQuestions(data.generated || []);
      loadDatabaseQuestions(); // Refresh database view

      toast({
        title: "Questions Generated",
        description: `Successfully generated ${data.count} new questions`,
      });
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate questions",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const QuestionCard = ({ question, showSource = false }: { question: GeneratedQuestion; showSource?: boolean }) => {
    const isExpanded = expandedQuestion === question.id;
    
    return (
      <Card className="bg-gradient-card border-border hover:border-primary/30 transition-all">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
              {question.topic}
            </span>
            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize">
              {question.generation_type}
            </span>
          </div>
          
          <p className="text-foreground/90 text-sm whitespace-pre-line mb-3">
            {question.generated_question}
          </p>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpandedQuestion(isExpanded ? null : question.id)}
            className="gap-2 text-muted-foreground"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {isExpanded ? "Hide Details" : "Show Markscheme"}
          </Button>
          
          {isExpanded && (
            <div className="mt-4 space-y-4 border-t border-border pt-4">
              <div>
                <h4 className="font-medium text-sm text-primary mb-2">Markscheme</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {question.markscheme}
                </p>
              </div>
              
              {question.calculation && (
                <div>
                  <h4 className="font-medium text-sm text-primary mb-2">Calculation</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line font-mono">
                    {question.calculation}
                  </p>
                </div>
              )}
              
              {showSource && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Source Question</h4>
                  <p className="text-xs text-muted-foreground/70 whitespace-pre-line">
                    {question.source_question_text}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="generate" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Generate
          </TabsTrigger>
          <TabsTrigger value="database" className="gap-2">
            <Database className="w-4 h-4" />
            Database
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6 mt-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select value={subject} onValueChange={(v) => { setSubject(v); setTopic(""); }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Topic</label>
                  <Select value={topic} onValueChange={setTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="All topics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All topics</SelectItem>
                      {getTopics().map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {getFilteredQuestions().length} questions available with current filters
              </p>
            </CardContent>
          </Card>

          {/* Generation Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generate Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                AI will generate 10 unique questions based on your filters. Questions are saved globally and won't be duplicated.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleGenerate('rephrase')}
                  disabled={isGenerating}
                  className="gap-2"
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  Rephrase
                </Button>
                
                <Button
                  onClick={() => handleGenerate('rewrite')}
                  disabled={isGenerating}
                  variant="secondary"
                  className="gap-2"
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4" />
                  )}
                  Rewrite
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Rephrase:</strong> Same numbers and data, different wording</p>
                <p><strong>Rewrite:</strong> New question inspired by the original</p>
              </div>
            </CardContent>
          </Card>

          {/* Generated Questions */}
          {generatedQuestions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Newly Generated ({generatedQuestions.length})
              </h3>
              <div className="grid gap-4">
                {generatedQuestions.map((q) => (
                  <QuestionCard key={q.id} question={q} showSource />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="database" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Saved Questions ({databaseQuestions.length})
            </h3>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {databaseQuestions.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No generated questions yet for {subject}.</p>
                <p className="text-sm">Generate some questions to see them here!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {databaseQuestions.map((q) => (
                <QuestionCard key={q.id} question={q} showSource />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
