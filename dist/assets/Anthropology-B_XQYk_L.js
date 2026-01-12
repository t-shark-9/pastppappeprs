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

function AnthropologyGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "30-45", paper2: "34-50", ia: "18-25", final: "75-100%" },
    { grade: 6, paper1: "25-29", paper2: "28-33", ia: "15-17", final: "62-74%" },
    { grade: 5, paper1: "20-24", paper2: "22-27", ia: "12-14", final: "50-61%" },
    { grade: 4, paper1: "15-19", paper2: "17-21", ia: "9-11", final: "38-49%" },
    { grade: 3, paper1: "10-14", paper2: "11-16", ia: "6-8", final: "25-37%" },
    { grade: 2, paper1: "5-9", paper2: "6-10", ia: "3-5", final: "12-24%" },
    { grade: 1, paper1: "0-4", paper2: "0-5", ia: "0-2", final: "0-11%" }
  ];
  const hlData = [
    { grade: 7, paper1: "42-60", paper2: "34-50", ia: "18-25", final: "75-100%" },
    { grade: 6, paper1: "35-41", paper2: "28-33", ia: "15-17", final: "62-74%" },
    { grade: 5, paper1: "28-34", paper2: "22-27", ia: "12-14", final: "50-61%" },
    { grade: 4, paper1: "22-27", paper2: "17-21", ia: "9-11", final: "38-49%" },
    { grade: 3, paper1: "15-21", paper2: "11-16", ia: "6-8", final: "25-37%" },
    { grade: 2, paper1: "8-14", paper2: "6-10", ia: "3-5", final: "12-24%" },
    { grade: 1, paper1: "0-7", paper2: "0-5", ia: "0-2", final: "0-11%" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GradeBoundaryTemplate,
    {
      title: "IB Social and Cultural Anthropology Grade Boundaries",
      subtitle: "May 2025 Examination Session",
      headers: ["Grade", "Paper 1", "Paper 2", "IA", "Final %"],
      slData,
      hlData,
      slComponents: "Paper 1: 45 marks (40%) | Paper 2: 50 marks (35%) | IA: 25 marks (25%)",
      hlComponents: "Paper 1: 60 marks (40%) | Paper 2: 50 marks (35%) | IA: 25 marks (25%)",
      tips: [
        { title: "Paper 1", content: "Know key anthropological concepts and theories. Use ethnographic examples effectively." },
        { title: "Paper 2", content: "Practice analyzing unseen ethnographic texts. Make connections to anthropological theory." },
        { title: "Internal Assessment", content: "Choose a focused topic for your fieldwork. Follow ethical guidelines carefully." }
      ],
      relatedSubjects: [
        { name: "World Religions", path: "/homepage/grade-boundaries/world-religions" },
        { name: "History", path: "/homepage/grade-boundaries/history" },
        { name: "Geography", path: "/homepage/grade-boundaries/geography" }
      ]
    }
  );
}

export { AnthropologyGradeBoundaries as default };
