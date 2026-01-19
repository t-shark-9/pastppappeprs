import { useState, useMemo, useEffect } from "react";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon, 
  BookOpen, 
  Clock, 
  Target, 
  Trash2, 
  CalendarDays,
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  RotateCcw,
  Coffee,
  Brain,
  Shuffle,
  CircleDot,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

// IB Subject data with ACCURATE exam dates (May 2026 session)
const IB_SUBJECTS = [
  // Group 1: Language and Literature
  { id: 'english_a_lit', name: 'English A: Literature', group: 1, examDates: ['2026-05-04', '2026-05-05'], color: 'bg-rose-500' },
  { id: 'english_a_langlit', name: 'English A: Language & Literature', group: 1, examDates: ['2026-05-04', '2026-05-05'], color: 'bg-rose-500' },
  { id: 'language_a_lit', name: 'Language A: Literature (Other)', group: 1, examDates: ['2026-05-04', '2026-05-05'], color: 'bg-rose-500' },
  
  // Group 2: Language Acquisition
  { id: 'french_b', name: 'French B', group: 2, examDates: ['2026-05-06', '2026-05-07'], color: 'bg-amber-500' },
  { id: 'spanish_b', name: 'Spanish B', group: 2, examDates: ['2026-05-06', '2026-05-07'], color: 'bg-amber-500' },
  { id: 'german_b', name: 'German B', group: 2, examDates: ['2026-05-06', '2026-05-07'], color: 'bg-amber-500' },
  { id: 'mandarin_b', name: 'Mandarin B', group: 2, examDates: ['2026-05-06', '2026-05-07'], color: 'bg-amber-500' },
  { id: 'french_ab', name: 'French ab initio', group: 2, examDates: ['2026-05-06', '2026-05-07'], color: 'bg-amber-500' },
  { id: 'spanish_ab', name: 'Spanish ab initio', group: 2, examDates: ['2026-05-06', '2026-05-07'], color: 'bg-amber-500' },
  
  // Group 3: Individuals and Societies
  { id: 'history', name: 'History', group: 3, examDates: ['2026-05-08', '2026-05-09'], color: 'bg-blue-500' },
  { id: 'geography', name: 'Geography', group: 3, examDates: ['2026-05-12', '2026-05-13'], color: 'bg-blue-500' },
  { id: 'economics', name: 'Economics', group: 3, examDates: ['2026-05-14', '2026-05-15'], color: 'bg-blue-500' },
  { id: 'psychology', name: 'Psychology', group: 3, examDates: ['2026-05-16', '2026-05-19'], color: 'bg-blue-500' },
  { id: 'business', name: 'Business Management', group: 3, examDates: ['2026-05-20'], color: 'bg-blue-500' },
  { id: 'global_politics', name: 'Global Politics', group: 3, examDates: ['2026-05-21'], color: 'bg-blue-500' },
  { id: 'philosophy', name: 'Philosophy', group: 3, examDates: ['2026-05-22'], color: 'bg-blue-500' },
  
  // Group 4: Sciences
  { id: 'biology', name: 'Biology', group: 4, examDates: ['2026-05-05', '2026-05-06'], color: 'bg-green-500' },
  { id: 'chemistry', name: 'Chemistry', group: 4, examDates: ['2026-05-07', '2026-05-08'], color: 'bg-green-500' },
  { id: 'physics', name: 'Physics', group: 4, examDates: ['2026-05-09', '2026-05-12'], color: 'bg-green-500' },
  { id: 'computer_science', name: 'Computer Science', group: 4, examDates: ['2026-05-19', '2026-05-20'], color: 'bg-green-500' },
  { id: 'ess', name: 'ESS', group: 4, examDates: ['2026-05-15'], color: 'bg-green-500' },
  { id: 'sehs', name: 'Sports, Exercise & Health Science', group: 4, examDates: ['2026-05-18', '2026-05-19'], color: 'bg-green-500' },
  
  // Group 5: Mathematics
  { id: 'math_aa', name: 'Math: Analysis & Approaches', group: 5, examDates: ['2026-05-01', '2026-05-02', '2026-05-05'], color: 'bg-purple-500' },
  { id: 'math_ai', name: 'Math: Applications & Interpretation', group: 5, examDates: ['2026-05-01', '2026-05-02', '2026-05-05'], color: 'bg-purple-500' },
  
  // Group 6: The Arts
  { id: 'music', name: 'Music', group: 6, examDates: ['2026-05-22'], color: 'bg-pink-500' },
  { id: 'visual_arts', name: 'Visual Arts', group: 6, examDates: [], color: 'bg-pink-500' },
  { id: 'theatre', name: 'Theatre', group: 6, examDates: [], color: 'bg-pink-500' },
  { id: 'film', name: 'Film', group: 6, examDates: [], color: 'bg-pink-500' },
];

