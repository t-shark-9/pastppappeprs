// Outline section templates based on task type
// These templates provide appropriate structure for different IB assignment types
// with key bullet points from IA/EE structure guides

export interface OutlineSection {
  id: string;
  title: string;
  bullets: string[];
  order: number;
}

export type TaskType = 'essay' | 'commentary' | 'tok' | 'ia' | 'ee' | 'other';

// Default essay structure
const essayTemplate: OutlineSection[] = [
  { id: "1", title: "Introduction", bullets: ["Hook the reader with an engaging opening", "Provide essential context", "State your thesis clearly"], order: 0 },
  { id: "2", title: "Context & Background", bullets: ["Establish historical/literary context", "Define key terms and concepts"], order: 1 },
  { id: "3", title: "Main Argument", bullets: ["Present your central claim", "Support with evidence and analysis"], order: 2 },
  { id: "4", title: "Evidence & Analysis", bullets: ["Use PEEL structure: Point, Evidence, Explanation, Link", "Include textual evidence/data", "Analyze rather than describe"], order: 3 },
  { id: "5", title: "Counterargument", bullets: ["Acknowledge opposing viewpoints", "Refute or concede appropriately"], order: 4 },
  { id: "6", title: "Conclusion", bullets: ["Restate thesis in new words", "Synthesize key points", "Offer broader significance"], order: 5 },
];

// Internal Assessment (IA) structure - scientific/research focused
// Based on IB Science IA structure requirements
const iaTemplate: OutlineSection[] = [
  { 
    id: "1", 
    title: "Introduction & Research Question", 
    bullets: [
      "Personal engagement: Why did you choose this topic?",
      "State research question clearly with variables (IV, DV)",
      "Include a justified hypothesis",
      "Relevant biological/chemical/physical theory with citations"
    ], 
    order: 0 
  },
  { 
    id: "2", 
    title: "Methodology", 
    bullets: [
      "List all materials and equipment",
      "Identify variables: Independent, Dependent, Controlled",
      "Write numbered step-by-step procedure (replicable)",
      "Justify method choices",
      "Address safety and ethical considerations",
      "Include diagram of experimental setup"
    ], 
    order: 1 
  },
  { 
    id: "3", 
    title: "Raw Data", 
    bullets: [
      "Present all collected data in clear, labeled tables",
      "Include units and uncertainties (±)",
      "Record all trials (minimum 5 trials per IV value)",
      "Note qualitative observations"
    ], 
    order: 2 
  },
  { 
    id: "4", 
    title: "Processed Data & Analysis", 
    bullets: [
      "Calculate averages and standard deviation",
      "Show sample calculations",
      "Create graphs with error bars and line of best fit",
      "Propagate uncertainties",
      "Analyze trends and patterns in detail"
    ], 
    order: 3 
  },
  { 
    id: "5", 
    title: "Conclusion", 
    bullets: [
      "State whether hypothesis was supported",
      "Summarize key findings",
      "Relate back to scientific theory",
      "Discuss significance of results"
    ], 
    order: 4 
  },
  { 
    id: "6", 
    title: "Evaluation", 
    bullets: [
      "Identify systematic and random errors",
      "Discuss limitations of method and their impact",
      "Suggest specific, realistic improvements",
      "Consider reliability and validity",
      "Propose extensions for further investigation"
    ], 
    order: 5 
  },
];

// Extended Essay (EE) structure - academic research paper
// Based on IB Extended Essay requirements
const eeTemplate: OutlineSection[] = [
  { 
    id: "1", 
    title: "Introduction", 
    bullets: [
      "Hook: Engage the reader with significance of topic",
      "State research question clearly",
      "Provide context and background for the investigation",
      "Outline the scope and approach of your essay",
      "Preview the structure of your argument"
    ], 
    order: 0 
  },
  { 
    id: "2", 
    title: "Literature Review / Background", 
    bullets: [
      "Survey existing scholarship on your topic",
      "Identify key debates and perspectives",
      "Explain relevant theories and concepts",
      "Establish gaps your research will address",
      "Cite sources properly throughout"
    ], 
    order: 1 
  },
  { 
    id: "3", 
    title: "Methodology / Approach", 
    bullets: [
      "Explain your research methods and approach",
      "Justify why this methodology is appropriate",
      "Describe sources/data you will analyze",
      "Address any limitations of your approach"
    ], 
    order: 2 
  },
  { 
    id: "4", 
    title: "Analysis & Discussion", 
    bullets: [
      "Present your evidence and analysis",
      "Organize thematically or chronologically",
      "Include multiple perspectives where relevant",
      "Connect analysis directly to research question",
      "Use topic sentences to guide the reader"
    ], 
    order: 3 
  },
  { 
    id: "5", 
    title: "Conclusion", 
    bullets: [
      "Answer your research question directly",
      "Summarize key findings and arguments",
      "Discuss implications and significance",
      "Acknowledge limitations",
      "Suggest areas for further research"
    ], 
    order: 4 
  },
  { 
    id: "6", 
    title: "Reflection (RPPF)", 
    bullets: [
      "Reflect on what you learned about the topic",
      "Discuss challenges faced during research",
      "Consider how your understanding evolved",
      "Reflect on skills developed as a researcher"
    ], 
    order: 5 
  },
];

