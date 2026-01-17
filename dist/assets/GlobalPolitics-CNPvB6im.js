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

function GlobalPoliticsGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "34-50", paper2: "34-50", engagement: "18-25", final: "75-100%" },
    { grade: 6, paper1: "28-33", paper2: "28-33", engagement: "15-17", final: "62-74%" },
    { grade: 5, paper1: "23-27", paper2: "23-27", engagement: "12-14", final: "50-61%" },
    { grade: 4, paper1: "18-22", paper2: "18-22", engagement: "9-11", final: "38-49%" },
    { grade: 3, paper1: "12-17", paper2: "12-17", engagement: "6-8", final: "25-37%" },
    { grade: 2, paper1: "6-11", paper2: "6-11", engagement: "3-5", final: "12-24%" },
    { grade: 1, paper1: "0-5", paper2: "0-5", engagement: "0-2", final: "0-11%" }
  ];
  const hlData = [
    { grade: 7, paper1: "34-50", paper2: "50-70", engagement: "18-25", final: "75-100%" },
    { grade: 6, paper1: "28-33", paper2: "42-49", engagement: "15-17", final: "62-74%" },
    { grade: 5, paper1: "23-27", paper2: "34-41", engagement: "12-14", final: "50-61%" },
    { grade: 4, paper1: "18-22", paper2: "26-33", engagement: "9-11", final: "38-49%" },
    { grade: 3, paper1: "12-17", paper2: "18-25", engagement: "6-8", final: "25-37%" },
    { grade: 2, paper1: "6-11", paper2: "9-17", engagement: "3-5", final: "12-24%" },
    { grade: 1, paper1: "0-5", paper2: "0-8", engagement: "0-2", final: "0-11%" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GradeBoundaryTemplate,
    {
      title: "IB Global Politics Grade Boundaries",
      subtitle: "May 2025 Examination Session",
      headers: ["Grade", "Paper 1", "Paper 2", "Engagement Activity", "Final %"],
      slData,
      hlData,
      slComponents: "Paper 1: 50 marks (30%) | Paper 2: 50 marks (45%) | Engagement Activity: 25 marks (25%)",
      hlComponents: "Paper 1: 50 marks (20%) | Paper 2: 70 marks (40%) | Engagement Activity: 25 marks (20%) | HL Extension: 20 marks (20%)",
      tips: [
        { title: "Paper 1 (Stimulus-based)", content: "Analyze source material critically. Link to political concepts and theories." },
        { title: "Paper 2 (Essays)", content: "Structure essays clearly with thesis, arguments, and examples. Use case studies effectively." },
        { title: "Engagement Activity", content: "Choose a genuine political issue. Demonstrate critical thinking and personal engagement." }
      ],
      relatedSubjects: [
        { name: "History", path: "/homepage/grade-boundaries/history" },
        { name: "Economics", path: "/homepage/grade-boundaries/economics" },
        { name: "Philosophy", path: "/homepage/grade-boundaries/philosophy" }
      ]
    }
  );
}

export { GlobalPoliticsGradeBoundaries as default };
