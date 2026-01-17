import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function EconomicsGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "31-40", paper2: "31-40", ia: "21-28", final: "77-100%" },
    { grade: 6, paper1: "26-30", paper2: "26-30", ia: "18-20", final: "64-76%" },
    { grade: 5, paper1: "21-25", paper2: "21-25", ia: "14-17", final: "52-63%" },
    { grade: 4, paper1: "16-20", paper2: "16-20", ia: "11-13", final: "39-51%" },
    { grade: 3, paper1: "11-15", paper2: "11-15", ia: "7-10", final: "27-38%" },
    { grade: 2, paper1: "6-10", paper2: "6-10", ia: "4-6", final: "14-26%" },
    { grade: 1, paper1: "0-5", paper2: "0-5", ia: "0-3", final: "0-13%" },
  ];

  const hlData = [
    { grade: 7, paper1: "31-40", paper2: "31-40", paper3: "18-25", ia: "21-28", final: "75-100%" },
    { grade: 6, paper1: "26-30", paper2: "26-30", paper3: "15-17", ia: "18-20", final: "62-74%" },
    { grade: 5, paper1: "21-25", paper2: "21-25", paper3: "12-14", ia: "14-17", final: "50-61%" },
    { grade: 4, paper1: "16-20", paper2: "16-20", paper3: "9-11", ia: "11-13", final: "38-49%" },
    { grade: 3, paper1: "11-15", paper2: "11-15", paper3: "6-8", ia: "7-10", final: "25-37%" },
    { grade: 2, paper1: "6-10", paper2: "6-10", paper3: "3-5", ia: "4-6", final: "13-24%" },
    { grade: 1, paper1: "0-5", paper2: "0-5", paper3: "0-2", ia: "0-3", final: "0-12%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Economics Grade Boundaries"
      subtitle="May 2025 Examination Session"
      headers={["Grade", "Paper 1", "Paper 2", "Paper 3", "IA", "Final %"]}
      slData={slData.map(d => ({ ...d, paper3: "-" }))}
      hlData={hlData}
      slComponents="Paper 1: 40 marks (30%) | Paper 2: 40 marks (40%) | IA: 28 marks (30%)"
      hlComponents="Paper 1: 40 marks (20%) | Paper 2: 40 marks (30%) | Paper 3: 25 marks (30%) | IA: 28 marks (20%)"
      tips={[
        { title: "Paper 1 (Extended Response)", content: "Draw clear, labeled diagrams. Explain economic concepts with real-world examples." },
        { title: "Paper 2 (Data Response)", content: "Calculate accurately. Interpret data in economic context. Evaluate policies critically." },
        { title: "Paper 3 (HL - Quantitative)", content: "Master elasticity, multiplier, and other calculations. Practice policy analysis questions." },
        { title: "Internal Assessment", content: "Choose current news articles. Link theory to real-world situations with clear diagrams." },
      ]}
      relatedSubjects={[
        { name: "Business Management", path: "/homepage/grade-boundaries/business-management" },
        { name: "Global Politics", path: "/homepage/grade-boundaries/global-politics" },
        { name: "Math AI", path: "/homepage/grade-boundaries/math-ai" },
      ]}
    />
  );
}
