import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenLine } from "lucide-react";
import { InteractiveDraftPreview } from "./InteractiveDraftPreview";
import { useIsMobile } from "@/hooks/use-mobile";

export function PreviewDraftSection() {
  const isMobile = useIsMobile();
  
  // A4 width is 8.27 inches, at 96 DPI that's ~794px
  // We scale down the preview to fit mobile screens while maintaining A4 proportions
  const a4Width = 794;
  
  return (
    <Card className="shadow-medium h-full overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <PenLine className="h-5 w-5 text-success" />
          Block Editor Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        {isMobile ? (
          <div className="overflow-x-auto">
            <div 
              className="origin-top-left"
              style={{ 
                width: a4Width,
                transform: `scale(${(window.innerWidth - 32) / a4Width})`,
                transformOrigin: 'top left',
                height: 'auto'
              }}
            >
              <InteractiveDraftPreview />
            </div>
          </div>
        ) : (
          <InteractiveDraftPreview />
        )}
      </CardContent>
    </Card>
  );
}