const GROUP_NAMES: Record<number, string> = {
  1: 'Language & Literature',
  2: 'Language Acquisition',
  3: 'Individuals & Societies',
  4: 'Sciences',
  5: 'Mathematics',
  6: 'The Arts',
};

interface SelectedSubject {
  id: string;
  level: 'HL' | 'SL';
}

interface StudyDay {
  date: string;
  subjects: {
    subjectId: string;
    isExamDay: boolean;
    examPaper?: string;
  }[];
  completed: boolean;
}

// Traffic Light Review types
type TrafficLightStatus = 'green' | 'yellow' | 'red' | 'none';

interface TopicStatus {
  topicId: string;
  status: TrafficLightStatus;
}

// Sample syllabus topics for each subject
const SYLLABUS_TOPICS: Record<string, { id: string; name: string; }[]> = {
  biology: [
    { id: 'bio-1', name: '1. Cell Biology' },
    { id: 'bio-2', name: '2. Molecular Biology' },
    { id: 'bio-3', name: '3. Genetics' },
    { id: 'bio-4', name: '4. Ecology' },
    { id: 'bio-5', name: '5. Evolution & Biodiversity' },
    { id: 'bio-6', name: '6. Human Physiology' },
  ],
  chemistry: [
    { id: 'chem-1', name: '1. Stoichiometry' },
    { id: 'chem-2', name: '2. Atomic Structure' },
    { id: 'chem-3', name: '3. Periodicity' },
    { id: 'chem-4', name: '4. Bonding' },
    { id: 'chem-5', name: '5. Energetics' },
    { id: 'chem-6', name: '6. Kinetics' },
    { id: 'chem-7', name: '7. Equilibrium' },
    { id: 'chem-8', name: '8. Acids & Bases' },
    { id: 'chem-9', name: '9. Redox' },
    { id: 'chem-10', name: '10. Organic Chemistry' },
  ],
  physics: [
    { id: 'phys-1', name: '1. Measurements' },
    { id: 'phys-2', name: '2. Mechanics' },
    { id: 'phys-3', name: '3. Thermal Physics' },
    { id: 'phys-4', name: '4. Waves' },
    { id: 'phys-5', name: '5. Electricity & Magnetism' },
    { id: 'phys-6', name: '6. Circular Motion' },
    { id: 'phys-7', name: '7. Atomic & Nuclear' },
    { id: 'phys-8', name: '8. Energy Production' },
  ],
  math_aa: [
    { id: 'math-1', name: '1. Number & Algebra' },
    { id: 'math-2', name: '2. Functions' },
    { id: 'math-3', name: '3. Geometry & Trigonometry' },
    { id: 'math-4', name: '4. Statistics & Probability' },
    { id: 'math-5', name: '5. Calculus' },
  ],
  math_ai: [
    { id: 'mathai-1', name: '1. Number & Algebra' },
    { id: 'mathai-2', name: '2. Functions' },
    { id: 'mathai-3', name: '3. Geometry & Trigonometry' },
    { id: 'mathai-4', name: '4. Statistics & Probability' },
    { id: 'mathai-5', name: '5. Calculus' },
  ],
  history: [
    { id: 'hist-1', name: 'Paper 1: Source Analysis' },
    { id: 'hist-2', name: 'Paper 2: World History Topics' },
    { id: 'hist-3', name: 'Paper 3: HL Regional History' },
  ],
  economics: [
    { id: 'econ-1', name: '1. Introduction to Economics' },
    { id: 'econ-2', name: '2. Microeconomics' },
    { id: 'econ-3', name: '3. Macroeconomics' },
    { id: 'econ-4', name: '4. Global Economy' },
  ],
  psychology: [
    { id: 'psych-1', name: 'Biological Approach' },
    { id: 'psych-2', name: 'Cognitive Approach' },
    { id: 'psych-3', name: 'Sociocultural Approach' },
    { id: 'psych-4', name: 'Research Methods' },
  ],
  english_a_lit: [
    { id: 'englit-1', name: 'Paper 1: Guided Analysis' },
    { id: 'englit-2', name: 'Paper 2: Comparative Essay' },
    { id: 'englit-3', name: 'HL Essay' },
    { id: 'englit-4', name: 'Individual Oral' },
  ],
  english_a_langlit: [
    { id: 'englanglit-1', name: 'Paper 1: Guided Analysis' },
    { id: 'englanglit-2', name: 'Paper 2: Comparative Essay' },
    { id: 'englanglit-3', name: 'HL Essay' },
    { id: 'englanglit-4', name: 'Individual Oral' },
  ],
};

