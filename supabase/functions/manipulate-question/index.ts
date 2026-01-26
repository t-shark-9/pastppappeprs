import "https://deno.land/x/xhr@0.3.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ManipulationRequest {
  question: string;
  manipulationType: string;
  subject?: string;
  topic?: string;
  outputFormat?: 'text' | 'latex' | 'html';
}

const getFormatInstructions = (format: string): string => {
  if (format === 'latex') {
    return `

OUTPUT FORMAT: Return the result as properly formatted LaTeX suitable for a professional exam document.
- Use \\section{} or \\subsection{} for question headers if needed
- Use \\textbf{} for emphasis, \\textit{} for italics
- Use appropriate math environments: $...$ for inline math, \\[...\\] for display math
- Use \\begin{enumerate} or \\begin{itemize} for lists
- Use \\ce{} for chemical formulas (mhchem package)
- Include mark allocations in brackets like [2 marks]
- Make the output copy-paste ready for a LaTeX document`;
  }
  
  if (format === 'html') {
    return `

OUTPUT FORMAT: Return the result as clean, semantic HTML suitable for a web exam document.
- Use <h3> or <h4> for question headers
- Use <strong> for bold, <em> for italics
- Use <ol> or <ul> for lists
- Wrap math in appropriate tags like <span class="math">...</span>
- Use <sub> and <sup> for subscripts and superscripts
- Include mark allocations in <span class="marks">[2 marks]</span>
- Use proper paragraph <p> tags
- Make the output clean and ready to embed in a webpage`;
  }
  
  return ''; // Plain text - no special formatting
};

const getSystemPrompt = (type: string, format: string = 'text'): string => {
  const formatInstructions = getFormatInstructions(format);
  
  const prompts: Record<string, string> = {
    rephrase: `You are an expert IB examiner. Rephrase the given exam question while:
- Keeping the exact same difficulty level and mark allocation
- Maintaining the same learning objectives and assessment criteria
- Using different wording and sentence structure
- Preserving any numerical values or specific data needed
Return ONLY the rephrased question, nothing else.`,

    recreate: `You are an expert IB examiner. Create a completely NEW exam question that:
- Tests the same concepts, skills, and knowledge
- Has the same difficulty level and mark allocation
- Uses a different scenario, context, or data
- Follows IB exam question formatting standards
- Is original and not just a rewording
Return ONLY the new question, nothing else.`,

    markscheme: `You are an expert IB examiner. Create a detailed mark scheme for the given question that includes:
- Clear marking points with allocated marks
- Example acceptable answers
- Common misconceptions to watch for
- Guidance for partial credit
Format it professionally as an IB mark scheme would appear.`,

    simplify: `You are an expert IB examiner. Create an easier version of this question that:
- Tests the same core concept but at a lower cognitive level
- Removes complexity while keeping educational value
- Would be appropriate for students just learning this topic
- Maintains proper exam question format
Return ONLY the simplified question, nothing else.`,

    advanced: `You are an expert IB examiner. Create a more challenging version of this question that:
- Tests the same concept at a higher cognitive level
- Adds complexity through multi-step reasoning or synthesis
- Requires deeper understanding and application
- Would challenge even strong students
Return ONLY the advanced question, nothing else.`,

    similar: `You are an expert IB examiner. Create a similar question that:
- Tests the same concept and skills
- Uses different numbers, substances, or examples
- Has the same difficulty and mark structure
- Could be used as practice for the original
Return ONLY the similar question, nothing else.`,

    reverse: `You are an expert IB examiner. Create a "reverse" version of this question that:
- Gives the answer/result and asks for the initial conditions
- OR swaps what is given and what is asked for
- Tests understanding from a different angle
- Maintains the same difficulty level
Return ONLY the reversed question, nothing else.`,

    context: `You are an expert IB examiner. Create this question with a completely new real-world context:
- Keep the same scientific concept and difficulty
- Use a different practical application or scenario
- Make it relevant and engaging for students
- Maintain proper exam question format
Return ONLY the recontextualized question, nothing else.`,
  };

  return (prompts[type] || prompts.rephrase) + formatInstructions;
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, manipulationType, subject, topic, outputFormat }: ManipulationRequest = await req.json();

    if (!question) {
      return new Response(
        JSON.stringify({ error: 'Question is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = getSystemPrompt(manipulationType, outputFormat);
    const subjectContext = subject ? `Subject: ${subject}` : '';
    const topicContext = topic ? `Topic: ${topic}` : '';

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
          { 
            role: 'user', 
            content: `${subjectContext}\n${topicContext}\n\nOriginal Question:\n${question}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to generate response from AI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const manipulated = data.choices[0]?.message?.content?.trim();

    if (!manipulated) {
      return new Response(
        JSON.stringify({ error: 'No response generated' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        manipulated,
        type: manipulationType,
        original: question,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error in manipulate-question:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
