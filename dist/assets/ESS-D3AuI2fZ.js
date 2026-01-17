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

function ESSGradeBoundaries() {
  const slOnly = [
    { grade: 7, paper1: "25-35", paper2: "39-65", practical: "24-30", final: "66-100%" },
    { grade: 6, paper1: "21-24", paper2: "32-38", practical: "21-23", final: "56-65%" },
    { grade: 5, paper1: "17-20", paper2: "26-31", practical: "17-20", final: "45-55%" },
    { grade: 4, paper1: "13-16", paper2: "19-25", practical: "14-16", final: "34-44%" },
    { grade: 3, paper1: "8-12", paper2: "13-18", practical: "9-13", final: "22-33%" },
    { grade: 2, paper1: "4-7", paper2: "7-12", practical: "5-8", final: "11-21%" },
    { grade: 1, paper1: "0-3", paper2: "0-6", practical: "0-4", final: "0-10%" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GradeBoundaryTemplate,
    {
      title: "IB ESS Grade Boundaries",
      subtitle: "Environmental Systems and Societies - May 2025",
      headers: ["Grade", "Paper 1", "Paper 2", "Practical Work", "Final %"],
      slOnly,
      slComponents: "Paper 1: 35 marks (25%) | Paper 2: 65 marks (50%) | Practical Work: 30 marks (25%)",
      tips: [
        { title: "Paper 1 (Case Study)", content: "Practice analyzing unfamiliar case studies. Link environmental and societal perspectives." },
        { title: "Paper 2 (Extended Response)", content: "Use specific examples and data. Evaluate EVS (Environmental Value Systems) in your answers." },
        { title: "Practical Work (IA)", content: "Choose a researchable environmental question. Include both primary data collection and secondary research." }
      ],
      relatedSubjects: [
        { name: "Biology", path: "/homepage/grade-boundaries/biology" },
        { name: "Geography", path: "/homepage/grade-boundaries/geography" },
        { name: "Chemistry", path: "/homepage/grade-boundaries/chemistry" }
      ],
      ctaText: "Need help with your ESS IA?"
    }
  );
}

export { ESSGradeBoundaries as default };
