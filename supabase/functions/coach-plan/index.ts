import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// IB education programs
const IB_PROGRAMS = ['ib', 'international baccalaureate', 'ibdp', 'ib diploma'];

function isIBProgram(educationType?: string): boolean {
  if (!educationType) return false;
  return IB_PROGRAMS.some(program => 
    educationType?.toLowerCase().includes(program)
  );
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, taskType, currentIdea, rubric, schoolProgram, userRole } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const isIB = isIBProgram(schoolProgram);

    let systemPrompt = "";
    let userPrompt = "";

    if (isIB) {
      systemPrompt = `You are an expert IB coach. Help the student refine their Internal Assessment or Essay idea.
Focus on IB criteria like Personal Engagement, Exploration, and Analysis.
Your goal is to help them turn a vague idea into a researchable, high-scoring IB topic.`;
      
      userPrompt = `I am an IB student working on my ${subject} ${taskType}.
      
My current idea is: "${currentIdea}"
      
Please provide coaching to refine this idea.
1. Ask 3-4 Socratic questions to help me narrow it down.
2. Suggest a potential "Thesis Pattern" or Research Question structure.
3. List an "Evidence Checklist" of what I might need to find.
      
Keep it aligned with high-scoring IB samples.

${rubric && rubric.length > 0 ? `For context, here are the criteria: ${JSON.stringify(rubric)}` : ''}`;

    } else {
      // Non-IB Logic
      systemPrompt = `You are a helpful writing coach. Your goal is to help the student develop their idea into a strong essay or project.
Do NOT mention specific IB criteria or scoring. Focus on clarity, depth, and argument structure.
Encourage the student to develop their idea further.`;

      userPrompt = `I am a ${userRole || 'student'} working on a ${taskType || 'project'} for ${subject || 'my class'}.
      
My current idea is: "${currentIdea}"
      
Please help me develop this idea further.
1. Ask 3-4 thought-provoking questions to help me explore this topic deeper.
2. Suggest a potential thesis statement or main argument.
3. List diverse types of evidence or examples I could look for.
      
Encourage me to think critically and expand on my initial thoughts.`;
    }

    // Response structure expected by frontend
    // interface CoachingResponse { questions: string[]; thesisPattern: string; evidenceChecklist: string[]; }
    const jsonStructure = {
      questions: ["question 1", "question 2", "question 3"],
      thesisPattern: "suggested thesis/RQ structure",
      evidenceChecklist: ["evidence 1", "evidence 2", "evidence 3"]
    };

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
          { role: "user", content: `${userPrompt}\n\nReturn valid JSON matching this structure: ${JSON.stringify(jsonStructure)}` },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
       const errorText = await response.text();
       console.error("AI API Error:", errorText);
       throw new Error(`AI Gateway Error: ${response.status}`);
    }

    const data = await response.json();
    let content;
    try {
        content = JSON.parse(data.choices[0].message.content);
    } catch (e) {
        console.error("Failed to parse JSON", data.choices[0].message.content);
        throw new Error("Invalid response from AI");
    }

    return new Response(
      JSON.stringify(content),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in coach-plan function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
