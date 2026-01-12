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

function DigitalSocietyGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "30-40", paper2: "36-50", ia: "24-30", final: "75-100%" },
    { grade: 6, paper1: "25-29", paper2: "30-35", ia: "20-23", final: "62-74%" },
    { grade: 5, paper1: "20-24", paper2: "24-29", ia: "16-19", final: "50-61%" },
    { grade: 4, paper1: "15-19", paper2: "18-23", ia: "12-15", final: "37-49%" },
    { grade: 3, paper1: "10-14", paper2: "12-17", ia: "8-11", final: "25-36%" },
    { grade: 2, paper1: "5-9", paper2: "6-11", ia: "4-7", final: "12-24%" },
    { grade: 1, paper1: "0-4", paper2: "0-5", ia: "0-3", final: "0-11%" }
  ];
  const hlData = [
    { grade: 7, paper1: "30-40", paper2: "36-50", paper3: "16-22", ia: "24-30", final: "74-100%" },
    { grade: 6, paper1: "25-29", paper2: "30-35", paper3: "13-15", ia: "20-23", final: "61-73%" },
    { grade: 5, paper1: "20-24", paper2: "24-29", paper3: "10-12", ia: "16-19", final: "49-60%" },
    { grade: 4, paper1: "15-19", paper2: "18-23", paper3: "7-9", ia: "12-15", final: "36-48%" },
    { grade: 3, paper1: "10-14", paper2: "12-17", paper3: "5-6", ia: "8-11", final: "24-35%" },
    { grade: 2, paper1: "5-9", paper2: "6-11", paper3: "2-4", ia: "4-7", final: "12-23%" },
    { grade: 1, paper1: "0-4", paper2: "0-5", paper3: "0-1", ia: "0-3", final: "0-11%" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GradeBoundaryTemplate,
    {
      title: "IB Digital Society Grade Boundaries",
      subtitle: "(Formerly ITGS) - May 2025 Examination Session",
      headers: ["Grade", "Paper 1", "Paper 2", "Paper 3", "IA", "Final %"],
      slData: slData.map((d) => ({ ...d, paper3: "-" })),
      hlData,
      slComponents: "Paper 1: 40 marks (30%) | Paper 2: 50 marks (40%) | IA (Project): 30 marks (30%)",
      hlComponents: "Paper 1: 40 marks (25%) | Paper 2: 50 marks (30%) | Paper 3: 22 marks (20%) | IA (Project): 30 marks (25%)",
      tips: [
        { title: "Paper 1", content: "Analyze digital scenarios with social and ethical considerations. Use specific examples." },
        { title: "Paper 2", content: "Practice extended responses on digital systems and their impacts. Structure answers clearly." },
        { title: "Paper 3 (HL - Case Study)", content: "Study the pre-release case study thoroughly. Practice linking technical concepts to real situations." },
        { title: "Internal Assessment (Project)", content: "Develop a genuine digital solution for a real client. Document the development process thoroughly." }
      ],
      relatedSubjects: [
        { name: "Computer Science", path: "/homepage/grade-boundaries/computer-science" },
        { name: "Business Management", path: "/homepage/grade-boundaries/business-management" },
        { name: "Global Politics", path: "/homepage/grade-boundaries/global-politics" }
      ]
    }
  );
}

export { DigitalSocietyGradeBoundaries as default };
