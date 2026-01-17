import { r as reactExports, j as jsxRuntimeExports, ax as FileText, al as BookOpen, aj as ChevronDown, a2 as ChevronRight, an as Zap, bs as ExternalLink, cb as Download } from './vendor-react-BeQHm2Hb.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-BTaNjRSt.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { B as Button } from './index-C9tyh6tO.js';
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

const SUBJECT_GUIDES = [
  // Group 1: Studies in Language and Literature
  {
    name: "English A: Language and Literature",
    group: "Group 1",
    pdfs: [
      {
        name: "Language A Guide 2021",
        fileName: "Language_A_Guide_2021.pdf",
        path: "/books/group-01-language-and-literature/english-language-and-literature-a/Language_A_Guide_2021.pdf",
        year: "2021",
        txtPath: "/guides/lang_a_lang_lit.txt"
      }
    ]
  },
  // Group 2: Language Acquisition
  {
    name: "Language B",
    group: "Group 2",
    pdfs: [
      {
        name: "Language B Guide 2020",
        fileName: "Language_B_Guide_2020.pdf",
        path: "/books/group-02-language-acquisition/Language_B_Guide_2020.pdf",
        year: "2020",
        txtPath: "/guides/language_b.txt"
      }
    ]
  },
  // Group 3: Individuals and Societies
  {
    name: "Business Management",
    group: "Group 3",
    pdfs: [
      {
        name: "Business Management Guide 2024",
        fileName: "Business_Management_Guide_2024.pdf",
        path: "/books/group-03-individuals-and-societies/business-management/Business_Management_Guide_2024.pdf",
        year: "2024",
        txtPath: "/guides/business_management.txt"
      }
    ]
  },
  {
    name: "Economics",
    group: "Group 3",
    pdfs: [
      {
        name: "Economics Guide 2022",
        fileName: "Economics_Guide_2022.pdf",
        path: "/books/group-03-individuals-and-societies/economics/Economics_Guide_2022.pdf",
        year: "2022",
        txtPath: "/guides/economics.txt"
      }
    ]
  },
  {
    name: "History",
    group: "Group 3",
    pdfs: [
      {
        name: "History Guide 2020",
        fileName: "History_Guide_2020.pdf",
        path: "/books/group-03-individuals-and-societies/history/History_Guide_2020.pdf",
        year: "2020",
        txtPath: "/guides/history.txt"
      }
    ]
  },
  {
    name: "Geography",
    group: "Group 3",
    pdfs: [
      {
        name: "Geography Guide 2019",
        fileName: "Geography_Guide_2019.pdf",
        path: "/books/group-03-individuals-and-societies/geography/Geography_Guide_2019.pdf",
        year: "2019",
        txtPath: "/guides/geography.txt"
      }
    ]
  },
  // Group 4: Sciences
  {
    name: "Biology",
    group: "Group 4",
    pdfs: [
      {
        name: "Biology Guide 2025",
        fileName: "Biology_Guide_2025.pdf",
        path: "/books/group-04-sciences/biology/Biology_Guide_2025.pdf",
        year: "2025",
        txtPath: "/guides/biology.txt"
      }
    ]
  },
  {
    name: "Chemistry",
    group: "Group 4",
    pdfs: [
      {
        name: "Chemistry Guide 2025",
        fileName: "Chemistry_Guide_2025.pdf",
        path: "/books/group-04-sciences/chemistry/Chemistry_Guide_2025.pdf",
        year: "2025",
        txtPath: "/guides/chemistry.txt"
      }
    ]
  },
  {
    name: "Physics",
    group: "Group 4",
    pdfs: [
      {
        name: "Physics Guide 2025",
        fileName: "Physics_Guide_2025.pdf",
        path: "/books/group-04-sciences/physics/Physics_Guide_2025.pdf",
        year: "2025",
        txtPath: "/guides/physics.txt"
      }
    ]
  },
  {
    name: "SEHS",
    group: "Group 4",
    pdfs: [
      {
        name: "SEHS Guide 2026",
        fileName: "SEHS_Guide_2026.pdf",
        path: "/books/group-04-sciences/sehs/SEHS_Guide_2026.pdf",
        year: "2026",
        txtPath: "/guides/sehs.txt"
      }
    ]
  },
  // Group 5: Mathematics
  {
    name: "Math AA",
    group: "Group 5",
    pdfs: [
      {
        name: "Mathematics Analysis and Approaches Guide 2021",
        fileName: "Mathematics_Analysis_and_Approaches_Guide_2021.pdf",
        path: "/books/group-05-mathematics/math-aa/Mathematics_Analysis_and_Approaches_Guide_2021.pdf",
        year: "2021",
        txtPath: "/guides/math_aa.txt"
      }
    ]
  },
  {
    name: "Math AI",
    group: "Group 5",
    pdfs: [
      {
        name: "Mathematics Applications and Interpretation Guide 2021",
        fileName: "Mathematics_Applications_and_Interpretation_Guide_2021.pdf",
        path: "/books/group-05-mathematics/math-ai/Mathematics_Applications_and_Interpretation_Guide_2021.pdf",
        year: "2021",
        txtPath: "/guides/math_ai.txt"
      }
    ]
  },
  // Group 6: Arts
  {
    name: "Visual Arts",
    group: "Group 6",
    pdfs: [
      {
        name: "Visual Arts Guide 2017",
        fileName: "Visual_Arts_Guide_2017.pdf",
        path: "/books/group-06-arts/visual-arts/Visual_Arts_Guide_2017.pdf",
        year: "2017",
        txtPath: "/guides/visual_arts.txt"
      }
    ]
  },
  // Core Components
  {
    name: "Theory of Knowledge (TOK)",
    group: "Core",
    pdfs: [
      {
        name: "Theory of Knowledge Guide 2022",
        fileName: "TOK_Guide_2022.pdf",
        path: "/books/core/tok/Theory_of_Knowledge_Guide_2022.pdf",
        year: "2022",
        txtPath: "/guides/tok.txt"
      }
    ]
  },
  {
    name: "Extended Essay (EE)",
    group: "Core",
    pdfs: [
      {
        name: "Extended Essay Guide 2018",
        fileName: "Extended_Essay_Guide_2018.pdf",
        path: "/books/core/ee/Extended_Essay_Guide_2018.pdf",
        year: "2018",
        txtPath: "/guides/ee.txt"
      }
    ]
  }
];
const SUBJECT_GROUPS = [
  {
    title: "Core Components",
    description: "Essential IB requirements: TOK & Extended Essay",
    icon: BookOpen,
    color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
  },
  {
    title: "Group 1: Studies in Language and Literature",
    description: "Explore language, literature, and communication",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  },
  {
    title: "Group 2: Language Acquisition",
    description: "Master additional languages",
    icon: BookOpen,
    color: "bg-green-500/10 text-green-600 dark:text-green-400"
  },
  {
    title: "Group 3: Individuals and Societies",
    description: "Understand human behavior and society",
    icon: BookOpen,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
  },
  {
    title: "Group 4: Sciences",
    description: "Investigate the natural world",
    icon: BookOpen,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
  },
  {
    title: "Group 5: Mathematics",
    description: "Explore mathematical concepts",
    icon: BookOpen,
    color: "bg-red-500/10 text-red-600 dark:text-red-400"
  },
  {
    title: "Group 6: Arts",
    description: "Express through creative media",
    icon: BookOpen,
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400"
  }
];
function Books() {
  const navigate = useNavigate();
  const [expandedGroup, setExpandedGroup] = reactExports.useState(null);
  const [expandedSubject, setExpandedSubject] = reactExports.useState(null);
  const getGuidesForGroup = (groupTitle) => {
    if (groupTitle === "Core Components") {
      return SUBJECT_GUIDES.filter((guide) => guide.group === "Core");
    }
    const groupNumber = groupTitle.split(":")[0];
    return SUBJECT_GUIDES.filter((guide) => guide.group === groupNumber);
  };
  const handleOpenPDF = (path) => {
    window.open(path, "_blank");
  };
  const handleDownloadPDF = (path, fileName) => {
    const link = document.createElement("a");
    link.href = path;
    link.download = fileName;
    link.click();
  };
  const handleSpeedRead = async (txtPath, guideName) => {
    try {
      const response = await fetch(txtPath);
      const text = await response.text();
      navigate("/homepage/speed-reader", {
        state: {
          text,
          source: guideName
        }
      });
    } catch (error) {
      console.error("Error loading text file:", error);
      navigate("/homepage/speed-reader");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/work", className: "mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "IB Subject Guides" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Access official IB subject guides organized by group. Download guides as reference materials for your studies." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: SUBJECT_GROUPS.map((group, index) => {
      const Icon = group.icon;
      const guides = getGuidesForGroup(group.title);
      const isExpanded = expandedGroup === group.title;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden transition-all hover:shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CardHeader,
          {
            className: "cursor-pointer",
            onClick: () => setExpandedGroup(isExpanded ? null : group.title),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-lg ${group.color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: group.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: group.description })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
                guides.length,
                " subjects"
              ] }) })
            ] })
          }
        ),
        isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: guides.map((guide, guideIndex) => {
          const isSubjectExpanded = expandedSubject === `${group.title}-${guide.name}`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between p-3 bg-card hover:bg-accent transition-colors cursor-pointer",
                onClick: () => setExpandedSubject(isSubjectExpanded ? null : `${group.title}-${guide.name}`),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    isSubjectExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: guide.name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                    guide.pdfs.length,
                    " PDF",
                    guide.pdfs.length !== 1 ? "s" : ""
                  ] })
                ]
              }
            ),
            isSubjectExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 pt-0 space-y-2 bg-muted/30", children: guide.pdfs.map((pdf, pdfIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between p-3 rounded-md bg-background border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: pdf.name }),
                      pdf.year && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        "Edition ",
                        pdf.year
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    pdf.txtPath && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: () => handleSpeedRead(pdf.txtPath, pdf.name),
                        title: "Speed Read",
                        className: "text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: () => handleOpenPDF(pdf.path),
                        title: "Open PDF",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: () => handleDownloadPDF(pdf.path, pdf.fileName),
                        title: "Download PDF",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" })
                      }
                    )
                  ] })
                ]
              },
              pdfIndex
            )) })
          ] }, guideIndex);
        }) }) })
      ] }, index);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 p-4 bg-muted/50 rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Note:" }),
        " These are official IB subject guides provided as reference materials. Click on any group to view subjects, then click on a subject to see available PDFs. You can:"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground mt-2 space-y-1 ml-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "• ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-purple-600 dark:text-purple-400", children: "⚡ Speed Read" }),
          " - Read the text version with our speed reading tool"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "• ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Open" }),
          " - View the PDF in a new tab"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "• ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Download" }),
          " - Save the PDF for offline access"
        ] })
      ] })
    ] })
  ] }) });
}

export { Books as default };
