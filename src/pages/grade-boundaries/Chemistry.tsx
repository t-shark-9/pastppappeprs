import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function ChemistryGradeBoundaries() {
  const slData = [
    { grade: 7, paper1a: "20-29", paper1b: "17-25", paper2: "36-50", practical: "20-24", final: "71-100%" },
    { grade: 6, paper1a: "17-19", paper1b: "15-16", paper2: "30-35", practical: "17-19", final: "60-70%" },
    { grade: 5, paper1a: "14-16", paper1b: "12-14", paper2: "25-29", practical: "14-16", final: "49-59%" },
    { grade: 4, paper1a: "11-13", paper1b: "10-11", paper2: "19-24", practical: "11-13", final: "38-48%" },
    { grade: 3, paper1a: "9-10", paper1b: "7-9", paper2: "15-18", practical: "7-10", final: "28-37%" },
    { grade: 2, paper1a: "7-8", paper1b: "4-6", paper2: "8-14", practical: "4-6", final: "16-27%" },
    { grade: 1, paper1a: "0-6", paper1b: "0-3", paper2: "0-7", practical: "0-3", final: "0-15%" },
  ];

  const hlData = [
    { grade: 7, paper1a: "31-39", paper1b: "23-35", paper2: "67-90", practical: "20-24", final: "74-100%" },
    { grade: 6, paper1a: "26-30", paper1b: "20-22", paper2: "56-66", practical: "17-19", final: "63-73%" },
    { grade: 5, paper1a: "21-25", paper1b: "18-19", paper2: "45-55", practical: "14-16", final: "51-62%" },
    { grade: 4, paper1a: "16-20", paper1b: "15-17", paper2: "34-44", practical: "11-13", final: "40-50%" },
    { grade: 3, paper1a: "12-15", paper1b: "10-14", paper2: "21-33", practical: "7-10", final: "26-39%" },
    { grade: 2, paper1a: "10-11", paper1b: "5-9", paper2: "11-20", practical: "4-6", final: "15-25%" },
    { grade: 1, paper1a: "0-9", paper1b: "0-4", paper2: "0-10", practical: "0-3", final: "0-14%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Chemistry Grade Boundaries"
      subtitle="May 2025 Examination Session"
      headers={["Grade", "Paper 1A", "Paper 1B", "Paper 2", "Practical Work", "Final %"]}
      slData={slData}
      hlData={hlData}
      slComponents="Paper 1A: 29 marks | Paper 1B: 25 marks | Paper 2: 50 marks | Practical Work: 24 marks"
      hlComponents="Paper 1A: 39 marks | Paper 1B: 35 marks | Paper 2: 90 marks | Practical Work: 24 marks"
      tips={[
        { title: "Paper 1A (MCQ)", content: "Eliminate obviously wrong answers first. Check units and significant figures in calculations." },
        { title: "Paper 1B (Data-based)", content: "Practice interpreting spectra, titration curves, and graphs. Show all calculation steps." },
        { title: "Paper 2 (Extended Response)", content: "Balance equations correctly. Explain mechanisms step by step with proper notation." },
        { title: "Practical Work (IA)", content: "Design a clear experiment with controlled variables. Analyze errors thoroughly." },
      ]}
      relatedSubjects={[
        { name: "Biology", path: "/homepage/grade-boundaries/biology" },
        { name: "Physics", path: "/homepage/grade-boundaries/physics" },
        { name: "ESS", path: "/homepage/grade-boundaries/ess" },
      ]}
    />
  );
}
