import { useState, useMemo, useCallback } from "react";
import { BackButton } from "@/components/ui/back-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ChevronRight, 
  Folder, 
  FileText, 
  Calendar, 
  BookOpen,
  Search,
  ExternalLink,
  FileCheck,
  Paperclip,
  Database,
  FlaskConical
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePastPapers, PastPaper } from "@/hooks/usePastPapers";

// The base URL for the Supabase storage bucket (paper-uploads is public)
const SUPABASE_STORAGE_URL = `https://jimfuknlntcqgtqfwcod.supabase.co/storage/v1/object/public/paper-uploads`;

// Fallback to R2 for older papers that might still be there
const R2_DOMAIN = "https://pub-51fb18270b7f415792af570c9e90ef14.r2.dev";

// Subject group mapping
const SUBJECT_GROUPS: Record<string, string> = {
  // Group 1 - Studies in Language and Literature
  'english_a_literature': 'Group 1 - Studies in Language and Literature',
  'english_a_language_and_literature': 'Group 1 - Studies in Language and Literature',
  'english_a': 'Group 1 - Studies in Language and Literature',
  'studies_in_language_and_literature': 'Group 1 - Studies in Language and Literature',
  'literature': 'Group 1 - Studies in Language and Literature',
  'language_and_literature': 'Group 1 - Studies in Language and Literature',
  
  // Group 2 - Language Acquisition
  'english_b': 'Group 2 - Language Acquisition',
  'latin': 'Group 2 - Language Acquisition',
  
  // Group 3 - Individuals and Societies
  'business_management': 'Group 3 - Individuals and Societies',
  'business_and_management': 'Group 3 - Individuals and Societies',
  'economics': 'Group 3 - Individuals and Societies',
  'geography': 'Group 3 - Individuals and Societies',
  'history': 'Group 3 - Individuals and Societies',
  'philosophy': 'Group 3 - Individuals and Societies',
  'psychology': 'Group 3 - Individuals and Societies',
  'global_politics': 'Group 3 - Individuals and Societies',
  'itgs': 'Group 3 - Individuals and Societies',
  'information_technology_in_a_global_society': 'Group 3 - Individuals and Societies',
  'social_and_cultural_anthropology': 'Group 3 - Individuals and Societies',
  'world_religions': 'Group 3 - Individuals and Societies',
  'environmental_systems_and_societies': 'Group 3 - Individuals and Societies',
  'digital_society': 'Group 3 - Individuals and Societies',
  
  // Group 4 - Experimental Sciences
  'biology': 'Group 4 - Experimental Sciences',
  'chemistry': 'Group 4 - Experimental Sciences',
  'physics': 'Group 4 - Experimental Sciences',
  'design_technology': 'Group 4 - Experimental Sciences',
  'computer_science': 'Group 4 - Experimental Sciences',
  'sports_exercise_and_health_science': 'Group 4 - Experimental Sciences',
  'ess': 'Group 4 - Experimental Sciences',
  
  // Group 5 - Mathematics
  'mathematics': 'Group 5 - Mathematics',
  'mathematics_analysis_and_approaches': 'Group 5 - Mathematics',
  'mathematics_applications_and_interpretation': 'Group 5 - Mathematics',
  'math_hl': 'Group 5 - Mathematics',
  'math_sl': 'Group 5 - Mathematics',
  'further_mathematics': 'Group 5 - Mathematics',
  'mathematical_studies': 'Group 5 - Mathematics',
  
  // Core
  'theory_of_knowledge': 'Core',
  'tok': 'Core',
};

function formatSubjectName(name: string): string {
  return name.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function getSubjectGroup(subject: string): string {
  return SUBJECT_GROUPS[subject] || 'Other';
}

// Tree Node Component
interface TreeNodeProps {
  label: string;
  icon: React.ReactNode;
  count?: number;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

function TreeNode({ label, icon, count, children, defaultOpen = false, className }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("ml-0", className)}>
      <div 
        className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronRight className={cn("h-4 w-4 transition-transform text-muted-foreground", isOpen && "rotate-90")} />
        {icon}
        <span className="font-medium text-foreground">{label}</span>
        {count !== undefined && (
          <span className="ml-auto text-sm text-muted-foreground">{count}</span>
        )}
      </div>
      {isOpen && children && (
        <div className="ml-6 border-l border-border pl-2">
          {children}
        </div>
      )}
    </div>
  );
}

// Paper Link Component
interface PaperLinkProps {
  paper: PastPaper;
}

