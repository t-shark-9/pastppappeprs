import { useState, useRef, useCallback } from 'react';

// Common academic phrases and sentence starters
const COMMON_PHRASES: { trigger: string; completion: string }[] = [
  // Academic writing starters
  { trigger: "In conclusion", completion: ", it can be argued that " },
  { trigger: "In conclusion,", completion: " it can be argued that " },
  { trigger: "Furthermore", completion: ", it is evident that " },
  { trigger: "Furthermore,", completion: " it is evident that " },
  { trigger: "However", completion: ", it should be noted that " },
  { trigger: "However,", completion: " it should be noted that " },
  { trigger: "Moreover", completion: ", this demonstrates that " },
  { trigger: "Moreover,", completion: " this demonstrates that " },
  { trigger: "Therefore", completion: ", it can be concluded that " },
  { trigger: "Therefore,", completion: " it can be concluded that " },
  { trigger: "Nevertheless", completion: ", it is important to consider " },
  { trigger: "Nevertheless,", completion: " it is important to consider " },
  { trigger: "Consequently", completion: ", this leads to " },
  { trigger: "Consequently,", completion: " this leads to " },
  { trigger: "Additionally", completion: ", it is worth noting that " },
  { trigger: "Additionally,", completion: " it is worth noting that " },
  
  // Analysis phrases
  { trigger: "This suggests that", completion: " the evidence supports " },
  { trigger: "This demonstrates", completion: " the relationship between " },
  { trigger: "This indicates", completion: " a significant " },
  { trigger: "This implies", completion: " that there is a connection " },
  { trigger: "This shows", completion: " the importance of " },
  
  // Evidence phrases
  { trigger: "According to", completion: " the data, " },
  { trigger: "As shown in", completion: " Figure " },
  { trigger: "As illustrated", completion: " in the graph, " },
  { trigger: "The data shows", completion: " that " },
  { trigger: "The results indicate", completion: " that " },
  { trigger: "The evidence suggests", completion: " that " },
  
  // Comparison phrases
  { trigger: "In contrast", completion: ", the alternative view is " },
  { trigger: "In contrast,", completion: " the alternative view is " },
  { trigger: "On the other hand", completion: ", it could be argued that " },
  { trigger: "On the other hand,", completion: " it could be argued that " },
  { trigger: "Similarly", completion: ", it can be observed that " },
  { trigger: "Similarly,", completion: " it can be observed that " },
  { trigger: "Compared to", completion: " the previous example, " },
  { trigger: "In comparison", completion: " to the control group, " },
  
  // IB-specific phrases
  { trigger: "The knowledge question", completion: " that arises from this is " },
  { trigger: "From a", completion: " perspective, " },
  { trigger: "This links to", completion: " the concept of " },
  { trigger: "The implications of", completion: " this finding are " },
  { trigger: "This raises questions about", completion: " the validity of " },
  
  // Scientific writing
  { trigger: "The hypothesis", completion: " that was tested is " },
  { trigger: "The independent variable", completion: " in this experiment is " },
  { trigger: "The dependent variable", completion: " being measured is " },
  { trigger: "The control group", completion: " was used to " },
  { trigger: "The results were", completion: " consistent with " },
  { trigger: "Sources of error", completion: " include " },
  { trigger: "The uncertainty", completion: " in this measurement is " },
  
  // Essay structure
  { trigger: "Firstly", completion: ", it is important to " },
  { trigger: "Firstly,", completion: " it is important to " },
  { trigger: "Secondly", completion: ", the evidence shows " },
  { trigger: "Secondly,", completion: " the evidence shows " },
  { trigger: "Finally", completion: ", it can be concluded that " },
  { trigger: "Finally,", completion: " it can be concluded that " },
  { trigger: "To summarize", completion: ", the main points are " },
  { trigger: "To summarize,", completion: " the main points are " },
  { trigger: "In summary", completion: ", this essay has argued that " },
  { trigger: "In summary,", completion: " this essay has argued that " },
  
  // Common word completions
  { trigger: "signific", completion: "ant" },
  { trigger: "therefo", completion: "re" },
  { trigger: "furthe", completion: "rmore" },
  { trigger: "consequ", completion: "ently" },
  { trigger: "additi", completion: "onally" },
  { trigger: "moreov", completion: "er" },
  { trigger: "nevert", completion: "heless" },
  { trigger: "unfort", completion: "unately" },
  { trigger: "import", completion: "ant" },
  { trigger: "develop", completion: "ment" },
  { trigger: "environ", completion: "ment" },
  { trigger: "establi", completion: "sh" },
  { trigger: "investig", completion: "ation" },
  { trigger: "demonstr", completion: "ate" },
  { trigger: "conclus", completion: "ion" },
  { trigger: "evaluat", completion: "ion" },
  { trigger: "recomm", completion: "endation" },
  { trigger: "contribu", completion: "tion" },
];

interface AutocompleteOptions {
  enabled?: boolean;
  minChars?: number;
}

export function useTextAutocomplete(options: AutocompleteOptions = {}) {
  const {
    enabled = true,
    minChars = 3,
  } = options;

  const [suggestion, setSuggestion] = useState<string>('');
  const lastTextRef = useRef<string>('');

  const findSuggestion = useCallback((text: string): string | null => {
    if (!enabled || text.length < minChars) {
      return null;
    }

    // Get the last portion of text (last 50 chars or less)
    const recentText = text.slice(-50).trim();
    
    // Find matching phrase (case-insensitive)
    for (const phrase of COMMON_PHRASES) {
      // Check if the text ends with the trigger phrase
      if (recentText.toLowerCase().endsWith(phrase.trigger.toLowerCase())) {
        return phrase.completion;
      }
    }

    // Check for partial word completions (last word being typed)
    const lastWord = recentText.split(/\s+/).pop()?.toLowerCase() || '';
    if (lastWord.length >= 4) {
      for (const phrase of COMMON_PHRASES) {
        if (phrase.trigger.toLowerCase().startsWith(lastWord) && 
            phrase.trigger.length > lastWord.length &&
            phrase.trigger.length <= lastWord.length + 10) {
          // Return the rest of the word
          return phrase.trigger.slice(lastWord.length) + (phrase.completion || '');
        }
      }
    }

    return null;
  }, [enabled, minChars]);

  const requestSuggestion = useCallback((text: string, _context?: string) => {
    // Don't regenerate if text hasn't changed
    if (text === lastTextRef.current) {
      return;
    }

    lastTextRef.current = text;

    const newSuggestion = findSuggestion(text);
    setSuggestion(newSuggestion || '');
  }, [findSuggestion]);

  const acceptSuggestion = useCallback(() => {
    const accepted = suggestion;
    setSuggestion('');
    lastTextRef.current = '';
    return accepted;
  }, [suggestion]);

  const clearSuggestion = useCallback(() => {
    setSuggestion('');
  }, []);

  return {
    suggestion,
    isLoading: false, // Never loading since it's local
    requestSuggestion,
    acceptSuggestion,
    clearSuggestion,
  };
}
