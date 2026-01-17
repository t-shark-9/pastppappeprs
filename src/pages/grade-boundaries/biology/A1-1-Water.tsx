import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function BiologyA11Water() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <BackButton
            fallbackPath="/homepage/grade-boundaries/biology"
            size="icon"
            tooltip="Back to Biology Grade Boundaries"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">A1.1 Water</h1>
            <p className="text-muted-foreground mt-2">Biology • Theme A: Unity and diversity</p>
          </div>
        </div>

        {/* Content Overview */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Content Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Water as the medium for life - understanding the fundamental properties that make water essential for all living organisms.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Key Topics Covered:</h3>
                <div className="grid gap-3">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium">A1.1.1 — Water as the medium for life</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Understanding why water is essential for all known forms of life
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium">A1.1.2 — Hydrogen bonds and polar covalent bonds</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      How hydrogen bonding arises from polar covalent bonds in water molecules
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium">A1.1.3 — Cohesion of water molecules</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Cohesion due to hydrogen bonding and consequences for organisms
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium">A1.1.4 — Adhesion of water</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Adhesion to polar or charged materials and impacts for organisms
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium">A1.1.5 — Solvent properties of water</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Role as medium for metabolism and transport in plants and animals
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium">A1.1.6 — Physical properties of water</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consequences for animals in aquatic habitats
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium">A1.1.7 — Extraplanetary origin of water</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Origin of water on Earth and reasons for its retention
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium">A1.1.8 — Search for extraterrestrial life</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Relationship between the search for extraterrestrial life and presence of water
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Information */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Assessment Focus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold">Key Assessment Areas:</h3>
              <div className="grid gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Molecular properties and biological consequences</p>
                    <p className="text-sm text-muted-foreground">Understanding how molecular structure leads to biological function</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Applications in living systems</p>
                    <p className="text-sm text-muted-foreground">Real-world examples of water's role in biological processes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Scientific inquiry and evidence</p>
                    <p className="text-sm text-muted-foreground">Evaluating scientific evidence and theories</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Topics */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Related Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate("/homepage/grade-boundaries/biology/A1-2-nucleic-acids")}
              >
                A1.2 Nucleic acids
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate("/homepage/grade-boundaries/biology/A2-2-cell-structure")}
              >
                A2.2 Cell structure
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate("/homepage/grade-boundaries/biology/B1-1-carbohydrates-lipids")}
              >
                B1.1 Carbohydrates and lipids
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate("/homepage/grade-boundaries/biology/C1-1-enzymes-metabolism")}
              >
                C1.1 Enzymes and metabolism
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}