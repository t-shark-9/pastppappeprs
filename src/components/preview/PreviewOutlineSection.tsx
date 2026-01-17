import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical, FileText } from "lucide-react";

const demoSections = [
  {
    title: "Introduction",
    bullets: ["Historical context of WWI aftermath", "Treaty of Versailles overview", "Thesis statement"],
  },
  {
    title: "Economic Impact",
    bullets: ["War reparations burden", "Hyperinflation crisis", "Unemployment rates"],
  },
  {
    title: "Political Consequences",
    bullets: ["Weimar Republic instability", "Rise of extremist parties", "Public sentiment shift"],
  },
  {
    title: "Conclusion",
    bullets: ["Summary of key factors", "Historical significance", "Broader implications"],
  },
];

export function PreviewOutlineSection() {
  return (
    <Card className="shadow-medium h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-accent-foreground" />
          Outline Builder Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {demoSections.map((section, idx) => (
          <Card key={idx} className="border-2">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm">{section.title}</h4>
              </div>
              <ul className="space-y-1 ml-6">
                {section.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
