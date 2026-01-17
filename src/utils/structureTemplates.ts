// Utility to generate initial draft content from IA/Essay structure data
import { iaEssayStructureData, SubjectStructure, StructureSection } from "@/data/iaEssayStructureData";

// Map subject values from database enum to structure data keys
const subjectToStructureKey: Record<string, string> = {
  // Core subjects
  "tok": "tok-essay",
  "ee": "extended-essay",
  
  // Group 1: Language and Literature
  "english_a": "english-a-literature-hl-essay",
  "lang_a_literature": "english-a-literature-hl-essay",
  "lang_a_lang_lit": "english-a-literature-hl-essay",
  "literature_performance": "english-a-literature-hl-essay",
  
  // Group 2: Language Acquisition
  "french_b": "language-b-written-assignment",
  "spanish_b": "language-b-written-assignment",
  "swedish_b": "language-b-written-assignment",
  "english_b": "language-b-written-assignment",
  "german_b": "language-b-written-assignment",
  "italian_b": "language-b-written-assignment",
  "japanese_b": "language-b-written-assignment",
  "mandarin_b": "language-b-written-assignment",
  "other_b": "language-b-written-assignment",
  
  // Group 2: Classical Languages
  "latin": "english-a-literature-hl-essay",
  "classical_greek": "english-a-literature-hl-essay",
  
  // Group 2: Ab Initio
  "arabic_ab": "language-b-written-assignment",
  "chinese_ab": "language-b-written-assignment",
  "french_ab": "language-b-written-assignment",
  "german_ab": "language-b-written-assignment",
  "hindi_ab": "language-b-written-assignment",
  "japanese_ab": "language-b-written-assignment",
  "korean_ab": "language-b-written-assignment",
  "portuguese_ab": "language-b-written-assignment",
  "russian_ab": "language-b-written-assignment",
  "spanish_ab": "language-b-written-assignment",
  "other_ab": "language-b-written-assignment",
  
  // Group 3: Individuals and Societies
  "history": "history-ia",
  "economics": "economics-ia",
  "geography": "geography-ia",
  "business_management": "business-management-ia",
  "psychology": "psychology-ia",
  "global_politics": "psychology-ia",
  "philosophy": "psychology-ia",
  "social_cultural_anthropology": "psychology-ia",
  "world_religions": "psychology-ia",
  "digital_society": "psychology-ia",
  
  // Group 4: Sciences
  "biology": "biology-ia",
  "chemistry": "chemistry-ia",
  "physics": "physics-ia",
  "sehs": "biology-ia", // Sports, Exercise and Health Science
  "computer_science": "computer-science-ia",
  "design_technology": "biology-ia",
  "ess": "biology-ia",
  
  // Group 5: Mathematics
  "math_aa": "math-aa-ia",
  "math_ai": "math-ai-ia",
  
  // Group 6: Arts
  "visual_arts": "english-a-literature-hl-essay", // Use essay template
  "drama": "english-a-literature-hl-essay",
  "music": "english-a-literature-hl-essay",
  "theatre": "english-a-literature-hl-essay",
  "dance": "english-a-literature-hl-essay",
  "film": "english-a-literature-hl-essay",
  
  // Other
  "other": "english-a-literature-hl-essay",
};

