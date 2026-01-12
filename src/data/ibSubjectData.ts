// Complete IB Subject Data Structure
export const ibSubjectData = {
  biology: {
    title: "Biology",
    description: "Study of living organisms and their interactions",
    guide: "First assessment 2025",
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
              { code: "A1.1.2", title: "Hydrogen bonds as a consequence of the polar covalent bonds within water molecules", description: "How hydrogen bonding arises from polar covalent bonds in water molecules" },
              { code: "A1.1.3", title: "Cohesion of water molecules due to hydrogen bonding and consequences for organisms", description: "Cohesion due to hydrogen bonding and consequences for organisms" },
              { code: "A1.1.4", title: "Adhesion of water to materials that are polar or charged and impacts for organisms", description: "Adhesion to polar or charged materials and impacts for organisms" },
              { code: "A1.1.5", title: "Solvent properties of water linked to its role as a medium for metabolism and for transport in plants and animals", description: "Role as medium for metabolism and transport in plants and animals" },
              { code: "A1.1.6", title: "Physical properties of water and the consequences for animals in aquatic habitats", description: "Consequences for animals in aquatic habitats" },
              { code: "A1.1.7", title: "Extraplanetary origin of water on Earth and reasons for its retention", description: "Origin of water on Earth and reasons for its retention" },
              { code: "A1.1.8", title: "Relationship between the search for extraterrestrial life and the presence of water", description: "Relationship between the search for extraterrestrial life and presence of water" }
            ]
          },
          "1.2": {
            title: "Nucleic acids",
            description: "Structure and function of DNA and RNA as the molecular basis of heredity",
            subtopics: [
              { code: "A1.2.1", title: "DNA as the genetic material of all living organisms", description: "DNA as the genetic material of all living organisms" },
              { code: "A1.2.2", title: "Components of a nucleotide", description: "Structure and components of nucleotides" },
              { code: "A1.2.3", title: "Sugar–phosphate bonding and the sugar–phosphate 'backbone' of DNA and RNA", description: "Sugar–phosphate bonding and backbone structure of DNA and RNA" },
              { code: "A1.2.4", title: "Bases in each nucleic acid that form the basis of a code", description: "Bases in each nucleic acid that form the basis of a code" },
              { code: "A1.2.5", title: "RNA as a polymer formed by condensation of nucleotide monomers", description: "RNA formed by condensation of nucleotide monomers" },
              { code: "A1.2.6", title: "DNA as a double helix made of two antiparallel strands of nucleotides with two strands linked by hydrogen bonds between bases", description: "DNA as double helix with antiparallel strands linked by hydrogen bonds" },
              { code: "A1.2.7", title: "Differences between DNA and RNA", description: "Structural and functional differences between DNA and RNA" },
              { code: "A1.2.8", title: "Role of complementary base pairing in allowing genetic information to be replicated and expressed", description: "Role in replication and expression of genetic information" },
              { code: "A1.2.9", title: "Diversity of possible DNA base sequences and the limitless capacity of DNA for storing information", description: "Limitless capacity of DNA for storing information" },
              { code: "A1.2.10", title: "Conservation of the genetic code across all life forms as evidence of universal common ancestry", description: "Conservation as evidence of universal common ancestry" }
            ],
            hlOnly: [
              { code: "A1.2.11", title: "Directionality of RNA and DNA", description: "Understanding 5' to 3' directionality in nucleic acids" },
              { code: "A1.2.12", title: "Purine-to-pyrimidine bonding as a component of DNA helix stability", description: "Component of DNA helix stability" },
              { code: "A1.2.13", title: "Structure of a nucleosome", description: "DNA packaging in eukaryotes" },
              { code: "A1.2.14", title: "Evidence from the Hershey–Chase experiment for DNA as the genetic material", description: "Evidence for DNA as the genetic material" },
              { code: "A1.2.15", title: "Chargaff's data on the relative amounts of pyrimidine and purine bases across diverse life forms", description: "Relative amounts of pyrimidine and purine bases across diverse life forms" }
            ]
          },
          "2.1": {
            title: "Origins of cells",
            description: "Conditions on early Earth and the origin of life",
            hlOnly: true,
            subtopics: [
              { code: "A2.1.1", title: "Conditions on early Earth and the pre-biotic formation of carbon compounds", description: "Pre-biotic formation of carbon compounds" },
              { code: "A2.1.2", title: "Cells as the smallest units of self-sustaining life", description: "Cells as the smallest units of self-sustaining life" },
              { code: "A2.1.3", title: "Challenge of explaining the spontaneous origin of cells", description: "Challenge of explaining the spontaneous origin of cells" },
              { code: "A2.1.4", title: "Evidence for the origin of carbon compounds", description: "Evidence for the origin of carbon compounds" },
              { code: "A2.1.5", title: "Spontaneous formation of vesicles by coalescence of fatty acids into spherical bilayers", description: "Spontaneous formation of vesicles by coalescence of fatty acids" },
              { code: "A2.1.6", title: "RNA as a presumed first genetic material", description: "RNA as a presumed first genetic material" },
              { code: "A2.1.7", title: "Evidence for a last universal common ancestor", description: "Evidence for a last universal common ancestor" },
              { code: "A2.1.8", title: "Approaches used to estimate dates of the first living cells and the last universal common ancestor", description: "Approaches used to estimate dates of the first living cells" },
              { code: "A2.1.9", title: "Evidence for the evolution of the last universal common ancestor in the vicinity of hydrothermal vents", description: "Evidence for evolution near hydrothermal vents" }
            ]
          },
          "2.2": {
            title: "Cell structure",
            description: "Cells as the basic structural unit of all living organisms",
            subtopics: [
              { code: "A2.2.1", title: "Cells as the basic structural unit of all living organisms", description: "Cells as the basic structural unit of all living organisms" },
              { code: "A2.2.2", title: "Microscopy skills", description: "Development and application of microscopy techniques" },
              { code: "A2.2.3", title: "Developments in microscopy", description: "Historical and technological developments in microscopy" },
              { code: "A2.2.4", title: "Structures common to cells in all living organisms", description: "Structures common to cells in all living organisms" },
              { code: "A2.2.5", title: "Prokaryote cell structure", description: "Structure and organization of prokaryotic cells" },
              { code: "A2.2.6", title: "Eukaryote cell structure", description: "Structure and organization of eukaryotic cells" },
              { code: "A2.2.7", title: "Processes of life in unicellular organisms", description: "Life processes in single-celled organisms" },
              { code: "A2.2.8", title: "Differences in eukaryotic cell structure between animals, fungi and plants", description: "Differences between animals, fungi and plants" },
              { code: "A2.2.9", title: "Atypical cell structure in eukaryotes", description: "Unusual cell structures in eukaryotes" },
              { code: "A2.2.10", title: "Cell types and cell structures viewed in light and electron micrographs", description: "Cell types and structures in micrographs" }
            ],
            hlOnly: [
              { code: "A2.2.11", title: "Drawing and annotation based on electron micrographs", description: "Drawing and annotation based on electron micrographs" },
              { code: "A2.2.12", title: "Origin of eukaryotic cells by endosymbiosis", description: "Origin of eukaryotic cells by endosymbiosis" },
              { code: "A2.2.13", title: "Cell differentiation as the process for developing specialized tissues in multicellular organisms", description: "Process for developing specialized tissues" },
              { code: "A2.2.14", title: "Evolution of multicellularity", description: "Development of multicellular organisms" }
            ]
          }
        }
      }
    }
  },
  chemistry: {
    title: "Chemistry",
    description: "Study of matter and its interactions",
    guide: "First assessment 2025",
    themes: {
      "Structure": {
        title: "Structure",
        description: "Models of matter, bonding and classification",
        topics: {
          "1": {
            title: "Models of the particulate nature of matter",
            description: "Understanding matter at the atomic and molecular level",
            subtopics: [
              { code: "1.1", title: "Introduction to the particulate nature of matter", description: "Fundamental concepts about the nature of matter" },
              { code: "1.2", title: "The nuclear atom", description: "Structure of atoms and subatomic particles" },
              { code: "1.3", title: "Electron configurations", description: "Arrangement of electrons in atoms and ions" },
              { code: "1.4", title: "Counting particles by mass: The mole", description: "The mole concept and Avogadro's constant" },
              { code: "1.5", title: "Ideal gases", description: "Behavior and properties of ideal gases" }
            ]
          },
          "2": {
            title: "Models of bonding and structure",
            description: "Chemical bonding and molecular structure",
            subtopics: [
              { code: "2.1", title: "The ionic model", description: "Ionic bonding and properties of ionic compounds" },
              { code: "2.2", title: "The covalent model", description: "Covalent bonding and molecular structure" },
              { code: "2.3", title: "The metallic model", description: "Metallic bonding and properties of metals" },
              { code: "2.4", title: "From models to materials", description: "Relating bonding models to material properties" }
            ]
          },
          "3": {
            title: "Classification of matter",
            description: "Organizing and categorizing chemical substances",
            subtopics: [
              { code: "3.1", title: "The periodic table: Classification of elements", description: "Periodic trends and element classification" },
              { code: "3.2", title: "Functional groups: Classification of organic compounds", description: "Organic functional groups and their properties" }
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
            description: "Thermodynamics and energy changes in reactions",
            subtopics: [
              { code: "R1.1", title: "Measuring enthalpy changes", description: "Calorimetry and enthalpy measurements" },
              { code: "R1.2", title: "Energy cycles in reactions", description: "Born-Haber cycles and thermochemical cycles" },
              { code: "R1.3", title: "Energy from fuels", description: "Combustion reactions and fuel efficiency" }
            ],
            hlOnly: [
              { code: "R1.4", title: "Entropy and spontaneity", description: "Entropy, Gibbs free energy, and reaction spontaneity" }
            ]
          },
          "2": {
            title: "How much, how fast and how far?",
            description: "Quantitative aspects of chemical reactions",
            subtopics: [
              { code: "R2.1", title: "How much? The amount of chemical change", description: "Stoichiometry and quantitative analysis" },
              { code: "R2.2", title: "How fast? The rate of chemical change", description: "Reaction kinetics and rate laws" },
              { code: "R2.3", title: "How far? The extent of chemical change", description: "Chemical equilibrium and Le Chatelier's principle" }
            ]
          },
          "3": {
            title: "What are the mechanisms of chemical change?",
            description: "Mechanisms and pathways of chemical reactions",
            subtopics: [
              { code: "R3.1", title: "Proton transfer reactions", description: "Acids, bases, and pH" },
              { code: "R3.2", title: "Electron transfer reactions", description: "Redox reactions and electrochemistry" },
              { code: "R3.3", title: "Electron sharing reactions", description: "Nucleophilic and electrophilic reactions" }
            ],
            hlOnly: [
              { code: "R3.4", title: "Electron-pair sharing reactions", description: "Advanced organic reaction mechanisms" }
            ]
          }
        }
      }
    }
  },
  physics: {
    title: "Physics",
    description: "Study of matter, energy, and their interactions",
    guide: "First assessment 2025",
    themes: {
      A: {
        title: "Space, time and motion",
        description: "Understanding motion and mechanics",
        topics: {
          "1": {
            title: "Kinematics",
            description: "Description of motion",
            subtopics: [
              { code: "A.1.1", title: "Motion", description: "Position, displacement, velocity, acceleration" },
              { code: "A.1.2", title: "Projectile motion", description: "Motion in two dimensions under gravity" },
              { code: "A.1.3", title: "Fluid resistance and terminal speed", description: "Motion through fluids" }
            ]
          },
          "2": {
            title: "Forces and momentum",
            description: "Newton's laws and conservation of momentum",
            subtopics: [
              { code: "A.2.1", title: "Newton's laws of motion", description: "The three fundamental laws of motion" },
              { code: "A.2.2", title: "Applications of Newton's laws", description: "Problem-solving with forces" },
              { code: "A.2.3", title: "Work, energy and power", description: "Energy concepts and conservation" },
              { code: "A.2.4", title: "Momentum and impulse", description: "Conservation of momentum and collisions" }
            ]
          }
        }
      }
    }
  },
  economics: {
    title: "Economics",
    description: "Study of how societies allocate scarce resources",
    guide: "First assessment 2022",
    units: {
      1: {
        title: "Introduction to economics",
        description: "Fundamental economic concepts and methodology",
        topics: [
          { code: "1.1", title: "What is economics?", description: "Scarcity, choice, and opportunity cost" },
          { code: "1.2", title: "How do economists approach the world?", description: "Economic methodology and models" }
        ]
      },
      2: {
        title: "Microeconomics",
        description: "Study of individual markets and decision-making",
        topics: [
          { code: "2.1", title: "Demand", description: "Consumer behavior and demand curves" },
          { code: "2.2", title: "Supply", description: "Producer behavior and supply curves" },
          { code: "2.3", title: "Competitive market equilibrium", description: "Market equilibrium and efficiency" },
          { code: "2.4", title: "Critique of the maximizing behaviour of consumers and producers", description: "Behavioral economics" },
          { code: "2.5", title: "Elasticity of demand", description: "Price, income, and cross-price elasticity" },
          { code: "2.6", title: "Elasticity of supply", description: "Supply responsiveness to price changes" },
          { code: "2.7", title: "Role of government in microeconomics", description: "Government intervention in markets" },
          { code: "2.8", title: "Market failure—externalities and common pool resources", description: "External costs and benefits" },
          { code: "2.9", title: "Market failure—public goods", description: "Non-excludable and non-rivalrous goods" }
        ],
        hlOnly: [
          { code: "2.10", title: "Market failure—asymmetric information", description: "Information problems in markets" },
          { code: "2.11", title: "Market failure—market power", description: "Monopolies and imperfect competition" },
          { code: "2.12", title: "The market's inability to achieve equity", description: "Income and wealth distribution" }
        ]
      }
    }
  },
  "business-management": {
    title: "Business Management",
    description: "Study of business organization and management",
    guide: "First assessment 2024",
    units: {
      1: {
        title: "Introduction to business management",
        description: "Fundamental business concepts",
        topics: [
          { code: "1.1", title: "Introduction to business management", description: "Nature and role of business" },
          { code: "1.2", title: "Types of organizations", description: "Private, public, and non-profit organizations" },
          { code: "1.3", title: "Organizational objectives", description: "Mission, vision, and strategic objectives" },
          { code: "1.4", title: "Stakeholders", description: "Internal and external stakeholders" },
          { code: "1.5", title: "External environment", description: "PESTLE analysis and external factors" },
          { code: "1.6", title: "Growth and evolution", description: "Business growth strategies and challenges" }
        ],
        hlOnly: [
          { code: "1.7", title: "Organizational planning tools", description: "Strategic planning frameworks" }
        ]
      }
    }
  }
};

export default ibSubjectData;