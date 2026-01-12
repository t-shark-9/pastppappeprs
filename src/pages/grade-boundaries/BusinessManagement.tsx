import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function BusinessManagementGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "36-50", paper2: "36-50", ia: "17-23", final: "72-100%" },
    { grade: 6, paper1: "30-35", paper2: "30-35", ia: "14-16", final: "60-71%" },
    { grade: 5, paper1: "24-29", paper2: "24-29", ia: "11-13", final: "48-59%" },
    { grade: 4, paper1: "18-23", paper2: "18-23", ia: "9-10", final: "36-47%" },
    { grade: 3, paper1: "12-17", paper2: "12-17", ia: "6-8", final: "24-35%" },
    { grade: 2, paper1: "6-11", paper2: "6-11", ia: "3-5", final: "12-23%" },
    { grade: 1, paper1: "0-5", paper2: "0-5", ia: "0-2", final: "0-11%" },
  ];

  const hlData = [
    { grade: 7, paper1: "36-50", paper2: "52-75", ia: "17-23", final: "71-100%" },
    { grade: 6, paper1: "30-35", paper2: "43-51", ia: "14-16", final: "59-70%" },
    { grade: 5, paper1: "24-29", paper2: "34-42", ia: "11-13", final: "47-58%" },
    { grade: 4, paper1: "18-23", paper2: "26-33", ia: "9-10", final: "35-46%" },
    { grade: 3, paper1: "12-17", paper2: "18-25", ia: "6-8", final: "24-34%" },
    { grade: 2, paper1: "6-11", paper2: "9-17", ia: "3-5", final: "12-23%" },
    { grade: 1, paper1: "0-5", paper2: "0-8", ia: "0-2", final: "0-11%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Business Management Grade Boundaries"
      subtitle="May 2025 Examination Session"
      headers={["Grade", "Paper 1", "Paper 2", "IA", "Final %"]}
      slData={slData}
      hlData={hlData}
      slComponents="Paper 1: 50 marks (35%) | Paper 2: 50 marks (35%) | IA: 23 marks (30%)"
      hlComponents="Paper 1: 50 marks (25%) | Paper 2: 75 marks (50%) | IA: 23 marks (25%)"
      tips={[
        { title: "Paper 1 (Case Study)", content: "Study the pre-released case study thoroughly. Apply business tools and concepts to the scenario." },
        { title: "Paper 2", content: "Practice applying SWOT, PEST, and other analysis tools. Use business terminology accurately." },
        { title: "Internal Assessment", content: "Choose a real organization with access to data. Apply appropriate business tools and make justified recommendations." },
      ]}
      relatedSubjects={[
        { name: "Economics", path: "/homepage/grade-boundaries/economics" },
        { name: "Global Politics", path: "/homepage/grade-boundaries/global-politics" },
        { name: "Math AI", path: "/homepage/grade-boundaries/math-ai" },
      ]}
    />
  );
}
