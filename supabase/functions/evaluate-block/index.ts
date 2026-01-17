import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// IB education programs
const IB_PROGRAMS = ['ib', 'international baccalaureate', 'ibdp', 'ib diploma'];

function isIBProgram(educationType?: string): boolean {
  if (!educationType) return false;
  return IB_PROGRAMS.some(program => 
    educationType.toLowerCase().includes(program)
  );
}

function formatSubject(subject: string): string {
  return subject
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function formatTaskType(taskType: string): string {
  const taskTypeMap: Record<string, string> = {
    'essay': 'Essay',
    'commentary': 'Commentary',
    'tok': 'Theory of Knowledge Essay',
    'ia': 'Internal Assessment',
    'ee': 'Extended Essay',
    'other': 'Custom Task'
  };
  return taskTypeMap[taskType] || taskType;
}

function formatRole(role: string): string {
  const roleMap: Record<string, string> = {
    'student': 'Student',
    'teacher': 'Teacher',
    'admin': 'Administrator',
    'private': 'Private User'
  };
  return roleMap[role] || role;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, schoolProgram, subject, taskType, educationType, role, draftTitle, quotedText, blockId } = await req.json();

    if (!content || typeof content !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Determine if user is IB student
    const isIBStudent = isIBProgram(educationType) || isIBProgram(schoolProgram);
    const userRole = role || 'student';
    const title = draftTitle || 'draft';
    const textToReview = quotedText || content;

    let systemPrompt: string;
    let userPrompt: string;

    if (isIBStudent) {
      // ===== IB STUDENT: Use IB-specific feedback =====
      systemPrompt = `You are an experienced IB examiner providing targeted feedback on individual paragraphs or sections. Your feedback should be like a teacher's margin comment - concise, specific, and aligned to IB criteria.

CRITICAL: You must respond in EXACTLY this format with no other text:
Positive: [One or two sentences about what meets IB expectations]

Negative: [One or two sentences about what could be improved to better meet IB criteria, with specific suggestions]

Do NOT include any greetings, introductions, conclusions, or additional explanations. Just the Positive and Negative feedback.`;

      userPrompt = `Provide targeted IB feedback on this section from a ${formatTaskType(taskType || 'essay')} for ${formatSubject(subject || 'the subject')}:

"${textToReview}"

Remember: Respond ONLY with the Positive and Negative format, like a teacher's margin comment.`;

    } else {
      // ===== NON-IB USER: Use the specified prompt format =====
      const schoolSystemPart = educationType && userRole !== 'private' 
        ? ` in the ${educationType}` 
        : '';

      systemPrompt = `You are an experienced educator providing targeted feedback on specific paragraphs. Your feedback should be like a teacher's margin comment - concise, specific, and actionable.

CRITICAL: You must respond in EXACTLY this format with no other text:
Positive: [One or two sentences about what works well in this section]

Negative: [One or two sentences about what could be improved, with specific suggestions]

Do NOT include any greetings, introductions, conclusions, or additional explanations. Just the Positive and Negative feedback.`;

      userPrompt = `Give positive and negative feedback on my "${title}" as a ${formatRole(userRole)} working on my ${formatSubject(subject || 'subject')}, ${formatTaskType(taskType || 'essay')}${schoolSystemPart}.

Focus specifically on this paragraph/section:
"${textToReview}"

Remember: Respond ONLY with the Positive and Negative format, like a teacher's margin comment.`;
    }

    console.log('Calling AI for block evaluation, isIBStudent:', isIBStudent);
    
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to get AI response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    let feedback = aiData.choices?.[0]?.message?.content || 'No feedback generated';

    // Clean up feedback to ensure it's in the correct format
    // Remove any leading/trailing whitespace and ensure proper format
    feedback = feedback.trim();
    
    // If the response doesn't start with "Positive:", try to extract the content
    if (!feedback.toLowerCase().startsWith('positive:')) {
      // Try to find the Positive/Negative pattern in the response
      const positiveMatch = feedback.match(/positive[:\s]*([^]*?)(?=negative[:\s]|$)/i);
      const negativeMatch = feedback.match(/negative[:\s]*([^]*?)$/i);
      
      if (positiveMatch && negativeMatch) {
        feedback = `Positive: ${positiveMatch[1].trim()}\n\nNegative: ${negativeMatch[1].trim()}`;
      }
    }

    console.log('Block evaluation completed, isIBStudent:', isIBStudent);

    return new Response(
      JSON.stringify({ 
        feedback,
        blockId: blockId || null,
        quotedText: quotedText || null,
        isIBStudent,
        userRole
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in evaluate-block function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
