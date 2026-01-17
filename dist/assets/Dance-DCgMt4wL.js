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

function DanceGradeBoundaries() {
  const slData = [
    { grade: 7, composition: "24-30", performance: "24-30", analysis: "24-30", final: "80-100%" },
    { grade: 6, composition: "20-23", performance: "20-23", analysis: "20-23", final: "66-79%" },
    { grade: 5, composition: "16-19", performance: "16-19", analysis: "16-19", final: "53-65%" },
    { grade: 4, composition: "12-15", performance: "12-15", analysis: "12-15", final: "40-52%" },
    { grade: 3, composition: "8-11", performance: "8-11", analysis: "8-11", final: "26-39%" },
    { grade: 2, composition: "4-7", performance: "4-7", analysis: "4-7", final: "13-25%" },
    { grade: 1, composition: "0-3", performance: "0-3", analysis: "0-3", final: "0-12%" }
  ];
  const hlData = [
    { grade: 7, composition: "24-30", performance: "24-30", analysis: "24-30", final: "80-100%" },
    { grade: 6, composition: "20-23", performance: "20-23", analysis: "20-23", final: "67-79%" },
    { grade: 5, composition: "16-19", performance: "16-19", analysis: "16-19", final: "54-66%" },
    { grade: 4, composition: "12-15", performance: "12-15", analysis: "12-15", final: "40-53%" },
    { grade: 3, composition: "8-11", performance: "8-11", analysis: "8-11", final: "27-39%" },
    { grade: 2, composition: "4-7", performance: "4-7", analysis: "4-7", final: "13-26%" },
    { grade: 1, composition: "0-3", performance: "0-3", analysis: "0-3", final: "0-12%" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GradeBoundaryTemplate,
    {
      title: "IB Dance Grade Boundaries",
      subtitle: "May 2025 Examination Session",
      headers: ["Grade", "Composition", "Performance", "Analysis", "Final %"],
      slData,
      hlData,
      slComponents: "Composition & Analysis: 30 marks (40%) | Dance Performance: 30 marks (30%) | Dance at the Core: 30 marks (30%)",
      hlComponents: "Composition & Analysis: 30 marks (40%) | Dance Performance: 30 marks (30%) | Dance at the Core: 30 marks (30%)",
      tips: [
        { title: "Composition", content: "Create a dance that communicates a clear intention. Consider movement vocabulary, structure, and dynamics." },
        { title: "Performance", content: "Demonstrate technical skill and artistry. Show understanding of the choreographer's intent." },
        { title: "Dance Analysis", content: "Analyze dances from different contexts. Use appropriate dance terminology and theory." }
      ],
      relatedSubjects: [
        { name: "Theatre", path: "/homepage/grade-boundaries/theatre" },
        { name: "Music", path: "/homepage/grade-boundaries/music" },
        { name: "Visual Arts", path: "/homepage/grade-boundaries/visual-arts" }
      ]
    }
  );
}

export { DanceGradeBoundaries as default };
