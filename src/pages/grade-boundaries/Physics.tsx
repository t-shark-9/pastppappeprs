import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function PhysicsGradeBoundaries() {
  const slData = [
    { grade: 7, paper1a: "16-25", paper1b: "14-20", paper2: "28-50", practical: "20-24", final: "63-100%" },
    { grade: 6, paper1a: "14-15", paper1b: "12-13", paper2: "23-27", practical: "17-19", final: "53-62%" },
    { grade: 5, paper1a: "13", paper1b: "9-11", paper2: "17-22", practical: "14-16", final: "42-52%" },
    { grade: 4, paper1a: "11-12", paper1b: "7-8", paper2: "12-16", practical: "11-13", final: "32-41%" },
    { grade: 3, paper1a: "9-10", paper1b: "5-6", paper2: "6-11", practical: "7-10", final: "20-31%" },
    { grade: 2, paper1a: "7-8", paper1b: "3-4", paper2: "3-5", practical: "4-6", final: "12-19%" },
    { grade: 1, paper1a: "0-6", paper1b: "0-2", paper2: "0-2", practical: "0-3", final: "0-11%" },
  ];

  const hlData = [
    { grade: 7, paper1a: "30-40", paper1b: "14-20", paper2: "52-90", practical: "20-24", final: "67-100%" },
    { grade: 6, paper1a: "26-29", paper1b: "12-13", paper2: "43-51", practical: "17-19", final: "56-66%" },
    { grade: 5, paper1a: "23-25", paper1b: "9-11", paper2: "33-42", practical: "14-16", final: "45-55%" },
    { grade: 4, paper1a: "19-22", paper1b: "7-8", paper2: "24-32", practical: "11-13", final: "35-44%" },
    { grade: 3, paper1a: "16-18", paper1b: "5-6", paper2: "14-23", practical: "7-10", final: "24-34%" },
    { grade: 2, paper1a: "10-15", paper1b: "3-4", paper2: "7-13", practical: "4-6", final: "13-23%" },
    { grade: 1, paper1a: "0-9", paper1b: "0-2", paper2: "0-6", practical: "0-3", final: "0-12%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Physics Grade Boundaries"
      subtitle="May 2025 Examination Session"
      headers={["Grade", "Paper 1A", "Paper 1B", "Paper 2", "Practical Work", "Final %"]}
      slData={slData}
      hlData={hlData}
      slComponents="Paper 1A: 25 marks | Paper 1B: 20 marks | Paper 2: 50 marks | Practical Work: 24 marks"
      hlComponents="Paper 1A: 40 marks | Paper 1B: 20 marks | Paper 2: 90 marks | Practical Work: 24 marks"
      tips={[
        { title: "Paper 1A (MCQ)", content: "Watch out for unit conversions. Use estimation to check if answers are reasonable." },
        { title: "Paper 1B (Data-based)", content: "Practice reading graphs accurately. Show uncertainty calculations clearly." },
        { title: "Paper 2 (Extended Response)", content: "Derive equations step by step. Always include units and check dimensional consistency." },
        { title: "Practical Work (IA)", content: "Choose an investigation with measurable variables. Discuss systematic vs random errors." },
      ]}
      relatedSubjects={[
        { name: "Chemistry", path: "/homepage/grade-boundaries/chemistry" },
        { name: "Biology", path: "/homepage/grade-boundaries/biology" },
        { name: "Math AA", path: "/homepage/grade-boundaries/math-aa" },
      ]}
    />
  );
}
