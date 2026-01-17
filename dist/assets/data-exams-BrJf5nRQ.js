import { p as paperQuestions } from './data-exams-paper-BOO5-hy6.js';
import { e as examPapers } from './data-exams-full-qMJxY5lx.js';

function buildMCQExams() {
  const examsMap = /* @__PURE__ */ new Map();
  for (const q of paperQuestions) {
    if (q.paper !== "Paper 1") continue;
    const tzMatch = q.source.match(/TZ([012])/i);
    const timezone = tzMatch ? `TZ${tzMatch[1]}` : "";
    const examKey = `mcq_${q.subject}_${q.year}_${q.session}_${q.level}_${timezone}`;
    if (!examsMap.has(examKey)) {
      examsMap.set(examKey, {
        id: examKey,
        title: `${q.subject} Paper 1 ${q.level} ${q.session} ${q.year}${timezone ? ` ${timezone}` : ""}`,
        subject: q.subject,
        paper: "Paper 1",
        level: q.level,
        year: q.year,
        session: q.session,
        timezone,
        hasMarkScheme: false,
        // MCQ answers not extracted yet
        totalMarks: 0,
        questionCount: 0,
        paperType: "mcq",
        questions: []
      });
    }
    const exam = examsMap.get(examKey);
    const qNum = parseInt(q.text.match(/^(\d+)/)?.[1] || "0");
    exam.questions.push({
      id: q.id,
      questionNumber: qNum || exam.questions.length + 1,
      text: q.text,
      type: "mcq",
      subject: q.subject,
      year: q.year,
      session: q.session,
      level: q.level,
      correctAnswer: null
    });
  }
  for (const exam of examsMap.values()) {
    exam.questions.sort((a, b) => a.questionNumber - b.questionNumber);
    exam.questionCount = exam.questions.length;
    exam.totalMarks = exam.questionCount;
  }
  return Array.from(examsMap.values());
}
function buildLongAnswerExams() {
  return examPapers.map((exam) => ({
    id: `long_${exam.id}`,
    title: exam.title,
    subject: exam.subject,
    paper: exam.paper,
    level: exam.level,
    year: exam.year,
    session: exam.session,
    timezone: exam.timezone,
    hasMarkScheme: exam.hasMarkScheme,
    totalMarks: exam.totalMarks,
    questionCount: exam.questionCount,
    paperType: "long",
    questions: exam.questions.map((q) => ({
      id: q.id,
      questionNumber: q.questionNumber,
      context: q.context,
      parts: q.parts,
      totalMarks: q.totalMarks,
      type: "long"
    }))
  }));
}
const unifiedExamPapers = [
  ...buildMCQExams(),
  ...buildLongAnswerExams()
].sort((a, b) => {
  if (b.year !== a.year) return parseInt(b.year) - parseInt(a.year);
  if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
  return a.paper.localeCompare(b.paper);
});
function getUnifiedExamsBySubject(subject) {
  return unifiedExamPapers.filter((e) => e.subject === subject);
}
function getAllUnifiedExamSubjects() {
  return Array.from(new Set(unifiedExamPapers.map((e) => e.subject))).sort();
}
const mcqExams = unifiedExamPapers.filter((e) => e.paperType === "mcq");
const longExams = unifiedExamPapers.filter((e) => e.paperType === "long");
console.log(`Unified Exams: ${unifiedExamPapers.length} total (${mcqExams.length} MCQ, ${longExams.length} Long Answer)`);

export { getUnifiedExamsBySubject as a, getAllUnifiedExamSubjects as g, unifiedExamPapers as u };
