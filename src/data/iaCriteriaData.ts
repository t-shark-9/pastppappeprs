/**
 * IB Internal Assessment Grading Criteria
 * Extracted from official IB subject guides
 * Formatted as CSS-styled tables for display
 */

export interface CriterionLevel {
  marks: string;
  descriptor: string;
  clarifications?: string[];
}

export interface AssessmentCriterion {
  name: string;
  maxMarks: number;
  weighting: number;
  levels: CriterionLevel[];
  clarifications?: string;
}

export interface SubjectCriteria {
  subject: string;
  totalMarks: number;
  criteria: AssessmentCriterion[];
  guideReference: string;
  yearPublished: string;
}

export const iaCriteriaData: { [key: string]: SubjectCriteria } = {
  biology: {
    subject: "Biology",
    totalMarks: 24,
    guideReference: "Biology Guide 2025",
    yearPublished: "2023",
    criteria: [
      {
        name: "Research Design",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach the standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• The research question is stated without context.\n• Methodological considerations associated with collecting data relevant to the research question are stated.\n• The description of the methodology for collecting or selecting data lacks the detail to allow for the investigation to be reproduced."
          },
          {
            marks: "3-4",
            descriptor: "• The research question is outlined within a broad context.\n• Methodological considerations associated with collecting relevant and sufficient data to answer the research question are described.\n• The description of the methodology for collecting or selecting data allows for the investigation to be reproduced with few ambiguities or omissions."
          },
          {
            marks: "5-6",
            descriptor: "• The research question is described within a specific and appropriate context.\n• Methodological considerations associated with collecting relevant and sufficient data to answer the research question are explained.\n• The description of the methodology for collecting or selecting data allows for the investigation to be reproduced."
          }
        ],
        clarifications: "A research question with context should contain reference to the dependent and independent variables or two correlated variables, include a concise description of the system in which the research question is embedded, and include background theory of direct relevance.\n\nMethodological considerations include:\n• The selection of methods for measuring variables\n• The selection of databases or models and data sampling\n• Decisions regarding scope, quantity and quality of measurements\n• Identification of control variables and their control methods\n• Recognition of safety, ethical or environmental considerations"
      },
      {
        name: "Data Analysis",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• The recording and processing of the data is communicated but is neither clear nor precise.\n• The recording and processing of data shows limited evidence of the consideration of uncertainties.\n• Some processing of data relevant to addressing the research question is carried out but with major omissions, inaccuracies or inconsistencies."
          },
          {
            marks: "3-4",
            descriptor: "• The communication of the recording and processing of the data is either clear or precise.\n• The recording and processing of data shows evidence of a consideration of uncertainties but with some significant omissions or inaccuracies.\n• The processing of data relevant to addressing the research question is carried out but with some significant omissions, inaccuracies or inconsistencies."
          },
          {
            marks: "5-6",
            descriptor: "• The communication of the recording and processing of the data is both clear and precise.\n• The recording and processing of data shows evidence of an appropriate consideration of uncertainties.\n• The processing of data relevant to addressing the research question is carried out appropriately and accurately."
          }
        ],
        clarifications: "Clear communication means that the method of processing can be understood easily. Precise communication refers to following conventions correctly, such as annotation of graphs and tables or the use of units, decimal places and significant figures.\n\nMajor omissions impede the possibility of drawing a valid conclusion. Significant omissions allow drawing a conclusion but with some limit to its validity or detail."
      },
      {
        name: "Conclusion",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• A conclusion is stated that is relevant to the research question but is not supported by the analysis presented.\n• The conclusion makes superficial comparison to the accepted scientific context."
          },
          {
            marks: "3-4",
            descriptor: "• A conclusion is described that is relevant to the research question but is not fully consistent with the analysis presented.\n• A conclusion is described that makes some relevant comparison to the accepted scientific context."
          },
          {
            marks: "5-6",
            descriptor: "• A conclusion is justified that is relevant to the research question and fully consistent with the analysis presented.\n• A conclusion is justified through relevant comparison to the accepted scientific context."
          }
        ],
        clarifications: "A conclusion that is fully consistent requires the interpretation of processed data including associated uncertainties.\n\nScientific context refers to information from published material (paper or online), published values, course notes, textbooks or other outside sources. Citations must be sufficiently detailed to allow these sources to be traceable."
      },
      {
        name: "Evaluation",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• The report states generic methodological weaknesses or limitations.\n• Realistic improvements to the investigation are stated."
          },
          {
            marks: "3-4",
            descriptor: "• The report describes specific methodological weaknesses or limitations.\n• Realistic improvements to the investigation that are relevant to the identified weaknesses or limitations, are described."
          },
          {
            marks: "5-6",
            descriptor: "• The report explains the relative impact of specific methodological weaknesses or limitations.\n• Realistic improvements to the investigation, that are relevant to the identified weaknesses or limitations, are explained."
          }
        ],
        clarifications: "Generic is general to many methodologies and not specifically relevant to the methodology of the investigation being evaluated.\n\nMethodological refers to the overall approach to the investigation of the research question as well as procedural steps.\n\nWeaknesses could relate to issues regarding the control of variables, the precision of measurement or the variation in the data.\n\nLimitations could refer to how the conclusion is limited in scope by the range of the data collected, the confines of the system or the applicability of assumptions made."
      }
    ]
  },
  chemistry: {
    subject: "Chemistry",
    totalMarks: 24,
    guideReference: "Chemistry Guide 2025",
    yearPublished: "2023",
    criteria: [
      {
        name: "Research Design",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach the standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• The research question is stated without context.\n• Methodological considerations associated with collecting data relevant to the research question are stated.\n• The description of the methodology for collecting or selecting data lacks the detail to allow for the investigation to be reproduced."
          },
          {
            marks: "3-4",
            descriptor: "• The research question is outlined within a broad context.\n• Methodological considerations associated with collecting relevant and sufficient data to answer the research question are described.\n• The description of the methodology for collecting or selecting data allows for the investigation to be reproduced with few ambiguities or omissions."
          },
          {
            marks: "5-6",
            descriptor: "• The research question is described within a specific and appropriate context.\n• Methodological considerations associated with collecting relevant and sufficient data to answer the research question are explained.\n• The description of the methodology for collecting or selecting data allows for the investigation to be reproduced."
          }
        ]
      },
      {
        name: "Data Analysis",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• The recording and processing of the data is communicated but is neither clear nor precise.\n• The recording and processing of data shows limited evidence of the consideration of uncertainties.\n• Some processing of data relevant to addressing the research question is carried out but with major omissions, inaccuracies or inconsistencies."
          },
          {
            marks: "3-4",
            descriptor: "• The communication of the recording and processing of the data is either clear or precise.\n• The recording and processing of data shows evidence of a consideration of uncertainties but with some significant omissions or inaccuracies.\n• The processing of data relevant to addressing the research question is carried out but with some significant omissions, inaccuracies or inconsistencies."
          },
          {
            marks: "5-6",
            descriptor: "• The communication of the recording and processing of the data is both clear and precise.\n• The recording and processing of data shows evidence of an appropriate consideration of uncertainties.\n• The processing of data relevant to addressing the research question is carried out appropriately and accurately."
          }
        ]
      },
      {
        name: "Conclusion",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• A conclusion is stated that is relevant to the research question but is not supported by the analysis presented.\n• The conclusion makes superficial comparison to the accepted scientific context."
          },
          {
            marks: "3-4",
            descriptor: "• A conclusion is described that is relevant to the research question but is not fully consistent with the analysis presented.\n• A conclusion is described that makes some relevant comparison to the accepted scientific context."
          },
          {
            marks: "5-6",
            descriptor: "• A conclusion is justified that is relevant to the research question and fully consistent with the analysis presented.\n• A conclusion is justified through relevant comparison to the accepted scientific context."
          }
        ]
      },
      {
        name: "Evaluation",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• The report states generic methodological weaknesses or limitations.\n• Realistic improvements to the investigation are stated."
          },
          {
            marks: "3-4",
            descriptor: "• The report describes specific methodological weaknesses or limitations.\n• Realistic improvements to the investigation that are relevant to the identified weaknesses or limitations, are described."
          },
          {
            marks: "5-6",
            descriptor: "• The report explains the relative impact of specific methodological weaknesses or limitations.\n• Realistic improvements to the investigation, that are relevant to the identified weaknesses or limitations, are explained."
          }
        ]
      }
    ]
  },
  physics: {
    subject: "Physics",
    totalMarks: 24,
    guideReference: "Physics Guide 2025",
    yearPublished: "2023",
    criteria: [
      {
        name: "Research Design",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach the standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• The research question is stated without context.\n• Methodological considerations associated with collecting data relevant to the research question are stated.\n• The description of the methodology for collecting or selecting data lacks the detail to allow for the investigation to be reproduced."
          },
          {
            marks: "3-4",
            descriptor: "• The research question is outlined within a broad context.\n• Methodological considerations associated with collecting relevant and sufficient data to answer the research question are described.\n• The description of the methodology for collecting or selecting data allows for the investigation to be reproduced with few ambiguities or omissions."
          },
          {
            marks: "5-6",
            descriptor: "• The research question is described within a specific and appropriate context.\n• Methodological considerations associated with collecting relevant and sufficient data to answer the research question are explained.\n• The description of the methodology for collecting or selecting data allows for the investigation to be reproduced."
          }
        ]
      },
      {
        name: "Data Analysis",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• The recording and processing of the data is communicated but is neither clear nor precise.\n• The recording and processing of data shows limited evidence of the consideration of uncertainties.\n• Some processing of data relevant to addressing the research question is carried out but with major omissions, inaccuracies or inconsistencies."
          },
          {
            marks: "3-4",
            descriptor: "• The communication of the recording and processing of the data is either clear or precise.\n• The recording and processing of data shows evidence of a consideration of uncertainties but with some significant omissions or inaccuracies.\n• The processing of data relevant to addressing the research question is carried out but with some significant omissions, inaccuracies or inconsistencies."
          },
          {
            marks: "5-6",
            descriptor: "• The communication of the recording and processing of the data is both clear and precise.\n• The recording and processing of data shows evidence of an appropriate consideration of uncertainties.\n• The processing of data relevant to addressing the research question is carried out appropriately and accurately."
          }
        ]
      },
      {
        name: "Conclusion",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• A conclusion is stated that is relevant to the research question but is not supported by the analysis presented.\n• The conclusion makes superficial comparison to the accepted scientific context."
          },
          {
            marks: "3-4",
            descriptor: "• A conclusion is described that is relevant to the research question but is not fully consistent with the analysis presented.\n• A conclusion is described that makes some relevant comparison to the accepted scientific context."
          },
          {
            marks: "5-6",
            descriptor: "• A conclusion is justified that is relevant to the research question and fully consistent with the analysis presented.\n• A conclusion is justified through relevant comparison to the accepted scientific context."
          }
        ]
      },
      {
        name: "Evaluation",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• The report states generic methodological weaknesses or limitations.\n• Realistic improvements to the investigation are stated."
          },
          {
            marks: "3-4",
            descriptor: "• The report describes specific methodological weaknesses or limitations.\n• Realistic improvements to the investigation that are relevant to the identified weaknesses or limitations, are described."
          },
          {
            marks: "5-6",
            descriptor: "• The report explains the relative impact of specific methodological weaknesses or limitations.\n• Realistic improvements to the investigation, that are relevant to the identified weaknesses or limitations, are explained."
          }
        ]
      }
    ]
  },
  
  businessManagement: {
    subject: "Business Management",
    totalMarks: 25,
    guideReference: "Business Management Guide 2024",
    yearPublished: "2024",
    criteria: [
      {
        name: "Integration of a Key Concept",
        maxMarks: 5,
        weighting: 20,
        levels: [
          {
            marks: "0",
            descriptor: "Either the work does not reach a standard described by the descriptors below or the key concept identified is neither change, creativity, ethics nor sustainability."
          },
          {
            marks: "1",
            descriptor: "The student demonstrates knowledge of the key concept."
          },
          {
            marks: "2",
            descriptor: "The student describes the connection between the key concept and the organization under study."
          },
          {
            marks: "3",
            descriptor: "The student analyses the connection between the key concept and the organization under study."
          },
          {
            marks: "4",
            descriptor: "The student partially integrates the analysis of the connection between the key concept and the organization under study in the internal assessment."
          },
          {
            marks: "5",
            descriptor: "The student effectively integrates the analysis of the connection between the key concept and the organization under study throughout the internal assessment."
          }
        ]
      },
      {
        name: "Supporting Documents",
        maxMarks: 4,
        weighting: 16,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There are only one or two, or more than five, supporting documents or they are of marginal relevance."
          },
          {
            marks: "2",
            descriptor: "There are three to five supporting documents that are generally relevant but some lack depth."
          },
          {
            marks: "3",
            descriptor: "There are three to five supporting documents that are relevant and sufficiently in-depth."
          },
          {
            marks: "4",
            descriptor: "There are three to five supporting documents that are relevant, sufficiently in-depth and provide a range of ideas and views."
          }
        ]
      },
      {
        name: "Selection and Application of Tools and Theories",
        maxMarks: 4,
        weighting: 16,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There is a limited selection and application of business management tools and theories or these business management tools and theories are not relevant to the research question."
          },
          {
            marks: "2",
            descriptor: "There are some business management tools and theories selected and applied to the research question. Their relevance to the research question is superficial."
          },
          {
            marks: "3",
            descriptor: "The business management tools and theories are adequately selected and applied to the research question. Their relevance to the research question is not always clear."
          },
          {
            marks: "4",
            descriptor: "The business management tools and theories are effectively selected and applied with clear relevance to the research question."
          }
        ]
      },
      {
        name: "Analysis and Evaluation",
        maxMarks: 5,
        weighting: 20,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There is limited selection and use of data from the supporting documents with no analysis and evaluation of the research question."
          },
          {
            marks: "2",
            descriptor: "The selection and use of data from the supporting documents is superficial, leading to limited analysis and evaluation of the research question."
          },
          {
            marks: "3",
            descriptor: "The selection and use of data from the supporting documents is adequate with some analysis and evaluation of the research question."
          },
          {
            marks: "4",
            descriptor: "The selection and use of data from the supporting documents is sufficient, leading to a mostly effective analysis and evaluation of the research question with some integration of ideas."
          },
          {
            marks: "5",
            descriptor: "The selection and use of data from the supporting documents is effective, leading to a thorough analysis and evaluation of the research question. There is a sustained integration of ideas with consideration of the assumptions underpinning the arguments and implications."
          }
        ]
      },
      {
        name: "Conclusions",
        maxMarks: 3,
        weighting: 12,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "Conclusions are inconsistent with the evidence presented, or conclusions are superficial."
          },
          {
            marks: "2",
            descriptor: "Some conclusions are consistent with the evidence presented."
          },
          {
            marks: "3",
            descriptor: "Conclusions are consistent with the evidence presented and explicitly answer the research question."
          }
        ]
      },
      {
        name: "Structure",
        maxMarks: 2,
        weighting: 8,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "Limited structure."
          },
          {
            marks: "2",
            descriptor: "Appropriate structure."
          }
        ]
      },
      {
        name: "Presentation",
        maxMarks: 2,
        weighting: 8,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "One or more of the required elements of a well-presented research project is missing."
          },
          {
            marks: "2",
            descriptor: "All of the required elements of a well-presented research project are included."
          }
        ]
      }
    ]
  },
  
  economics: {
    subject: "Economics",
    totalMarks: 45,
    guideReference: "Economics Guide 2022",
    yearPublished: "2022",
    criteria: [
      {
        name: "Diagrams (per commentary)",
        maxMarks: 3,
        weighting: 21,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There is a diagram(s) included, but the diagram(s) is/are either inaccurate or not relevant to the article."
          },
          {
            marks: "2",
            descriptor: "There is an accurate diagram(s) that is/are relevant to the article, but the diagram(s) is/are not well explained."
          },
          {
            marks: "3",
            descriptor: "There is/are accurate and well-explained diagram(s) that is/are relevant to the article."
          }
        ]
      },
      {
        name: "Terminology (per commentary)",
        maxMarks: 2,
        weighting: 14,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There is limited use of appropriate terminology."
          },
          {
            marks: "2",
            descriptor: "Appropriate terminology is used throughout the commentary."
          }
        ]
      },
      {
        name: "Application and Analysis (per commentary)",
        maxMarks: 3,
        weighting: 21,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There is superficial understanding of the article, or the commentary is primarily descriptive with little analysis."
          },
          {
            marks: "2",
            descriptor: "There is satisfactory analysis of the article with some application of economic concepts and/or principles."
          },
          {
            marks: "3",
            descriptor: "There is effective analysis of the article with effective application of relevant economic concepts and/or principles."
          }
        ]
      },
      {
        name: "Key Concept (per commentary)",
        maxMarks: 3,
        weighting: 21,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There is some reference to a key concept that is mentioned in the syllabus for the section on which the article is based, but this reference is not explained."
          },
          {
            marks: "2",
            descriptor: "There is a reference to a relevant key concept that is mentioned in the syllabus for the section on which the article is based, and this reference is explained."
          },
          {
            marks: "3",
            descriptor: "There is a reference to a relevant key concept that is mentioned in the syllabus for the section on which the article is based, and this reference is clearly explained and applied to the article."
          }
        ]
      },
      {
        name: "Evaluation (per commentary)",
        maxMarks: 3,
        weighting: 21,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There are judgments presented but with little justification."
          },
          {
            marks: "2",
            descriptor: "There are judgments presented that are supported with relevant, but not entirely convincing, arguments."
          },
          {
            marks: "3",
            descriptor: "There are judgments presented that are supported with relevant and convincing arguments."
          }
        ]
      },
      {
        name: "Rubric Requirements (entire portfolio)",
        maxMarks: 3,
        weighting: 2,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "The portfolio does not meet two of the three rubric requirements."
          },
          {
            marks: "2",
            descriptor: "The portfolio does not meet one of the three rubric requirements."
          },
          {
            marks: "3",
            descriptor: "The portfolio meets all three rubric requirements."
          }
        ],
        clarifications: "Rubric requirements:\n1. Each article must be based on a different unit of the syllabus (excluding Unit 1: Introduction to economics)\n2. Students must use a different source for each commentary\n3. Articles must be contemporary (published no earlier than one year before writing the commentary)"
      }
    ]
  },
  
  history: {
    subject: "History",
    totalMarks: 25,
    guideReference: "History Guide 2020",
    yearPublished: "2020",
    criteria: [
      {
        name: "Identification and Evaluation of Sources",
        maxMarks: 6,
        weighting: 24,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "Sources are identified and the origin and purpose of sources is stated.\nThere is limited evaluation of the sources and little awareness of their value and limitations."
          },
          {
            marks: "3-4",
            descriptor: "Sources are identified and there is some comment on their origin and purpose.\nThere is some evaluation of the sources and some awareness of their value and limitations."
          },
          {
            marks: "5-6",
            descriptor: "Sources are clearly identified and there is detailed comment on their origin and purpose.\nThere is evaluation of the sources and awareness of their value and limitations."
          }
        ]
      },
      {
        name: "Investigation",
        maxMarks: 15,
        weighting: 60,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-4",
            descriptor: "The investigation is limited in scope or inappropriately narrow.\nThe response is descriptive in nature and lacks focus on the question.\nThere is little evidence of critical analysis."
          },
          {
            marks: "5-7",
            descriptor: "The investigation is satisfactory but the outcome may be unclear or not fully supported.\nThe response indicates awareness of the question and addresses it with some organization.\nThere is some evidence of critical analysis but this is not developed."
          },
          {
            marks: "8-10",
            descriptor: "The investigation demonstrates good awareness of the question and an attempt to reach an outcome.\nThe response is organized and there is a clear focus on the question.\nThere is some critical analysis supported by evidence."
          },
          {
            marks: "11-13",
            descriptor: "The investigation demonstrates clear awareness of the focus of the question and an attempt to reach a substantiated outcome.\nThe response is well organized, clearly expressed and structured.\nThere is critical analysis supported by relevant evidence."
          },
          {
            marks: "14-15",
            descriptor: "The investigation is clearly focused with a fully substantiated outcome.\nThe response is coherent, well structured and well focused on the question with developed critical analysis.\nMethods used are effective and there is a clear and coherent structure."
          }
        ]
      },
      {
        name: "Reflection",
        maxMarks: 4,
        weighting: 16,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "There is limited reflection on the methods used and what the investigation highlighted.\nThe reflection contains mainly descriptive not analytical points."
          },
          {
            marks: "3-4",
            descriptor: "There is some reflection on the methods used and what the investigation highlighted.\nThe reflection considers different perspectives and includes analytical points."
          }
        ]
      }
    ]
  },
  
  geography: {
    subject: "Geography",
    totalMarks: 25,
    guideReference: "Geography Guide 2019",
    yearPublished: "2019",
    criteria: [
      {
        name: "Fieldwork Question and Geographic Context",
        maxMarks: 3,
        weighting: 12,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach the standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "The fieldwork question is not formulated as a question or is not appropriately linked to the relevant syllabus topic or geographical theory.\nThe fieldwork question does not allow for the collection of primary data, does not include a location or is too broad to address within the limits of the internal assessment.\nNo locational map is included or the map is inappropriate for the fieldwork question."
          },
          {
            marks: "2",
            descriptor: "The fieldwork question is geographical, identifying an appropriate link to the relevant syllabus topic, the syllabus or geographical theory.\nThe fieldwork question identifies a specific location allowing for the collection of primary data and a question that can be addressed within the limits of an internal assessment.\nThe locational map is a copy of an existing map (for example, internet or satellite map) with too many unnecessary details or lacking mapping conventions."
          },
          {
            marks: "3",
            descriptor: "The link between the fieldwork question and the relevant syllabus topic, the syllabus or geographical theory is described. The link made to geographical theory allows for the possible formulation of hypotheses and predictions.\nThe fieldwork question is geographical and focused, clearly identifying a precise location allowing for primary data collection within the limits of the internal assessment.\nOne or more locational maps are presented and follow mapping conventions, providing clear information and details of the fieldwork location."
          }
        ]
      },
      {
        name: "Method(s) of Investigation",
        maxMarks: 3,
        weighting: 12,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach the standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "The method(s) used for information and data collection are listed or outlined, but are too general or vague or do not allow for the collection of enough information and data that are relevant to address the question formulated or the hypotheses.\nData collection technologies/instruments and sampling/surveying techniques are listed or outlined but are not correctly used."
          },
          {
            marks: "2",
            descriptor: "The method(s) used for information and data collection are described, outlining how the data collected is relevant to the question formulated and hypotheses.\nThe method(s), data collection instruments/technologies and sampling/surveying techniques are used correctly and allow for sufficient data for quantitative and/or qualitative analysis, but it may be minimal or only one or two variables are collected."
          },
          {
            marks: "3",
            descriptor: "The method(s) used for information and data collection are described, explaining clearly and accurately how the combination of data collected is relevant to the theory, question formulated or the hypotheses for the internal assessment. They may describe statistical tests if appropriate.\nThe method(s), data collection instruments/technologies and sampling/surveying techniques are used correctly, resulting in reliable and good quality primary data supporting a relevant quantitative and/or qualitative analysis."
          }
        ]
      },
      {
        name: "Quality and Treatment of Information Collected",
        maxMarks: 6,
        weighting: 24,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach the standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "The information and data collected is mostly not relevant, or not sufficient, to address the question or hypotheses formulated.\nThe information and data have mostly been presented in such a way that is either not appropriate for what has been collected or does not allow for analysis of the question formulated.\nThe graphs, tables, diagrams or other illustrations do not follow conventions (labelling, titles, and so on) or contain frequent errors."
          },
          {
            marks: "3-4",
            descriptor: "Most of the information and data collected is relevant to the question formulated or the hypotheses, allowing for partial analysis or answering of the question formulated.\nThe information and data have been presented in ways appropriate for the data type.\nThe graphs, tables, diagrams or other illustrations follow conventions (labelling, titles, and so on), with occasional errors."
          },
          {
            marks: "5-6",
            descriptor: "The information and data collected is all directly relevant to the question formulated or the hypotheses, and is sufficient in quantity and quality to allow for analysis or answering of the question formulated.\nThe most appropriate techniques have been used effectively for the presentation of information and data collected.\nThe graphs, tables, diagrams or other illustrations follow conventions (labelling, titles, and so on)."
          }
        ]
      },
      {
        name: "Written Analysis",
        maxMarks: 8,
        weighting: 32,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach the standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "The written analysis includes descriptive techniques that are not all appropriate to the data and the question formulated.\nThe data or information presented is outlined without explicit link to the question or hypotheses or geographical theory. Anomalies are not identified."
          },
          {
            marks: "3-4",
            descriptor: "The written analysis includes some descriptive statistics that are appropriate to the data and the question formulated.\nThe data or information presented is described with some link to the question or hypotheses or geographical theory. Anomalies may be identified but not explained."
          },
          {
            marks: "5-6",
            descriptor: "The written analysis includes appropriate descriptive and/or inferential statistical techniques.\nThe data or information is explained with adequate links to the question or hypotheses and geographical theory. Anomalies are described."
          },
          {
            marks: "7-8",
            descriptor: "The written analysis includes relevant and effective use of descriptive and/or inferential statistical techniques.\nThe data or information is analyzed with clear and effective links to the question or hypotheses and geographical theory. Anomalies are explained."
          }
        ]
      },
      {
        name: "Conclusion",
        maxMarks: 5,
        weighting: 20,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach the standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "The conclusion is stated and is relevant to the question but is not supported by evidence from the analysis.\nThe conclusion does not describe the geographical context."
          },
          {
            marks: "3-4",
            descriptor: "The conclusion is described and is relevant to the question and mostly supported by evidence from the analysis.\nThe conclusion describes the geographical context."
          },
          {
            marks: "5",
            descriptor: "The conclusion is fully justified, relevant to the question and fully supported by evidence from the analysis.\nThe conclusion explains the geographical context."
          }
        ]
      }
    ]
  },
  
  psychology: {
    subject: "Psychology",
    totalMarks: 22,
    guideReference: "Psychology Guide 2019",
    yearPublished: "2019",
    criteria: [
      {
        name: "Introduction",
        maxMarks: 6,
        weighting: 27,
        levels: [
          {
            marks: "0",
            descriptor: "Does not reach the standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "The aim of the investigation is stated but its relevance is not identified.\nThe theory or model upon which the student's investigation is based is identified but the description is incomplete or contains errors.\nNull or research hypothesis is stated, but does not correctly identify the Independent or Dependent Variables."
          },
          {
            marks: "3-4",
            descriptor: "The aim of the investigation is stated and its relevance is identified but not explained.\nThe theory or model upon which the student's investigation is based is described but the link to the student's investigation is not explained.\nThe Independent and Dependent Variables are correctly stated in the null or research hypothesis, but not operationalized."
          },
          {
            marks: "5-6",
            descriptor: "The aim of the investigation is stated and its relevance is explained.\nThe theory or model upon which the student's investigation is based is described and the link to the student's investigation is explained.\nThe Independent and Dependent Variables are stated and operationalized in the null or research hypothesis."
          }
        ]
      },
      {
        name: "Exploration",
        maxMarks: 4,
        weighting: 18,
        levels: [
          {
            marks: "0",
            descriptor: "Does not reach the standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "The research design is described.\nThe sampling technique is described.\nCharacteristics of the participants are described.\nControlled variables are described.\nThe materials used are described."
          },
          {
            marks: "3-4",
            descriptor: "The research design is explained.\nThe sampling technique is explained.\nThe choice of participants is explained.\nControlled variables are explained.\nThe choice of materials is explained."
          }
        ]
      },
      {
        name: "Analysis",
        maxMarks: 6,
        weighting: 27,
        levels: [
          {
            marks: "0",
            descriptor: "Does not reach the standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "Only descriptive or inferential statistics are applied.\nA correct graphing technique is chosen but the graph does not address the hypothesis.\nThere is no clear statement of findings."
          },
          {
            marks: "3-4",
            descriptor: "Appropriate descriptive and inferential statistics are applied but there are errors.\nThe graph addresses the hypothesis but contains errors.\nThe statistical findings are stated but either not interpreted with regard to the data or not linked to the hypothesis."
          },
          {
            marks: "5-6",
            descriptor: "Descriptive and inferential statistics are appropriately and accurately applied.\nThe graph is correctly presented and addresses the hypothesis.\nThe statistical findings are interpreted with regard to the data and linked to the hypothesis."
          }
        ]
      },
      {
        name: "Evaluation",
        maxMarks: 6,
        weighting: 27,
        levels: [
          {
            marks: "0",
            descriptor: "Does not reach the standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "The findings of the student's investigation are described without reference to the background theory or model.\nStrengths and limitations of the design, sample or procedure are stated but are not directly relevant to the hypothesis.\nOne or more modifications are stated."
          },
          {
            marks: "3-4",
            descriptor: "The findings of the student's investigation are described with reference to the background theory or model.\nStrengths and limitations of the design, sample or procedure are stated and described and relevant to the investigation.\nModifications are described but not explicitly linked to the limitations of the student's investigation."
          },
          {
            marks: "5-6",
            descriptor: "The findings of the student's investigation are discussed with reference to the background theory or model.\nStrengths and limitations of the design, sample and procedure are stated and explained and relevant to the investigation.\nModifications are explicitly linked to the limitations of the student's investigation and fully justified."
          }
        ]
      }
    ]
  },
  
  sehs: {
    subject: "Sports, Exercise and Health Science",
    totalMarks: 24,
    guideReference: "SEHS Guide 2026",
    yearPublished: "2026",
    criteria: [
      {
        name: "Research Design",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach the standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• The research question is stated without context.\n• Methodological considerations associated with collecting data relevant to the research question are stated.\n• The description of the methodology for collecting or selecting data lacks the detail to allow for the investigation to be reproduced."
          },
          {
            marks: "3-4",
            descriptor: "• The research question is outlined within a broad context.\n• Methodological considerations associated with collecting relevant and sufficient data to answer the research question are described.\n• The description of the methodology for collecting or selecting data allows for the investigation to be reproduced with few ambiguities or omissions."
          },
          {
            marks: "5-6",
            descriptor: "• The research question is described within a specific and appropriate context.\n• Methodological considerations associated with collecting relevant and sufficient data to answer the research question are explained.\n• The description of the methodology for collecting or selecting data allows for the investigation to be reproduced."
          }
        ],
        clarifications: "Research question with context should contain reference to the dependent and independent variables or two correlated variables, include a concise description of the system in which the research question is embedded, and include background theory of direct relevance.\n\nMethodological considerations include: selection of methods for measuring variables, selection of databases or model, decisions regarding scope/quantity/quality of measurements, identification and control of control variables, recognition of safety/ethical/environmental issues."
      },
      {
        name: "Data Analysis",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• The recording and processing of the data is communicated but is neither clear nor precise.\n• The recording and processing of data shows limited evidence of the consideration of uncertainties.\n• Some processing of data relevant to addressing the research question is carried out but with major omissions, inaccuracies or inconsistencies."
          },
          {
            marks: "3-4",
            descriptor: "• The communication of the recording and processing of the data is either clear or precise.\n• The recording and processing of data shows evidence of a consideration of uncertainties but with some significant omissions or inaccuracies.\n• The processing of data relevant to addressing the research question is carried out but with some significant omissions, inaccuracies or inconsistencies."
          },
          {
            marks: "5-6",
            descriptor: "• The communication of the recording and processing of the data is both clear and precise.\n• The recording and processing of data shows evidence of an appropriate consideration of uncertainties.\n• The processing of data relevant to addressing the research question is carried out appropriately and accurately."
          }
        ]
      },
      {
        name: "Conclusion",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• A conclusion is stated that is relevant to the research question but is not supported by the analysis presented.\n• The conclusion makes superficial comparison to the accepted scientific context.\n• Practical implications of the findings are stated."
          },
          {
            marks: "3-4",
            descriptor: "• A conclusion is described that is relevant to the research question but is not fully consistent with the analysis presented.\n• A conclusion is described that makes some relevant comparison to the accepted scientific context.\n• Practical implications of the findings are outlined."
          },
          {
            marks: "5-6",
            descriptor: "• A conclusion is justified that is relevant to the research question and fully consistent with the analysis presented.\n• A conclusion is justified through relevant comparison to the accepted scientific context.\n• Practical implications of the findings are explained."
          }
        ],
        clarifications: "Practical implications refer to real-world applications related to health or performance."
      },
      {
        name: "Evaluation",
        maxMarks: 6,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The report does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "• The report states generic methodological weaknesses or limitations.\n• Realistic improvements to the investigation are stated."
          },
          {
            marks: "3-4",
            descriptor: "• The report describes specific methodological weaknesses or limitations.\n• Realistic improvements to the investigation that are relevant to the identified weaknesses or limitations are described."
          },
          {
            marks: "5-6",
            descriptor: "• The report explains the relative impact of specific methodological weaknesses or limitations.\n• Realistic improvements to the investigation that are relevant to the identified weaknesses or limitations are explained."
          }
        ]
      }
    ]
  },
  
  mathAA: {
    subject: "Mathematics: Analysis and Approaches",
    totalMarks: 20,
    guideReference: "Math AA Guide 2021",
    yearPublished: "2021",
    criteria: [
      {
        name: "Communication",
        maxMarks: 4,
        weighting: 20,
        levels: [
          {
            marks: "0",
            descriptor: "The exploration does not reach the standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "The exploration has some coherence.\nSome reasoning or rationale is evident."
          },
          {
            marks: "2",
            descriptor: "The exploration has some coherence and shows some organization.\nReasoning or rationale is present."
          },
          {
            marks: "3",
            descriptor: "The exploration is coherent and well organized.\nReaso ning and rationale are evident throughout."
          },
          {
            marks: "4",
            descriptor: "The exploration is coherent, well organized, concise and complete.\nReasoning and rationale are evident and demonstrate personal engagement.\nConsistent and appropriate use of mathematical language and representation throughout."
          }
        ]
      },
      {
        name: "Mathematical Presentation",
        maxMarks: 4,
        weighting: 20,
        levels: [
          {
            marks: "0",
            descriptor: "The exploration does not reach the standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There is some appropriate mathematical presentation.\nNotation and terminology are sometimes appropriate.\nDeductions may be incorrect, ambiguous or unclear."
          },
          {
            marks: "2",
            descriptor: "There is appropriate and consistent mathematical presentation.\nNotation and terminology are appropriate throughout.\nKey statements are cited, but deductions may not be clearly explained."
          },
          {
            marks: "3",
            descriptor: "There is appropriate and consistent mathematical presentation.\nNotation and terminology are appropriate throughout.\nStatements are clear and conclusions are consistent."
          },
          {
            marks: "4",
            descriptor: "Mathematical presentation is precise and consistent throughout.\nNotation and terminology are appropriate and are used correctly.\nStatements are clear, complete and justified, with coherent argument."
          }
        ]
      },
      {
        name: "Personal Engagement",
        maxMarks: 3,
        weighting: 15,
        levels: [
          {
            marks: "0",
            descriptor: "The exploration does not reach the standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There is evidence of some personal engagement."
          },
          {
            marks: "2",
            descriptor: "There is evidence of significant personal engagement."
          },
          {
            marks: "3",
            descriptor: "There is abundant evidence of outstanding personal engagement."
          }
        ],
        clarifications: "Personal engagement may be demonstrated through:\n• Thinking independently and creatively\n• Addressing personal interest\n• Presenting mathematical ideas in their own way\n• Exploring the topic from different perspectives\n• Asking questions, making conjectures"
      },
      {
        name: "Reflection",
        maxMarks: 3,
        weighting: 15,
        levels: [
          {
            marks: "0",
            descriptor: "The exploration does not reach the standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There is evidence of limited or superficial reflection."
          },
          {
            marks: "2",
            descriptor: "There is evidence of meaningful reflection."
          },
          {
            marks: "3",
            descriptor: "There is substantial evidence of critical reflection."
          }
        ],
        clarifications: "Reflection may be demonstrated through:\n• Considering what has been learned\n• Considering strengths and weaknesses\n• Considering different perspectives\n• Considering the significance of results"
      },
      {
        name: "Use of Mathematics",
        maxMarks: 6,
        weighting: 30,
        levels: [
          {
            marks: "0",
            descriptor: "The exploration does not reach the standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "Some relevant mathematics is used.\nLimited understanding is demonstrated."
          },
          {
            marks: "2",
            descriptor: "Some relevant mathematics is used.\nLimited understanding is demonstrated.\nSome knowledge of mathematics is demonstrated."
          },
          {
            marks: "3",
            descriptor: "Relevant mathematics commensurate with the level of the course is used.\nLimited understanding is demonstrated.\nThe mathematics explored is correct.\nThere is some justification of mathematical results."
          },
          {
            marks: "4",
            descriptor: "Relevant mathematics commensurate with the level of the course is used.\nThe mathematics explored is correct.\nThere is a clear understanding of mathematical results."
          },
          {
            marks: "5",
            descriptor: "Relevant mathematics commensurate with the level of the course is used.\nThe mathematics explored is correct.\nThere is a clear understanding and sophisticated knowledge of mathematical results.\nThe mathematics used is precise and appropriate."
          },
          {
            marks: "6",
            descriptor: "Relevant mathematics commensurate with the level of the course is used.\nThe mathematics explored is correct.\nThere is a clear understanding and sophisticated knowledge of mathematical results.\nThe mathematics used is precise, appropriate and elegant."
          }
        ]
      }
    ]
  },
  
  mathAI: {
    subject: "Mathematics: Applications and Interpretation",
    totalMarks: 20,
    guideReference: "Math AI Guide 2021",
    yearPublished: "2021",
    criteria: [
      {
        name: "Communication",
        maxMarks: 4,
        weighting: 20,
        levels: [
          {
            marks: "0",
            descriptor: "The exploration does not reach the standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "The exploration has some coherence.\nSome reasoning or rationale is evident."
          },
          {
            marks: "2",
            descriptor: "The exploration has some coherence and shows some organization.\nReasoning or rationale is present."
          },
          {
            marks: "3",
            descriptor: "The exploration is coherent and well organized.\nReasoning and rationale are evident throughout."
          },
          {
            marks: "4",
            descriptor: "The exploration is coherent, well organized, concise and complete.\nReasoning and rationale are evident and demonstrate personal engagement.\nConsistent and appropriate use of mathematical language and representation throughout."
          }
        ]
      },
      {
        name: "Mathematical Presentation",
        maxMarks: 4,
        weighting: 20,
        levels: [
          {
            marks: "0",
            descriptor: "The exploration does not reach the standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There is some appropriate mathematical presentation.\nNotation and terminology are sometimes appropriate.\nDeductions may be incorrect, ambiguous or unclear."
          },
          {
            marks: "2",
            descriptor: "There is appropriate and consistent mathematical presentation.\nNotation and terminology are appropriate throughout.\nKey statements are cited, but deductions may not be clearly explained."
          },
          {
            marks: "3",
            descriptor: "There is appropriate and consistent mathematical presentation.\nNotation and terminology are appropriate throughout.\nStatements are clear and conclusions are consistent."
          },
          {
            marks: "4",
            descriptor: "Mathematical presentation is precise and consistent throughout.\nNotation and terminology are appropriate and are used correctly.\nStatements are clear, complete and justified, with coherent argument."
          }
        ]
      },
      {
        name: "Personal Engagement",
        maxMarks: 3,
        weighting: 15,
        levels: [
          {
            marks: "0",
            descriptor: "The exploration does not reach the standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There is evidence of some personal engagement."
          },
          {
            marks: "2",
            descriptor: "There is evidence of significant personal engagement."
          },
          {
            marks: "3",
            descriptor: "There is abundant evidence of outstanding personal engagement."
          }
        ],
        clarifications: "Personal engagement may be demonstrated through:\n• Thinking independently and creatively\n• Addressing personal interest\n• Presenting mathematical ideas in their own way\n• Exploring the topic from different perspectives\n• Asking questions, making conjectures"
      },
      {
        name: "Reflection",
        maxMarks: 3,
        weighting: 15,
        levels: [
          {
            marks: "0",
            descriptor: "The exploration does not reach the standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "There is evidence of limited or superficial reflection."
          },
          {
            marks: "2",
            descriptor: "There is evidence of meaningful reflection."
          },
          {
            marks: "3",
            descriptor: "There is substantial evidence of critical reflection."
          }
        ],
        clarifications: "Reflection may be demonstrated through:\n• Considering what has been learned\n• Considering strengths and weaknesses\n• Considering different perspectives\n• Considering the significance of results"
      },
      {
        name: "Use of Mathematics",
        maxMarks: 6,
        weighting: 30,
        levels: [
          {
            marks: "0",
            descriptor: "The exploration does not reach the standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "Some relevant mathematics is used.\nLimited understanding is demonstrated."
          },
          {
            marks: "2",
            descriptor: "Some relevant mathematics is used.\nLimited understanding is demonstrated.\nSome knowledge of mathematics is demonstrated."
          },
          {
            marks: "3",
            descriptor: "Relevant mathematics commensurate with the level of the course is used.\nLimited understanding is demonstrated.\nThe mathematics explored is correct.\nThere is some justification of mathematical results."
          },
          {
            marks: "4",
            descriptor: "Relevant mathematics commensurate with the level of the course is used.\nThe mathematics explored is correct.\nThere is a clear understanding of mathematical results."
          },
          {
            marks: "5",
            descriptor: "Relevant mathematics commensurate with the level of the course is used.\nThe mathematics explored is correct.\nThere is a clear understanding and sophisticated knowledge of mathematical results.\nThe mathematics used is precise and appropriate."
          },
          {
            marks: "6",
            descriptor: "Relevant mathematics commensurate with the level of the course is used.\nThe mathematics explored is correct.\nThere is a clear understanding and sophisticated knowledge of mathematical results.\nThe mathematics used is precise, appropriate and elegant."
          }
        ]
      }
    ]
  },
  
  languageALangLit: {
    subject: "Language A: Language and Literature",
    totalMarks: 40,
    guideReference: "Language A Guide 2021",
    yearPublished: "2021",
    criteria: [
      {
        name: "Knowledge, Understanding and Interpretation",
        maxMarks: 10,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "There is little knowledge and understanding of the extracts and the works/texts in relation to the global issue.\nReferences to the extracts and to the works/texts are infrequent or are rarely appropriate."
          },
          {
            marks: "3-4",
            descriptor: "There is some knowledge and understanding of the extracts and the works/texts in relation to the global issue.\nReferences to the extracts and to the works/texts are at times appropriate."
          },
          {
            marks: "5-6",
            descriptor: "There is satisfactory knowledge and understanding of the extracts and the works/texts and an interpretation of their implications in relation to the global issue.\nReferences to the extracts and to the works/texts are generally relevant and mostly support the candidate's ideas."
          },
          {
            marks: "7-8",
            descriptor: "There is good knowledge and understanding of the extracts and the works/texts and a sustained interpretation of their implications in relation to the global issue.\nReferences to the extracts and to the works/texts are relevant and support the candidate's ideas."
          },
          {
            marks: "9-10",
            descriptor: "There is excellent knowledge and understanding of the extracts and of the works/texts and a persuasive interpretation of their implications in relation to the global issue.\nReferences to the extracts and to the works/texts are well-chosen and effectively support the candidate's ideas."
          }
        ]
      },
      {
        name: "Analysis and Evaluation",
        maxMarks: 10,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "The oral is descriptive or contains no relevant analysis.\nAuthorial choices are seldom identified and, if so, are poorly understood in relation to the presentation of the global issue."
          },
          {
            marks: "3-4",
            descriptor: "The oral contains some relevant analysis, but it is reliant on description.\nAuthorial choices are identified, but are vaguely treated and/or only partially understood in relation to the presentation of the global issue."
          },
          {
            marks: "5-6",
            descriptor: "The oral is analytical in nature, and evaluation of the extracts and their works/texts is mostly relevant.\nAuthorial choices are identified and reasonably understood in relation to the presentation of the global issue."
          },
          {
            marks: "7-8",
            descriptor: "Analysis and evaluation of the extracts and their works/texts are relevant and at times insightful.\nThere is a good understanding of how authorial choices are used to present the global issue."
          },
          {
            marks: "9-10",
            descriptor: "Analysis and evaluation of the extracts and their works/texts are relevant and insightful.\nThere is a thorough and nuanced understanding of how authorial choices are used to present the global issue."
          }
        ]
      },
      {
        name: "Focus and Organization",
        maxMarks: 10,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "The oral rarely focuses on the task. There are few connections between ideas."
          },
          {
            marks: "3-4",
            descriptor: "The oral only sometimes focuses on the task, and treatment of the extracts, and of the works/texts may be unbalanced.\nThere are some connections between ideas, but these are not always coherent."
          },
          {
            marks: "5-6",
            descriptor: "The oral maintains a focus on the task, despite some lapses; treatment of the extracts and works/texts is mostly balanced.\nThe development of ideas is mostly logical; ideas are generally connected in a cohesive manner."
          },
          {
            marks: "7-8",
            descriptor: "The oral maintains a mostly clear and sustained focus on the task; treatment of the extracts and works/texts is balanced.\nThe development of ideas is logical; ideas are cohesively connected in an effective manner."
          },
          {
            marks: "9-10",
            descriptor: "The oral maintains a clear and sustained focus on the task; treatment of the extracts and works/texts is well-balanced.\nThe development of ideas is logical and convincing; ideas are connected in a cogent manner."
          }
        ]
      },
      {
        name: "Language",
        maxMarks: 10,
        weighting: 25,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "The language is rarely clear or accurate; errors often hinder communication. Vocabulary and syntax are imprecise and frequently inaccurate.\nElements of style (for example, register, tone and rhetorical devices) are inappropriate to the task and detract from the oral."
          },
          {
            marks: "3-4",
            descriptor: "The language is generally clear; errors sometimes hinder communication. Vocabulary and syntax are often imprecise with inaccuracies.\nElements of style (for example, register, tone and rhetorical devices) are often inappropriate to the task and detract from the oral."
          },
          {
            marks: "5-6",
            descriptor: "The language is clear; errors do not hinder communication. Vocabulary and syntax are appropriate to the task but simple and repetitive.\nElements of style (for example, register, tone and rhetorical devices) are appropriate to the task and neither enhance nor detract from the oral."
          },
          {
            marks: "7-8",
            descriptor: "The language is clear and accurate; occasional errors do not hinder communication. Vocabulary and syntax are appropriate and varied.\nElements of style (for example, register, tone and rhetorical devices) are appropriate to the task and somewhat enhance the oral."
          },
          {
            marks: "9-10",
            descriptor: "The language is clear, accurate and varied; occasional errors do not hinder communication. Vocabulary and syntax are varied and create effect.\nElements of style (for example, register, tone and rhetorical devices) are appropriate to the task and enhance the oral."
          }
        ]
      }
    ]
  },
  
  visualArts: {
    subject: "Visual Arts",
    totalMarks: 30,
    guideReference: "Visual Arts Guide 2017",
    yearPublished: "2017",
    criteria: [
      {
        name: "Coherent Body of Works",
        maxMarks: 9,
        weighting: 30,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard identified by the descriptors below."
          },
          {
            marks: "1-3",
            descriptor: "The work shows little coherence through minimal communication of thematic or stylistic relationships across individual pieces. The selection and application of media, processes and techniques and the use of imagery show minimal consideration of intentions."
          },
          {
            marks: "4-6",
            descriptor: "The work shows some coherence through adequate communication of thematic or stylistic relationships across individual pieces. Stated intentions are adequately fulfilled through the selection and application of media, processes and techniques and the considered use of imagery."
          },
          {
            marks: "7-9",
            descriptor: "The work forms a coherent body of work through effective communication of thematic or stylistic relationships across individual pieces. Stated intentions are consistently and effectively fulfilled through the selection and application of media, processes and techniques and the considered use of imagery."
          }
        ]
      },
      {
        name: "Technical Competence",
        maxMarks: 9,
        weighting: 30,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard identified by the descriptors below."
          },
          {
            marks: "1-3",
            descriptor: "The work demonstrates minimal application and manipulation of media and materials to reach a minimal level of technical competence in the chosen forms and the minimal application and manipulation of the formal qualities."
          },
          {
            marks: "4-6",
            descriptor: "The work demonstrates adequate application and manipulation of media and materials to reach an acceptable level of technical competence in the chosen forms and the adequate application and manipulation of the formal qualities."
          },
          {
            marks: "7-9",
            descriptor: "The work demonstrates effective application and manipulation of media and materials to reach an assured level of technical competence in the chosen forms and the effective application and manipulation of the formal qualities."
          }
        ]
      },
      {
        name: "Conceptual Qualities",
        maxMarks: 9,
        weighting: 30,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard identified by the descriptors below."
          },
          {
            marks: "1-3",
            descriptor: "The work demonstrates minimal elaboration of ideas, themes or concepts and demonstrates minimal use of imagery, signs or symbols, or the imagery, signs or symbols used are obvious, contrived or superficial. There is minimal communication of artistic intentions."
          },
          {
            marks: "4-6",
            descriptor: "The work visually elaborates some ideas, themes or concepts to a point of adequate realization and demonstrates the use of imagery, signs or symbols that result in adequate communication of stated artistic intentions."
          },
          {
            marks: "7-9",
            descriptor: "The work visually elaborates ideas, themes or concepts to a sophisticated point of effective realization and demonstrates the subtle use of complex imagery, signs or symbols that result in effective communication of stated artistic intentions."
          }
        ]
      },
      {
        name: "Curatorial Practice",
        maxMarks: 3,
        weighting: 10,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard identified by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "The curatorial rationale partially justifies the selection and arrangement of the exhibited works as appropriate to the student's stated intentions, or the curatorial rationale may not be an accurate representation of the exhibition."
          },
          {
            marks: "2",
            descriptor: "The curatorial rationale mostly justifies the selection and arrangement of the exhibited works, which are presented and arranged in line with the student's stated intentions in the space made available to the student."
          },
          {
            marks: "3",
            descriptor: "The curatorial rationale fully justifies the selection and arrangement of the exhibited works, which are presented and arranged clearly, as appropriate to the student's stated intentions within the space made available to the student."
          }
        ]
      }
    ]
  },
  
  languageB: {
    subject: "Language B",
    totalMarks: 30,
    guideReference: "Language B Guide 2020",
    yearPublished: "2020",
    criteria: [
      {
        name: "Language",
        maxMarks: 12,
        weighting: 40,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-3",
            descriptor: "Command of the language is limited.\nVocabulary is sometimes appropriate to the task.\nBasic grammatical structures are used.\nLanguage contains errors in basic structures. Errors interfere with communication."
          },
          {
            marks: "4-6",
            descriptor: "Command of the language is partially effective.\nVocabulary is appropriate to the task.\nSome basic grammatical structures are used, with some attempts to use more complex structures.\nLanguage is mostly accurate for basic structures, but errors occur in more complex structures. Errors at times interfere with communication."
          },
          {
            marks: "7-9",
            descriptor: "Command of the language is effective and mostly accurate.\nVocabulary is appropriate to the task, and varied.\nA variety of basic and more complex grammatical structures is used.\nLanguage is mostly accurate. Occasional errors in basic and in complex grammatical structures do not interfere with communication."
          },
          {
            marks: "10-12",
            descriptor: "Command of the language is mostly accurate and very effective.\nVocabulary is appropriate to the task, and varied, including the use of idiomatic expressions.\nA variety of basic and more complex grammatical structures is used effectively.\nLanguage is mostly accurate. Minor errors in more complex grammatical structures do not interfere with communication."
          }
        ]
      },
      {
        name: "Message",
        maxMarks: 12,
        weighting: 40,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-3",
            descriptor: "The task is partially fulfilled.\nFew ideas are relevant to the task.\nIdeas are stated, but with no development.\nIdeas are not clearly presented and do not follow a logical structure, making the message difficult to determine."
          },
          {
            marks: "4-6",
            descriptor: "The task is generally fulfilled.\nSome ideas are relevant to the task.\nIdeas are outlined, but are not fully developed.\nIdeas are generally clearly presented and the response is generally structured in a logical manner, leading to a mostly successful delivery of the message."
          },
          {
            marks: "7-9",
            descriptor: "The task is fulfilled.\nMost ideas are relevant to the task.\nIdeas are developed well, with some detail and examples.\nIdeas are clearly presented and the response is structured in a logical manner, supporting the delivery of the message."
          },
          {
            marks: "10-12",
            descriptor: "The task is fulfilled effectively.\nIdeas are relevant to the task.\nIdeas are fully developed, providing details and relevant examples.\nIdeas are clearly presented and the response is structured in a logical and coherent manner that supports the delivery of the message."
          }
        ]
      },
      {
        name: "Conceptual Understanding",
        maxMarks: 6,
        weighting: 20,
        levels: [
          {
            marks: "0",
            descriptor: "The work does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "Conceptual understanding is limited.\nThe choice of text type is generally inappropriate to the context, purpose or audience.\nThe register and tone are inappropriate to the context, purpose and audience of the task.\nThe response incorporates limited recognizable conventions of the chosen text type."
          },
          {
            marks: "3-4",
            descriptor: "Conceptual understanding is mostly demonstrated.\nThe choice of text type is generally appropriate to the context, purpose and audience.\nThe register and tone, while occasionally appropriate to the context, purpose and audience of the task, fluctuate throughout the response.\nThe response incorporates some conventions of the chosen text type."
          },
          {
            marks: "5-6",
            descriptor: "Conceptual understanding is fully demonstrated.\nThe choice of text type is appropriate to the context, purpose and audience.\nThe register and tone are appropriate to the context, purpose and audience of the task.\nThe response fully incorporates the conventions of the chosen text type."
          }
        ]
      }
    ]
  },
  
  computerScience: {
    subject: "Computer Science",
    totalMarks: 34,
    guideReference: "Computer Science Guide 2014",
    yearPublished: "2014",
    criteria: [
      {
        name: "Planning",
        maxMarks: 6,
        weighting: 18,
        levels: [
          {
            marks: "0",
            descriptor: "The student does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "The student produces a limited rationale for a proposed solution.\nThe student lists some of the success criteria for the proposed solution.\nThe student presents a rudimentary or limited record of tasks that need to be completed to achieve the proposed solution."
          },
          {
            marks: "3-4",
            descriptor: "The student produces a satisfactory rationale for a proposed solution to an identified problem.\nThe student adequately describes some success criteria for the proposed solution.\nThe student presents a satisfactory record of tasks needed to create the proposed solution."
          },
          {
            marks: "5-6",
            descriptor: "The student produces a detailed rationale for a proposed solution to an identified problem.\nThe student fully describes the success criteria for the proposed solution.\nThe student presents a detailed record of tasks needed to create the proposed solution."
          }
        ]
      },
      {
        name: "Solution Overview",
        maxMarks: 6,
        weighting: 18,
        levels: [
          {
            marks: "0",
            descriptor: "The student does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "The student presents a design overview that outlines some algorithms that will be used in the solution.\nThe student lists some tools that will be used for the solution."
          },
          {
            marks: "3-4",
            descriptor: "The student presents a design overview that describes in adequate detail the algorithms, techniques and tools that will be used in the solution."
          },
          {
            marks: "5-6",
            descriptor: "The student presents a design overview that describes in detail the algorithms, techniques and tools that will be used in the solution, justifying their appropriateness."
          }
        ]
      },
      {
        name: "Development",
        maxMarks: 12,
        weighting: 35,
        levels: [
          {
            marks: "0",
            descriptor: "The student does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-4",
            descriptor: "The student outlines the use of techniques used in developing the product.\nThe student outlines techniques used to test the product.\nThe student outlines stages of the development process."
          },
          {
            marks: "5-8",
            descriptor: "The student describes the use of appropriate techniques used in developing the product.\nThe student describes appropriate techniques used to test the product.\nThe student describes stages in the development process.\nThe student explains the development of complex techniques as they are applied to the product."
          },
          {
            marks: "9-12",
            descriptor: "The student explains the use of appropriate and complex techniques used in developing the product.\nThe student explains appropriate techniques used to test the product.\nThe student explains in detail stages in the development process.\nThe student explains the development of complex techniques as they are applied to the product."
          }
        ]
      },
      {
        name: "Functionality and Extensibility of Product",
        maxMarks: 6,
        weighting: 18,
        levels: [
          {
            marks: "0",
            descriptor: "The student does not reach a standard described by the descriptors below."
          },
          {
            marks: "1-2",
            descriptor: "The student produces a product of limited functionality that partially addresses the task.\nThe product is not sufficiently sophisticated or extensible."
          },
          {
            marks: "3-4",
            descriptor: "The student produces a product of satisfactory functionality that addresses the task.\nThe product demonstrates adequate sophistication and is reasonably extensible."
          },
          {
            marks: "5-6",
            descriptor: "The student produces a product of good functionality that fully addresses the task.\nThe product demonstrates sophisticated techniques and is highly extensible."
          }
        ]
      },
      {
        name: "Evaluation",
        maxMarks: 4,
        weighting: 12,
        levels: [
          {
            marks: "0",
            descriptor: "The student does not reach a standard described by the descriptors below."
          },
          {
            marks: "1",
            descriptor: "The student evaluates the success of the product by referring to the success criteria.\nThe student receives some feedback from the client/adviser."
          },
          {
            marks: "2",
            descriptor: "The student evaluates the success of the product by referring to the success criteria and makes some suggestions for improvements.\nThe student receives some feedback from the client/adviser and uses this to inform suggestions for further development of the product."
          },
          {
            marks: "3",
            descriptor: "The student evaluates the success of the product by referring in detail to the success criteria and makes suggestions for improvements.\nThe student receives feedback from the client/adviser and uses this to inform further developments of the product."
          },
          {
            marks: "4",
            descriptor: "The student evaluates the success of the product by critically referring in detail to the success criteria and makes realistic suggestions for improvements.\nThe student receives feedback from the client/adviser and uses this critically to inform further developments of the product."
          }
        ]
      }
    ]
  }
};

export default iaCriteriaData;
