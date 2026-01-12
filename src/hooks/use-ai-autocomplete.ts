import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AutocompleteOptions {
  debounceMs?: number;
  minChars?: number;
  maxSuggestionLength?: number;
  enabled?: boolean;
}

export function useAIAutocomplete(options: AutocompleteOptions = {}) {
  const {
    debounceMs = 1000,
    minChars = 10,
    maxSuggestionLength = 100,
    enabled = true,
  } = options;

  const [suggestion, setSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();
  const lastTextRef = useRef<string>('');

  const generateSuggestion = useCallback(async (text: string, context?: string) => {
    if (!enabled || text.length < minChars) {
      setSuggestion('');
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.functions.invoke('ai-autocomplete', {
        body: {
          text,
          context,
          maxLength: maxSuggestionLength,
        },
        signal: abortControllerRef.current.signal,
      });

      if (error) {
        console.error('Autocomplete error:', error);
        setSuggestion('');
        return;
      }

      if (data?.suggestion) {
        setSuggestion(data.suggestion);
      } else {
        setSuggestion('');
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Autocomplete error:', err);
      }
      setSuggestion('');
    } finally {
      setIsLoading(false);
    }
  }, [enabled, minChars, maxSuggestionLength]);

  const requestSuggestion = useCallback((text: string, context?: string) => {
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Don't generate if text hasn't changed or if we just accepted a suggestion
    if (text === lastTextRef.current || lastTextRef.current === '__ACCEPTED__') {
      // Reset the accepted marker after skipping once
      if (lastTextRef.current === '__ACCEPTED__') {
        lastTextRef.current = text;
      }
      return;
    }

    lastTextRef.current = text;

    // Debounce the request
    debounceTimerRef.current = setTimeout(() => {
      generateSuggestion(text, context);
    }, debounceMs);
  }, [generateSuggestion, debounceMs]);

  const acceptSuggestion = useCallback(() => {
    const accepted = suggestion;
    
    // Clear everything immediately to prevent further suggestions
    setSuggestion('');
    lastTextRef.current = '__ACCEPTED__'; // Use a marker to prevent immediate re-triggering
    
    // Cancel any pending requests
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Check if the suggestion contains LaTeX patterns
    const latexPatterns = [
      /\\frac\{[^}]*\}\{[^}]*\}/,  // fractions
      /\\sqrt\{[^}]*\}/,            // square roots
      /\^{[^}]*}/,                   // superscripts
      /_{[^}]*}/,                    // subscripts
      /\\[a-zA-Z]+/,                 // LaTeX commands
      /[∫∑∏√±≤≥≠≈∞πθαβγδ]/,        // math symbols
    ];
    
    const hasLatex = latexPatterns.some(pattern => pattern.test(accepted));
    
    return { 
      text: accepted, 
      shouldConvertToMath: hasLatex 
    };
  }, [suggestion]);

  const clearSuggestion = useCallback(() => {
    setSuggestion('');
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    suggestion,
    isLoading,
    requestSuggestion,
    acceptSuggestion,
    clearSuggestion,
  };
}
