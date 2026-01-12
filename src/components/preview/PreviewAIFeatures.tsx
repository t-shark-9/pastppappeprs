import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const demoText = "The hyperinflation crisis in Weimar Germany devastated the economy.";

const responses: Record<string, string> = {
  define: "Hyperinflation: extremely rapid or out of control inflation, where prices increase exponentially.",
  explain: "Hyperinflation occurs when a country's monetary system collapses, often due to excessive money printing to pay debts. In Weimar Germany, this happened when the government printed money to pay war reparations, causing the currency to lose almost all value.",
  synonym: "Alternatives for 'devastated': destroyed, ruined, crippled, decimated, shattered",
};

export function PreviewAIFeatures() {
  const [selectedWord, setSelectedWord] = useState<string | null>("hyperinflation");
  const [activeCommand, setActiveCommand] = useState<string | null>("define");

  const handleCommand = (command: string, word: string) => {
    setSelectedWord(word);
    setActiveCommand(command);
  };

  return (
    <Card className="shadow-medium h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-warning" />
          AI Commands Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-lg p-4 bg-card/50">
          <p className="text-sm leading-relaxed">
            The{" "}
            <span
              className="bg-accent/20 px-1 rounded cursor-pointer hover:bg-accent/30 transition-colors"
              onClick={() => setSelectedWord("hyperinflation")}
            >
              hyperinflation
            </span>{" "}
            crisis in Weimar Germany{" "}
            <span
              className="bg-accent/20 px-1 rounded cursor-pointer hover:bg-accent/30 transition-colors"
              onClick={() => setSelectedWord("devastated")}
            >
              devastated
            </span>{" "}
            the economy.
          </p>
        </div>

        {selectedWord && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Selected word:</span>
              <span className="text-sm bg-primary/10 px-2 py-1 rounded">{selectedWord}</span>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCommand("define", selectedWord)}
              >
                /define
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCommand("explain", selectedWord)}
              >
                /explain
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCommand("synonym", selectedWord)}
              >
                /synonym
              </Button>
            </div>

            {activeCommand && (
              <div className="p-3 rounded bg-muted border animate-in fade-in-50 duration-200">
                <p className="text-sm italic text-muted-foreground">
                  {responses[activeCommand]}
                </p>
              </div>
            )}
          </div>
        )}

        {!selectedWord && (
          <div className="text-center py-6 text-muted-foreground">
            <p className="text-sm">Click on highlighted words above to try AI commands</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