// Map for Extended Essay (EE) task type
const subjectToEEKey: Record<string, string> = {
  "english_a": "extended-essay",
  "lang_a_literature": "extended-essay",
  "lang_a_lang_lit": "extended-essay",
  "literature_performance": "extended-essay",
  "french_b": "extended-essay",
  "spanish_b": "extended-essay",
  "swedish_b": "extended-essay",
  "english_b": "extended-essay",
  "german_b": "extended-essay",
  "italian_b": "extended-essay",
  "japanese_b": "extended-essay",
  "mandarin_b": "extended-essay",
  "other_b": "extended-essay",
  "latin": "extended-essay",
  "classical_greek": "extended-essay",
  "history": "extended-essay",
  "economics": "extended-essay",
  "geography": "extended-essay",
  "business_management": "extended-essay",
  "psychology": "extended-essay",
  "global_politics": "extended-essay",
  "philosophy": "extended-essay",
  "social_cultural_anthropology": "extended-essay",
  "world_religions": "extended-essay",
  "digital_society": "extended-essay",
  "biology": "extended-essay",
  "chemistry": "extended-essay",
  "physics": "extended-essay",
  "sehs": "extended-essay",
  "computer_science": "extended-essay",
  "design_technology": "extended-essay",
  "ess": "extended-essay",
  "math_aa": "extended-essay",
  "math_ai": "extended-essay",
  "visual_arts": "extended-essay",
  "drama": "extended-essay",
  "music": "extended-essay",
  "theatre": "extended-essay",
  "dance": "extended-essay",
  "film": "extended-essay",
  "other": "extended-essay",
};

/**
 * Get the structure key based on subject and task type
 */
export function getStructureKey(subject: string | null, taskType: string | null): string | null {
  if (!subject) return null;
  
  // TOK uses its own template
  if (subject === "tok" || taskType === "tok") {
    return "tok-essay";
  }
  
  // Extended Essay uses a common template
  if (taskType === "ee" || subject === "ee") {
    return subjectToEEKey[subject] || "extended-essay";
  }
  
  // Internal Assessment (ia task type) uses subject-specific templates
  if (taskType === "ia" || taskType === "essay" || taskType === "commentary" || taskType === "other" || !taskType) {
    return subjectToStructureKey[subject] || null;
  }
  
  // Default fallback
  return subjectToStructureKey[subject] || null;
}

/**
 * Generate HTML template content from structure data
 */
export function generateTemplateContent(structureKey: string): string {
  const structure = iaEssayStructureData[structureKey];
  if (!structure) return "";
  
  let html = "";
  
  // Add title section with formatting requirements as a comment/note
  html += `<p style="text-align: center; color: #666; font-size: 0.9em; margin-bottom: 20px;">
    <em>Format: ${structure.formatRequirements.font}, ${structure.formatRequirements.fontSize}, ${structure.formatRequirements.lineSpacing}</em>
  </p>`;
  
  // Generate content for each section
  for (const section of structure.structure) {
    html += generateSectionHTML(section, structure);
  }
  
  // Add appendices section if applicable
  if (structure.appendices?.allowed) {
    html += `<h2>Appendices</h2>`;
    html += `<p style="color: #888;"><em>Include: ${structure.appendices.includes.join(", ")}</em></p>`;
    html += `<p>&nbsp;</p>`;
  }
  
  // Add bibliography section
  if (structure.bibliography.required) {
    html += `<h2>Bibliography / References</h2>`;
    html += `<p style="color: #888;"><em>Use ${structure.bibliography.style} citation style. ${structure.bibliography.notes}</em></p>`;
    html += `<p>&nbsp;</p>`;
  }
  
  return html;
}

/**
 * Generate HTML for a single section
 */
