import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface PaperContentViewerProps {
  content: string;
  isMarkScheme?: boolean;
}

interface ParsedQuestion {
  number: string;
  content: string;
  solutionAnswer: string;
  solutionExplanation: string;
}

function parseQuestions(content: string): { title: string; questions: ParsedQuestion[] } {
  const lines = content.split('\n');
  
  // Extract title (first non-empty line)
  let title = '';
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim()) {
      title = lines[i].trim();
      break;
    }
  }
  
  const questions: ParsedQuestion[] = [];
  
  // Split content by question numbers (1., 2., etc. on their own line)
  const blocks = content.split(/\n(?=\d+\.\s*\n)/);
  
  for (const block of blocks) {
    // Match question number at start
    const match = block.match(/^(\d+)\.\s*\n([\s\S]*)/);
    if (!match) continue;
    
    const number = match[1];
    const remaining = match[2];
    
    // Find where solution starts
    const solutionMatch = remaining.match(/Solution[:\s]*([A-D])?[:\s]*/i);
    
    let solutionAnswer = '';
    let solutionExplanation = '';
    let questionContent = remaining;
    
    if (solutionMatch && solutionMatch.index !== undefined) {
      // Content before solution
      questionContent = remaining.substring(0, solutionMatch.index).trim();
      
      // Solution answer (A, B, C, D)
      solutionAnswer = solutionMatch[1] || '';
      
      // Everything after "Solution: X" is the explanation
      const afterSolution = remaining.substring(solutionMatch.index + solutionMatch[0].length);
      solutionExplanation = afterSolution.trim();
    }
    
    questions.push({
      number,
      content: questionContent,
      solutionAnswer,
      solutionExplanation
    });
  }
  
  return { title, questions };
}

function QuestionCard({ question, showSolution }: { 
  question: ParsedQuestion; 
  showSolution: boolean;
}) {
  // Parse content into question text and options
  const lines = question.content.split('\n').filter(l => l.trim());
  
  return (
    <div className="bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
      {/* Question Number Badge */}
      <div className="flex items-start gap-4 mb-4">
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-mono text-lg font-bold shrink-0">
          {question.number}
        </span>
      </div>
      
      {/* Question Content */}
      <div className="space-y-1 mb-4">
        {lines.map((line, i) => {
          const trimmed = line.trim();
          // Check if this is an option line (A., B., C., D.)
          const isOption = /^[A-D]\.\s/.test(trimmed);
          
          if (isOption) {
            return (
              <div 
                key={i}
                className="pl-4 py-2 my-1 rounded-lg bg-muted/50 border-l-2 border-primary/30 font-mono text-sm text-foreground/80"
              >
                {trimmed}
              </div>
            );
          }
          
          return (
            <p key={i} className="text-foreground/90 leading-relaxed text-sm font-mono">
              {trimmed}
            </p>
          );
        })}
      </div>
      
      {/* Solution */}
      {(question.solutionAnswer || question.solutionExplanation) && (
        <div className={cn(
          "p-4 rounded-lg border transition-all duration-300",
          showSolution 
            ? "bg-green-500/5 border-green-500/20" 
            : "bg-muted/30 border-border"
        )}>
          <div className="flex items-center gap-2 mb-2">
            {showSolution ? (
              <Eye className="w-4 h-4 text-green-600" />
            ) : (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            )}
            <span className={cn(
              "text-sm font-medium",
              showSolution ? "text-green-600" : "text-muted-foreground"
            )}>
              Solution
            </span>
          </div>
          
          {showSolution ? (
            <div className="space-y-2">
              {question.solutionAnswer && (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 font-bold text-sm">
                    {question.solutionAnswer}
                  </span>
                </div>
              )}
              {question.solutionExplanation && (
                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line font-mono">
                  {question.solutionExplanation}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Click "Show Solutions" to reveal
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function PaperContentViewer({ content, isMarkScheme = false }: PaperContentViewerProps) {
  const [showSolutions, setShowSolutions] = useState(isMarkScheme);
  const { title, questions } = useMemo(() => parseQuestions(content), [content]);
  
  // If no questions parsed, show raw content nicely
  if (questions.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-mono leading-relaxed">
          {content}
        </pre>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Paper Header */}
      {title && (
        <div className="text-center pb-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {questions.length} {questions.length === 1 ? 'question' : 'questions'}
          </p>
        </div>
      )}
      
      {/* Show/Hide Solutions Toggle */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSolutions(!showSolutions)}
          className="gap-2"
        >
          {showSolutions ? (
            <>
              <EyeOff className="w-4 h-4" />
              Hide Solutions
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Show Solutions
            </>
          )}
        </Button>
      </div>
      
      {/* Questions Grid */}
      <div className="space-y-4">
        {questions.map((question, index) => (
          <QuestionCard 
            key={index} 
            question={question} 
            showSolution={showSolutions}
          />
        ))}
      </div>
    </div>
  );
}
