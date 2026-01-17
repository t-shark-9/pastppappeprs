import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function MathAAGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "50-80", paper2: "47-80", exploration: "17-20", final: "65-100%" },
    { grade: 6, paper1: "40-49", paper2: "36-46", exploration: "15-16", final: "52-64%" },
    { grade: 5, paper1: "29-39", paper2: "26-35", exploration: "12-14", final: "38-51%" },
    { grade: 4, paper1: "19-28", paper2: "15-25", exploration: "9-11", final: "25-37%" },
    { grade: 3, paper1: "11-18", paper2: "9-14", exploration: "6-8", final: "15-24%" },
    { grade: 2, paper1: "6-10", paper2: "5-8", exploration: "3-5", final: "7-14%" },
    { grade: 1, paper1: "0-5", paper2: "0-4", exploration: "0-2", final: "0-6%" },
  ];

  const hlData = [
    { grade: 7, paper1: "76-110", paper2: "67-110", paper3: "48-55", exploration: "17-20", final: "73-100%" },
    { grade: 6, paper1: "61-75", paper2: "54-66", paper3: "41-47", exploration: "15-16", final: "60-72%" },
    { grade: 5, paper1: "45-60", paper2: "42-53", paper3: "35-40", exploration: "12-14", final: "48-59%" },
    { grade: 4, paper1: "30-44", paper2: "29-41", paper3: "28-34", exploration: "9-11", final: "34-47%" },
    { grade: 3, paper1: "24-29", paper2: "22-28", paper3: "17-27", exploration: "6-8", final: "24-33%" },
    { grade: 2, paper1: "12-23", paper2: "11-21", paper3: "9-16", exploration: "3-5", final: "12-23%" },
    { grade: 1, paper1: "0-11", paper2: "0-10", paper3: "0-8", exploration: "0-2", final: "0-11%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Math AA Grade Boundaries"
      subtitle="Mathematics: Analysis and Approaches - May 2025"
      headers={["Grade", "Paper 1", "Paper 2", "Paper 3", "Exploration", "Final %"]}
      slData={slData.map(d => ({ ...d, paper3: "-" }))}
      hlData={hlData}
      slComponents="Paper 1: 80 marks (40%) | Paper 2: 80 marks (40%) | Exploration: 20 marks (20%)"
      hlComponents="Paper 1: 110 marks (30%) | Paper 2: 110 marks (30%) | Paper 3: 55 marks (20%) | Exploration: 20 marks (20%)"
      tips={[
        { title: "Paper 1 (No Calculator)", content: "Master algebraic manipulation, derivatives, and integrals by hand. Practice mental math." },
        { title: "Paper 2 (Calculator)", content: "Know your GDC well. Use it for graphing, solving equations, and statistical calculations." },
        { title: "Paper 3 (HL Only)", content: "Practice problem-solving with unfamiliar contexts. Show all reasoning clearly." },
        { title: "Exploration (IA)", content: "Choose a topic you're genuinely interested in. Demonstrate personal engagement and mathematical rigor." },
      ]}
      relatedSubjects={[
        { name: "Math AI", path: "/homepage/grade-boundaries/math-ai" },
        { name: "Physics", path: "/homepage/grade-boundaries/physics" },
        { name: "Economics", path: "/homepage/grade-boundaries/economics" },
      ]}
    />
  );
}
