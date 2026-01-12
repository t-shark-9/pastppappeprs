import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Sparkles } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

export default function SpeedReader() {
  useSEO('speedReader');
  const location = useLocation();

  const [text, setText] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // WPM (words per minute)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load text from navigation state if available
  useEffect(() => {
    if (location.state?.text) {
      setText(location.state.text);
    }
  }, [location.state]);

  // Calculate interval in milliseconds from WPM
  const interval = (60 / speed) * 1000;

  // Prepare text into words array
  useEffect(() => {
    if (text.trim()) {
      const wordArray = text.split(/\s+/).filter(word => word.length > 0);
      setWords(wordArray);
      setCurrentIndex(0);
    } else {
      setWords([]);
      setCurrentIndex(0);
    }
  }, [text]);

  // Handle playback
  useEffect(() => {
    if (isPlaying && words.length > 0) {
      if (currentIndex >= words.length) {
        setIsPlaying(false);
        return;
      }

      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const next = prev + 1;
          if (next >= words.length) {
            setIsPlaying(false);
            return prev;
          }
          return next;
        });
      }, interval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isPlaying, words.length, interval, currentIndex]);

  const togglePlay = useCallback(() => {
    if (words.length === 0) return;
    if (currentIndex >= words.length) {
      setCurrentIndex(0);
    }
    setIsPlaying(!isPlaying);
  }, [words.length, currentIndex, isPlaying]);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const loadSample = useCallback(() => {
    const sampleText = `Speed reading is a collection of reading methods which attempt to increase rates of reading without greatly reducing comprehension or retention. Methods include chunking and eliminating subvocalization. The many available speed-reading training programs include books, videos, software, and seminars.

There is little scientific evidence regarding speed reading, and as a result its value is contested. Cognitive neuroscientist Stanislas Dehaene says that claims of reading speeds of above 500 words per minute "must be viewed with skepticism" and that above 300 wpm people must start to use things like skimming or scanning which do not qualify as reading.

The average adult reads prose text at 250 to 300 words per minute. While proofreaders tasked with detecting errors read more slowly at 200 wpm. Higher reading speeds are claimed through speed reading programs.

This speed reading application helps you practice the technique of presenting one word at a time in a fixed position, allowing your eyes to stay focused while your brain processes each word individually. This method can help reduce subvocalization and improve reading efficiency for certain types of content.`;
    
    setText(sampleText);
  }, []);

  const progress = words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0;

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in textarea
      if (e.target instanceof HTMLTextAreaElement) return;
      
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'Escape') {
        e.preventDefault();
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, reset]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-5xl mx-auto px-6 py-16 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <BackButton
            fallbackPath="/"
            size="icon"
            tooltip="Back to Home"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl md:text-5xl font-bold">Speed Reader</h1>
              {location.state?.source && (
                <Badge variant="secondary" className="text-sm">
                  {location.state.source}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-2">Read faster by focusing on one word at a time</p>
          </div>
        </div>

        {/* What is Speed Reading */}
        <Card className="shadow-medium border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                What is Speed Reading?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Speed reading is a technique that presents one word at a time in a fixed position, allowing your 
                eyes to stay focused while your brain processes each word individually. This method helps reduce 
                subvocalization (internally "saying" words) and can significantly improve reading efficiency. 
                The average person reads at 250-300 words per minute, but with practice, you can increase this 
                to 400-600 WPM while maintaining comprehension.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Text Input Section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Enter Your Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste or type your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="resize-none"
            />
            <Button onClick={loadSample} variant="outline" size="sm">
              Load Sample Text
            </Button>
          </CardContent>
        </Card>

        {/* Display Section */}
        <Card className="shadow-medium">
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Word Display */}
              <div className="min-h-[200px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-lg border-2 border-primary/20">
                <div className="text-center px-6">
                  {words.length === 0 ? (
                    <p className="text-3xl font-medium text-muted-foreground italic">
                      Enter some text to begin...
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-6xl md:text-7xl font-bold text-foreground animate-in fade-in zoom-in duration-200">
                        {words[currentIndex] || "Ready to start"}
                      </p>
                      <p className="text-lg text-muted-foreground">
                        Word {currentIndex + 1} of {words.length}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Speed Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Reading Speed</label>
                  <span className="text-sm font-medium text-primary">{speed} WPM</span>
                </div>
                <Slider
                  value={[speed]}
                  onValueChange={(value) => setSpeed(value[0])}
                  min={100}
                  max={1000}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Slow (100 WPM)</span>
                  <span>Fast (1000 WPM)</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={togglePlay} 
                  disabled={words.length === 0}
                  size="lg"
                  className="min-w-[140px]"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="mr-2 h-5 w-5" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" />
                      {currentIndex >= words.length ? "Replay" : "Start"}
                    </>
                  )}
                </Button>
                <Button 
                  onClick={reset} 
                  variant="outline"
                  size="lg"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  <kbd className="px-2 py-1 bg-muted rounded border text-xs font-mono">Space</kbd> to play/pause
                  {" • "}
                  <kbd className="px-2 py-1 bg-muted rounded border text-xs font-mono">Esc</kbd> to reset
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Speed Reading Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Stay Centered:</strong> Focus your eyes on the center of the display area</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Avoid Subvocalization:</strong> Try not to "say" the words in your head</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Start Slow:</strong> Begin with comfortable speeds (250-300 WPM) and gradually increase</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Practice Regularly:</strong> Consistent practice helps improve reading efficiency</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Test Comprehension:</strong> After reading, test your understanding of the content</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
