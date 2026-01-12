import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function ComputerScienceGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "60-100", paper2: "38-65", ia: "27-34", final: "74-100%" },
    { grade: 6, paper1: "49-59", paper2: "30-37", ia: "22-26", final: "60-73%" },
    { grade: 5, paper1: "38-48", paper2: "23-29", ia: "17-21", final: "46-59%" },
    { grade: 4, paper1: "28-37", paper2: "16-22", ia: "12-16", final: "33-45%" },
    { grade: 3, paper1: "19-27", paper2: "10-15", ia: "8-11", final: "22-32%" },
    { grade: 2, paper1: "10-18", paper2: "5-9", ia: "4-7", final: "11-21%" },
    { grade: 1, paper1: "0-9", paper2: "0-4", ia: "0-3", final: "0-10%" },
  ];

  const hlData = [
    { grade: 7, paper1: "60-100", paper2: "45-65", paper3: "20-30", ia: "27-34", final: "72-100%" },
    { grade: 6, paper1: "50-59", paper2: "35-44", paper3: "16-19", ia: "23-26", final: "59-71%" },
    { grade: 5, paper1: "40-49", paper2: "26-34", paper3: "12-15", ia: "18-22", final: "45-58%" },
    { grade: 4, paper1: "30-39", paper2: "18-25", paper3: "8-11", ia: "13-17", final: "32-44%" },
    { grade: 3, paper1: "21-29", paper2: "11-17", paper3: "5-7", ia: "9-12", final: "21-31%" },
    { grade: 2, paper1: "11-20", paper2: "5-10", paper3: "2-4", ia: "5-8", final: "11-20%" },
    { grade: 1, paper1: "0-10", paper2: "0-4", paper3: "0-1", ia: "0-4", final: "0-10%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Computer Science Grade Boundaries"
      subtitle="May 2025 Examination Session"
      headers={["Grade", "Paper 1", "Paper 2", "Paper 3", "IA", "Final %"]}
      slData={slData.map(d => ({ ...d, paper3: "-" }))}
      hlData={hlData}
      slComponents="Paper 1: 100 marks (45%) | Paper 2: 65 marks (25%) | IA: 34 marks (30%)"
      hlComponents="Paper 1: 100 marks (40%) | Paper 2: 65 marks (20%) | Paper 3: 30 marks (20%) | IA: 34 marks (20%)"
      tips={[
        { title: "Paper 1", content: "Practice writing pseudocode and trace tables. Understand algorithms and data structures thoroughly." },
        { title: "Paper 2 (Option)", content: "Know your chosen option topic deeply. Practice extended response questions." },
        { title: "Paper 3 (HL Case Study)", content: "Study the pre-released case study material thoroughly. Practice linking concepts to scenarios." },
        { title: "Internal Assessment", content: "Choose a real-world problem to solve. Document your development process clearly with proper testing." },
      ]}
      relatedSubjects={[
        { name: "Math AA", path: "/homepage/grade-boundaries/math-aa" },
        { name: "Math AI", path: "/homepage/grade-boundaries/math-ai" },
        { name: "Physics", path: "/homepage/grade-boundaries/physics" },
      ]}
    />
  );
}
