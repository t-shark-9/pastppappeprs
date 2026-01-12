import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function WorldReligionsGradeBoundaries() {
  const slOnly = [
    { grade: 7, paper1: "40-55", paper2: "34-50", ia: "18-25", final: "72-100%" },
    { grade: 6, paper1: "33-39", paper2: "28-33", ia: "15-17", final: "60-71%" },
    { grade: 5, paper1: "27-32", paper2: "22-27", ia: "12-14", final: "48-59%" },
    { grade: 4, paper1: "21-26", paper2: "17-21", ia: "9-11", final: "37-47%" },
    { grade: 3, paper1: "14-20", paper2: "11-16", ia: "6-8", final: "25-36%" },
    { grade: 2, paper1: "7-13", paper2: "6-10", ia: "3-5", final: "13-24%" },
    { grade: 1, paper1: "0-6", paper2: "0-5", ia: "0-2", final: "0-12%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB World Religions Grade Boundaries"
      subtitle="May 2025 Examination Session (SL Only)"
      headers={["Grade", "Paper 1", "Paper 2", "IA", "Final %"]}
      slOnly={slOnly}
      slComponents="Paper 1: 55 marks (40%) | Paper 2: 50 marks (35%) | IA: 25 marks (25%)"
      tips={[
        { title: "Paper 1", content: "Know key beliefs, practices, and texts of studied religions. Compare and contrast effectively." },
        { title: "Paper 2", content: "Analyze religious concepts through case studies. Use specific examples from different traditions." },
        { title: "Internal Assessment", content: "Choose a focused topic related to living religious practices. Include primary research." },
      ]}
      relatedSubjects={[
        { name: "Philosophy", path: "/homepage/grade-boundaries/philosophy" },
        { name: "Anthropology", path: "/homepage/grade-boundaries/anthropology" },
        { name: "History", path: "/homepage/grade-boundaries/history" },
      ]}
      ctaText="Need help with your World Religions IA?"
    />
  );
}
