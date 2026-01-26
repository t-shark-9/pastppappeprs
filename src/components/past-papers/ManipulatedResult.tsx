import { X, Copy, Check, FileCode, Code, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface ManipulatedResultProps {
  original: string;
  manipulated: string;
  type: string;
  format?: string;
  onClose: () => void;
}

const typeLabels: Record<string, { label: string; color: string }> = {
  rephrase: { label: "Rephrased", color: "text-primary" },
  recreate: { label: "Recreated", color: "text-blue-500" },
  markscheme: { label: "Mark Scheme", color: "text-emerald-500" },
  simplify: { label: "Simplified", color: "text-green-500" },
  advanced: { label: "Advanced", color: "text-amber-500" },
  similar: { label: "Similar Question", color: "text-purple-500" },
  reverse: { label: "Reversed", color: "text-rose-500" },
  context: { label: "New Context", color: "text-cyan-500" },
};

export function ManipulatedResult({ original, manipulated, type, format, onClose }: ManipulatedResultProps) {
  const [copied, setCopied] = useState(false);
  const typeInfo = typeLabels[type] || { label: type, color: "text-primary" };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(manipulated);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const getFormatBadge = () => {
    if (format === 'latex') return <Badge variant="outline" className="gap-1 font-mono"><Code className="w-3 h-3" /> LaTeX</Badge>;
    if (format === 'html') return <Badge variant="outline" className="gap-1 font-mono"><FileCode className="w-3 h-3" /> HTML</Badge>;
    return <Badge variant="outline" className="gap-1 font-mono"><FileText className="w-3 h-3" /> Text</Badge>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl p-6 shadow-2xl animate-slide-up max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm font-semibold ${typeInfo.color}`}>
              {typeInfo.label} {type !== 'markscheme' && 'Version'}
            </span>
            {format && getFormatBadge()}
          </div>
          <h3 className="text-xl font-bold text-foreground">
            {type === 'markscheme' ? 'AI-Generated Mark Scheme' : 'AI-Generated Question Variation'}
          </h3>
        </div>

        <div className="space-y-4 overflow-y-auto flex-grow pr-2">
          <div className="p-4 rounded-xl bg-secondary/50 border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Original</p>
            <p className="text-sm text-foreground/70 whitespace-pre-line font-mono">{original}</p>
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-primary uppercase tracking-wide">Generated Output</p>
              {format && format !== 'text' && (
                 <span className="text-xs text-muted-foreground font-mono">
                   {format === 'latex' ? 'LaTeX Code' : 'HTML Code'}
                 </span>
              )}
            </div>
            
            <div className="relative">
              {format === 'latex' || format === 'html' ? (
                <pre className="text-sm text-foreground font-mono p-2 bg-background/50 rounded-lg overflow-x-auto whitespace-pre-wrap">
                  <code>{manipulated}</code>
                </pre>
              ) : (
                <p className="text-sm text-foreground whitespace-pre-line font-mono leading-relaxed">
                  {manipulated}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 flex-shrink-0">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="default" onClick={handleCopy} className="gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Content"}
          </Button>
        </div>
      </div>
    </div>
  );
}
