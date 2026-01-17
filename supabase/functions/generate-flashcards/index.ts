import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, count = 10 } = await req.json();
    
    if (!content || typeof content !== 'string') {
      return new Response(
        JSON.stringify({ error: "Content is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert educator creating flashcards for spaced repetition learning.
Your task is to analyze the provided content and generate high-quality flashcards that help students learn and retain key concepts.

Guidelines for creating flashcards:
1. Focus on key concepts, definitions, important facts, and relationships
2. Make questions clear and specific - avoid vague or overly broad questions
3. Keep answers concise but complete - one key idea per card
4. Use active recall principles - frame as questions, not statements
5. Include a mix of: definitions, explanations, examples, and applications
6. For complex topics, break into multiple simpler cards
7. Use the "minimum information principle" - each card tests ONE thing

Return ONLY a valid JSON array with no additional text or markdown formatting.
Each flashcard object must have exactly two fields:
- "front": The question or term (string)
- "back": The answer or definition (string)

Example format:
[{"front": "What is photosynthesis?", "back": "The process by which plants convert sunlight, water, and CO2 into glucose and oxygen."}, {"front": "What are the two stages of photosynthesis?", "back": "Light-dependent reactions (in thylakoids) and light-independent reactions/Calvin cycle (in stroma)."}]`;

    const userPrompt = `Generate ${count} high-quality flashcards from the following content. Return ONLY the JSON array, no other text:

${content}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response - handle potential markdown code blocks
    let flashcards;
    try {
      // Remove potential markdown code blocks
      let cleanedResponse = aiResponse.trim();
      if (cleanedResponse.startsWith("```json")) {
        cleanedResponse = cleanedResponse.slice(7);
      } else if (cleanedResponse.startsWith("```")) {
        cleanedResponse = cleanedResponse.slice(3);
      }
      if (cleanedResponse.endsWith("```")) {
        cleanedResponse = cleanedResponse.slice(0, -3);
      }
      cleanedResponse = cleanedResponse.trim();
      
      flashcards = JSON.parse(cleanedResponse);
      
      // Validate structure
      if (!Array.isArray(flashcards)) {
        throw new Error("Response is not an array");
      }
      
      // Validate each flashcard has front and back
      flashcards = flashcards.filter(card => 
        card && typeof card.front === 'string' && typeof card.back === 'string' &&
        card.front.trim() && card.back.trim()
      );
      
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiResponse);
      throw new Error("Failed to parse flashcards from AI response");
    }

    return new Response(
      JSON.stringify({ flashcards }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-flashcards function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
