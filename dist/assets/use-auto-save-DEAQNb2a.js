import { r as reactExports } from './vendor-react-BeQHm2Hb.js';

function useAutoSave({ onSave, delay = 2e3, enabled = true }) {
  const timeoutRef = reactExports.useRef(null);
  const isSavingRef = reactExports.useRef(false);
  const saveQueuedRef = reactExports.useRef(false);
  const debouncedSave = reactExports.useCallback(() => {
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
        console.error("Auto-save failed:", error);
      } finally {
        isSavingRef.current = false;
        if (saveQueuedRef.current) {
          saveQueuedRef.current = false;
          debouncedSave();
        }
      }
    }, delay);
  }, [onSave, delay, enabled]);
  const saveNow = reactExports.useCallback(async () => {
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
      console.error("Save failed:", error);
    } finally {
      isSavingRef.current = false;
    }
  }, [onSave, enabled]);
  reactExports.useEffect(() => {
    if (!enabled) return;
    const handleBeforeUnload = (e) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        saveNow();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, saveNow]);
  return { debouncedSave, saveNow };
}

export { useAutoSave as u };
