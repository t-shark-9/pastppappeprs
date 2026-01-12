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

function HistoryGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "21-30", paper2: "21-30", ia: "18-25", final: "75-100%" },
    { grade: 6, paper1: "17-20", paper2: "17-20", ia: "15-17", final: "62-74%" },
    { grade: 5, paper1: "14-16", paper2: "14-16", ia: "12-14", final: "50-61%" },
    { grade: 4, paper1: "10-13", paper2: "10-13", ia: "9-11", final: "38-49%" },
    { grade: 3, paper1: "7-9", paper2: "7-9", ia: "6-8", final: "25-37%" },
    { grade: 2, paper1: "4-6", paper2: "4-6", ia: "3-5", final: "13-24%" },
    { grade: 1, paper1: "0-3", paper2: "0-3", ia: "0-2", final: "0-12%" }
  ];
  const hlData = [
    { grade: 7, paper1: "21-30", paper2: "21-30", paper3: "21-30", ia: "18-25", final: "75-100%" },
    { grade: 6, paper1: "17-20", paper2: "17-20", paper3: "17-20", ia: "15-17", final: "62-74%" },
    { grade: 5, paper1: "14-16", paper2: "14-16", paper3: "14-16", ia: "12-14", final: "50-61%" },
    { grade: 4, paper1: "10-13", paper2: "10-13", paper3: "10-13", ia: "9-11", final: "38-49%" },
    { grade: 3, paper1: "7-9", paper2: "7-9", paper3: "7-9", ia: "6-8", final: "25-37%" },
    { grade: 2, paper1: "4-6", paper2: "4-6", paper3: "4-6", ia: "3-5", final: "13-24%" },
    { grade: 1, paper1: "0-3", paper2: "0-3", paper3: "0-3", ia: "0-2", final: "0-12%" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GradeBoundaryTemplate,
    {
      title: "IB History Grade Boundaries",
      subtitle: "May 2025 Examination Session",
      headers: ["Grade", "Paper 1", "Paper 2", "Paper 3", "IA", "Final %"],
      slData: slData.map((d) => ({ ...d, paper3: "-" })),
      hlData,
      slComponents: "Paper 1: 30 marks (30%) | Paper 2: 30 marks (45%) | IA: 25 marks (25%)",
      hlComponents: "Paper 1: 30 marks (20%) | Paper 2: 30 marks (25%) | Paper 3: 30 marks (35%) | IA: 25 marks (20%)",
      tips: [
        { title: "Paper 1 (Source-based)", content: "Practice analyzing sources for origin, purpose, value, and limitations. Link sources to context." },
        { title: "Paper 2 (World History)", content: "Know your two world history topics deeply. Practice essay structure with thesis and evidence." },
        { title: "Paper 3 (HL - Regional)", content: "Master your regional option. Practice extended essays with detailed historical analysis." },
        { title: "Internal Assessment", content: "Choose a focused historical investigation. Use primary and secondary sources effectively." }
      ],
      relatedSubjects: [
        { name: "Global Politics", path: "/homepage/grade-boundaries/global-politics" },
        { name: "Geography", path: "/homepage/grade-boundaries/geography" },
        { name: "Economics", path: "/homepage/grade-boundaries/economics" }
      ]
    }
  );
}

export { HistoryGradeBoundaries as default };
