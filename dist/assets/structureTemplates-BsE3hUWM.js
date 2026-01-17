import { a as iaEssayStructureData } from './data-ia-DxRN8XI2.js';

const subjectToStructureKey = {
  // Core subjects
  "tok": "tok-essay",
  "ee": "extended-essay",
  // Group 1: Language and Literature
  "english_a": "english-a-literature-hl-essay",
  "lang_a_literature": "english-a-literature-hl-essay",
  "lang_a_lang_lit": "english-a-literature-hl-essay",
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
  "sehs": "biology-ia",
  // Sports, Exercise and Health Science
  "computer_science": "computer-science-ia",
  "design_technology": "biology-ia",
  "ess": "biology-ia",
  // Group 5: Mathematics
  "math_aa": "math-aa-ia",
  "math_ai": "math-ai-ia",
  // Group 6: Arts
  "visual_arts": "english-a-literature-hl-essay",
  // Use essay template
  "drama": "english-a-literature-hl-essay",
  // Other
  "other": "english-a-literature-hl-essay"
};
const subjectToEEKey = {
  "english_a": "extended-essay",
  "french_b": "extended-essay",
  "spanish_b": "extended-essay",
  "swedish_b": "extended-essay",
  "history": "extended-essay",
  "economics": "extended-essay",
  "geography": "extended-essay",
  "business_management": "extended-essay",
  "psychology": "extended-essay",
  "biology": "extended-essay",
  "chemistry": "extended-essay",
  "physics": "extended-essay",
  "sehs": "extended-essay",
  "computer_science": "extended-essay",
  "math_aa": "extended-essay",
  "math_ai": "extended-essay",
  "visual_arts": "extended-essay",
  "drama": "extended-essay",
  "other": "extended-essay"
};
function getStructureKey(subject, taskType) {
  if (!subject) return null;
  if (subject === "tok" || taskType === "tok") {
    return "tok-essay";
  }
  if (taskType === "ee" || subject === "ee") {
    return subjectToEEKey[subject] || "extended-essay";
  }
  if (taskType === "ia" || taskType === "essay" || taskType === "commentary" || taskType === "other" || !taskType) {
    return subjectToStructureKey[subject] || null;
  }
  return subjectToStructureKey[subject] || null;
}
function generateTemplateContent(structureKey) {
  const structure = iaEssayStructureData[structureKey];
  if (!structure) return "";
  let html = "";
  html += `<p style="text-align: center; color: #666; font-size: 0.9em; margin-bottom: 20px;">
    <em>Format: ${structure.formatRequirements.font}, ${structure.formatRequirements.fontSize}, ${structure.formatRequirements.lineSpacing}</em>
  </p>`;
  for (const section of structure.structure) {
    html += generateSectionHTML(section, structure);
  }
  if (structure.appendices?.allowed) {
    html += `<h2>Appendices</h2>`;
    html += `<p style="color: #888;"><em>Include: ${structure.appendices.includes.join(", ")}</em></p>`;
    html += `<p>&nbsp;</p>`;
  }
  if (structure.bibliography.required) {
    html += `<h2>Bibliography / References</h2>`;
    html += `<p style="color: #888;"><em>Use ${structure.bibliography.style} citation style. ${structure.bibliography.notes}</em></p>`;
    html += `<p>&nbsp;</p>`;
  }
  return html;
}
function generateSectionHTML(section, structure) {
  let html = "";
  const headingLevel = section.heading === "Title" ? "h1" : "h2";
  html += `<${headingLevel}>${section.heading}</${headingLevel}>`;
  if (section.wordCount) {
    html += `<p style="color: #888; font-size: 0.9em;"><em>Suggested length: ${section.wordCount}</em></p>`;
  }
  html += `<p style="color: #999;"><em>${section.description}</em></p>`;
  if (section.heading === "Title") {
    html += `<p style="text-align: center; font-size: 1.5em; font-weight: bold;">[Your Title Here]</p>`;
    html += `<p>&nbsp;</p>`;
  } else if (section.heading === "Research Question" || section.heading.includes("Research Question")) {
    html += `<p style="font-weight: bold; font-style: italic;">[Your Research Question Here]</p>`;
    html += `<p>&nbsp;</p>`;
  } else if (section.heading === "Raw Data" || section.heading === "Data Collection") {
    if (structure.subject.includes("Math")) {
      html += generateMathDataTableHTML();
    } else {
      html += generateDataTableHTML();
    }
    html += `<p>&nbsp;</p>`;
  } else if (section.heading === "Processed Data" || section.heading === "Data Analysis" || section.heading === "Analysis") {
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
    html += generateCommentaryStructureHTML();
    html += `<p>&nbsp;</p>`;
  } else if (section.heading === "Mathematical Development" || section.heading.includes("Mathematical")) {
    html += generateMathDevelopmentHTML();
    html += `<p>&nbsp;</p>`;
  } else {
    if (section.subheadings && section.subheadings.length > 0) {
      for (const subheading of section.subheadings) {
        html += `<h3>${subheading}</h3>`;
        html += `<p>[Write your content here...]</p>`;
        html += `<p>&nbsp;</p>`;
      }
    } else {
      html += `<p>[Write your content here...]</p>`;
      html += `<p>&nbsp;</p>`;
    }
  }
  return html;
}
function generateDataTableHTML() {
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
function generateProcessedDataTableHTML() {
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
function generateEconomicsAnalysisTableHTML() {
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
function generateDiagramPlaceholderHTML() {
  return `
    <div style="border: 2px dashed #ccc; padding: 40px; text-align: center; margin: 16px 0; background-color: #fafafa; border-radius: 8px;">
      <p style="color: #666; font-size: 1.1em; margin: 0;">[Insert Diagram Here]</p>
      <p style="color: #888; font-size: 0.9em; margin-top: 8px;"><em>Add a clear, labeled diagram to illustrate the economic concept</em></p>
    </div>
    <p style="color: #888; font-size: 0.9em;"><em>Figure 1: [Diagram title and brief description]</em></p>
  `;
}
function generateCommentaryStructureHTML() {
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
function generateMathDataTableHTML() {
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
function generateMathResultsTableHTML() {
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
function generateMathDevelopmentHTML() {
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
function getTemplateForAssignment(subject, taskType) {
  const structureKey = getStructureKey(subject, taskType);
  if (!structureKey) return "";
  return generateTemplateContent(structureKey);
}
function getStructureForAssignment(subject, taskType) {
  const structureKey = getStructureKey(subject, taskType);
  if (!structureKey) return null;
  return iaEssayStructureData[structureKey] || null;
}
function getOutlineSectionsFromStructure(subject, taskType) {
  const structure = getStructureForAssignment(subject, taskType);
  if (!structure) return [];
  const sections = [];
  for (const section of structure.structure) {
    const bullets = [];
    if (section.subheadings && section.subheadings.length > 0) {
      bullets.push(...section.subheadings.map((sh) => `📝 ${sh}`));
    }
    if (section.wordCount) {
      bullets.push(`📏 ${section.wordCount}`);
    }
    if (section.tips && section.tips.length > 0) {
      const keyTips = section.tips.slice(0, 3);
      bullets.push(...keyTips.map((tip) => `💡 ${tip}`));
    }
    sections.push({
      title: section.heading,
      bullets
    });
  }
  if (structure.appendices?.allowed) {
    sections.push({
      title: "Appendices",
      bullets: structure.appendices.includes.map((item) => `📎 ${item}`)
    });
  }
  if (structure.bibliography.required) {
    sections.push({
      title: "Bibliography / References",
      bullets: [
        `📚 Use ${structure.bibliography.style} citation style`,
        `📝 ${structure.bibliography.notes}`
      ]
    });
  }
  return sections;
}
function generateTitlePageHTML(title, subject, taskType, wordCount) {
  const subjectDisplay = subject?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Subject";
  const taskTypeDisplay = taskType?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Assignment";
  let typeLabel = taskTypeDisplay;
  if (taskType === "ia") typeLabel = "Internal Assessment";
  if (taskType === "ee") typeLabel = "Extended Essay";
  if (taskType === "tok") typeLabel = "Theory of Knowledge Essay";
  return `
    <div style="text-align: center; padding: 80px 40px; page-break-after: always;">
      <p style="font-size: 1.2em; color: #666; margin-bottom: 60px;">${subjectDisplay}</p>
      <h1 style="font-size: 2em; margin-bottom: 20px;">${title || "[Your Title Here]"}</h1>
      <p style="font-size: 1.1em; color: #888; margin-bottom: 40px;">${typeLabel}</p>
      <p style="color: #888; margin-top: 80px;">[Candidate Name]</p>
      <p style="color: #888;">[Candidate Number]</p>
      <p style="color: #888;">[School Name]</p>
      <p style="color: #888; margin-top: 20px;">${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
      ${""}
    </div>
  `;
}
function generateBibliographyHTML(style) {
  const citationStyle = style || "MLA";
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
function generateTableForSection(sectionTitle, subject, taskType) {
  const title = sectionTitle.toLowerCase();
  if (taskType === "ia" && (title.includes("raw data") || title.includes("data collection")) || title.includes("data") && !title.includes("analysis") && !title.includes("processed")) {
    if (subject?.includes("math")) {
      return generateMathDataTableHTML();
    }
    return generateDataTableHTML();
  }
  if (title.includes("processed") || title.includes("analysis")) {
    if (subject?.includes("econ") || subject?.includes("business")) {
      return generateEconomicsAnalysisTableHTML();
    }
    if (subject?.includes("math")) {
      return generateMathResultsTableHTML();
    }
    return generateProcessedDataTableHTML();
  }
  return null;
}
function generateDraftFromOutline(outlineSections, options) {
  const {
    title = "",
    subject = null,
    taskType = null,
    includeTitlePage = true,
    includeBibliography = true,
    includeTablesForIA = true
  } = options;
  const isIBAssignment = ["ia", "ee", "tok"].includes(taskType || "");
  let html = "";
  if (includeTitlePage && isIBAssignment) {
    html += generateTitlePageHTML(title, subject, taskType);
  }
  const structure = getStructureForAssignment(subject, taskType);
  const bibStyle = structure?.bibliography?.style;
  for (const section of outlineSections) {
    html += `<h2>${section.title}</h2>`;
    if (section.bullets && section.bullets.length > 0) {
      html += `<div style="background-color: #f8f9fa; padding: 16px; margin: 8px 0 16px 0; border-left: 4px solid hsl(var(--primary)); border-radius: 4px;">`;
      html += `<p style="font-weight: 600; margin-bottom: 8px; color: #374151;">Key Points to Address:</p>`;
      html += `<ul style="margin: 0; padding-left: 20px; color: #6b7280;">`;
      for (const bullet of section.bullets) {
        html += `<li style="margin-bottom: 4px;">${bullet}</li>`;
      }
      html += `</ul>`;
      html += `</div>`;
    }
    if (includeTablesForIA && taskType === "ia") {
      const table = generateTableForSection(section.title, subject, taskType);
      if (table) {
        html += table;
      }
    }
    html += `<p>[Write your content for "${section.title}" here...]</p>`;
    html += `<p>&nbsp;</p>`;
  }
  if (includeBibliography && isIBAssignment) {
    html += generateBibliographyHTML(bibStyle);
  }
  return html;
}

export { generateDraftFromOutline as a, getOutlineSectionsFromStructure as b, getTemplateForAssignment as g };
