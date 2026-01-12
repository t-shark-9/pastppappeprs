import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function VisualArtsGradeBoundaries() {
  const slData = [
    { grade: 7, comparative: "27-30", exhibition: "25-30", portfolio: "27-34", final: "81-100%" },
    { grade: 6, comparative: "23-26", exhibition: "20-24", portfolio: "21-26", final: "65-80%" },
    { grade: 5, comparative: "19-22", exhibition: "16-19", portfolio: "16-20", final: "51-64%" },
    { grade: 4, comparative: "15-18", exhibition: "11-15", portfolio: "10-15", final: "34-50%" },
    { grade: 3, comparative: "10-14", exhibition: "7-10", portfolio: "7-9", final: "22-33%" },
    { grade: 2, comparative: "5-9", exhibition: "4-6", portfolio: "4-6", final: "11-21%" },
    { grade: 1, comparative: "0-4", exhibition: "0-3", portfolio: "0-3", final: "0-10%" },
  ];

  const hlData = [
    { grade: 7, comparative: "36-42", exhibition: "25-30", portfolio: "28-34", final: "81-100%" },
    { grade: 6, comparative: "30-35", exhibition: "21-24", portfolio: "23-27", final: "67-80%" },
    { grade: 5, comparative: "24-29", exhibition: "17-20", portfolio: "18-22", final: "53-66%" },
    { grade: 4, comparative: "18-23", exhibition: "13-16", portfolio: "13-17", final: "39-52%" },
    { grade: 3, comparative: "12-17", exhibition: "7-12", portfolio: "8-12", final: "22-38%" },
    { grade: 2, comparative: "6-11", exhibition: "4-6", portfolio: "4-7", final: "11-21%" },
    { grade: 1, comparative: "0-5", exhibition: "0-3", portfolio: "0-3", final: "0-10%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Visual Arts Grade Boundaries"
      subtitle="May 2025 Examination Session"
      headers={["Grade", "Comparative Study", "Exhibition", "Process Portfolio", "Final %"]}
      slData={slData}
      hlData={hlData}
      slComponents="Comparative Study: 30 marks (20%) | Exhibition: 30 marks (40%) | Process Portfolio: 34 marks (40%)"
      hlComponents="Comparative Study: 42 marks (20%) | Exhibition: 30 marks (40%) | Process Portfolio: 34 marks (40%)"
      tips={[
        { title: "Comparative Study", content: "Make meaningful connections between works. Demonstrate cultural and historical awareness." },
        { title: "Exhibition", content: "Curate a cohesive body of work. Write strong curatorial rationale explaining your artistic intent." },
        { title: "Process Portfolio", content: "Document your artistic journey thoroughly. Show experimentation, reflection, and development." },
      ]}
      relatedSubjects={[
        { name: "Film", path: "/homepage/grade-boundaries/film" },
        { name: "Music", path: "/homepage/grade-boundaries/music" },
        { name: "Theatre", path: "/homepage/grade-boundaries/theatre" },
      ]}
      ctaText="Need help documenting your artistic process?"
    />
  );
}
