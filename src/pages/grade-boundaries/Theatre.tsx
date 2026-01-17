import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function TheatreGradeBoundaries() {
  const slData = [
    { grade: 7, production: "18-24", directors: "18-24", research: "18-24", final: "75-100%" },
    { grade: 6, production: "15-17", directors: "15-17", research: "15-17", final: "62-74%" },
    { grade: 5, production: "12-14", directors: "12-14", research: "12-14", final: "50-61%" },
    { grade: 4, production: "9-11", directors: "9-11", research: "9-11", final: "37-49%" },
    { grade: 3, production: "6-8", directors: "6-8", research: "6-8", final: "25-36%" },
    { grade: 2, production: "3-5", directors: "3-5", research: "3-5", final: "12-24%" },
    { grade: 1, production: "0-2", directors: "0-2", research: "0-2", final: "0-11%" },
  ];

  const hlData = [
    { grade: 7, production: "18-24", directors: "18-24", research: "18-24", solo: "18-24", final: "75-100%" },
    { grade: 6, production: "15-17", directors: "15-17", research: "15-17", solo: "15-17", final: "62-74%" },
    { grade: 5, production: "12-14", directors: "12-14", research: "12-14", solo: "12-14", final: "50-61%" },
    { grade: 4, production: "9-11", directors: "9-11", research: "9-11", solo: "9-11", final: "37-49%" },
    { grade: 3, production: "6-8", directors: "6-8", research: "6-8", solo: "6-8", final: "25-36%" },
    { grade: 2, production: "3-5", directors: "3-5", research: "3-5", solo: "3-5", final: "12-24%" },
    { grade: 1, production: "0-2", directors: "0-2", research: "0-2", solo: "0-2", final: "0-11%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Theatre Grade Boundaries"
      subtitle="May 2025 Examination Session"
      headers={["Grade", "Production Proposal", "Director's Notebook", "Research Presentation", "Solo Theatre", "Final %"]}
      slData={slData.map(d => ({ ...d, solo: "-" }))}
      hlData={hlData}
      slComponents="Production Proposal: 24 marks (35%) | Director's Notebook: 24 marks (35%) | Research Presentation: 24 marks (30%)"
      hlComponents="Production Proposal: 24 marks (25%) | Director's Notebook: 24 marks (20%) | Research Presentation: 24 marks (20%) | Solo Theatre: 24 marks (35%)"
      tips={[
        { title: "Production Proposal", content: "Present a clear artistic vision. Consider all production elements and their purpose." },
        { title: "Director's Notebook", content: "Document your directorial choices thoroughly. Show understanding of text and context." },
        { title: "Research Presentation", content: "Present research in an engaging, theatrical way. Connect theory to practice." },
        { title: "Solo Theatre Piece (HL)", content: "Create an original piece based on a theatre theorist. Show mastery of their techniques." },
      ]}
      relatedSubjects={[
        { name: "Film", path: "/homepage/grade-boundaries/film" },
        { name: "Music", path: "/homepage/grade-boundaries/music" },
        { name: "Visual Arts", path: "/homepage/grade-boundaries/visual-arts" },
      ]}
    />
  );
}
