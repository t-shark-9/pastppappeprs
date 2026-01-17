import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams } from "react-router-dom";
import { BookOpen, FileText, Target, ExternalLink, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { ibSubjectData } from "@/data/ibSubjectData";

// Define all subject data structures
const subjectData: { [key: string]: any } = {
  biology: {
    title: "Biology",
    themes: {
      A: {
        title: "Unity and diversity",
        description: "Common ancestry has given living organisms many shared features while evolution has resulted in the rich biodiversity of life on Earth",
        topics: {
          "1.1": {
            title: "Water",
            description: "Water as the medium for life",
            subtopics: [
              { code: "A1.1.1", title: "Water as the medium for life", description: "Understanding why water is essential for all known forms of life" },
              { code: "A1.1.2", title: "Hydrogen bonds and polar covalent bonds", description: "How hydrogen bonding arises from polar covalent bonds in water molecules" },
              { code: "A1.1.3", title: "Cohesion of water molecules", description: "Cohesion due to hydrogen bonding and consequences for organisms" },
              { code: "A1.1.4", title: "Adhesion of water", description: "Adhesion to polar or charged materials and impacts for organisms" },
              { code: "A1.1.5", title: "Solvent properties of water", description: "Role as medium for metabolism and transport in plants and animals" },
              { code: "A1.1.6", title: "Physical properties of water", description: "Consequences for animals in aquatic habitats" },
              { code: "A1.1.7", title: "Extraplanetary origin of water", description: "Origin of water on Earth and reasons for its retention" },
              { code: "A1.1.8", title: "Search for extraterrestrial life", description: "Relationship between the search for extraterrestrial life and presence of water" }
            ]
          },
          "1.2": {
            title: "Nucleic acids",
            description: "Structure and function of DNA and RNA",
            subtopics: [
              { code: "A1.2.1", title: "DNA as the genetic material", description: "DNA as the genetic material of all living organisms" },
              { code: "A1.2.2", title: "Components of a nucleotide", description: "Structure and components of nucleotides" },
              { code: "A1.2.3", title: "Sugar–phosphate backbone", description: "Sugar–phosphate bonding and backbone structure of DNA and RNA" },
              { code: "A1.2.4", title: "Bases in nucleic acids", description: "Bases in each nucleic acid that form the basis of a code" },
              { code: "A1.2.5", title: "RNA as a polymer", description: "RNA formed by condensation of nucleotide monomers" },
              { code: "A1.2.6", title: "DNA double helix", description: "DNA as double helix with antiparallel strands linked by hydrogen bonds" },
              { code: "A1.2.7", title: "Differences between DNA and RNA", description: "Structural and functional differences between DNA and RNA" },
              { code: "A1.2.8", title: "Complementary base pairing", description: "Role in replication and expression of genetic information" },
              { code: "A1.2.9", title: "DNA sequence diversity", description: "Limitless capacity of DNA for storing information" },
              { code: "A1.2.10", title: "Universal genetic code", description: "Conservation as evidence of universal common ancestry" }
            ],
            hlOnly: [
              { code: "A1.2.11", title: "Directionality of RNA and DNA", description: "Understanding 5' to 3' directionality in nucleic acids" },
              { code: "A1.2.12", title: "Purine-to-pyrimidine bonding", description: "Component of DNA helix stability" },
              { code: "A1.2.13", title: "Structure of a nucleosome", description: "DNA packaging in eukaryotes" },
              { code: "A1.2.14", title: "Hershey–Chase experiment", description: "Evidence for DNA as the genetic material" },
              { code: "A1.2.15", title: "Chargaff's data", description: "Relative amounts of pyrimidine and purine bases across diverse life forms" }
            ]
          },
          "2.1": {
            title: "Origins of cells",
            description: "Early Earth and the origin of life",
            hlOnly: true,
            subtopics: [
              { code: "A2.1.1", title: "Conditions on early Earth", description: "Pre-biotic formation of carbon compounds" },
              { code: "A2.1.2", title: "Cells as smallest units", description: "Cells as the smallest units of self-sustaining life" },
              { code: "A2.1.3", title: "Challenge of spontaneous origin", description: "Challenge of explaining the spontaneous origin of cells" },
              { code: "A2.1.4", title: "Evidence for origin", description: "Evidence for the origin of carbon compounds" },
              { code: "A2.1.5", title: "Vesicle formation", description: "Spontaneous formation of vesicles by coalescence of fatty acids" },
              { code: "A2.1.6", title: "RNA as first genetic material", description: "RNA as a presumed first genetic material" },
              { code: "A2.1.7", title: "Last universal common ancestor", description: "Evidence for a last universal common ancestor" },
              { code: "A2.1.8", title: "Dating approaches", description: "Approaches used to estimate dates of the first living cells" },
              { code: "A2.1.9", title: "Hydrothermal vents", description: "Evidence for evolution near hydrothermal vents" }
            ]
          },
          "2.2": {
            title: "Cell structure",
            description: "Basic structural unit of living organisms",
            subtopics: [
              { code: "A2.2.1", title: "Cells as basic structural unit", description: "Cells as the basic structural unit of all living organisms" },
              { code: "A2.2.2", title: "Microscopy skills", description: "Development and application of microscopy techniques" },
              { code: "A2.2.3", title: "Developments in microscopy", description: "Historical and technological developments" },
              { code: "A2.2.4", title: "Common cell structures", description: "Structures common to cells in all living organisms" },
              { code: "A2.2.5", title: "Prokaryote cell structure", description: "Structure and organization of prokaryotic cells" },
              { code: "A2.2.6", title: "Eukaryote cell structure", description: "Structure and organization of eukaryotic cells" },
              { code: "A2.2.7", title: "Processes in unicellular organisms", description: "Life processes in single-celled organisms" },
              { code: "A2.2.8", title: "Eukaryotic cell differences", description: "Differences between animals, fungi and plants" },
              { code: "A2.2.9", title: "Atypical cell structure", description: "Unusual cell structures in eukaryotes" },
              { code: "A2.2.10", title: "Micrograph analysis", description: "Cell types and structures in micrographs" }
            ],
            hlOnly: [
              { code: "A2.2.11", title: "Drawing and annotation", description: "Drawing and annotation based on electron micrographs" },
              { code: "A2.2.12", title: "Endosymbiosis", description: "Origin of eukaryotic cells by endosymbiosis" },
              { code: "A2.2.13", title: "Cell differentiation", description: "Process for developing specialized tissues" },
              { code: "A2.2.14", title: "Evolution of multicellularity", description: "Development of multicellular organisms" }
            ]
          },
          "2.3": {
            title: "Viruses",
            description: "Structural features and characteristics of viruses",
            hlOnly: true,
            subtopics: [
              { code: "A2.3.1", title: "Common structural features", description: "Structural features common to viruses" },
              { code: "A2.3.2", title: "Viral diversity", description: "Diversity in viral structure and genetic material" },
              { code: "A2.3.3", title: "Viral reproduction", description: "Viral reproduction strategies" },
              { code: "A2.3.4", title: "Host specificity", description: "Host range and specificity of viruses" }
            ]
          }
        }
      },
      B: {
        title: "Form and function",
        description: "Adaptations are forms that correspond to function",
        topics: {
          "1.1": {
            title: "Carbohydrates and lipids",
            description: "Structure and function of biological molecules",
            subtopics: [
              { code: "B1.1.1", title: "Carbohydrate structure", description: "Structure and properties of carbohydrates" },
              { code: "B1.1.2", title: "Lipid structure", description: "Structure and properties of lipids" },
              { code: "B1.1.3", title: "Biological functions", description: "Functions of carbohydrates and lipids in organisms" }
            ]
          },
          "1.2": {
            title: "Proteins",
            description: "Structure and function of proteins",
            subtopics: [
              { code: "B1.2.1", title: "Amino acids", description: "Structure and properties of amino acids" },
              { code: "B1.2.2", title: "Protein structure", description: "Primary, secondary, tertiary, and quaternary structure" },
              { code: "B1.2.3", title: "Protein functions", description: "Diverse functions of proteins in organisms" }
            ]
          }
        }
      }
    }
  },
  chemistry: {
    title: "Chemistry",
    themes: {
      "Structure": {
        title: "Structure",
        description: "Models of matter, bonding and classification",
        topics: {
          "1": {
            title: "Models of the particulate nature of matter",
            description: "Understanding matter at the atomic level",
            subtopics: [
              { code: "1.1", title: "Introduction to the particulate nature of matter", description: "Fundamental concepts of matter" },
              { code: "1.2", title: "The nuclear atom", description: "Structure of atoms" },
              { code: "1.3", title: "Electron configurations", description: "Arrangement of electrons in atoms" },
              { code: "1.4", title: "Counting particles by mass: The mole", description: "The mole concept" },
              { code: "1.5", title: "Ideal gases", description: "Behavior of gases" }
            ]
          },
          "2": {
            title: "Models of bonding and structure",
            description: "Chemical bonding and molecular structure",
            subtopics: [
              { code: "2.1", title: "The ionic model", description: "Ionic bonding and properties" },
              { code: "2.2", title: "The covalent model", description: "Covalent bonding and molecular structure" },
              { code: "2.3", title: "The metallic model", description: "Metallic bonding and properties" },
              { code: "2.4", title: "From models to materials", description: "Relating bonding to material properties" }
            ]
          },
          "3": {
            title: "Classification of matter",
            description: "Organizing and categorizing chemical substances",
            subtopics: [
              { code: "3.1", title: "The periodic table", description: "Classification of elements" },
              { code: "3.2", title: "Functional groups", description: "Classification of organic compounds" }
            ]
          }
        }
      },
      "Reactivity": {
        title: "Reactivity",
        description: "Understanding chemical reactions and their mechanisms",
        topics: {
          "1": {
            title: "What drives chemical reactions?",
            description: "Thermodynamics and energy in reactions",
            subtopics: [
              { code: "R1.1", title: "Measuring enthalpy changes", description: "Energy changes in reactions" },
              { code: "R1.2", title: "Energy cycles in reactions", description: "Thermochemical cycles" },
              { code: "R1.3", title: "Energy from fuels", description: "Combustion and energy release" },
              { code: "R1.4", title: "Entropy and spontaneity", description: "Thermodynamic favorability", hlOnly: true }
            ]
          }
        }
      }
    }
  }
};

export default function GradingCriteriaSection() {
  const navigate = useNavigate();
  const { subject, theme, topic } = useParams();
  const [selectedSubject, setSelectedSubject] = useState(subject || 'biology');
  
  useEffect(() => {
    if (subject && subjectData[subject]) {
      setSelectedSubject(subject);
    }
  }, [subject]);

  const currentSubject = subjectData[selectedSubject];
  const currentTheme = theme ? currentSubject?.themes[theme.toUpperCase()] : null;
  const currentTopic = (currentTheme && topic) ? currentTheme.topics[topic] : null;

  if (!currentSubject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <div className="container max-w-4xl mx-auto px-6 py-16">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Subject Not Found</h1>
              <p className="text-muted-foreground mb-4">The requested subject could not be found.</p>
              <Button onClick={() => navigate('/homepage/grade-boundaries')}>
                Back to Grade Boundaries
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If viewing a specific topic
  if (currentTopic && currentTheme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <div className="container max-w-4xl mx-auto px-6 py-16 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <BackButton
              fallbackPath={`/homepage/grade-boundaries/${selectedSubject}/criteria`}
              size="icon"
              tooltip="Back to Criteria Overview"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {theme?.toUpperCase()}{topic} {currentTopic.title}
              </h1>
              <p className="text-muted-foreground mt-2">
                {currentSubject.title} • Theme {theme?.toUpperCase()}: {currentTheme.title}
              </p>
            </div>
          </div>

          {/* Topic Description */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Topic Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{currentTopic.description}</p>
            </CardContent>
          </Card>

          {/* Standard Level Content */}
          {currentTopic.subtopics && (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Standard Level Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {currentTopic.subtopics.map((subtopic: any, index: number) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium">{subtopic.code} — {subtopic.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {subtopic.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Higher Level Additional Content */}
          {currentTopic.hlOnly && Array.isArray(currentTopic.hlOnly) && (
            <Card className="shadow-soft border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Higher Level Additional Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {currentTopic.hlOnly.map((subtopic: any, index: number) => (
                    <div key={index} className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-800">{subtopic.code} — {subtopic.title}</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        {subtopic.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* HL Only Topic Notice */}
          {currentTopic.hlOnly === true && (
            <Card className="shadow-soft border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-orange-800">
                  <Target className="h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">Higher Level Only Topic</h3>
                    <p className="text-sm text-orange-700">This topic is only taught to Higher Level students.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // Main subject overview with all themes and topics
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-6xl mx-auto px-6 py-16 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/homepage/grade-boundaries/${selectedSubject}`)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{currentSubject.title} Grading Criteria</h1>
            <p className="text-muted-foreground mt-2">Detailed breakdown of assessment topics and content</p>
          </div>
        </div>

        {/* Subject Navigation */}
        <Tabs value={selectedSubject} onValueChange={setSelectedSubject} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="biology">Biology</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          </TabsList>
          
          <TabsContent value="biology" className="space-y-6">
            {Object.entries(subjectData.biology.themes).map(([themeKey, themeData]: [string, any]) => (
              <Card key={themeKey} className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Theme {themeKey}: {themeData.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{themeData.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {Object.entries(themeData.topics).map(([topicKey, topicData]: [string, any]) => (
                      <div key={topicKey} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{themeKey}{topicKey}</Badge>
                              {topicData.hlOnly === true && <Badge variant="outline" className="text-orange-700 border-orange-300">HL Only</Badge>}
                            </div>
                            <h3 className="font-semibold text-lg">{topicData.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{topicData.description}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/homepage/grade-boundaries/${selectedSubject}/criteria/${themeKey.toLowerCase()}/${topicKey.replace('.', '-')}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="chemistry" className="space-y-6">
            {Object.entries(subjectData.chemistry.themes).map(([themeKey, themeData]: [string, any]) => (
              <Card key={themeKey} className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {themeData.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{themeData.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {Object.entries(themeData.topics).map(([topicKey, topicData]: [string, any]) => (
                      <div key={topicKey} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{themeKey} {topicKey}</Badge>
                            </div>
                            <h3 className="font-semibold text-lg">{topicData.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{topicData.description}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/homepage/grade-boundaries/${selectedSubject}/criteria/${themeKey.toLowerCase()}/${topicKey}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Citation and Disclaimer */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
                <FileText className="h-5 w-5" />
                Based on Official IB Subject Guides
              </h3>
              <p className="text-muted-foreground">
                Assessment criteria and content derived from official International Baccalaureate subject guides including:
                Biology Guide 2025, Chemistry Guide 2025, Physics Guide 2025, Economics Guide 2022, and Business Management Guide 2024.
              </p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" size="sm" onClick={() => window.open('https://www.ibo.org/', '_blank')}>
                  <ExternalLink className="mr-2 h-3 w-3" />
                  Visit IB Official Site
                </Button>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg max-w-2xl mx-auto">
                <strong>Disclaimer:</strong> This content is based on official IB documents but is not endorsed by the International Baccalaureate Organization. 
                Students should refer to current official guides and consult with their teachers for the most up-to-date assessment requirements.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}