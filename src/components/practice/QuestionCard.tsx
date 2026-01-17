import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";

interface Question {
  id: number;
  text: string;
  topic: string;
  source?: string;
  level?: string;
  year?: string;
  session?: string;
  subject?: string;
  answer?: string | null;
}

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Parse question text to extract main question and options
  const parseQuestion = (text: string) => {
    const lines = text.split('\n').filter(l => l.trim());
    const options: { letter: string; text: string }[] = [];
    let questionText = '';
    
    for (const line of lines) {
      const optionMatch = line.match(/^([A-D])\.?\s+(.+)$/);
      if (optionMatch) {
        options.push({ letter: optionMatch[1], text: optionMatch[2] });
      } else {
        questionText += (questionText ? '\n' : '') + line;
      }
    }
    
    return { questionText, options };
  };

  const { questionText, options } = parseQuestion(question.text);

  // Use direct properties if available, otherwise parse from source
  const year = question.year || question.source?.match(/(\d{4})/)?.[1] || null;
  const session = question.session || (question.source?.includes('November') ? 'November' : 'May');
  const sessionCode = session === 'November' ? 'N' : 'M';
  const level = question.level || 'SL';

  return (
    <div className="bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-mono text-lg font-bold shrink-0">
            {question.id}
          </span>
          <Badge variant="secondary" className="text-xs">
            {question.topic}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {level}
          </Badge>
          {year && (
            <Badge variant="outline" className="text-xs">
              {sessionCode}{year.slice(2)}
            </Badge>
          )}
        </div>
      </div>

      {/* Question Text */}
      <p className="text-foreground/90 leading-relaxed whitespace-pre-line text-sm mb-4 font-mono">
        {questionText}
      </p>

      {/* Options */}
      {options.length > 0 && (
        <div className="space-y-2 mb-4">
          {options.map((option) => {
            const isCorrect = showAnswer && question.answer === option.letter;
            return (
              <button
                key={option.letter}
                onClick={() => setSelectedAnswer(option.letter)}
                className={cn(
                  "w-full text-left pl-4 py-3 rounded-lg border transition-all duration-200 font-mono text-sm",
                  isCorrect
                    ? "bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-300"
                    : selectedAnswer === option.letter
                      ? "bg-primary/10 border-primary/50 text-foreground"
                      : "bg-muted/30 border-transparent hover:bg-muted/50 text-foreground/80"
                )}
              >
                <span className="font-bold mr-2">{option.letter}.</span>
                {option.text}
                {isCorrect && (
                  <CheckCircle2 className="inline-block w-4 h-4 ml-2 text-green-600 dark:text-green-400" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAnswer(!showAnswer)}
          className="gap-2 text-muted-foreground"
        >
          {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </Button>

        {selectedAnswer && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Selected: <span className="font-bold text-primary">{selectedAnswer}</span>
          </div>
        )}
      </div>

      {/* Answer reveal */}
      {showAnswer && (
        <div className="mt-4 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
          {question.answer ? (
            <p className="text-sm text-green-700 dark:text-green-300 font-medium">
              ✓ Correct Answer: <span className="font-bold">{question.answer}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Answer key not available. Check the mark scheme for the correct answer.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
