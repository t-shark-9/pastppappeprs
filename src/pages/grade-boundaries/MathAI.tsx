import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function MathAIGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "50-80", paper2: "57-80", exploration: "18-20", final: "70-100%" },
    { grade: 6, paper1: "38-49", paper2: "45-56", exploration: "15-17", final: "55-69%" },
    { grade: 5, paper1: "28-37", paper2: "35-44", exploration: "12-14", final: "42-54%" },
    { grade: 4, paper1: "18-27", paper2: "24-34", exploration: "9-11", final: "29-41%" },
    { grade: 3, paper1: "13-17", paper2: "18-23", exploration: "6-8", final: "20-28%" },
    { grade: 2, paper1: "7-12", paper2: "9-17", exploration: "3-5", final: "10-19%" },
    { grade: 1, paper1: "0-6", paper2: "0-8", exploration: "0-2", final: "0-9%" },
  ];

  const hlData = [
    { grade: 7, paper1: "65-110", paper2: "65-110", paper3: "39-55", exploration: "17-20", final: "66-100%" },
    { grade: 6, paper1: "54-64", paper2: "54-64", paper3: "32-38", exploration: "15-16", final: "55-65%" },
    { grade: 5, paper1: "42-53", paper2: "44-53", paper3: "25-31", exploration: "12-14", final: "44-54%" },
    { grade: 4, paper1: "31-41", paper2: "33-43", paper3: "18-24", exploration: "9-11", final: "32-43%" },
    { grade: 3, paper1: "24-30", paper2: "26-32", paper3: "11-17", exploration: "6-8", final: "23-31%" },
    { grade: 2, paper1: "12-23", paper2: "13-25", paper3: "6-10", exploration: "3-5", final: "11-22%" },
    { grade: 1, paper1: "0-11", paper2: "0-12", paper3: "0-5", exploration: "0-2", final: "0-10%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Math AI Grade Boundaries"
      subtitle="Mathematics: Applications and Interpretation - May 2025"
      headers={["Grade", "Paper 1", "Paper 2", "Paper 3", "Exploration", "Final %"]}
      slData={slData.map(d => ({ ...d, paper3: "-" }))}
      hlData={hlData}
      slComponents="Paper 1: 80 marks (40%) | Paper 2: 80 marks (40%) | Exploration: 20 marks (20%)"
      hlComponents="Paper 1: 110 marks (30%) | Paper 2: 110 marks (30%) | Paper 3: 55 marks (20%) | Exploration: 20 marks (20%)"
      tips={[
        { title: "Paper 1 (Short Response)", content: "Practice applying formulas correctly. Focus on real-world context interpretation." },
        { title: "Paper 2 (Extended Response)", content: "Show all working and reasoning. Use your GDC effectively for statistics and modeling." },
        { title: "Paper 3 (HL Only)", content: "Practice extended problem-solving. Be prepared to explore unfamiliar mathematical contexts." },
        { title: "Exploration (IA)", content: "Choose a real-world application that interests you. Balance mathematical depth with clear explanations." },
      ]}
      relatedSubjects={[
        { name: "Math AA", path: "/homepage/grade-boundaries/math-aa" },
        { name: "Business Management", path: "/homepage/grade-boundaries/business-management" },
        { name: "Economics", path: "/homepage/grade-boundaries/economics" },
      ]}
    />
  );
}