function generateSectionHTML(section: StructureSection, structure: SubjectStructure): string {
  let html = "";
  
  // Main section heading
  const headingLevel = section.heading === "Title" ? "h1" : "h2";
  html += `<${headingLevel}>${section.heading}</${headingLevel}>`;
  
  // Add word count guidance if available
  if (section.wordCount) {
    html += `<p style="color: #888; font-size: 0.9em;"><em>Suggested length: ${section.wordCount}</em></p>`;
  }
  
  // Add description as placeholder/guidance
  html += `<p style="color: #999;"><em>${section.description}</em></p>`;
  
  // For special sections, add appropriate content
  if (section.heading === "Title") {
    html += `<p style="text-align: center; font-size: 1.5em; font-weight: bold;">[Your Title Here]</p>`;
    html += `<p>&nbsp;</p>`;
  } else if (section.heading === "Research Question" || section.heading.includes("Research Question")) {
    html += `<p style="font-weight: bold; font-style: italic;">[Your Research Question Here]</p>`;
    html += `<p>&nbsp;</p>`;
  } else if (section.heading === "Raw Data" || section.heading === "Data Collection") {
    // Check if it's a math exploration
    if (structure.subject.includes("Math")) {
      html += generateMathDataTableHTML();
    } else {
      html += generateDataTableHTML();
    }
    html += `<p>&nbsp;</p>`;
  } else if (section.heading === "Processed Data" || section.heading === "Data Analysis" || section.heading === "Analysis") {
    // Check if it's an economics/business type or science type
    if (structure.subject.includes("Economics") || structure.subject.includes("Business")) {
      html += generateEconomicsAnalysisTableHTML();
    } else if (structure.subject.includes("Math")) {
      html += generateMathResultsTableHTML();
    } else {
      html += generateProcessedDataTableHTML();
    }
    html += `<p>&nbsp;</p>`;
  } else if (section.heading === "Diagram" || section.heading.includes("Diagram")) {
    html += generateDiagramPlaceholderHTML();
    html += `<p>&nbsp;</p>`;
  } else if (section.heading === "Commentary" || section.heading.includes("Commentary")) {
    // For economics commentaries
    html += generateCommentaryStructureHTML();
    html += `<p>&nbsp;</p>`;
  } else if (section.heading === "Mathematical Development" || section.heading.includes("Mathematical")) {
    // For math explorations
    html += generateMathDevelopmentHTML();
    html += `<p>&nbsp;</p>`;
  } else {
    // Add subheadings if available
    if (section.subheadings && section.subheadings.length > 0) {
      for (const subheading of section.subheadings) {
        html += `<h3>${subheading}</h3>`;
        html += `<p>[Write your content here...]</p>`;
        html += `<p>&nbsp;</p>`;
      }
    } else {
      // Add placeholder text
      html += `<p>[Write your content here...]</p>`;
      html += `<p>&nbsp;</p>`;
    }
  }
  
  return html;
}

/**
 * Generate a raw data table for science IAs
 */
function generateDataTableHTML(): string {
  return `
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <thead>
        <tr style="background-color: #f3f4f6;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Trial</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Independent Variable</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Measurement 1</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Measurement 2</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Measurement 3</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Uncertainty (±)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">1</td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">2</td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">3</td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">4</td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">5</td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
      </tbody>
    </table>
    <p style="color: #888; font-size: 0.9em;"><em>Table 1: Raw data table. Add appropriate column headers for your variables. Include units and uncertainties.</em></p>
  `;
}

/**
 * Generate a processed data table for science IAs
 */
function generateProcessedDataTableHTML(): string {
  return `
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <thead>
        <tr style="background-color: #e8f4f8;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Independent Variable</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Mean Value</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Standard Deviation</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Processed Result</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Uncertainty (±)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
      </tbody>
    </table>
    <p style="color: #888; font-size: 0.9em;"><em>Table 2: Processed data with calculations. Show all working and uncertainty propagation.</em></p>
  `;
}

/**
 * Generate an economics/business analysis table
 */
function generateEconomicsAnalysisTableHTML(): string {
  return `
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <thead>
        <tr style="background-color: #f0f9ff;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Economic Indicator</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Before</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">After</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">% Change</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Source</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
      </tbody>
    </table>
    <p style="color: #888; font-size: 0.9em;"><em>Table: Analysis of economic data. Include sources and calculate percentage changes where relevant.</em></p>
  `;
}

/**
 * Generate a diagram placeholder
 */
function generateDiagramPlaceholderHTML(): string {
  return `
    <div style="border: 2px dashed #ccc; padding: 40px; text-align: center; margin: 16px 0; background-color: #fafafa; border-radius: 8px;">
      <p style="color: #666; font-size: 1.1em; margin: 0;">[Insert Diagram Here]</p>
      <p style="color: #888; font-size: 0.9em; margin-top: 8px;"><em>Add a clear, labeled diagram to illustrate the economic concept</em></p>
    </div>
    <p style="color: #888; font-size: 0.9em;"><em>Figure 1: [Diagram title and brief description]</em></p>
  `;
}

