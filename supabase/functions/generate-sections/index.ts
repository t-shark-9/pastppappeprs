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
    const { content, title, subject, taskType, author } = await req.json();
    
    if (!content || typeof content !== 'string') {
      return new Response(
        JSON.stringify({ error: "Invalid content" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Calculate word count
    const wordCount = content.trim().split(/\s+/).filter((w: string) => w).length;

    const systemPrompt = `You are an academic formatting assistant. Generate properly formatted Extended Essay sections following IB guidelines.

Your task is to generate three sections:
1. **Title Page**: Include title, research question (if extractable), EE subject, task type, word count, and author name
2. **Contents Page**: Extract all headings from the content and create a table of contents with placeholder page numbers
3. **Bibliography**: Extract all citations from the content and format them alphabetically in a consistent citation style (MLA by default)

Return ONLY valid JSON with this exact structure:
{
  "titlePage": "<html content>",
  "contentsPage": "<html content>",
  "bibliography": "<html content>"
}

Use proper HTML formatting with <h1>, <h2>, <p>, <ul>, <li> tags as appropriate.`;

    const userPrompt = `Generate Extended Essay sections for this draft:

**Metadata:**
- Title: ${title}
- Subject: ${subject}
- Task Type: ${taskType}
- Author: ${author}
- Word Count: ${wordCount}

**Content:**
${content}

Generate:
1. A professional title page with all required elements
2. A contents page listing all major headings from the content
3. A properly formatted bibliography extracting any citations or references found in the content`;

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
        response_format: { type: "json_object" },
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
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const sections = JSON.parse(data.choices[0].message.content);

    return new Response(
      JSON.stringify(sections),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-sections function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
