import { useState } from "react";
import { ChemistryQuestion } from "@/data/past-papers/chemistryQuestions";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, TrendingUp, Wand2, FileText, PenTool, Copy, TrendingDown, Code, FileCode } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface QuestionCardProps {
  question: ChemistryQuestion;
  onManipulate: (question: ChemistryQuestion, type: string, outputFormat?: string) => void;
  isLoading: boolean;
}

export function QuestionCard({ question, onManipulate, isLoading }: QuestionCardProps) {
  const [format, setFormat] = useState<string>('text');

  return (
    <div className="group bg-gradient-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-glow animate-fade-in">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
            {question.id}
          </span>
          <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
            {question.topic}
          </span>
        </div>
      </div>
      
      <p className="text-foreground/90 leading-relaxed whitespace-pre-line text-sm mb-6 font-mono">
        {question.text}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {/* Format Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 min-w-[100px] justify-between" disabled={isLoading}>
              <span className="flex items-center gap-2">
                {format === 'latex' ? <Code className="w-3.5 h-3.5" /> : 
                 format === 'html' ? <FileCode className="w-3.5 h-3.5" /> : 
                 <FileText className="w-3.5 h-3.5" />}
                {format === 'text' ? 'Text' : format === 'latex' ? 'LaTeX' : 'HTML'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Output Format</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={format} onValueChange={setFormat}>
              <DropdownMenuRadioItem value="text">
                <FileText className="w-3.5 h-3.5 mr-2" />
                Plain Text
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="latex">
                <Code className="w-3.5 h-3.5 mr-2" />
                LaTeX
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="html">
                <FileCode className="w-3.5 h-3.5 mr-2" />
                HTML
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-6 bg-border mx-1 my-auto" />

        {/* Primary Actions */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onManipulate(question, 'rephrase', format)}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Rephrase
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onManipulate(question, 'recreate', format)}
          disabled={isLoading}
          className="gap-2"
        >
          <PenTool className="w-3.5 h-3.5" />
          Recreate
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onManipulate(question, 'markscheme', format)}
          disabled={isLoading}
          className="gap-2"
        >
          <FileText className="w-3.5 h-3.5" />
          Mark Scheme
        </Button>
        
        {/* More Options Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={isLoading} className="gap-2">
              <Wand2 className="w-3.5 h-3.5" />
              More
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Difficulty</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onManipulate(question, 'simplify', format)}>
              <TrendingDown className="w-4 h-4 mr-2" />
              Make Easier
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onManipulate(question, 'advanced', format)}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Make Harder
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Variations</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onManipulate(question, 'similar', format)}>
              <Copy className="w-4 h-4 mr-2" />
              Similar Question
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onManipulate(question, 'reverse', format)}>
              <Sparkles className="w-4 h-4 mr-2" />
              Reverse Question
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onManipulate(question, 'context', format)}>
              <Wand2 className="w-4 h-4 mr-2" />
              New Context
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
