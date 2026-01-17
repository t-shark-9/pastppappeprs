import { useEffect, useState, useRef, useCallback } from "react";
import { BlockNoteEditor, Block } from "@blocknote/core";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import katex from "katex";
import "katex/dist/katex.min.css";
import { Sigma, Settings } from "lucide-react";

// LaTeX autocomplete suggestions
const latexCommands = [
  // Greek letters
  { command: "\\alpha", description: "α - Greek alpha", category: "Greek" },
  { command: "\\beta", description: "β - Greek beta", category: "Greek" },
  { command: "\\gamma", description: "γ - Greek gamma", category: "Greek" },
  { command: "\\delta", description: "δ - Greek delta", category: "Greek" },
  { command: "\\epsilon", description: "ε - Greek epsilon", category: "Greek" },
  { command: "\\theta", description: "θ - Greek theta", category: "Greek" },
  { command: "\\lambda", description: "λ - Greek lambda", category: "Greek" },
  { command: "\\mu", description: "μ - Greek mu", category: "Greek" },
  { command: "\\pi", description: "π - Greek pi", category: "Greek" },
  { command: "\\sigma", description: "σ - Greek sigma", category: "Greek" },
  { command: "\\phi", description: "φ - Greek phi", category: "Greek" },
  { command: "\\omega", description: "ω - Greek omega", category: "Greek" },
  { command: "\\Gamma", description: "Γ - Capital gamma", category: "Greek" },
  { command: "\\Delta", description: "Δ - Capital delta", category: "Greek" },
  { command: "\\Sigma", description: "Σ - Capital sigma", category: "Greek" },
  { command: "\\Omega", description: "Ω - Capital omega", category: "Greek" },
  
  // Math operators
  { command: "\\frac{}{}", description: "Fraction", category: "Functions" },
  { command: "\\sqrt{}", description: "Square root", category: "Functions" },
  { command: "\\sqrt[]{}", description: "Nth root", category: "Functions" },
  { command: "\\sum_{i=1}^{n}", description: "Sum from i=1 to n", category: "Functions" },
  { command: "\\prod_{i=1}^{n}", description: "Product from i=1 to n", category: "Functions" },
  { command: "\\int_{a}^{b}", description: "Definite integral from a to b", category: "Functions" },
  { command: "\\lim_{x \\to }", description: "Limit as x approaches", category: "Functions" },
  { command: "\\partial", description: "∂ - Partial derivative", category: "Operators" },
  { command: "\\infty", description: "∞ - Infinity", category: "Operators" },
  { command: "\\pm", description: "± - Plus minus", category: "Operators" },
  { command: "\\times", description: "× - Times", category: "Operators" },
  { command: "\\div", description: "÷ - Division", category: "Operators" },
  { command: "\\cdot", description: "· - Center dot", category: "Operators" },
  { command: "\\neq", description: "≠ - Not equal", category: "Operators" },
  { command: "\\leq", description: "≤ - Less than or equal", category: "Operators" },
  { command: "\\geq", description: "≥ - Greater than or equal", category: "Operators" },
  { command: "\\approx", description: "≈ - Approximately", category: "Operators" },
  
  // Arrows
  { command: "\\rightarrow", description: "→ - Right arrow", category: "Arrows" },
  { command: "\\leftarrow", description: "← - Left arrow", category: "Arrows" },
  { command: "\\Rightarrow", description: "⇒ - Right double arrow", category: "Arrows" },
  { command: "\\Leftarrow", description: "⇐ - Left double arrow", category: "Arrows" },
  { command: "\\leftrightarrow", description: "↔ - Bidirectional arrow", category: "Arrows" },
  
  // Sets
  { command: "\\in", description: "∈ - Element of", category: "Sets" },
  { command: "\\notin", description: "∉ - Not element of", category: "Sets" },
  { command: "\\subset", description: "⊂ - Subset", category: "Sets" },
  { command: "\\subseteq", description: "⊆ - Subset or equal", category: "Sets" },
  { command: "\\cup", description: "∪ - Union", category: "Sets" },
  { command: "\\cap", description: "∩ - Intersection", category: "Sets" },
  { command: "\\emptyset", description: "∅ - Empty set", category: "Sets" },
  
  // Matrices
  { command: "\\begin{matrix}\n  &  \\\\\n  & \n\\end{matrix}", description: "Matrix", category: "Matrices" },
  { command: "\\begin{pmatrix}\n  &  \\\\\n  & \n\\end{pmatrix}", description: "Matrix with parentheses", category: "Matrices" },
  { command: "\\begin{bmatrix}\n  &  \\\\\n  & \n\\end{bmatrix}", description: "Matrix with brackets", category: "Matrices" },
  
  // Common formulas
  { command: "x^{2}", description: "x squared", category: "Common" },
  { command: "x^{n}", description: "x to the power of n", category: "Common" },
  { command: "x_{i}", description: "x subscript i", category: "Common" },
  { command: "\\log", description: "Logarithm", category: "Functions" },
  { command: "\\ln", description: "Natural logarithm", category: "Functions" },
  { command: "\\sin", description: "Sine function", category: "Functions" },
  { command: "\\cos", description: "Cosine function", category: "Functions" },
  { command: "\\tan", description: "Tangent function", category: "Functions" },
];

