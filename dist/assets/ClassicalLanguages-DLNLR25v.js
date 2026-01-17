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

function ClassicalLanguagesGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "18-30", paper2: "24-32", ia: "24-28", final: "68-100%" },
    { grade: 6, paper1: "15-17", paper2: "20-23", ia: "20-23", final: "58-70%" },
    { grade: 5, paper1: "12-14", paper2: "16-19", ia: "17-19", final: "47-57%" },
    { grade: 4, paper1: "9-11", paper2: "12-15", ia: "13-16", final: "35-46%" },
    { grade: 3, paper1: "7-8", paper2: "7-11", ia: "8-12", final: "22-34%" },
    { grade: 2, paper1: "4-6", paper2: "4-6", ia: "4-7", final: "11-21%" },
    { grade: 1, paper1: "0-3", paper2: "0-3", ia: "0-3", final: "0-10%" }
  ];
  const hlData = [
    { grade: 7, paper1: "26-40", paper2: "24-32", composition: "23-25", ia: "23-28", final: "75-100%" },
    { grade: 6, paper1: "21-25", paper2: "20-23", composition: "20-22", ia: "20-22", final: "63-74%" },
    { grade: 5, paper1: "17-20", paper2: "16-19", composition: "18-19", ia: "17-19", final: "52-62%" },
    { grade: 4, paper1: "12-16", paper2: "12-15", composition: "15-17", ia: "13-16", final: "39-51%" },
    { grade: 3, paper1: "9-11", paper2: "7-11", composition: "12-14", ia: "8-12", final: "26-38%" },
    { grade: 2, paper1: "5-8", paper2: "4-6", composition: "6-11", ia: "4-7", final: "13-25%" },
    { grade: 1, paper1: "0-4", paper2: "0-3", composition: "0-5", ia: "0-3", final: "0-11%" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GradeBoundaryTemplate,
    {
      title: "IB Classical Languages Grade Boundaries",
      subtitle: "Latin and Greek - May 2025 Examination Session",
      headers: ["Grade", "Paper 1", "Paper 2", "Composition", "IA", "Final %"],
      slData: slData.map((d) => ({ ...d, composition: "-" })),
      hlData,
      slComponents: "Paper 1: 30 marks (40%) | Paper 2: 32 marks (40%) | IA: 28 marks (20%)",
      hlComponents: "Paper 1: 40 marks (30%) | Paper 2: 32 marks (30%) | Composition: 25 marks (20%) | IA: 28 marks (20%)",
      tips: [
        { title: "Paper 1 (Translation)", content: "Practice translating unseen passages. Focus on accuracy and understanding of grammar and vocabulary." },
        { title: "Paper 2 (Comprehension)", content: "Answer questions on prescribed texts. Show deep understanding of context and literary devices." },
        { title: "Composition (HL)", content: "Write original Latin/Greek prose or verse. Master grammar rules and classical style." },
        { title: "Internal Assessment", content: "Research a topic related to classical civilization. Use primary sources and scholarly analysis." }
      ],
      relatedSubjects: [
        { name: "History", path: "/homepage/grade-boundaries/history" },
        { name: "Philosophy", path: "/homepage/grade-boundaries/philosophy" },
        { name: "English A Literature", path: "/homepage/grade-boundaries/english-a-literature" }
      ]
    }
  );
}

export { ClassicalLanguagesGradeBoundaries as default };
