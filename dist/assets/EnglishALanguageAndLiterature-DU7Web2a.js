import { j as jsxRuntimeExports } from './vendor-react-BeQHm2Hb.js';
import { G as GradeBoundaryTemplate } from './GradeBoundaryTemplate-CiytVgFc.js';
import './vendor-react-dom-b1tP6waW.js';
import './vendor-misc-CQ2gQV2M.js';
import './vendor-utils-B8uxCDj6.js';
import './vendor-export-COR0N_gy.js';
import './vendor-blocknote-BAmltmDn.js';
import './vendor-prosemirror-l_ukq4jw.js';
import './vendor-yjs-BarRwqAh.js';
import './vendor-tiptap-tuOT8GNt.js';
import './vendor-mantine-CpjnkULY.js';
import './vendor-radix-BjF_gpzx.js';
import './vendor-i18n-BRT6rIp6.js';
import './vendor-datefns-Cgc6WLhj.js';
import './vendor-syncfusion-B9hbBizT.js';
import './vendor-ketcher-B9jnF8te.js';
import './index-C9tyh6tO.js';
import './vendor-react-router-D-UwvF_4.js';
import './vendor-supabase-B1aOSilF.js';
import './back-button-CJe-DRZZ.js';
import './card-BTaNjRSt.js';
import './table-CP2-oe9M.js';

function EnglishALanguageAndLiteratureGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "17-20", paper2: "22-30", io: "34-40", final: "78-100%" },
    { grade: 6, paper1: "14-16", paper2: "17-21", io: "29-33", final: "63-77%" },
    { grade: 5, paper1: "11-13", paper2: "12-16", io: "24-28", final: "49-62%" },
    { grade: 4, paper1: "8-10", paper2: "7-11", io: "19-23", final: "34-48%" },
    { grade: 3, paper1: "5-7", paper2: "5-6", io: "13-18", final: "22-33%" },
    { grade: 2, paper1: "3-4", paper2: "3-4", io: "7-12", final: "11-21%" },
    { grade: 1, paper1: "0-2", paper2: "0-2", io: "0-6", final: "0-10%" }
  ];
  const hlData = [
    { grade: 7, paper1: "31-40", paper2: "22-30", io: "34-40", hlessay: "18-20", final: "78-100%" },
    { grade: 6, paper1: "27-30", paper2: "17-21", io: "29-33", hlessay: "15-17", final: "65-77%" },
    { grade: 5, paper1: "22-26", paper2: "12-16", io: "24-28", hlessay: "13-14", final: "52-64%" },
    { grade: 4, paper1: "17-21", paper2: "7-11", io: "19-23", hlessay: "10-12", final: "38-51%" },
    { grade: 3, paper1: "11-16", paper2: "5-6", io: "13-18", hlessay: "7-9", final: "25-37%" },
    { grade: 2, paper1: "6-10", paper2: "3-4", io: "7-12", hlessay: "4-6", final: "13-24%" },
    { grade: 1, paper1: "0-5", paper2: "0-2", io: "0-6", hlessay: "0-3", final: "0-12%" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GradeBoundaryTemplate,
    {
      title: "IB English A: Language and Literature Grade Boundaries",
      subtitle: "May 2025 Examination Session",
      headers: ["Grade", "Paper 1", "Paper 2", "Individual Oral", "HL Essay", "Final %"],
      slData: slData.map((d) => ({ ...d, hlessay: "-" })),
      hlData,
      slComponents: "Paper 1: 20 marks (35%) | Paper 2: 30 marks (35%) | Individual Oral: 40 marks (30%)",
      hlComponents: "Paper 1: 40 marks (35%) | Paper 2: 30 marks (25%) | Individual Oral: 40 marks (20%) | HL Essay: 20 marks (20%)",
      tips: [
        { title: "Paper 1 (Guided Analysis)", content: "Analyze non-literary texts using language and stylistic features. Focus on how meaning is constructed through language choices." },
        { title: "Paper 2 (Comparative Essay)", content: "Compare works from different text types or time periods. Show understanding of how context influences meaning." },
        { title: "Individual Oral", content: "Choose extracts that connect to global issues. Practice linking language analysis to broader themes." },
        { title: "HL Essay", content: "Write an extended essay on a line of inquiry. Show original thinking and critical analysis." }
      ],
      relatedSubjects: [
        { name: "English A Literature", path: "/homepage/grade-boundaries/english-a-literature" },
        { name: "Language A Lit & Performance", path: "/homepage/grade-boundaries/language-a-literature-performance" },
        { name: "Language B", path: "/homepage/grade-boundaries/language-b" }
      ]
    }
  );
}

export { EnglishALanguageAndLiteratureGradeBoundaries as default };
