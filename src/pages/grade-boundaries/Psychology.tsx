import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function PsychologyGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "35-50", paper2: "18-25", ia: "18-25", final: "75-100%" },
    { grade: 6, paper1: "29-34", paper2: "15-17", ia: "15-17", final: "62-74%" },
    { grade: 5, paper1: "23-28", paper2: "12-14", ia: "12-14", final: "50-61%" },
    { grade: 4, paper1: "18-22", paper2: "9-11", ia: "9-11", final: "38-49%" },
    { grade: 3, paper1: "12-17", paper2: "6-8", ia: "6-8", final: "25-37%" },
    { grade: 2, paper1: "6-11", paper2: "3-5", ia: "3-5", final: "12-24%" },
    { grade: 1, paper1: "0-5", paper2: "0-2", ia: "0-2", final: "0-11%" },
  ];

  const hlData = [
    { grade: 7, paper1: "35-50", paper2: "18-25", paper3: "28-40", ia: "18-25", final: "75-100%" },
    { grade: 6, paper1: "29-34", paper2: "15-17", paper3: "23-27", ia: "15-17", final: "62-74%" },
    { grade: 5, paper1: "23-28", paper2: "12-14", paper3: "18-22", ia: "12-14", final: "50-61%" },
    { grade: 4, paper1: "18-22", paper2: "9-11", paper3: "14-17", ia: "9-11", final: "38-49%" },
    { grade: 3, paper1: "12-17", paper2: "6-8", paper3: "9-13", ia: "6-8", final: "25-37%" },
    { grade: 2, paper1: "6-11", paper2: "3-5", paper3: "5-8", ia: "3-5", final: "12-24%" },
    { grade: 1, paper1: "0-5", paper2: "0-2", paper3: "0-4", ia: "0-2", final: "0-11%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Psychology Grade Boundaries"
      subtitle="May 2025 Examination Session"
      headers={["Grade", "Paper 1", "Paper 2", "Paper 3", "IA", "Final %"]}
      slData={slData.map(d => ({ ...d, paper3: "-" }))}
      hlData={hlData}
      slComponents="Paper 1: 50 marks (50%) | Paper 2: 25 marks (25%) | IA: 25 marks (25%)"
      hlComponents="Paper 1: 50 marks (40%) | Paper 2: 25 marks (20%) | Paper 3: 40 marks (20%) | IA: 25 marks (20%)"
      tips={[
        { title: "Paper 1 (Core)", content: "Know studies for each approach (biological, cognitive, sociocultural). Evaluate using critical thinking skills." },
        { title: "Paper 2 (Options)", content: "Master your option topics. Use studies to support arguments in extended responses." },
        { title: "Paper 3 (HL - Research Methods)", content: "Understand research methodology thoroughly. Practice evaluating studies and designing experiments." },
        { title: "Internal Assessment", content: "Replicate a classic study with clear methodology. Analyze results using appropriate statistics." },
      ]}
      relatedSubjects={[
        { name: "Biology", path: "/homepage/grade-boundaries/biology" },
        { name: "SEHS", path: "/homepage/grade-boundaries/sehs" },
        { name: "Philosophy", path: "/homepage/grade-boundaries/philosophy" },
      ]}
    />
  );
}
