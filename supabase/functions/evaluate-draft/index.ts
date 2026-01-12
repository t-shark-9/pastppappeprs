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
    const { content, subject, taskType, schoolProgram, gradingCriteria } = await req.json();
    
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

    // Generate comprehensive system prompt based on context
    const generateSystemPrompt = (schoolProgram: string, subject: string, taskType: string, wordCount: number) => {
      let basePrompt = `You are an experienced academic writing examiner and coach providing comprehensive feedback on student drafts.`;
      
      // Program-specific setup
      switch (schoolProgram?.toLowerCase()) {
        // School Programs
        case 'ib':
          basePrompt = `You are an experienced IB examiner and academic coach. You understand IB assessment criteria, approaches to learning, and global contexts.`;
          break;
        case 'a-levels':
        case 'a levels':
          basePrompt = `You are an experienced A-Level examiner familiar with UK qualification standards and assessment objectives.`;
          break;
        case 'igcse':
          basePrompt = `You are an experienced IGCSE examiner familiar with Cambridge International assessment standards.`;
          break;
        case 'abitur':
          basePrompt = `You are an experienced German Abitur examiner familiar with German educational standards and comprehensive assessment methods.`;
          break;
        case 'swedish':
          basePrompt = `You are an experienced Swedish gymnasium teacher familiar with Swedish national curriculum standards and assessment criteria.`;
          break;
        case 'french-bac':
          basePrompt = `You are an experienced French Baccalauréat examiner familiar with French academic traditions and dissertation methodology.`;
          break;
        case 'swiss-matura':
          basePrompt = `You are an experienced Swiss Matura examiner familiar with Swiss multilingual education and interdisciplinary approaches.`;
          break;
        case 'dutch-vwo':
          basePrompt = `You are an experienced Dutch VWO teacher familiar with Netherlands secondary education and university preparation.`;
          break;
        case 'canadian-high-school':
          basePrompt = `You are an experienced Canadian high school teacher familiar with provincial curriculum standards and university preparation.`;
          break;
        case 'us-high-school':
          basePrompt = `You are an experienced US high school teacher and AP instructor familiar with American educational standards.`;
          break;
        case 'australian-year-12':
          basePrompt = `You are an experienced Australian Year 12 teacher familiar with state-based curricula and ATAR preparation.`;
          break;
        case 'nordic-studentexamen':
          basePrompt = `You are an experienced Nordic education specialist familiar with Scandinavian academic traditions.`;
          break;
        case 'singapore-a-levels':
          basePrompt = `You are an experienced Singapore A-Level examiner familiar with Singapore's rigorous academic standards.`;
          break;
        case 'hong-kong-dse':
          basePrompt = `You are an experienced Hong Kong DSE examiner familiar with bilingual education and international standards.`;
          break;
        case 'south-african-matric':
          basePrompt = `You are an experienced South African Matric examiner familiar with the National Senior Certificate requirements.`;
          break;
        case 'indian-cbse':
        case 'indian-icse':
          basePrompt = `You are an experienced Indian curriculum examiner familiar with comprehensive assessment and competitive preparation.`;
          break;
        
        // University Programs
        case 'bachelor-degree':
          basePrompt = `You are an experienced university professor and undergraduate advisor familiar with bachelor's degree requirements.`;
          break;
        case 'master-degree':
          basePrompt = `You are an experienced graduate school faculty member familiar with master's level academic expectations.`;
          break;
        case 'phd-program':
          basePrompt = `You are an experienced doctoral supervisor familiar with PhD-level research and dissertation requirements.`;
          break;
        case 'postdoc':
          basePrompt = `You are an experienced senior academic familiar with postdoctoral research standards and publication requirements.`;
          break;
        case 'associate-degree':
        case 'diploma-program':
        case 'certificate-program':
          basePrompt = `You are an experienced technical education instructor familiar with practical skills assessment and career preparation.`;
          break;
        
        // Private Programs
        case 'montessori':
          basePrompt = `You are an experienced Montessori educator familiar with child-centered learning and developmental assessment.`;
          break;
        case 'waldorf-steiner':
          basePrompt = `You are an experienced Waldorf/Steiner teacher familiar with holistic education and creative assessment.`;
          break;
        case 'cambridge-international':
          basePrompt = `You are an experienced Cambridge International examiner familiar with global education standards.`;
          break;
        case 'edexcel-international':
          basePrompt = `You are an experienced Edexcel International examiner familiar with vocational and academic pathways.`;
          break;
        case 'american-international':
        case 'british-international':
        case 'international-school':
          basePrompt = `You are an experienced international school educator familiar with multicultural learning environments.`;
          break;
        case 'private-academy':
        case 'boarding-school':
          basePrompt = `You are an experienced private school educator familiar with individualized attention and academic excellence.`;
          break;
        case 'homeschool':
        case 'online-school':
          basePrompt = `You are an experienced alternative education specialist familiar with flexible learning approaches.`;
          break;
      }

      // Task-specific requirements
      let taskRequirements = '';
      if (schoolProgram?.toLowerCase() === 'ib') {
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
        }
      } else {
        // Generic task type guidance for non-IB programs
        const taskTypeLower = taskType?.toLowerCase() || '';
        if (taskTypeLower.includes('essay')) {
          taskRequirements = `
## Essay Requirements:
- Clear thesis statement and argument
- Well-structured paragraphs with topic sentences
- Evidence and examples to support claims
- Critical analysis and evaluation
- Proper citations and references`;
        } else if (taskTypeLower.includes('report')) {
          taskRequirements = `
## Report Requirements:
- Clear purpose and objectives
- Structured sections (introduction, methodology, findings, conclusion)
- Data presentation and analysis
- Professional formatting
- Evidence-based recommendations`;
        } else if (taskTypeLower.includes('research')) {
          taskRequirements = `
## Research Paper Requirements:
- Clear research question or hypothesis
- Literature review and theoretical framework
- Appropriate methodology
- Data analysis and interpretation
- Academic writing and citations`;
        } else {
          taskRequirements = `
## General Academic Writing Requirements:
- Clear purpose and main argument
- Logical structure and organization
- Evidence-based reasoning
- Proper academic style and tone
- Citations and references`;
        }
      }

      // Subject-specific criteria
      let subjectCriteria = '';
      switch (subject?.toLowerCase()) {
        case 'english':
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
2. **Areas for Improvement**: Specific, actionable feedback
3. **Subject-Specific Guidance**: Relevant to the academic discipline
4. **Priority Actions**: Top 3 most important improvements
5. **Assessment Criteria**: How well does this meet academic standards

Provide constructive, detailed feedback that helps the student improve their work.`;
    };

    const systemPrompt = generateSystemPrompt(schoolProgram || '', subject || '', taskType || '', wordCount);

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

    const userPrompt = `Please evaluate this ${taskType || 'essay'} draft${subject ? ` for ${subject}` : ''}${schoolProgram ? ` (${schoolProgram} program)` : ''}:

Word count: ${wordCount}
${wordCount > 4000 ? '⚠️ WARNING: Exceeds 4000-word limit' : ''}

Content:
${content}
${gradingCriteriaPrompt}

Provide a comprehensive evaluation covering:
1. Compliance with formatting and structural requirements
2. Academic quality and argument strength
3. Subject-specific criteria
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
