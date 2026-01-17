import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function BiologyGradeBoundaries() {
  const slData = [
    { grade: 7, paper1a: "24-30", paper1b: "16-25", paper2: "41-50", practical: "20-24", final: "77-100%" },
    { grade: 6, paper1a: "22-23", paper1b: "13-15", paper2: "33-40", practical: "17-19", final: "64-76%" },
    { grade: 5, paper1a: "20-21", paper1b: "9-12", paper2: "26-32", practical: "14-16", final: "52-63%" },
    { grade: 4, paper1a: "18-19", paper1b: "6-8", paper2: "18-25", practical: "11-13", final: "39-51%" },
    { grade: 3, paper1a: "15-17", paper1b: "4-5", paper2: "11-17", practical: "7-10", final: "26-38%" },
    { grade: 2, paper1a: "8-14", paper1b: "2-3", paper2: "6-10", practical: "4-6", final: "13-25%" },
    { grade: 1, paper1a: "0-7", paper1b: "0-1", paper2: "0-5", practical: "0-3", final: "0-12%" },
  ];

  const hlData = [
    { grade: 7, paper1a: "34-40", paper1b: "25-35", paper2: "58-80", practical: "20-24", final: "76-100%" },
    { grade: 6, paper1a: "30-33", paper1b: "20-24", paper2: "46-57", practical: "17-19", final: "62-75%" },
    { grade: 5, paper1a: "27-29", paper1b: "14-19", paper2: "35-45", practical: "14-16", final: "49-61%" },
    { grade: 4, paper1a: "23-26", paper1b: "9-13", paper2: "23-34", practical: "11-13", final: "36-48%" },
    { grade: 3, paper1a: "21-22", paper1b: "6-8", paper2: "14-22", practical: "7-10", final: "25-35%" },
    { grade: 2, paper1a: "11-20", paper1b: "3-5", paper2: "7-13", practical: "4-6", final: "13-24%" },
    { grade: 1, paper1a: "0-10", paper1b: "0-2", paper2: "0-6", practical: "0-3", final: "0-12%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Biology Grade Boundaries"
      subtitle="May 2025 Examination Session"
      headers={["Grade", "Paper 1A", "Paper 1B", "Paper 2", "Practical Work", "Final %"]}
      slData={slData}
      hlData={hlData}
      slComponents="Paper 1A: 30 marks | Paper 1B: 25 marks | Paper 2: 50 marks | Practical Work: 24 marks"
      hlComponents="Paper 1A: 40 marks | Paper 1B: 35 marks | Paper 2: 80 marks | Practical Work: 24 marks"
      tips={[
        { title: "Paper 1A (MCQ)", content: "Practice past paper MCQs under timed conditions. Focus on understanding concepts rather than memorizing." },
        { title: "Paper 1B (Data-based)", content: "Practice interpreting graphs, tables, and experimental data. Show your working clearly." },
        { title: "Paper 2 (Extended Response)", content: "Structure your answers with clear paragraphs. Use biological terminology correctly and provide specific examples." },
        { title: "Practical Work (IA)", content: "Choose a focused research question. Ensure your methodology is replicable and analyze data thoroughly." },
      ]}
      relatedSubjects={[
        { name: "Chemistry", path: "/homepage/grade-boundaries/chemistry" },
        { name: "Physics", path: "/homepage/grade-boundaries/physics" },
        { name: "ESS", path: "/homepage/grade-boundaries/ess" },
      ]}
    />
  );
}
