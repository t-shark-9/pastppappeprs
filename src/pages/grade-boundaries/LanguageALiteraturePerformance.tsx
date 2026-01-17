import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function LanguageALiteraturePerformanceGradeBoundaries() {
  const slOnly = [
    { grade: 7, paper1: "23-30", written: "23-26", ia: "29-32", final: "83-100%" },
    { grade: 6, paper1: "18-22", written: "18-22", ia: "26-28", final: "69-82%" },
    { grade: 5, paper1: "14-17", written: "14-17", ia: "22-25", final: "55-68%" },
    { grade: 4, paper1: "9-13", written: "9-13", ia: "19-21", final: "41-54%" },
    { grade: 3, paper1: "6-8", written: "6-8", ia: "13-18", final: "27-40%" },
    { grade: 2, paper1: "3-5", written: "3-5", ia: "7-12", final: "13-26%" },
    { grade: 1, paper1: "0-2", written: "0-2", ia: "0-6", final: "0-12%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Language A: Literature and Performance Grade Boundaries"
      subtitle="May 2025 Examination Session (SL Only)"
      headers={["Grade", "Paper 1", "Written Assessment", "IA", "Final %"]}
      slOnly={slOnly}
      slComponents="Paper 1: 30 marks (30%) | Written Assessment: 26 marks (35%) | IA: 32 marks (35%)"
      tips={[
        { title: "Paper 1 (Guided Analysis)", content: "Analyze unseen literary texts. Focus on literary techniques and their effects on meaning." },
        { title: "Written Assessment", content: "Complete written tasks based on studied works. Show understanding of context and literary conventions." },
        { title: "Internal Assessment", content: "Perform and reflect on literary works. Demonstrate understanding through creative interpretation." },
      ]}
      relatedSubjects={[
        { name: "English A Literature", path: "/homepage/grade-boundaries/english-a-literature" },
        { name: "English A Lang & Lit", path: "/homepage/grade-boundaries/english-a-language-literature" },
        { name: "Theatre", path: "/homepage/grade-boundaries/theatre" },
      ]}
      ctaText="Need help with your Literature and Performance assessment?"
    />
  );
}