// Theory of Knowledge (TOK) essay structure
const tokTemplate: OutlineSection[] = [
  { 
    id: "1", 
    title: "Introduction", 
    bullets: [
      "Unpack the prescribed title / knowledge question",
      "Define key terms in the title",
      "State your thesis / main argument",
      "Preview the Areas of Knowledge you will explore"
    ], 
    order: 0 
  },
  { 
    id: "2", 
    title: "First Area of Knowledge", 
    bullets: [
      "Develop a claim related to the knowledge question",
      "Use a specific real-life example to support",
      "Analyze using Ways of Knowing (WoKs)",
      "Connect back to the prescribed title"
    ], 
    order: 1 
  },
  { 
    id: "3", 
    title: "Second Area of Knowledge", 
    bullets: [
      "Develop a contrasting or complementary claim",
      "Use a different real-life example",
      "Compare/contrast with first AOK",
      "Explore different perspectives"
    ], 
    order: 2 
  },
  { 
    id: "4", 
    title: "Counterclaims & Perspectives", 
    bullets: [
      "Present alternative viewpoints",
      "Challenge your own claims",
      "Consider cultural, historical, or personal perspectives",
      "Evaluate the strength of counterclaims"
    ], 
    order: 3 
  },
  { 
    id: "5", 
    title: "Implications & Connections", 
    bullets: [
      "Discuss broader implications for knowledge",
      "Connect insights across AOKs",
      "Consider real-world significance",
      "Reflect on limitations of your analysis"
    ], 
    order: 4 
  },
  { 
    id: "6", 
    title: "Conclusion", 
    bullets: [
      "Synthesize your argument",
      "Provide a nuanced answer to the knowledge question",
      "Acknowledge complexity and ambiguity",
      "End with a thought-provoking insight"
    ], 
    order: 5 
  },
];

// Commentary structure - literary/textual analysis
const commentaryTemplate: OutlineSection[] = [
  { 
    id: "1", 
    title: "Introduction", 
    bullets: [
      "Identify genre, form, and purpose of the text",
      "Comment on overall tone/mood",
      "State what the text is about (theme)",
      "Preview your analytical approach"
    ], 
    order: 0 
  },
  { 
    id: "2", 
    title: "Context & Setting", 
    bullets: [
      "Discuss narrative voice/perspective",
      "Analyze the opening lines closely",
      "Comment on structural choices",
      "Establish the dramatic situation"
    ], 
    order: 1 
  },
  { 
    id: "3", 
    title: "Literary Devices & Language", 
    bullets: [
      "Analyze diction and word choices",
      "Examine metaphors, similes, and symbols",
      "Discuss imagery and sensory details",
      "Explain the effect on the reader"
    ], 
    order: 2 
  },
  { 
    id: "4", 
    title: "Themes & Meaning", 
    bullets: [
      "Identify central themes",
      "Trace how themes develop",
      "Connect literary features to thematic meaning",
      "Consider ambiguity and complexity"
    ], 
    order: 3 
  },
  { 
    id: "5", 
    title: "Structure & Form", 
    bullets: [
      "Analyze how the text is organized",
      "Discuss rhythm, meter, or pacing",
      "Examine the ending and resolution",
      "Comment on the overall structure"
    ], 
    order: 4 
  },
  { 
    id: "6", 
    title: "Conclusion", 
    bullets: [
      "Synthesize your analysis",
      "Reflect on the text's overall effect",
      "Comment on the author's success",
      "Avoid introducing new points"
    ], 
    order: 5 
  },
];

// Template mapping
const outlineTemplates: Record<TaskType, OutlineSection[]> = {
  essay: essayTemplate,
  commentary: commentaryTemplate,
  tok: tokTemplate,
  ia: iaTemplate,
  ee: eeTemplate,
  other: essayTemplate, // Default to essay structure
};

/**
 * Get the appropriate outline template based on task type
 * Returns a deep copy to prevent mutation of the original template
 */
export function getOutlineTemplate(taskType: TaskType | string): OutlineSection[] {
  const template = outlineTemplates[taskType as TaskType] || essayTemplate;
  
  // Return a deep copy with fresh IDs to ensure uniqueness
  return template.map((section, index) => ({
    ...section,
    id: String(index + 1),
    bullets: [...section.bullets],
  }));
}

/**
 * Get template section titles for a task type (useful for display)
 */
export function getTemplateSectionTitles(taskType: TaskType | string): string[] {
  const template = outlineTemplates[taskType as TaskType] || essayTemplate;
  return template.map(section => section.title);
}

export { outlineTemplates };
