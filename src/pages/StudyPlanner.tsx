import { useState, useMemo } from "react";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Calendar as CalendarIcon, 
  BookOpen, 
  Clock, 
  Target, 
  Plus, 
  Trash2, 
  CalendarDays,
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// IB Subject data with exam dates (May 2026 session - example dates)
const IB_SUBJECTS = [
  { id: 'english_a', name: 'English A: Literature', group: 1, examDates: ['2026-05-04', '2026-05-05'] },
  { id: 'english_a_langlit', name: 'English A: Language & Literature', group: 1, examDates: ['2026-05-04', '2026-05-05'] },
  { id: 'french_b', name: 'French B', group: 2, examDates: ['2026-05-06', '2026-05-07'] },
  { id: 'spanish_b', name: 'Spanish B', group: 2, examDates: ['2026-05-06', '2026-05-07'] },
  { id: 'german_b', name: 'German B', group: 2, examDates: ['2026-05-06', '2026-05-07'] },
  { id: 'history', name: 'History', group: 3, examDates: ['2026-05-08', '2026-05-09', '2026-05-12'] },
  { id: 'geography', name: 'Geography', group: 3, examDates: ['2026-05-08', '2026-05-09'] },
  { id: 'economics', name: 'Economics', group: 3, examDates: ['2026-05-08', '2026-05-09'] },
  { id: 'psychology', name: 'Psychology', group: 3, examDates: ['2026-05-13', '2026-05-14'] },
  { id: 'business', name: 'Business Management', group: 3, examDates: ['2026-05-08', '2026-05-09'] },
  { id: 'global_politics', name: 'Global Politics', group: 3, examDates: ['2026-05-13', '2026-05-14'] },
  { id: 'biology', name: 'Biology', group: 4, examDates: ['2026-05-11', '2026-05-12', '2026-05-13'] },
  { id: 'chemistry', name: 'Chemistry', group: 4, examDates: ['2026-05-14', '2026-05-15', '2026-05-16'] },
  { id: 'physics', name: 'Physics', group: 4, examDates: ['2026-05-18', '2026-05-19', '2026-05-20'] },
  { id: 'computer_science', name: 'Computer Science', group: 4, examDates: ['2026-05-21', '2026-05-22'] },
  { id: 'ess', name: 'ESS', group: 4, examDates: ['2026-05-11', '2026-05-12'] },
  { id: 'math_aa', name: 'Math: Analysis & Approaches', group: 5, examDates: ['2026-05-01', '2026-05-02', '2026-05-05'] },
  { id: 'math_ai', name: 'Math: Applications & Interpretation', group: 5, examDates: ['2026-05-01', '2026-05-02', '2026-05-05'] },
  { id: 'visual_arts', name: 'Visual Arts', group: 6, examDates: [] },
  { id: 'music', name: 'Music', group: 6, examDates: ['2026-05-22'] },
  { id: 'theatre', name: 'Theatre', group: 6, examDates: [] },
  { id: 'film', name: 'Film', group: 6, examDates: [] },
];

const GROUP_NAMES: Record<number, string> = {
  1: 'Language & Literature',
  2: 'Language Acquisition',
  3: 'Individuals & Societies',
  4: 'Sciences',
  5: 'Mathematics',
  6: 'The Arts',
};

interface StudySession {
  id: string;
  subjectId: string;
  date: string;
  duration: number; // in minutes
  topic: string;
  completed: boolean;
}

interface SelectedSubject {
  id: string;
  level: 'HL' | 'SL';
}