interface AutocompleteProps {
  isVisible: boolean;
  suggestions: typeof latexCommands;
  selectedIndex: number;
  onSelect: (command: string) => void;
  position: { top: number; left: number };
}

function AutocompleteDropdown({ isVisible, suggestions, selectedIndex, onSelect, position }: AutocompleteProps) {
  if (!isVisible || suggestions.length === 0) return null;

  return (
    <div
      className="absolute z-50 max-h-48 w-80 overflow-y-auto bg-background border border-border rounded-md shadow-lg"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {suggestions.map((suggestion, index) => (
        <div
          key={suggestion.command}
          className={`px-3 py-2 cursor-pointer border-b border-muted/50 last:border-b-0 ${
            index === selectedIndex ? 'bg-primary/10' : 'hover:bg-muted/50'
          }`}
          onClick={() => onSelect(suggestion.command)}
        >
          <div className="font-mono text-sm font-medium">{suggestion.command}</div>
          <div className="text-xs text-muted-foreground">{suggestion.description}</div>
        </div>
      ))}
    </div>
  );
}

interface MathBlockProps {
  block: Block & {
    props: {
      latex: string;
      mode: "inline" | "block";
      collapsed: boolean;
      numbered?: boolean;
      label?: string;
    };
  };
  editor: BlockNoteEditor;
}

// Quick-access symbols for toolbar
const quickSymbols = [
  { label: "x²", latex: "^{2}", title: "Squared" },
  { label: "xⁿ", latex: "^{}", title: "Power" },
  { label: "√", latex: "\\sqrt{}", title: "Square root" },
  { label: "a/b", latex: "\\frac{}{}", title: "Fraction" },
  { label: "∑", latex: "\\sum_{i=1}^{n}", title: "Sum" },
  { label: "∫", latex: "\\int_{a}^{b}", title: "Integral" },
  { label: "α", latex: "\\alpha", title: "Alpha" },
  { label: "β", latex: "\\beta", title: "Beta" },
  { label: "π", latex: "\\pi", title: "Pi" },
  { label: "θ", latex: "\\theta", title: "Theta" },
  { label: "∞", latex: "\\infty", title: "Infinity" },
  { label: "±", latex: "\\pm", title: "Plus/Minus" },
  { label: "≠", latex: "\\neq", title: "Not equal" },
  { label: "≤", latex: "\\leq", title: "Less or equal" },
  { label: "≥", latex: "\\geq", title: "Greater or equal" },
];

