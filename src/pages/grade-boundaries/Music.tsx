import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function MusicGradeBoundaries() {
  const slData = [
    { grade: 7, exploring: "24-30", experimenting: "24-30", presenting: "24-30", final: "80-100%" },
    { grade: 6, exploring: "20-23", experimenting: "20-23", presenting: "20-23", final: "65-79%" },
    { grade: 5, exploring: "16-19", experimenting: "16-19", presenting: "16-19", final: "52-64%" },
    { grade: 4, exploring: "12-15", experimenting: "12-15", presenting: "12-15", final: "39-51%" },
    { grade: 3, exploring: "8-11", experimenting: "8-11", presenting: "8-11", final: "26-38%" },
    { grade: 2, exploring: "4-7", experimenting: "4-7", presenting: "4-7", final: "13-25%" },
    { grade: 1, exploring: "0-3", experimenting: "0-3", presenting: "0-3", final: "0-12%" },
  ];

  const hlData = [
    { grade: 7, exploring: "24-30", experimenting: "24-30", presenting: "24-30", final: "80-100%" },
    { grade: 6, exploring: "20-23", experimenting: "20-23", presenting: "20-23", final: "66-79%" },
    { grade: 5, exploring: "16-19", experimenting: "16-19", presenting: "16-19", final: "53-65%" },
    { grade: 4, exploring: "12-15", experimenting: "12-15", presenting: "12-15", final: "40-52%" },
    { grade: 3, exploring: "8-11", experimenting: "8-11", presenting: "8-11", final: "27-39%" },
    { grade: 2, exploring: "4-7", experimenting: "4-7", presenting: "4-7", final: "14-26%" },
    { grade: 1, exploring: "0-3", experimenting: "0-3", presenting: "0-3", final: "0-13%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Music Grade Boundaries"
      subtitle="May 2025 Examination Session"
      headers={["Grade", "Exploring", "Experimenting", "Presenting", "Final %"]}
      slData={slData}
      hlData={hlData}
      slComponents="Exploring Music: 30 marks (30%) | Experimenting with Music: 30 marks (30%) | Presenting Music: 30 marks (40%)"
      hlComponents="Exploring Music: 30 marks (20%) | Experimenting with Music: 30 marks (30%) | Presenting Music: 30 marks (50%)"
      tips={[
        { title: "Exploring Music", content: "Analyze music from diverse contexts. Demonstrate understanding of musical elements and their effects." },
        { title: "Experimenting with Music", content: "Show creative development through your musical experiments. Document your process clearly." },
        { title: "Presenting Music", content: "Prepare performances thoroughly. For HL, demonstrate solo and collaborative skills." },
      ]}
      relatedSubjects={[
        { name: "Visual Arts", path: "/homepage/grade-boundaries/visual-arts" },
        { name: "Theatre", path: "/homepage/grade-boundaries/theatre" },
        { name: "Film", path: "/homepage/grade-boundaries/film" },
      ]}
    />
  );
}