function PaperLink({ paper }: PaperLinkProps) {
  const icon = paper.is_markscheme ? (
    <FileCheck className="h-4 w-4 text-green-500" />
  ) : paper.is_resource ? (
    <Paperclip className="h-4 w-4 text-orange-500" />
  ) : (
    <FileText className="h-4 w-4 text-primary" />
  );

  const label = paper.is_markscheme ? 'Mark Scheme' : paper.is_resource ? 'Resource' : 'Paper';
  
  // Construct URL - prefer Supabase storage (paper-uploads bucket), fallback to R2
  let href: string;
  
  if (paper.file_url) {
    // If we have a file_url, use it (could be full URL or just path)
    if (paper.file_url.startsWith('http')) {
      href = paper.file_url;
    } else {
      // Assume it's in paper-uploads bucket
      href = `${SUPABASE_STORAGE_URL}/${paper.file_url}`;
    }
  } else {
    // No file_url - try to find file by name in paper-uploads bucket first
    href = `${SUPABASE_STORAGE_URL}/${paper.name}`;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground group"
    >
      {icon}
      <span>{label} {paper.paper_number || ''}</span>
      <div className="flex gap-1 ml-auto">
        {paper.level && (
          <span className={cn(
            "px-2 py-0.5 text-xs rounded-full",
            paper.level === 'HL' ? "bg-primary text-primary-foreground" : "border border-primary text-primary"
          )}>
            {paper.level}
          </span>
        )}
        {paper.timezone && paper.timezone !== 'TZ0' && (
          <span className={cn(
            "px-2 py-0.5 text-xs rounded-full",
            paper.timezone === 'TZ1' ? "bg-blue-500 text-white" : "bg-purple-500 text-white"
          )}>
            {paper.timezone}
          </span>
        )}
        {paper.session && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-muted">
            {paper.session.substring(0, 3)}
          </span>
        )}
        {paper.is_markscheme && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-500 text-white">
            MS
          </span>
        )}
      </div>
      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