export default function StudyPlanner() {
  const [selectedSubjects, setSelectedSubjects] = useState<SelectedSubject[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [newSession, setNewSession] = useState({
    subjectId: '',
    date: '',
    duration: 60,
    topic: '',
  });
  const [showSubjectSelector, setShowSubjectSelector] = useState(true);

  // Calculate days until May exams start (May 1, 2026)
  const examStartDate = new Date('2026-05-01');
  const today = new Date();
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

  // Add study session
  const addSession = () => {
    if (!newSession.subjectId || !newSession.date) return;
    
    const session: StudySession = {
      id: crypto.randomUUID(),
      ...newSession,
      completed: false,
    };
    
    setStudySessions(prev => [...prev, session].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ));
    
    setNewSession({ subjectId: '', date: '', duration: 60, topic: '' });
  };

  // Toggle session completion
  const toggleSessionComplete = (sessionId: string) => {
    setStudySessions(prev => 
      prev.map(s => s.id === sessionId ? { ...s, completed: !s.completed } : s)
    );
  };

  // Delete session
  const deleteSession = (sessionId: string) => {
    setStudySessions(prev => prev.filter(s => s.id !== sessionId));
  };

  // Calculate study stats
  const stats = useMemo(() => {
    const completed = studySessions.filter(s => s.completed).length;
    const total = studySessions.length;
    const totalHours = studySessions.reduce((acc, s) => acc + s.duration, 0) / 60;
    const completedHours = studySessions.filter(s => s.completed).reduce((acc, s) => acc + s.duration, 0) / 60;
    
    return {
      completed,
      total,
      progress: total > 0 ? (completed / total) * 100 : 0,
      totalHours: totalHours.toFixed(1),
      completedHours: completedHours.toFixed(1),
    };
  }, [studySessions]);

  // Get upcoming sessions (next 7 days)
  const upcomingSessions = useMemo(() => {
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return studySessions.filter(s => {
      const sessionDate = new Date(s.date);
      return sessionDate >= now && sessionDate <= weekFromNow && !s.completed;
    });
  }, [studySessions]);

  // Generate smart schedule suggestions
  const generateSchedule = () => {
    if (selectedSubjects.length === 0) return;
    
    const sessions: StudySession[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Start tomorrow
    
    // Generate sessions for each subject
    selectedSubjects.forEach((selected, index) => {
      const subject = IB_SUBJECTS.find(s => s.id === selected.id);
      if (!subject) return;
      
      // HL subjects get more study time
      const sessionsPerWeek = selected.level === 'HL' ? 3 : 2;
      const durationPerSession = selected.level === 'HL' ? 90 : 60;
      
      // Generate 4 weeks of study sessions
      for (let week = 0; week < 4; week++) {
        for (let i = 0; i < sessionsPerWeek; i++) {
          const sessionDate = new Date(startDate);
          sessionDate.setDate(sessionDate.getDate() + (week * 7) + (index % 7) + (i * 2));
          
          sessions.push({
            id: crypto.randomUUID(),
            subjectId: selected.id,
            date: sessionDate.toISOString().split('T')[0],
            duration: durationPerSession,
            topic: `${subject.name} - Week ${week + 1} Session ${i + 1}`,
            completed: false,
          });
        }
      }
    });
    
    setStudySessions(prev => [...prev, ...sessions].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ));
  };

  const getSubjectName = (subjectId: string) => {
    return IB_SUBJECTS.find(s => s.id === subjectId)?.name || subjectId;
  };

  const getSubjectLevel = (subjectId: string) => {
    return selectedSubjects.find(s => s.id === subjectId)?.level;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
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
            Plan your study schedule for the May 2026 exams
          </p>
        </header>

        {/* Countdown Banner */}
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
              {daysUntilExams <= 60 && (
                <Badge variant={daysUntilExams <= 30 ? "destructive" : "secondary"}>
                  {daysUntilExams <= 30 ? "Final stretch!" : "Getting close!"}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        {studySessions.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Sessions</span>
                </div>
                <p className="text-2xl font-bold">{stats.completed}/{stats.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Hours Planned</span>
                </div>
                <p className="text-2xl font-bold">{stats.totalHours}h</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">Completed</span>
                </div>
                <p className="text-2xl font-bold">{stats.completedHours}h</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Progress</span>
                </div>
                <Progress value={stats.progress} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Subject Selection */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Your Subjects
                  {selectedSubjects.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedSubjects.length}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Select your IB subjects and levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[500px] overflow-y-auto pointer-events-auto">
                {Object.entries(subjectsByGroup).map(([group, subjects]) => (
                  <div key={group}>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      Group {group}: {GROUP_NAMES[Number(group)]}
                    </h4>
                    <div className="space-y-2">
                      {subjects.map(subject => {
                        const selected = selectedSubjects.find(s => s.id === subject.id);
                        return (
                          <div
                            key={subject.id}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 pointer-events-auto"
                          >
                            <span className="text-sm flex-1">{subject.name}</span>
                            <Button
                              variant={selected?.level === 'HL' ? 'default' : 'outline'}
                              size="sm"
                              className="h-6 px-2 text-xs pointer-events-auto"
                              onClick={() => toggleSubject(subject.id, 'HL')}
                              type="button"
                            >
                              HL
                            </Button>
                            <Button
                              variant={selected?.level === 'SL' ? 'default' : 'outline'}
                              size="sm"
                              className="h-6 px-2 text-xs pointer-events-auto"
                              onClick={() => toggleSubject(subject.id, 'SL')}
                              type="button"
                            >
                              SL
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                    <Separator className="my-3" />
                  </div>
                ))}

                {selectedSubjects.length > 0 && (
                  <Button 
                    className="w-full gap-2 pointer-events-auto" 
                    onClick={generateSchedule}
                    type="button"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate Smart Schedule
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Schedule */}
          <div className="md:col-span-2">
            {/* Add Session Form */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Study Session
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedSubjects.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Select at least one subject (HL/SL) on the left to enable the Subject dropdown.
                  </p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <Label>Subject</Label>
                    <select
                      value={newSession.subjectId}
                      onChange={(e) => setNewSession(prev => ({ ...prev, subjectId: e.target.value }))}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm pointer-events-auto"
                      disabled={selectedSubjects.length === 0}
                    >
                      <option value="">Select...</option>
                      {selectedSubjects.map(s => (
                        <option key={s.id} value={s.id}>
                          {getSubjectName(s.id)} ({s.level})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal pointer-events-auto"
                          type="button"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newSession.date ? format(new Date(newSession.date), "PPP") : <span className="text-muted-foreground">Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newSession.date ? new Date(newSession.date) : undefined}
                          onSelect={(date) => setNewSession(prev => ({
                            ...prev,
                            date: date ? format(date, "yyyy-MM-dd") : ''
                          }))}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Duration (min)</Label>
                    <Input
                      type="number"
                      value={newSession.duration}
                      onChange={(e) => setNewSession(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
                      className="pointer-events-auto"
                    />
                  </div>
                  <div>
                    <Label>Topic</Label>
                    <Input
                      placeholder="e.g., Chapter 5"
                      value={newSession.topic}
                      onChange={(e) => setNewSession(prev => ({ ...prev, topic: e.target.value }))}
                      className="pointer-events-auto"
                    />
                  </div>
                </div>
                <Button
                  className="mt-4 gap-2 pointer-events-auto"
                  onClick={addSession}
                  disabled={!newSession.subjectId || !newSession.date}
                  type="button"
                >
                  <Plus className="h-4 w-4" />
                  Add Session
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            {upcomingSessions.length > 0 && (
              <Card className="mb-6 border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <AlertTriangle className="h-5 w-5" />
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {upcomingSessions.map(session => (
                      <div key={session.id} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                        <Checkbox
                          checked={session.completed}
                          onCheckedChange={() => toggleSessionComplete(session.id)}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{getSubjectName(session.subjectId)}</p>
                          <p className="text-sm text-muted-foreground">{session.topic}</p>
                        </div>
                        <Badge variant="outline">{session.duration}min</Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(session.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Study Schedule
                </CardTitle>
                <CardDescription>
                  {studySessions.length} sessions planned
                </CardDescription>
              </CardHeader>
              <CardContent>
                {studySessions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No study sessions yet</p>
                    <p className="text-sm">Select your subjects and generate a schedule, or add sessions manually</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {studySessions.map(session => {
                      const level = getSubjectLevel(session.subjectId);
                      return (
                        <div 
                          key={session.id} 
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-colors",
                            session.completed ? "bg-muted/50 opacity-60" : "bg-muted/30 hover:bg-muted/50"
                          )}
                        >
                          <Checkbox
                            checked={session.completed}
                            onCheckedChange={() => toggleSessionComplete(session.id)}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={cn("font-medium truncate", session.completed && "line-through")}>
                                {getSubjectName(session.subjectId)}
                              </p>
                              {level && (
                                <Badge variant={level === 'HL' ? 'default' : 'secondary'} className="text-xs">
                                  {level}
                                </Badge>
                              )}
                            </div>
                            {session.topic && (
                              <p className="text-sm text-muted-foreground truncate">{session.topic}</p>
                            )}
                          </div>
                          <Badge variant="outline">{session.duration}min</Badge>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSession(session.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
