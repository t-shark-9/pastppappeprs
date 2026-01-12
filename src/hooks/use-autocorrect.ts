import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Fuse from 'fuse.js';

// Common English words dictionary for autocorrect suggestions
// This is a subset - in production, you'd want a larger dictionary
const COMMON_WORDS = [
  // Common misspellings and their corrections
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  // Academic words
  "analysis", "analyze", "argument", "assessment", "assumption", "authority",
  "available", "benefit", "concept", "consistent", "constitutional", "context",
  "contract", "create", "data", "definition", "derived", "distribution", "economic",
  "environment", "established", "estimate", "evidence", "export", "factors", "financial",
  "formula", "function", "identified", "income", "indicate", "individual", "interpretation",
  "involved", "issues", "labor", "legal", "legislation", "major", "method", "occur",
  "percent", "period", "policy", "principle", "procedure", "process", "required",
  "research", "response", "role", "section", "sector", "significant", "similar",
  "source", "specific", "structure", "theory", "variables", "approach", "area",
  "assessment", "assume", "authority", "available", "benefit", "concept", "consistent",
  "constitutional", "context", "contract", "create", "data", "definition", "derived",
  "distribution", "economic", "environment", "established", "estimate", "evidence",
  // IB-specific terms
  "bibliography", "citation", "criterion", "criteria", "evaluate", "evaluation",
  "hypothesis", "methodology", "objective", "perspective", "qualitative", "quantitative",
  "reflection", "synthesis", "thesis", "abstract", "acknowledgment", "appendix",
  "assessment", "bibliography", "conclusion", "discussion", "experiment", "findings",
  "hypothesis", "implications", "introduction", "literature", "methodology", "objectives",
  "participants", "procedure", "recommendation", "references", "reliability", "results",
  "significance", "validity", "variables", "knowledge", "understanding", "application",
  // Common academic verbs
  "demonstrate", "illustrate", "explain", "describe", "discuss", "examine",
  "investigate", "compare", "contrast", "analyze", "evaluate", "assess",
  "justify", "recommend", "suggest", "propose", "conclude", "summarize",
  "synthesize", "interpret", "classify", "categorize", "identify", "define",
  // Science terms
  "experiment", "hypothesis", "variable", "control", "observation", "conclusion",
  "photosynthesis", "respiration", "mitosis", "meiosis", "chromosome", "protein",
  "enzyme", "molecule", "atom", "electron", "proton", "neutron", "nucleus",
  "membrane", "organelle", "ecosystem", "biodiversity", "evolution", "adaptation",
  "genetics", "mutation", "inheritance", "allele", "genotype", "phenotype",
  "acceleration", "velocity", "momentum", "force", "energy", "kinetic", "potential",
  "thermodynamics", "electromagnetic", "wavelength", "frequency", "amplitude",
  "equilibrium", "oxidation", "reduction", "concentration", "solution", "compound",
  // Math terms
  "equation", "function", "derivative", "integral", "polynomial", "coefficient",
  "variable", "constant", "parameter", "asymptote", "logarithm", "exponential",
  "trigonometry", "geometry", "algebra", "calculus", "statistics", "probability",
  "distribution", "correlation", "regression", "hypothesis", "deviation", "variance",
  // Humanities terms
  "perspective", "context", "interpretation", "significance", "implication",
  "consequence", "influence", "development", "transformation", "revolution",
  "ideology", "philosophy", "democracy", "capitalism", "socialism", "nationalism",
  "imperialism", "colonialism", "globalization", "industrialization", "urbanization",
  "migration", "population", "resources", "sustainability", "environment",
  // Connectors and transitions
  "however", "therefore", "furthermore", "moreover", "nevertheless", "consequently",
  "although", "whereas", "meanwhile", "subsequently", "accordingly", "similarly",
  "alternatively", "specifically", "particularly", "especially", "essentially",
  "ultimately", "initially", "finally", "additionally", "correspondingly",
  // Common longer words often misspelled
  "accommodate", "achievement", "acknowledgment", "acquaintance", "acquisition",
  "advertisement", "anniversary", "apparent", "appearance", "appreciate",
  "appropriate", "approximately", "argument", "arrangement", "assessment",
  "assistance", "association", "assumption", "atmosphere", "attendance",
  "beautiful", "beginning", "beneficial", "bureaucracy", "calendar",
  "category", "cemetery", "characteristic", "circumstances", "colleagues",
  "commitment", "committee", "communicate", "community", "comparison",
  "competitive", "completely", "concentration", "conclusion", "confidence",
  "congratulations", "conscience", "conscious", "consequence", "considerable",
  "consistent", "contemporary", "continuous", "contribution", "convenience",
  "cooperation", "correspondence", "criticism", "curiosity", "definitely",
  "democracy", "demonstrate", "description", "desperation", "determination",
  "development", "difference", "difficulty", "disappear", "disappoint",
  "discipline", "discrimination", "discussion", "distinction", "distribution",
  "documentary", "embarrass", "emergence", "emphasize", "employment",
  "encourage", "engineering", "enthusiasm", "environment", "equipment",
  "especially", "essentially", "establishment", "evaluation", "eventually",
  "exaggerate", "examination", "excellence", "exception", "excitement",
  "executive", "existence", "expectation", "experience", "experiment",
  "explanation", "expression", "extraordinary", "extremely", "fascinating",
  "February", "flexibility", "fluctuation", "foreign", "fortunately",
  "foundation", "frequently", "fulfillment", "fundamental", "furthermore",
  "generalization", "government", "gradually", "guarantee", "guidance",
  "harassment", "height", "hierarchy", "humorous", "hypothesis",
  "identification", "immediately", "implementation", "implication", "importance",
  "improvement", "incidentally", "independence", "independent", "indication",
  "individual", "inevitable", "influence", "information", "infrastructure",
  "initiative", "innovation", "institution", "intelligence", "intention",
  "interesting", "interference", "international", "interpretation", "intervention",
  "introduction", "investigation", "involvement", "irrelevant", "justification",
  "knowledge", "laboratory", "legislation", "legitimate", "maintenance",
  "management", "manufacture", "mathematics", "measurement", "Mediterranean",
  "millennium", "miscellaneous", "mischievous", "misunderstanding", "modification",
  "naturally", "necessary", "negotiation", "neighborhood", "nevertheless",
  "noticeable", "obligation", "observation", "occasionally", "occurrence",
  "opportunity", "opposition", "organization", "originally", "overwhelmed",
  "parallel", "parliament", "participation", "particularly", "perception",
  "performance", "permanent", "permission", "persistence", "personality",
  "perspective", "persuasion", "phenomenon", "philosophy", "photograph",
  "politician", "popularity", "possibility", "practically", "predecessor",
  "preference", "preparation", "presentation", "preservation", "presumably",
  "prevailing", "previously", "primarily", "privilege", "probability",
  "problematic", "procedure", "professional", "proficiency", "progression",
  "pronunciation", "propaganda", "proportion", "proposition", "prospective",
  "psychological", "publication", "punctuation", "qualification", "questionnaire",
  "realization", "reasonable", "recollection", "recommendation", "reconciliation",
  "reconstruction", "refrigerator", "registration", "regulation", "reinforcement",
  "relationship", "reliability", "remarkable", "remembrance", "reminiscent",
  "renaissance", "repetition", "replacement", "representation", "reproduction",
  "requirement", "resemblance", "reservation", "resignation", "resistance",
  "resolution", "resourceful", "responsibility", "restaurant", "restriction",
  "revolutionary", "ridiculous", "significance", "simultaneous", "sophisticated",
  "specifically", "speculation", "spontaneous", "statistics", "straightforward",
  "strengthening", "subsequently", "substantially", "successful", "sufficient",
  "suggestion", "superintendent", "supplement", "surveillance", "susceptible",
  "sustainability", "symmetrical", "sympathetic", "sympathy", "synonymous",
  "systematic", "technician", "technology", "temperature", "temporarily",
  "theoretical", "thorough", "thoughtful", "throughout", "traditionally",
  "transaction", "transformation", "transmission", "transportation", "tremendous",
  "ultimately", "unanimous", "uncertainty", "undergraduate", "understanding",
  "unemployment", "unfortunately", "unnecessary", "unprecedented", "until",
  "utilization", "vaccination", "verification", "versatility", "visualization",
  "vulnerability", "Wednesday", "whatever", "whereabouts", "whether",
  "willingness", "withdrawal", "worthwhile", "yesterday",
];

