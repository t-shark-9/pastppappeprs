import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Download, ExternalLink, ChevronDown, ChevronRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface PDF {
  name: string;
  fileName: string;
  path: string;
  year?: string;
  txtPath?: string; // Path to text version for speed reading
}

interface SubjectGuide {
  name: string;
  group: string;
  pdfs: PDF[];
}

const SUBJECT_GUIDES: SubjectGuide[] = [
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
  },
];

const SUBJECT_GROUPS = [
  {
    title: "Core Components",
    description: "Essential IB requirements: TOK & Extended Essay",
    icon: BookOpen,
    color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
  {
    title: "Group 1: Studies in Language and Literature",
    description: "Explore language, literature, and communication",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Group 2: Language Acquisition",
    description: "Master additional languages",
    icon: BookOpen,
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    title: "Group 3: Individuals and Societies",
    description: "Understand human behavior and society",
    icon: BookOpen,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    title: "Group 4: Sciences",
    description: "Investigate the natural world",
    icon: BookOpen,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    title: "Group 5: Mathematics",
    description: "Explore mathematical concepts",
    icon: BookOpen,
    color: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
  {
    title: "Group 6: Arts",
    description: "Express through creative media",
    icon: BookOpen,
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
];

export default function Books() {
  const navigate = useNavigate();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const getGuidesForGroup = (groupTitle: string) => {
    if (groupTitle === "Core Components") {
      return SUBJECT_GUIDES.filter(guide => guide.group === "Core");
    }
    const groupNumber = groupTitle.split(":")[0];
    return SUBJECT_GUIDES.filter(guide => guide.group === groupNumber);
  };

  const handleOpenPDF = (path: string) => {
    window.open(path, '_blank');
  };

  const handleDownloadPDF = (path: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = fileName;
    link.click();
  };

  const handleSpeedRead = async (txtPath: string, guideName: string) => {
    try {
      // Fetch the text content
      const response = await fetch(txtPath);
      const text = await response.text();
      
      // Navigate to speed reader with the text content
      navigate('/homepage/speed-reader', { 
        state: { 
          text: text,
          source: guideName 
        } 
      });
    } catch (error) {
      console.error('Error loading text file:', error);
      // Fallback: just navigate to speed reader
      navigate('/homepage/speed-reader');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <BackButton fallbackPath="/work" className="mb-4" />
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">IB Subject Guides</h1>
          </div>
          <p className="text-muted-foreground">
            Access official IB subject guides organized by group. Download guides as reference materials for your studies.
          </p>
        </div>

        {/* Subject Groups */}
        <div className="space-y-4">
          {SUBJECT_GROUPS.map((group, index) => {
            const Icon = group.icon;
            const guides = getGuidesForGroup(group.title);
            const isExpanded = expandedGroup === group.title;

            return (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => setExpandedGroup(isExpanded ? null : group.title)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${group.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{group.title}</CardTitle>
                        <CardDescription>{group.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{guides.length} subjects</Badge>
                    </div>
                  </div>
                </CardHeader>
                
                {isExpanded && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {guides.map((guide, guideIndex) => {
                        const isSubjectExpanded = expandedSubject === `${group.title}-${guide.name}`;
                        
                        return (
                          <div key={guideIndex} className="border rounded-lg overflow-hidden">
                            <div
                              className="flex items-center justify-between p-3 bg-card hover:bg-accent transition-colors cursor-pointer"
                              onClick={() => setExpandedSubject(isSubjectExpanded ? null : `${group.title}-${guide.name}`)}
                            >
                              <div className="flex items-center gap-3">
                                {isSubjectExpanded ? (
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                )}
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium text-sm">{guide.name}</span>
                              </div>
                              <Badge variant="outline">{guide.pdfs.length} PDF{guide.pdfs.length !== 1 ? 's' : ''}</Badge>
                            </div>
                            
                            {isSubjectExpanded && (
                              <div className="p-3 pt-0 space-y-2 bg-muted/30">
                                {guide.pdfs.map((pdf, pdfIndex) => (
                                  <div
                                    key={pdfIndex}
                                    className="flex items-center justify-between p-3 rounded-md bg-background border"
                                  >
                                    <div className="flex items-center gap-3 flex-1">
                                      <FileText className="h-4 w-4 text-primary" />
                                      <div>
                                        <p className="font-medium text-sm">{pdf.name}</p>
                                        {pdf.year && (
                                          <p className="text-xs text-muted-foreground">Edition {pdf.year}</p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {pdf.txtPath && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleSpeedRead(pdf.txtPath!, pdf.name)}
                                          title="Speed Read"
                                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950"
                                        >
                                          <Zap className="h-4 w-4" />
                                        </Button>
                                      )}
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleOpenPDF(pdf.path)}
                                        title="Open PDF"
                                      >
                                        <ExternalLink className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDownloadPDF(pdf.path, pdf.fileName)}
                                        title="Download PDF"
                                      >
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> These are official IB subject guides provided as reference materials. 
            Click on any group to view subjects, then click on a subject to see available PDFs. You can:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
            <li>• <strong className="text-purple-600 dark:text-purple-400">⚡ Speed Read</strong> - Read the text version with our speed reading tool</li>
            <li>• <strong>Open</strong> - View the PDF in a new tab</li>
            <li>• <strong>Download</strong> - Save the PDF for offline access</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