/**
 * Generate economics commentary structure
 */
function generateCommentaryStructureHTML(): string {
  return `
    <h3>Introduction</h3>
    <p>[Introduce the article and the economic issue it addresses. State the key economic concept you will analyze.]</p>
    <p>&nbsp;</p>
    
    <h3>Economic Theory</h3>
    <p>[Explain the relevant economic theory and concepts. Define key terms.]</p>
    
    <div style="border: 2px dashed #ccc; padding: 40px; text-align: center; margin: 16px 0; background-color: #fafafa; border-radius: 8px;">
      <p style="color: #666; font-size: 1.1em; margin: 0;">[Insert Economic Diagram]</p>
      <p style="color: #888; font-size: 0.9em; margin-top: 8px;"><em>Supply/Demand, Cost Curves, etc.</em></p>
    </div>
    <p style="color: #888; font-size: 0.9em;"><em>Figure 1: [Diagram title]</em></p>
    <p>&nbsp;</p>
    
    <h3>Application to Article</h3>
    <p>[Apply the economic theory to the specific situation in the article. Reference the diagram.]</p>
    <p>&nbsp;</p>
    
    <h3>Evaluation</h3>
    <p>[Evaluate the policy or outcome. Consider stakeholders, short-term vs long-term effects, limitations of the analysis.]</p>
    <p>&nbsp;</p>
  `;
}

/**
 * Generate a math data table for explorations
 */
function generateMathDataTableHTML(): string {
  return `
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <thead>
        <tr style="background-color: #f0fdf4;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">n</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">x</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">f(x)</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Observed Value</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">2</td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">3</td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">4</td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">5</td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
      </tbody>
    </table>
    <p style="color: #888; font-size: 0.9em;"><em>Table: Collected data for mathematical analysis. Adjust column headers to match your variables.</em></p>
  `;
}

/**
 * Generate a math results table
 */
function generateMathResultsTableHTML(): string {
  return `
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <thead>
        <tr style="background-color: #f0fdf4;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Case</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Predicted Value</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Actual Value</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Error (%)</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Correlation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
          <td style="border: 1px solid #ddd; padding: 8px;"></td>
        </tr>
      </tbody>
    </table>
    <p style="color: #888; font-size: 0.9em;"><em>Table: Comparison of predicted vs actual values. Calculate percentage error and correlation coefficients.</em></p>
  `;
}

/**
 * Generate mathematical development section structure
 */
function generateMathDevelopmentHTML(): string {
  return `
    <h3>Step 1: Define Variables and Parameters</h3>
    <p>[Define all variables, constants, and parameters used in your exploration. Use proper mathematical notation.]</p>
    <p>&nbsp;</p>
    
    <h3>Step 2: Mathematical Relationships</h3>
    <p>[Establish the mathematical relationships and equations. Show derivations where applicable.]</p>
    <div style="background-color: #f8f9fa; padding: 20px; margin: 16px 0; border-left: 4px solid #4f46e5; border-radius: 4px;">
      <p style="font-family: 'Times New Roman', serif; font-size: 1.1em; margin: 0;">[Insert key equation or formula here]</p>
    </div>
    <p>&nbsp;</p>
    
    <h3>Step 3: Calculations</h3>
    <p>[Show your working for all calculations. Use clear, step-by-step presentation.]</p>
    <div style="background-color: #f8f9fa; padding: 20px; margin: 16px 0; border-left: 4px solid #4f46e5; border-radius: 4px;">
      <p style="font-family: 'Courier New', monospace; margin: 0;">[Show calculation steps]</p>
    </div>
    <p>&nbsp;</p>
    
    <h3>Step 4: Graphical Representation</h3>
    <div style="border: 2px dashed #ccc; padding: 40px; text-align: center; margin: 16px 0; background-color: #fafafa; border-radius: 8px;">
      <p style="color: #666; font-size: 1.1em; margin: 0;">[Insert Graph Here]</p>
      <p style="color: #888; font-size: 0.9em; margin-top: 8px;"><em>Include axes labels, units, and a clear title</em></p>
    </div>
    <p style="color: #888; font-size: 0.9em;"><em>Figure: [Graph description]</em></p>
    <p>&nbsp;</p>
  `;
}