// Load from localStorage
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

// Save to localStorage
const saveToStorage = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn('Failed to save to localStorage');
  }
};

export default function StudyPlanner() {
  const [selectedSubjects, setSelectedSubjects] = useState<SelectedSubject[]>(() => 
    loadFromStorage('ib-study-planner-subjects', [])
  );
  const [completedDays, setCompletedDays] = useState<string[]>(() => 
    loadFromStorage('ib-study-planner-completed', [])
  );
  const [step, setStep] = useState<'select' | 'plan'>(() => 
    loadFromStorage<SelectedSubject[]>('ib-study-planner-subjects', []).length > 0 ? 'plan' : 'select'
  );
  const [activeTab, setActiveTab] = useState<'schedule' | 'interleaving' | 'traffic-light'>('schedule');
  
  // Traffic Light Review state
  const [topicStatuses, setTopicStatuses] = useState<TopicStatus[]>(() => 
    loadFromStorage('ib-study-planner-topics', [])
  );

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage('ib-study-planner-subjects', selectedSubjects);
  }, [selectedSubjects]);

  useEffect(() => {
    saveToStorage('ib-study-planner-completed', completedDays);
  }, [completedDays]);

  useEffect(() => {
    saveToStorage('ib-study-planner-topics', topicStatuses);
  }, [topicStatuses]);

  // Traffic light helpers
  const getTopicStatus = (topicId: string): TrafficLightStatus => {
    return topicStatuses.find(t => t.topicId === topicId)?.status || 'none';
  };

  const setTopicStatus = (topicId: string, status: TrafficLightStatus) => {
    setTopicStatuses(prev => {
      const existing = prev.find(t => t.topicId === topicId);
      if (existing) {
        if (status === 'none') {
          return prev.filter(t => t.topicId !== topicId);
        }
        return prev.map(t => t.topicId === topicId ? { ...t, status } : t);
      }
      if (status === 'none') return prev;
      return [...prev, { topicId, status }];
    });
  };

  // Calculate traffic light stats
  const trafficLightStats = useMemo(() => {
    const allTopics = selectedSubjects.flatMap(s => SYLLABUS_TOPICS[s.id] || []);
    const green = topicStatuses.filter(t => t.status === 'green').length;
    const yellow = topicStatuses.filter(t => t.status === 'yellow').length;
    const red = topicStatuses.filter(t => t.status === 'red').length;
    const unrated = allTopics.length - green - yellow - red;
    return { green, yellow, red, unrated, total: allTopics.length };
  }, [selectedSubjects, topicStatuses]);

  // Generate interleaving schedule for today
  const interleavingSchedule = useMemo(() => {
    if (selectedSubjects.length === 0) return [];
    
    // Create a 4-hour study session with 3 different subjects
    const subjectsToStudy = selectedSubjects.slice(0, Math.min(3, selectedSubjects.length));
    const schedule = [];
    
    const activities = [
      'problems/practice questions',
      'essay planning/writing',
      'flashcards/active recall',
      'past paper review',
      'notes review & summarization',
      'concept mapping'
    ];
    
    subjectsToStudy.forEach((s, idx) => {
      const subject = IB_SUBJECTS.find(sub => sub.id === s.id);
      if (!subject) return;
      
      schedule.push({
        type: 'study',
        duration: 60,
        subject: subject.name,
        activity: activities[idx % activities.length],
        color: subject.color
      });
      
      if (idx < subjectsToStudy.length - 1) {
        schedule.push({
          type: 'break',
          duration: 15,
          subject: '',
          activity: 'Take a break - stretch, hydrate, rest your eyes',
          color: ''
        });
      }
    });
    
    return schedule;
  }, [selectedSubjects]);

  // Calculate days until May exams start
  const examStartDate = new Date('2026-05-01');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntilExams = Math.ceil((examStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Get subjects by group
  const subjectsByGroup = useMemo(() => {
    const grouped: Record<number, typeof IB_SUBJECTS> = {};
    IB_SUBJECTS.forEach(subject => {
      if (!grouped[subject.group]) grouped[subject.group] = [];
      grouped[subject.group].push(subject);
    });
    return grouped;
  }, []);

  // Toggle subject selection
  const toggleSubject = (subjectId: string, level: 'HL' | 'SL') => {
    setSelectedSubjects(prev => {
      const existing = prev.find(s => s.id === subjectId);
      if (existing) {
        if (existing.level === level) {
          return prev.filter(s => s.id !== subjectId);
        }
        return prev.map(s => s.id === subjectId ? { ...s, level } : s);
      }
      return [...prev, { id: subjectId, level }];
    });
  };

  // Generate smart study plan - study subject the day before exam
  const studyPlan = useMemo((): StudyDay[] => {
    if (selectedSubjects.length === 0) return [];

    const plan: StudyDay[] = [];
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    
    // Get all exam dates for selected subjects, sorted
    const examEvents: { date: string; subjectId: string; paper: number }[] = [];
    
    selectedSubjects.forEach(selected => {
      const subject = IB_SUBJECTS.find(s => s.id === selected.id);
      if (!subject) return;
      
      subject.examDates.forEach((date, idx) => {
        examEvents.push({
          date,
          subjectId: selected.id,
          paper: idx + 1
        });
      });
    });
    
    // Sort by date
    examEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (examEvents.length === 0) return [];
    
    // Create study days from today until end of exams
    const endDate = new Date(examEvents[examEvents.length - 1].date);
    endDate.setDate(endDate.getDate() + 1);
    
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const daySubjects: StudyDay['subjects'] = [];
      
      // Check if there are exams on this day
      const todaysExams = examEvents.filter(e => e.date === dateStr);
      todaysExams.forEach(exam => {
        daySubjects.push({
          subjectId: exam.subjectId,
          isExamDay: true,
          examPaper: `Paper ${exam.paper}`
        });
      });
      
      // Check if there are exams TOMORROW - if so, study those subjects today
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      
      const tomorrowsExams = examEvents.filter(e => e.date === tomorrowStr);
      tomorrowsExams.forEach(exam => {
        // Don't add if already in today's list
        if (!daySubjects.find(s => s.subjectId === exam.subjectId)) {
          daySubjects.push({
            subjectId: exam.subjectId,
            isExamDay: false,
            examPaper: `Prep for Paper ${exam.paper}`
          });
        }
      });
      
      // If no specific prep needed, cycle through subjects based on upcoming exam order
      if (daySubjects.length === 0 && currentDate < examStartDate) {
        // Find the next exam subject that hasn't been studied recently
        const upcomingExams = examEvents.filter(e => new Date(e.date) > currentDate);
        if (upcomingExams.length > 0) {
          // Calculate days until each exam and prioritize accordingly
          const daysUntil = (date: string) => Math.ceil((new Date(date).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
          
          // Study subjects with exams 2-7 days away (not day before, that's covered above)
          const mediumTermExams = upcomingExams.filter(e => {
            const days = daysUntil(e.date);
            return days >= 2 && days <= 7;
          });
          
          if (mediumTermExams.length > 0) {
            // Pick based on day of week rotation
            const dayIndex = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const uniqueSubjects = [...new Set(mediumTermExams.map(e => e.subjectId))];
            const subjectToStudy = uniqueSubjects[dayIndex % uniqueSubjects.length];
            
            daySubjects.push({
              subjectId: subjectToStudy,
              isExamDay: false
            });
          } else {
            // Fallback: cycle through all selected subjects
            const dayIndex = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const subjectToStudy = selectedSubjects[dayIndex % selectedSubjects.length];
            
            daySubjects.push({
              subjectId: subjectToStudy.id,
              isExamDay: false
            });
          }
        }
      }
      
      if (daySubjects.length > 0) {
        plan.push({
          date: dateStr,
          subjects: daySubjects,
          completed: completedDays.includes(dateStr)
        });
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return plan;
  }, [selectedSubjects, completedDays]);

  // Toggle day completion
  const toggleDayComplete = (date: string) => {
    setCompletedDays(prev => 
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
  };

  // Calculate stats
  const stats = useMemo(() => {
    const total = studyPlan.length;
    const completed = studyPlan.filter(d => d.completed).length;
    const examDays = studyPlan.filter(d => d.subjects.some(s => s.isExamDay)).length;
    const studyDays = total - examDays;
    
    return {
      total,
      completed,
      examDays,
      studyDays,
      progress: total > 0 ? (completed / total) * 100 : 0
    };
  }, [studyPlan]);

  // Get subject details
  const getSubject = (subjectId: string) => IB_SUBJECTS.find(s => s.id === subjectId);
  const getSubjectLevel = (subjectId: string) => selectedSubjects.find(s => s.id === subjectId)?.level;

  // Reset everything
  const resetPlan = () => {
    setSelectedSubjects([]);
    setCompletedDays([]);
    setTopicStatuses([]);
    setStep('select');
    localStorage.removeItem('ib-study-planner-subjects');
    localStorage.removeItem('ib-study-planner-completed');
    localStorage.removeItem('ib-study-planner-topics');
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const isToday = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    return date.toDateString() === now.toDateString();
  };

  const isPast = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return date < now;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <BackButton fallbackPath="/" />
        </div>

        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <CalendarDays className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            📚 IB Exam Study Planner
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Smart study schedule for May 2026 - study each subject the day before your exam
          </p>
        </header>

        {/* Countdown */}
        <Card className={cn(
          "mb-8",
          daysUntilExams <= 30 ? "border-destructive bg-destructive/5" : 
          daysUntilExams <= 60 ? "border-orange-500 bg-orange-500/5" : 
          "border-primary bg-primary/5"
        )}>
          <CardContent className="py-6">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {daysUntilExams <= 30 ? (
                <AlertTriangle className="h-8 w-8 text-destructive" />
              ) : (
                <CalendarIcon className="h-8 w-8 text-primary" />
              )}
              <div className="text-center">
                <p className="text-3xl font-bold">
                  {daysUntilExams > 0 ? daysUntilExams : 0} days
                </p>
                <p className="text-muted-foreground">until May exams begin</p>
              </div>
              {daysUntilExams <= 60 && daysUntilExams > 0 && (
                <Badge variant={daysUntilExams <= 30 ? "destructive" : "secondary"}>
                  {daysUntilExams <= 30 ? "Final stretch!" : "Getting close!"}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {step === 'select' ? (
          /* Subject Selection */
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                Select Your IB Subjects
              </CardTitle>
              <CardDescription>
                Choose your 6 subjects and their levels (HL/SL). The planner will create a smart schedule based on your exam dates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(subjectsByGroup).map(([group, subjects]) => (
                <div key={group}>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
                    <span className={cn("w-3 h-3 rounded-full", subjects[0]?.color || 'bg-gray-500')} />
                    Group {group}: {GROUP_NAMES[Number(group)]}
                  </h4>
                  <div className="grid gap-2">
                    {subjects.map(subject => {
                      const selected = selectedSubjects.find(s => s.id === subject.id);
                      return (
                        <div
                          key={subject.id}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border transition-all",
                            selected ? "border-primary bg-primary/5" : "border-transparent bg-muted/30 hover:bg-muted/50"
                          )}
                        >
                          <span className="text-sm flex-1">{subject.name}</span>
                          {subject.examDates.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                              Exam: {new Date(subject.examDates[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                          <div className="flex gap-1">
                            <Button
                              variant={selected?.level === 'HL' ? 'default' : 'outline'}
                              size="sm"
                              className="h-7 px-3 text-xs"
                              onClick={() => toggleSubject(subject.id, 'HL')}
                            >
                              HL
                            </Button>
                            <Button
                              variant={selected?.level === 'SL' ? 'default' : 'outline'}
                              size="sm"
                              className="h-7 px-3 text-xs"
                              onClick={() => toggleSubject(subject.id, 'SL')}
                            >
                              SL
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}

              {selectedSubjects.length > 0 && (
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedSubjects.map(s => {
                        const subject = getSubject(s.id);
                        return (
                          <Badge key={s.id} variant="secondary" className="gap-1">
                            {subject?.name} ({s.level})
                          </Badge>
                        );
                      })}
                    </div>
                    <Badge variant="outline">{selectedSubjects.length} subjects</Badge>
                  </div>
                  <Button 
                    className="w-full gap-2 h-12 text-lg" 
                    onClick={() => setStep('plan')}
                    disabled={selectedSubjects.length === 0}
                  >
                    <Sparkles className="h-5 w-5" />
                    Generate My Study Plan
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          /* Study Plan View */
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Total Days</span>
                  </div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Study Days</span>
                  </div>
                  <p className="text-2xl font-bold">{stats.studyDays}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <span className="text-sm text-muted-foreground">Exam Days</span>
                  </div>
                  <p className="text-2xl font-bold">{stats.examDays}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-muted-foreground">Progress</span>
                  </div>
                  <Progress value={stats.progress} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mb-6">
              <Button variant="outline" onClick={() => setStep('select')} className="gap-2">
                <GraduationCap className="h-4 w-4" />
                Edit Subjects
              </Button>
              <Button variant="outline" onClick={resetPlan} className="gap-2 text-destructive hover:text-destructive">
                <RotateCcw className="h-4 w-4" />
                Reset All
              </Button>
            </div>

            {/* Tabs for different views */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="schedule" className="gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Schedule</span>
                </TabsTrigger>
                <TabsTrigger value="interleaving" className="gap-2">
                  <Shuffle className="h-4 w-4" />
                  <span className="hidden sm:inline">Daily Structure</span>
                </TabsTrigger>
                <TabsTrigger value="traffic-light" className="gap-2">
                  <CircleDot className="h-4 w-4" />
                  <span className="hidden sm:inline">Topic Review</span>
                </TabsTrigger>
              </TabsList>

              {/* Schedule Tab */}
              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Your Study Schedule
                    </CardTitle>
                    <CardDescription>
                      Check off each day as you complete your study sessions. The plan ensures you study each subject the day before its exam.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {studyPlan.map((day, index) => {
                        const hasExam = day.subjects.some(s => s.isExamDay);
                        const todayClass = isToday(day.date);
                        const pastClass = isPast(day.date) && !todayClass;
                        
                        return (
                          <div
                            key={day.date}
                            className={cn(
                              "flex items-start gap-3 p-4 rounded-lg transition-all",
                              hasExam ? "bg-orange-500/10 border border-orange-500/30" : 
                              todayClass ? "bg-primary/10 border border-primary" :
                              day.completed ? "bg-green-500/10 border border-green-500/30" :
                              pastClass ? "bg-muted/30 opacity-60" :
                              "bg-muted/30 hover:bg-muted/50"
                            )}
                          >
                            <div className="pt-1">
                              <Checkbox
                                checked={day.completed}
                                onCheckedChange={() => toggleDayComplete(day.date)}
                                disabled={hasExam}
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={cn(
                                  "font-semibold",
                                  todayClass && "text-primary"
                                )}>
                                  {formatDate(day.date)}
                                </span>
                                {todayClass && (
                                  <Badge variant="default" className="text-xs">TODAY</Badge>
                                )}
                                {hasExam && (
                                  <Badge variant="destructive" className="text-xs gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    EXAM DAY
                                  </Badge>
                                )}
                                {day.completed && !hasExam && (
                                  <Badge variant="secondary" className="text-xs gap-1 bg-green-500/20 text-green-700">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Done
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                {day.subjects.map((s, idx) => {
                                  const subject = getSubject(s.subjectId);
                                  const level = getSubjectLevel(s.subjectId);
                                  if (!subject) return null;
                                  
                                  return (
                                    <div 
                                      key={`${s.subjectId}-${idx}`}
                                      className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm",
                                        s.isExamDay ? "bg-orange-500/20 text-orange-700 dark:text-orange-300" : "bg-background"
                                      )}
                                    >
                                      <span className={cn("w-2 h-2 rounded-full", subject.color)} />
                                      <span className={cn(day.completed && !s.isExamDay && "line-through")}>
                                        {subject.name}
                                      </span>
                                      {level && <Badge variant="outline" className="text-xs h-5">{level}</Badge>}
                                      {s.examPaper && (
                                        <span className="text-xs text-muted-foreground">
                                          ({s.examPaper})
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {studyPlan.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No study plan generated yet</p>
                        <Button variant="link" onClick={() => setStep('select')}>
                          Select your subjects to get started
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Interleaving Tab */}
              <TabsContent value="interleaving">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shuffle className="h-5 w-5" />
                      Daily Study Structure (Interleaving)
                    </CardTitle>
                    <CardDescription>
                      Never study one subject for 4 hours straight. Switching topics forces your brain to "reload" information, strengthening long-term memory.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Today's Interleaving Schedule */}
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Today's Recommended Structure
                      </h4>
                      <div className="space-y-3">
                        {interleavingSchedule.map((block, idx) => (
                          <div 
                            key={idx}
                            className={cn(
                              "flex items-center gap-4 p-4 rounded-lg",
                              block.type === 'break' ? "bg-amber-500/10 border border-amber-500/30" : "bg-muted/30"
                            )}
                          >
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-background border-2">
                              {block.type === 'break' ? (
                                <Coffee className="h-6 w-6 text-amber-500" />
                              ) : (
                                <Brain className="h-6 w-6 text-primary" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {block.color && <span className={cn("w-3 h-3 rounded-full", block.color)} />}
                                <span className="font-semibold">
                                  {block.type === 'break' ? '☕ Break' : block.subject}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {block.duration} min
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{block.activity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Why Interleaving Works */}
                    <div className="bg-primary/5 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Why This Works
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span><strong>Better retention:</strong> Switching topics forces your brain to constantly retrieve and strengthen memories</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span><strong>Less fatigue:</strong> Variety keeps you engaged and prevents mental exhaustion</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span><strong>Exam simulation:</strong> IB exams test multiple subjects - train your brain to switch contexts</span>
                        </li>
                      </ul>
                    </div>

                    {/* Tips */}
                    <div>
                      <h4 className="font-semibold mb-3">📝 Pro Tips</h4>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="p-3 rounded-lg bg-muted/30">
                          <p className="text-sm"><strong>Morning:</strong> Tackle hardest subjects when your brain is fresh</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/30">
                          <p className="text-sm"><strong>Breaks:</strong> Actually rest - no phone scrolling!</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/30">
                          <p className="text-sm"><strong>Variety:</strong> Mix methods - problems, flashcards, essays</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/30">
                          <p className="text-sm"><strong>Review:</strong> End with 10 min reviewing what you learned</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Traffic Light Tab */}
              <TabsContent value="traffic-light">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CircleDot className="h-5 w-5" />
                      Traffic Light Review
                    </CardTitle>
                    <CardDescription>
                      Rate your confidence on each syllabus topic. Focus on 🔴 Red topics immediately, review 🟡 Yellow weekly, and 🟢 Green monthly.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Stats Summary */}
                    <div className="grid grid-cols-4 gap-3">
                      <div className="text-center p-3 rounded-lg bg-green-500/10">
                        <p className="text-2xl font-bold text-green-600">{trafficLightStats.green}</p>
                        <p className="text-xs text-muted-foreground">🟢 Confident</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-yellow-500/10">
                        <p className="text-2xl font-bold text-yellow-600">{trafficLightStats.yellow}</p>
                        <p className="text-xs text-muted-foreground">🟡 Review</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-red-500/10">
                        <p className="text-2xl font-bold text-red-600">{trafficLightStats.red}</p>
                        <p className="text-xs text-muted-foreground">🔴 Focus</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/30">
                        <p className="text-2xl font-bold text-muted-foreground">{trafficLightStats.unrated}</p>
                        <p className="text-xs text-muted-foreground">⚪ Unrated</p>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-4 p-3 rounded-lg bg-muted/30 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500" />
                        <span>I can teach this</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-500" />
                        <span>I make mistakes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500" />
                        <span>I don't understand</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Topics by Subject */}
                    {selectedSubjects.map(selected => {
                      const subject = IB_SUBJECTS.find(s => s.id === selected.id);
                      const topics = SYLLABUS_TOPICS[selected.id] || [];
                      
                      if (topics.length === 0) return null;
                      
                      return (
                        <div key={selected.id} className="space-y-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <span className={cn("w-3 h-3 rounded-full", subject?.color)} />
                            {subject?.name} ({selected.level})
                          </h4>
                          <div className="space-y-2">
                            {topics.map(topic => {
                              const status = getTopicStatus(topic.id);
                              return (
                                <div 
                                  key={topic.id}
                                  className={cn(
                                    "flex items-center justify-between p-3 rounded-lg transition-all",
                                    status === 'green' ? "bg-green-500/10" :
                                    status === 'yellow' ? "bg-yellow-500/10" :
                                    status === 'red' ? "bg-red-500/10" :
                                    "bg-muted/30"
                                  )}
                                >
                                  <span className="text-sm">{topic.name}</span>
                                  <div className="flex gap-1">
                                    <Button
                                      size="sm"
                                      variant={status === 'green' ? 'default' : 'outline'}
                                      className={cn(
                                        "h-8 w-8 p-0 rounded-full",
                                        status === 'green' && "bg-green-500 hover:bg-green-600"
                                      )}
                                      onClick={() => setTopicStatus(topic.id, status === 'green' ? 'none' : 'green')}
                                    >
                                      🟢
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant={status === 'yellow' ? 'default' : 'outline'}
                                      className={cn(
                                        "h-8 w-8 p-0 rounded-full",
                                        status === 'yellow' && "bg-yellow-500 hover:bg-yellow-600"
                                      )}
                                      onClick={() => setTopicStatus(topic.id, status === 'yellow' ? 'none' : 'yellow')}
                                    >
                                      🟡
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant={status === 'red' ? 'default' : 'outline'}
                                      className={cn(
                                        "h-8 w-8 p-0 rounded-full",
                                        status === 'red' && "bg-red-500 hover:bg-red-600"
                                      )}
                                      onClick={() => setTopicStatus(topic.id, status === 'red' ? 'none' : 'red')}
                                    >
                                      🔴
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                    {selectedSubjects.every(s => !SYLLABUS_TOPICS[s.id]) && (
                      <div className="text-center py-8 text-muted-foreground">
                        <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Syllabus topics not available for your selected subjects yet.</p>
                        <p className="text-sm">This feature works best with Sciences and Math subjects.</p>
                      </div>
                    )}

                    {/* Review Schedule */}
                    <div className="bg-primary/5 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">📅 Recommended Review Schedule</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>🔴 <strong>Red topics:</strong> Study these DAILY until they turn yellow</li>
                        <li>🟡 <strong>Yellow topics:</strong> Review WEEKLY with practice questions</li>
                        <li>🟢 <strong>Green topics:</strong> Quick review MONTHLY to maintain</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
