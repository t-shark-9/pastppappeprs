# AI Autocomplete Feature

This feature provides intelligent text completion suggestions as you type in the Draft editor using AI.

## How It Works

1. **Typing Detection**: As you write in the Draft editor, the system monitors your text input
2. **AI Suggestions**: After a brief pause (1.5 seconds), the AI generates a completion suggestion based on your current sentence and context
3. **Accept/Reject**: Press `Tab` to accept the suggestion or `Esc` to dismiss it
4. **Inline Display**: Suggestions appear in gray italics right after your cursor

## Setup

### 1. Deploy the Edge Function

```bash
# Navigate to the supabase directory
cd supabase

# Deploy the ai-autocomplete function
supabase functions deploy ai-autocomplete --no-verify-jwt

# Set the OPENAI_API_KEY secret (if not already set)
supabase secrets set OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Enable in Settings

Users can enable/disable autocomplete in Settings > AI Autocomplete

### 3. Configuration Options

The autocomplete behavior can be customized in `use-ai-autocomplete.ts`:

- `debounceMs`: Wait time before generating suggestion (default: 1500ms)
- `minChars`: Minimum characters before triggering (default: 15)
- `maxSuggestionLength`: Maximum length of suggestions (default: 100 chars)

## User Guide

### Keyboard Shortcuts
- **Tab**: Accept the suggestion
- **Esc**: Dismiss the suggestion
- Continue typing normally to ignore the suggestion

### Tips for Best Results
- Write complete thoughts - the AI works better with more context
- Wait a moment after stopping - suggestions appear after a brief pause
- The AI considers your previous paragraphs for context-aware suggestions

## Technical Details

### Components
- `useAIAutocomplete` (Hook): Manages suggestion state and API calls
- `AutocompleteOverlay` (UI): Displays suggestions inline
- `ai-autocomplete` (Edge Function): Generates suggestions using OpenAI GPT-4o-mini

### API Endpoint
```
POST /functions/v1/ai-autocomplete
Body: {
  text: string,          // Current text being written
  context?: string,      // Previous paragraphs for context
  maxLength?: number     // Max suggestion length
}
Response: {
  suggestion: string     // Completion text
}
```

### Privacy & Performance
- Suggestions are generated on-demand (not pre-fetched)
- Previous requests are aborted when new text is typed
- No suggestions are stored or logged
- Works only when actively typing in paragraph blocks

## Troubleshooting

**Suggestions not appearing?**
- Check that autocomplete is enabled in Settings
- Make sure you've written at least 15 characters
- Wait 1.5 seconds after stopping
- Verify the Edge Function is deployed correctly

**Slow suggestions?**
- This is normal - AI generation takes 1-3 seconds
- The debounce delay prevents excessive API calls
- Consider adjusting `debounceMs` if needed

**Edge Function errors?**
- Check Supabase logs: `supabase functions logs ai-autocomplete`
- Verify OPENAI_API_KEY is set correctly
- Ensure you have OpenAI API credits available
