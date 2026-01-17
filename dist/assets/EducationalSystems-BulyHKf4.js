import { j as jsxRuntimeExports, bW as Globe, al as BookOpen, av as GraduationCap, ai as Users } from './vendor-react-BeQHm2Hb.js';
import { B as Button } from './index-C9tyh6tO.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-CP2-oe9M.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { A as ArticleWrapper } from './ArticleWrapper-YJLbhrQd.js';
import { u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
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
import './vendor-supabase-B1aOSilF.js';

function EducationalSystems() {
  const navigate = useNavigate();
  const systems = [
    {
      name: "International Baccalaureate (IB)",
      country: "Global",
      duration: "2 years (Grades 11-12)",
      grading: "7-point scale (1-7)",
      maxScore: "45 points",
      subjects: "6 subjects + Core (TOK, EE, CAS)",
      recognition: "Worldwide",
      highlights: ["Global curriculum", "Critical thinking focus", "Internationally recognized"]
    },
    {
      name: "German Abitur",
      country: "Germany",
      duration: "2-3 years (Grades 11-13)",
      grading: "15-point scale (0-15) → Grade 1.0-6.0",
      maxScore: "900 points (≈ Grade 1.0)",
      subjects: "Advanced + Basic courses",
      recognition: "EU + International",
      highlights: ["Subject specialization", "Flexible course selection", "Strong academic preparation"]
    },
    {
      name: "Swedish Gymnasium",
      country: "Sweden",
      duration: "3 years",
      grading: "6-point scale (A-F)",
      maxScore: "Grade A (20 points)",
      subjects: "Core + Programme subjects",
      recognition: "Nordic + EU",
      highlights: ["Flexible programmes", "Work experience focus", "Democratic values emphasis"]
    },
    {
      name: "British A-Levels",
      country: "UK + International",
      duration: "2 years (Grades 12-13)",
      grading: "A*-U scale",
      maxScore: "Multiple A*",
      subjects: "3-4 subjects typically",
      recognition: "Commonwealth + International",
      highlights: ["Subject depth", "University preparation", "Flexible combinations"]
    },
    {
      name: "IGCSE",
      country: "UK + International",
      duration: "2 years (Grades 9-10)",
      grading: "9-1 scale (9 highest)",
      maxScore: "Grade 9s across subjects",
      subjects: "5-14 subjects typically",
      recognition: "International (pre-university)",
      highlights: ["Foundation level", "Broad curriculum", "Skills-based assessment"]
    }
  ];
  const conversionTable = [
    { ib: "7", abitur: "1.0-1.2", swedish: "A", aLevel: "A*", igcse: "9" },
    { ib: "6", abitur: "1.3-1.7", swedish: "B", aLevel: "A", igcse: "8" },
    { ib: "5", abitur: "1.8-2.5", swedish: "C", aLevel: "B", igcse: "7" },
    { ib: "4", abitur: "2.6-3.5", swedish: "D", aLevel: "C", igcse: "6" },
    { ib: "3", abitur: "3.6-4.5", swedish: "E", aLevel: "D", igcse: "5" },
    { ib: "2", abitur: "4.6-5.5", swedish: "F", aLevel: "E", igcse: "4" },
    { ib: "1", abitur: "6.0", swedish: "F", aLevel: "U", igcse: "3-1" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ArticleWrapper,
    {
      title: "Educational Systems Comparison - IB, Abitur, A-Levels & More",
      description: "Understanding different qualification systems worldwide. Compare IB, German Abitur, Swedish Gymnasium, British A-Levels, and IGCSE systems with grade conversion tables.",
      datePublished: "2024-03-05T00:00:00Z",
      dateModified: "2024-12-24T00:00:00Z",
      category: "Educational Systems",
      keywords: [
        "IB comparison",
        "educational systems",
        "Abitur vs IB",
        "A-levels comparison",
        "grade conversion",
        "international curriculum",
        "IGCSE",
        "Swedish Gymnasium"
      ],
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/", className: "mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-8 w-8 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-bold", children: "Educational Systems Comparison" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground leading-relaxed", children: "Understanding different qualification systems worldwide." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400", children: "Why Compare Educational Systems?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg leading-relaxed mb-6", children: "With globalization and international mobility, understanding different educational systems is crucial for students, parents, and educators. Whether you're planning to study abroad, considering different curricula, or need to convert grades between systems, this guide provides comprehensive information." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-50/50 dark:bg-blue-950/20 p-8 rounded-lg space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-2", children: "University Applications" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Compare qualifications for international university admissions" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-2", children: "Grade Conversion" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Understand how grades translate between different systems" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-2", children: "System Selection" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Choose the right educational path for your goals" })
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-6 text-green-600 dark:text-green-400", children: "Educational Systems Overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-6 text-green-600 dark:text-green-400", children: "Educational Systems Overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: systems.map((system, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l-4 border-primary pl-8 py-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-2", children: system.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg text-muted-foreground mb-6", children: [
                system.country,
                " • ",
                system.duration
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2", children: "Grading" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: system.grading })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2", children: "Max Score" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: system.maxScore })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2", children: "Subjects" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: system.subjects })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2", children: "Recognition" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: system.recognition })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3", children: "Key Features" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: system.highlights.map((highlight, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-primary/10 text-primary rounded-md font-medium", children: highlight }, idx)) })
              ] })
            ] }, index)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400", children: "Grade Conversion Reference" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg mb-6", children: "Approximate grade equivalencies between different systems. Note: Actual conversions may vary by institution and context." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-purple-50/50 dark:bg-purple-950/20 p-8 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "IB Grade" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "German Abitur" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Swedish Grade" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "A-Level" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "IGCSE" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: conversionTable.map((row, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: row.ib }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: row.abitur }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: row.swedish }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: row.aLevel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: row.igcse })
                ] }, index)) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 p-4 bg-background/50 rounded-lg border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Important:" }),
                " These are general equivalencies. Always check specific university requirements and use official grade conversion tools when applying to institutions. Some universities may have their own conversion scales or additional requirements."
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-8 text-orange-600 dark:text-orange-400", children: "Detailed System Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-8 text-orange-600 dark:text-orange-400", children: "Detailed System Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l-4 border-blue-500 pl-8 py-6 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-4", children: "International Baccalaureate (IB) Diploma" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold mb-3", children: "Structure" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "6 subjects from different groups" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "3 Higher Level (HL) and 3 Standard Level (SL)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Core components: TOK, EE, CAS" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total: 42 points + 3 bonus points" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold mb-3", children: "Assessment" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "External examinations (70-80%)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Internal assessments (20-30%)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Graded 1-7 per subject" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Passing grade: 24 points minimum" })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold mb-3", children: "Global Recognition" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed", children: "The IB Diploma is recognized by over 5,000 universities worldwide. It's designed to develop international-mindedness and critical thinking skills. Many universities offer advanced standing or credits for IB courses." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l-4 border-green-500 pl-8 py-6 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-4", children: "German Abitur" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold mb-3", children: "Structure" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Qualification phase: 4 semesters" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Advanced courses (Leistungskurse): 2-3 subjects" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Basic courses: Multiple subjects" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Final exams in 4-5 subjects" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold mb-3", children: "Grading" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "15-point scale (15 = excellent, 0 = fail)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Converted to final grade 1.0-6.0" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grade 1.0 = 900 points (maximum)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grade 4.0 = 300 points (minimum to pass)" })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold mb-3", children: "University Access" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed", children: "The Abitur provides general university entrance qualification (Allgemeine Hochschulreife) in Germany. It's also recognized throughout the EU and by many international universities. Some competitive programs require specific grades or additional entrance exams." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l-4 border-purple-500 pl-8 py-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-4", children: "Swedish Gymnasium" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold mb-3", children: "Structure" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "3-year upper secondary education" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Choice of 18 national programmes" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Core subjects + programme-specific" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Individual choice courses available" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold mb-3", children: "Grading" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "A-F scale (A-E passing, F failing)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Point values: A=20, B=17.5, C=15, D=12.5, E=10" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Merit rating calculated from grades" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-500 mt-1.5", children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "University selection based on merit points" })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold mb-3", children: "Higher Education Access" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed", children: "Swedish gymnasium certificate provides eligibility for higher education in Sweden and other Nordic countries. Universities use merit ratings and specific subject requirements for admissions. Alternative paths include Swedish Scholastic Aptitude Test (SweSAT)." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-6 text-accent-600 dark:text-accent-400", children: "University Application Tips" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-lg border-l-4 border-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-4", children: "For International Applications" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1.5", children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Research specific university conversion methods" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1.5", children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Check if credential evaluation is required" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1.5", children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Prepare official transcripts and translations" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1.5", children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Consider additional standardized tests (SAT, etc.)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1.5", children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Apply early - conversion processes take time" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-4", children: "Key Resources" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1.5", children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "DAAD Database (German universities)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1.5", children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "UCAS Tariff Calculator (UK universities)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1.5", children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "World Education Services (WES)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1.5", children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "National academic recognition centers" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1.5", children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "University international offices" })
                  ] })
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-6 bg-muted/30 p-8 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold", children: "Need Help With Your Academic Journey?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Whether you're working on IB assessments, German Abitur projects, or any other academic qualification, our AI-powered tools can provide personalized guidance and feedback." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", onClick: () => navigate("/homepage/grade-boundaries"), children: "View Grade Boundaries" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", onClick: () => navigate("/work"), children: "Start Writing" })
            ] })
          ] }) })
        ] })
      ]
    }
  );
}

export { EducationalSystems as default };
