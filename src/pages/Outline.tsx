import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { getOutlineTemplate, OutlineSection } from "@/data/outlineTemplates";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DraggableOutlineSections } from "@/components/ui/draggable-outline-sections";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BlockNoteEditor } from "@/components/editors";
import { ArrowLeft, ArrowRight, Loader2, GripVertical, Lightbulb, ChevronLeft, ChevronRight, Search, X, Settings, FileText, List } from "lucide-react";
import { toast } from "sonner";
import { useAutoSave } from "@/hooks/use-auto-save";
import { NotesSearchDialog } from "@/components/editor/NotesSearchDialog";

// Use OutlineSection from outlineTemplates instead of local interface
type Section = OutlineSection;

interface PlanData {
  thesis?: string;
  constraints?: string;
  sections?: Array<{ id: string; title: string; notes: string }>;
}

export default function Outline() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const { flags } = useFeatureFlags();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [assignment, setAssignment] = useState<any>(null);
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notesSearchOpen, setNotesSearchOpen] = useState(false);
  const [activeSectionForNotes, setActiveSectionForNotes] = useState<string | null>(null);
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(() => {
    const saved = localStorage.getItem('outline-left-panel-collapsed');
    return saved === 'true';
  });
  const [leftPanelWidth, setLeftPanelWidth] = useState(() => {
    const saved = localStorage.getItem('outline-left-panel-width');
    return saved ? parseInt(saved) : 320;
  });
  // Editor mode: 'structured' for draggable sections, 'blocknote' for free-form block editor
  const [editorMode, setEditorMode] = useState<'structured' | 'blocknote'>(() => {
    const saved = localStorage.getItem('outline-editor-mode');
    return (saved === 'blocknote' ? 'blocknote' : 'structured') as 'structured' | 'blocknote';
  });
  const [blockNoteContent, setBlockNoteContent] = useState<string>(() => {
    const saved = localStorage.getItem(`outline_blocknote_${id}`);
    return saved || '';
  });
  const [blockNoteEditor, setBlockNoteEditor] = useState<any>(null);
  // Initialize with default essay template - will be updated when assignment loads
  const [sections, setSections] = useState<Section[]>(() => getOutlineTemplate('essay'));

  useEffect(() => {
    if (authLoading) return;

    loadAssignment();

    // Subscribe to plan changes for real-time updates
    const planSubscription = supabase
      .channel(`plan-changes-${id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'plans',
          filter: `assignment_id=eq.${id}`
        },
        async (payload) => {
          console.log('Plan changed:', payload);
          // Reload plan data when it changes
          const { data: planData } = await supabase
            .from("plans")
            .select("*")
            .eq("assignment_id", id)
            .single();

          if (planData) {
            setPlan({
              thesis: planData.thesis || undefined,
              constraints: planData.constraints || undefined,
              sections: planData.sections as any || undefined,
            });
          }
        }
      )
      .subscribe();

    return () => {
      planSubscription.unsubscribe();
    };
  }, [user, authLoading, id, navigate]);

  // Persist panel collapse state
  useEffect(() => {
    localStorage.setItem('outline-left-panel-collapsed', leftPanelCollapsed.toString());
  }, [leftPanelCollapsed]);

  // Persist panel width
  useEffect(() => {
    localStorage.setItem('outline-left-panel-width', leftPanelWidth.toString());
  }, [leftPanelWidth]);

  // Persist editor mode
  useEffect(() => {
    localStorage.setItem('outline-editor-mode', editorMode);
  }, [editorMode]);

  // Save block note content when it changes
  useEffect(() => {
    if (blockNoteContent && editorMode === 'blocknote') {
      localStorage.setItem(`outline_blocknote_${id}`, blockNoteContent);
    }
  }, [blockNoteContent, id, editorMode]);

  // Check if this is a ghost assignment
  const isGhostAssignment = id?.startsWith('ghost_');

  const loadAssignment = async () => {
    try {
      // Handle ghost assignments
      if (isGhostAssignment) {
        const savedAssignments = localStorage.getItem('tooessay_ghost_assignments');
        if (savedAssignments) {
          const assignments = JSON.parse(savedAssignments);
          const ghostAssignment = assignments.find((a: any) => a.id === id);
          if (ghostAssignment) {
            setAssignment(ghostAssignment);
            
            // Get the appropriate template based on task_type
            const taskType = ghostAssignment.task_type || 'essay';
            const template = getOutlineTemplate(taskType);
            
            // Load plan from localStorage
            const savedPlan = localStorage.getItem(`plan_${id}`);
            if (savedPlan) {
              const planData = JSON.parse(savedPlan);
              setPlan({
                thesis: planData.thesis || undefined,
                constraints: planData.constraints || undefined,
                sections: planData.sections || undefined,
              });
            }
            // Load outline sections from localStorage
            const savedOutline = localStorage.getItem(`outline_${id}`);
            if (savedOutline) {
              setSections(JSON.parse(savedOutline));
            } else {
              // Use template based on task_type, optionally populate thesis or use plan sections
              const planData = savedPlan ? JSON.parse(savedPlan) : null;
              if (planData?.sections && Array.isArray(planData.sections) && planData.sections.length > 0) {
                // Use plan sections as initial outline
                const planSections = planData.sections as Array<{ id: string; title: string; notes: string }>;
                setSections(planSections.map((section, index) => ({
                  id: section.id || String(index + 1),
                  title: section.title || "Untitled Section",
                  bullets: section.notes ? [section.notes] : [""],
                  order: index,
                })));
              } else if (planData?.thesis) {
                setSections(template.map(section => 
                  section.title === "Introduction" 
                    ? { ...section, bullets: [planData.thesis || "", ...section.bullets.slice(1)] }
                    : section
                ));
              } else {
                setSections(template);
              }
            }
          }
        }
        setLoading(false);
        return;
      }

      const { data: assignmentData, error: assignmentError } = await supabase
        .from("assignments")
        .select("*")
        .eq("id", id)
        .single();

      if (assignmentError) throw assignmentError;
      setAssignment(assignmentData);
      
      // Get the appropriate template based on task_type
      const taskType = assignmentData.task_type || 'essay';
      const template = getOutlineTemplate(taskType);

      // Load plan data
      const { data: planData } = await supabase
        .from("plans")
        .select("*")
        .eq("assignment_id", id)
        .maybeSingle();

      if (planData) {
        setPlan({
          thesis: planData.thesis || undefined,
          constraints: planData.constraints || undefined,
          sections: planData.sections as any || undefined,
        });
      }

      // Load existing outline if any
      const { data: outlineData } = await supabase
        .from("outlines")
        .select("*")
        .eq("assignment_id", id)
        .maybeSingle();

      if (outlineData && outlineData.sections) {
        setSections(outlineData.sections as any);
      } else if (planData?.sections && Array.isArray(planData.sections) && planData.sections.length > 0) {
        // Use plan sections as initial outline if no outline exists
        const planSections = planData.sections as Array<{ id: string; title: string; notes: string }>;
        setSections(planSections.map((section, index) => ({
          id: section.id || String(index + 1),
          title: section.title || "Untitled Section",
          bullets: section.notes ? [section.notes] : [""],
          order: index,
        })));
      } else {
        // Use template based on task_type, optionally populate thesis
        if (planData?.thesis) {
          setSections(template.map(section => 
            section.title === "Introduction" 
              ? { ...section, bullets: [planData.thesis || "", ...section.bullets.slice(1)] }
              : section
          ));
        } else {
          setSections(template);
        }
      }
    } catch (error: any) {
      toast.error("Failed to load assignment");
    } finally {
      setLoading(false);
    }
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, title } : s));
  };

  const updateBullet = (sectionId: string, bulletIndex: number, value: string) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        const newBullets = [...s.bullets];
        newBullets[bulletIndex] = value;
        return { ...s, bullets: newBullets };
      }
      return s;
    }));
  };

  const addBullet = (sectionId: string) => {
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, bullets: [...s.bullets, ""] } : s
    ));
  };

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: "New Section",
      bullets: [""],
      order: sections.length,
    };
    setSections([...sections, newSection]);
  };

  const deleteSection = (sectionId: string) => {
    if (sections.length <= 1) return; // Keep at least one section
    setSections(sections.filter(s => s.id !== sectionId));
  };

  const deleteBullet = (sectionId: string, bulletIndex: number) => {
    setSections(sections.map(s => {
      if (s.id === sectionId && s.bullets.length > 1) {
        const newBullets = s.bullets.filter((_, idx) => idx !== bulletIndex);
        return { ...s, bullets: newBullets };
      }
      return s;
    }));
  };

  // Handle inserting text from notes search into the active section
  const handleInsertFromNotes = (text: string) => {
    if (activeSectionForNotes) {
      // Add the text as a new bullet in the active section
      setSections(sections.map(s => {
        if (s.id === activeSectionForNotes) {
          return { ...s, bullets: [...s.bullets, text] };
        }
        return s;
      }));
      toast.success("Added to outline!");
    } else {
      // If no section is active, add to the first section
      setSections(sections.map((s, index) => {
        if (index === 0) {
          return { ...s, bullets: [...s.bullets, text] };
        }
        return s;
      }));
      toast.success("Added to outline!");
    }
    setNotesSearchOpen(false);
  };

  const handleSectionUpdate = (id: string, field: string, value: any) => {
    if (id === 'reorder' && field === 'sections') {
      // Handle section reordering
      setSections(value);
    } else if (field === 'title') {
      updateSectionTitle(id, value);
    } else if (field === 'bullets') {
      // Handle bullet updates
      setSections(sections.map(s => s.id === id ? { ...s, bullets: value } : s));
    } else if (field === 'bullet') {
      updateBullet(id, value.index, value.value);
    }
  };

  const saveOutline = async () => {
    // For ghost assignments, save to localStorage
    if (isGhostAssignment) {
      localStorage.setItem(`outline_${id}`, JSON.stringify(sections));
      return;
    }
    
    // For authenticated users, save to Supabase
    try {
      const { data: existingOutline } = await supabase
        .from("outlines")
        .select("id")
        .eq("assignment_id", id)
        .single();

      if (existingOutline) {
        await supabase
          .from("outlines")
          .update({ sections: sections as any })
          .eq("id", existingOutline.id);
      } else {
        await supabase.from("outlines").insert([{
          assignment_id: id,
          sections: sections as any,
        }]);
      }
    } catch (error: any) {
      throw error;
    }
  };

  const { debouncedSave } = useAutoSave({
    onSave: saveOutline,
    delay: 2000,
  });

  // Trigger auto-save when sections change
  useEffect(() => {
    if (sections.length > 0 && !loading) {
      debouncedSave();
    }
  }, [sections, debouncedSave, loading]);

  const handleSave = async () => {
    try {
      await saveOutline();

      if (!isGhostAssignment) {
        await supabase
          .from("assignments")
          .update({ status: "draft" as any })
          .eq("id", id);
      } else {
        // Update ghost assignment status
        const savedAssignments = localStorage.getItem('tooessay_ghost_assignments');
        if (savedAssignments) {
          const assignments = JSON.parse(savedAssignments);
          const updated = assignments.map((a: any) => 
            a.id === id ? { ...a, status: "draft" } : a
          );
          localStorage.setItem('tooessay_ghost_assignments', JSON.stringify(updated));
        }
      }

      window.gtag?.('event', 'save_outline', {
        assignment_id: id
      });

      toast.success("Outline saved!");
      navigate(`/work/assignment/${id}/draft`);
    } catch (error: any) {
      toast.error("Failed to save outline");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className={`container mx-auto ${isMobile ? 'px-3 py-2' : 'px-6 py-4'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <BackButton
                fallbackPath={`/work/assignment/${id}/plan`}
                size="sm"
                tooltip="Back to Plan"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8 -ml-1" onClick={() => navigate('/work')}>
                <X className="h-4 w-4" />
              </Button>
              <div className="min-w-0">
                <h1 className={`${isMobile ? 'text-base' : 'text-xl'} font-bold truncate`}>{assignment?.title}</h1>
                {!isMobile && <p className="text-sm text-muted-foreground">Outline & Flow</p>}
              </div>
            </div>
            
            {/* Settings Button */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  {!isMobile && "Settings"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Outline Settings</h4>
                  
                  {/* Panel Toggle */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-plan-panel" className="text-sm flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Show Plan Panel
                    </Label>
                    <Switch
                      id="show-plan-panel"
                      checked={!leftPanelCollapsed}
                      onCheckedChange={(checked) => setLeftPanelCollapsed(!checked)}
                    />
                  </div>
                  
                  {/* Editor Mode Toggle */}
                  <div className="space-y-2">
                    <Label className="text-sm">Editor Mode</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={editorMode === 'structured' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start gap-2"
                        onClick={() => setEditorMode('structured')}
                      >
                        <List className="h-4 w-4" />
                        Structured
                      </Button>
                      <Button
                        variant={editorMode === 'blocknote' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start gap-2"
                        onClick={() => setEditorMode('blocknote')}
                      >
                        <FileText className="h-4 w-4" />
                        Free-form
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {editorMode === 'structured' 
                        ? "Drag and drop sections with bullet points" 
                        : "Free-form block editor like the draft page"}
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className={`flex ${isMobile ? 'flex-col' : ''} h-[calc(100vh-73px)]`}>
        {/* Collapsible Sidebar - Plan Reference (hidden on mobile) */}
        {!isMobile && !leftPanelCollapsed && (
          <aside 
            className="border-r bg-card/30 backdrop-blur-sm overflow-y-auto transition-all resize-x"
            style={{ 
              width: `${leftPanelWidth}px`,
              minWidth: '200px',
              maxWidth: '600px'
            }}
            onMouseUp={(e) => {
              const width = (e.target as HTMLElement).offsetWidth;
              if (width >= 200) {
                setLeftPanelWidth(width);
              }
            }}
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Your Plan
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setLeftPanelCollapsed(true)}
                  title="Hide Your Plan"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>

            {plan ? (
              <div className="space-y-6">
                {plan.thesis && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Thesis
                    </h3>
                    <p className="text-sm p-3 rounded-lg bg-primary/10 border border-primary/20">
                      {plan.thesis}
                    </p>
                  </div>
                )}

                {plan.constraints && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Constraints
                    </h3>
                    <p className="text-sm p-3 rounded-lg bg-muted/50 border">
                      {plan.constraints}
                    </p>
                  </div>
                )}

                {plan.sections && plan.sections.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Plan Sections
                    </h3>
                    {plan.sections.map((section: any) => (
                      <Card key={section.id} className="border-2">
                        <CardContent className="p-3 space-y-2">
                          <h4 className="font-semibold text-sm">{section.title || "Untitled Section"}</h4>
                          {section.notes && (
                            <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                              {section.notes}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No plan created yet</p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2"
                  onClick={() => navigate(`/work/assignment/${id}/plan`)}
                >
                  Go to Plan Builder
                </Button>
              </div>
              )}
            </div>
          </aside>
        )}

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto relative">
          {/* Toggle button for collapsed left panel (desktop only) */}
          {!isMobile && leftPanelCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4 z-10 h-8 w-8 bg-card/80 backdrop-blur-sm border shadow-sm"
              onClick={() => setLeftPanelCollapsed(false)}
              title="Show Your Plan"
            >
              <Lightbulb className="h-4 w-4" />
            </Button>
          )}

          <div className={`container max-w-4xl mx-auto ${isMobile ? 'p-3' : 'p-6'} space-y-6`}>
            {editorMode === 'structured' ? (
              <Card className="shadow-medium">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                      {flags.draggableBullets && <GripVertical className="h-4 w-4 text-muted-foreground" />}
                      Build Your Structure
                    </CardTitle>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setNotesSearchOpen(true)}
                          className="gap-2"
                        >
                          <Search className="h-4 w-4" />
                          {!isMobile && "Search Notes"}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Search your notes to add content to your outline</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <DraggableOutlineSections
                    sections={sections}
                    onUpdateSection={handleSectionUpdate}
                    onAddBullet={addBullet}
                    onAddSection={addSection}
                    onDeleteSection={deleteSection}
                    onDeleteBullet={deleteBullet}
                    enabled={flags.draggableBullets}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-medium">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      Free-form Outline
                    </CardTitle>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setNotesSearchOpen(true)}
                          className="gap-2"
                        >
                          <Search className="h-4 w-4" />
                          {!isMobile && "Search Notes"}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Search your notes to add content to your outline</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent className="min-h-[400px]">
                  <BlockNoteEditor
                    initialContent={blockNoteContent}
                    onChange={setBlockNoteContent}
                    onEditorReady={setBlockNoteEditor}
                    placeholder="Start writing your outline freely..."
                  />
                </CardContent>
              </Card>
            )}

            <div className={`flex ${isMobile ? 'flex-col' : ''} gap-3 pb-6`}>
              {!isMobile && (
                <Button variant="outline" onClick={() => navigate(`/work/assignment/${id}/plan`)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Plan
                </Button>
              )}
              <Button variant="outline" onClick={() => navigate("/work")} className={isMobile ? '' : 'flex-1'}>
                Exit
              </Button>
              <Button onClick={handleSave} className={isMobile ? '' : 'flex-1'}>
                Continue to Draft
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Notes Search Dialog */}
      <NotesSearchDialog
        open={notesSearchOpen}
        onOpenChange={setNotesSearchOpen}
        onInsertText={handleInsertFromNotes}
      />
    </div>
  );
}
