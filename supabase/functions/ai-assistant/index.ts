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
    const { command, context, selection } = await req.json();
    
    if (!command || typeof command !== 'string') {
      return new Response(
        JSON.stringify({ error: "Invalid command" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (command === "define") {
      systemPrompt = "You are a helpful academic assistant. Provide clear, concise definitions suitable for academic writing.";
      userPrompt = `Define the following term or concept: "${selection}"${context ? `\n\nContext: ${context}` : ""}`;
    } else if (command === "explain") {
      systemPrompt = "You are a helpful academic assistant. Provide clear explanations that help students understand complex concepts.";
      userPrompt = `Explain the following: "${selection}"${context ? `\n\nContext: ${context}` : ""}`;
    } else if (command === "synonym") {
      systemPrompt = "You are a helpful academic writing assistant. Provide 3-5 relevant synonyms or alternative phrases that fit the context.";
      userPrompt = `Provide synonyms for: "${selection}"${context ? `\n\nContext: ${context}` : ""}. List them concisely in one sentence.`;
    } else if (command === "rephrase") {
      systemPrompt = "You are a helpful academic writing assistant. Rephrase sentences to improve clarity, flow, and academic tone while preserving the original meaning.";
      userPrompt = `Rephrase the following sentence: "${selection}"${context ? `\n\nContext: ${context}` : ""}. Provide only the rephrased version, nothing else.`;
    } else if (command === "grammar") {
      systemPrompt = "You are a grammar expert. Correct any grammar, spelling, or punctuation errors in the text while preserving the original meaning and style.";
      userPrompt = `Correct the grammar in the following sentence: "${selection}"${context ? `\n\nContext: ${context}` : ""}. Provide only the corrected version, nothing else.`;
    } else if (command === "latex") {
      systemPrompt = "You are a LaTeX math expert. Convert natural language math expressions to proper LaTeX syntax. Return ONLY the LaTeX code without explanations or formatting.";
      userPrompt = `Convert this math expression to LaTeX: "${selection}"`;
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid command. Use 'define', 'explain', 'synonym', 'rephrase', 'grammar', or 'latex'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
        stream: true,
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

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in ai-assistant function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
