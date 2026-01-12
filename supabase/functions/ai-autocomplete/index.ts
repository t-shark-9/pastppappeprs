import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const { text, context, maxLength = 100 } = await req.json();

    if (!text || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Extract the last sentence or phrase being written
    const lastSentence = extractLastSentence(text);
    
    // Build prompt
    const systemPrompt = `You are an intelligent writing assistant that provides autocomplete suggestions for academic essays. 
Your task is to complete the user's sentence naturally and coherently based on the context.

Rules:
- Only complete the current sentence, not start a new one
- Match the writing style and tone
- Keep suggestions concise (max ${maxLength} characters)
- Be contextually relevant
- Don't repeat what's already written
- Use proper grammar and punctuation`;

    const userPrompt = context 
      ? `Context: ${context}\n\nCurrent text: ${text}\n\nComplete this sentence naturally:`
      : `Current text: ${text}\n\nComplete this sentence naturally:`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 50,
        stop: ['\n', '.', '!', '?'],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to generate suggestion' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();
    const suggestion = data.choices[0]?.message?.content?.trim() || '';

    // Clean up the suggestion
    const cleanedSuggestion = cleanSuggestion(suggestion, lastSentence);

    return new Response(
      JSON.stringify({ suggestion: cleanedSuggestion }),
      {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in ai-autocomplete function:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});

function extractLastSentence(text: string): string {
  // Get text after the last sentence-ending punctuation
  const sentenceEnders = /[.!?]\s+/g;
  const matches = [...text.matchAll(sentenceEnders)];
  
  if (matches.length === 0) {
    return text;
  }
  
  const lastMatch = matches[matches.length - 1];
  return text.substring(lastMatch.index! + lastMatch[0].length);
}

function cleanSuggestion(suggestion: string, currentText: string): string {
  // Remove any leading/trailing whitespace
  let cleaned = suggestion.trim();
  
  // If suggestion starts with the end of current text, remove that overlap
  const words = currentText.split(/\s+/);
  const lastWord = words[words.length - 1];
  
  if (cleaned.toLowerCase().startsWith(lastWord.toLowerCase())) {
    cleaned = cleaned.substring(lastWord.length).trim();
  }
  
  // Remove quotes if present
  cleaned = cleaned.replace(/^["']|["']$/g, '');
  
  // Ensure it starts with a space if it doesn't start with punctuation
  if (cleaned && !/^[,;:.]/.test(cleaned)) {
    cleaned = ' ' + cleaned;
  }
  
  return cleaned;
}