/**
 * Get template content for a subject and task type
 */
export function getTemplateForAssignment(subject: string | null, taskType: string | null): string {
  const structureKey = getStructureKey(subject, taskType);
  if (!structureKey) return "";
  
  return generateTemplateContent(structureKey);
}

/**
 * Get the structure data for a subject and task type (for displaying info)
 */
export function getStructureForAssignment(subject: string | null, taskType: string | null): SubjectStructure | null {
  const structureKey = getStructureKey(subject, taskType);
  if (!structureKey) return null;
  
  return iaEssayStructureData[structureKey] || null;
}

/**
 * Convert IA/EE structure to outline sections format
 * Returns sections in the format: { title: string, bullets: string[] }[]
 */
export function getOutlineSectionsFromStructure(subject: string | null, taskType: string | null): Array<{ title: string; bullets: string[] }> {
  const structure = getStructureForAssignment(subject, taskType);
  if (!structure) return [];
  
  const sections: Array<{ title: string; bullets: string[] }> = [];
  
  for (const section of structure.structure) {
    // Create bullets from subheadings, tips, and description
    const bullets: string[] = [];
    
    // Add subheadings as bullets
    if (section.subheadings && section.subheadings.length > 0) {
      bullets.push(...section.subheadings.map(sh => `📝 ${sh}`));
    }
    
    // Add word count guidance
    if (section.wordCount) {
      bullets.push(`📏 ${section.wordCount}`);
    }
    
    // Add key tips (limit to 3 most important)
    if (section.tips && section.tips.length > 0) {
      const keyTips = section.tips.slice(0, 3);
      bullets.push(...keyTips.map(tip => `💡 ${tip}`));
    }
    
    sections.push({
      title: section.heading,
      bullets,
    });
  }
  
  // Add appendices section if allowed
  if (structure.appendices?.allowed) {
    sections.push({
      title: 'Appendices',
      bullets: structure.appendices.includes.map(item => `📎 ${item}`),
    });
  }
  
  // Add bibliography section
  if (structure.bibliography.required) {
    sections.push({
      title: 'Bibliography / References',
      bullets: [
        `📚 Use ${structure.bibliography.style} citation style`,
        `📝 ${structure.bibliography.notes}`,
      ],
    });
  }
  
  return sections;
}

/**
 * Generate title page HTML for IB assignments
 */
export function generateTitlePageHTML(
  title: string,
  subject: string | null,
  taskType: string | null,
  wordCount?: number
): string {
  const subjectDisplay = subject?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Subject';
  const taskTypeDisplay = taskType?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Assignment';
  
  // Determine the assignment type label
  let typeLabel = taskTypeDisplay;
  if (taskType === 'ia') typeLabel = 'Internal Assessment';
  if (taskType === 'ee') typeLabel = 'Extended Essay';
  if (taskType === 'tok') typeLabel = 'Theory of Knowledge Essay';
  
  return `
    <div style="text-align: center; padding: 80px 40px; page-break-after: always;">
      <p style="font-size: 1.2em; color: #666; margin-bottom: 60px;">${subjectDisplay}</p>
      <h1 style="font-size: 2em; margin-bottom: 20px;">${title || '[Your Title Here]'}</h1>
      <p style="font-size: 1.1em; color: #888; margin-bottom: 40px;">${typeLabel}</p>
      <p style="color: #888; margin-top: 80px;">[Candidate Name]</p>
      <p style="color: #888;">[Candidate Number]</p>
      <p style="color: #888;">[School Name]</p>
      <p style="color: #888; margin-top: 20px;">${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      ${wordCount ? `<p style="color: #888; margin-top: 40px;">Word Count: ${wordCount}</p>` : ''}
    </div>
  `;
}

/**
 * Generate bibliography section HTML
 */
