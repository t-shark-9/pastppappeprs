import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ArrowUp, Send, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ADMIN_EMAIL } from "@/lib/constants";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface Improvement {
  id: string;
  title: string;
  description: string | null;
  user_id: string;
  created_at: string;
  vote_count: number;
  user_voted: boolean;
}

export default function Improvements() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [improvements, setImprovements] = useState<Improvement[]>([]);
  const [newSuggestion, setNewSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    loadImprovements();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);
  };

  const loadImprovements = async () => {
    setIsLoading(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    // Get all improvements
    const { data: improvementsData, error: improvementsError } = await supabase
      .from("improvements")
      .select("*")
      .order("created_at", { ascending: false });

    if (improvementsError) {
      console.error("Error loading improvements:", improvementsError);
      setIsLoading(false);
      return;
    }

    // Get all votes
    const { data: votesData, error: votesError } = await supabase
      .from("improvement_votes")
      .select("improvement_id, user_id");

    if (votesError) {
      console.error("Error loading votes:", votesError);
    }

    // Combine data
    const improvementsWithVotes = improvementsData?.map((improvement) => {
      const votes = votesData?.filter((v) => v.improvement_id === improvement.id) || [];
      return {
        ...improvement,
        vote_count: votes.length,
        user_voted: user ? votes.some((v) => v.user_id === user.id) : false,
      };
    }).sort((a, b) => b.vote_count - a.vote_count) || [];

    setImprovements(improvementsWithVotes);
    setIsLoading(false);
  };

  const handleVote = async (improvementId: string, currentlyVoted: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to vote on improvements.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (currentlyVoted) {
      // Remove vote
      const { error } = await supabase
        .from("improvement_votes")
        .delete()
        .eq("improvement_id", improvementId)
        .eq("user_id", user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove vote. Please try again.",
          variant: "destructive",
        });
        return;
      }
    } else {
      // Add vote
      const { error } = await supabase
        .from("improvement_votes")
        .insert({
          improvement_id: improvementId,
          user_id: user.id,
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to vote. Please try again.",
          variant: "destructive",
        });
        return;
      }
    }

    loadImprovements();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSuggestion.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit suggestions.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from("improvements")
      .insert({
        title: newSuggestion.trim(),
        user_id: user.id,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit suggestion. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    window.gtag?.('event', 'submit_improvement', {
      user_id: user.id
    });

    toast({
      title: "Success",
      description: "Your suggestion has been submitted!",
    });

    setNewSuggestion("");
    setIsSubmitting(false);
    loadImprovements();
  };

  const handleDelete = async (improvementId: string) => {
    if (!isAdmin) return;

    const { error } = await supabase
      .from("improvements")
      .delete()
      .eq("id", improvementId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete improvement. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Improvement deleted successfully.",
    });

    loadImprovements();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-8">
        <div className="flex items-center gap-4">
          <BackButton
            fallbackPath="/"
            size="icon"
            tooltip="Back to Home"
          />
          <div>
            <h1 className="text-4xl font-bold">Feature Improvements</h1>
          </div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Loading suggestions...
              </CardContent>
            </Card>
          ) : improvements.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No suggestions yet. Be the first to add one!
              </CardContent>
            </Card>
          ) : (
            improvements.map((improvement) => (
              <Card key={improvement.id} className="shadow-soft hover:shadow-medium transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Button
                      variant={improvement.user_voted ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleVote(improvement.id, improvement.user_voted)}
                      className="flex flex-col items-center gap-1 h-auto py-2 px-3"
                    >
                      <ArrowUp className="h-4 w-4" />
                      <span className="text-sm font-bold">{improvement.vote_count}</span>
                    </Button>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{improvement.title}</CardTitle>
                      {improvement.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {improvement.description}
                        </p>
                      )}
                    </div>
                    {isAdmin && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(improvement.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>

        <Card className="shadow-medium sticky bottom-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="text"
                placeholder="Suggest a new improvement..."
                value={newSuggestion}
                onChange={(e) => setNewSuggestion(e.target.value)}
                disabled={isSubmitting}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isSubmitting || !newSuggestion.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
