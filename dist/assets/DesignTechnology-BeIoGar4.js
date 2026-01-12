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

function DesignTechnologyGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "23-32", paper2: "43-60", ia: "43-54", final: "73-100%" },
    { grade: 6, paper1: "19-22", paper2: "35-42", ia: "36-42", final: "60-72%" },
    { grade: 5, paper1: "15-18", paper2: "27-34", ia: "28-35", final: "47-59%" },
    { grade: 4, paper1: "11-14", paper2: "20-26", ia: "21-27", final: "35-46%" },
    { grade: 3, paper1: "7-10", paper2: "13-19", ia: "14-20", final: "23-34%" },
    { grade: 2, paper1: "4-6", paper2: "7-12", ia: "7-13", final: "12-22%" },
    { grade: 1, paper1: "0-3", paper2: "0-6", ia: "0-6", final: "0-11%" }
  ];
  const hlData = [
    { grade: 7, paper1: "23-32", paper2: "43-60", paper3: "28-40", ia: "43-54", final: "72-100%" },
    { grade: 6, paper1: "19-22", paper2: "35-42", paper3: "22-27", ia: "36-42", final: "59-71%" },
    { grade: 5, paper1: "15-18", paper2: "27-34", paper3: "17-21", ia: "28-35", final: "46-58%" },
    { grade: 4, paper1: "11-14", paper2: "21-26", paper3: "12-16", ia: "21-27", final: "34-45%" },
    { grade: 3, paper1: "8-10", paper2: "14-20", paper3: "8-11", ia: "15-20", final: "24-33%" },
    { grade: 2, paper1: "4-7", paper2: "8-13", paper3: "4-7", ia: "8-14", final: "13-23%" },
    { grade: 1, paper1: "0-3", paper2: "0-7", paper3: "0-3", ia: "0-7", final: "0-12%" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GradeBoundaryTemplate,
    {
      title: "IB Design Technology Grade Boundaries",
      subtitle: "May 2025 Examination Session",
      headers: ["Grade", "Paper 1", "Paper 2", "Paper 3", "IA", "Final %"],
      slData: slData.map((d) => ({ ...d, paper3: "-" })),
      hlData,
      slComponents: "Paper 1: 32 marks (30%) | Paper 2: 60 marks (30%) | IA: 54 marks (40%)",
      hlComponents: "Paper 1: 32 marks (20%) | Paper 2: 60 marks (25%) | Paper 3: 40 marks (25%) | IA: 54 marks (30%)",
      tips: [
        { title: "Paper 1 (MCQ)", content: "Know design cycle stages and terminology. Practice quick recall of key concepts." },
        { title: "Paper 2", content: "Draw clear annotated sketches. Explain your design decisions with reasoning." },
        { title: "Paper 3 (HL)", content: "Practice case study analysis. Link design theory to practical applications." },
        { title: "Design Project (IA)", content: "Follow the design cycle thoroughly. Document all testing and evaluation with evidence." }
      ],
      relatedSubjects: [
        { name: "Visual Arts", path: "/homepage/grade-boundaries/visual-arts" },
        { name: "Computer Science", path: "/homepage/grade-boundaries/computer-science" },
        { name: "Physics", path: "/homepage/grade-boundaries/physics" }
      ]
    }
  );
}

export { DesignTechnologyGradeBoundaries as default };
