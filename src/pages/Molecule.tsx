import * as React from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Molecule() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="mb-2">
          <BackButton fallbackPath="/work" />
        </div>

        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-muted-foreground" />
            <h1 className="text-2xl font-bold">Molecule Editor Unavailable</h1>
            <p className="text-muted-foreground max-w-md">
              The molecule drawing feature has been temporarily removed to improve app performance and stability.
            </p>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
