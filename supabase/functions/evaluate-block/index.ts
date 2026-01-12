import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, schoolProgram, subject, taskType } = await req.json();

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

    // Generate subject and program specific prompt
    const generateSystemPrompt = (schoolProgram: string, subject: string, taskType: string) => {
      const basePrompt = `You are an experienced academic writing coach providing targeted feedback on individual paragraphs or sections.

Your role is to:
1. Identify ONE key strength (max 1 sentence)
2. Provide 1-2 specific improvements (bullet points with WHY + HOW)
3. Ask 1-2 Socratic questions to deepen thinking

Keep feedback concise, actionable, and focused on this specific section only.
Never ghostwrite - provide coaching, not complete answers.`;

      // Add program-specific context
      let programContext = '';
      switch (schoolProgram?.toLowerCase()) {
        // School Programs
        case 'ib':
          programContext = 'Focus on IB assessment criteria including critical thinking, evidence analysis, and global perspectives.';
          break;
        case 'a-levels':
        case 'a levels':
          programContext = 'Use A-Level assessment objectives emphasizing independent analysis and evaluation.';
          break;
        case 'igcse':
          programContext = 'Consider IGCSE standards focusing on clear communication and understanding of concepts.';
          break;
        case 'abitur':
          programContext = 'Apply German Abitur standards focusing on structured argumentation and comprehensive analysis.';
          break;
        case 'swedish':
          programContext = 'Consider Swedish gymnasium standards emphasizing analytical thinking and source evaluation.';
          break;
        case 'french-bac':
          programContext = 'Apply French Baccalauréat standards focusing on dissertation writing and philosophical argumentation.';
          break;
        case 'swiss-matura':
          programContext = 'Use Swiss Matura standards emphasizing multilingual competence and interdisciplinary thinking.';
          break;
        case 'dutch-vwo':
          programContext = 'Apply Dutch VWO standards focusing on independent research and academic preparation.';
          break;
        case 'canadian-high-school':
          programContext = 'Use Canadian high school standards emphasizing critical thinking and communication skills.';
          break;
        case 'us-high-school':
          programContext = 'Apply US high school/AP standards focusing on college-level academic rigor and analysis.';
          break;
        case 'australian-year-12':
          programContext = 'Use Australian Year 12 standards emphasizing independent investigation and evaluation.';
          break;
        case 'nordic-studentexamen':
          programContext = 'Apply Nordic Studentexamen standards focusing on critical analysis and cultural understanding.';
          break;
        case 'singapore-a-levels':
          programContext = 'Use Singapore A-Level standards emphasizing analytical rigor and global perspectives.';
          break;
        case 'hong-kong-dse':
          programContext = 'Apply Hong Kong DSE standards focusing on bilingual competence and critical evaluation.';
          break;
        case 'south-african-matric':
          programContext = 'Use South African Matric standards emphasizing multilingual skills and contextual analysis.';
          break;
        case 'indian-cbse':
        case 'indian-icse':
          programContext = 'Apply Indian curriculum standards focusing on comprehensive knowledge and analytical skills.';
          break;
        
        // University Programs
        case 'bachelor-degree':
          programContext = 'Apply undergraduate academic standards emphasizing independent research and critical analysis.';
          break;
        case 'master-degree':
          programContext = 'Use graduate-level standards focusing on advanced analysis, original research, and scholarly argumentation.';
          break;
        case 'phd-program':
          programContext = 'Apply doctoral standards emphasizing original contribution to knowledge and rigorous methodology.';
          break;
        case 'postdoc':
          programContext = 'Use postdoctoral research standards focusing on cutting-edge research and academic excellence.';
          break;
        case 'associate-degree':
        case 'diploma-program':
        case 'certificate-program':
          programContext = 'Apply vocational/technical education standards emphasizing practical application and skills development.';
          break;
        
        // Private Programs
        case 'montessori':
          programContext = 'Use Montessori principles emphasizing self-directed learning and holistic development.';
          break;
        case 'waldorf-steiner':
          programContext = 'Apply Waldorf/Steiner standards focusing on creative expression and developmental appropriateness.';
          break;
        case 'cambridge-international':
          programContext = 'Use Cambridge International standards emphasizing global perspectives and academic rigor.';
          break;
        case 'edexcel-international':
          programContext = 'Apply Edexcel International standards focusing on practical skills and academic achievement.';
          break;
        case 'american-international':
        case 'british-international':
        case 'international-school':
          programContext = 'Use international school standards emphasizing multicultural perspectives and global citizenship.';
          break;
        case 'private-academy':
        case 'boarding-school':
          programContext = 'Apply private school standards emphasizing academic excellence and personal development.';
          break;
        case 'homeschool':
        case 'online-school':
          programContext = 'Use flexible learning standards emphasizing self-direction and personalized education.';
          break;
        default:
          programContext = 'Apply appropriate academic writing standards for your educational level.';
      }

      // Add subject-specific context
      let subjectContext = '';
      switch (subject?.toLowerCase()) {
        case 'english':
        case 'english_a_literature':
        case 'english_a_lang_lit':
          subjectContext = 'Focus on literary analysis, textual evidence, language techniques, and thematic connections.';
          break;
        case 'history':
          subjectContext = 'Emphasize historical evidence, source analysis, causation, and historiographical perspectives.';
          break;
        case 'biology':
        case 'chemistry':
        case 'physics':
          subjectContext = 'Focus on scientific methodology, data analysis, hypothesis formation, and evidence-based conclusions.';
          break;
        case 'economics':
          subjectContext = 'Emphasize economic theory application, data interpretation, and real-world economic examples.';
          break;
        case 'psychology':
          subjectContext = 'Focus on psychological theories, research methodology, ethical considerations, and empirical evidence.';
          break;
        case 'philosophy':
          subjectContext = 'Emphasize logical argumentation, philosophical concepts, critical evaluation of ideas, and conceptual clarity.';
          break;
        case 'mathematics':
        case 'math':
          subjectContext = 'Focus on mathematical reasoning, proof techniques, problem-solving methods, and logical structure.';
          break;
        default:
          subjectContext = 'Focus on clear argumentation, evidence use, and analytical thinking.';
      }

      // Add task-type specific context
      let taskContext = '';
      const taskTypeLower = taskType?.toLowerCase() || '';
      
      if (schoolProgram?.toLowerCase() === 'ib') {
        switch (taskTypeLower) {
          case 'ee':
          case 'extended_essay':
            taskContext = 'This is for an Extended Essay - focus on research depth, original investigation, and academic rigor.';
            break;
          case 'ia':
          case 'internal_assessment':
            taskContext = 'This is for an Internal Assessment - emphasize methodology, personal engagement, and reflection.';
            break;
          case 'tok':
          case 'theory_of_knowledge':
            taskContext = 'This is for Theory of Knowledge - focus on knowledge questions, ways of knowing, and critical reflection.';
            break;
          case 'commentary':
            taskContext = 'This is a commentary - focus on close textual analysis and interpretation.';
            break;
          case 'essay':
            taskContext = 'This is an essay - focus on clear thesis, structured argument, and evidence-based analysis.';
            break;
          default:
            taskContext = 'Focus on academic quality, clear expression, and critical thinking.';
        }
      } else {
        // Generic task type context for non-IB programs
        if (taskTypeLower.includes('essay')) {
          taskContext = 'This is an essay - focus on thesis development, argumentation, and evidence.';
        } else if (taskTypeLower.includes('report')) {
          taskContext = 'This is a report - focus on clear structure, data presentation, and findings.';
        } else if (taskTypeLower.includes('research')) {
          taskContext = 'This is research writing - focus on methodology, analysis, and academic rigor.';
        } else {
          taskContext = 'Focus on clear communication, logical structure, and academic quality.';
        }
      }

      return `${basePrompt}

CONTEXT:
- Program: ${programContext}
- Subject: ${subjectContext}
- Task: ${taskContext}

Provide feedback specifically tailored to these requirements.`;
    };

    const systemPrompt = generateSystemPrompt(schoolProgram || '', subject || '', taskType || '');

    const userPrompt = `Provide targeted feedback on this section:\n\n${content}`;

    console.log('Calling AI for block evaluation...');
    
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
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
    const feedback = aiData.choices?.[0]?.message?.content || 'No feedback generated';

    console.log('Block evaluation completed');

    return new Response(
      JSON.stringify({ feedback }),
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
