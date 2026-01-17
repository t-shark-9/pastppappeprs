import { useEffect, useRef, useCallback } from 'react';

interface UseAutoSaveOptions {
  onSave: () => Promise<void>;
  delay?: number;
  enabled?: boolean;
}

export function useAutoSave({ onSave, delay = 2000, enabled = true }: UseAutoSaveOptions) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSavingRef = useRef(false);
  const saveQueuedRef = useRef(false);

  const debouncedSave = useCallback(() => {
    if (!enabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (isSavingRef.current) {
        saveQueuedRef.current = true;
        return;
      }

      isSavingRef.current = true;
      try {
        await onSave();
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        isSavingRef.current = false;
        
        // If another save was queued, execute it
        if (saveQueuedRef.current) {
          saveQueuedRef.current = false;
          debouncedSave();
        }
      }
    }, delay);
  }, [onSave, delay, enabled]);

  const saveNow = useCallback(async () => {
    if (!enabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isSavingRef.current) return;

    isSavingRef.current = true;
    try {
      await onSave();
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      isSavingRef.current = false;
    }
  }, [onSave, enabled]);

  // Save when leaving the page
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (timeoutRef.current) {
        // There's a pending save, execute it synchronously
        clearTimeout(timeoutRef.current);
        saveNow();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, saveNow]);

  return { debouncedSave, saveNow };
}