export default function PastPapersBrowser() {
  const { papers, years, subjects, loading, error } = usePastPapers();
  
  // Filters for past papers
  const [sortBy, setSortBy] = useState<'year' | 'subject'>('year');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [timezoneFilter, setTimezoneFilter] = useState<string>('all');
  const [paperFilter, setPaperFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filters for specimen papers
  const [specimenSubjectFilter, setSpecimenSubjectFilter] = useState<string>('all');
  const [specimenSearch, setSpecimenSearch] = useState('');

  // Separate regular papers and specimen papers
  const { regularPapers, specimenPapers } = useMemo(() => {
    const regular: PastPaper[] = [];
    const specimen: PastPaper[] = [];
    
    papers.forEach(paper => {
      if (paper.session === 'Specimen' || paper.code?.startsWith('specimen_')) {
        specimen.push(paper);
      } else {
        regular.push(paper);
      }
    });
    
    return { regularPapers: regular, specimenPapers: specimen };
  }, [papers]);

  // Filter function for regular papers
  const matchesFilters = useCallback((paper: PastPaper): boolean => {
    if (yearFilter !== 'all' && paper.year.toString() !== yearFilter) return false;
    if (subjectFilter !== 'all' && paper.subject !== subjectFilter) return false;
    if (levelFilter !== 'all' && paper.level !== levelFilter) return false;
    if (timezoneFilter !== 'all' && paper.timezone !== timezoneFilter) return false;
    if (paperFilter !== 'all' && paper.paper_number !== paperFilter) return false;
    
    if (typeFilter !== 'all') {
      if (typeFilter === 'paper' && (paper.is_markscheme || paper.is_resource)) return false;
      if (typeFilter === 'markscheme' && !paper.is_markscheme) return false;
      if (typeFilter === 'resource' && !paper.is_resource) return false;
    }
    
    if (searchQuery) {
      const searchStr = `${paper.name || ''} ${paper.code || ''}`.toLowerCase();
      if (!searchStr.includes(searchQuery.toLowerCase())) return false;
    }
    
    return true;
  }, [yearFilter, subjectFilter, levelFilter, timezoneFilter, paperFilter, typeFilter, searchQuery]);

  // Filtered regular papers
  const filteredPapers = useMemo(() => {
    return regularPapers.filter(matchesFilters);
  }, [regularPapers, matchesFilters]);
  
  // Filtered specimen papers
  const filteredSpecimenPapers = useMemo(() => {
    return specimenPapers.filter(paper => {
      if (specimenSubjectFilter !== 'all' && paper.subject !== specimenSubjectFilter) return false;
      if (specimenSearch) {
        const searchStr = `${paper.name || ''} ${paper.subject || ''}`.toLowerCase();
        if (!searchStr.includes(specimenSearch.toLowerCase())) return false;
      }
      return true;
    });
  }, [specimenPapers, specimenSubjectFilter, specimenSearch]);
  
  // Specimen papers grouped by subject
  const specimenBySubject = useMemo(() => {
    const grouped: Record<string, PastPaper[]> = {};
    filteredSpecimenPapers.forEach(paper => {
      const group = getSubjectGroup(paper.subject);
      if (!grouped[group]) grouped[group] = [];
      grouped[group].push(paper);
    });
    return grouped;
  }, [filteredSpecimenPapers]);
  
  // Unique specimen subjects
  const specimenSubjects = useMemo(() => {
    return [...new Set(specimenPapers.map(p => p.subject))].sort();
  }, [specimenPapers]);

  // Build tree by year
  const treeByYear = useMemo(() => {
    const tree: Record<string, Record<string, Record<string, PastPaper[]>>> = {};
    
    filteredPapers.forEach(paper => {
      const year = paper.year.toString();
      const group = getSubjectGroup(paper.subject);
      const subject = paper.subject;
      
      if (!tree[year]) tree[year] = {};
      if (!tree[year][group]) tree[year][group] = {};
      if (!tree[year][group][subject]) tree[year][group][subject] = [];
      
      tree[year][group][subject].push(paper);
    });
    
    return tree;
  }, [filteredPapers]);

  // Build tree by subject
  const treeBySubject = useMemo(() => {
    const tree: Record<string, Record<string, Record<string, PastPaper[]>>> = {};
    
    filteredPapers.forEach(paper => {
      const group = getSubjectGroup(paper.subject);
      const subject = paper.subject;
      const year = paper.year.toString();
      
      if (!tree[group]) tree[group] = {};
      if (!tree[group][subject]) tree[group][subject] = {};
      if (!tree[group][subject][year]) tree[group][subject][year] = [];
      
      tree[group][subject][year].push(paper);
    });
    
    return tree;
  }, [filteredPapers]);

  // Sort papers
  const sortPapers = (papers: PastPaper[]): PastPaper[] => {
    return [...papers].sort((a, b) => {
      if (a.is_resource !== b.is_resource) return a.is_resource ? 1 : -1;
      if (a.is_markscheme !== b.is_markscheme) return a.is_markscheme ? 1 : -1;
      return (a.code || '').localeCompare(b.code || '');
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading papers from database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <p className="text-muted-foreground">Failed to load papers from database.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton fallbackPath="/work/past-papers" />
        </div>

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            📚 IB Papers Directory
          </h1>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <Database className="h-4 w-4" />
            {regularPapers.length.toLocaleString()} past papers + {specimenPapers.length} specimen papers
          </p>
        </header>

        {/* Main Tabs */}
        <Tabs defaultValue="past-papers" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="past-papers">Past Papers ({regularPapers.length.toLocaleString()})</TabsTrigger>
            <TabsTrigger value="specimen-papers">
              <FlaskConical className="h-4 w-4 mr-1" />
              Specimen ({specimenPapers.length})
            </TabsTrigger>
          </TabsList>

          {/* Past Papers Tab */}
          <TabsContent value="past-papers">
          {/* Sort Toggle */}
          <div className="flex items-center gap-4 mb-4 p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <div className="flex gap-2">
              <Button 
                variant={sortBy === 'year' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSortBy('year')}
              >
                Year → Group → Subject
              </Button>
              <Button 
                variant={sortBy === 'subject' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSortBy('subject')}
              >
                Group → Subject → Year
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6 p-4 bg-muted/30 rounded-lg">
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{formatSubjectName(subject)}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="HL">HL</SelectItem>
                <SelectItem value="SL">SL</SelectItem>
                <SelectItem value="HLSL">HL/SL</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timezoneFilter} onValueChange={setTimezoneFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Timezones" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Timezones</SelectItem>
                <SelectItem value="TZ0">TZ0</SelectItem>
                <SelectItem value="TZ1">TZ1</SelectItem>
                <SelectItem value="TZ2">TZ2</SelectItem>
              </SelectContent>
            </Select>

            <Select value={paperFilter} onValueChange={setPaperFilter}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="All Papers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Papers</SelectItem>
                <SelectItem value="1">Paper 1</SelectItem>
                <SelectItem value="2">Paper 2</SelectItem>
                <SelectItem value="3">Paper 3</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="paper">Papers Only</SelectItem>
                <SelectItem value="markscheme">Mark Schemes Only</SelectItem>
                <SelectItem value="resource">Resources Only</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1 min-w-48">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredPapers.length.toLocaleString()} of {papers.length.toLocaleString()} papers
          </p>

          {/* Tree View */}
          <div className="bg-card border rounded-xl p-4">
            {sortBy === 'year' ? (
              Object.keys(treeByYear).length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No papers found matching your criteria.</p>
              ) : (
                Object.keys(treeByYear).sort().reverse().map(year => {
                  const groups = treeByYear[year];
                  const totalPapers = Object.values(groups).reduce((sum, subjects) => 
                    sum + Object.values(subjects).reduce((s, papers) => s + papers.length, 0), 0);
                  
                  return (
                    <TreeNode
                      key={year}
                      label={year}
                      icon={<Calendar className="h-4 w-4 text-primary" />}
                      count={totalPapers}
                      className="bg-gradient-to-r from-muted/50 to-transparent rounded-lg mb-2"
                    >
                      {Object.keys(groups).sort().map(group => {
                        const subjects = groups[group];
                        const groupPapers = Object.values(subjects).reduce((s, p) => s + p.length, 0);
                        
                        return (
                          <TreeNode
                            key={group}
                            label={group}
                            icon={<Folder className="h-4 w-4 text-primary" />}
                            count={groupPapers}
                          >
                            {Object.keys(subjects).sort().map(subject => {
                              const papers = subjects[subject];
                              
                              return (
                                <TreeNode
                                  key={subject}
                                  label={formatSubjectName(subject)}
                                  icon={<BookOpen className="h-4 w-4 text-green-500" />}
                                  count={papers.length}
                                >
                                  {sortPapers(papers).map((paper) => (
                                    <PaperLink 
                                      key={paper.id} 
                                      paper={paper} 
                                    />
                                  ))}
                                </TreeNode>
                              );
                            })}
                          </TreeNode>
                        );
                      })}
                    </TreeNode>
                  );
                })
              )
            ) : (
              Object.keys(treeBySubject).length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No papers found matching your criteria.</p>
              ) : (
                Object.keys(treeBySubject).sort().map(group => {
                  const subjects = treeBySubject[group];
                  const totalPapers = Object.values(subjects).reduce((sum, years) => 
                    sum + Object.values(years).reduce((s, papers) => s + papers.length, 0), 0);
                  
                  return (
                    <TreeNode
                      key={group}
                      label={group}
                      icon={<Folder className="h-4 w-4 text-primary" />}
                      count={totalPapers}
                      className="bg-gradient-to-r from-muted/50 to-transparent rounded-lg mb-2"
                    >
                      {Object.keys(subjects).sort().map(subject => {
                        const years = subjects[subject];
                        const subjectPapers = Object.values(years).reduce((s, p) => s + p.length, 0);
                        
                        return (
                          <TreeNode
                            key={subject}
                            label={formatSubjectName(subject)}
                            icon={<BookOpen className="h-4 w-4 text-green-500" />}
                            count={subjectPapers}
                          >
                            {Object.keys(years).sort().reverse().map(year => {
                              const papers = years[year];
                              
                              return (
                                <TreeNode
                                  key={year}
                                  label={year}
                                  icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
                                  count={papers.length}
                                >
                                  {sortPapers(papers).map((paper) => (
                                    <PaperLink 
                                      key={paper.id} 
                                      paper={paper} 
                                    />
                                  ))}
                                </TreeNode>
                              );
                            })}
                          </TreeNode>
                        );
                      })}
                    </TreeNode>
                  );
                })
              )
            )}
          </div>
          </TabsContent>

          {/* Specimen Papers Tab */}
          <TabsContent value="specimen-papers">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6 p-4 bg-muted/30 rounded-lg">
              <Select value={specimenSubjectFilter} onValueChange={setSpecimenSubjectFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {specimenSubjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{formatSubjectName(subject)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex-1 min-w-48">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search specimen papers..."
                    value={specimenSearch}
                    onChange={(e) => setSpecimenSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredSpecimenPapers.length} of {specimenPapers.length} specimen papers
            </p>

            {/* Tree View */}
            <div className="bg-card border rounded-xl p-4">
              {Object.keys(specimenBySubject).length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No specimen papers found.</p>
              ) : (
                Object.keys(specimenBySubject).sort().map(group => {
                  const papers = specimenBySubject[group];
                  
                  return (
                    <TreeNode
                      key={group}
                      label={group}
                      icon={<Folder className="h-4 w-4 text-orange-500" />}
                      count={papers.length}
                      className="bg-gradient-to-r from-muted/50 to-transparent rounded-lg mb-2"
                    >
                      {sortPapers(papers).map((paper) => (
                        <PaperLink key={paper.id} paper={paper} />
                      ))}
                    </TreeNode>
                  );
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
