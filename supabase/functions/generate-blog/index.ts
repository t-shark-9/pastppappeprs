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
    const { topic, style, targetUrl } = await req.json();
    
    if (!topic || typeof topic !== 'string') {
      return new Response(
        JSON.stringify({ error: "Invalid topic" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = `You are an expert educational content writer specializing in IB Diploma Programme content. 

Your task is to generate an SEO-optimized blog article about the given topic.

The article should:
- Be written for IB students, teachers, or parents
- Use clear, accessible language with academic tone
- Include practical examples and actionable advice
- Be structured with proper headings and sections
- Be 800-1200 words (keep it concise!)
- Include relevant IB-specific terminology and context

Return a JSON object with this structure:
{
  "title": "SEO-optimized article title (60-70 characters)",
  "description": "Meta description (150-160 characters)",
  "content": "Full article content in markdown format with proper headings (##, ###)",
  "keywords": ["keyword1", "keyword2", ...], // 8-12 relevant SEO keywords
  "category": "Category name (e.g., 'IB Writing Guides', 'Internal Assessment')",
  "slug": "url-friendly-slug"
}

IMPORTANT: Keep the content concise. Do not exceed 1200 words.`;

    // If target URL provided, try to extract content for reference
    let userPrompt = `Generate a comprehensive blog article about: ${topic}\n\nStyle guidance: ${style || 'Educational, informative, and student-friendly'}`;

    if (targetUrl) {
      userPrompt += `\n\nReference URL for inspiration (do not copy, use as inspiration for structure and depth): ${targetUrl}`;
      systemPrompt += `\n\nIMPORTANT: If a reference URL is provided, use it ONLY for inspiration regarding structure, depth, and topic coverage. DO NOT copy content. Create original, unique content based on your knowledge.`;
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
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 4000,
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

    // Parse the JSON response
    let blogData;
    try {
      // Remove potential markdown code blocks
      let cleanedResponse = aiResponse.trim();
      if (cleanedResponse.startsWith("```json")) {
        cleanedResponse = cleanedResponse.slice(7);
      }
      if (cleanedResponse.startsWith("```")) {
        cleanedResponse = cleanedResponse.slice(3);
      }
      if (cleanedResponse.endsWith("```")) {
        cleanedResponse = cleanedResponse.slice(0, -3);
      }
      
      blogData = JSON.parse(cleanedResponse.trim());
    } catch (e) {
      console.error("Failed to parse AI response:", aiResponse);
      throw new Error("Failed to parse AI response as JSON");
    }

    // Validate required fields
    if (!blogData.title || !blogData.content || !blogData.description) {
      throw new Error("Missing required fields in AI response");
    }

    return new Response(
      JSON.stringify(blogData),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error generating blog:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
