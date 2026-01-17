import { GradeBoundaryTemplate } from "@/components/GradeBoundaryTemplate";

export default function LanguageAbInitioGradeBoundaries() {
  const slOnly = [
    { grade: 7, paper1: "27-30", listening: "20-25", reading: "28-40", ia: "27-30", final: "80-100%" },
    { grade: 6, paper1: "23-26", listening: "16-19", reading: "23-27", ia: "22-26", final: "66-79%" },
    { grade: 5, paper1: "18-22", listening: "12-15", reading: "17-22", ia: "18-21", final: "50-65%" },
    { grade: 4, paper1: "14-17", listening: "8-11", reading: "12-16", ia: "13-17", final: "36-49%" },
    { grade: 3, paper1: "8-13", listening: "5-7", reading: "7-11", ia: "8-12", final: "20-35%" },
    { grade: 2, paper1: "4-7", listening: "3-4", reading: "4-6", ia: "4-7", final: "10-19%" },
    { grade: 1, paper1: "0-3", listening: "0-2", reading: "0-3", ia: "0-3", final: "0-9%" },
  ];

  return (
    <GradeBoundaryTemplate
      title="IB Language ab initio Grade Boundaries"
      subtitle="Spanish, French, German, Mandarin - May 2025 (SL Only)"
      headers={["Grade", "Paper 1 (Writing)", "Paper 2 (Listening)", "Paper 2 (Reading)", "IA (Speaking)", "Final %"]}
      slOnly={slOnly}
      slComponents="Paper 1: 30 marks (30%) | Paper 2 Listening: 25 marks (25%) | Paper 2 Reading: 40 marks (25%) | IA: 30 marks (20%)"
      tips={[
        { title: "Paper 1 (Productive Skills)", content: "Write in different text types. Focus on vocabulary range, accuracy, and appropriate register." },
        { title: "Paper 2 Listening", content: "Practice with authentic audio materials. Develop note-taking and comprehension strategies." },
        { title: "Paper 2 Reading", content: "Read diverse text types from different cultures. Practice skimming and detailed comprehension." },
        { title: "Individual Oral", content: "Discuss visual stimuli and personal experiences. Practice fluency and cultural awareness." },
      ]}
      relatedSubjects={[
        { name: "Language B", path: "/homepage/grade-boundaries/language-b" },
        { name: "Global Politics", path: "/homepage/grade-boundaries/global-politics" },
        { name: "Geography", path: "/homepage/grade-boundaries/geography" },
      ]}
      ctaText="Need help with your ab initio oral assessment?"
    />
  );
}
