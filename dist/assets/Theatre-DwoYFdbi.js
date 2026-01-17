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

function TheatreGradeBoundaries() {
  const slData = [
    { grade: 7, production: "18-24", directors: "18-24", research: "18-24", final: "75-100%" },
    { grade: 6, production: "15-17", directors: "15-17", research: "15-17", final: "62-74%" },
    { grade: 5, production: "12-14", directors: "12-14", research: "12-14", final: "50-61%" },
    { grade: 4, production: "9-11", directors: "9-11", research: "9-11", final: "37-49%" },
    { grade: 3, production: "6-8", directors: "6-8", research: "6-8", final: "25-36%" },
    { grade: 2, production: "3-5", directors: "3-5", research: "3-5", final: "12-24%" },
    { grade: 1, production: "0-2", directors: "0-2", research: "0-2", final: "0-11%" }
  ];
  const hlData = [
    { grade: 7, production: "18-24", directors: "18-24", research: "18-24", solo: "18-24", final: "75-100%" },
    { grade: 6, production: "15-17", directors: "15-17", research: "15-17", solo: "15-17", final: "62-74%" },
    { grade: 5, production: "12-14", directors: "12-14", research: "12-14", solo: "12-14", final: "50-61%" },
    { grade: 4, production: "9-11", directors: "9-11", research: "9-11", solo: "9-11", final: "37-49%" },
    { grade: 3, production: "6-8", directors: "6-8", research: "6-8", solo: "6-8", final: "25-36%" },
    { grade: 2, production: "3-5", directors: "3-5", research: "3-5", solo: "3-5", final: "12-24%" },
    { grade: 1, production: "0-2", directors: "0-2", research: "0-2", solo: "0-2", final: "0-11%" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GradeBoundaryTemplate,
    {
      title: "IB Theatre Grade Boundaries",
      subtitle: "May 2025 Examination Session",
      headers: ["Grade", "Production Proposal", "Director's Notebook", "Research Presentation", "Solo Theatre", "Final %"],
      slData: slData.map((d) => ({ ...d, solo: "-" })),
      hlData,
      slComponents: "Production Proposal: 24 marks (35%) | Director's Notebook: 24 marks (35%) | Research Presentation: 24 marks (30%)",
      hlComponents: "Production Proposal: 24 marks (25%) | Director's Notebook: 24 marks (20%) | Research Presentation: 24 marks (20%) | Solo Theatre: 24 marks (35%)",
      tips: [
        { title: "Production Proposal", content: "Present a clear artistic vision. Consider all production elements and their purpose." },
        { title: "Director's Notebook", content: "Document your directorial choices thoroughly. Show understanding of text and context." },
        { title: "Research Presentation", content: "Present research in an engaging, theatrical way. Connect theory to practice." },
        { title: "Solo Theatre Piece (HL)", content: "Create an original piece based on a theatre theorist. Show mastery of their techniques." }
      ],
      relatedSubjects: [
        { name: "Film", path: "/homepage/grade-boundaries/film" },
        { name: "Music", path: "/homepage/grade-boundaries/music" },
        { name: "Visual Arts", path: "/homepage/grade-boundaries/visual-arts" }
      ]
    }
  );
}

export { TheatreGradeBoundaries as default };
