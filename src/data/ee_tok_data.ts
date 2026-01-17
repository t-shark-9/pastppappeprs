// Extended Essay and Theory of Knowledge Guidance Data
// Comprehensive guides for EE and TOK components of the IB Diploma Programme
// Based on official IB guides and assessment criteria

export interface Citation {
  title: string;
  organization: string;
  year: string;
  type: 'guide' | 'assessment' | 'specimen';
  url?: string;
}

export interface EE_TOK_Section {
  title: string;
  content: string;
  tips: string[];
  commonMistakes: string[];
}

export interface EE_TOK_Subject {
  title: string;
  description: string;
  wordCount: string;
  weighting: string;
  officialGuide: Citation;
  additionalReferences: Citation[];
  assessmentCriteria: {
    [key: string]: {
      name: string;
      description: string;
      marks: string;
      keyPoints: string[];
    };
  };
  sections: {
    [key: string]: EE_TOK_Section;
  };
  sampleQuestions?: string[];
  timeline: {
    phase: string;
    duration: string;
    activities: string[];
  }[];
}

const extendedEssayData: EE_TOK_Subject = {
  title: 'Extended Essay',
  description: 'Independent research essay of 4,000 words on a topic of the student\'s choice',
  wordCount: '4,000 words maximum',
  weighting: '3 points (A-E grade)',
  officialGuide: {
    title: 'Extended Essay Guide',
    organization: 'International Baccalaureate Organization',
    year: '2018',
    type: 'guide',
    url: '/guides/ee.pdf'
  },
  additionalReferences: [
    {
      title: 'Extended Essay Assessment Criteria',
      organization: 'International Baccalaureate Organization',
      year: '2018',
      type: 'assessment'
    }
  ],
  assessmentCriteria: {
    'A': {
      name: 'Focus and method',
      description: 'This criterion focuses on the topic, the research question and the methodology. It assesses the explanation of the focus of the research (this includes the topic and the research question), how the research will be undertaken, and how the focus is maintained throughout the essay.',
      marks: '6 marks',
      keyPoints: [
        'Topic is communicated accurately and effectively',
        'Research question is clearly stated and focused',
        'Methodology of the research is complete'
      ]
    },
    'B': {
      name: 'Knowledge and understanding',
      description: 'This criterion assesses the extent to which the research relates to the subject area/discipline used to explore the research question.',
      marks: '6 marks',
      keyPoints: [
        'Application of source material is clearly relevant and appropriate',
        'Knowledge of the topic/discipline is clear and coherent',
        'Use of subject-specific terminology and concepts is accurate and consistent'
      ]
    },
    'C': {
      name: 'Critical thinking',
      description: 'This criterion assesses the extent to which critical-thinking skills have been used to analyse and evaluate the research undertaken.',
      marks: '12 marks',
      keyPoints: [
        'Research is appropriate to the research question and its application to support the argument is consistently relevant',
        'Research is analysed effectively and clearly focused on the research question',
        'Effective and focused reasoned argument is developed from the research with a conclusion reflective of the evidence presented'
      ]
    },
    'D': {
      name: 'Presentation',
      description: 'This criterion assesses the extent to which the presentation follows the standard format expected for academic writing and the extent to which this aids effective communication.',
      marks: '4 marks',
      keyPoints: [
        'Structure of the essay clearly is appropriate in terms of the expected conventions',
        'Layout considerations are present and applied correctly',
        'Structure and layout support the reading, understanding and evaluation of the extended essay'
      ]
    },
    'E': {
      name: 'Engagement',
      description: 'This criterion assesses the student\'s engagement with their research focus and the research process.',
      marks: '6 marks',
      keyPoints: [
        'Reflections on decision-making and planning are evaluative',
        'Reflections communicate a high degree of intellectual and personal engagement',
        'Demonstrates authenticity, intellectual initiative and/or creative approach in the student voice'
      ]
    }
  },
  sections: {
    'overview': {
      title: 'Extended Essay Overview',
      content: 'The Extended Essay is an independent research essay of up to 4,000 words on a topic of the student\'s choice. It offers the opportunity for IB students to investigate a topic of special interest, in the form of a 4,000-word piece of independent research. Students select an area of research from Diploma Programme subjects, or in the case of the interdisciplinary world studies extended essay from two subjects, and become acquainted with the independent research and writing skills expected at university.',
      tips: [
        'Choose a topic that genuinely interests you and allows you to demonstrate your understanding, creativity, and/or originality',
        'Start planning early - the EE requires significant time management and research skills',
        'Develop a clear research question that is focused and answerable within the word limit',
        'Maintain regular communication with your supervisor through the mandatory reflection sessions',
        'Use the Researcher\'s Reflection Space (RRS) to document your research process and decision-making'
      ],
      commonMistakes: [
        'Choosing a topic that is too broad or too narrow',
        'Starting the research too late in the process',
        'Not developing a clear, focused research question',
        'Failing to maintain academic honesty in citations and references',
        'Not engaging in the mandatory reflection sessions with your supervisor'
      ]
    },
    'choosing_topic': {
      title: 'Choosing Your Topic and Research Question',
      content: 'The choice of topic is crucial to the success of your extended essay. Your topic should be something you are genuinely interested in and have some prior knowledge of. The research question should be focused, specific, and lend itself to systematic investigation within the constraints of the extended essay format.',
      tips: [
        'Start by brainstorming subjects and topics that interest you from your DP courses',
        'Consider your access to resources, both primary and secondary sources',
        'Ensure your topic is academic in nature and allows for critical analysis',
        'Develop your research question using the five-step process outlined in the guide',
        'Discuss your initial ideas with your supervisor early in the process'
      ],
      commonMistakes: [
        'Choosing a topic simply because it seems easy or will guarantee a high grade',
        'Selecting a topic that cannot be adequately researched within the time and word constraints',
        'Formulating a research question that is too broad or too narrow',
        'Not considering the availability of appropriate sources and resources',
        'Changing your topic too late in the process without proper reflection'
      ]
    },
    'research_process': {
      title: 'The Research and Writing Process',
      content: 'The extended essay requires you to engage in independent research and academic writing. You must develop research skills, critical thinking abilities, and the capacity to construct a reasoned argument supported by evidence. The process involves formulating a research question, conducting thorough research, analyzing sources, and presenting your findings in a coherent essay.',
      tips: [
        'Create a realistic timeline and stick to it throughout the process',
        'Use a variety of sources including primary and secondary materials',
        'Maintain detailed notes and proper citations as you research',
        'Develop a clear essay structure before beginning to write',
        'Allow time for multiple drafts and revisions'
      ],
      commonMistakes: [
        'Procrastinating on the research and writing process',
        'Relying too heavily on internet sources without proper evaluation',
        'Poor time management leading to rushed writing',
        'Failing to properly cite sources or maintain academic honesty',
        'Not seeking feedback from your supervisor on drafts'
      ]
    },
    'assessment_criteria': {
      title: 'Understanding the Assessment Criteria',
      content: 'The extended essay is assessed using five criteria: Focus and method (A), Knowledge and understanding (B), Critical thinking (C), Presentation (D), and Engagement (E). These criteria are applied holistically, and the essay is marked using a best-fit approach rather than as a checklist.',
      tips: [
        'Familiarize yourself with all five assessment criteria early in the process',
        'Ensure your research question and methodology align with criterion A',
        'Demonstrate subject-specific knowledge and understanding throughout your essay',
        'Develop a clear, reasoned argument supported by evidence for criterion C',
        'Maintain proper academic formatting and presentation standards'
      ],
      commonMistakes: [
        'Focusing only on content without considering the assessment criteria',
        'Neglecting the engagement criterion by not properly documenting reflections',
        'Poor presentation that hinders the reader\'s understanding',
        'Failing to maintain focus on the research question throughout the essay',
        'Not demonstrating critical thinking and analysis in the discussion'
      ]
    },
    'academic_honesty': {
      title: 'Academic Honesty and Referencing',
      content: 'Academic honesty is fundamental to the extended essay. You must acknowledge all sources used in your work and ensure that your essay represents your own original thinking and analysis. Proper citation and referencing are essential components of academic writing.',
      tips: [
        'Keep detailed records of all sources as you research',
        'Use a consistent referencing style (consult your school\'s guidelines)',
        'Paraphrase and synthesize information rather than copying directly',
        'Include both in-text citations and a complete bibliography',
        'Understand the difference between common knowledge and information that requires citation'
      ],
      commonMistakes: [
        'Plagiarizing content from sources without proper attribution',
        'Inconsistent or incorrect citation formatting',
        'Failing to reference all sources used in the research',
        'Not understanding what constitutes academic dishonesty',
        'Waiting until the end to compile references, leading to incomplete citations'
      ]
    }
  },
  timeline: [
    {
      phase: 'Initial Planning (Months 1-2)',
      duration: '6-8 weeks',
      activities: [
        'Brainstorm potential topics and subjects of interest',
        'Review subject-specific guidelines and requirements',
        'Discuss initial ideas with your supervisor',
        'Begin developing a focused research question',
        'Create a preliminary research plan and timeline'
      ]
    },
    {
      phase: 'Research and Development (Months 3-6)',
      duration: '12-14 weeks',
      activities: [
        'Conduct thorough background research on your topic',
        'Refine your research question based on initial findings',
        'Gather and evaluate primary and secondary sources',
        'Complete the interim reflection session with your supervisor',
        'Develop a detailed essay outline and structure'
      ]
    },
    {
      phase: 'Writing and Revision (Months 7-9)',
      duration: '8-10 weeks',
      activities: [
        'Write the first draft of your extended essay',
        'Submit one draft for supervisor feedback',
        'Revise and improve your essay based on feedback',
        'Complete the final reflection session',
        'Final proofreading and formatting'
      ]
    },
    {
      phase: 'Final Submission (Month 10)',
      duration: '2 weeks',
      activities: [
        'Final check of word count and formatting requirements',
        'Ensure all citations and references are complete and accurate',
        'Submit final version to supervisor for authentication',
        'Complete Reflections on Planning and Progress Form (RPPF)'
      ]
    }
  ]
};

