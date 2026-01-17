import { useEffect, useState } from "react";
import { Loader2, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RouteLoadingFallback() {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setIsSlow(true), 8000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading…</p>

        {isSlow && (
          <div className="mt-2 rounded-lg border bg-card p-4 text-left w-full">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  This is taking longer than expected.
                </p>
                <p className="text-sm text-muted-foreground">
                  Please try refreshing. If it keeps happening, it may be a temporary network/cache issue.
                </p>
                <Button
                  type="button"
                  className="gap-2"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

