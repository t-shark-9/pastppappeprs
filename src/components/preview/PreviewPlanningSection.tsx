import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Lightbulb } from "lucide-react";
import { useState } from "react";

export function PreviewPlanningSection() {
  const [idea] = useState(
    "I want to explore how the Treaty of Versailles contributed to economic instability in Germany and ultimately led to the rise of extremist political movements in the 1920s and 1930s."
  );

  const coaching = {
    questions: [
      "What specific economic mechanisms did the Treaty impose that created instability?",
      "How did German citizens perceive the reparations compared to their wartime experience?",
      "What role did inflation play in undermining democratic institutions?",
    ],
    thesisPattern: "[Economic factor] combined with [social factor] created conditions that [political outcome]",
  };

  return (
    <Card className="shadow-medium h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-primary" />
          Idea Builder Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm">Your Initial Idea</Label>
          <Textarea
            value={idea}
            readOnly
            rows={4}
            className="resize-none bg-muted/50"
          />
        </div>

        <div className="border-t pt-4 space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">AI Coaching Questions</h4>
            <ul className="space-y-2">
              {coaching.questions.map((q, i) => (
                <li key={i} className="text-sm p-2 rounded bg-accent/10 border border-accent/20">
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Thesis Pattern</h4>
            <p className="text-sm p-2 rounded bg-primary/10 border border-primary/20 italic">
              {coaching.thesisPattern}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
