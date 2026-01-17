// Internal Assessment (IA) Guidance Data for IB Subjects
// Comprehensive guide for writing IAs across all IB subjects
// Based on official IB subject guides and assessment criteria

export interface Citation {
  title: string;
  organization: string;
  year: string;
  type: 'guide' | 'assessment' | 'specimen';
  url?: string;
}

export interface IASection {
  title: string;
  content: string;
  tips: string[];
  commonMistakes: string[];
}

export interface IASubject {
  title: string;
  description: string;
  wordCount: string;
  weighting: string;
  officialGuide?: Citation;
  additionalReferences?: Citation[];
  assessmentCriteria: {
    [key: string]: {
      name: string;
      description: string;
      marks: string;
      keyPoints: string[];
      criterion?: string;
      maxMarks?: number;
    };
  } | Array<{
    criterion: string;
    name: string;
    maxMarks: number;
    description: string;
    keyPoints: string[];
  }>;
  sections: {
    [key: string]: IASection;
  };
  sampleQuestions: string[];
  timeline: {
    phase: string;
    duration: string;
    activities: string[];
  }[];
  citations?: {
    format: string;
    example: string;
  }[];
}

const iaGuidanceData: { [key: string]: IASubject } = {
  'biology': {
    title: 'Biology IA',
    description: 'Individual scientific investigation exploring a specific biological phenomenon',
    wordCount: '6-12 pages (2200 words maximum)',
    weighting: '20% of final grade',
    officialGuide: {
      title: 'Biology Guide 2025',
      organization: 'International Baccalaureate Organization',
      year: '2025',
      type: 'guide'
    },
    additionalReferences: [
      {
        title: 'Biology Assessment Procedures',
        organization: 'International Baccalaureate Organization', 
        year: '2025',
        type: 'assessment'
      }
    ],
    assessmentCriteria: {
      'A': {
        name: 'Research Question',
        description: 'Formulation of a focused, relevant research question',
        marks: '2 marks',
        keyPoints: [
          'Question is clearly focused and allows investigation',
          'Variables are clearly identified (independent, dependent, controlled)',
          'Question is relevant to biology and appropriate for the level',
          'Sufficient background theory provided with citations'
        ]
      },
      'B': {
        name: 'Background Information',
        description: 'Demonstration of understanding of biological principles',
        marks: '2 marks',
        keyPoints: [
          'Relevant biological theory explained accurately',
          'Information directly relates to research question',
          'Sources are reliable and properly cited',
          'Shows understanding beyond basic knowledge'
        ]
      },
      'C': {
        name: 'Methodology',
        description: 'Design and execution of investigation',
        marks: '2 marks',
        keyPoints: [
          'Method is detailed enough for replication',
          'Variables clearly controlled',
          'Appropriate equipment and materials listed',
          'Safety and ethical considerations addressed',
          'Sufficient data collection planned'
        ]
      },
      'D': {
        name: 'Analysis and Evaluation',
        description: 'Processing and interpretation of data',
        marks: '2 marks',
        keyPoints: [
          'Raw data presented clearly in tables',
          'Appropriate calculations and statistical analysis',
          'Graphs and charts properly constructed',
          'Uncertainties and errors discussed',
          'Conclusion directly addresses research question'
        ]
      },
      'E': {
        name: 'Evaluation',
        description: 'Critical assessment of investigation',
        marks: '2 marks',
        keyPoints: [
          'Limitations and weaknesses identified',
          'Impact of limitations on results discussed',
          'Realistic improvements suggested',
          'Extensions for further investigation proposed'
        ]
      }
    },
    sections: {
      'choosing-topic': {
        title: 'Choosing Your Research Topic',
        content: 'Select a topic that genuinely interests you and allows for experimental investigation. Your research question should be specific, measurable, and feasible within the constraints of a school laboratory.',
        tips: [
          'Browse current biological research for inspiration',
          'Consider local environmental factors you can investigate',
          'Think about everyday biological processes you can measure',
          'Discuss feasibility with your teacher early'
        ],
        commonMistakes: [
          'Choosing topics too broad or complex for school-level investigation',
          'Selecting questions that require expensive or dangerous equipment',
          'Picking topics without sufficient background literature'
        ]
      },
      'research-question': {
        title: 'Formulating Your Research Question',
        content: 'Your research question should clearly identify the independent variable (what you will change), dependent variable (what you will measure), and include the biological organism or system being studied.',
        tips: [
          'Use the format: "How does [independent variable] affect [dependent variable] in [organism/system]?"',
          'Ensure your question is testable through experimentation',
          'Make sure you can control other variables that might interfere',
          'Consider the biological mechanism behind your investigation'
        ],
        commonMistakes: [
          'Questions that are too vague or general',
          'Unable to identify clear variables',
          'Questions that require unethical treatment of organisms',
          'Investigations that are purely observational rather than experimental'
        ]
      },
      'methodology': {
        title: 'Designing Your Experiment',
        content: 'Your methodology should be detailed enough that another student could replicate your experiment exactly. Include all materials, equipment, step-by-step procedures, and safety considerations.',
        tips: [
          'Write in sufficient detail for complete replication',
          'Include diagrams of experimental setup when helpful',
          'Specify exact quantities, concentrations, and measurements',
          'Plan for adequate sample sizes and repetitions',
          'Consider how you will control variables'
        ],
        commonMistakes: [
          'Method too vague or missing crucial details',
          'Insufficient sample sizes or repetitions',
          'Failure to control important variables',
          'Not addressing safety or ethical considerations'
        ]
      },
      'data-analysis': {
        title: 'Analyzing Your Results',
        content: 'Present your raw data clearly in tables, then process it appropriately with calculations, graphs, and statistical analysis. Your analysis should directly relate to your research question.',
        tips: [
          'Include all raw data in clearly labeled tables',
          'Show sample calculations for any processed data',
          'Create appropriate graphs with proper titles and labels',
          'Calculate means, standard deviations, and other relevant statistics',
          'Discuss uncertainties and their impact on results'
        ],
        commonMistakes: [
          'Raw data missing or poorly presented',
          'Inappropriate graph types or poor graph construction',
          'No statistical analysis or error consideration',
          'Conclusions not supported by the data'
        ]
      }
    },
    sampleQuestions: [
      'How does light intensity affect the rate of photosynthesis in Elodea canadensis?',
      'What is the effect of different pH levels on the activity of catalase enzyme in potato extract?',
      'How does caffeine concentration affect heart rate in Daphnia magna?',
      'What is the impact of salt concentration on germination rate in mung beans?',
      'How does temperature affect the rate of cellular respiration in germinating seeds?'
    ],
    timeline: [
      {
        phase: 'Topic Selection & Planning',
        duration: '2-3 weeks',
        activities: [
          'Research potential topics and feasibility',
          'Formulate research question with teacher guidance',
          'Plan methodology and identify required materials',
          'Submit research proposal for approval'
        ]
      },
      {
        phase: 'Background Research',
        duration: '1-2 weeks', 
        activities: [
          'Conduct literature review on chosen topic',
          'Understand biological theory behind investigation',
          'Refine research question if needed',
          'Compile bibliography of reliable sources'
        ]
      },
      {
        phase: 'Experimental Work',
        duration: '2-4 weeks',
        activities: [
          'Conduct pilot trials to test methodology',
          'Collect data according to planned schedule',
          'Record observations and measurements accurately',
          'Address any unexpected issues or modifications'
        ]
      },
      {
        phase: 'Analysis & Writing',
        duration: '2-3 weeks',
        activities: [
          'Process and analyze collected data',
          'Create graphs and perform statistical analysis',
          'Write up complete investigation report',
          'Review and revise before submission'
        ]
      }
    ]
  },
  'chemistry': {
    title: 'Chemistry IA',
    description: 'Individual scientific investigation of a chemical phenomenon',
    wordCount: '6-12 pages (2200 words maximum)',
    weighting: '20% of final grade',
    officialGuide: {
      title: 'Chemistry Guide 2025',
      organization: 'International Baccalaureate Organization',
      year: '2025',
      type: 'guide'
    },
    additionalReferences: [
      {
        title: 'Chemistry Assessment Procedures',
        organization: 'International Baccalaureate Organization',
        year: '2025',
        type: 'assessment'
      }
    ],
    assessmentCriteria: {
      'A': {
        name: 'Research Question',
        description: 'Clear, focused question suitable for investigation',
        marks: '2 marks',
        keyPoints: [
          'Question clearly stated and focused',
          'Variables identified and appropriate for investigation',
          'Relevant to chemistry at appropriate level',
          'Sufficient background context provided'
        ]
      },
      'B': {
        name: 'Background Information',
        description: 'Relevant chemical theory and context',
        marks: '2 marks',
        keyPoints: [
          'Chemical principles explained accurately',
          'Theory directly relevant to investigation',
          'Sources properly referenced',
          'Understanding demonstrated beyond basic level'
        ]
      },
      'C': {
        name: 'Methodology',
        description: 'Detailed experimental design and procedure',
        marks: '2 marks',
        keyPoints: [
          'Procedure detailed enough for replication',
          'Appropriate apparatus and chemicals specified',
          'Control variables identified and addressed',
          'Safety precautions and risk assessment included'
        ]
      },
      'D': {
        name: 'Analysis and Evaluation',
        description: 'Data processing and interpretation',
        marks: '2 marks',
        keyPoints: [
          'Raw data clearly presented in tables',
          'Appropriate calculations shown with examples',
          'Uncertainties calculated and propagated correctly',
          'Data presented in appropriate graphical form'
        ]
      },
      'E': {
        name: 'Evaluation',
        description: 'Critical assessment of investigation',
        marks: '2 marks',
        keyPoints: [
          'Systematic evaluation of errors and limitations',
          'Impact of limitations on results discussed',
          'Realistic improvements suggested with justification',
          'Further investigations proposed'
        ]
      }
    },
    sections: {
      'choosing-topic': {
        title: 'Selecting Your Chemistry Investigation',
        content: 'Choose a topic that involves quantitative analysis and can be investigated safely in a school laboratory. Consider chemical processes that can be measured and analyzed mathematically.',
        tips: [
          'Focus on quantitative investigations rather than qualitative observations',
          'Consider reaction rates, equilibrium studies, or analytical chemistry',
          'Ensure all chemicals and equipment are available in your school',
          'Think about environmental or everyday chemistry applications'
        ],
        commonMistakes: [
          'Choosing purely descriptive investigations',
          'Topics requiring dangerous or unavailable chemicals',
          'Investigations without clear quantitative measurements',
          'Topics too advanced for school-level analysis'
        ]
      },
      'experimental-design': {
        title: 'Planning Your Experiment',
        content: 'Design experiments that produce reliable, quantitative data. Plan for appropriate controls, sufficient trials, and proper measurement techniques.',
        tips: [
          'Plan multiple trials for statistical reliability',
          'Include appropriate blanks and controls',
          'Choose measurement techniques suited to your precision needs',
          'Calculate expected values to ensure measurable changes',
          'Plan data collection tables in advance'
        ],
        commonMistakes: [
          'Insufficient number of trials or data points',
          'Poor choice of measurement technique for required precision',
          'Failure to include proper controls',
          'Not considering the range of independent variable values'
        ]
      }
    },
    sampleQuestions: [
      'How does temperature affect the rate of reaction between sodium thiosulfate and hydrochloric acid?',
      'What is the effect of concentration on the EMF of electrochemical cells?',
      'How does pH affect the solubility of calcium hydroxide?',
      'What is the relationship between molecular structure and heat of combustion in alcohols?',
      'How does catalyst surface area affect the rate of hydrogen peroxide decomposition?'
    ],
    timeline: [
      {
        phase: 'Planning & Proposal',
        duration: '2-3 weeks',
        activities: [
          'Select feasible topic with quantitative focus',
          'Research background chemistry theory',
          'Design experimental procedure',
          'Complete safety and risk assessment'
        ]
      },
      {
        phase: 'Experimental Phase',
        duration: '3-4 weeks',
        activities: [
          'Conduct preliminary trials to test method',
          'Collect quantitative data systematically',
          'Record all observations and measurements',
          'Address any experimental complications'
        ]
      },
      {
        phase: 'Analysis & Reporting',
        duration: '2-3 weeks',
        activities: [
          'Process data with appropriate calculations',
          'Analyze uncertainties and errors',
          'Create professional scientific report',
          'Review and refine before submission'
        ]
      }
    ]
  },
  'business-management': {
    title: 'Business Management IA',
    description: 'Individual research project analyzing a real business issue through conceptual lens',
    wordCount: '2000 words maximum',
    weighting: '25% of final grade',
    officialGuide: {
      title: 'Business Management Guide 2024 UPDATED',
      organization: 'International Baccalaureate Organization',
      year: '2024',
      type: 'guide'
    },
    additionalReferences: [
      {
        title: 'Business Management Assessment Procedures',
        organization: 'International Baccalaureate Organization',
        year: '2024',
        type: 'assessment'
      },
      {
        title: 'Business Management Teacher Support Material',
        organization: 'International Baccalaureate Organization',
        year: '2024',
        type: 'guide'
      }
    ],
    assessmentCriteria: {
      'A': {
        name: 'Supporting Documents',
        description: 'Quality and relevance of supporting materials',
        marks: '4 marks',
        keyPoints: [
          'Documents are relevant and appropriate to research question',
          'Variety of sources used (primary and secondary)',
          'Documents are current and reliable',
          'Clear connection between documents and business issue'
        ]
      },
      'B': {
        name: 'Knowledge and Understanding of Tools, Theories and Concepts',
        description: 'Application of business management theory',
        marks: '4 marks',
        keyPoints: [
          'Business management tools and theories correctly identified',
          'Concepts accurately explained and applied',
          'Clear understanding demonstrated throughout',
          'Theory appropriately linked to business context'
        ]
      },
      'C': {
        name: 'Analysis and Evaluation',
        description: 'Critical examination of business issue',
        marks: '4 marks',
        keyPoints: [
          'Thorough analysis of business issue through chosen concept',
          'Multiple perspectives considered',
          'Evidence used effectively to support arguments',
          'Evaluation is balanced and well-reasoned'
        ]
      },
      'D': {
        name: 'Conclusion and Recommendations',
        description: 'Synthesis of findings with actionable recommendations',
        marks: '4 marks',
        keyPoints: [
          'Conclusions directly address the research question',
          'Recommendations are realistic and justified',
          'Stakeholder interests considered',
          'Clear link between analysis and recommendations'
        ]
      }
    },
    sections: {
      'concept-selection': {
        title: 'Choosing Your Conceptual Lens',
        content: 'Your IA must analyze a business issue through one of four concepts: Change, Creativity, Ethics, or Sustainability. According to the Business Management Guide 2024, these concepts are integrated into all units to ensure conceptual understanding throughout the course.',
        tips: [
          'Change: Analyze how organizations adapt to dynamic business environments (BM Guide 2024, p.12)',
          'Creativity: Examine innovation and creative problem-solving in business processes (BM Guide 2024, p.12)', 
          'Ethics: Investigate moral principles governing business behavior and stakeholder decisions (BM Guide 2024, p.12)',
          'Sustainability: Explore the "triple bottom line" - people, planet, and profit considerations (BM Guide 2024, p.12)'
        ],
        commonMistakes: [
          'Forcing a concept that doesn\'t naturally fit the business issue',
          'Superficial treatment of the chosen concept without deep theoretical understanding',
          'Failing to maintain conceptual focus throughout the analysis as required by assessment criteria',
          'Not understanding the interdisciplinary nature of business management concepts'
        ]
      },
      'business-selection': {
        title: 'Selecting Your Business Case',
        content: 'Choose a real organization facing a genuine business challenge. The Business Management Guide 2024 emphasizes using contemporary examples and case studies at various levels, from local to global contexts, to develop international-mindedness.',
        tips: [
          'Consider local businesses for easier access to primary research sources',
          'Look for recent changes, challenges, or developments reported in business media',
          'Ensure sufficient information is publicly available through company reports and reliable sources',
          'Choose businesses with clear stakeholder impacts to allow for comprehensive analysis (BM Guide 2024, p.24)',
          'Consider small to medium enterprises for focused analysis rather than complex multinationals'
        ],
        commonMistakes: [
          'Choosing businesses that are too large or complex to analyze effectively within word limits',
          'Selecting outdated or resolved business issues that lack contemporary relevance',
          'Insufficient access to relevant business information for thorough analysis',
          'Issues that don\'t allow for meaningful analysis through the chosen business management concept'
        ]
      },
      'research-methodology': {
        title: 'Conducting Your Research',
        content: 'Gather both primary and secondary sources to support your analysis. Use a mix of company documents, news articles, interviews, and academic sources.',
        tips: [
          'Primary sources: interviews, surveys, company visits, firsthand observations',
          'Secondary sources: news articles, company reports, academic articles, industry analyses',
          'Ensure sources are current, reliable, and relevant',
          'Maintain ethical standards in all research activities',
          'Keep detailed records of all sources for proper citation'
        ],
        commonMistakes: [
          'Relying too heavily on one type of source',
          'Using outdated or unreliable information',
          'Failing to verify information from multiple sources',
          'Not considering confidentiality and ethical issues in primary research'
        ]
      },
      'analysis-structure': {
        title: 'Structuring Your Analysis',
        content: 'Organize your IA with clear sections that build logically toward your conclusion. Maintain focus on your chosen concept throughout.',
        tips: [
          'Introduction: Present the business, issue, and research question',
          'Context: Provide background on the business and industry',
          'Analysis: Examine the issue through your chosen concept',
          'Evaluation: Assess different perspectives and stakeholder impacts',
          'Conclusion: Synthesize findings and provide recommendations'
        ],
        commonMistakes: [
          'Poor organization that doesn\'t follow logical progression',
          'Losing focus on the chosen concept',
          'Insufficient depth in analysis and evaluation sections',
          'Recommendations that don\'t flow from the analysis'
        ]
      }
    },
    sampleQuestions: [
      'How has Netflix adapted to changing consumer preferences in the streaming industry? (Change)',
      'How does Tesla\'s innovation strategy drive competitive advantage in the electric vehicle market? (Creativity)',
      'To what extent do Patagonia\'s ethical business practices contribute to brand loyalty? (Ethics)',
      'How effective are IKEA\'s sustainability initiatives in reducing environmental impact? (Sustainability)',
      'How has Zoom managed organizational change during rapid growth in the COVID-19 pandemic? (Change)'
    ],
    timeline: [
      {
        phase: 'Topic Selection & Planning',
        duration: '2-3 weeks',
        activities: [
          'Identify potential businesses and issues',
          'Choose conceptual lens for analysis',
          'Formulate research question',
          'Plan research methodology'
        ]
      },
      {
        phase: 'Research Phase',
        duration: '3-4 weeks',
        activities: [
          'Gather supporting documents and evidence',
          'Conduct primary research if applicable',
          'Organize and evaluate sources',
          'Begin preliminary analysis'
        ]
      },
      {
        phase: 'Writing & Analysis',
        duration: '3-4 weeks',
        activities: [
          'Draft complete IA with all sections',
          'Apply business tools and theories',
          'Develop analysis through conceptual lens',
          'Formulate evidence-based recommendations'
        ]
      }
    ]
  },
  'economics': {
    title: 'Economics IA',
    description: 'Analysis of real-world economic issues using economic theory',
    wordCount: '800 words maximum (3 portfolios)',
    weighting: '20% of final grade (SL), 20% of final grade (HL)',
    officialGuide: {
      title: 'Economics Guide 2022',
      organization: 'International Baccalaureate Organization',
      year: '2022',
      type: 'guide'
    },
    additionalReferences: [
      {
        title: 'Economics Assessment Procedures',
        organization: 'International Baccalaureate Organization',
        year: '2022', 
        type: 'assessment'
      }
    ],
    assessmentCriteria: {
      'A': {
        name: 'Supporting Documents',
        description: 'Quality and relevance of news articles',
        marks: '3 marks',
        keyPoints: [
          'Article is relevant and appropriate for economic analysis',
          'Article is recent and from reliable source',
          'Clear connection between article and economic concepts',
          'Article provides sufficient detail for analysis'
        ]
      },
      'B': {
        name: 'Application of Economic Theory',
        description: 'Use of economic concepts and theories',
        marks: '4 marks',
        keyPoints: [
          'Economic theory is correctly applied',
          'Key concepts are clearly explained',
          'Theory is relevant to the article content',
          'Appropriate economic terminology used throughout'
        ]
      },
      'C': {
        name: 'Analysis and Evaluation',
        description: 'Depth of economic analysis',
        marks: '4 marks',
        keyPoints: [
          'Analysis goes beyond simple description',
          'Multiple economic perspectives considered',
          'Cause and effect relationships explored',
          'Evaluation includes consideration of limitations and assumptions'
        ]
      },
      'D': {
        name: 'Synthesis and Evaluation',
        description: 'Coherent argument with supported conclusions',
        marks: '4 marks',
        keyPoints: [
          'Clear structure with logical flow of argument',
          'Conclusions are well-supported by analysis',
          'Economic implications clearly stated',
          'Alternative viewpoints acknowledged where appropriate'
        ]
      }
    },
    sections: {
      'article-selection': {
        title: 'Choosing Your News Articles',
        content: 'Select recent news articles that relate directly to economic concepts from your syllabus. Each article should provide sufficient content for in-depth economic analysis.',
        tips: [
          'Use reputable news sources (BBC, The Economist, Financial Times, etc.)',
          'Choose articles published within the last 12 months',
          'Ensure articles relate clearly to syllabus topics',
          'Avoid articles that are too short or lack economic substance',
          'Select articles covering different areas of economics'
        ],
        commonMistakes: [
          'Using articles that are too old or from unreliable sources',
          'Choosing articles with insufficient economic content',
          'Selecting articles that don\'t relate to syllabus concepts',
          'All three articles covering the same economic topic'
        ]
      },
      'theory-application': {
        title: 'Applying Economic Theory',
        content: 'Connect economic concepts from your syllabus to the real-world situation described in your article. Explain the theory clearly before applying it to the specific context.',
        tips: [
          'Start by explaining the relevant economic theory clearly',
          'Use appropriate economic terminology and definitions',
          'Draw clear connections between theory and article content',
          'Include relevant economic diagrams where appropriate',
          'Show understanding of economic relationships and mechanisms'
        ],
        commonMistakes: [
          'Assuming knowledge without explaining economic concepts',
          'Incorrectly applying economic theory',
          'Using inappropriate or inaccurate economic terminology',
          'Failing to make clear connections between theory and article'
        ]
      },
      'portfolio-structure': {
        title: 'Organizing Your Portfolio',
        content: 'Create three separate commentaries, each focusing on a different economic concept or area. Ensure each commentary follows a clear structure and stays within the word limit.',
        tips: [
          'Cover different areas: microeconomics, macroeconomics, and international/development',
          'Use consistent formatting and referencing throughout',
          'Include clear titles that indicate the economic focus',
          'Attach the original article to each commentary',
          'Number pages and include word counts'
        ],
        commonMistakes: [
          'All commentaries focusing on the same economic area',
          'Inconsistent formatting or referencing',
          'Exceeding word limits or not including word counts',
          'Poor organization that makes commentaries difficult to follow'
        ]
      }
    },
    sampleQuestions: [
      'How does a minimum wage increase affect employment in the fast food industry? (Microeconomics)',
      'What are the economic impacts of quantitative easing during economic recession? (Macroeconomics)', 
      'How do trade tariffs affect domestic and international markets? (International Economics)',
      'What factors contribute to income inequality in developing countries? (Development Economics)',
      'How do externalities affect market efficiency in environmental issues? (Microeconomics)'
    ],
    timeline: [
      {
        phase: 'Article Collection',
        duration: '1-2 weeks',
        activities: [
          'Identify suitable news articles for each topic area',
          'Ensure articles meet criteria and are recent',
          'Plan which economic concepts to apply to each article',
          'Begin preliminary reading and analysis'
        ]
      },
      {
        phase: 'Commentary Writing',
        duration: '4-6 weeks',
        activities: [
          'Write first commentary with theory application',
          'Create second commentary on different economic area',
          'Complete third commentary with evaluation focus',
          'Review and refine all three commentaries'
        ]
      },
      {
        phase: 'Portfolio Finalization',
        duration: '1 week',
        activities: [
          'Ensure consistent formatting and referencing',
          'Check word counts and page numbering',
          'Attach original articles properly',
          'Final proofreading and submission preparation'
        ]
      }
    ]
  },
  
  'psychology': {
    title: 'Psychology IA',
    description: 'Experimental investigation exploring a specific aspect of human behavior',
    wordCount: '1,800-2,200 words',
    weighting: '20% of final grade (SL) / 20% of final grade (HL)',
    officialGuide: {
      title: 'Psychology Guide 2019',
      organization: 'International Baccalaureate Organization',
      year: '2019',
      type: 'guide'
    },
    additionalReferences: [
      {
        title: 'Psychology Assessment Procedures',
        organization: 'International Baccalaureate Organization',
        year: '2019',
        type: 'assessment'
      }
    ],
    assessmentCriteria: {
      'A': {
        name: 'Introduction',
        description: 'Formulation of a focused research question with background research',
        marks: '3 marks',
        keyPoints: [
          'Research question is clearly focused and relevant to psychology',
          'Relevant psychological concepts, theories, and research are discussed',
          'Variables are clearly identified and operationalized',
          'Background research is appropriate and well-explained'
        ]
      },
      'B': {
        name: 'Exploration',
        description: 'Design, methodology, and ethical considerations',
        marks: '3 marks',
        keyPoints: [
          'Experimental design is appropriate and clearly described',
          'Sampling method and participants are clearly explained',
          'Ethical considerations are addressed comprehensively',
          'Method is replicable with sufficient detail provided'
        ]
      },
      'C': {
        name: 'Analysis',
        description: 'Analysis and interpretation of results',
        marks: '3 marks',
        keyPoints: [
          'Descriptive statistics are calculated and presented',
          'Appropriate graph or table is included',
          'Results are clearly described and interpreted',
          'Statistical significance is addressed where appropriate'
        ]
      },
      'D': {
        name: 'Evaluation',
        description: 'Critical evaluation of the investigation',
        marks: '3 marks',
        keyPoints: [
          'Strengths and limitations are clearly identified',
          'Modifications and extensions are suggested',
          'Implications of findings are discussed',
          'Evaluation is critical and well-reasoned'
        ]
      }
    },
    sections: {
      'overview': {
        title: 'Psychology IA Overview',
        content: 'The Psychology IA is an experimental investigation where you design and conduct your own study exploring a specific aspect of human behavior. You will formulate a research question, design an experiment, collect and analyze data, and evaluate your findings. The IA should demonstrate your understanding of psychological research methods and your ability to apply them independently.',
        tips: [
          'Choose a research question that genuinely interests you and is manageable',
          'Consider practical and ethical constraints when designing your study',
          'Ensure your study can be completed within the time and resources available',
          'Follow APA formatting for citations and references',
          'Start early to allow time for ethics approval and data collection'
        ],
        commonMistakes: [
          'Choosing an overly complex or unethical research question',
          'Not obtaining proper informed consent from participants',
          'Failing to operationalize variables clearly',
          'Not addressing ethical considerations comprehensively',
          'Collecting insufficient data for meaningful analysis'
        ]
      },
      'choosing_topic': {
        title: 'Choosing Your Research Topic',
        content: 'Your Psychology IA should investigate a research question related to one or more approaches or topics in psychology. The question should be focused, measurable, and ethically sound. Consider replicating or extending existing psychological research, or investigating a novel question that can be tested experimentally.',
        tips: [
          'Review classic psychological studies for inspiration',
          'Consider topics from cognitive, biological, or sociocultural approaches',
          'Ensure your study involves an independent and dependent variable',
          'Think about confounding variables you will need to control',
          'Discuss your ideas with your teacher before finalizing your question'
        ],
        commonMistakes: [
          'Choosing a purely observational or correlational study',
          'Selecting a topic that cannot be tested experimentally',
          'Not considering the ethical implications of your study',
          'Choosing a research question that is too broad or vague',
          'Attempting to study sensitive topics without proper safeguards'
        ]
      },
      'methodology': {
        title: 'Designing Your Experiment',
        content: 'Your methodology section should provide enough detail for another researcher to replicate your study. Include information about your participants, materials, procedure, and ethical considerations. Use appropriate psychological terminology and ensure your design allows you to test your hypothesis effectively.',
        tips: [
          'Use standardized materials and procedures where possible',
          'Clearly explain how you will control for confounding variables',
          'Include a detailed step-by-step procedure',
          'Address informed consent, confidentiality, and right to withdraw',
          'Consider using a pilot study to test your design'
        ],
        commonMistakes: [
          'Providing insufficient detail about the procedure',
          'Not explaining how participants were selected or assigned',
          'Failing to address all relevant ethical considerations',
          'Not controlling for important confounding variables',
          'Using biased or leading instructions to participants'
        ]
      },
      'analysis': {
        title: 'Analyzing Your Results',
        content: 'Present your results clearly using appropriate descriptive statistics and visual representations. Calculate measures of central tendency and dispersion, and create a graph or table that clearly shows your findings. Interpret your results in relation to your research question and hypothesis.',
        tips: [
          'Calculate mean, median, mode, and range for your data',
          'Create a clear bar graph, line graph, or scatterplot',
          'Use appropriate labeling and titles for visual representations',
          'Describe patterns and trends observed in the data',
          'Comment on whether results support your hypothesis'
        ],
        commonMistakes: [
          'Only presenting raw data without any analysis',
          'Creating graphs that are poorly labeled or difficult to interpret',
          'Not calculating basic descriptive statistics',
          'Failing to relate results back to the research question',
          'Over-interpreting results or making unsupported claims'
        ]
      },
      'evaluation': {
        title: 'Evaluating Your Investigation',
        content: 'Critically evaluate your study by identifying strengths, limitations, and modifications. Consider both methodological issues and broader implications of your findings. Suggest how your study could be improved or extended in future research.',
        tips: [
          'Identify at least two strengths of your study with explanations',
          'Discuss at least two limitations with specific examples',
          'Suggest concrete modifications that address identified limitations',
          'Consider implications for understanding human behavior',
          'Propose extensions that could build on your findings'
        ],
        commonMistakes: [
          'Only listing limitations without explaining their impact',
          'Suggesting unrealistic or vague modifications',
          'Not considering the broader implications of findings',
          'Focusing only on procedural issues without deeper analysis',
          'Failing to link evaluation back to the research question'
        ]
      }
    },
    sampleQuestions: [
      'Does background music affect memory recall in teenagers?',
      'Is there a difference in reaction time between males and females?',
      'Does caffeine consumption improve performance on cognitive tasks?',
      'Does priming with positive words increase helping behavior?',
      'Is there a relationship between stress levels and test performance?',
      'Does the presence of others affect conformity in decision-making?',
      'Does sleep deprivation affect short-term memory capacity?',
      'Is there a difference in attention span between different age groups?'
    ],
    timeline: [
      {
        phase: 'Planning and Ethics Approval',
        duration: '2-3 weeks',
        activities: [
          'Develop research question and hypothesis',
          'Design experimental procedure and materials',
          'Complete ethics approval process',
          'Conduct pilot study if needed'
        ]
      },
      {
        phase: 'Data Collection',
        duration: '2-3 weeks',
        activities: [
          'Recruit participants and schedule testing sessions',
          'Conduct experiment with all participants',
          'Record data systematically and accurately',
          'Debrief participants and answer questions'
        ]
      },
      {
        phase: 'Analysis and Writing',
        duration: '3-4 weeks',
        activities: [
          'Organize and analyze collected data',
          'Create graphs and calculate statistics',
          'Write all sections of the IA',
          'Ensure proper APA formatting and citations'
        ]
      },
      {
        phase: 'Revision and Submission',
        duration: '1-2 weeks',
        activities: [
          'Review against assessment criteria',
          'Make revisions based on feedback',
          'Check word count and formatting',
          'Final proofreading and submission'
        ]
      }
    ]
  },

  'computer_science': {
    title: 'Computer Science IA',
    description: 'Development of a solution to a computational problem for a specific client',
    wordCount: '2,000 words (SL) / 2,000 words (HL)',
    weighting: '30% of final grade',
    officialGuide: {
      title: 'Computer Science Guide 2014',
      organization: 'International Baccalaureate Organization',
      year: '2014',
      type: 'guide'
    },
    additionalReferences: [
      {
        title: 'Computer Science Assessment Procedures',
        organization: 'International Baccalaureate Organization',
        year: '2014',
        type: 'assessment'
      }
    ],
    assessmentCriteria: {
      'A': {
        name: 'Planning',
        description: 'Definition of the problem and justification for the proposed solution',
        marks: '3 marks',
        keyPoints: [
          'Problem is clearly identified with client consultation',
          'Success criteria are specific, measurable, and relevant',
          'Existing solutions are researched and evaluated',
          'Rationale for proposed solution is well-justified'
        ]
      },
      'B': {
        name: 'Solution Overview',
        description: 'Design and structure of the proposed solution',
        marks: '3 marks',
        keyPoints: [
          'Overall design is clearly described and appropriate',
          'System diagram or structure chart is included',
          'Data structures and algorithms are explained',
          'Design shows understanding of computational thinking'
        ]
      },
      'C': {
        name: 'Development',
        description: 'Technical implementation and coding',
        marks: '6 marks',
        keyPoints: [
          'Code is well-structured and efficient',
          'Appropriate programming techniques are used',
          'Code includes comments and follows conventions',
          'Evidence of iterative development is shown',
          'Complex algorithms are explained'
        ]
      },
      'D': {
        name: 'Functionality and Extensibility',
        description: 'Testing against success criteria and future development',
        marks: '4 marks',
        keyPoints: [
          'Solution meets all success criteria',
          'Testing is comprehensive and systematic',
          'Areas for improvement are identified',
          'Suggestions for extension are realistic'
        ]
      },
      'E': {
        name: 'Evaluation',
        description: 'Client feedback and recommendations',
        marks: '2 marks',
        keyPoints: [
          'Client feedback is obtained and documented',
          'Evaluation addresses success criteria',
          'Recommendations are specific and justified'
        ]
      }
    },
    sections: {
      'overview': {
        title: 'Computer Science IA Overview',
        content: 'The Computer Science IA requires you to develop a computational solution to a real-world problem for a specific client. You will identify a problem through consultation, design and implement a solution using appropriate programming techniques, test it against success criteria, and evaluate it with client feedback.',
        tips: [
          'Choose a client with a genuine problem that needs solving',
          'Ensure the problem is complex enough but achievable',
          'Document your client consultations thoroughly',
          'Use version control to track your development process',
          'Test your solution extensively before client evaluation'
        ],
        commonMistakes: [
          'Creating a solution without a real client or authentic problem',
          'Choosing a problem that is too simple or too complex',
          'Not consulting with the client throughout development',
          'Failing to test against all success criteria',
          'Not obtaining detailed client feedback for evaluation'
        ]
      },
      'choosing_topic': {
        title: 'Identifying Your Client and Problem',
        content: 'Your IA must address a real problem for a real client. The client can be an individual, organization, or specific user group. Through consultation, you will identify their needs, define the problem clearly, and establish success criteria that your solution must meet.',
        tips: [
          'Interview potential clients to understand their needs',
          'Choose a problem within your programming capabilities',
          'Ensure the problem requires computational thinking',
          'Define 3-5 specific, measurable success criteria',
          'Document all client meetings with notes or recordings'
        ],
        commonMistakes: [
          'Using a generic problem without a specific client',
          'Not consulting with the client enough',
          'Defining vague or unmeasurable success criteria',
          'Choosing a problem that cannot be solved computationally',
          'Not keeping records of client interactions'
        ]
      },
      'design': {
        title: 'Designing Your Solution',
        content: 'Design an appropriate solution structure before beginning implementation. Include system diagrams, flowcharts, or pseudocode to show how your solution will work. Explain your choice of data structures, algorithms, and programming approach.',
        tips: [
          'Create a clear system architecture diagram',
          'Use flowcharts for complex algorithms',
          'Justify your choice of programming language',
          'Plan your data structures carefully',
          'Consider user interface design from the start'
        ],
        commonMistakes: [
          'Starting to code without a clear design plan',
          'Not explaining design decisions',
          'Creating overly complex designs',
          'Not considering the client\'s technical capabilities',
          'Failing to show how design meets success criteria'
        ]
      },
      'development': {
        title: 'Developing Your Solution',
        content: 'Implement your solution using appropriate programming techniques. Write clean, well-commented code that follows good programming practices. Show evidence of iterative development and testing throughout the process.',
        tips: [
          'Use meaningful variable and function names',
          'Comment your code appropriately',
          'Follow consistent coding conventions',
          'Test frequently during development',
          'Keep backup versions of your work'
        ],
        commonMistakes: [
          'Writing code without comments or documentation',
          'Not following any coding conventions',
          'Implementing everything at once without testing',
          'Using overly complex code when simpler solutions exist',
          'Not showing evidence of the development process'
        ]
      },
      'testing': {
        title: 'Testing and Evaluation',
        content: 'Test your solution systematically against all success criteria. Document your testing process with test cases, expected results, and actual outcomes. Obtain feedback from your client and evaluate how well your solution meets their needs.',
        tips: [
          'Create a comprehensive testing table',
          'Test normal, boundary, and error cases',
          'Include screenshots of testing',
          'Get detailed client feedback on each success criterion',
          'Be honest about limitations and areas for improvement'
        ],
        commonMistakes: [
          'Only testing that everything works, not edge cases',
          'Not documenting the testing process',
          'Not testing against all success criteria',
          'Providing vague client feedback',
          'Not suggesting realistic improvements'
        ]
      }
    },
    sampleQuestions: [
      'A student database management system for a school club',
      'An inventory tracking system for a small business',
      'A quiz game for primary school students learning math',
      'A personal finance tracker for a family member',
      'A scheduling system for a sports team or club',
      'A recipe management application for a home cook',
      'A study planner and grade calculator for students',
      'A booking system for a music teacher or tutor'
    ],
    timeline: [
      {
        phase: 'Planning and Analysis',
        duration: '2-3 weeks',
        activities: [
          'Identify client and conduct initial consultation',
          'Define problem and establish success criteria',
          'Research existing solutions',
          'Plan overall approach and design'
        ]
      },
      {
        phase: 'Design and Prototyping',
        duration: '2-3 weeks',
        activities: [
          'Create system diagrams and flowcharts',
          'Design user interface mockups',
          'Plan data structures and algorithms',
          'Get client feedback on design'
        ]
      },
      {
        phase: 'Development and Testing',
        duration: '4-6 weeks',
        activities: [
          'Implement solution iteratively',
          'Test each component as developed',
          'Refine based on initial testing',
          'Document development process'
        ]
      },
      {
        phase: 'Evaluation and Documentation',
        duration: '2-3 weeks',
        activities: [
          'Conduct comprehensive testing',
          'Obtain client feedback',
          'Write all IA sections',
          'Final review and submission'
        ]
      }
    ]
  },
  
  'environmental_systems': {
    title: 'Environmental Systems and Societies (ESS)',
    description: 'The ESS IA is a research investigation that addresses a specific environmental issue or question, combining both natural and human sciences perspectives.',
    wordCount: '1,500-2,250 words',
    weighting: '25% of final grade',
    citations: [
      {
        format: 'IB Style',
        example: 'Smith, J. 2020. "Environmental Impact of Urban Development". Environmental Journal. 15(3). pp. 45-67.'
      },
      {
        format: 'Harvard Style',
        example: 'Smith, J. (2020) Environmental Impact of Urban Development, Environmental Journal, 15(3), pp. 45-67.'
      }
    ],
    assessmentCriteria: [
      {
        criterion: 'A',
        name: 'Research Question',
        maxMarks: 2,
        description: 'Formulation of a focused research question that links environmental systems with societal implications',
        keyPoints: [
          'Must be clearly stated and focused',
          'Should integrate both systems and societies perspectives',
          'Must be researchable through fieldwork or data collection',
          'Should demonstrate environmental significance'
        ]
      },
      {
        criterion: 'B',
        name: 'Introduction',
        maxMarks: 2,
        description: 'Background information and context for the investigation',
        keyPoints: [
          'Explain the environmental and societal context',
          'Justify why the topic is significant',
          'Include relevant background research',
          'Link to ESS concepts and systems thinking'
        ]
      },
      {
        criterion: 'C',
        name: 'Methodology',
        maxMarks: 4,
        description: 'Design and execution of appropriate investigation methods',
        keyPoints: [
          'Describe data collection methods clearly',
          'Justify choice of methods',
          'Address sampling strategy and sample size',
          'Consider environmental and ethical implications',
          'Include sufficient detail for replication'
        ]
      },
      {
        criterion: 'D',
        name: 'Results, Analysis and Discussion',
        maxMarks: 6,
        description: 'Presentation and interpretation of data with connection to environmental concepts',
        keyPoints: [
          'Present data clearly with appropriate tables/graphs',
          'Process data appropriately',
          'Analyze patterns and trends',
          'Link findings to ESS concepts and systems',
          'Discuss both environmental and societal implications',
          'Consider uncertainty and limitations'
        ]
      },
      {
        criterion: 'E',
        name: 'Conclusion and Evaluation',
        maxMarks: 3,
        description: 'Clear conclusion addressing the research question with evaluation of methods',
        keyPoints: [
          'Answer the research question explicitly',
          'Justify conclusion based on data',
          'Evaluate strengths and weaknesses of methodology',
          'Suggest realistic improvements',
          'Consider broader environmental implications'
        ]
      }
    ],
    sections: {
      overview: {
        title: 'Understanding the ESS IA',
        content: 'The ESS Internal Assessment requires you to conduct an investigation that addresses both environmental systems and societal perspectives. This interdisciplinary approach is unique to ESS and should be evident throughout your work. Your investigation should involve primary data collection through fieldwork, surveys, or measurements, and demonstrate systems thinking by considering inputs, processes, outputs, and feedback loops.',
        tips: [
          'Choose a topic that genuinely interests you and is locally accessible',
          'Ensure your investigation addresses both environmental and societal aspects',
          'Plan your fieldwork carefully, considering seasonal factors',
          'Keep detailed records of your data collection process',
          'Use systems diagrams to illustrate connections'
        ],
        commonMistakes: [
          'Focusing only on environmental aspects without societal implications',
          'Choosing a topic too broad to investigate effectively',
          'Not collecting enough primary data',
          'Ignoring systems thinking throughout the analysis',
          'Using purely secondary data without fieldwork'
        ]
      },
      choosing_topic: {
        title: 'Choosing Your Research Question',
        content: 'Your research question should be specific, focused, and researchable within your local environment. It must integrate both systems and societies perspectives of ESS. Good questions often examine human impacts on ecosystems, conservation efforts, sustainability initiatives, or environmental decision-making processes. Consider what data you can realistically collect and what environmental systems are accessible to you.',
        tips: [
          'Start with a broad topic then narrow it down',
          'Consider what you can actually measure or observe',
          'Think about both ecological and human dimensions',
          'Ensure the question can be answered with primary data',
          'Check that you can access the study site safely and ethically'
        ],
        commonMistakes: [
          'Questions too broad: "How does pollution affect ecosystems?"',
          'Questions requiring only secondary research',
          'Questions without clear societal or environmental link',
          'Questions impossible to answer with available resources',
          'Questions focusing on only one perspective (systems OR societies)'
        ]
      },
      methodology: {
        title: 'Designing Your Investigation',
        content: 'Your methodology should detail exactly how you will collect your data, including specific techniques, equipment, sampling strategies, and procedures. For ESS, this often involves fieldwork to measure environmental parameters or surveys to assess societal perspectives. Be sure to justify your choices and explain how your methods will help answer your research question. Include considerations of sampling size, frequency, and reliability.',
        tips: [
          'Use appropriate sampling techniques (random, stratified, systematic)',
          'Collect sufficient data for statistical analysis',
          'Record environmental conditions during data collection',
          'Consider controls or comparison sites',
          'Use standardized measurement protocols where possible',
          'Include both quantitative and qualitative data if appropriate'
        ],
        commonMistakes: [
          'Not explaining why methods were chosen',
          'Insufficient sample size for meaningful conclusions',
          'Ignoring variables that might affect results',
          'Not considering ethical or environmental impacts of fieldwork',
          'Vague descriptions that don\'t allow replication'
        ]
      },
      analysis: {
        title: 'Analyzing Your Data',
        content: 'Present your results clearly using appropriate tables, graphs, and statistical analysis. Your analysis should go beyond simply describing what you found—explain patterns, compare to expected results, and link findings to ESS concepts like sustainability, carrying capacity, biodiversity, or ecosystem services. Use systems diagrams to show relationships and feedback loops. Discuss both the environmental and societal implications of your findings.',
        tips: [
          'Choose graph types appropriate for your data',
          'Calculate relevant statistics (means, percentages, correlations)',
          'Compare your results to published values or studies',
          'Use ESS terminology and concepts explicitly',
          'Create systems diagrams to show relationships',
          'Discuss uncertainties and their sources'
        ],
        commonMistakes: [
          'Just presenting data without analyzing it',
          'Not linking results to ESS concepts',
          'Ignoring anomalous data without explanation',
          'Using inappropriate graphs or tables',
          'Not discussing the limitations of the data',
          'Failing to integrate both systems and societies perspectives'
        ]
      },
      evaluation: {
        title: 'Conclusion and Evaluation',
        content: 'Your conclusion should directly answer your research question, summarizing your key findings and their significance. Be clear about what your data supports and what remains uncertain. In your evaluation, critically assess your methodology—what worked well and what could be improved? Consider how different methods or larger sample sizes might affect your conclusions. Suggest specific, realistic improvements rather than vague statements.',
        tips: [
          'State your answer to the research question clearly',
          'Relate findings to broader environmental issues',
          'Be specific about what would improve your investigation',
          'Acknowledge limitations honestly',
          'Consider the environmental and societal significance of your findings'
        ],
        commonMistakes: [
          'Not actually answering the research question',
          'Vague suggestions like "collect more data"',
          'Ignoring significant limitations',
          'Making claims not supported by data',
          'Not reflecting on the investigation process'
        ]
      }
    },
    sampleQuestions: [
      'How does urbanization affect soil quality in local parks compared to rural areas?',
      'What is the impact of a local recycling program on household waste production?',
      'How does distance from the road affect the biodiversity of plant species?',
      'What are community perceptions of a proposed wind farm development?',
      'How does the presence of invasive species affect native plant diversity in wetlands?',
      'What is the effectiveness of a local stream restoration project on water quality?',
      'How do different farming practices affect soil erosion rates in agricultural areas?',
      'What factors influence household energy consumption in the local community?'
    ],
    timeline: [
      {
        phase: 'Planning',
        duration: '2-3 weeks',
        activities: [
          'Develop and refine research question',
          'Research background information',
          'Design methodology and sampling strategy',
          'Conduct risk assessment for fieldwork'
        ]
      },
      {
        phase: 'Data Collection',
        duration: '3-4 weeks',
        activities: [
          'Conduct fieldwork and measurements',
          'Collect survey data if applicable',
          'Record observations and environmental conditions',
          'Organize raw data'
        ]
      },
      {
        phase: 'Analysis',
        duration: '2-3 weeks',
        activities: [
          'Process and organize data',
          'Create graphs and statistical analyses',
          'Develop systems diagrams',
          'Identify patterns and relationships'
        ]
      },
      {
        phase: 'Writing and Evaluation',
        duration: '2-3 weeks',
        activities: [
          'Write all sections of the IA',
          'Create bibliography',
          'Review against criteria',
          'Final editing and submission'
        ]
      }
    ]
  },

  'global_politics': {
    title: 'Global Politics',
    description: 'The Global Politics IA is an analytical paper examining a political issue through engagement with research and different perspectives.',
    wordCount: '2,000 words',
    weighting: '20% of final grade',
    citations: [
      {
        format: 'IB Style',
        example: 'Jones, S. 2021. "Power Dynamics in International Relations". Political Review. 12(4). pp. 78-95.'
      },
      {
        format: 'Harvard Style',
        example: 'Jones, S. (2021) Power Dynamics in International Relations, Political Review, 12(4), pp. 78-95.'
      }
    ],
    assessmentCriteria: [
      {
        criterion: 'A',
        name: 'Identification and Focus',
        maxMarks: 4,
        description: 'Clear identification of a relevant political issue with focused research question',
        keyPoints: [
          'Clearly identified political issue',
          'Focused research question',
          'Relevant to global politics concepts',
          'Appropriate scope for investigation'
        ]
      },
      {
        criterion: 'B',
        name: 'Knowledge and Understanding',
        maxMarks: 6,
        description: 'Demonstration of knowledge and understanding of political concepts and theories',
        keyPoints: [
          'Use of relevant political concepts',
          'Application of theories appropriately',
          'Understanding of different perspectives',
          'Engagement with course content',
          'Use of appropriate political terminology'
        ]
      },
      {
        criterion: 'C',
        name: 'Application and Analysis',
        maxMarks: 6,
        description: 'Analysis of the political issue using appropriate sources and perspectives',
        keyPoints: [
          'Analysis of different sources',
          'Evaluation of different perspectives',
          'Critical engagement with evidence',
          'Consideration of multiple viewpoints',
          'Links between theory and practice'
        ]
      },
      {
        criterion: 'D',
        name: 'Synthesis and Evaluation',
        maxMarks: 6,
        description: 'Synthesis of analysis into a coherent argument with supported conclusions',
        keyPoints: [
          'Coherent line of reasoning',
          'Balanced evaluation of perspectives',
          'Well-supported conclusions',
          'Recognition of complexity',
          'Implications considered'
        ]
      },
      {
        criterion: 'E',
        name: 'Presentation and Structure',
        maxMarks: 3,
        description: 'Clear organization and appropriate academic conventions',
        keyPoints: [
          'Logical structure',
          'Clear introduction and conclusion',
          'Appropriate citations',
          'Professional presentation'
        ]
      }
    ],
    sections: {
      overview: {
        title: 'Understanding the Global Politics IA',
        content: 'The Global Politics Internal Assessment requires you to engage with a contemporary political issue through research and analysis. Unlike other subjects, this IA is more essay-based, focusing on your ability to analyze different perspectives, apply political concepts and theories, and construct a reasoned argument. You will need to demonstrate engagement with sources, critical thinking, and an understanding of the complexity of political issues.',
        tips: [
          'Choose an issue that genuinely interests you',
          'Ensure your issue has multiple perspectives to analyze',
          'Keep your research question focused and specific',
          'Engage with diverse sources including different viewpoints',
          'Apply concepts from the global politics course explicitly'
        ],
        commonMistakes: [
          'Choosing an issue too broad to analyze in depth',
          'Taking a purely descriptive approach without analysis',
          'Only presenting one perspective on the issue',
          'Not applying political concepts and theories',
          'Writing a general essay rather than focused analysis'
        ]
      },
      choosing_topic: {
        title: 'Choosing Your Political Issue',
        content: 'Select a contemporary political issue that is significant, has multiple dimensions, and allows for analysis of different perspectives. The issue should be suitable for applying political concepts like power, sovereignty, legitimacy, rights, justice, or peace and conflict. Avoid issues that are too controversial to analyze objectively, or so recent that there is insufficient analysis available. Your research question should guide a focused investigation rather than a general overview.',
        tips: [
          'Look for issues with clear political dimensions',
          'Consider issues related to course themes (power, sovereignty, etc.)',
          'Ensure sufficient sources are available in languages you can access',
          'Choose issues where multiple perspectives exist',
          'Frame your research question to require analysis, not just description'
        ],
        commonMistakes: [
          'Questions that are too broad: "How does power work in international relations?"',
          'Questions with only one obvious answer',
          'Issues that are purely historical without contemporary relevance',
          'Topics that are too controversial to analyze objectively',
          'Questions that don\'t connect to global politics concepts'
        ]
      },
      methodology: {
        title: 'Research and Source Selection',
        content: 'Your investigation requires engagement with diverse sources representing different perspectives on your political issue. These might include academic articles, policy documents, news analysis, think tank reports, and primary sources. Critically evaluate your sources—consider their origins, potential biases, and perspectives. You should demonstrate that you have researched the issue thoroughly and engaged with sources that offer different viewpoints.',
        tips: [
          'Use a variety of source types',
          'Include sources from different political perspectives',
          'Evaluate the credibility and bias of each source',
          'Look for academic analyses as well as primary sources',
          'Take detailed notes with proper citations',
          'Organize sources by perspective or theme'
        ],
        commonMistakes: [
          'Relying only on news articles without deeper analysis',
          'Using sources that all present the same perspective',
          'Not critically evaluating source credibility',
          'Including sources without proper citation',
          'Using too many secondary summaries instead of primary analysis'
        ]
      },
      analysis: {
        title: 'Analysis and Application',
        content: 'This is the core of your IA. Analyze your political issue by examining different perspectives, applying relevant political concepts and theories, and evaluating evidence critically. Don\'t just describe what different sources say—analyze why they take these positions, what assumptions underpin their arguments, and how power, interests, or ideology shape their perspectives. Make explicit connections to concepts from the course such as power, legitimacy, sovereignty, or global governance.',
        tips: [
          'Apply specific political concepts and theories',
          'Analyze the reasons behind different perspectives',
          'Consider how power relations affect the issue',
          'Evaluate the strengths and weaknesses of different arguments',
          'Use evidence to support your analysis',
          'Show complexity—avoid oversimplification'
        ],
        commonMistakes: [
          'Simply describing different views without analysis',
          'Not applying political concepts explicitly',
          'Taking sides without balanced evaluation',
          'Ignoring power dynamics or structural factors',
          'Not connecting analysis to theoretical frameworks',
          'Making assertions without evidence'
        ]
      },
      evaluation: {
        title: 'Synthesis and Conclusion',
        content: 'Your conclusion should synthesize your analysis into a coherent argument that addresses your research question. Rather than simply summarizing, evaluate the different perspectives you\'ve analyzed and present a reasoned position. Acknowledge the complexity of the issue and recognize that political questions often don\'t have simple answers. Consider the implications of your analysis for understanding global politics more broadly.',
        tips: [
          'Answer your research question clearly',
          'Show how different perspectives relate to each other',
          'Present a balanced, nuanced conclusion',
          'Acknowledge limitations and complexity',
          'Connect back to broader political concepts',
          'Consider implications for global politics'
        ],
        commonMistakes: [
          'Just summarizing without synthesizing',
          'Presenting an oversimplified conclusion',
          'Not acknowledging alternative perspectives in the conclusion',
          'Failing to connect back to the research question',
          'Not demonstrating personal engagement with the issue'
        ]
      }
    },
    sampleQuestions: [
      'To what extent has the United Nations been effective in preventing armed conflict?',
      'How do different perspectives on sovereignty shape debates about humanitarian intervention?',
      'To what extent has social media empowered or constrained political participation?',
      'How effective are international sanctions as a tool of foreign policy?',
      'To what extent do international institutions constrain state power?',
      'How have different actors responded to climate change as a security threat?',
      'To what extent has globalization affected state sovereignty?',
      'How do different concepts of justice shape responses to refugee crises?'
    ],
    timeline: [
      {
        phase: 'Topic Selection and Planning',
        duration: '1-2 weeks',
        activities: [
          'Identify political issue of interest',
          'Develop focused research question',
          'Conduct preliminary research',
          'Create research plan'
        ]
      },
      {
        phase: 'Research and Source Gathering',
        duration: '3-4 weeks',
        activities: [
          'Collect diverse sources',
          'Take detailed notes',
          'Identify different perspectives',
          'Evaluate source credibility'
        ]
      },
      {
        phase: 'Analysis and Writing',
        duration: '3-4 weeks',
        activities: [
          'Analyze sources and perspectives',
          'Apply political concepts and theories',
          'Develop argument structure',
          'Write first draft'
        ]
      },
      {
        phase: 'Revision and Completion',
        duration: '2 weeks',
        activities: [
          'Review against criteria',
          'Refine analysis and argument',
          'Check citations and formatting',
          'Final editing and submission'
        ]
      }
    ]
  },

  'film': {
    title: 'Film',
    description: 'The Film IA is a comparative study examining two films in relation to the course and a chosen area of film focus.',
    wordCount: '1,750-2,000 words',
    weighting: '30% of final grade',
    citations: [
      {
        format: 'Film Citation',
        example: 'Spielberg, S. (dir.) 1993. Schindler\'s List. Universal Pictures.'
      },
      {
        format: 'Book Citation',
        example: 'Bordwell, D. and Thompson, K. (2017) Film Art: An Introduction. 11th ed. New York: McGraw-Hill.'
      }
    ],
    assessmentCriteria: [
      {
        criterion: 'A',
        name: 'Film Focus and Contextual Knowledge',
        maxMarks: 5,
        description: 'Demonstration of knowledge and understanding of film focus and cultural context',
        keyPoints: [
          'Clear identification of film focus area',
          'Accurate contextual information about films',
          'Understanding of cultural and historical contexts',
          'Relevant background research'
        ]
      },
      {
        criterion: 'B',
        name: 'Comparative Analysis',
        maxMarks: 10,
        description: 'Analysis of similarities and differences between the two films',
        keyPoints: [
          'Clear comparison structure',
          'Analysis of specific film elements',
          'Discussion of similarities and differences',
          'Use of film terminology',
          'Connection to film focus area',
          'Evidence from the films'
        ]
      },
      {
        criterion: 'C',
        name: 'Evaluation and Conclusion',
        maxMarks: 5,
        description: 'Evaluation of significance and effectiveness with supported conclusion',
        keyPoints: [
          'Evaluation of filmmaking choices',
          'Assessment of effectiveness',
          'Supported conclusion',
          'Demonstration of critical thinking'
        ]
      },
      {
        criterion: 'D',
        name: 'Organization and Presentation',
        maxMarks: 5,
        description: 'Structure, clarity, and academic presentation',
        keyPoints: [
          'Clear structure with introduction and conclusion',
          'Logical flow of ideas',
          'Appropriate academic tone',
          'Correct citations and bibliography',
          'Proper formatting'
        ]
      }
    ],
    sections: {
      overview: {
        title: 'Understanding the Film IA',
        content: 'The Film Internal Assessment requires you to write a comparative study examining two films. You will select a film focus area (such as cinematic styles, film theory, creative processes, or cultural contexts) and analyze how this focus manifests in your chosen films. Your analysis should use specific film terminology, cite particular scenes and techniques, and demonstrate understanding of filmmaking choices and their effects.',
        tips: [
          'Choose films you genuinely want to study in depth',
          'Select films that offer rich material for comparison',
          'Use specific film terminology throughout',
          'Support all claims with evidence from the films',
          'Watch your chosen films multiple times, taking notes'
        ],
        commonMistakes: [
          'Choosing films that are too similar to compare meaningfully',
          'Writing plot summaries instead of analysis',
          'Not using appropriate film terminology',
          'Making general statements without specific examples',
          'Ignoring the film focus area'
        ]
      },
      choosing_topic: {
        title: 'Choosing Your Films and Focus',
        content: 'Select two films that allow for meaningful comparison within your chosen film focus area. The films might be from different time periods, cultures, or genres, or they might share similarities that make comparison revealing. Your film focus area (such as documentary cinema, national cinema, experimental film, auteur study, etc.) should provide a clear lens for your comparison. Ensure both films offer sufficient depth for analysis.',
        tips: [
          'Choose a specific film focus area from the course',
          'Select films with clear points of comparison',
          'Ensure you can access both films for repeated viewing',
          'Consider films that you can analyze in depth',
          'Check that both films connect meaningfully to your focus area'
        ],
        commonMistakes: [
          'Choosing films randomly without a clear comparative angle',
          'Selecting films that are too obscure to find good sources about',
          'Picking a film focus area too broad to address adequately',
          'Choosing films you haven\'t studied in the course',
          'Not considering availability for repeated viewing and analysis'
        ]
      },
      methodology: {
        title: 'Research and Preparation',
        content: 'Watch both films multiple times, taking detailed notes on cinematography, mise-en-scène, editing, sound, narrative structure, and other relevant elements. Research the cultural and historical contexts of both films, the filmmakers\' backgrounds and intentions, and critical reception. Identify specific scenes that exemplify the aspects you want to compare. Create a framework for your comparison that relates clearly to your film focus area.',
        tips: [
          'Take time-stamped notes of specific scenes',
          'Screenshot or note key frames for reference',
          'Research director interviews and production information',
          'Read film criticism and academic analysis',
          'Create a comparison matrix of key elements',
          'Identify 3-5 main points of comparison'
        ],
        commonMistakes: [
          'Not watching the films enough times',
          'Relying on memory instead of specific evidence',
          'Not researching contextual information',
          'Trying to compare too many elements superficially',
          'Not preparing specific examples before writing'
        ]
      },
      analysis: {
        title: 'Comparative Analysis',
        content: 'This is the core of your IA. Analyze both films in relation to your focus area, examining both similarities and differences. Use specific film terminology to discuss techniques like camera angles, lighting, editing patterns, sound design, or narrative structure. Reference particular scenes with timestamps, and explain how the filmmakers\' choices create meaning or effect. Connect your analysis to your film focus area throughout, showing how each film exemplifies or challenges aspects of that focus.',
        tips: [
          'Structure comparison around key themes or techniques',
          'Use specific film terminology accurately',
          'Cite particular scenes with timestamps',
          'Explain the effect of filmmaking choices',
          'Balance discussion of both films',
          'Connect analysis back to film focus area',
          'Use "compare" and "contrast" explicitly'
        ],
        commonMistakes: [
          'Discussing each film separately without comparing',
          'Using vague or imprecise language',
          'Making claims without specific evidence',
          'Not explaining how techniques create meaning',
          'Losing connection to the film focus area',
          'Letting one film dominate the discussion'
        ]
      },
      evaluation: {
        title: 'Evaluation and Conclusion',
        content: 'Evaluate the significance and effectiveness of the filmmaking choices you\'ve analyzed. How successfully do the films achieve their purposes? What makes their approaches to your focus area significant? Your conclusion should synthesize your comparative analysis, highlighting the most important insights from your study. Avoid simply summarizing—instead, present evaluative conclusions about the films\' achievements and significance within your chosen focus area.',
        tips: [
          'Make evaluative judgments about effectiveness',
          'Assess the significance of your findings',
          'Connect to broader film contexts or movements',
          'Show critical thinking beyond description',
          'End with insight, not summary'
        ],
        commonMistakes: [
          'Just summarizing what you\'ve already said',
          'Not making evaluative judgments',
          'Introducing new analysis in the conclusion',
          'Being too subjective without supporting reasoning',
          'Not demonstrating critical engagement'
        ]
      }
    },
    sampleQuestions: [
      'How do Citizen Kane and The Grand Budapest Hotel use cinematography to create distinct visual styles?',
      'Compare the representation of historical events in Schindler\'s List and Life is Beautiful',
      'How do Parasite and Get Out use genre conventions to address social class?',
      'Compare the auteur signatures of Wes Anderson and Tim Burton in two of their films',
      'How do two documentary films use different approaches to present their subjects?',
      'Compare the use of sound and music in two films from different cultural contexts',
      'How do two films from different national cinemas represent cultural identity?',
      'Compare experimental narrative structures in two avant-garde films'
    ],
    timeline: [
      {
        phase: 'Selection and Initial Viewing',
        duration: '1-2 weeks',
        activities: [
          'Choose film focus area',
          'Select two films for comparison',
          'Watch both films initially',
          'Begin background research'
        ]
      },
      {
        phase: 'Research and Analysis',
        duration: '3-4 weeks',
        activities: [
          'Watch films multiple times with notes',
          'Research contexts and criticism',
          'Identify specific comparison points',
          'Develop comparative framework'
        ]
      },
      {
        phase: 'Writing',
        duration: '2-3 weeks',
        activities: [
          'Write comparative analysis',
          'Include specific evidence and terminology',
          'Develop evaluation and conclusion',
          'Create bibliography'
        ]
      },
      {
        phase: 'Revision',
        duration: '1-2 weeks',
        activities: [
          'Review against criteria',
          'Check terminology and citations',
          'Refine analysis and arguments',
          'Final editing and submission'
        ]
      }
    ]
  },

  'dance': {
    title: 'Dance',
    description: 'The Dance IA requires analysis of dance works through performance, choreographic, and cultural lenses.',
    wordCount: '1,500 words',
    weighting: '30% of final grade',
    citations: [
      {
        format: 'Dance Work Citation',
        example: 'Cunningham, M. (chor.) 1968. RainForest. Merce Cunningham Dance Company.'
      },
      {
        format: 'Book Citation',
        example: 'Preston-Dunlop, V. (1998) Looking at Dances: A Choreological Perspective on Choreography. London: Verve Publishing.'
      }
    ],
    assessmentCriteria: [
      {
        criterion: 'A',
        name: 'Knowledge and Understanding',
        maxMarks: 6,
        description: 'Understanding of dance works and contexts',
        keyPoints: [
          'Accurate description of dance works',
          'Understanding of choreographic intent',
          'Knowledge of cultural and historical contexts',
          'Use of appropriate dance terminology'
        ]
      },
      {
        criterion: 'B',
        name: 'Analysis and Evaluation',
        maxMarks: 12,
        description: 'Critical analysis of dance elements and effectiveness',
        keyPoints: [
          'Detailed analysis of movement vocabulary',
          'Examination of choreographic devices',
          'Evaluation of performance quality',
          'Assessment of artistic effectiveness',
          'Critical thinking demonstrated'
        ]
      },
      {
        criterion: 'C',
        name: 'Organization and Presentation',
        maxMarks: 6,
        description: 'Structure, clarity, and academic conventions',
        keyPoints: [
          'Clear structure and logical flow',
          'Appropriate academic tone',
          'Correct citations and bibliography',
          'Proper formatting'
        ]
      }
    ],
    sections: {
      overview: {
        title: 'Understanding the Dance IA',
        content: 'The Dance IA requires you to analyze dance works through detailed observation and critical evaluation. You will examine choreographic intent, movement vocabulary, performance quality, and cultural contexts. Your analysis should demonstrate understanding of dance elements (body, action, space, time, dynamics, relationships) and how they create meaning.',
        tips: [
          'Watch performances multiple times, taking detailed notes',
          'Use specific dance terminology throughout',
          'Consider choreographic intent and artistic choices',
          'Analyze both technical and expressive elements',
          'Support all claims with specific evidence from the work'
        ],
        commonMistakes: [
          'Providing only surface-level description without analysis',
          'Not using appropriate dance terminology',
          'Ignoring cultural or historical contexts',
          'Making subjective judgments without supporting evidence',
          'Focusing only on technical aspects without artistic interpretation'
        ]
      },
      choosing_topic: {
        title: 'Selecting Your Dance Works',
        content: 'Choose dance works that allow for meaningful analysis and offer rich material for examination. Consider works with clear choreographic intent, diverse movement vocabularies, and significant cultural or historical contexts. You may analyze professional works, student choreography, or your own choreographic process.',
        tips: [
          'Select works you can view multiple times',
          'Choose works with clear artistic intent',
          'Consider diverse dance styles and cultures',
          'Ensure sufficient complexity for in-depth analysis',
          'Access to choreographer information if possible'
        ],
        commonMistakes: [
          'Choosing works too simple for meaningful analysis',
          'Selecting works not accessible for repeated viewing',
          'Picking works without sufficient contextual information',
          'Analyzing only personal preferences without critical distance'
        ]
      },
      methodology: {
        title: 'Research and Analysis Process',
        content: 'Your analysis should be based on careful observation of the dance work(s), supplemented by research into choreographic intent, cultural contexts, and critical reception. Take detailed notes on movement vocabulary, spatial patterns, dynamics, and relationships. Research the choreographer\'s background, artistic influences, and the work\'s place in dance history.',
        tips: [
          'Create detailed observation notes with timestamps',
          'Sketch spatial patterns and formations',
          'Note use of choreographic devices (repetition, contrast, etc.)',
          'Research choreographer interviews and program notes',
          'Read critical reviews and scholarly analysis',
          'Analyze video recordings frame by frame if available'
        ],
        commonMistakes: [
          'Relying on memory rather than detailed notes',
          'Not researching contextual information',
          'Ignoring choreographic devices and structure',
          'Failing to consider multiple viewings',
          'Not documenting specific moments with timestamps'
        ]
      },
      analysis: {
        title: 'Critical Analysis',
        content: 'Analyze the dance work using the elements of dance: body, action, space, time, dynamics, and relationships. Examine how choreographic devices create meaning and impact. Evaluate technical execution, expressive quality, and artistic effectiveness. Consider how the work reflects or challenges its cultural context. Use specific examples with timestamps to support your analysis.',
        tips: [
          'Analyze body: what body parts are used, how, and why',
          'Examine actions: locomotor and non-locomotor movements',
          'Discuss space: levels, directions, pathways, formations',
          'Evaluate time: rhythm, tempo, duration',
          'Assess dynamics: quality of movement, energy',
          'Consider relationships: between dancers, with audience',
          'Use choreographic terminology accurately'
        ],
        commonMistakes: [
          'Describing without analyzing why choices were made',
          'Not connecting analysis to choreographic intent',
          'Using vague language instead of specific terminology',
          'Ignoring some elements of dance',
          'Not supporting claims with specific examples',
          'Failing to evaluate artistic effectiveness'
        ]
      },
      evaluation: {
        title: 'Evaluation and Conclusion',
        content: 'Evaluate the overall effectiveness of the dance work in achieving its choreographic intent. Consider the work\'s artistic merit, technical quality, and cultural significance. Your conclusion should synthesize your analysis and present a reasoned judgment about the work\'s success and impact. Acknowledge both strengths and limitations.',
        tips: [
          'Make clear evaluative judgments about effectiveness',
          'Consider multiple criteria (artistic, technical, cultural)',
          'Balance strengths and weaknesses',
          'Support evaluations with evidence from analysis',
          'Consider the work\'s impact and significance',
          'Demonstrate critical thinking beyond personal preference'
        ],
        commonMistakes: [
          'Only summarizing without evaluating',
          'Basing judgments purely on personal taste',
          'Not considering choreographic intent in evaluation',
          'Failing to acknowledge complexity or nuance',
          'Not demonstrating critical engagement'
        ]
      }
    },
    sampleQuestions: [
      'How does Pina Bausch use choreographic devices in Café Müller to express emotion?',
      'Analyze the use of space and formation in Alvin Ailey\'s Revelations',
      'How effectively does Crystal Pite\'s Betroffenheit integrate movement and narrative?',
      'Evaluate the cultural significance of traditional Bharatanatyam performance practices',
      'How does contemporary choreography challenge classical ballet conventions?',
      'Analyze the relationship between music and movement in a specific dance work',
      'How does site-specific choreography transform audience perception?',
      'Evaluate the effectiveness of improvisation in creating choreographic material'
    ],
    timeline: [
      {
        phase: 'Selection and Initial Viewing',
        duration: '1-2 weeks',
        activities: [
          'Select dance work(s) for analysis',
          'Initial viewings and note-taking',
          'Begin background research',
          'Identify focus areas'
        ]
      },
      {
        phase: 'Detailed Analysis',
        duration: '3-4 weeks',
        activities: [
          'Multiple viewings with detailed notes',
          'Research choreographer and context',
          'Analyze movement vocabulary and devices',
          'Document specific examples with timestamps'
        ]
      },
      {
        phase: 'Writing',
        duration: '2-3 weeks',
        activities: [
          'Organize analysis into clear structure',
          'Write with appropriate terminology',
          'Include specific evidence',
          'Develop evaluation and conclusion'
        ]
      },
      {
        phase: 'Revision',
        duration: '1 week',
        activities: [
          'Review against criteria',
          'Check terminology and citations',
          'Refine analysis',
          'Final editing'
        ]
      }
    ]
  },

  'theatre': {
    title: 'Theatre',
    description: 'The Theatre IA is a research presentation examining theatre in context through a chosen focus.',
    wordCount: '4,000 words maximum',
    weighting: '30% of final grade',
    citations: [
      {
        format: 'Play Citation',
        example: 'Kushner, T. (1991) Angels in America. New York: Theatre Communications Group.'
      },
      {
        format: 'Performance Citation',
        example: 'National Theatre. (2014) War Horse. Dir. Marianne Elliott and Tom Morris. London.'
      }
    ],
    assessmentCriteria: [
      {
        criterion: 'A',
        name: 'Theatrical Focus and Research',
        maxMarks: 8,
        description: 'Clear focus and comprehensive research',
        keyPoints: [
          'Clearly defined research focus',
          'Comprehensive research from diverse sources',
          'Understanding of theatrical contexts',
          'Effective use of theatre terminology'
        ]
      },
      {
        criterion: 'B',
        name: 'Analysis and Synthesis',
        maxMarks: 12,
        description: 'Critical analysis and synthesis of research',
        keyPoints: [
          'Detailed analysis of theatrical elements',
          'Critical examination of sources',
          'Synthesis of different perspectives',
          'Connection to theoretical frameworks',
          'Demonstration of independent thinking'
        ]
      },
      {
        criterion: 'C',
        name: 'Structure and Organization',
        maxMarks: 4,
        description: 'Logical structure and clear presentation',
        keyPoints: [
          'Clear structure with logical progression',
          'Effective organization of ideas',
          'Appropriate academic tone',
          'Correct citations and bibliography'
        ]
      }
    ],
    sections: {
      overview: {
        title: 'Understanding the Theatre IA',
        content: 'The Theatre IA is a research presentation where you explore a theatrical topic in depth. You choose a theatrical focus (such as theatre theory, performance styles, cultural contexts, or theatre traditions) and conduct comprehensive research. Your presentation demonstrates understanding of theatre in context and your ability to analyze theatrical elements critically.',
        tips: [
          'Choose a focus that genuinely interests you',
          'Ensure sufficient research sources are available',
          'Use appropriate theatre terminology throughout',
          'Connect practical and theoretical aspects',
          'Demonstrate independent critical thinking'
        ],
        commonMistakes: [
          'Choosing too broad a focus to explore meaningfully',
          'Relying on purely descriptive approach',
          'Not using appropriate theatrical terminology',
          'Insufficient depth of research',
          'Not connecting to theatrical contexts'
        ]
      },
      choosing_topic: {
        title: 'Selecting Your Research Focus',
        content: 'Select a specific theatrical focus that allows for in-depth exploration. This might examine a theatre tradition, performance style, playwright or director\'s work, theoretical approach, or cultural context. Your focus should be specific enough for detailed analysis but broad enough to find sufficient sources. Consider topics connected to course content.',
        tips: [
          'Focus on specific theatrical traditions or movements',
          'Consider examining particular production approaches',
          'Explore cultural or historical contexts',
          'Look at influential practitioners or theorists',
          'Ensure access to quality research sources',
          'Connect to course themes and learning'
        ],
        commonMistakes: [
          'Topics too broad: "The history of theatre"',
          'Topics too narrow with insufficient sources',
          'Purely biographical rather than analytical focus',
          'Not connecting to theatrical contexts',
          'Choosing topics without accessible sources'
        ]
      },
      methodology: {
        title: 'Conducting Research',
        content: 'Conduct comprehensive research using diverse sources including scholarly articles, books, interviews, reviews, and production documentation. If possible, attend live performances related to your focus. Examine both primary sources (scripts, production notes, interviews) and secondary sources (critical analysis, scholarly research). Take detailed notes and organize sources by theme.',
        tips: [
          'Use academic databases for scholarly articles',
          'Read multiple perspectives on your topic',
          'Examine historical and cultural contexts',
          'Watch recordings or attend performances if possible',
          'Interview practitioners if accessible',
          'Organize research notes by themes or sections',
          'Evaluate source credibility and bias'
        ],
        commonMistakes: [
          'Relying only on general internet sources',
          'Not examining primary sources',
          'Insufficient variety of perspectives',
          'Not evaluating source quality',
          'Poor organization of research materials',
          'Not documenting sources properly'
        ]
      },
      analysis: {
        title: 'Analysis and Critical Thinking',
        content: 'Analyze your research material critically, examining different perspectives and synthesizing information. Use theatre terminology to discuss performance elements, production approaches, or theoretical concepts. Connect your analysis to broader theatrical contexts and demonstrate understanding of how theatre functions as an art form. Show independent thinking by evaluating ideas rather than just reporting them.',
        tips: [
          'Analyze rather than just describe',
          'Use specific theatrical terminology',
          'Compare different perspectives or approaches',
          'Connect to theatrical theory or practice',
          'Evaluate effectiveness and significance',
          'Demonstrate personal insight and critical thinking',
          'Link specific examples to broader concepts'
        ],
        commonMistakes: [
          'Purely descriptive writing without analysis',
          'Not using theatrical terminology appropriately',
          'Accepting all sources uncritically',
          'Not synthesizing different perspectives',
          'Lacking independent critical voice',
          'Not connecting specifics to broader contexts'
        ]
      },
      evaluation: {
        title: 'Presentation and Conclusion',
        content: 'Your presentation should be well-organized with clear structure, building toward a synthesized conclusion. Demonstrate how your research has deepened understanding of theatre in context. Your conclusion should offer insights about the significance of your focus topic and its relevance to contemporary theatre. Show what you\'ve learned and how it connects to broader theatrical understanding.',
        tips: [
          'Organize presentation logically',
          'Use clear headings and structure',
          'Build toward synthesized conclusion',
          'Demonstrate what you\'ve learned',
          'Connect to broader theatrical significance',
          'Show depth of understanding',
          'Include proper citations throughout'
        ],
        commonMistakes: [
          'Poor organization making ideas hard to follow',
          'Just summarizing research without synthesis',
          'Not demonstrating personal learning',
          'Weak conclusion that doesn\'t synthesize',
          'Improper or missing citations',
          'Not showing relevance or significance'
        ]
      }
    },
    sampleQuestions: [
      'How does Brecht\'s epic theatre challenge traditional dramatic conventions?',
      'Explore the influence of commedia dell\'arte on contemporary physical theatre',
      'How do different cultural traditions approach ritual performance?',
      'Analyze the evolution of feminist theatre practice in the 20th century',
      'How does devised theatre challenge traditional playwriting and production?',
      'Explore the role of puppetry in contemporary political theatre',
      'How has digital technology transformed theatrical performance?',
      'Analyze the theatrical legacy of a specific practitioner or movement'
    ],
    timeline: [
      {
        phase: 'Topic Selection and Planning',
        duration: '1-2 weeks',
        activities: [
          'Identify research focus',
          'Conduct preliminary research',
          'Refine focus and develop questions',
          'Create research plan'
        ]
      },
      {
        phase: 'Research Phase',
        duration: '4-5 weeks',
        activities: [
          'Gather diverse sources',
          'Take detailed notes',
          'Attend performances if possible',
          'Organize research by themes'
        ]
      },
      {
        phase: 'Analysis and Writing',
        duration: '3-4 weeks',
        activities: [
          'Analyze research critically',
          'Organize into clear structure',
          'Write presentation with analysis',
          'Develop synthesis and conclusions'
        ]
      },
      {
        phase: 'Revision',
        duration: '1-2 weeks',
        activities: [
          'Review structure and organization',
          'Check citations and bibliography',
          'Refine analysis and arguments',
          'Final editing'
        ]
      }
    ]
  },

  'philosophy': {
    title: 'Philosophy',
    description: 'The Philosophy IA is a philosophical analysis exploring a philosophical problem or concept.',
    wordCount: '2,000 words',
    weighting: '20% of final grade',
    citations: [
      {
        format: 'Book Citation',
        example: 'Descartes, R. (1641/1996) Meditations on First Philosophy. Trans. J. Cottingham. Cambridge: Cambridge University Press.'
      },
      {
        format: 'Journal Article',
        example: 'Nagel, T. (1974) "What Is It Like to Be a Bat?" The Philosophical Review, 83(4), pp. 435-450.'
      }
    ],
    assessmentCriteria: [
      {
        criterion: 'A',
        name: 'Identification and Explanation',
        maxMarks: 5,
        description: 'Clear identification and explanation of philosophical problem',
        keyPoints: [
          'Clear statement of philosophical problem',
          'Explanation of key concepts',
          'Relevant philosophical context',
          'Precise use of philosophical terminology'
        ]
      },
      {
        criterion: 'B',
        name: 'Argument and Analysis',
        maxMarks: 10,
        description: 'Development and analysis of philosophical arguments',
        keyPoints: [
          'Clear presentation of philosophical arguments',
          'Critical analysis of arguments',
          'Examination of objections and responses',
          'Logical reasoning demonstrated',
          'Engagement with philosophical texts'
        ]
      },
      {
        criterion: 'C',
        name: 'Evaluation and Conclusion',
        maxMarks: 5,
        description: 'Evaluation of arguments with reasoned conclusion',
        keyPoints: [
          'Critical evaluation of arguments',
          'Assessment of strengths and weaknesses',
          'Reasoned philosophical conclusion',
          'Demonstration of independent thinking'
        ]
      },
      {
        criterion: 'D',
        name: 'Organization and Presentation',
        maxMarks: 5,
        description: 'Structure, clarity, and academic presentation',
        keyPoints: [
          'Clear logical structure',
          'Coherent argumentation',
          'Appropriate academic tone',
          'Correct citations'
        ]
      }
    ],
    sections: {
      overview: {
        title: 'Understanding the Philosophy IA',
        content: 'The Philosophy IA requires you to engage with a philosophical problem through careful analysis of arguments. You will examine philosophical texts, present different positions, analyze arguments and objections, and develop your own reasoned position. The focus is on philosophical argumentation, conceptual analysis, and critical thinking rather than just reporting what philosophers have said.',
        tips: [
          'Choose a clearly defined philosophical problem',
          'Engage directly with philosophical texts',
          'Present arguments precisely and charitably',
          'Analyze objections thoroughly',
          'Develop your own reasoned position',
          'Use philosophical terminology accurately'
        ],
        commonMistakes: [
          'Merely describing what philosophers said without analysis',
          'Not engaging with actual philosophical arguments',
          'Choosing problems too broad to address adequately',
          'Asserting personal opinions without philosophical reasoning',
          'Not considering objections to arguments'
        ]
      },
      choosing_topic: {
        title: 'Selecting Your Philosophical Problem',
        content: 'Choose a specific philosophical problem that interests you and allows for substantive analysis. The problem should be narrow enough to address in depth but significant enough to merit philosophical investigation. Consider problems in epistemology, metaphysics, ethics, philosophy of mind, or other areas studied in the course. Ensure sufficient philosophical literature exists on your chosen problem.',
        tips: [
          'Focus on specific philosophical questions',
          'Choose problems with multiple viable positions',
          'Consider classic philosophical debates',
          'Ensure access to relevant philosophical texts',
          'Select problems you can analyze in depth',
          'Connect to course content where possible'
        ],
        commonMistakes: [
          'Problems too broad: "What is the meaning of life?"',
          'Purely scientific or empirical questions',
          'Problems without sufficient philosophical literature',
          'Choosing problems you can\'t analyze philosophically',
          'Topics that are primarily historical rather than philosophical'
        ]
      },
      methodology: {
        title: 'Research and Analysis',
        content: 'Read primary philosophical texts carefully, identifying key arguments and concepts. Analyze the logical structure of arguments, considering premises, inferences, and conclusions. Research different philosophical positions on your problem, including objections and responses. Take detailed notes on arguments, distinguishing between exposition and analysis. Consider thought experiments, counterexamples, and conceptual distinctions relevant to your problem.',
        tips: [
          'Read primary sources carefully and charitably',
          'Identify explicit and implicit premises in arguments',
          'Map out logical structure of arguments',
          'Consider counterarguments and objections',
          'Look for conceptual ambiguities or distinctions',
          'Take notes distinguishing summary from analysis',
          'Use reliable scholarly sources and translations'
        ],
        commonMistakes: [
          'Relying on summaries rather than primary texts',
          'Misrepresenting philosophers\' arguments',
          'Not identifying logical structure of arguments',
          'Ignoring important objections',
          'Not distinguishing different senses of key terms',
          'Using unreliable internet sources'
        ]
      },
      analysis: {
        title: 'Philosophical Analysis',
        content: 'Present philosophical arguments clearly and precisely, explaining their logical structure. Analyze the strength of arguments by examining their premises, logical validity, and potential objections. Consider counterexamples, thought experiments, and conceptual distinctions. Engage critically with different philosophical positions, evaluating their strengths and weaknesses. Develop your own analysis and position through reasoned argumentation.',
        tips: [
          'Present arguments in clear logical form',
          'Explain why each step follows',
          'Consider objections to each major claim',
          'Use thought experiments appropriately',
          'Make conceptual distinctions where needed',
          'Evaluate arguments on philosophical grounds',
          'Show your own reasoning process',
          'Acknowledge complexity and nuance'
        ],
        commonMistakes: [
          'Vague or imprecise presentation of arguments',
          'Not explaining logical connections',
          'Ignoring obvious objections',
          'Confusing empirical and philosophical claims',
          'Not showing how arguments relate to each other',
          'Asserting conclusions without supporting reasoning',
          'Oversimplifying complex philosophical issues'
        ]
      },
      evaluation: {
        title: 'Evaluation and Conclusion',
        content: 'Evaluate the philosophical arguments you\'ve analyzed, assessing their strengths and weaknesses. Present your own reasoned conclusion about the philosophical problem, supporting it with philosophical argumentation. Acknowledge the complexity of the issue and recognize that reasonable philosophers may disagree. Your conclusion should demonstrate philosophical sophistication and independent critical thinking.',
        tips: [
          'Evaluate arguments on philosophical merits',
          'Present your own reasoned position',
          'Support conclusions with philosophical reasoning',
          'Acknowledge strong objections honestly',
          'Show awareness of philosophical complexity',
          'Demonstrate independent critical thinking',
          'Conclude with philosophical insight, not just summary'
        ],
        commonMistakes: [
          'Just summarizing without evaluating',
          'Not presenting your own philosophical position',
          'Asserting conclusions without reasoning',
          'Claiming to "solve" complex philosophical problems',
          'Not acknowledging legitimate alternative views',
          'Ending without genuine philosophical insight'
        ]
      }
    },
    sampleQuestions: [
      'Can we have knowledge of the external world? Analyze the skeptical challenge',
      'Is personal identity determined by psychological or physical continuity?',
      'Can there be objective moral truths? Examine moral realism vs. anti-realism',
      'What is the relationship between mind and body? Analyze dualism and physicalism',
      'Is free will compatible with determinism? Examine compatibilist arguments',
      'Can artificial intelligence truly think? Analyze the Chinese Room argument',
      'What makes an action morally right? Compare consequentialist and deontological theories',
      'Is justified true belief sufficient for knowledge? Examine Gettier problems'
    ],
    timeline: [
      {
        phase: 'Problem Selection and Reading',
        duration: '2 weeks',
        activities: [
          'Select philosophical problem',
          'Conduct initial reading',
          'Identify key arguments and positions',
          'Refine focus'
        ]
      },
      {
        phase: 'Research and Analysis',
        duration: '3-4 weeks',
        activities: [
          'Read primary philosophical texts',
          'Analyze arguments in detail',
          'Research objections and responses',
          'Develop your own position'
        ]
      },
      {
        phase: 'Writing',
        duration: '2-3 weeks',
        activities: [
          'Present arguments clearly',
          'Develop analysis and evaluation',
          'Write conclusion',
          'Create bibliography'
        ]
      },
      {
        phase: 'Revision',
        duration: '1 week',
        activities: [
          'Review logical structure',
          'Check for clarity and precision',
          'Verify citations',
          'Final editing'
        ]
      }
    ]
  },

  'music': {
    title: 'Music',
    description: 'The Music IA is an analytical paper examining musical works through detailed analysis and contextual understanding.',
    wordCount: '2,000 words',
    weighting: '30% of final grade (SL), 20% of final grade (HL)',
    citations: [
      {
        format: 'Musical Work Citation',
        example: 'Beethoven, L. van. (1808) Symphony No. 5 in C minor, Op. 67. Vienna: Breitkopf & Härtel.'
      },
      {
        format: 'Recording Citation',
        example: 'The Beatles. (1967) Sgt. Pepper\'s Lonely Hearts Club Band. London: Parlophone Records.'
      }
    ],
    assessmentCriteria: [
      {
        criterion: 'A',
        name: 'Musical Understanding',
        maxMarks: 6,
        description: 'Understanding of musical elements and context',
        keyPoints: [
          'Accurate identification of musical elements',
          'Understanding of style and genre',
          'Knowledge of cultural and historical context',
          'Use of appropriate musical terminology'
        ]
      },
      {
        criterion: 'B',
        name: 'Musical Analysis',
        maxMarks: 12,
        description: 'Detailed analysis of musical structure and techniques',
        keyPoints: [
          'Detailed analysis of melody, harmony, rhythm, texture',
          'Examination of form and structure',
          'Analysis of compositional techniques',
          'Discussion of stylistic features',
          'Use of musical notation where appropriate',
          'Specific examples with measure numbers'
        ]
      },
      {
        criterion: 'C',
        name: 'Critical Evaluation',
        maxMarks: 6,
        description: 'Critical evaluation and interpretation',
        keyPoints: [
          'Evaluation of compositional effectiveness',
          'Interpretation of musical meaning',
          'Assessment of stylistic significance',
          'Demonstration of critical thinking'
        ]
      },
      {
        criterion: 'D',
        name: 'Organization and Presentation',
        maxMarks: 6,
        description: 'Structure, clarity, and presentation',
        keyPoints: [
          'Clear structure and organization',
          'Logical flow of ideas',
          'Appropriate use of musical notation',
          'Correct citations and bibliography'
        ]
      }
    ],
    sections: {
      overview: {
        title: 'Understanding the Music IA',
        content: 'The Music IA requires detailed analysis of musical works, examining elements such as melody, harmony, rhythm, texture, timbre, form, and structure. You will analyze how these elements work together to create musical meaning and effect. Your analysis should be supported by specific musical examples, using measure numbers and, where appropriate, musical notation. Context and cultural significance should also be considered.',
        tips: [
          'Listen to your chosen works many times',
          'Use scores for detailed analysis where available',
          'Identify specific musical elements with precision',
          'Support all claims with specific examples and measure numbers',
          'Use appropriate musical terminology',
          'Consider both technical and expressive aspects'
        ],
        commonMistakes: [
          'Purely descriptive writing without analysis',
          'Vague references to "the music" without specific examples',
          'Not using musical terminology appropriately',
          'Ignoring important musical elements',
          'Making claims without supporting evidence',
          'Focusing only on personal emotional response'
        ]
      },
      choosing_topic: {
        title: 'Selecting Musical Works',
        content: 'Choose musical work(s) that offer rich material for analysis and are appropriate to your level of musical understanding. You might compare works from different periods or styles, analyze a single complex work, or examine how a composer uses particular techniques. Ensure you have access to recordings and, ideally, scores for detailed analysis.',
        tips: [
          'Choose works with sufficient complexity for analysis',
          'Ensure access to quality recordings',
          'Access to scores enables more detailed analysis',
          'Consider works from course repertoire',
          'Select music you can analyze at an appropriate level',
          'Ensure works allow for meaningful comparison if comparing'
        ],
        commonMistakes: [
          'Works too simple for substantive analysis',
          'No access to scores for detailed examination',
          'Choosing works beyond your analytical abilities',
          'Works without clear points of comparison',
          'Selecting purely on personal preference without analytical potential'
        ]
      },
      methodology: {
        title: 'Musical Analysis Process',
        content: 'Listen to your chosen works repeatedly, taking detailed notes on musical elements. If available, study the score carefully, identifying key features of melody, harmony, rhythm, texture, and form. Mark specific passages for detailed analysis, noting measure numbers. Research the historical and cultural context, compositional techniques, and critical reception. Create analytical diagrams or charts to illustrate form and structure.',
        tips: [
          'Listen with and without score multiple times',
          'Create timing/measure charts for structural analysis',
          'Identify key musical features with specific locations',
          'Transcribe important passages if no score available',
          'Research composer\'s style and historical context',
          'Note use of specific compositional techniques',
          'Compare multiple performances if analyzing interpretation'
        ],
        commonMistakes: [
          'Not listening enough times to catch details',
          'Relying only on listening without score study',
          'Not documenting specific measure numbers',
          'Insufficient research into context',
          'Not identifying specific compositional techniques',
          'Vague observations without precise musical evidence'
        ]
      },
      analysis: {
        title: 'Detailed Musical Analysis',
        content: 'Analyze musical elements systematically: melody (contour, intervals, motifs), harmony (chord progressions, tonality, harmonic rhythm), rhythm and meter, texture (homophonic, polyphonic, etc.), timbre and orchestration, and form and structure. Examine how these elements interact to create musical meaning and effect. Use specific measure numbers and musical notation where appropriate. Discuss compositional techniques and stylistic features.',
        tips: [
          'Analyze each musical element thoroughly',
          'Use specific measure numbers for all examples',
          'Include musical notation for key passages',
          'Explain how elements work together',
          'Identify compositional techniques precisely',
          'Discuss both technical and expressive functions',
          'Use correct musical terminology',
          'Connect analysis to overall structure and meaning'
        ],
        commonMistakes: [
          'Vague descriptions without specific locations',
          'Not using musical terminology correctly',
          'Analyzing some elements while ignoring others',
          'Not explaining significance of features identified',
          'Missing important compositional techniques',
          'Not connecting details to larger musical structure',
          'Avoiding technical analysis in favor of subjective response'
        ]
      },
      evaluation: {
        title: 'Evaluation and Interpretation',
        content: 'Evaluate the effectiveness of the compositional techniques and musical choices you\'ve analyzed. Consider how successfully the music achieves its apparent purposes. Interpret the musical meaning and significance, considering both technical achievement and expressive impact. Place the work in its historical and stylistic context, evaluating its significance within that context.',
        tips: [
          'Evaluate compositional effectiveness with reasoning',
          'Consider both technical and expressive success',
          'Interpret musical meaning supported by analysis',
          'Assess stylistic significance',
          'Place work in historical/cultural context',
          'Balance technical and aesthetic evaluation',
          'Support interpretations with musical evidence'
        ],
        commonMistakes: [
          'Only summarizing analysis without evaluation',
          'Purely subjective judgments without reasoning',
          'Not interpreting musical meaning',
          'Ignoring historical or cultural significance',
          'Not supporting interpretations with analysis',
          'Confusing personal preference with evaluation'
        ]
      }
    },
    sampleQuestions: [
      'How does Beethoven develop motivic material in Symphony No. 5, first movement?',
      'Analyze the harmonic language and its expressive function in Chopin\'s Nocturne Op. 9 No. 2',
      'How do The Beatles use studio techniques to create innovative sounds in Sgt. Pepper\'s?',
      'Compare the treatment of form in sonata movements by Mozart and Beethoven',
      'Analyze the rhythmic complexity and polyrhythm in African drumming traditions',
      'How does John Williams use leitmotif technique in film scores?',
      'Examine the influence of jazz harmony on 20th century art music',
      'Analyze the relationship between text and music in an art song cycle'
    ],
    timeline: [
      {
        phase: 'Selection and Initial Study',
        duration: '1-2 weeks',
        activities: [
          'Select musical work(s)',
          'Multiple listenings',
          'Initial score study',
          'Preliminary research'
        ]
      },
      {
        phase: 'Detailed Analysis',
        duration: '3-4 weeks',
        activities: [
          'Detailed score analysis',
          'Identify specific musical features',
          'Research context and techniques',
          'Document examples with measure numbers'
        ]
      },
      {
        phase: 'Writing',
        duration: '2-3 weeks',
        activities: [
          'Organize analysis into clear structure',
          'Write detailed analysis with examples',
          'Include notation where appropriate',
          'Develop evaluation and interpretation'
        ]
      },
      {
        phase: 'Revision',
        duration: '1 week',
        activities: [
          'Review terminology and accuracy',
          'Check all measure numbers',
          'Verify citations',
          'Final editing'
        ]
      }
    ]
  },

  'design_technology': {
    title: 'Design Technology',
    description: 'The Design Technology IA is a design project developing a solution to an authentic problem.',
    wordCount: '3,000 words maximum (plus appendices)',
    weighting: '40% of final grade',
    citations: [
      {
        format: 'Book Citation',
        example: 'Norman, D. (2013) The Design of Everyday Things. Revised ed. New York: Basic Books.'
      },
      {
        format: 'Patent Citation',
        example: 'Apple Inc. (2007) Portable Multifunction Device. US Patent 7,479,949.'
      }
    ],
    assessmentCriteria: [
      {
        criterion: 'A',
        name: 'Analysis of a Design Opportunity',
        maxMarks: 10,
        description: 'Identification and analysis of design problem',
        keyPoints: [
          'Clear identification of design opportunity',
          'Analysis of user needs and context',
          'Research into existing solutions',
          'Development of design brief and specifications'
        ]
      },
      {
        criterion: 'B',
        name: 'Conceptual Design',
        maxMarks: 10,
        description: 'Development and evaluation of design concepts',
        keyPoints: [
          'Generation of multiple design concepts',
          'Evaluation against specifications',
          'Justification of chosen design',
          'Consideration of sustainability and innovation'
        ]
      },
      {
        criterion: 'C',
        name: 'Development of Design',
        maxMarks: 10,
        description: 'Detailed development of chosen design',
        keyPoints: [
          'Technical drawings and specifications',
          'Material and manufacturing considerations',
          'Testing and refinement',
          'Documentation of development process'
        ]
      },
      {
        criterion: 'D',
        name: 'Justification of Proposed Solution',
        maxMarks: 10,
        description: 'Evaluation of final design solution',
        keyPoints: [
          'Evaluation against design specifications',
          'Consideration of wider implications',
          'Reflection on design process',
          'Suggestions for improvement'
        ]
      },
      {
        criterion: 'E',
        name: 'Use of Design Techniques',
        maxMarks: 6,
        description: 'Appropriate use of design methods and techniques',
        keyPoints: [
          'Effective use of CAD/modeling',
          'Appropriate design communication',
          'Use of relevant design methodologies',
          'Professional presentation'
        ]
      }
    ],
    sections: {
      overview: {
        title: 'Understanding the Design Technology IA',
        content: 'The Design Technology IA requires you to work through a complete design process from identifying a problem to proposing a solution. You will analyze user needs, develop multiple concepts, refine a chosen design through detailed development, and evaluate your final solution. The focus is on the design process itself, with emphasis on innovation, sustainability, and user-centered design. While you document the process, you may or may not physically manufacture the product.',
        tips: [
          'Choose a real, authentic design problem',
          'Focus on the design process, not just the product',
          'Consider user needs throughout',
          'Document every stage of development',
          'Use appropriate technical communication',
          'Address sustainability and innovation'
        ],
        commonMistakes: [
          'Choosing problems without real users or context',
          'Jumping to solutions without proper analysis',
          'Not generating enough design concepts',
          'Poor technical communication and drawings',
          'Not evaluating against specifications',
          'Ignoring sustainability considerations'
        ]
      },
      choosing_topic: {
        title: 'Identifying a Design Opportunity',
        content: 'Identify an authentic design problem based on observation of user needs or market gaps. The problem should be appropriate in scope - complex enough for substantial design work but achievable within constraints. Consider problems in your local community, school, or personal experience. Research existing solutions to understand the context and identify opportunities for innovation or improvement.',
        tips: [
          'Observe real users and their needs',
          'Look for problems in familiar contexts',
          'Ensure problem is specific and well-defined',
          'Check feasibility within your resources',
          'Consider problems allowing for innovation',
          'Research existing solutions thoroughly'
        ],
        commonMistakes: [
          'Vague or overly broad problems',
          'Problems without clear users',
          'Unrealistic scope for the time available',
          'Not researching existing solutions',
          'Choosing problems just because you have an idea',
          'Problems requiring unavailable resources or expertise'
        ]
      },
      methodology: {
        title: 'Design Process and Development',
        content: 'Follow a systematic design process: analyze the problem and user needs, develop a design brief and specifications, generate multiple concepts, evaluate and select a design, develop the chosen design in detail with technical drawings and material specifications, test and refine the design, and evaluate the final solution. Document each stage thoroughly with appropriate visual communication including sketches, CAD drawings, models, and prototypes.',
        tips: [
          'Create detailed user and task analysis',
          'Develop specific, measurable design specifications',
          'Generate diverse concepts using creativity techniques',
          'Use appropriate evaluation matrices',
          'Create detailed technical drawings with dimensions',
          'Consider materials, manufacturing, and assembly',
          'Build and test prototypes or models',
          'Iterate based on testing feedback'
        ],
        commonMistakes: [
          'Vague or unmeasurable specifications',
          'Too few design concepts generated',
          'Not justifying design decisions',
          'Insufficient technical detail in development',
          'No testing or refinement',
          'Poor quality drawings and communication',
          'Not documenting the iterative process'
        ]
      },
      analysis: {
        title: 'Design Analysis and Evaluation',
        content: 'Throughout your design process, evaluate your work against design specifications and user needs. Analyze the strengths and weaknesses of your concepts and design decisions. Consider the sustainability implications of material choices, manufacturing methods, and product lifecycle. Evaluate innovation - how does your solution improve on existing products? Assess feasibility of manufacture and commercial viability if relevant.',
        tips: [
          'Test against all design specifications',
          'Use objective evaluation criteria',
          'Consider environmental impact throughout',
          'Analyze social and economic implications',
          'Evaluate innovation and originality',
          'Get feedback from potential users',
          'Consider manufacturing feasibility',
          'Assess life cycle implications'
        ],
        commonMistakes: [
          'Not evaluating against original specifications',
          'Only considering technical aspects',
          'Ignoring sustainability implications',
          'Not seeking user feedback',
          'Superficial treatment of innovation',
          'Not considering manufacturing reality',
          'Vague or unsupported evaluations'
        ]
      },
      evaluation: {
        title: 'Final Evaluation and Reflection',
        content: 'Evaluate your final design solution comprehensively against your design specifications. Assess how well it meets user needs and solves the original problem. Consider the wider implications including sustainability, social impact, and commercial viability. Reflect critically on your design process - what worked well and what would you improve? Suggest specific modifications for future development. Demonstrate understanding of how your solution fits within broader design and technological contexts.',
        tips: [
          'Test final design against all specifications',
          'Be honest about limitations and weaknesses',
          'Consider all aspects of sustainability',
          'Reflect on the design process critically',
          'Suggest specific, justified improvements',
          'Consider wider implications and impact',
          'Demonstrate learning and development'
        ],
        commonMistakes: [
          'Claiming perfect success without acknowledging limitations',
          'Not testing against specifications systematically',
          'Superficial sustainability analysis',
          'Vague suggestions for improvement',
          'Not reflecting on the process',
          'Ignoring economic or manufacturing constraints',
          'Not demonstrating critical thinking'
        ]
      }
    },
    sampleQuestions: [
      'Design a sustainable storage solution for a small urban apartment',
      'Develop an assistive device for elderly users with limited mobility',
      'Create an innovative packaging solution reducing environmental impact',
      'Design a modular furniture system for flexible workspaces',
      'Develop a low-cost educational tool for primary school students',
      'Create an ergonomic solution for laptop users working from home',
      'Design a product using recycled or waste materials',
      'Develop a solution improving safety in a specific context'
    ],
    timeline: [
      {
        phase: 'Analysis and Research',
        duration: '2-3 weeks',
        activities: [
          'Identify design opportunity',
          'Analyze user needs and context',
          'Research existing solutions',
          'Develop design brief and specifications'
        ]
      },
      {
        phase: 'Concept Development',
        duration: '3-4 weeks',
        activities: [
          'Generate multiple design concepts',
          'Evaluate concepts against specifications',
          'Select and justify chosen design',
          'Begin detailed development'
        ]
      },
      {
        phase: 'Detailed Development',
        duration: '4-6 weeks',
        activities: [
          'Create technical drawings and CAD models',
          'Consider materials and manufacturing',
          'Build prototypes or models',
          'Test and refine design'
        ]
      },
      {
        phase: 'Evaluation and Documentation',
        duration: '2-3 weeks',
        activities: [
          'Comprehensive evaluation',
          'Finalize all documentation',
          'Complete technical drawings',
          'Write final report'
        ]
      }
    ]
  },
  'english_a': {
    title: 'Language A: Language and Literature Individual Oral',
    description: 'Individual oral examination exploring global issues through literary and non-literary texts',
    wordCount: '10 minutes (plus 5 minutes teacher questions)',
    weighting: '30% for SL, 20% for HL',
    officialGuide: {
      title: 'Language A: Language and Literature Guide 2021',
      organization: 'International Baccalaureate Organization',
      year: '2021',
      type: 'guide'
    },
    assessmentCriteria: [
      {
        criterion: 'A',
        name: 'Knowledge, understanding and interpretation',
        maxMarks: 10,
        description: 'How well does the candidate demonstrate knowledge and understanding of the texts and their contexts?',
        keyPoints: [
          'Convincing knowledge and understanding of both the literary work and non-literary text',
          'Relevant and insightful interpretation of how the global issue is presented',
          'Effective use of the extracts to support the oral',
          'Clear understanding of the texts in relation to the global issue'
        ]
      },
      {
        criterion: 'B',
        name: 'Analysis and evaluation',
        maxMarks: 10,
        description: 'To what extent does the candidate analyze and evaluate authorial choices?',
        keyPoints: [
          'Insightful analysis of how authorial choices present the global issue',
          'Effective evaluation of how textual features shape meaning',
          'Analysis of the relationship between form, structure and meaning',
          'Comparative analysis across text and work'
        ]
      },
      {
        criterion: 'C',
        name: 'Focus and organization',
        maxMarks: 10,
        description: 'How well organized, developed and focused is the presentation?',
        keyPoints: [
          'Clear and logical structure',
          'Smooth transitions between texts',
          'Effective development of argument',
          'Well-integrated use of evidence',
          'Response to teacher questions demonstrates flexibility'
        ]
      },
      {
        criterion: 'D',
        name: 'Language',
        maxMarks: 10,
        description: 'How clear, varied and accurate is the language?',
        keyPoints: [
          'Clear and effective use of language',
          'Appropriate register and style',
          'Accurate grammar, vocabulary and syntax',
          'Effective use of literary and linguistic terminology'
        ]
      }
    ],
    sections: {
      'understanding-task': {
        title: 'Understanding the Individual Oral',
        content: 'The individual oral requires you to examine how a global issue is presented through one literary work and one non-literary text. You must analyze both content and form, showing how authorial choices shape the presentation of the global issue. The oral consists of a 10-minute prepared presentation followed by 5 minutes of teacher questions.',
        tips: [
          'Choose a focused, specific global issue rather than broad topics',
          'Select extracts (max 40 lines each) that clearly present the global issue',
          'Balance discussion between the literary work and non-literary text',
          'Analyze authorial choices, not just content',
          'Practice timing to ensure both texts get adequate coverage'
        ],
        commonMistakes: [
          'Choosing a global issue that is too broad or vague',
          'Focusing only on content without analyzing form',
          'Spending too much time on one text at the expense of the other',
          'Reading from notes rather than speaking naturally',
          'Not connecting the two texts through the global issue'
        ]
      },
      'choosing-texts': {
        title: 'Selecting Texts and Extracts',
        content: 'Choose one literary work and one non-literary text that both clearly present your chosen global issue. The extracts should be representative of how each text addresses the issue and rich enough to support detailed analysis. Consider how the two texts offer different perspectives or approaches to the same global issue.',
        tips: [
          'Choose texts where the global issue is central, not peripheral',
          'Select extracts with rich language and techniques to analyze',
          'Ensure texts offer interesting comparative possibilities',
          'Consider different perspectives on the same issue',
          'The extracts should be substantial enough for analysis but manageable'
        ],
        commonMistakes: [
          'Choosing texts with only superficial connection to the global issue',
          'Selecting extracts that are too short for meaningful analysis',
          'Picking texts that are too similar, limiting comparative discussion',
          'Using a work already used for paper 2 or HL essay'
        ]
      },
      'global-issues': {
        title: 'Defining Your Global Issue',
        content: 'A global issue has three key properties: it has significance on a wide scale, it is transnational in nature, and its impact is felt in everyday local contexts. Global issues can be drawn from areas including culture/identity/community, beliefs/values/education, politics/power/justice, art/creativity/imagination, and science/technology.',
        tips: [
          'Make the global issue specific rather than generic',
          'Frame it as an issue (debatable/complex) not just a topic',
          'Ensure it connects meaningfully to both texts',
          'Consider how the issue manifests locally and globally',
          'Research the issue to demonstrate knowledge'
        ],
        commonMistakes: [
          'Stating a topic rather than an issue (e.g., "love" vs "the impact of cultural expectations on romantic relationships")',
          'Choosing an issue too specific to one culture or context',
          'Selecting an issue with limited relevance to one of the texts',
          'Not demonstrating understanding of the issues complexity'
        ]
      }
    },
    sampleQuestions: [
      'How do both texts explore the tension between individual identity and social expectations?',
      'In what ways do the texts present the commodification of culture?',
      'How is the relationship between language and power presented in both texts?',
      'What perspectives on migration and belonging are offered by these texts?',
      'How do both texts explore the ethics of technological advancement?'
    ],
    timeline: [
      {
        phase: 'Exploration and Selection',
        duration: '3-4 weeks',
        activities: [
          'Explore global issues across studied texts',
          'Identify promising text/work combinations',
          'Consult with teacher on selections',
          'Finalize global issue and extracts'
        ]
      },
      {
        phase: 'Research and Planning',
        duration: '2-3 weeks',
        activities: [
          'Detailed analysis of both extracts',
          'Research global issue context',
          'Develop argument and structure',
          'Create outline with key points'
        ]
      },
      {
        phase: 'Practice and Refinement',
        duration: '2 weeks',
        activities: [
          'Practice oral delivery',
          'Time the presentation',
          'Prepare for possible questions',
          'Refine based on feedback'
        ]
      }
    ]
  },
  'french_b': {
    title: 'Language B Individual Oral Assessment',
    description: 'Individual oral assessment based on visual stimulus (SL) or literary extract (HL) with follow-up discussion',
    wordCount: '12-15 minutes (SL: 15 min prep, HL: 20 min prep)',
    weighting: '25% of final grade',
    officialGuide: {
      title: 'Language B Guide 2020',
      organization: 'International Baccalaureate Organization',
      year: '2020',
      type: 'guide'
    },
    assessmentCriteria: [
      {
        criterion: 'A',
        name: 'Language',
        maxMarks: 12,
        description: 'How successfully does the candidate command spoken language?',
        keyPoints: [
          'Vocabulary is appropriate to the task and varied, including idiomatic expressions',
          'Variety of basic and complex grammatical structures used effectively',
          'Language is mostly accurate with occasional errors not interfering with communication',
          'Pronunciation and intonation are clear and enhance communication'
        ]
      },
      {
        criterion: 'B1',
        name: 'Message - Visual Stimulus/Literary Extract',
        maxMarks: 6,
        description: 'How well does the candidate engage with the stimulus in the presentation?',
        keyPoints: [
          'Presentation is consistently relevant to the visual stimulus or literary extract',
          'Effective use of the stimulus to develop observations and opinions',
          'Observations are well-developed and supported with reference to the stimulus',
          'For HL: demonstrates understanding of literary elements'
        ]
      },
      {
        criterion: 'B2',
        name: 'Message - Conversation',
        maxMarks: 6,
        description: 'How appropriately and thoroughly does the candidate respond in conversation?',
        keyPoints: [
          'Responses are consistently relevant to the questions',
          'Responses are appropriate and developed with detail',
          'Broad scope and depth including personal interpretations',
          'Attempts to engage the interlocutor'
        ]
      },
      {
        criterion: 'C',
        name: 'Interactive Skills - Communication',
        maxMarks: 6,
        description: 'To what extent does the candidate understand and interact?',
        keyPoints: [
          'Comprehension and interaction are consistently sustained',
          'Provides clear responses demonstrating comprehension',
          'Participation is sustained with independent contributions',
          'Maintains natural flow of conversation'
        ]
      }
    ],
    sections: {
      'understanding-task': {
        title: 'Understanding the Language B Oral',
        content: 'The Language B individual oral is an assessment of your ability to communicate in the target language. At SL, you respond to a visual stimulus relating to course themes. At HL, you discuss a literary extract from one of the works studied. Both levels include follow-up discussion and general conversation on course themes.',
        tips: [
          'Use the 15/20 minute preparation time effectively',
          'Make brief notes (max 10 bullet points) - do not write full sentences',
          'Structure your presentation with clear introduction, development, and conclusion',
          'Practice discussing course themes before the assessment',
          'Demonstrate intercultural understanding throughout'
        ],
        commonMistakes: [
          'Reading prepared notes rather than speaking naturally',
          'Spending too long describing rather than analyzing',
          'Not relating the stimulus to the course themes',
          'Using only basic vocabulary and structures',
          'Not engaging with the teachers questions'
        ]
      },
      'visual-stimulus': {
        title: 'Approaching the Visual Stimulus (SL)',
        content: 'The visual stimulus may be a photo, poster, illustration, or advertisement relating to one of the five course themes. Your presentation should briefly describe the stimulus, relate it to the relevant theme and target culture, and express your personal opinions on the ideas implied.',
        tips: [
          'Describe briefly - dont spend too long on description',
          'Connect clearly to the labeled theme',
          'Discuss cultural relevance to target language countries',
          'Express and justify personal opinions',
          'Consider different perspectives on the issues shown'
        ],
        commonMistakes: [
          'Pure description without analysis or opinion',
          'Not connecting to the target culture',
          'Memorized responses that dont relate to the specific stimulus',
          'Ignoring the labeled theme',
          'Not using opportunities to show range of vocabulary'
        ]
      },
      'literary-extract': {
        title: 'Approaching the Literary Extract (HL)',
        content: 'At HL, you discuss an extract of approximately 300 words from one of the two literary works studied. Your presentation should summarize the extract, briefly relate it to the work as a whole, and express opinions on characters, events, ideas, and themes.',
        tips: [
          'Know both literary works thoroughly',
          'Summarize briefly then analyze in depth',
          'Discuss literary techniques and their effects',
          'Connect the extract to broader themes in the work',
          'Prepare to discuss different interpretations'
        ],
        commonMistakes: [
          'Retelling the plot without analysis',
          'Not connecting to the literary work as a whole',
          'Ignoring literary techniques and language use',
          'Generic book review style rather than extract focus',
          'Lack of personal interpretation'
        ]
      }
    },
    sampleQuestions: [
      'SL: Photo of urban migration - How does this image reflect changing patterns of identity in [target culture]?',
      'SL: Advertisement for sustainable product - What does this reveal about environmental attitudes in [target culture]?',
      'HL: Extract showing cultural conflict - How does the author present the experience of cultural displacement?',
      'HL: Scene of family tension - What do the characters reveal about generational differences?',
      'General: How do young people in [target culture] view their traditions?'
    ],
    timeline: [
      {
        phase: 'Course Preparation',
        duration: 'Throughout course',
        activities: [
          'Study all five course themes in depth',
          'Practice discussing themes in target language',
          'For HL: study both literary works thoroughly',
          'Develop intercultural understanding'
        ]
      },
      {
        phase: 'Skills Development',
        duration: '4-6 weeks before',
        activities: [
          'Practice with sample visual stimuli (SL)',
          'Practice with literary extracts (HL)',
          'Develop note-taking strategies',
          'Practice timed presentations'
        ]
      },
      {
        phase: 'Final Preparation',
        duration: '1-2 weeks before',
        activities: [
          'Review all themes and vocabulary',
          'Practice responding to questions',
          'Work on pronunciation and fluency',
          'Build confidence in interaction'
        ]
      }
    ]
  },
  'tok': {
    title: 'Theory of Knowledge Exhibition and Essay',
    description: 'Internal exhibition exploring TOK in the real world, and external essay responding to prescribed titles',
    wordCount: 'Exhibition: 950 words max | Essay: 1600 words max',
    weighting: 'Part of Core (contributes to diploma points)',
    officialGuide: {
      title: 'Theory of Knowledge Guide 2022',
      organization: 'International Baccalaureate Organization',
      year: '2022',
      type: 'guide'
    },
    assessmentCriteria: [
      {
        criterion: 'Exhibition',
        name: 'TOK Exhibition Assessment',
        maxMarks: 10,
        description: 'Does the exhibition successfully show how TOK manifests in the world around us?',
        keyPoints: [
          'Three objects clearly identified with specific real-world contexts',
          'Strong links between objects and selected IA prompt',
          'Clear justification for each objects contribution',
          'Points well-supported by evidence and references to the prompt',
          'Objects are specific real-world items, not generic types'
        ]
      },
      {
        criterion: 'Essay',
        name: 'TOK Essay Assessment',
        maxMarks: 10,
        description: 'Does the essay offer a clear, coherent and critical exploration of the prescribed title?',
        keyPoints: [
          'Insightful engagement with the prescribed title',
          'Effective links between knowledge questions, AOKs and real-world examples',
          'Arguments well-supported and critically evaluated',
          'Balanced consideration of different perspectives',
          'Clear structure with effective use of the 1600 word limit'
        ]
      }
    ],
    sections: {
      'understanding-tok': {
        title: 'Understanding TOK Assessment',
        content: 'TOK has two assessment components: the Exhibition (internal, marked by teacher and moderated) and the Essay (external, marked by IB examiners). The Exhibition explores how TOK manifests in the world through three real-world objects connected to an IA prompt. The Essay requires a sustained response to one of six prescribed titles focused on areas of knowledge.',
        tips: [
          'The Exhibition is about real-world connections - choose specific, personal objects',
          'The Essay requires engagement with areas of knowledge (History, Human Sciences, Natural Sciences, Mathematics, Arts)',
          'Both assessments should demonstrate critical thinking and multiple perspectives',
          'Knowledge questions are central to both tasks',
          'Use examples from your own experience and studies'
        ],
        commonMistakes: [
          'Using generic images instead of specific real-world objects',
          'Not answering the prescribed essay title directly',
          'Only considering one perspective',
          'Making claims without supporting evidence',
          'Excessive description without analysis'
        ]
      },
      'exhibition-guidance': {
        title: 'Creating Your TOK Exhibition',
        content: 'Select three objects that connect to your chosen IA prompt and demonstrate how TOK manifests in the real world. Objects should be specific real-world items, not types of things. For each object, write a commentary (950 words total) explaining how it connects to the prompt and what it reveals about knowledge.',
        tips: [
          'Choose objects that are genuinely yours or that you have direct connection to',
          'Each object should offer a distinct perspective on the prompt',
          'Explain the specific real-world context of each object',
          'Justify why each object is included - what does it uniquely contribute?',
          'Reference the IA prompt explicitly throughout'
        ],
        commonMistakes: [
          'Using generic stock images rather than specific objects',
          'Objects that all make the same point',
          'Not explaining the real-world context clearly',
          'Failing to link back to the IA prompt',
          'Excessive repetition across the three commentaries'
        ]
      },
      'essay-guidance': {
        title: 'Writing Your TOK Essay',
        content: 'Choose one of the six prescribed titles and write a 1600-word essay exploring the knowledge question it raises. Your essay should engage with areas of knowledge, use real-world examples, consider multiple perspectives, and develop a clear argument. The title must be used exactly as given.',
        tips: [
          'Do not modify the prescribed title',
          'Engage with at least two areas of knowledge',
          'Use specific, well-developed examples',
          'Consider and evaluate different perspectives',
          'Structure your essay clearly with introduction, body, and conclusion',
          'Answer the question - dont just write about the topic'
        ],
        commonMistakes: [
          'Modifying or misinterpreting the prescribed title',
          'Only superficial engagement with AOKs',
          'Generic or hypothetical examples',
          'One-sided arguments without considering alternatives',
          'Exceeding the word limit significantly',
          'Not reaching a clear conclusion'
        ]
      }
    },
    sampleQuestions: [
      'Exhibition prompts: Why do we seek knowledge? | What is the relationship between personal experience and knowledge? | How can we distinguish between good and bad explanations?',
      'Essay: To what extent do the labels we use to describe knowledge affect what we know?',
      'Essay: Are some types of knowledge more useful than others?',
      'Essay: How can we reconcile the claim that knowledge requires certainty with the fact that many of our beliefs turn out to be false?',
      'Essay: To what extent do our values influence the production of knowledge?'
    ],
    timeline: [
      {
        phase: 'Exhibition Planning',
        duration: '2-3 weeks',
        activities: [
          'Study IA prompts and select one',
          'Brainstorm potential objects',
          'Research connections to knowledge questions',
          'Select final three objects'
        ]
      },
      {
        phase: 'Exhibition Writing',
        duration: '2 weeks',
        activities: [
          'Draft commentaries for each object',
          'Ensure connections to prompt are clear',
          'Review and refine (one draft feedback allowed)',
          'Finalize and submit'
        ]
      },
      {
        phase: 'Essay Development',
        duration: '3-4 weeks',
        activities: [
          'Choose prescribed title carefully',
          'Plan essay structure and examples',
          'Draft essay with clear argument',
          'Receive feedback on one full draft',
          'Finalize and submit'
        ]
      }
    ]
  },
  'spanish_b': {
    title: 'Language B Individual Oral Assessment (Spanish)',
    description: 'Individual oral assessment based on visual stimulus (SL) or literary extract (HL) with follow-up discussion',
    wordCount: '12-15 minutes (SL: 15 min prep, HL: 20 min prep)',
    weighting: '25% of final grade',
    officialGuide: {
      title: 'Language B Guide 2020',
      organization: 'International Baccalaureate Organization',
      year: '2020',
      type: 'guide'
    },
    assessmentCriteria: [
      {
        criterion: 'A',
        name: 'Language',
        maxMarks: 12,
        description: 'How successfully does the candidate command spoken language?',
        keyPoints: [
          'Vocabulary is appropriate to the task and varied, including idiomatic expressions',
          'Variety of basic and complex grammatical structures used effectively',
          'Language is mostly accurate with occasional errors not interfering with communication',
          'Pronunciation and intonation are clear and enhance communication'
        ]
      },
      {
        criterion: 'B1',
        name: 'Message - Visual Stimulus/Literary Extract',
        maxMarks: 6,
        description: 'How well does the candidate engage with the stimulus in the presentation?',
        keyPoints: [
          'Presentation is consistently relevant to the visual stimulus or literary extract',
          'Effective use of the stimulus to develop observations and opinions',
          'Observations are well-developed and supported with reference to the stimulus',
          'For HL: demonstrates understanding of literary elements'
        ]
      },
      {
        criterion: 'B2',
        name: 'Message - Conversation',
        maxMarks: 6,
        description: 'How appropriately and thoroughly does the candidate respond in conversation?',
        keyPoints: [
          'Responses are consistently relevant to the questions',
          'Responses are appropriate and developed with detail',
          'Broad scope and depth including personal interpretations',
          'Attempts to engage the interlocutor'
        ]
      },
      {
        criterion: 'C',
        name: 'Interactive Skills - Communication',
        maxMarks: 6,
        description: 'To what extent does the candidate understand and interact?',
        keyPoints: [
          'Comprehension and interaction are consistently sustained',
          'Provides clear responses demonstrating comprehension',
          'Participation is sustained with independent contributions',
          'Maintains natural flow of conversation'
        ]
      }
    ],
    sections: {
      'understanding-task': {
        title: 'Understanding the Language B Oral',
        content: 'The Language B individual oral is an assessment of your ability to communicate in Spanish. At SL, you respond to a visual stimulus relating to course themes. At HL, you discuss a literary extract from one of the works studied. Both levels include follow-up discussion and general conversation on course themes.',
        tips: [
          'Use the 15/20 minute preparation time effectively',
          'Make brief notes (max 10 bullet points) - do not write full sentences',
          'Structure your presentation with clear introduction, development, and conclusion',
          'Practice discussing course themes before the assessment',
          'Demonstrate intercultural understanding of Spanish-speaking cultures'
        ],
        commonMistakes: [
          'Reading prepared notes rather than speaking naturally',
          'Spending too long describing rather than analyzing',
          'Not relating the stimulus to the course themes',
          'Using only basic vocabulary and structures',
          'Not engaging with the teachers questions'
        ]
      }
    },
    sampleQuestions: [
      'SL: Photo of social gathering - How does this reflect cultural traditions in Spanish-speaking countries?',
      'SL: Advertisement for environmental campaign - What attitudes towards sustainability are shown?',
      'HL: Extract showing identity conflict - How does the author present cultural displacement?',
      'General: How do young people in Hispanic cultures view their traditions?'
    ],
    timeline: [
      {
        phase: 'Course Preparation',
        duration: 'Throughout course',
        activities: ['Study all five course themes', 'Practice discussing themes in Spanish', 'For HL: study both literary works', 'Develop intercultural understanding']
      },
      {
        phase: 'Final Preparation',
        duration: '2-4 weeks before',
        activities: ['Practice with sample stimuli/extracts', 'Work on pronunciation and fluency', 'Build confidence in interaction']
      }
    ]
  },
  'swedish_b': {
    title: 'Language B Individual Oral Assessment (Swedish)',
    description: 'Individual oral assessment based on visual stimulus (SL) or literary extract (HL) with follow-up discussion',
    wordCount: '12-15 minutes (SL: 15 min prep, HL: 20 min prep)',
    weighting: '25% of final grade',
    officialGuide: {
      title: 'Language B Guide 2020',
      organization: 'International Baccalaureate Organization',
      year: '2020',
      type: 'guide'
    },
    assessmentCriteria: [
      {
        criterion: 'A',
        name: 'Language',
        maxMarks: 12,
        description: 'How successfully does the candidate command spoken language?',
        keyPoints: [
          'Vocabulary is appropriate to the task and varied, including idiomatic expressions',
          'Variety of basic and complex grammatical structures used effectively',
          'Language is mostly accurate with occasional errors not interfering with communication',
          'Pronunciation and intonation are clear and enhance communication'
        ]
      },
      {
        criterion: 'B1',
        name: 'Message - Visual Stimulus/Literary Extract',
        maxMarks: 6,
        description: 'How well does the candidate engage with the stimulus in the presentation?',
        keyPoints: [
          'Presentation is consistently relevant to the visual stimulus or literary extract',
          'Effective use of the stimulus to develop observations and opinions',
          'Observations are well-developed and supported with reference to the stimulus',
          'For HL: demonstrates understanding of literary elements'
        ]
      },
      {
        criterion: 'B2',
        name: 'Message - Conversation',
        maxMarks: 6,
        description: 'How appropriately and thoroughly does the candidate respond in conversation?',
        keyPoints: [
          'Responses are consistently relevant to the questions',
          'Responses are appropriate and developed with detail',
          'Broad scope and depth including personal interpretations',
          'Attempts to engage the interlocutor'
        ]
      },
      {
        criterion: 'C',
        name: 'Interactive Skills - Communication',
        maxMarks: 6,
        description: 'To what extent does the candidate understand and interact?',
        keyPoints: [
          'Comprehension and interaction are consistently sustained',
          'Provides clear responses demonstrating comprehension',
          'Participation is sustained with independent contributions',
          'Maintains natural flow of conversation'
        ]
      }
    ],
    sections: {
      'understanding-task': {
        title: 'Understanding the Language B Oral',
        content: 'The Language B individual oral is an assessment of your ability to communicate in Swedish. At SL, you respond to a visual stimulus relating to course themes. At HL, you discuss a literary extract from one of the works studied. Both levels include follow-up discussion and general conversation on course themes.',
        tips: [
          'Use the 15/20 minute preparation time effectively',
          'Make brief notes (max 10 bullet points) - do not write full sentences',
          'Structure your presentation with clear introduction, development, and conclusion',
          'Practice discussing course themes before the assessment',
          'Demonstrate intercultural understanding of Nordic cultures'
        ],
        commonMistakes: [
          'Reading prepared notes rather than speaking naturally',
          'Spending too long describing rather than analyzing',
          'Not relating the stimulus to the course themes',
          'Using only basic vocabulary and structures',
          'Not engaging with the teachers questions'
        ]
      }
    },
    sampleQuestions: [
      'SL: Photo of Swedish tradition - How does this reflect cultural identity in Sweden?',
      'SL: Environmental poster - What attitudes towards nature are shown in Swedish culture?',
      'HL: Extract showing societal values - How does the author present Swedish social norms?',
      'General: How do young Swedes balance tradition with modernity?'
    ],
    timeline: [
      {
        phase: 'Course Preparation',
        duration: 'Throughout course',
        activities: ['Study all five course themes', 'Practice discussing themes in Swedish', 'For HL: study both literary works', 'Develop intercultural understanding']
      },
      {
        phase: 'Final Preparation',
        duration: '2-4 weeks before',
        activities: ['Practice with sample stimuli/extracts', 'Work on pronunciation and fluency', 'Build confidence in interaction']
      }
    ]
  },
  'ee': {
    title: 'Extended Essay',
    description: 'Independent research project culminating in a 4000-word academic essay',
    wordCount: '4000 words maximum',
    weighting: 'Part of Core (contributes to diploma points)',
    officialGuide: {
      title: 'Extended Essay Guide 2018',
      organization: 'International Baccalaureate Organization',
      year: '2018',
      type: 'guide'
    },
    assessmentCriteria: [
      {
        criterion: 'A',
        name: 'Focus and Method',
        maxMarks: 6,
        description: 'Topic, research question, and methodology',
        keyPoints: [
          'Topic is communicated clearly and precisely',
          'Research question is clear, focused and appropriately scoped',
          'Methodology is effective and appropriate to the research question',
          'Source selection is informed and appropriate'
        ]
      },
      {
        criterion: 'B',
        name: 'Knowledge and Understanding',
        maxMarks: 6,
        description: 'Context and subject-specific terminology',
        keyPoints: [
          'Knowledge and understanding of the topic is excellent',
          'Sources are used effectively and with understanding',
          'Subject-specific terminology is accurate and consistent',
          'Context of the discipline is well established'
        ]
      },
      {
        criterion: 'C',
        name: 'Critical Thinking',
        maxMarks: 12,
        description: 'Research, analysis, discussion and evaluation',
        keyPoints: [
          'Research is appropriate and consistently relevant',
          'Analysis is clearly focused on the research question',
          'Effective reasoned argument developed with supported conclusion',
          'Research has been critically evaluated'
        ]
      },
      {
        criterion: 'D',
        name: 'Presentation',
        maxMarks: 4,
        description: 'Structure and layout',
        keyPoints: [
          'Structure is appropriate to the subject and argument',
          'Layout elements are present and correctly applied',
          'Presentation supports reading and evaluation',
          'Consistent and appropriate referencing'
        ]
      },
      {
        criterion: 'E',
        name: 'Engagement',
        maxMarks: 6,
        description: 'Process and research focus (based on RPPF reflections)',
        keyPoints: [
          'Reflections are evaluative and responsive to challenges',
          'High degree of intellectual and personal engagement',
          'Evidence of intellectual initiative and creativity',
          'Authentic student voice throughout the process'
        ]
      }
    ],
    sections: {
      'understanding-ee': {
        title: 'Understanding the Extended Essay',
        content: 'The Extended Essay is a 4000-word independent research project on a topic of your choice within one of your DP subjects (or as a World Studies essay across two subjects). It develops research, writing, and critical thinking skills essential for university. The process includes three reflection sessions documented on the RPPF form, and a final viva voce.',
        tips: [
          'Choose a topic that genuinely interests you',
          'Narrow your topic to form a focused research question',
          'Start research early and allow time for obstacles',
          'Work closely with your supervisor throughout',
          'Reflect genuinely on your process for the RPPF',
          'Follow subject-specific requirements carefully'
        ],
        commonMistakes: [
          'Research question too broad or too narrow',
          'Starting too late in the process',
          'Not using supervisor time effectively',
          'Ignoring subject-specific conventions',
          'Superficial reflections on RPPF',
          'Exceeding the word limit'
        ]
      },
      'developing-rq': {
        title: 'Developing Your Research Question',
        content: 'The research question is the foundation of your EE. It should be clear, focused, and answerable within 4000 words. Move from a broad topic area to a specific, arguable question through research and refinement. The question should allow for in-depth analysis, not just description.',
        tips: [
          'Start with a broad area of interest',
          'Do preliminary research to understand the field',
          'Narrow progressively to a specific focus',
          'Ensure the question is arguable, not just descriptive',
          'Check that sources are available',
          'Discuss with your supervisor before finalizing'
        ],
        commonMistakes: [
          'Question is too broad ("How did WWI happen?")',
          'Question is purely descriptive ("What are the features of...")',
          'Topic requires resources you cannot access',
          'Question has an obvious or predetermined answer',
          'Not aligned with subject requirements'
        ]
      },
      'writing-process': {
        title: 'The Writing Process',
        content: 'Write your EE in stages: introduction, body sections following your argument, and conclusion. Include a clear title page, contents page, and bibliography. Use subject-appropriate structure and referencing. Your supervisor can read and comment on one complete draft.',
        tips: [
          'Create a detailed outline before writing',
          'Write body paragraphs first, then intro and conclusion',
          'Make sure every paragraph serves your argument',
          'Use evidence effectively - dont just describe sources',
          'Maintain academic register throughout',
          'Reference consistently using one citation style'
        ],
        commonMistakes: [
          'No clear structure or argument',
          'Sections that dont connect to the research question',
          'Excessive quotation without analysis',
          'Inconsistent or missing referencing',
          'Introduction/conclusion that dont match the body',
          'Running out of time for revision'
        ]
      },
      'reflection': {
        title: 'RPPF and Engagement',
        content: 'The Researcher Reflection Space and RPPF document your journey. You have three formal reflection sessions with your supervisor: first (after initial exploration), interim (during research/writing), and final (after submission, including viva voce). Reflections should be genuine, evaluative, and show intellectual growth.',
        tips: [
          'Reflect on decisions, challenges, and what you learned',
          'Be honest about difficulties and how you addressed them',
          'Show how your thinking evolved',
          'Document key moments of insight or change in direction',
          'Prepare thoughtfully for each reflection session',
          'The viva voce is a conversation about your process'
        ],
        commonMistakes: [
          'Purely procedural descriptions ("I wrote chapter 2")',
          'Not showing intellectual engagement',
          'Generic reflections that could apply to any essay',
          'Waiting until the end to write reflections',
          'Not being authentic in the viva voce'
        ]
      }
    },
    sampleQuestions: [
      'History: To what extent was propaganda responsible for the success of the Nazi Party in the 1930 Reichstag elections?',
      'Biology: What is the effect of different concentrations of caffeine on the heart rate of Daphnia?',
      'English A: How does Kazuo Ishiguro use memory as a narrative device in The Remains of the Day?',
      'Economics: To what extent has microfinance been successful in reducing poverty in Bangladesh?',
      'Physics: How does the length of a wind turbine blade affect the power output?'
    ],
    timeline: [
      {
        phase: 'Topic Exploration',
        duration: '2-3 months',
        activities: [
          'Explore areas of interest',
          'Conduct preliminary research',
          'Develop research question',
          'First reflection session'
        ]
      },
      {
        phase: 'Research and Planning',
        duration: '2-3 months',
        activities: [
          'In-depth research',
          'Develop essay structure',
          'Begin drafting sections',
          'Interim reflection session'
        ]
      },
      {
        phase: 'Writing and Revision',
        duration: '2-3 months',
        activities: [
          'Complete first draft',
          'Receive supervisor feedback',
          'Revise and finalize',
          'Final reflection and viva voce'
        ]
      }
    ]
  }
};

// Subject slug aliases so that IA guide pages find data under alternate slugs
// (e.g. /homepage/ia-guides/physics, /homepage/ia-guides/english_a)
(function addAliases() {
  const aliases: Record<string, string> = {
    // Sciences - link both hyphenated and underscore versions
    'physics': 'physics',
    'chemistry': 'chemistry',
    // Languages
    'language_a_lang_lit': 'english_a',
    'language_a_literature': 'english_a',
    'language_b': 'french_b',
    'ab_initio': 'french_b',
    // Map underscore versions that the IAGuides.tsx uses
    'english_a': 'english_a',
  };
  for (const [alias, source] of Object.entries(aliases)) {
    if (!iaGuidanceData[alias] && iaGuidanceData[source]) {
      iaGuidanceData[alias] = iaGuidanceData[source];
    }
  }
})();

export default iaGuidanceData;