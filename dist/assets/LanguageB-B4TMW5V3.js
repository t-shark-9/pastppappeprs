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

function LanguageBGradeBoundaries() {
  const slData = [
    { grade: 7, paper1: "40-50", paper2: "40-50", ia: "24-30", final: "80-100%" },
    { grade: 6, paper1: "33-39", paper2: "33-39", ia: "20-23", final: "66-79%" },
    { grade: 5, paper1: "27-32", paper2: "27-32", ia: "16-19", final: "54-65%" },
    { grade: 4, paper1: "20-26", paper2: "20-26", ia: "12-15", final: "40-53%" },
    { grade: 3, paper1: "14-19", paper2: "14-19", ia: "8-11", final: "28-39%" },
    { grade: 2, paper1: "7-13", paper2: "7-13", ia: "4-7", final: "14-27%" },
    { grade: 1, paper1: "0-6", paper2: "0-6", ia: "0-3", final: "0-13%" }
  ];
  const hlData = [
    { grade: 7, paper1: "50-65", paper2: "40-50", ia: "24-30", final: "79-100%" },
    { grade: 6, paper1: "42-49", paper2: "33-39", ia: "20-23", final: "65-78%" },
    { grade: 5, paper1: "34-41", paper2: "27-32", ia: "16-19", final: "53-64%" },
    { grade: 4, paper1: "26-33", paper2: "20-26", ia: "12-15", final: "40-52%" },
    { grade: 3, paper1: "17-25", paper2: "14-19", ia: "8-11", final: "27-39%" },
    { grade: 2, paper1: "9-16", paper2: "7-13", ia: "4-7", final: "14-26%" },
    { grade: 1, paper1: "0-8", paper2: "0-6", ia: "0-3", final: "0-13%" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GradeBoundaryTemplate,
    {
      title: "IB Language B Grade Boundaries",
      subtitle: "May 2025 Examination Session (French, Spanish, German, etc.)",
      headers: ["Grade", "Paper 1 (Reading)", "Paper 2 (Listening)", "IA (Speaking)", "Final %"],
      slData,
      hlData,
      slComponents: "Paper 1: 50 marks (25%) | Paper 2: 50 marks (50%) | IA: 30 marks (25%)",
      hlComponents: "Paper 1: 65 marks (25%) | Paper 2: 50 marks (50%) | IA: 30 marks (25%)",
      tips: [
        { title: "Paper 1 (Productive Skills)", content: "Practice writing different text types. Focus on structure, vocabulary range, and accuracy." },
        { title: "Paper 2 (Receptive Skills)", content: "Develop listening and reading strategies. Practice with authentic texts and recordings." },
        { title: "Individual Oral", content: "Prepare to discuss cultural themes. Practice discussing visual stimuli and literary/non-literary texts." }
      ],
      relatedSubjects: [
        { name: "English A Literature", path: "/homepage/grade-boundaries/english-a-literature" }
      ]
    }
  );
}

export { LanguageBGradeBoundaries as default };
