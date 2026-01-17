// IA and Essay Structure Data for all IB Subjects
// Comprehensive structural requirements, heading outlines, and layout guidelines

export interface StructureSection {
  heading: string;
  subheadings?: string[];
  description: string;
  wordCount?: string;
  tips: string[];
}

export interface SubjectStructure {
  subject: string;
  assessmentType: 'IA' | 'Essay' | 'Commentary' | 'Investigation' | 'Report' | 'Portfolio';
  totalWordCount: string;
  pageLimit?: string;
  weighting: string;
  formatRequirements: {
    font: string;
    fontSize: string;
    lineSpacing: string;
    margins: string;
    headerFooter?: string;
  };
  structure: StructureSection[];
  appendices?: {
    allowed: boolean;
    includes: string[];
    notes: string;
  };
  bibliography: {
    required: boolean;
    style: string;
    notes: string;
  };
  commonMistakes: string[];
  examinerTips: string[];
}

export const iaEssayStructureData: Record<string, SubjectStructure> = {
  // GROUP 1: LANGUAGE AND LITERATURE
  'english-a-literature-hl-essay': {
    subject: 'English A: Literature HL Essay',
    assessmentType: 'Essay',
    totalWordCount: '1,200–1,500 words',
    weighting: '25% of final grade (HL)',
    formatRequirements: {
      font: 'Times New Roman or similar serif',
      fontSize: '12pt',
      lineSpacing: 'Double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Title',
        description: 'A clear, focused title that indicates the line of inquiry and the work(s) being studied.',
        tips: [
          'Make it specific, not generic',
          'Include the author and work title',
          'Reflect your central argument'
        ]
      },
      {
        heading: 'Introduction',
        description: 'Introduce the text(s), author(s), and your line of inquiry. Present a clear thesis statement.',
        wordCount: '150–200 words',
        tips: [
          'Hook the reader with an engaging opening',
          'Provide essential context about the text(s)',
          'State your thesis clearly at the end',
          'Outline your argument structure'
        ]
      },
      {
        heading: 'Body Paragraphs',
        subheadings: ['Literary Analysis Point 1', 'Literary Analysis Point 2', 'Literary Analysis Point 3', 'Literary Analysis Point 4 (optional)'],
        description: 'Each paragraph should focus on one aspect of your argument with textual evidence and analysis.',
        wordCount: '200–300 words each',
        tips: [
          'Use PEEL structure: Point, Evidence, Explanation, Link',
          'Include short, embedded quotations',
          'Analyze literary techniques and their effects',
          'Connect each paragraph to your thesis',
          'Use topic sentences to guide the reader'
        ]
      },
      {
        heading: 'Conclusion',
        description: 'Synthesize your argument and reflect on the broader significance of your analysis.',
        wordCount: '150–200 words',
        tips: [
          'Restate thesis in new words',
          'Summarize key points without repetition',
          'Offer broader literary or thematic insights',
          'End with a memorable final thought'
        ]
      }
    ],
    bibliography: {
      required: true,
      style: 'MLA format preferred',
      notes: 'Include all primary and secondary sources. Works cited page does not count toward word count.'
    },
    commonMistakes: [
      'Retelling the plot instead of analyzing',
      'Making unsupported claims without textual evidence',
      'Using overly long quotations',
      'Weak or non-existent thesis statement',
      'Ignoring the significance of literary techniques'
    ],
    examinerTips: [
      'Show personal engagement with the text',
      'Demonstrate sophisticated understanding of literary features',
      'Maintain consistent focus on your line of inquiry',
      'Use academic register throughout'
    ]
  },

  'english-a-literature-paper-1': {
    subject: 'English A: Literature Paper 1 (Guided Literary Analysis)',
    assessmentType: 'Commentary',
    totalWordCount: 'No strict limit (timed exam)',
    weighting: '35% SL / 35% HL',
    formatRequirements: {
      font: 'Handwritten or typed in exam',
      fontSize: 'Legible handwriting',
      lineSpacing: 'Leave space for corrections',
      margins: 'Use lined paper provided',
    },
    structure: [
      {
        heading: 'Introduction',
        description: 'Identify the text type, establish context, and present your thesis about how meaning is constructed.',
        tips: [
          'Identify genre, form, and purpose',
          'Comment on the overall tone/mood',
          'State what the text is about (theme)',
          'Preview your main analytical points'
        ]
      },
      {
        heading: 'Body Paragraph 1: Opening/Structure',
        description: 'Analyze how the text opens and is structured.',
        tips: [
          'Discuss narrative voice/perspective',
          'Comment on structural choices',
          'Analyze the opening lines closely'
        ]
      },
      {
        heading: 'Body Paragraph 2: Language & Imagery',
        description: 'Examine the author\'s use of language, imagery, and literary devices.',
        tips: [
          'Focus on specific word choices (diction)',
          'Analyze metaphors, similes, and symbols',
          'Discuss the effect of imagery on the reader'
        ]
      },
      {
        heading: 'Body Paragraph 3: Tone & Theme',
        description: 'Explore how tone develops and themes emerge.',
        tips: [
          'Trace shifts in tone throughout',
          'Connect literary features to thematic meaning',
          'Consider ambiguity and complexity'
        ]
      },
      {
        heading: 'Body Paragraph 4: Ending/Conclusion of Text',
        description: 'Analyze how the text concludes and its significance.',
        tips: [
          'Discuss resolution or lack thereof',
          'Comment on final impressions',
          'Connect to overall meaning'
        ]
      },
      {
        heading: 'Conclusion',
        description: 'Synthesize your analysis and reflect on the text\'s overall effect.',
        tips: [
          'Summarize key insights',
          'Reflect on the text\'s success/impact',
          'Avoid introducing new points'
        ]
      }
    ],
    bibliography: {
      required: false,
      style: 'N/A',
      notes: 'No bibliography required for exam essays.'
    },
    commonMistakes: [
      'Feature-spotting without analysis',
      'Paraphrasing instead of analyzing',
      'Ignoring the guiding question',
      'Not using sufficient textual evidence',
      'Running out of time'
    ],
    examinerTips: [
      'Plan before you write (5-10 minutes)',
      'Focus on HOW meaning is created, not just WHAT',
      'Integrate quotations smoothly',
      'Write in present tense when discussing the text'
    ]
  },

  // GROUP 2: LANGUAGE ACQUISITION
  'language-b-written-assignment': {
    subject: 'Language B Written Assignment',
    assessmentType: 'Essay',
    totalWordCount: '500–600 words (SL) / 600–750 words (HL)',
    weighting: '25% of final grade',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: 'Double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Rationale (if required)',
        description: 'Brief explanation of your chosen text type, audience, and purpose.',
        wordCount: '100–150 words',
        tips: [
          'Explain your text type choice',
          'Identify target audience',
          'State your purpose clearly',
          'Connect to the source text'
        ]
      },
      {
        heading: 'Introduction',
        description: 'Introduce your topic and establish context for the reader.',
        tips: [
          'Engage the reader immediately',
          'Provide necessary background',
          'State your main idea or argument'
        ]
      },
      {
        heading: 'Body',
        subheadings: ['Main Point 1', 'Main Point 2', 'Main Point 3'],
        description: 'Develop your ideas with clear arguments and relevant examples.',
        tips: [
          'Use appropriate register for text type',
          'Include a range of vocabulary',
          'Demonstrate grammatical accuracy',
          'Organize ideas logically'
        ]
      },
      {
        heading: 'Conclusion',
        description: 'Summarize main points and provide closure.',
        tips: [
          'Reinforce main message',
          'End memorably',
          'Match the tone of your text type'
        ]
      }
    ],
    bibliography: {
      required: true,
      style: 'Any consistent format',
      notes: 'Cite all sources used. Bibliography not counted in word limit.'
    },
    commonMistakes: [
      'Not matching the conventions of the text type',
      'Limited range of vocabulary',
      'Grammatical errors that impede communication',
      'Exceeding word limit',
      'Weak rationale that doesn\'t justify choices'
    ],
    examinerTips: [
      'Practice different text types before the exam',
      'Use idiomatic expressions appropriately',
      'Proofread carefully for accuracy',
      'Show cultural awareness in your writing'
    ]
  },

  // GROUP 3: INDIVIDUALS AND SOCIETIES
  'history-ia': {
    subject: 'History Internal Assessment',
    assessmentType: 'Investigation',
    totalWordCount: '2,200 words maximum',
    weighting: '25% of final grade',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: 'Double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Section 1: Identification and Evaluation of Sources',
        description: 'Analyze two sources relevant to your investigation in terms of origin, purpose, value, and limitations.',
        wordCount: '500 words',
        tips: [
          'Choose one primary and one secondary source ideally',
          'Use OPVL framework systematically',
          'Be specific about values and limitations',
          'Connect to your research question',
          'Avoid generic statements'
        ]
      },
      {
        heading: 'Section 2: Investigation',
        description: 'Present your historical investigation with a clear argument and evidence.',
        wordCount: '1,300 words',
        tips: [
          'Start with clear thesis statement',
          'Organize thematically or chronologically',
          'Use multiple sources as evidence',
          'Include different historical perspectives',
          'Footnote all sources properly',
          'Maintain analytical tone throughout'
        ]
      },
      {
        heading: 'Section 3: Reflection',
        description: 'Reflect on what the investigation revealed about the methods and challenges historians face.',
        wordCount: '400 words',
        tips: [
          'Focus on historian\'s craft, not your personal experience',
          'Discuss challenges of using sources',
          'Consider how your investigation illustrates historical methodology',
          'Avoid saying what you would do differently'
        ]
      }
    ],
    appendices: {
      allowed: true,
      includes: ['Images', 'Maps', 'Statistical data', 'Interview transcripts'],
      notes: 'Appendices must be referenced in the text. Do not include full source copies.'
    },
    bibliography: {
      required: true,
      style: 'Chicago/Turabian footnotes preferred',
      notes: 'Minimum 10-15 varied sources recommended. Bibliography not counted in word limit.'
    },
    commonMistakes: [
      'Choosing a research question that is too broad',
      'Describing events instead of analyzing',
      'Not following the prescribed structure',
      'Generic source evaluation without specificity',
      'Reflection focused on personal learning instead of methodology'
    ],
    examinerTips: [
      'The research question should allow for historical debate',
      'Section 2 should read like a mini-essay with an argument',
      'Use historian\'s language in your reflection',
      'Start early and allow time for source gathering'
    ]
  },

  'economics-ia': {
    subject: 'Economics Internal Assessment Portfolio',
    assessmentType: 'Portfolio',
    totalWordCount: '800 words per commentary (3 commentaries)',
    weighting: '20% of final grade',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: 'Double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Cover Page',
        description: 'Include title, date of article, word count, and section of syllabus.',
        tips: [
          'Use official IB cover page template',
          'Clearly state the syllabus section',
          'Include source URL/reference'
        ]
      },
      {
        heading: 'Article (attached)',
        description: 'Source article from published news media within the last year.',
        tips: [
          'Choose articles with clear economic content',
          'Highlight or annotate key economic concepts',
          'Ensure article is from reputable source',
          'Each commentary must use a different section of the syllabus'
        ]
      },
      {
        heading: 'Introduction',
        description: 'Introduce the article and identify the key economic issue.',
        wordCount: '100–150 words',
        tips: [
          'Summarize the article briefly',
          'Identify the main economic concept(s)',
          'State what you will analyze'
        ]
      },
      {
        heading: 'Explanation & Analysis',
        subheadings: ['Economic Theory/Concepts', 'Diagram(s) with Explanation', 'Application to Real World'],
        description: 'Apply economic theory to analyze the situation in the article.',
        wordCount: '500–550 words',
        tips: [
          'Define key economic terms',
          'Include fully labeled diagram(s)',
          'Explain diagram shifts and movements',
          'Link theory directly to the article',
          'Use real data if available'
        ]
      },
      {
        heading: 'Evaluation',
        description: 'Critically evaluate the economic situation, policies, or outcomes.',
        wordCount: '150–200 words',
        tips: [
          'Consider stakeholder perspectives',
          'Discuss short-run vs. long-run effects',
          'Evaluate effectiveness of policies',
          'Consider unintended consequences',
          'Use evaluation language (however, although, on the other hand)'
        ]
      }
    ],
    appendices: {
      allowed: false,
      includes: [],
      notes: 'Diagrams must be included in the body. Article attached separately.'
    },
    bibliography: {
      required: true,
      style: 'Any consistent format',
      notes: 'Cite the source article and any additional sources used.'
    },
    commonMistakes: [
      'Choosing articles without sufficient economic content',
      'Not including enough diagrams',
      'Diagrams without proper labels or explanations',
      'Weak evaluation lacking multiple perspectives',
      'Using the same syllabus section for multiple commentaries'
    ],
    examinerTips: [
      'Choose articles that allow for genuine economic analysis',
      'Draw diagrams by hand if possible for authenticity',
      'Your three commentaries must cover different syllabus sections (Micro, Macro, International)',
      'Quality of evaluation often distinguishes top marks'
    ]
  },

  'geography-ia': {
    subject: 'Geography Internal Assessment',
    assessmentType: 'Investigation',
    totalWordCount: '2,500 words maximum',
    weighting: '20% of final grade',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: '1.5 or double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Introduction',
        description: 'Introduce your fieldwork investigation with research question and geographic context.',
        wordCount: '300–400 words',
        tips: [
          'State your research question clearly',
          'Provide geographic context and location',
          'Explain why this topic is geographically significant',
          'Include a location map'
        ]
      },
      {
        heading: 'Methods',
        description: 'Describe primary data collection methods used in fieldwork.',
        wordCount: '400–500 words',
        tips: [
          'Justify your sampling strategy',
          'Describe data collection techniques in detail',
          'Include photos of fieldwork',
          'Discuss ethical considerations',
          'Explain how reliability was ensured'
        ]
      },
      {
        heading: 'Results',
        description: 'Present your collected data using appropriate techniques.',
        wordCount: '400–500 words',
        tips: [
          'Use a variety of presentation techniques',
          'Include maps, graphs, tables, and photographs',
          'Describe patterns and trends in the data',
          'Ensure all figures are numbered and titled'
        ]
      },
      {
        heading: 'Analysis',
        description: 'Analyze your results using geographic theory and concepts.',
        wordCount: '500–600 words',
        tips: [
          'Apply relevant geographic concepts',
          'Use statistical analysis where appropriate',
          'Compare with secondary data',
          'Identify anomalies and explain them',
          'Make geographic links to broader patterns'
        ]
      },
      {
        heading: 'Conclusion',
        description: 'Answer your research question based on your findings.',
        wordCount: '300–400 words',
        tips: [
          'Directly address your research question',
          'Summarize key findings',
          'State the significance of your findings',
          'Suggest areas for further research'
        ]
      },
      {
        heading: 'Evaluation',
        description: 'Evaluate the strengths and limitations of your investigation.',
        wordCount: '300–400 words',
        tips: [
          'Discuss reliability and validity',
          'Identify sources of error',
          'Suggest improvements for future studies',
          'Be critical but balanced'
        ]
      }
    ],
    appendices: {
      allowed: true,
      includes: ['Raw data tables', 'Questionnaires used', 'Additional photographs', 'Statistical calculations'],
      notes: 'Appendices should be referenced in text and kept reasonable in length.'
    },
    bibliography: {
      required: true,
      style: 'Any consistent format',
      notes: 'Include all sources. Secondary data must be properly cited.'
    },
    commonMistakes: [
      'Insufficient primary data collection',
      'Not linking to geographic concepts',
      'Using only one data presentation technique',
      'Weak evaluation without specific suggestions',
      'Research question too broad or not geographic'
    ],
    examinerTips: [
      'Your investigation MUST involve primary fieldwork data',
      'Use geographic terminology throughout',
      'Quality of analysis and evaluation is key',
      'Choose a manageable, focused research question'
    ]
  },

  'psychology-ia': {
    subject: 'Psychology Internal Assessment',
    assessmentType: 'Report',
    totalWordCount: '1,800–2,200 words',
    weighting: '25% of final grade',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: 'Double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Introduction',
        description: 'Present the aim and rationale for your experimental replication or modification.',
        wordCount: '500–600 words',
        tips: [
          'Describe the original study you are replicating',
          'Explain relevant psychological theory',
          'State your aim and hypothesis clearly',
          'Operationalize your variables'
        ]
      },
      {
        heading: 'Exploration (Method)',
        subheadings: ['Design', 'Participants', 'Materials', 'Procedure', 'Ethics'],
        description: 'Describe your experimental method in detail.',
        wordCount: '400–500 words',
        tips: [
          'Justify your experimental design',
          'Describe sampling method and participants',
          'List all materials used',
          'Write procedure in numbered steps',
          'Address all ethical considerations'
        ]
      },
      {
        heading: 'Analysis',
        subheadings: ['Descriptive Statistics', 'Presentation of Results', 'Interpretation'],
        description: 'Present and analyze your results.',
        wordCount: '400–500 words',
        tips: [
          'Calculate appropriate descriptive statistics',
          'Include a clear graph or table',
          'Interpret patterns in the data',
          'Reference your hypothesis',
          'Do not include inferential statistics'
        ]
      },
      {
        heading: 'Evaluation',
        description: 'Critically evaluate your study and suggest modifications.',
        wordCount: '400–500 words',
        tips: [
          'Discuss strengths and limitations',
          'Evaluate methodology critically',
          'Suggest specific modifications',
          'Consider real-world applications'
        ]
      }
    ],
    appendices: {
      allowed: true,
      includes: ['Raw data', 'Consent forms', 'Debriefing notes', 'Materials used'],
      notes: 'Appendices are not included in word count but must be referenced.'
    },
    bibliography: {
      required: true,
      style: 'APA format required',
      notes: 'Use APA 7th edition for all citations and references.'
    },
    commonMistakes: [
      'Not replicating or closely basing on an existing study',
      'Using unethical procedures',
      'Including inferential statistics (not allowed)',
      'Weak link between theory and hypothesis',
      'Failure to operationalize variables'
    ],
    examinerTips: [
      'Your study must be a true experiment with an IV and DV',
      'Ethics approval and informed consent are mandatory',
      'Focus on one clear hypothesis',
      'The evaluation should be thoughtful and specific'
    ]
  },

  'business-management-ia': {
    subject: 'Business Management Internal Assessment',
    assessmentType: 'Report',
    totalWordCount: '1,800 words (SL) / 2,100 words (HL)',
    weighting: '25% of final grade',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: 'Double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Research Proposal (HL only)',
        description: 'Formal research proposal including research question and methodology.',
        wordCount: '500 words (HL)',
        tips: [
          'State research question clearly',
          'Outline proposed methodology',
          'Justify choice of organization',
          'Include supporting documents'
        ]
      },
      {
        heading: 'Introduction',
        description: 'Introduce the organization and the business issue/decision/problem.',
        wordCount: '200–300 words',
        tips: [
          'Describe the organization briefly',
          'State the research question',
          'Explain why this issue is significant',
          'Outline the structure of your report'
        ]
      },
      {
        heading: 'Methodology',
        description: 'Explain how you gathered primary and secondary research.',
        wordCount: '200–300 words',
        tips: [
          'Describe primary research methods',
          'Explain secondary sources used',
          'Justify your methods',
          'Discuss limitations of methodology'
        ]
      },
      {
        heading: 'Main Findings & Analysis',
        description: 'Present and analyze your findings using business tools and theories.',
        wordCount: '800–1,000 words',
        tips: [
          'Present data clearly with visuals',
          'Apply relevant business tools (SWOT, PEST, etc.)',
          'Use business terminology',
          'Analyze rather than just describe',
          'Reference syllabus concepts'
        ]
      },
      {
        heading: 'Conclusion',
        description: 'Answer your research question based on your analysis.',
        wordCount: '200–300 words',
        tips: [
          'Directly answer your research question',
          'Summarize key findings',
          'Make justified recommendations',
          'Avoid introducing new information'
        ]
      },
      {
        heading: 'Recommendations (HL)',
        description: 'Provide detailed, justified recommendations.',
        wordCount: '200–300 words (HL)',
        tips: [
          'Be specific and actionable',
          'Justify each recommendation',
          'Consider feasibility',
          'Link back to your analysis'
        ]
      }
    ],
    appendices: {
      allowed: true,
      includes: ['Interview transcripts', 'Survey results', 'Financial data', 'Company documents'],
      notes: 'Appendices should support your analysis and be referenced in text.'
    },
    bibliography: {
      required: true,
      style: 'Any consistent format',
      notes: 'Include all primary and secondary sources used.'
    },
    commonMistakes: [
      'Choosing an inaccessible organization',
      'Research question too broad or too narrow',
      'Describing instead of analyzing',
      'Not using enough business tools/concepts',
      'Weak or generic recommendations'
    ],
    examinerTips: [
      'You must have access to the organization for primary research',
      'Choose a real business issue that matters',
      'Apply multiple business tools in your analysis',
      'Make your recommendations practical and justified'
    ]
  },

  // GROUP 4: SCIENCES
  'biology-ia': {
    subject: 'Biology Internal Assessment',
    assessmentType: 'Investigation',
    totalWordCount: '6–12 pages (no strict word limit)',
    pageLimit: '12 pages maximum',
    weighting: '20% of final grade',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: '1.5 or double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Personal Engagement',
        description: 'Demonstrate genuine personal interest and engagement with the investigation.',
        tips: [
          'Explain why you chose this topic',
          'Show personal significance',
          'Demonstrate independent thinking',
          'Evidence creativity in approach'
        ]
      },
      {
        heading: 'Research Question',
        description: 'A clear, focused, and testable research question with hypothesis.',
        tips: [
          'State the question clearly',
          'Identify independent and dependent variables',
          'Include a justified hypothesis',
          'Ensure the question is appropriate for biology'
        ]
      },
      {
        heading: 'Background Information',
        description: 'Relevant biological theory with proper citations.',
        tips: [
          'Explain underlying biological concepts',
          'Use reliable sources',
          'Connect theory to your investigation',
          'Include properly formatted citations'
        ]
      },
      {
        heading: 'Methodology',
        subheadings: ['Materials', 'Variables', 'Procedure', 'Safety & Ethics'],
        description: 'A detailed, replicable procedure.',
        tips: [
          'List all materials and equipment',
          'Clearly identify all variables (IV, DV, controlled)',
          'Write numbered step-by-step procedure',
          'Justify your method choices',
          'Address safety and ethical considerations',
          'Include a diagram of setup if helpful'
        ]
      },
      {
        heading: 'Raw Data',
        description: 'Present all collected raw data with appropriate uncertainty.',
        tips: [
          'Use clear, properly labeled tables',
          'Include units and uncertainties',
          'Record all trials',
          'Note any qualitative observations'
        ]
      },
      {
        heading: 'Processed Data',
        description: 'Process data using appropriate calculations and statistical methods.',
        tips: [
          'Calculate averages and standard deviation',
          'Show sample calculations',
          'Propagate uncertainties',
          'Use appropriate statistical tests if applicable'
        ]
      },
      {
        heading: 'Graphs & Analysis',
        description: 'Present data visually and analyze patterns.',
        tips: [
          'Include error bars',
          'Draw line of best fit if appropriate',
          'Title graphs appropriately',
          'Analyze trends and patterns in detail',
          'Discuss the relationship between variables'
        ]
      },
      {
        heading: 'Conclusion',
        description: 'Answer your research question based on your results.',
        tips: [
          'State whether your hypothesis was supported',
          'Summarize key findings',
          'Relate back to biological theory',
          'Discuss significance of results'
        ]
      },
      {
        heading: 'Evaluation',
        description: 'Critically evaluate your investigation.',
        tips: [
          'Identify systematic and random errors',
          'Discuss limitations of method',
          'Suggest specific, realistic improvements',
          'Consider reliability and validity'
        ]
      }
    ],
    appendices: {
      allowed: true,
      includes: ['Additional data tables', 'Extra graphs', 'Calculations', 'Risk assessments'],
      notes: 'Appendices do not count toward page limit but should be concise.'
    },
    bibliography: {
      required: true,
      style: 'Any consistent format (APA, MLA, or Chicago)',
      notes: 'Cite all sources. Include in-text citations throughout.'
    },
    commonMistakes: [
      'Investigation not sufficiently complex for IB level',
      'Not enough data points or trials',
      'Missing or incorrect uncertainty calculations',
      'Graphs without error bars or proper labels',
      'Weak evaluation without specific improvements',
      'Conclusion not supported by data'
    ],
    examinerTips: [
      'Collect at least 5 values of the IV with 5+ trials each',
      'Personal engagement should be evident throughout',
      'Quality over quantity in your analysis',
      'A good evaluation shows you understand sources of error'
    ]
  },

  'chemistry-ia': {
    subject: 'Chemistry Internal Assessment',
    assessmentType: 'Investigation',
    totalWordCount: '6–12 pages (no strict word limit)',
    pageLimit: '12 pages maximum',
    weighting: '20% of final grade',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: '1.5 or double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Personal Engagement',
        description: 'Demonstrate genuine personal interest in your chosen investigation.',
        tips: [
          'Explain personal connection to the topic',
          'Show independent thinking and initiative',
          'Evidence of creativity in design',
          'Authentic personal voice'
        ]
      },
      {
        heading: 'Research Question',
        description: 'A focused, testable research question.',
        tips: [
          'Clearly state the research question',
          'Identify independent and dependent variables',
          'Include a justified hypothesis',
          'Ensure appropriate chemical focus'
        ]
      },
      {
        heading: 'Background',
        description: 'Relevant chemical theory supporting your investigation.',
        tips: [
          'Explain underlying chemistry concepts',
          'Include relevant equations',
          'Define key terms',
          'Use reliable, cited sources'
        ]
      },
      {
        heading: 'Methodology',
        subheadings: ['Apparatus & Chemicals', 'Variables', 'Procedure', 'Safety'],
        description: 'Detailed, replicable experimental method.',
        tips: [
          'List all apparatus with specifications',
          'Include chemical concentrations and quantities',
          'Identify all variables clearly',
          'Numbered procedural steps',
          'Include safety considerations with MSDS references'
        ]
      },
      {
        heading: 'Raw Data',
        description: 'All collected data with appropriate precision.',
        tips: [
          'Present in clear tables',
          'Include units and uncertainties',
          'Record qualitative observations',
          'Note any anomalies'
        ]
      },
      {
        heading: 'Data Processing',
        description: 'Calculations and processed data.',
        tips: [
          'Show sample calculations clearly',
          'Calculate averages and uncertainties',
          'Propagate errors correctly',
          'Present processed data in tables'
        ]
      },
      {
        heading: 'Analysis',
        description: 'Graphical analysis and discussion of results.',
        tips: [
          'Include appropriate graphs with error bars',
          'Draw best fit lines and discuss',
          'Calculate gradient if relevant',
          'Analyze trends and patterns',
          'Compare with literature values if applicable'
        ]
      },
      {
        heading: 'Conclusion',
        description: 'Answer your research question with reference to results.',
        tips: [
          'State outcome clearly',
          'Reference data in conclusion',
          'Compare with hypothesis',
          'Discuss chemical significance'
        ]
      },
      {
        heading: 'Evaluation',
        description: 'Critical evaluation of methodology and results.',
        tips: [
          'Identify systematic and random errors',
          'Calculate percentage error if possible',
          'Suggest specific improvements',
          'Evaluate reliability and validity'
        ]
      }
    ],
    appendices: {
      allowed: true,
      includes: ['Risk assessments', 'Additional calculations', 'Raw data extensions'],
      notes: 'Keep appendices focused and referenced in main text.'
    },
    bibliography: {
      required: true,
      style: 'Any consistent format',
      notes: 'Cite all sources including MSDS and literature values.'
    },
    commonMistakes: [
      'Investigation not sufficiently quantitative',
      'Incorrect significant figures or uncertainty propagation',
      'Missing error bars on graphs',
      'Not comparing results to literature values',
      'Vague evaluation without specific improvements'
    ],
    examinerTips: [
      'Choose an investigation that allows quantitative analysis',
      'Percentage error calculations can strengthen evaluation',
      'Ensure investigation is appropriate for 6-12 pages',
      'Personal engagement should be genuine and evident'
    ]
  },

  'physics-ia': {
    subject: 'Physics Internal Assessment',
    assessmentType: 'Investigation',
    totalWordCount: '6–12 pages (no strict word limit)',
    pageLimit: '12 pages maximum',
    weighting: '20% of final grade',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: '1.5 or double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Personal Engagement',
        description: 'Show genuine personal interest in the physics investigation.',
        tips: [
          'Explain why this topic matters to you',
          'Demonstrate independent thinking',
          'Show creativity in approach',
          'Personal voice should be authentic'
        ]
      },
      {
        heading: 'Research Question',
        description: 'A focused, testable question investigating a physics relationship.',
        tips: [
          'State the research question precisely',
          'Include a hypothesis with justification',
          'Clearly identify all variables',
          'Ensure question allows for quantitative analysis'
        ]
      },
      {
        heading: 'Background',
        description: 'Relevant physics theory with proper citations.',
        tips: [
          'Explain the physics concepts involved',
          'Include relevant equations',
          'Derive equations if applicable',
          'Connect theory to your investigation'
        ]
      },
      {
        heading: 'Methodology',
        subheadings: ['Apparatus', 'Variables', 'Procedure', 'Diagram'],
        description: 'Detailed experimental setup and procedure.',
        tips: [
          'List apparatus with precision/uncertainty',
          'Identify IV, DV, and controlled variables',
          'Explain control of variables',
          'Include labeled diagram of setup',
          'Numbered procedural steps'
        ]
      },
      {
        heading: 'Raw Data',
        description: 'All measured values with appropriate uncertainty.',
        tips: [
          'Present in clear, labeled tables',
          'Include units and absolute uncertainties',
          'Record multiple trials',
          'Note qualitative observations'
        ]
      },
      {
        heading: 'Data Processing',
        description: 'Process raw data with sample calculations.',
        tips: [
          'Show one full sample calculation',
          'Propagate uncertainties correctly',
          'Calculate averages',
          'Process data into useful form for graphing'
        ]
      },
      {
        heading: 'Graphical Analysis',
        description: 'Graphs with analysis of the relationship.',
        tips: [
          'Include error bars',
          'Draw maximum and minimum gradients',
          'Calculate gradient with uncertainty',
          'Linearize graphs if necessary',
          'Discuss what the gradient represents'
        ]
      },
      {
        heading: 'Conclusion',
        description: 'Answer the research question using evidence from results.',
        tips: [
          'State the conclusion clearly',
          'Quote final value with uncertainty',
          'Compare to accepted/theoretical value',
          'Discuss percentage error'
        ]
      },
      {
        heading: 'Evaluation',
        description: 'Critical evaluation of the investigation.',
        tips: [
          'Identify sources of systematic error',
          'Identify sources of random error',
          'Suggest specific improvements',
          'Discuss reliability and validity',
          'Connect errors to your results'
        ]
      }
    ],
    appendices: {
      allowed: true,
      includes: ['Additional data', 'Extra graphs', 'Derivations'],
      notes: 'Reference all appendices in main text.'
    },
    bibliography: {
      required: true,
      style: 'Any consistent format',
      notes: 'Include sources for theory and accepted values.'
    },
    commonMistakes: [
      'Not collecting enough data points',
      'Incorrect uncertainty propagation',
      'Graphs without error bars or gradient analysis',
      'Not linearizing non-linear relationships',
      'Generic evaluation without specific errors',
      'Not comparing to accepted values'
    ],
    examinerTips: [
      'Aim for at least 5-7 values of IV with 5+ trials',
      'Max-min gradient method shows understanding of uncertainty',
      'A strong evaluation shows understanding of error sources',
      'Choose an investigation that allows good data collection'
    ]
  },

  'computer-science-ia': {
    subject: 'Computer Science Internal Assessment',
    assessmentType: 'Report',
    totalWordCount: '2,000 words (written documentation)',
    weighting: '30% of final grade (SL) / 25% of final grade (HL)',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: '1.5 or double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Criterion A: Planning',
        description: 'Define the problem and plan the solution.',
        wordCount: '175–250 words',
        tips: [
          'Describe the scenario/problem clearly',
          'Identify the client/end user',
          'Explain why a computational solution is appropriate',
          'State the requirements based on consultation',
          'Include interview/survey evidence'
        ]
      },
      {
        heading: 'Criterion B: Solution Overview',
        description: 'Provide an overview of the proposed solution.',
        wordCount: '250–500 words',
        tips: [
          'Include a prototype/sketches',
          'Describe structure and features',
          'Explain algorithms/data structures to be used',
          'Include a test plan',
          'Show flowcharts or diagrams'
        ]
      },
      {
        heading: 'Criterion C: Development',
        description: 'Develop the solution with evidence of computational thinking.',
        wordCount: '500–750 words',
        tips: [
          'Demonstrate algorithmic thinking',
          'Show efficient use of data structures',
          'Include annotated code examples',
          'Explain complex techniques',
          'Reference OOP/modular design if used'
        ]
      },
      {
        heading: 'Criterion D: Functionality and Extensibility',
        description: 'Test the solution and evaluate its functionality.',
        wordCount: '250–500 words',
        tips: [
          'Include video demonstration (maximum 7 minutes)',
          'Show evidence of thorough testing',
          'Demonstrate that success criteria are met',
          'Discuss extensibility for future development',
          'Include client feedback if possible'
        ]
      },
      {
        heading: 'Criterion E: Evaluation',
        description: 'Evaluate the product against success criteria.',
        wordCount: 'Included in testing section',
        tips: [
          'Evaluate each success criterion',
          'Get feedback from client/end user',
          'Suggest improvements',
          'Reflect on the development process'
        ]
      }
    ],
    appendices: {
      allowed: true,
      includes: ['Full source code', 'Test data', 'Additional screenshots', 'User documentation'],
      notes: 'Code must be submitted separately. Include comments in code.'
    },
    bibliography: {
      required: true,
      style: 'Any consistent format',
      notes: 'Cite any libraries, tutorials, or resources used.'
    },
    commonMistakes: [
      'Solution does not address a genuine problem',
      'No evidence of client consultation',
      'Insufficient complexity for IB level',
      'Poor documentation of development process',
      'Video demonstration too long or unclear'
    ],
    examinerTips: [
      'The product must be functional and solve a real problem',
      'Video should clearly demonstrate all features',
      'Document your development journey',
      'Choose a project of appropriate complexity'
    ]
  },

  // GROUP 5: MATHEMATICS
  'math-aa-ia': {
    subject: 'Mathematics: Analysis and Approaches IA',
    assessmentType: 'Investigation',
    totalWordCount: '6–12 pages',
    pageLimit: '12 pages',
    weighting: '20% of final grade',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: '1.5 or double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Introduction',
        description: 'Introduce your topic and state your aim.',
        tips: [
          'Explain why you chose this topic',
          'Show personal engagement',
          'State the aim clearly',
          'Outline what you will investigate'
        ]
      },
      {
        heading: 'Mathematical Background',
        description: 'Explain the mathematics you will use.',
        tips: [
          'Define key terms and concepts',
          'Explain relevant theorems or formulas',
          'Cite sources for mathematical theory',
          'Include only what is directly relevant'
        ]
      },
      {
        heading: 'Development',
        description: 'The main body of your mathematical investigation.',
        tips: [
          'Show all working clearly',
          'Explain your reasoning at each step',
          'Use appropriate mathematical notation',
          'Include multiple approaches if relevant',
          'Use technology appropriately and document it',
          'Make connections between concepts'
        ]
      },
      {
        heading: 'Analysis',
        description: 'Analyze your results and look for patterns.',
        tips: [
          'Identify patterns in your results',
          'Generalize findings where possible',
          'Verify results using different methods',
          'Use graphs and tables to support analysis'
        ]
      },
      {
        heading: 'Conclusion',
        description: 'Summarize findings and answer your research question.',
        tips: [
          'State conclusions clearly',
          'Relate back to your aim',
          'Discuss significance of findings',
          'Acknowledge limitations'
        ]
      },
      {
        heading: 'Reflection',
        description: 'Reflect on the exploration and consider extensions.',
        tips: [
          'Discuss what you learned',
          'Consider how the exploration could be extended',
          'Reflect on the validity of your conclusions',
          'Show personal growth and engagement'
        ]
      }
    ],
    appendices: {
      allowed: false,
      includes: [],
      notes: 'All work must be in the main body. No appendices allowed.'
    },
    bibliography: {
      required: true,
      style: 'Any consistent format',
      notes: 'Cite all sources for formulas, theory, and ideas.'
    },
    commonMistakes: [
      'Topic too simple or too complex',
      'Insufficient personal engagement shown',
      'Not enough mathematical rigor',
      'Copying mathematical derivations without understanding',
      'Poor use of mathematical notation',
      'No reflection on findings'
    ],
    examinerTips: [
      'The exploration should be genuine mathematical inquiry',
      'Show your thinking process, not just final answers',
      'Personal engagement should be evident throughout',
      'Quality of mathematics matters more than quantity'
    ]
  },

  'math-ai-ia': {
    subject: 'Mathematics: Applications and Interpretation IA',
    assessmentType: 'Investigation',
    totalWordCount: '6–12 pages',
    pageLimit: '12 pages',
    weighting: '20% of final grade',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: '1.5 or double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Introduction',
        description: 'Introduce your real-world topic and aim.',
        tips: [
          'Explain the real-world context',
          'Show why this matters to you',
          'State your aim and research question',
          'Outline your approach'
        ]
      },
      {
        heading: 'Data Collection/Mathematical Setup',
        description: 'Describe your data or mathematical model.',
        tips: [
          'Explain where data came from',
          'Describe any assumptions made',
          'Organize data clearly in tables',
          'Explain your modeling approach'
        ]
      },
      {
        heading: 'Mathematical Analysis',
        description: 'Apply mathematics to analyze your data/model.',
        tips: [
          'Use appropriate mathematical techniques',
          'Show all calculations',
          'Use technology and document it',
          'Explain what each step means in context',
          'Include graphs and visual representations'
        ]
      },
      {
        heading: 'Interpretation',
        description: 'Interpret mathematical results in real-world context.',
        tips: [
          'Explain what results mean in the real world',
          'Discuss validity of your model',
          'Consider limitations of your analysis',
          'Compare with real-world observations'
        ]
      },
      {
        heading: 'Conclusion',
        description: 'Summarize findings and answer your question.',
        tips: [
          'State main conclusions',
          'Answer your research question',
          'Discuss real-world implications',
          'Acknowledge limitations'
        ]
      },
      {
        heading: 'Reflection',
        description: 'Reflect on the exploration and possible extensions.',
        tips: [
          'Discuss what worked well and what didn\'t',
          'Suggest how to extend the exploration',
          'Show personal learning and growth',
          'Consider further applications'
        ]
      }
    ],
    appendices: {
      allowed: false,
      includes: [],
      notes: 'All work must be in the main body. No appendices allowed.'
    },
    bibliography: {
      required: true,
      style: 'Any consistent format',
      notes: 'Cite all data sources and mathematical references.'
    },
    commonMistakes: [
      'Not connecting math to real-world application',
      'Using mathematics that is too simple',
      'Not showing personal engagement',
      'Failing to interpret results in context',
      'Using only technology without understanding'
    ],
    examinerTips: [
      'Focus on applying mathematics to real situations',
      'Technology use should be thoughtful and documented',
      'Interpretation in context is crucial',
      'Show genuine personal engagement throughout'
    ]
  },

  // EXTENDED ESSAY
  'extended-essay': {
    subject: 'Extended Essay',
    assessmentType: 'Essay',
    totalWordCount: '4,000 words maximum',
    weighting: 'Core requirement (contributes to diploma points)',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: 'Double-spaced',
      margins: '2.54 cm (1 inch) all sides',
      headerFooter: 'Page numbers required',
    },
    structure: [
      {
        heading: 'Title Page',
        description: 'Official EE cover page with title and research question.',
        tips: [
          'Include your research question',
          'Add word count',
          'State the subject',
          'Do not include your name'
        ]
      },
      {
        heading: 'Contents Page',
        description: 'Table of contents with page numbers.',
        tips: [
          'List all sections with page numbers',
          'Keep it simple and clear',
          'Update before final submission'
        ]
      },
      {
        heading: 'Introduction',
        description: 'Introduce your topic, research question, and thesis.',
        wordCount: '300–400 words',
        tips: [
          'Hook the reader with engaging opening',
          'Provide context and background',
          'State research question clearly',
          'Present your thesis statement',
          'Outline the scope of your investigation'
        ]
      },
      {
        heading: 'Body',
        subheadings: ['Chapter 1/Section 1', 'Chapter 2/Section 2', 'Chapter 3/Section 3'],
        description: 'The main body developing your argument or investigation.',
        wordCount: '3,000–3,200 words',
        tips: [
          'Organize with clear headings and subheadings',
          'Each section should have a clear purpose',
          'Use evidence to support arguments',
          'Maintain clear line of argument throughout',
          'Include critical analysis, not just description',
          'Cite sources properly'
        ]
      },
      {
        heading: 'Conclusion',
        description: 'Summarize findings and answer research question.',
        wordCount: '300–400 words',
        tips: [
          'Answer your research question directly',
          'Summarize key arguments',
          'Reflect on significance of findings',
          'Acknowledge limitations',
          'Suggest areas for further research'
        ]
      },
      {
        heading: 'References/Bibliography',
        description: 'Complete list of all sources used.',
        tips: [
          'Use consistent citation format',
          'Include all sources cited in text',
          'Alphabetize entries',
          'Does not count toward word limit'
        ]
      }
    ],
    appendices: {
      allowed: true,
      includes: ['Interview transcripts', 'Surveys', 'Large data sets', 'Images', 'Maps'],
      notes: 'Appendices do not count toward word limit but should be referenced.'
    },
    bibliography: {
      required: true,
      style: 'Subject-specific (MLA for English, Chicago for History, etc.)',
      notes: 'Follow the citation style appropriate for your subject.'
    },
    commonMistakes: [
      'Research question too broad or too narrow',
      'Describing instead of analyzing',
      'Poor time management',
      'Ignoring supervisor feedback',
      'Not using enough sources',
      'Weak thesis statement'
    ],
    examinerTips: [
      'Choose a topic you are genuinely interested in',
      'Work closely with your supervisor',
      'Start early and plan your research',
      'The EE should be academically rigorous',
      'Maintain your academic integrity throughout'
    ]
  },

  // TOK ESSAY
  'tok-essay': {
    subject: 'Theory of Knowledge Essay',
    assessmentType: 'Essay',
    totalWordCount: '1,600 words maximum',
    weighting: 'Core requirement (contributes to diploma points)',
    formatRequirements: {
      font: 'Times New Roman or similar',
      fontSize: '12pt',
      lineSpacing: 'Double-spaced',
      margins: '2.54 cm (1 inch) all sides',
    },
    structure: [
      {
        heading: 'Introduction',
        description: 'Introduce the prescribed title and your thesis.',
        wordCount: '150–200 words',
        tips: [
          'Unpack the key concepts in the title',
          'Define key terms if necessary',
          'State your thesis/position clearly',
          'Outline your approach'
        ]
      },
      {
        heading: 'Body Paragraph 1',
        subheadings: ['Claim', 'AOK 1', 'Example/Evidence', 'Analysis'],
        description: 'First main argument with example from an Area of Knowledge.',
        wordCount: '350–400 words',
        tips: [
          'Make a clear claim that supports your thesis',
          'Choose relevant Area of Knowledge',
          'Use specific, well-developed example',
          'Analyze how the example supports your claim',
          'Consider knowledge questions'
        ]
      },
      {
        heading: 'Body Paragraph 2',
        subheadings: ['Counterclaim', 'AOK 2', 'Example/Evidence', 'Analysis'],
        description: 'A counterclaim from a different perspective.',
        wordCount: '350–400 words',
        tips: [
          'Present a genuine counterclaim',
          'Use a different Area of Knowledge ideally',
          'Provide specific example',
          'Analyze the counterclaim fairly',
          'Consider implications for knowledge'
        ]
      },
      {
        heading: 'Body Paragraph 3 (optional but recommended)',
        description: 'Further development or synthesis of arguments.',
        wordCount: '300–350 words',
        tips: [
          'Develop a third perspective or synthesize',
          'Resolve tension between claim and counterclaim',
          'Show depth of thinking',
          'Add nuance to your argument'
        ]
      },
      {
        heading: 'Conclusion',
        description: 'Synthesize arguments and provide final position.',
        wordCount: '150–200 words',
        tips: [
          'Restate your position with nuance',
          'Summarize key insights',
          'Reflect on implications for knowledge',
          'Avoid simply repeating the introduction',
          'Leave the reader with something to think about'
        ]
      }
    ],
    appendices: {
      allowed: false,
      includes: [],
      notes: 'No appendices allowed for TOK essay.'
    },
    bibliography: {
      required: true,
      style: 'Any consistent format',
      notes: 'Cite any sources quoted or referenced. Does not count toward word limit.'
    },
    commonMistakes: [
      'Not addressing the prescribed title directly',
      'Using examples that don\'t connect to knowledge questions',
      'No real engagement with counterclaims',
      'Generic or hypothetical examples',
      'Not using TOK terminology',
      'Simply describing rather than analyzing'
    ],
    examinerTips: [
      'Use real-world examples from Areas of Knowledge',
      'Engage with the title, don\'t just mention it',
      'Show genuine philosophical thinking',
      'Consider multiple perspectives fairly',
      'Your examples should be specific and well-analyzed'
    ]
  }
};

export default iaEssayStructureData;
