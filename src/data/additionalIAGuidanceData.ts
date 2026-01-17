// Additional Internal Assessment (IA) Guidance Data for IB Subjects
// Comprehensive guide for writing IAs across additional IB subjects
// Based on official IB subject guides and assessment criteria

import { IASubject } from './iaGuidanceData';

const additionalIAGuidanceData: { [key: string]: IASubject } = {
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
  }
};

export default additionalIAGuidanceData;
