import { useState, useEffect } from "react";
import { BlockNoteEditor as BlockNoteEditorComponent } from "@/components/editors/BlockNoteEditor";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import globalInflationChart from "@/assets/global-inflation-chart.png";
import { Block } from "@blocknote/core";

const PREVIEW_AI_USAGE_KEY = 'preview-ai-usage';
const MAX_FREE_AI_COMMANDS = 1;

export function InteractiveDraftPreview() {
  const navigate = useNavigate();
  const [aiUsageCount, setAiUsageCount] = useState(0);

  useEffect(() => {
    const usage = parseInt(localStorage.getItem(PREVIEW_AI_USAGE_KEY) || '0');
    setAiUsageCount(usage);
  }, []);

  const previewBlocks: Block[] = [
    {
      type: "heading",
      props: { level: 2, textAlignment: "left" },
      content: [{ type: "text", text: "Economic Impact of the Treaty of Versailles", styles: {} }]
    },
    {
      type: "paragraph",
      content: [{
        type: "text",
        text: "The Treaty of Versailles imposed severe economic penalties on Germany following World War I. The most significant of these was the reparations clause, which required Germany to pay substantial sums to the Allied powers. This financial burden, combined with the loss of industrial territories, created a devastating economic crisis that would shape European politics for decades.",
        styles: {}
      }]
    },
    {
      type: "table",
      content: {
        type: "tableContent",
        rows: [
          {
            cells: [
              [{ type: "text", text: "Year", styles: { bold: true } }],
              [{ type: "text", text: "Reparations Paid (Gold Marks)", styles: { bold: true } }],
              [{ type: "text", text: "Inflation Rate (%)", styles: { bold: true } }]
            ]
          },
          {
            cells: [
              [{ type: "text", text: "1921", styles: {} }],
              [{ type: "text", text: "2.5 billion", styles: {} }],
              [{ type: "text", text: "35.2", styles: {} }]
            ]
          },
          {
            cells: [
              [{ type: "text", text: "1922", styles: {} }],
              [{ type: "text", text: "1.8 billion", styles: {} }],
              [{ type: "text", text: "189.5", styles: {} }]
            ]
          },
          {
            cells: [
              [{ type: "text", text: "1923", styles: {} }],
              [{ type: "text", text: "0.5 billion", styles: {} }],
              [{ type: "text", text: "29,500", styles: {} }]
            ]
          }
        ]
      }
    },
    {
      type: "blockMath",
      props: {
        latex: "R = \\frac{P \\times r \\times (1+r)^n}{(1+r)^n - 1}",
        mode: "block"
      }
    },
    {
      type: "image",
      props: {
        url: globalInflationChart,
        caption: "Figure 1: Global inflation trends following the Treaty of Versailles",
        textAlignment: "center"
      }
    },
    {
      type: "paragraph",
      content: [{
        type: "text",
        text: "The hyperinflation of 1923 remains one of history's most dramatic economic collapses. At its peak, prices doubled every few days, and workers required wheelbarrows full of cash to purchase basic necessities. This crisis fundamentally undermined public faith in democratic institutions and created conditions that would eventually contribute to political extremism.",
        styles: {}
      }]
    },
    {
      type: "paragraph",
      content: [{
        type: "text",
        text: "Try typing / to see available commands like /table, /drawing, /inline math, or select text to use AI commands!",
        styles: { italic: true }
      }]
    }
  ] as Block[];

  const initialContent = previewBlocks;

  const handleAICommandAttempt = () => {
    const currentUsage = parseInt(localStorage.getItem(PREVIEW_AI_USAGE_KEY) || '0');
    
    if (currentUsage >= MAX_FREE_AI_COMMANDS) {
      toast("Sign up for unlimited AI commands!", {
        action: {
          label: "Sign Up",
          onClick: () => navigate('/auth')
        }
      });
      return false;
    }
    
    const newUsage = currentUsage + 1;
    localStorage.setItem(PREVIEW_AI_USAGE_KEY, String(newUsage));
    setAiUsageCount(newUsage);
    return true;
  };

  // Inject AI command limiting into window for BlockNoteEditor to check
  useEffect(() => {
    (window as any).__previewAICheck = handleAICommandAttempt;
    return () => {
      delete (window as any).__previewAICheck;
    };
  }, []);

  return (
    <div className="relative">
      <div className="border rounded-lg overflow-hidden max-h-[600px] overflow-y-auto bg-background shadow-sm">
        <style>
          {`
            .interactive-preview .bn-add-block-button { display: none !important; }
            .interactive-preview .word-count-footer { display: none !important; }
            .interactive-preview .bn-container { min-height: auto !important; }
          `}
        </style>
        <div className="interactive-preview">
          <BlockNoteEditorComponent 
            initialContent={initialContent}
            placeholder="Start writing or type / for commands..."
            disablePagination={true}
          />
        </div>
      </div>
    </div>
  );
}