export function MathBlock({ block, editor }: MathBlockProps) {
  const [latex, setLatex] = useState(block.props.latex || "");
  const mode = block.props.mode || "block";
  const [isEditing, setIsEditing] = useState(!block.props.latex);
  const [error, setError] = useState<string | null>(null);
  const [renderedHtml, setRenderedHtml] = useState("");
  const [numbered, setNumbered] = useState(block.props.numbered || false);
  const [label, setLabel] = useState(block.props.label || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Autocomplete state
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<typeof latexCommands>([]);
  const [autocompleteIndex, setAutocompleteIndex] = useState(0);
  const [autocompletePosition, setAutocompletePosition] = useState({ top: 0, left: 0 });
  const [currentPrefix, setCurrentPrefix] = useState("");

  // Get equation number from editor document scanning (with fallback)
  const [dynamicEquationNumber, setDynamicEquationNumber] = useState(1);

  // Function to scan document for numbered equations and determine this block's position
  const calculateEquationNumber = useCallback(() => {
    if (!editor?.document) return 1;

    let equationNumber = 1;
    const scanBlocks = (blocks: any[]): boolean => {
      for (const scanBlock of blocks) {
        // If we find our block, return current number
        if (scanBlock.id === block.id) {
          return true; // Found our block
        }
        
        // If this is a numbered math block, increment counter
        if ((scanBlock.type === 'blockMath' || scanBlock.type === 'inlineMath') && 
            scanBlock.props?.numbered === true) {
          equationNumber++;
        }
        
        // Recursively scan children if they exist
        if (scanBlock.children && Array.isArray(scanBlock.children)) {
          if (scanBlocks(scanBlock.children)) {
            return true; // Found our block in children
          }
        }
      }
      return false; // Block not found in this level
    };

    try {
      if (scanBlocks(editor.document as any[])) {
        setDynamicEquationNumber(numbered ? equationNumber : 1);
      }
    } catch (error) {
      // Fallback to static numbering if scanning fails
      console.warn('Dynamic equation numbering failed, using static fallback');
      if (typeof window !== 'undefined') {
        const count = (window as any).__equationCounter || 0;
        (window as any).__equationCounter = count + 1;
        setDynamicEquationNumber(count + 1);
      }
    }
  }, [editor, block.id, numbered]);

  // Recalculate equation number when document changes or numbering setting changes
  useEffect(() => {
    calculateEquationNumber();
  }, [calculateEquationNumber]);

  // Listen to document changes to update equation numbering
  useEffect(() => {
    if (!editor) return;

    const unsubscribe = editor.onEditorContentChange(() => {
      // Debounce to avoid excessive recalculation
      const timeout = setTimeout(calculateEquationNumber, 100);
      return () => clearTimeout(timeout);
    });

    return unsubscribe;
  }, [editor, calculateEquationNumber]);

  // Render LaTeX with KaTeX
  useEffect(() => {
    if (!latex || latex.trim() === "") {
      setRenderedHtml("");
      setError(null);
      return;
    }

    try {
      const html = katex.renderToString(latex, {
        displayMode: mode === "block",
        throwOnError: true,
        strict: false,
      });
      setRenderedHtml(html);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid LaTeX syntax");
      setRenderedHtml("");
    }
  }, [latex, mode]);

  // Debounced update to BlockNote
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      editor.updateBlock(block, {
        props: {
          latex,
          mode,
          collapsed: false,
          numbered,
          label,
        },
      });
    }, 300);

      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
      };
    }, [latex, mode, numbered, label, editor, block]);  // Focus textarea on mount if no latex
  useEffect(() => {
    if (!latex && textareaRef.current && isEditing) {
      textareaRef.current.focus();
    }
  }, []);

  const handleLatexChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLatex(newValue);
    
    // Handle autocomplete
    const textarea = e.target;
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = newValue.slice(0, cursorPos);
    
    // Look for LaTeX command at cursor position
    const match = textBeforeCursor.match(/\\([a-zA-Z]*)$/);
    
    if (match) {
      const prefix = match[1];
      setCurrentPrefix(`\\${prefix}`);
      
      // Filter commands that start with the prefix
      const filtered = latexCommands.filter(cmd => 
        cmd.command.toLowerCase().startsWith(`\\${prefix.toLowerCase()}`)
      ).slice(0, 8); // Limit to 8 suggestions
      
      if (filtered.length > 0) {
        setAutocompleteSuggestions(filtered);
        setAutocompleteIndex(0);
        
        // Calculate position for autocomplete dropdown
        const rect = textarea.getBoundingClientRect();
        const style = window.getComputedStyle(textarea);
        const lineHeight = parseInt(style.lineHeight) || 20;
        
        // Rough calculation of cursor position
        const textMetrics = textBeforeCursor.split('\n');
        const currentLine = textMetrics.length - 1;
        const currentCol = textMetrics[textMetrics.length - 1].length;
        
        setAutocompletePosition({
          top: rect.top + (currentLine + 1) * lineHeight + 5,
          left: rect.left + currentCol * 8, // Rough character width
        });
        
        setShowAutocomplete(true);
      } else {
        setShowAutocomplete(false);
      }
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showAutocomplete) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setAutocompleteIndex(prev => 
            prev < autocompleteSuggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setAutocompleteIndex(prev => 
            prev > 0 ? prev - 1 : autocompleteSuggestions.length - 1
          );
          break;
        case 'Enter':
        case 'Tab':
          e.preventDefault();
          if (autocompleteSuggestions[autocompleteIndex]) {
            handleAutocompleteSelect(autocompleteSuggestions[autocompleteIndex].command);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setShowAutocomplete(false);
          break;
      }
    }
  };

  const handleAutocompleteSelect = (command: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const cursorPos = textarea.selectionStart;
    const textBefore = latex.slice(0, cursorPos);
    const textAfter = latex.slice(cursorPos);
    
    // Replace the current prefix with the selected command
    const prefixStart = textBefore.lastIndexOf(currentPrefix);
    const newTextBefore = textBefore.slice(0, prefixStart);
    const newLatex = newTextBefore + command + textAfter;
    
    setLatex(newLatex);
    setShowAutocomplete(false);
    
    // Position cursor after the inserted command
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos = prefixStart + command.length;
        // If command has {}, position cursor inside first brace
        const bracePos = command.indexOf('{}');
        if (bracePos !== -1) {
          textareaRef.current.selectionStart = prefixStart + bracePos + 1;
          textareaRef.current.selectionEnd = prefixStart + bracePos + 1;
        } else {
          textareaRef.current.selectionStart = newCursorPos;
          textareaRef.current.selectionEnd = newCursorPos;
        }
        textareaRef.current.focus();
      }
    }, 0);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditing) {
      setIsEditing(true);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const insertAtCursor = (text: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newLatex = latex.slice(0, start) + text + latex.slice(end);
    
    setLatex(newLatex);
    
    // Move cursor inside braces if template has {}
    setTimeout(() => {
      if (textareaRef.current) {
        const cursorOffset = text.includes("{}") ? text.indexOf("{}") + 1 : text.length;
        textareaRef.current.selectionStart = start + cursorOffset;
        textareaRef.current.selectionEnd = start + cursorOffset;
        textareaRef.current.focus();
      }
    }, 0);
  };

  return (
    <div
      className={`my-2 transition-colors ${mode === "block" ? "mx-auto max-w-fit" : ""} ${
        isEditing 
          ? "border border-border rounded-lg bg-background" 
          : "border border-transparent hover:border-muted-foreground/20 rounded-lg"
      }`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      role="math"
      aria-label={`Math equation: ${latex || "empty"}`}
    >
      {/* Header - only show when editing */}
      {isEditing && (
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <Sigma className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">
            {mode === "block" ? "Block Equation" : "Inline Equation"}
          </span>
          {numbered && mode === "block" && (
            <span className="text-xs text-muted-foreground">
              ({label || dynamicEquationNumber})
            </span>
          )}
        </div>
        
        {mode === "block" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Settings className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3" align="end">
              <div className="space-y-4">
                <div className="text-sm font-medium">Equation Settings</div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="numbered"
                    checked={numbered}
                    onCheckedChange={setNumbered}
                  />
                  <Label htmlFor="numbered" className="text-sm">
                    Number equation
                  </Label>
                </div>
                
                {numbered && (
                  <div className="space-y-2">
                    <Label htmlFor="label" className="text-sm">
                      Label (optional)
                    </Label>
                    <input
                      id="label"
                      type="text"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      placeholder={`Equation ${dynamicEquationNumber}`}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      )}

      <div className={isEditing ? "p-3" : "px-1"}>
        {isEditing ? (
          <div className="space-y-3">
            {/* Quick Symbol Toolbar */}
            <div className="flex flex-wrap gap-1 pb-2 border-b">
              {quickSymbols.map((sym, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    insertAtCursor(sym.latex);
                  }}
                  title={sym.title}
                >
                  {sym.label}
                </Button>
              ))}
            </div>

            {/* LaTeX Input with Autocomplete */}
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={latex}
                onChange={handleLatexChange}
                onKeyDown={handleKeyDown}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAutocomplete(false); // Hide autocomplete on click
                }}
                placeholder="Enter LaTeX equation (e.g., x^2 + 2x + 1)&#10;Type \ for autocomplete suggestions"
                className={`font-mono text-sm resize-none ${isExpanded ? 'flex-1 min-h-[200px]' : 'min-h-[60px]'}`}
                autoFocus
              />
              
              <AutocompleteDropdown
                isVisible={showAutocomplete}
                suggestions={autocompleteSuggestions}
                selectedIndex={autocompleteIndex}
                onSelect={handleAutocompleteSelect}
                position={autocompletePosition}
              />
            </div>

            {/* Live Preview */}
            <div className="border rounded-lg p-3 bg-muted/30">
              <div className="text-xs text-muted-foreground mb-2">Live Preview</div>
              <div className={`min-h-[40px] flex items-center ${mode === "block" ? "justify-center" : ""}`}>
                {error ? (
                  <div className="text-xs text-destructive text-center w-full">{error}</div>
                ) : renderedHtml ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: renderedHtml }}
                    className="select-text w-full text-center"
                  />
                ) : (
                  <span className="text-muted-foreground italic text-sm w-full text-center">
                    Start typing to see preview...
                  </span>
                )}
              </div>
            </div>

            {/* Done button */}
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(false);
                }}
              >
                Done
              </Button>
            </div>
          </div>
        ) : (
          /* Rendered View - Double-click to edit */
          <div className={`py-2 cursor-text select-text ${mode === "block" ? "text-center" : "inline-block"}`}>
            {renderedHtml ? (
              <div className="flex items-center justify-center gap-4">
                <div
                  dangerouslySetInnerHTML={{ __html: renderedHtml }}
                  className="select-text"
                />
                {numbered && mode === "block" && (
                  <span className="text-sm text-muted-foreground font-medium">
                    ({label || dynamicEquationNumber})
                  </span>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground italic text-sm text-center">
                Double-click to enter equation
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Inline Math Component for use within paragraphs
interface InlineMathProps {
  inlineContent: any;
  updateInlineContent: (updates: any) => void;
}

export function InlineMathComponent({ inlineContent, updateInlineContent }: InlineMathProps) {
  const [isEditing, setIsEditing] = useState(!inlineContent.props.latex);
  const [latex, setLatex] = useState(inlineContent.props.latex || "");
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Autocomplete state for inline math
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<typeof latexCommands>([]);
  const [autocompleteIndex, setAutocompleteIndex] = useState(0);
  const [autocompletePosition, setAutocompletePosition] = useState({ top: 0, left: 0 });
  const [currentPrefix, setCurrentPrefix] = useState("");

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    updateInlineContent({ props: { latex } });
    setIsEditing(false);
    setShowAutocomplete(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLatex(newValue);
    
    // Handle autocomplete for inline math
    const input = e.target;
    const cursorPos = input.selectionStart || 0;
    const textBeforeCursor = newValue.slice(0, cursorPos);
    
    // Look for LaTeX command at cursor position
    const match = textBeforeCursor.match(/\\([a-zA-Z]*)$/);
    
    if (match) {
      const prefix = match[1];
      setCurrentPrefix(`\\${prefix}`);
      
      // Filter commands that start with the prefix
      const filtered = latexCommands.filter(cmd => 
        cmd.command.toLowerCase().startsWith(`\\${prefix.toLowerCase()}`)
      ).slice(0, 6); // Limit to 6 for inline
      
      if (filtered.length > 0) {
        setAutocompleteSuggestions(filtered);
        setAutocompleteIndex(0);
        
        // Calculate position for autocomplete dropdown
        const rect = input.getBoundingClientRect();
        setAutocompletePosition({
          top: rect.bottom + 5,
          left: rect.left,
        });
        
        setShowAutocomplete(true);
      } else {
        setShowAutocomplete(false);
      }
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showAutocomplete) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setAutocompleteIndex(prev => 
            prev < autocompleteSuggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setAutocompleteIndex(prev => 
            prev > 0 ? prev - 1 : autocompleteSuggestions.length - 1
          );
          break;
        case 'Enter':
        case 'Tab':
          e.preventDefault();
          if (autocompleteSuggestions[autocompleteIndex]) {
            handleAutocompleteSelect(autocompleteSuggestions[autocompleteIndex].command);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setShowAutocomplete(false);
          break;
      }
      return;
    }
    
    // Regular key handling when autocomplete is not shown
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setLatex(inlineContent.props.latex || "");
      setIsEditing(false);
    }
  };

  const handleAutocompleteSelect = (command: string) => {
    if (!inputRef.current) return;
    
    const input = inputRef.current;
    const cursorPos = input.selectionStart || 0;
    const textBefore = latex.slice(0, cursorPos);
    const textAfter = latex.slice(cursorPos);
    
    // Replace the current prefix with the selected command
    const prefixStart = textBefore.lastIndexOf(currentPrefix);
    const newTextBefore = textBefore.slice(0, prefixStart);
    const newLatex = newTextBefore + command + textAfter;
    
    setLatex(newLatex);
    setShowAutocomplete(false);
    
    // Position cursor after the inserted command
    setTimeout(() => {
      if (inputRef.current) {
        const newCursorPos = prefixStart + command.length;
        const bracePos = command.indexOf('{}');
        if (bracePos !== -1) {
          inputRef.current.selectionStart = prefixStart + bracePos + 1;
          inputRef.current.selectionEnd = prefixStart + bracePos + 1;
        } else {
          inputRef.current.selectionStart = newCursorPos;
          inputRef.current.selectionEnd = newCursorPos;
        }
        inputRef.current.focus();
      }
    }, 0);
  };

  if (isEditing) {
    return (
      <span className="inline-math-editor relative">
        <input
          ref={inputRef}
          value={latex}
          onChange={handleInputChange}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          placeholder="LaTeX"
          className="border border-primary/50 rounded px-1 py-0.5 font-mono text-sm bg-background min-w-[60px] focus:outline-none focus:ring-1 focus:ring-primary"
          autoFocus
        />
        
        <AutocompleteDropdown
          isVisible={showAutocomplete}
          suggestions={autocompleteSuggestions}
          selectedIndex={autocompleteIndex}
          onSelect={handleAutocompleteSelect}
          position={autocompletePosition}
        />
      </span>
    );
  }

  if (!latex || latex.trim() === "") {
    return (
      <span 
        className="inline-math-placeholder cursor-text text-muted-foreground italic text-sm"
        onDoubleClick={() => setIsEditing(true)}
        title="Double-click to add equation"
      >
        [equation]
      </span>
    );
  }

  try {
    const html = katex.renderToString(latex, {
      displayMode: false,
      throwOnError: false,
      strict: false,
    });
    
    return (
      <span 
        className="inline-math-rendered cursor-text select-text"
        onDoubleClick={() => setIsEditing(true)}
        dangerouslySetInnerHTML={{ __html: html }}
        title="Double-click to edit"
      />
    );
  } catch (error) {
    return (
      <span 
        className="inline-math-error cursor-text text-destructive text-sm"
        onDoubleClick={() => setIsEditing(true)}
        title={`Double-click to fix. Error: ${error instanceof Error ? error.message : 'Invalid LaTeX'}`}
      >
        [Math Error]
      </span>
    );
  }
}
