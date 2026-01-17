import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const WordClone = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen w-full bg-background relative">
      <header className="flex-none p-4 flex items-center gap-4 border-b bg-card">
        <Link to="/work">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Word Clone</h1>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="p-12 max-w-md">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-muted-foreground" />
            <h2 className="text-2xl font-bold">Feature Unavailable</h2>
            <p className="text-muted-foreground">
              The Word Clone feature has been removed to improve app performance.
              Please use the Block Editor for document editing.
            </p>
            <Button onClick={() => navigate("/work")}>
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WordClone;
