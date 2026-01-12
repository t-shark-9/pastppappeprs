import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function GeographyGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "30-40", paper2: "40-50", ia: "21-25", final: "78-100%" },
    { grade: 6, paper1: "26-29", paper2: "34-39", ia: "18-20", final: "66-77%" },
    { grade: 5, paper1: "22-25", paper2: "27-33", ia: "14-17", final: "53-65%" },
    { grade: 4, paper1: "18-21", paper2: "21-26", ia: "11-13", final: "42-52%" },
    { grade: 3, paper1: "12-17", paper2: "16-20", ia: "6-10", final: "28-41%" },
    { grade: 2, paper1: "6-11", paper2: "8-15", ia: "3-5", final: "13-27%" },
    { grade: 1, paper1: "0-5", paper2: "0-7", ia: "0-2", final: "0-12%" },
  ];

  const hlData = [
    { grade: 7, paper1: "43-60", paper2: "40-50", paper3: "20-28", ia: "21-25", final: "75-100%" },
    { grade: 6, paper1: "37-42", paper2: "34-39", paper3: "18-19", ia: "18-20", final: "64-74%" },
    { grade: 5, paper1: "32-36", paper2: "27-33", paper3: "16-17", ia: "14-17", final: "53-63%" },
    { grade: 4, paper1: "26-31", paper2: "21-26", paper3: "14-15", ia: "11-13", final: "43-52%" },
    { grade: 3, paper1: "20-25", paper2: "16-20", paper3: "10-13", ia: "6-10", final: "30-42%" },
    { grade: 2, paper1: "10-19", paper2: "8-15", paper3: "5-9", ia: "3-5", final: "14-29%" },
    { grade: 1, paper1: "0-9", paper2: "0-7", paper3: "0-4", ia: "0-2", final: "0-13%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Geography Grade Boundaries"
      subtitle="May 2025 Examination Session"
      headers={["Grade", "Paper 1", "Paper 2", "Paper 3", "IA", "Final %"]}
      slData={slData.map(d => ({ ...d, paper3: "-" }))}
      hlData={hlData}
      slComponents="Paper 1: 40 marks (35%) | Paper 2: 50 marks (40%) | IA: 25 marks (25%)"
      hlComponents="Paper 1: 60 marks (35%) | Paper 2: 50 marks (25%) | Paper 3: 28 marks (20%) | IA: 25 marks (20%)"
      tips={[
        { title: "Paper 1", content: "Use case studies with specific data and examples. Draw annotated diagrams to support answers." },
        { title: "Paper 2", content: "Answer all parts of the question. Refer to the source material provided." },
        { title: "Paper 3 (HL)", content: "Practice extended writing. Evaluate and analyze rather than just describe." },
        { title: "Internal Assessment", content: "Choose a focused fieldwork investigation. Include primary data collection and thorough analysis." },
      ]}
      relatedSubjects={[
        { name: "ESS", path: "/homepage/grade-boundaries/ess" },
        { name: "History", path: "/homepage/grade-boundaries/history" },
        { name: "Economics", path: "/homepage/grade-boundaries/economics" },
      ]}
    />
  );
}
