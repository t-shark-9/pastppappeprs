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

function PhilosophyGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "36-50", ia: "18-25", final: "72-100%" },
    { grade: 6, paper1: "30-35", ia: "15-17", final: "60-71%" },
    { grade: 5, paper1: "24-29", ia: "12-14", final: "48-59%" },
    { grade: 4, paper1: "19-23", ia: "9-11", final: "37-47%" },
    { grade: 3, paper1: "13-18", ia: "6-8", final: "25-36%" },
    { grade: 2, paper1: "7-12", ia: "3-5", final: "13-24%" },
    { grade: 1, paper1: "0-6", ia: "0-2", final: "0-12%" }
  ];
  const hlData = [
    { grade: 7, paper1: "36-50", paper2: "18-25", ia: "18-25", final: "72-100%" },
    { grade: 6, paper1: "30-35", paper2: "15-17", ia: "15-17", final: "60-71%" },
    { grade: 5, paper1: "24-29", paper2: "12-14", ia: "12-14", final: "48-59%" },
    { grade: 4, paper1: "19-23", paper2: "9-11", ia: "9-11", final: "37-47%" },
    { grade: 3, paper1: "13-18", paper2: "6-8", ia: "6-8", final: "25-36%" },
    { grade: 2, paper1: "7-12", paper2: "3-5", ia: "3-5", final: "13-24%" },
    { grade: 1, paper1: "0-6", paper2: "0-2", ia: "0-2", final: "0-12%" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GradeBoundaryTemplate,
    {
      title: "IB Philosophy Grade Boundaries",
      subtitle: "May 2025 Examination Session",
      headers: ["Grade", "Paper 1", "Paper 2", "IA", "Final %"],
      slData: slData.map((d) => ({ ...d, paper2: "-" })),
      hlData,
      slComponents: "Paper 1: 50 marks (75%) | IA: 25 marks (25%)",
      hlComponents: "Paper 1: 50 marks (50%) | Paper 2: 25 marks (25%) | IA: 25 marks (25%)",
      tips: [
        { title: "Paper 1", content: "Know key philosophical arguments and thinkers. Construct clear, logical arguments with examples." },
        { title: "Paper 2 (HL)", content: "Practice unseen philosophical analysis. Engage critically with unfamiliar texts." },
        { title: "Internal Assessment", content: "Choose a focused philosophical question. Show original thinking and rigorous analysis." }
      ],
      relatedSubjects: [
        { name: "TOK", path: "/homepage/grade-boundaries/tok" },
        { name: "History", path: "/homepage/grade-boundaries/history" },
        { name: "Global Politics", path: "/homepage/grade-boundaries/global-politics" }
      ]
    }
  );
}

export { PhilosophyGradeBoundaries as default };
