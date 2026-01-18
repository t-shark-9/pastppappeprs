import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, subject, taskType, schoolProgram, gradingCriteria, userId, assignmentId, draftTitle, educationType, role } = await req.json();
    
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

    // Determine if user is IB student
    const isIBStudent = isIBProgram(educationType) || isIBProgram(schoolProgram);
    const userRole = role || 'student';
    const title = draftTitle || 'draft';

    // Calculate word count
    const wordCount = content.trim().split(/\s+/).filter((w: string) => w).length;

    let systemPrompt: string;
    let userPrompt: string;

    if (isIBStudent) {
      // ===== IB STUDENT: Use IB grading criteria and grade boundaries =====
      systemPrompt = generateIBSystemPrompt(schoolProgram || 'ib', subject || '', taskType || '', wordCount);
      
      // Build grading criteria prompt if available
      let gradingCriteriaPrompt = '';
      if (gradingCriteria && Array.isArray(gradingCriteria) && gradingCriteria.length > 0) {
        gradingCriteriaPrompt = `

## GRADING CRITERIA FOR ${subject?.toUpperCase()} ${taskType?.toUpperCase()}:
Each criterion should be evaluated and given a specific grade based on the student's work.

${gradingCriteria.map((criterion: any) => `
### ${criterion.name} (Maximum: ${criterion.maxMarks} marks)
${criterion.levels.map((level: string) => `- ${level}`).join('\n')}
`).join('\n')}

YOU MUST provide a specific grade for EACH criterion above based on the descriptors.`;
      }

      userPrompt = `Please evaluate this ${taskType || 'essay'} draft for ${subject || 'the subject'} (IB program):

Word count: ${wordCount} (BTW I have ${wordCount} words)
${wordCount > 4000 ? '⚠️ WARNING: Exceeds 4000-word limit' : ''}

Content:
${content}
${gradingCriteriaPrompt}

Provide a comprehensive evaluation covering:
1. Compliance with formatting and structural requirements
2. Academic quality and argument strength
3. Subject-specific IB criteria
4. Specific improvements needed with priority levels
${gradingCriteria ? '5. SPECIFIC GRADE for EACH grading criterion listed above' : ''}

Format your response as JSON with this structure:
{
  "overallScore": <number 0-10>,
  ${gradingCriteria ? `"criteriaGrades": [
    {
      "criterion": "Name of criterion (must match criteria above)",
      "earnedMarks": <number>,
      "maxMarks": <number>,
      "justification": "Brief explanation of why this grade was given",
      "improvements": "How to increase the grade"
    }
  ],` : ''}
  "strengths": ["strength 1", "strength 2", ...],
  "improvements": [
    {
      "criterion": "Name of criterion",
      "issue": "What's the problem",
      "suggestion": "How to fix it",
      "priority": "high" | "medium" | "low"
    }
  ],
  "nextSteps": ["action 1", "action 2", ...]
}`;

    } else {
      // ===== NON-IB USER: Use the specified prompt format =====
      const schoolSystemPart = educationType && userRole !== 'private' 
        ? ` in the ${educationType}` 
        : '';
      
      systemPrompt = `You are an experienced educator providing comprehensive feedback and grading. Be constructive, specific, and encouraging while being honest about areas for improvement. Format your response as JSON.`;
      
      userPrompt = `Grade and give positive and negative feedback on my "${title}" as a ${formatRole(userRole)} working on my ${formatSubject(subject || 'subject')}, ${formatTaskType(taskType || 'essay')}${schoolSystemPart}.

Word count: ${wordCount} (BTW I have ${wordCount} words)

Content:
${content}

Provide your evaluation as JSON with this structure:
{
  "overallScore": <number 0-10>,
  "grade": "<letter grade A-F or descriptive grade>",
  "strengths": ["strength 1", "strength 2", ...],
  "improvements": [
    {
      "area": "Area of improvement",
      "issue": "What's the problem",
      "suggestion": "How to fix it",
      "priority": "high" | "medium" | "low"
    }
  ],
  "nextSteps": ["action 1", "action 2", ...]
}`;
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
    const evaluation = JSON.parse(data.choices[0].message.content);

    // Add context about user type to response
    evaluation.isIBStudent = isIBStudent;
    evaluation.userRole = userRole;

    return new Response(
      JSON.stringify(evaluation),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in evaluate-draft function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Generate IB-specific system prompt (existing logic preserved)
function generateIBSystemPrompt(schoolProgram: string, subject: string, taskType: string, wordCount: number): string {
  const basePrompt = `You are an experienced IB examiner and academic coach. You understand IB assessment criteria, approaches to learning, and global contexts.`;

  // Task-specific requirements for IB
  let taskRequirements = '';
  switch (taskType?.toLowerCase()) {
    case 'ee':
    case 'extended_essay':
      taskRequirements = `
## Extended Essay Requirements (4000 words max):
- Clear research question and focused investigation
- Appropriate methodology and source evaluation
- Critical analysis and original thinking
- Proper academic formatting and citations
- Personal engagement and reflection`;
      break;
    case 'ia':
    case 'internal_assessment':
      taskRequirements = `
## Internal Assessment Requirements:
- Clear research question or investigation focus
- Appropriate methodology for the subject
- Data collection and analysis
- Evaluation and reflection on process
- Subject-specific criteria application`;
      break;
    case 'tok':
    case 'theory_of_knowledge':
      taskRequirements = `
## Theory of Knowledge Requirements:
- Clear knowledge question(s)
- Analysis of ways of knowing and areas of knowledge
- Use of examples and case studies
- Critical reflection on knowledge claims
- Balanced exploration of perspectives`;
      break;
    default:
      taskRequirements = `
## Essay/Commentary Requirements:
- Clear thesis statement and argument
- Well-structured paragraphs with topic sentences
- Evidence and examples to support claims
- Critical analysis and evaluation
- Proper citations and references`;
  }

  // Subject-specific criteria
  let subjectCriteria = '';
  switch (subject?.toLowerCase()) {
    case 'english':
    case 'english_a':
    case 'english_a_literature':
    case 'english_a_lang_lit':
      subjectCriteria = `
## Literature/Language Focus:
- Textual analysis and interpretation
- Use of literary techniques and devices
- Context and cultural considerations
- Comparative analysis where appropriate
- Personal response and critical thinking`;
      break;
    case 'history':
      subjectCriteria = `
## History Focus:
- Historical analysis and interpretation
- Use of primary and secondary sources
- Understanding of historical context
- Evaluation of different perspectives
- Evidence-based argumentation`;
      break;
    case 'biology':
    case 'chemistry':
    case 'physics':
      subjectCriteria = `
## Science Focus:
- Scientific methodology and investigation
- Data collection, analysis and interpretation
- Understanding of scientific concepts
- Evaluation of scientific processes
- Clear communication of findings`;
      break;
    case 'economics':
      subjectCriteria = `
## Economics Focus:
- Economic theory application
- Data interpretation and analysis
- Real-world examples and case studies
- Evaluation of economic policies
- Clear economic reasoning`;
      break;
    case 'psychology':
      subjectCriteria = `
## Psychology Focus:
- Psychological theories and concepts
- Research methodology and ethics
- Empirical evidence and studies
- Critical evaluation of research
- Application to real-world contexts`;
      break;
  }

  // Word count guidance
  let wordCountGuidance = '';
  if (taskType?.toLowerCase() === 'ee' || taskType?.toLowerCase() === 'extended_essay') {
    wordCountGuidance = `
## Word Count Analysis (Current: ${wordCount} words):
- Maximum 4000 words (excluding title page, contents, bibliography, citations)
- ${wordCount > 4000 ? '⚠️ OVER LIMIT - Must reduce word count' : wordCount < 3500 ? 'Consider expanding analysis for more depth' : '✓ Good word count range'}`;
  }

  return `${basePrompt}

${taskRequirements}
${subjectCriteria}
${wordCountGuidance}

## Your Evaluation Should Include:
1. **Strengths**: What works well in this draft
2. **Areas for Improvement**: Specific, actionable feedback aligned to IB criteria
3. **Subject-Specific Guidance**: Relevant to the IB discipline
4. **Priority Actions**: Top 3 most important improvements
5. **Assessment Criteria**: How well does this meet IB standards

Provide constructive, detailed feedback that helps the student improve their IB work.`;
}
