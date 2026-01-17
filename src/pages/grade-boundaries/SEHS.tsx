import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function SEHSGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "24-40", paper2: "40-60", ia: "20-24", final: "67-100%" },
    { grade: 6, paper1: "20-23", paper2: "33-39", ia: "17-19", final: "56-66%" },
    { grade: 5, paper1: "16-19", paper2: "26-32", ia: "14-16", final: "45-55%" },
    { grade: 4, paper1: "12-15", paper2: "20-25", ia: "11-13", final: "34-44%" },
    { grade: 3, paper1: "8-11", paper2: "14-19", ia: "7-10", final: "23-33%" },
    { grade: 2, paper1: "4-7", paper2: "7-13", ia: "4-6", final: "12-22%" },
    { grade: 1, paper1: "0-3", paper2: "0-6", ia: "0-3", final: "0-11%" },
  ];

  const hlData = [
    { grade: 7, paper1: "24-40", paper2: "40-60", paper3: "22-35", ia: "20-24", final: "67-100%" },
    { grade: 6, paper1: "20-23", paper2: "33-39", paper3: "18-21", ia: "17-19", final: "56-66%" },
    { grade: 5, paper1: "16-19", paper2: "26-32", paper3: "14-17", ia: "14-16", final: "44-55%" },
    { grade: 4, paper1: "12-15", paper2: "20-25", paper3: "10-13", ia: "11-13", final: "33-43%" },
    { grade: 3, paper1: "8-11", paper2: "14-19", paper3: "6-9", ia: "7-10", final: "22-32%" },
    { grade: 2, paper1: "4-7", paper2: "7-13", paper3: "3-5", ia: "4-6", final: "11-21%" },
    { grade: 1, paper1: "0-3", paper2: "0-6", paper3: "0-2", ia: "0-3", final: "0-10%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Sports, Exercise and Health Science Grade Boundaries"
      subtitle="SEHS - May 2025 Examination Session"
      headers={["Grade", "Paper 1", "Paper 2", "Paper 3", "IA", "Final %"]}
      slData={slData.map(d => ({ ...d, paper3: "-" }))}
      hlData={hlData}
      slComponents="Paper 1: 40 marks (30%) | Paper 2: 60 marks (45%) | IA: 24 marks (25%)"
      hlComponents="Paper 1: 40 marks (20%) | Paper 2: 60 marks (35%) | Paper 3: 35 marks (20%) | IA: 24 marks (25%)"
      tips={[
        { title: "Paper 1 (MCQ & Short Answer)", content: "Know anatomical terminology and physiological processes. Use diagrams where helpful." },
        { title: "Paper 2 (Data-based & Extended)", content: "Practice interpreting experimental data. Link physiology to athletic performance." },
        { title: "Paper 3 (HL - Options)", content: "Master your chosen option topic thoroughly. Practice extended response questions." },
        { title: "Internal Assessment", content: "Design a practical investigation with clear variables. Analyze data with appropriate statistics." },
      ]}
      relatedSubjects={[
        { name: "Biology", path: "/homepage/grade-boundaries/biology" },
        { name: "Chemistry", path: "/homepage/grade-boundaries/chemistry" },
        { name: "Psychology", path: "/homepage/grade-boundaries/psychology" },
      ]}
    />
  );
}
