import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Editor } from "ketcher-react";
import html2canvas from "html2canvas";
import "ketcher-react/dist/index.css";
import "./Molecule.css";

export default function Molecule() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ketcherInstance, setKetcherInstance] = useState<any>(null);

  const handleKetcherInit = (ketcher: any) => {
    setKetcherInstance(ketcher);
  };

  const handleExport = async () => {
    try {
      // Find the Ketcher canvas/SVG element
      const ketcherCanvas = document.querySelector('.ketcher-root svg') || 
                            document.querySelector('[class*="canvas"]') ||
                            document.querySelector('.ketcher-root');
      
      if (!ketcherCanvas) {
        toast({ title: "Could not find molecule canvas", variant: "destructive" });
        return;
      }

      const canvas = await html2canvas(ketcherCanvas as HTMLElement, {
        backgroundColor: "#ffffff",
        scale: 2, // Higher resolution
      });

      // Download as PNG
      const link = document.createElement("a");
      link.download = `molecule-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast({ title: "Molecule exported as PNG" });
    } catch (error) {
      console.error("Export failed:", error);
      toast({ title: "Export failed", variant: "destructive" });
    }
  };

  const handleInsertToEditor = async () => {
    try {
      // Find the Ketcher canvas/SVG element
      const ketcherCanvas = document.querySelector('.ketcher-root svg') ||
                            document.querySelector('[class*="canvas"]') ||
                            document.querySelector('.ketcher-root');
      
      if (!ketcherCanvas) {
        toast({ title: "Could not find molecule canvas", variant: "destructive" });
        return;
      }

      const canvas = await html2canvas(ketcherCanvas as HTMLElement, {
        backgroundColor: "#ffffff",
        scale: 2,
      });

      const imageData = canvas.toDataURL("image/png");
      
      // Post message to parent window (for iframe integration)
      window.parent.postMessage(
        {
          type: "molecule-insert",
          imageData,
        },
        "*"
      );
      
      toast({ title: "Molecule sent to editor" });
    } catch (error) {
      console.error("Insert failed:", error);
      toast({ title: "Insert failed", variant: "destructive" });
    }
  };

  const handleClear = async () => {
    if (!ketcherInstance) return;
    
    try {
      await ketcherInstance.editor.clear();
      toast({ title: "Canvas cleared" });
    } catch (error) {
      console.error("Clear failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Back Button */}
        <div className="mb-2">
          <BackButton fallbackPath="/work" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Molecule Editor</h1>
            <p className="text-muted-foreground">Professional 2D chemical structure drawing</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export PNG
            </Button>
            <Button variant="default" size="sm" onClick={handleInsertToEditor}>
              Insert to Editor
            </Button>
          </div>
        </div>

        <Card className="p-0 overflow-hidden">
          <div style={{ height: "calc(100vh - 200px)", minHeight: "600px" }}>
            {/* @ts-ignore - Ketcher types are complex, using minimal standalone config */}
            <Editor
              staticResourcesUrl=""
              structServiceProvider={{
                mode: "standalone",
                createStructService: () => {
                  return {
                    info: async () => ({ 
                      version: "1.0", 
                      indigoVersion: "1.0", 
                      imagoVersions: {}, 
                      isAvailable: true 
                    }),
                    convert: async () => ({ data: "" }),
                    layout: async () => ({ data: "" }),
                    clean: async () => ({ data: "" }),
                    aromatize: async () => ({ data: "" }),
                    dearomatize: async () => ({ data: "" }),
                    calculateCip: async () => ({ data: "" }),
                    automap: async () => ({ data: "" }),
                    check: async () => ({ data: null }),
                    calculate: async () => ({ data: "" }),
                    recognize: async () => ({ data: "" }),
                    generateImageAsBase64: async () => ({ data: "" }),
                    getInChIKey: async () => ({ data: "" }),
                    toggleExplicitHydrogens: async () => ({ data: "" }),
                    calculateMacromoleculeProperties: async () => ({ data: "" }),
                    addKetcherId: (struct: any) => struct,
                  } as any;
                },
              }}
              errorHandler={(error: string) => {
                console.error("Ketcher error:", error);
              }}
              onInit={handleKetcherInit}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