interface AutocorrectOptions {
  enabled?: boolean;
  threshold?: number; // Fuse.js threshold (0 = exact, 1 = match anything)
  maxSuggestions?: number;
  minWordLength?: number;
  customDictionary?: string[];
}

interface AutocorrectSuggestion {
  word: string;
  score: number;
}

interface AutocorrectState {
  isOpen: boolean;
  suggestions: AutocorrectSuggestion[];
  selectedIndex: number;
  currentWord: string;
  position: { top: number; left: number } | null;
}

export function useAutocorrect(options: AutocorrectOptions = {}) {
  const {
    enabled = true,
    threshold = 0.4,
    maxSuggestions = 5,
    minWordLength = 3,
    customDictionary = [],
  } = options;

  const [state, setState] = useState<AutocorrectState>({
    isOpen: false,
    suggestions: [],
    selectedIndex: 0,
    currentWord: '',
    position: null,
  });

  // Create Fuse instance with memoization
  const fuse = useMemo(() => {
    const allWords = [...new Set([...COMMON_WORDS, ...customDictionary])];
    return new Fuse(allWords, {
      threshold,
      includeScore: true,
      minMatchCharLength: 2,
      distance: 100,
    });
  }, [threshold, customDictionary]);

  // Check if a word exists in dictionary (exact match)
  const isValidWord = useCallback((word: string): boolean => {
    const lowerWord = word.toLowerCase();
    return COMMON_WORDS.includes(lowerWord) || customDictionary.includes(lowerWord);
  }, [customDictionary]);

  // Get suggestions for a misspelled word
  const getSuggestions = useCallback((word: string): AutocorrectSuggestion[] => {
    if (!enabled || word.length < minWordLength) {
      return [];
    }

    // If word exists in dictionary, no suggestions needed
    if (isValidWord(word)) {
      return [];
    }

    const results = fuse.search(word.toLowerCase());
    
    return results
      .slice(0, maxSuggestions)
      .map(result => ({
        word: result.item,
        score: 1 - (result.score || 0), // Convert to confidence score (0-1)
      }));
  }, [enabled, minWordLength, maxSuggestions, fuse, isValidWord]);

  // Show suggestions dropdown
  const showSuggestions = useCallback((
    word: string,
    position: { top: number; left: number }
  ) => {
    if (!enabled) return;

    const suggestions = getSuggestions(word);
    
    if (suggestions.length > 0) {
      setState({
        isOpen: true,
        suggestions,
        selectedIndex: 0,
        currentWord: word,
        position,
      });
    } else {
      closeSuggestions();
    }
  }, [enabled, getSuggestions]);

  // Close suggestions dropdown
  const closeSuggestions = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      suggestions: [],
      currentWord: '',
      position: null,
    }));
  }, []);

  // Select next suggestion
  const selectNext = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedIndex: (prev.selectedIndex + 1) % prev.suggestions.length,
    }));
  }, []);

  // Select previous suggestion
  const selectPrevious = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedIndex: prev.selectedIndex === 0 
        ? prev.suggestions.length - 1 
        : prev.selectedIndex - 1,
    }));
  }, []);

  // Get the currently selected suggestion
  const getSelectedSuggestion = useCallback((): string | null => {
    if (!state.isOpen || state.suggestions.length === 0) {
      return null;
    }
    return state.suggestions[state.selectedIndex]?.word || null;
  }, [state]);

  // Accept the selected suggestion
  const acceptSuggestion = useCallback((index?: number): string | null => {
    const suggestionIndex = index ?? state.selectedIndex;
    const suggestion = state.suggestions[suggestionIndex];
    
    if (!suggestion) {
      return null;
    }

    const result = suggestion.word;
    closeSuggestions();
    return result;
  }, [state, closeSuggestions]);

  // Set selected index directly
  const setSelectedIndex = useCallback((index: number) => {
    if (index >= 0 && index < state.suggestions.length) {
      setState(prev => ({ ...prev, selectedIndex: index }));
    }
  }, [state.suggestions.length]);

  return {
    // State
    isOpen: state.isOpen,
    suggestions: state.suggestions,
    selectedIndex: state.selectedIndex,
    currentWord: state.currentWord,
    position: state.position,
    
    // Actions
    showSuggestions,
    closeSuggestions,
    selectNext,
    selectPrevious,
    acceptSuggestion,
    setSelectedIndex,
    getSelectedSuggestion,
    
    // Utilities
    getSuggestions,
    isValidWord,
  };
}

export type { AutocorrectSuggestion, AutocorrectState, AutocorrectOptions };
