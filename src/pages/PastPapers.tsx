import { useState } from "react";
import { chemistryQuestions, Question as ChemistryQuestion } from "@/data/past-papers/chemistryQuestions_extracted";
import { biologyQuestions, Question as BiologyQuestion } from "@/data/past-papers/biologyQuestions_extracted";
import { physicsQuestions, Question as PhysicsQuestion } from "@/data/past-papers/physicsQuestions_extracted";
import { QuestionCard } from "@/components/past-papers/QuestionCard";
import { ManipulatedResult } from "@/components/past-papers/ManipulatedResult";
import { MoleculeBackground } from "@/components/past-papers/MoleculeBackground";
import { CreateQuestions } from "@/components/past-papers/CreateQuestions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Atom, Sparkles, Beaker, Dna, Zap, Search, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackButton } from "@/components/ui/back-button";

interface ManipulationResult {
  original: string;
  manipulated: string;
  type: string;
}

type Question = ChemistryQuestion | BiologyQuestion | PhysicsQuestion;

export default function PastPapers() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ManipulationResult | null>(null);
  const [activeSubject, setActiveSubject] = useState<string>("chemistry");
  const [mainTab, setMainTab] = useState<string>("search");

  const handleManipulate = async (question: Question, type: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('manipulate-question', {
        body: { question: question.text, manipulationType: type }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

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

  return (
    <div className="min-h-screen bg-background relative">
      <MoleculeBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        {/* Back Button */}
        <div className="mb-8">
          <BackButton fallbackPath="/homepage" />
        </div>

        {/* Header */}
        <header className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Atom className="w-12 h-12 text-primary animate-float" />
              <Sparkles className="w-5 h-5 text-accent absolute -top-1 -right-1" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            IB Science AI
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Transform your science questions with AI-powered variations. 
            Search existing papers or create new questions instantly.
          </p>
        </header>

        {/* Main Tabs: Search / Create */}
        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="search" className="gap-2">
              <Search className="w-4 h-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="create" className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Create
            </TabsTrigger>
          </TabsList>

          {/* Search Tab - Existing Papers */}
          <TabsContent value="search">
            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Beaker className="w-4 h-4 text-primary" />
                <span>{chemistryQuestions.length + biologyQuestions.length + physicsQuestions.length} Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>4 Variation Types</span>
              </div>
            </div>

            {/* Loading overlay */}
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

            {/* Subject Tabs */}
            <Tabs defaultValue="chemistry" className="w-full" onValueChange={setActiveSubject}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="chemistry" className="flex items-center gap-2">
                  <Beaker className="w-4 h-4" />
                  Chemistry
                </TabsTrigger>
                <TabsTrigger value="biology" className="flex items-center gap-2">
                  <Dna className="w-4 h-4" />
                  Biology
                </TabsTrigger>
                <TabsTrigger value="physics" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Physics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chemistry" className="space-y-4 mt-8">
                {chemistryQuestions.map((question, index) => (
                  <div key={question.id} style={{ animationDelay: `${index * 50}ms` }}>
                    <QuestionCard
                      question={question}
                      onManipulate={handleManipulate}
                      isLoading={isLoading}
                    />
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="biology" className="space-y-4 mt-8">
                {biologyQuestions.map((question, index) => (
                  <div key={question.id} style={{ animationDelay: `${index * 50}ms` }}>
                    <QuestionCard
                      question={question}
                      onManipulate={handleManipulate}
                      isLoading={isLoading}
                    />
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="physics" className="space-y-4 mt-8">
                {physicsQuestions.map((question, index) => (
                  <div key={question.id} style={{ animationDelay: `${index * 50}ms` }}>
                    <QuestionCard
                      question={question}
                      onManipulate={handleManipulate}
                      isLoading={isLoading}
                    />
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Create Tab - AI Generation */}
          <TabsContent value="create">
            <CreateQuestions />
          </TabsContent>
        </Tabs>

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