export function generateBibliographyHTML(style?: string): string {
  const citationStyle = style || 'MLA';
  return `
    <h2 style="page-break-before: always;">Bibliography / References</h2>
    <p style="color: #888; font-style: italic; margin-bottom: 20px;">
      Use ${citationStyle} citation format. List all sources in alphabetical order by author's last name.
    </p>
    <p>[Author Last, First. <em>Title of Work</em>. Publisher, Year.]</p>
    <p>&nbsp;</p>
    <p>[Add your references here...]</p>
  `;
}

/**
 * Generate table HTML based on task type and section
 */
export function generateTableForSection(
  sectionTitle: string,
  subject: string | null,
  taskType: string | null
): string | null {
  const title = sectionTitle.toLowerCase();
  
  // Science IA data tables
  if ((taskType === 'ia' && (title.includes('raw data') || title.includes('data collection'))) ||
      (title.includes('data') && !title.includes('analysis') && !title.includes('processed'))) {
    if (subject?.includes('math')) {
      return generateMathDataTableHTML();
    }
    return generateDataTableHTML();
  }
  
  // Processed data / Analysis tables
  if (title.includes('processed') || title.includes('analysis')) {
    if (subject?.includes('econ') || subject?.includes('business')) {
      return generateEconomicsAnalysisTableHTML();
    }
    if (subject?.includes('math')) {
      return generateMathResultsTableHTML();
    }
    return generateProcessedDataTableHTML();
  }
  
  return null;
}

/**
 * Generate Table of Contents HTML
 */
export function generateTableOfContentsHTML(): string {
  return `
    <h2 style="page-break-before: always;">Table of Contents</h2>
    <p>[Table of Contents will vary based on your headings]</p>
    <p>&nbsp;</p>
  `;
}

/**
 * Convert outline sections to draft HTML content
 * Includes title page and bibliography for assignments
 */
export function generateDraftFromOutline(
  outlineSections: Array<{ title: string; bullets: string[] }>,
  options: {
    title?: string;
    subject?: string | null;
    taskType?: string | null;
    includeTitlePage?: boolean;
    includeBibliography?: boolean;
    includeTablesForIA?: boolean;
  }
): string {
  const {
    title = '',
    subject = null,
    taskType = null,
    includeTitlePage = true,
    includeBibliography = true,
    includeTablesForIA = true,
  } = options;
  
  // Determine if this is an EE to include TOC
  const isEE = taskType === 'ee';
  
  let html = '';
  
  // Add title page for all users (as requested)
  if (includeTitlePage) {
    html += generateTitlePageHTML(title, subject, taskType);
  }

  // Add Table of Contents for EE
  if (isEE) {
    html += generateTableOfContentsHTML();
  }
  
  // Get structure data for bibliography style
  const structure = getStructureForAssignment(subject, taskType);
  const bibStyle = structure?.bibliography?.style;
  
  // Generate content for each outline section
  for (const section of outlineSections) {
    // Section heading
    html += `<h2>${section.title}</h2>`;
    
    // Add section bullet points as guidance
    // Simplified structure for better import into block editors
    if (section.bullets && section.bullets.length > 0) {
      html += `<p><strong>Key Points to Address:</strong></p>`;
      html += `<ul>`;
      for (const bullet of section.bullets) {
        if (bullet && bullet.trim()) {
          html += `<li>${bullet}</li>`;
        }
      }
      html += `</ul>`;
      html += `<p>&nbsp;</p>`;
    }
    
    // Add appropriate table for data sections in IA
    if (includeTablesForIA && taskType === 'ia') {
      const table = generateTableForSection(section.title, subject, taskType);
      if (table) {
        html += table;
      }
    }
    
    // Add writing placeholder
    html += `<p>[Write your content for "${section.title}" here...]</p>`;
    html += `<p>&nbsp;</p>`;
  }
  
  // Add bibliography for all users
  if (includeBibliography) {
    html += generateBibliographyHTML(bibStyle);
  }
  
  return html;
}

export default iaEssayStructureData;