const theoryOfKnowledgeData: EE_TOK_Subject = {
  title: 'Theory of Knowledge',
  description: 'Interdisciplinary course examining the nature of knowledge and how we know what we claim to know',
  wordCount: '1,600 words (TOK Essay) + Exhibition',
  weighting: '3 points (A-E grade)',
  officialGuide: {
    title: 'Theory of Knowledge Guide',
    organization: 'International Baccalaureate Organization',
    year: '2022',
    type: 'guide',
    url: '/guides/tok.pdf'
  },
  additionalReferences: [
    {
      title: 'TOK Assessment Instruments',
      organization: 'International Baccalaureate Organization',
      year: '2022',
      type: 'assessment'
    }
  ],
  assessmentCriteria: {
    'Essay': {
      name: 'TOK Essay Assessment',
      description: 'The TOK essay is marked using a global impression marking approach. The assessment is underpinned by the question: "Does the student provide a clear, coherent and critical exploration of the essay title?"',
      marks: '10 marks',
      keyPoints: [
        'Discussion has a sustained focus on the title and is linked effectively to areas of knowledge',
        'Arguments are clear, coherent and effectively supported by specific examples',
        'There is clear awareness and evaluation of different points of view'
      ]
    },
    'Exhibition': {
      name: 'TOK Exhibition Assessment',
      description: 'The TOK exhibition is marked using a global impression marking approach. The assessment is underpinned by the question: "Does the exhibition successfully show how TOK manifests in the world around us?"',
      marks: '10 marks',
      keyPoints: [
        'Exhibition clearly identifies three objects and their specific real-world contexts',
        'Links between each of the three objects and the selected IA prompt are clearly made and well-explained',
        'There is a strong justification of the particular contribution that each individual object makes to the exhibition'
      ]
    }
  },
  sections: {
    'overview': {
      title: 'Theory of Knowledge Overview',
      content: 'Theory of Knowledge (TOK) is a course designed to encourage critical thinking about knowledge itself. The TOK course examines the nature of knowledge and how we know what we know. It does this by encouraging students to analyse knowledge claims and explore questions about the construction of knowledge. The role of TOK is to emphasize connections between areas of shared knowledge and link them to personal knowledge.',
      tips: [
        'Engage actively with the course content and participate in discussions',
        'Connect TOK concepts to your other DP subjects',
        'Develop your TOK exhibition early in the course',
        'Choose a TOK essay title that genuinely interests you',
        'Maintain detailed notes and reflections throughout the course'
      ],
      commonMistakes: [
        'Treating TOK as just another subject without engaging with the philosophical questions',
        'Not connecting TOK concepts to real-life examples and personal experience',
        'Waiting until the last minute to start the TOK essay or exhibition',
        'Focusing only on memorizing content rather than developing critical thinking skills',
        'Not participating actively in TOK discussions and activities'
      ]
    },
    'knowledge_questions': {
      title: 'Knowledge Questions',
      content: 'Knowledge questions are at the heart of TOK. They are questions about knowledge itself - about how knowledge is produced, acquired, shared and used; what it is and what it is not; who has it and who does not; and who decides the answers to these questions. Knowledge questions help students move beyond subject-specific questions into the realm of TOK.',
      tips: [
        'Practice formulating knowledge questions from real-life situations',
        'Use the knowledge framework (scope, perspectives, methods and tools, ethics) to structure your analysis',
        'Connect knowledge questions to specific examples from your other subjects',
        'Explore the contestable nature of knowledge questions - there are often multiple plausible answers',
        'Use knowledge questions to deepen your understanding of how knowledge is constructed'
      ],
      commonMistakes: [
        'Confusing knowledge questions with subject-specific questions',
        'Not providing real examples to support your analysis of knowledge questions',
        'Treating knowledge questions as having single "right" answers',
        'Failing to explore different perspectives on knowledge questions',
        'Not connecting knowledge questions to the core theme and optional themes'
      ]
    },
    'core_theme': {
      title: 'Core Theme: Knowledge and the Knower',
      content: 'The core theme provides an opportunity for students to reflect on themselves as knowers and thinkers, and on the different communities of knowers to which we belong. This theme explores how personal and cultural perspectives influence what we know and how we know it.',
      tips: [
        'Reflect on your own experiences as a knower',
        'Consider how different communities of knowers approach knowledge',
        'Explore the relationship between personal knowledge and shared knowledge',
        'Connect the core theme to your own life experiences and cultural background',
        'Use the core theme to develop self-awareness and understanding of different perspectives'
      ],
      commonMistakes: [
        'Focusing only on theoretical aspects without personal reflection',
        'Not connecting the core theme to real-life examples',
        'Treating the core theme as separate from other TOK themes',
        'Failing to explore how personal identity affects knowledge',
        'Not considering different communities of knowers and their approaches to knowledge'
      ]
    },
    'areas_of_knowledge': {
      title: 'Areas of Knowledge',
      content: 'TOK requires students to study five areas of knowledge: History, Human Sciences, Natural Sciences, Arts, and Mathematics. Each area of knowledge has its own methods, tools, and ways of establishing knowledge claims. Students must explore how knowledge is constructed and evaluated in these different areas.',
      tips: [
        'Compare and contrast how different areas of knowledge establish truth claims',
        'Explore the strengths and limitations of methods used in each area',
        'Consider how areas of knowledge interact and influence each other',
        'Use real examples from your DP subjects to illustrate TOK concepts',
        'Develop an understanding of the scope and boundaries of each area of knowledge'
      ],
      commonMistakes: [
        'Treating areas of knowledge as isolated from each other',
        'Not exploring the methods and tools specific to each area',
        'Failing to connect areas of knowledge to real examples',
        'Overgeneralizing about how knowledge works in different areas',
        'Not considering the role of language and concepts in shaping knowledge in each area'
      ]
    },
    'tok_essay': {
      title: 'The TOK Essay',
      content: 'The TOK essay is a 1,600-word formal piece of writing in response to one of the prescribed titles. Students must provide a clear, coherent and critical exploration of the essay title, linking effectively to areas of knowledge and supporting arguments with specific examples.',
      tips: [
        'Choose a prescribed title that genuinely interests you and allows for deep analysis',
        'Develop a clear structure with an introduction, body paragraphs, and conclusion',
        'Use specific examples from areas of knowledge to support your arguments',
        'Explore different perspectives and evaluate counterclaims',
        'Maintain academic tone and proper referencing throughout'
      ],
      commonMistakes: [
        'Choosing a title that you don\'t fully understand or can\'t engage with deeply',
        'Writing a descriptive essay rather than a critical analysis',
        'Failing to link arguments to specific areas of knowledge',
        'Not exploring different perspectives or counterarguments',
        'Exceeding the word limit or not meeting the minimum word count'
      ]
    },
    'tok_exhibition': {
      title: 'The TOK Exhibition',
      content: 'The TOK exhibition is an internally assessed task where students create an exhibition of three objects that connect to one of the 35 IA prompts. The exhibition must show how TOK manifests in the world around us, with each object linked to the selected prompt.',
      tips: [
        'Choose objects with specific real-world contexts, not generic images',
        'Select an IA prompt that allows for meaningful connections between objects',
        'Provide clear justifications for why each object contributes to the exhibition',
        'Ensure all three objects are linked to the same IA prompt',
        'Create a typed commentary for each object explaining its context and links to the prompt'
      ],
      commonMistakes: [
        'Using generic images instead of specific objects with real-world contexts',
        'Choosing objects that don\'t clearly connect to the selected IA prompt',
        'Providing inadequate justification for the inclusion of objects',
        'Not following the required format (title, images, commentaries, references)',
        'Failing to exhibit the completed exhibition to an audience'
      ]
    }
  },
  sampleQuestions: [
    'What counts as knowledge?',
    'Are some types of knowledge more useful than others?',
    'What features of knowledge have an impact on its reliability?',
    'On what grounds might we doubt a claim?',
    'What counts as good evidence for a claim?',
    'How does the way that we organize or classify knowledge affect what we know?',
    'What are the implications of having, or not having, knowledge?',
    'To what extent is certainty attainable?',
    'Are some types of knowledge less open to interpretation than others?',
    'What challenges are raised by the dissemination and/or communication of knowledge?'
  ],
  timeline: [
    {
      phase: 'Introduction to TOK (First 2-3 months)',
      duration: '8-12 weeks',
      activities: [
        'Explore the core theme: Knowledge and the knower',
        'Introduction to knowledge questions and the knowledge framework',
        'Begin selecting objects for the TOK exhibition',
        'Initial discussions about areas of knowledge',
        'Practice formulating knowledge questions from real-life situations'
      ]
    },
    {
      phase: 'Exploring Themes and Areas (Months 4-8)',
      duration: '16-20 weeks',
      activities: [
        'Study two optional themes in depth',
        'Explore all five areas of knowledge',
        'Develop the TOK exhibition with selected objects and commentaries',
        'Practice essay writing skills and analysis',
        'Connect TOK concepts to other DP subjects'
      ]
    },
    {
      phase: 'Assessment Preparation (Months 9-10)',
      duration: '6-8 weeks',
      activities: [
        'Choose and begin planning the TOK essay',
        'Complete the TOK exhibition and prepare for showcasing',
        'Discuss essay plans with teacher (first interaction)',
        'Share initial essay exploration (second interaction)',
        'Refine essay based on teacher feedback'
      ]
    },
    {
      phase: 'Final Assessment (Month 11)',
      duration: '4 weeks',
      activities: [
        'Complete TOK essay with one draft submitted for feedback (third interaction)',
        'Finalize TOK exhibition and showcase to audience',
        'Submit completed TOK essay and exhibition',
        'Reflect on the TOK course and personal development'
      ]
    }
  ]
};

export { extendedEssayData, theoryOfKnowledgeData };