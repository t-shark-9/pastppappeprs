import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function FilmGradeBoundaries() {
  const slData = [
    { grade: 7, textual: "20-24", film: "18-24", portfolio: "24-32", final: "78-100%" },
    { grade: 6, textual: "17-19", film: "15-17", portfolio: "20-23", final: "65-77%" },
    { grade: 5, textual: "14-16", film: "12-14", portfolio: "16-19", final: "52-64%" },
    { grade: 4, textual: "10-13", film: "9-11", portfolio: "12-15", final: "39-51%" },
    { grade: 3, textual: "7-9", film: "6-8", portfolio: "8-11", final: "26-38%" },
    { grade: 2, textual: "4-6", film: "3-5", portfolio: "4-7", final: "13-25%" },
    { grade: 1, textual: "0-3", film: "0-2", portfolio: "0-3", final: "0-12%" },
  ];

  const hlData = [
    { grade: 7, textual: "20-24", film: "18-24", collaborative: "23-30", portfolio: "24-32", final: "77-100%" },
    { grade: 6, textual: "17-19", film: "15-17", collaborative: "19-22", portfolio: "20-23", final: "64-76%" },
    { grade: 5, textual: "14-16", film: "12-14", collaborative: "15-18", portfolio: "16-19", final: "51-63%" },
    { grade: 4, textual: "10-13", film: "9-11", collaborative: "11-14", portfolio: "12-15", final: "38-50%" },
    { grade: 3, textual: "7-9", film: "6-8", collaborative: "7-10", portfolio: "8-11", final: "25-37%" },
    { grade: 2, textual: "4-6", film: "3-5", collaborative: "4-6", portfolio: "4-7", final: "13-24%" },
    { grade: 1, textual: "0-3", film: "0-2", collaborative: "0-3", portfolio: "0-3", final: "0-12%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Film Grade Boundaries"
      subtitle="May 2025 Examination Session"
      headers={["Grade", "Textual Analysis", "Film", "Collaborative", "Portfolio", "Final %"]}
      slData={slData.map(d => ({ ...d, collaborative: "-" }))}
      hlData={hlData}
      slComponents="Textual Analysis: 24 marks (30%) | Film: 24 marks (35%) | Film Portfolio: 32 marks (35%)"
      hlComponents="Textual Analysis: 24 marks (20%) | Film: 24 marks (25%) | Collaborative Project: 30 marks (25%) | Portfolio: 32 marks (30%)"
      tips={[
        { title: "Textual Analysis", content: "Practice analyzing film sequences in detail. Use correct film terminology and theory." },
        { title: "Film Reel", content: "Plan your film carefully with storyboards. Pay attention to cinematography, editing, and sound design." },
        { title: "Collaborative Project (HL)", content: "Work effectively with others. Document your specific contributions clearly." },
        { title: "Film Portfolio", content: "Show your development as a filmmaker. Include research, planning, and critical reflection." },
      ]}
      relatedSubjects={[
        { name: "Visual Arts", path: "/homepage/grade-boundaries/visual-arts" },
        { name: "Theatre", path: "/homepage/grade-boundaries/theatre" },
        { name: "Music", path: "/homepage/grade-boundaries/music" },
      ]}
    />
  );
}
