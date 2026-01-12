import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, RotateCcw, Brain, CheckCircle2, XCircle, ChevronRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  deck_id: string;
  interval: number;
  repetitions: number;
  ease_factor: number;
  next_review_date: string;
}

interface FlashcardDeck {
  id: string;
  title: string;
}

// SM-2 Algorithm implementation
function calculateSM2(card: Flashcard, quality: number): Partial<Flashcard> {
  // quality: 0-5 (0-2 = fail, 3-5 = pass)
  let { interval, repetitions, ease_factor } = card;
  
  if (quality < 3) {
    // Failed - reset
    repetitions = 0;
    interval = 1;
  } else {
    // Passed
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease_factor);
    }
    repetitions += 1;
  }
  
  // Update ease factor
  ease_factor = Math.max(
    1.3,
    ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );
  
  // Calculate next review date
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);
  
  return {
    interval,
    repetitions,
    ease_factor: parseFloat(ease_factor.toFixed(2)),
    next_review_date: nextReview.toISOString(),
  };
}

export default function Study() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(searchParams.get('deck'));
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyComplete, setStudyComplete] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, total: 0 });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    loadDecks();
  }, [user, navigate]);

  const loadDecks = async () => {
    try {
      const { data, error } = await (supabase
        .from("flashcard_decks" as any)
        .select("id, title")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false }) as any);

      if (error) throw error;

      setDecks(data || []);
      
      // If deck was passed in URL, load its cards
      const deckFromUrl = searchParams.get('deck');
      if (deckFromUrl && data?.some((d: any) => d.id === deckFromUrl)) {
        setSelectedDeckId(deckFromUrl);
      } else if (data && data.length > 0 && !selectedDeckId) {
        setSelectedDeckId(data[0].id);
      }
    } catch (error) {
      console.error("Failed to load decks:", error);
      toast.error("Failed to load decks");
    } finally {
      setLoading(false);
    }
  };

  const loadDueCards = useCallback(async () => {
    if (!selectedDeckId) return;

    try {
      const { data, error } = await (supabase
        .from("flashcards" as any)
        .select("*")
        .eq("deck_id", selectedDeckId)
        .lte("next_review_date", new Date().toISOString())
        .order("next_review_date", { ascending: true }) as any);

      if (error) throw error;

      // Shuffle cards for variety
      const shuffled = (data || []).sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setCurrentIndex(0);
      setIsFlipped(false);
      setStudyComplete(shuffled.length === 0);
      setStats({ correct: 0, incorrect: 0, total: shuffled.length });
    } catch (error) {
      console.error("Failed to load cards:", error);
      toast.error("Failed to load flashcards");
    }
  }, [selectedDeckId]);

  useEffect(() => {
    if (selectedDeckId) {
      loadDueCards();
    }
  }, [loadDueCards, selectedDeckId]);

  const handleAnswer = async (quality: number) => {
    if (currentIndex >= cards.length) return;

    const currentCard = cards[currentIndex];
    const updates = calculateSM2(currentCard, quality);

    try {
      // Update card in database
      await (supabase
        .from("flashcards" as any)
        .update({
          ...updates,
          last_review_date: new Date().toISOString(),
        })
        .eq("id", currentCard.id) as any);

      // Log the review
      await (supabase
        .from("flashcard_reviews" as any)
        .insert({
          flashcard_id: currentCard.id,
          user_id: user?.id,
          quality,
        }) as any);

      // Update stats
      if (quality >= 3) {
        setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        setStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      }

      // Move to next card
      if (currentIndex + 1 >= cards.length) {
        setStudyComplete(true);
      } else {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
      }
    } catch (error) {
      console.error("Failed to update card:", error);
      toast.error("Failed to save progress");
    }
  };

  const resetStudy = () => {
    loadDueCards();
  };

  const currentCard = cards[currentIndex];
  const progress = cards.length > 0 ? ((currentIndex) / cards.length) * 100 : 0;
  const selectedDeck = decks.find(d => d.id === selectedDeckId);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm shrink-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BackButton
                fallbackPath="/notes"
                size="sm"
                label="Back to Notes"
                className="gap-2"
              />
              <h1 className="text-2xl font-semibold">Study Mode</h1>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedDeckId || ""} onValueChange={setSelectedDeckId}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select a deck..." />
                </SelectTrigger>
                <SelectContent>
                  {decks.map(deck => (
                    <SelectItem key={deck.id} value={deck.id}>
                      {deck.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {!selectedDeckId ? (
            <Card className="p-12 text-center">
              <Brain className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h2 className="text-xl font-semibold mb-2">No Deck Selected</h2>
              <p className="text-muted-foreground mb-4">
                Select a deck to start studying
              </p>
            </Card>
          ) : studyComplete ? (
            <Card className="p-12 text-center">
              {stats.total === 0 ? (
                <>
                  <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-success" />
                  <h2 className="text-xl font-semibold mb-2">All Caught Up!</h2>
                  <p className="text-muted-foreground mb-6">
                    No cards are due for review in {selectedDeck?.title || 'this deck'}.
                  </p>
                  <BackButton
                    fallbackPath="/notes"
                    label="Back to Notes"
                    className="gap-2"
                  />
                </>
              ) : (
                <>
                  <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <h2 className="text-xl font-semibold mb-2">Study Session Complete!</h2>
                  <div className="flex justify-center gap-8 my-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success">{stats.correct}</div>
                      <div className="text-sm text-muted-foreground">Correct</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-destructive">{stats.incorrect}</div>
                      <div className="text-sm text-muted-foreground">Needs Review</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{stats.total}</div>
                      <div className="text-sm text-muted-foreground">Total</div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline" onClick={resetStudy} className="gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Study Again
                    </Button>
                    <BackButton
                      fallbackPath="/notes"
                      label="Back to Notes"
                      className="gap-2"
                    />
                  </div>
                </>
              )}
            </Card>
          ) : currentCard ? (
            <div className="space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Card {currentIndex + 1} of {cards.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Flashcard */}
              <div 
                className="perspective-1000 cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <Card 
                  className={`relative min-h-[300px] transition-all duration-500 transform-style-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front */}
                  <CardContent 
                    className="absolute inset-0 p-8 flex flex-col items-center justify-center backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Question</div>
                    <p className="text-xl text-center font-medium">{currentCard.front}</p>
                    <div className="absolute bottom-4 text-xs text-muted-foreground">
                      Click to reveal answer
                    </div>
                  </CardContent>

                  {/* Back */}
                  <CardContent 
                    className="absolute inset-0 p-8 flex flex-col items-center justify-center bg-primary/5"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Answer</div>
                    <p className="text-xl text-center">{currentCard.back}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Answer Buttons */}
              {isFlipped && (
                <div className="grid grid-cols-4 gap-3">
                  <Button
                    variant="outline"
                    className="flex-col h-auto py-4 border-destructive/50 hover:bg-destructive/10 hover:border-destructive"
                    onClick={() => handleAnswer(0)}
                  >
                    <XCircle className="h-5 w-5 mb-1 text-destructive" />
                    <span className="text-xs font-medium">Again</span>
                    <span className="text-xs text-muted-foreground">1 min</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-col h-auto py-4 border-orange-500/50 hover:bg-orange-500/10 hover:border-orange-500"
                    onClick={() => handleAnswer(2)}
                  >
                    <ChevronRight className="h-5 w-5 mb-1 text-orange-500" />
                    <span className="text-xs font-medium">Hard</span>
                    <span className="text-xs text-muted-foreground">1 day</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-col h-auto py-4 border-primary/50 hover:bg-primary/10 hover:border-primary"
                    onClick={() => handleAnswer(3)}
                  >
                    <CheckCircle2 className="h-5 w-5 mb-1 text-primary" />
                    <span className="text-xs font-medium">Good</span>
                    <span className="text-xs text-muted-foreground">{currentCard.interval || 1} days</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-col h-auto py-4 border-success/50 hover:bg-success/10 hover:border-success"
                    onClick={() => handleAnswer(5)}
                  >
                    <Sparkles className="h-5 w-5 mb-1 text-success" />
                    <span className="text-xs font-medium">Easy</span>
                    <span className="text-xs text-muted-foreground">{Math.round((currentCard.interval || 1) * 1.5)} days</span>
                  </Button>
                </div>
              )}

              {/* Keyboard hints */}
              <div className="text-center text-xs text-muted-foreground">
                Press <kbd className="px-1.5 py-0.5 bg-muted rounded">Space</kbd> to flip • 
                <kbd className="px-1.5 py-0.5 bg-muted rounded ml-1">1-4</kbd> to answer
              </div>
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="mt-4 text-muted-foreground">Loading cards...</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
