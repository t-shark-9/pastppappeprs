import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsIBUser } from "@/hooks/use-is-ib-user";
import { getTemplateForAssignment, getOutlineSectionsFromStructure, generateDraftFromOutline } from "@/utils/structureTemplates";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { BlockNoteEditor } from "@/components/editors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2, Sparkles, Lightbulb, FileDown, FileUp, ChevronLeft, ChevronRight, MessageSquare, ClipboardCheck, Trash2, Share2, CloudOff, FileText, List, Settings, X } from "lucide-react";
import { toast } from "sonner";
import { useAutoSave } from "@/hooks/use-auto-save";
import { useDraftComments } from "@/hooks/use-draft-comments";
import { PanelSelector, PanelType, getPanelTitle, getPanelIcon } from "@/components/editor/PanelSelector";
import { CommentsPanel } from "@/components/editor/CommentsPanel";
import { GradingCriteriaPanel } from "@/components/editor/GradingCriteriaPanel";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ImportToBlockNoteModal } from "@/components/editor/ImportToBlockNoteModal";
import { ExportDropdown } from "@/components/editor/ExportDropdown";
import { Block } from "@blocknote/core";
// Collaboration features removed
import { FixedEditorToolbar } from "@/components/editor/FixedEditorToolbar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SettingsModal } from "@/components/ui/settings-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Layout, Type, Check, ChevronDown } from "lucide-react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface Evaluation {
  overallScore: number;
  criteriaGrades?: Array<{
    criterion: string;
    earnedMarks: number;
    maxMarks: number;
    justification: string;
    improvements: string;
  }>;
  strengths: string[];
  improvements: Array<{
    criterion: string;
    issue: string;
    suggestion: string;
    priority: "high" | "medium" | "low";
  }>;
  nextSteps: string[];
}

interface CoachingResponse {
  questions: string[];
  thesisPattern: string;
  evidenceChecklist: string[];
}

export default function Draft() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const { getGhostAssignment, updateGhostAssignment, isGhostMode, isGhostLoading } = useGhostSession();
  const { flags } = useFeatureFlags();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isIBUser } = useIsIBUser();

  // Determine if this is a ghost assignment
  const isGhostAssignment = useMemo(() => {
    return id?.startsWith('ghost_') || false;
  }, [id]);

  const ghostAssignment = useMemo(() => {
    if (isGhostAssignment && id) {
      return getGhostAssignment(id);
    }
    return null;
  }, [isGhostAssignment, id, getGhostAssignment]);

  const [assignment, setAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [planNotes, setPlanNotes] = useState<CoachingResponse | null>(null);
  const [outlineSections, setOutlineSections] = useState<any[]>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [blockNoteEditor, setBlockNoteEditor] = useState<any>(null);
  const [tableOfContents, setTableOfContents] = useState<Array<{ id: string; level: number; text: string }>>([]);
  const [pageCount, setPageCount] = useState(1);
  const [leftPanelType, setLeftPanelType] = useState<PanelType>(() => {
    const saved = localStorage.getItem('draft-left-panel-type');
    if (saved === 'null' || saved === null) return 'outline'; // Default to outline
    return saved as PanelType;
  });
  const [rightPanelType, setRightPanelType] = useState<PanelType>(() => {
    const saved = localStorage.getItem('draft-right-panel-type');
    if (saved === 'null' || saved === null) return 'feedback'; // Default to feedback
    return saved as PanelType;
  });
  const [lastLeftPanel, setLastLeftPanel] = useState<PanelType>(() => {
    const saved = localStorage.getItem('draft-last-left-panel');
    return (saved as PanelType) || 'outline';
  });
  const [lastRightPanel, setLastRightPanel] = useState<PanelType>(() => {
    const saved = localStorage.getItem('draft-last-right-panel');
    return (saved as PanelType) || 'feedback';
  });
  const [leftPanelSize, setLeftPanelSize] = useState(() => {
    const saved = localStorage.getItem('draft-left-panel-size');
    return saved ? parseFloat(saved) : 20;
  });
  const [rightPanelSize, setRightPanelSize] = useState(() => {
    const saved = localStorage.getItem('draft-right-panel-size');
    return saved ? parseFloat(saved) : 20;
  });
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  // Editor type is now fixed to blocknote (removed editor switcher)
  const editorType = 'blocknote';
  const hasContentBeenSaved = useRef(false);
  const contentRef = useRef("");
  const [draftId, setDraftId] = useState<string | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [highlightBlockId, setHighlightBlockId] = useState<string | null>(null);
  const [aiCommandHandlers, setAICommandHandlers] = useState<{
    define: (text: string) => Promise<void>;
    explain: (text: string) => Promise<void>;
    synonym: (text: string) => Promise<void>;
    rephrase: (text: string) => Promise<void>;
    grammar: (text: string) => Promise<void>;
  } | null>(null);

  // Collaboration hook - only enabled when we have a draft ID
  // Collaboration disabled
  const ydoc = null;
  const provider = null;
  const isConnected = false;
  const activeUsers: any[] = [];
  const collaborators: any[] = [];
  const isOwner = true;
  const canEdit = true;

  // Comments hook
  const { addComment } = useDraftComments({ draftId });

  // Handle selection change from editor
  const handleSelectionChange = (blockId: string | null, text: string | null) => {
    setSelectedBlockId(blockId);
    setSelectedText(text);
  };

  // Handle block highlight from comments panel
  const handleHighlightBlock = (blockId: string) => {
    setHighlightBlockId(blockId);
    setTimeout(() => setHighlightBlockId(null), 2500);
  };

  // Get user color for collaboration
  const getUserColor = (userId: string): string => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // Track last selected panels
  useEffect(() => {
    if (leftPanelType !== null) {
      setLastLeftPanel(leftPanelType);
      localStorage.setItem('draft-last-left-panel', leftPanelType);
    }
  }, [leftPanelType]);

  useEffect(() => {
    if (rightPanelType !== null) {
      setLastRightPanel(rightPanelType);
      localStorage.setItem('draft-last-right-panel', rightPanelType);
    }
  }, [rightPanelType]);

  // Editor type is now fixed, no need to persist

  useEffect(() => {
    if (authLoading) return;
    // Wait for ghost data to be loaded from localStorage
    if (isGhostAssignment && isGhostLoading) return;
    
    // For ghost assignments, allow access without login
    if (isGhostAssignment) {
      if (ghostAssignment) {
        setAssignment({
          id: ghostAssignment.id,
          title: ghostAssignment.title,
          subject: ghostAssignment.subject,
          task_type: ghostAssignment.task_type,
          status: ghostAssignment.status,
        });
        setTitle(ghostAssignment.title);
        
        // Check if draft has been initialized from outline for this ghost assignment
        const initKey = `ghost-draft-initialized:${id}`;
        const alreadyInitialized = localStorage.getItem(initKey) === 'true';
        
        // If ghost assignment has existing draft content, use it
        let draftContent = ghostAssignment.draft?.content || "";
        
        // Check localStorage for outline sections and populate draft if not initialized
        const savedOutline = localStorage.getItem(`outline_${id}`);
        
        if (savedOutline && (!draftContent || !alreadyInitialized)) {
          try {
            const sections = JSON.parse(savedOutline) as Array<{ title: string; bullets: string[] }>;
            if (sections && sections.length > 0) {
              // Generate draft from outline sections with title page, bibliography, and tables
              draftContent = generateDraftFromOutline(sections, {
                title: ghostAssignment.title,
                subject: ghostAssignment.subject,
                taskType: ghostAssignment.task_type,
                includeTitlePage: true,
                includeBibliography: true,
                includeTablesForIA: true,
              });
              setOutlineSections(sections);
              // Mark as initialized so we don't overwrite user changes
              localStorage.setItem(initKey, 'true');
            }
          } catch (e) {
            console.error("Failed to parse ghost outline:", e);
          }
        } else if (!draftContent) {
          // Fallback to structure template if no outline exists
          if (ghostAssignment.subject && ghostAssignment.task_type) {
            draftContent = getTemplateForAssignment(
              ghostAssignment.subject,
              ghostAssignment.task_type
            );
            
            // Also set outline sections from structure
            const templateSections = getOutlineSectionsFromStructure(
              ghostAssignment.subject,
              ghostAssignment.task_type
            );
            if (templateSections.length > 0) {
              setOutlineSections(templateSections);
            }
          }
        } else if (savedOutline) {
          // Still load outline sections for sidebar display even if draft exists
          try {
            const sections = JSON.parse(savedOutline) as Array<{ title: string; bullets: string[] }>;
            if (sections && sections.length > 0) {
              setOutlineSections(sections);
            }
          } catch (e) {
            console.error("Failed to parse ghost outline for sidebar:", e);
          }
        }
        
        setContent(draftContent);
        setLoading(false);
      } else {
        // Ghost assignment not found, redirect to dashboard
        navigate("/work");
      }
      return;
    }

    // For real assignments, require login
    if (!user) {
      navigate("/auth");
      return;
    }

    loadData();

    // Subscribe to outline changes for real-time updates
    const outlineSubscription = supabase
      .channel(`outline-changes-${id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'outlines',
          filter: `assignment_id=eq.${id}`
        },
        async (payload) => {
          console.log('Outline changed:', payload);
          // Reload outline sections when they change
          const { data: outlineData } = await supabase
            .from("outlines")
            .select("sections")
            .eq("assignment_id", id)
            .maybeSingle();

          if (outlineData?.sections) {
            setOutlineSections(Array.isArray(outlineData.sections) ? outlineData.sections : []);
          }
        }
      )
      .subscribe();

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
          // Reload plan notes when they change
          const { data: planData } = await supabase
            .from("plans")
            .select("coaching_response")
            .eq("assignment_id", id)
            .maybeSingle();

          if (planData?.coaching_response) {
            setPlanNotes(planData.coaching_response as unknown as CoachingResponse);
          }
        }
      )
      .subscribe();

    return () => {
      outlineSubscription.unsubscribe();
      planSubscription.unsubscribe();
    };
  }, [user, authLoading, id, navigate, isGhostAssignment, ghostAssignment, isGhostLoading]);

  // Functions to remove outline items
  const removeOutlineSection = async (sectionIndex: number) => {
    const newSections = outlineSections.filter((_, i) => i !== sectionIndex);
    setOutlineSections(newSections);
    
    // Update database
    await supabase
      .from("outlines")
      .update({ sections: newSections })
      .eq("assignment_id", id);
  };

  const removeOutlineBullet = async (sectionIndex: number, bulletIndex: number) => {
    const newSections = outlineSections.map((section, i) => {
      if (i === sectionIndex) {
        return {
          ...section,
          bullets: section.bullets.filter((_: string, j: number) => j !== bulletIndex)
        };
      }
      return section;
    });
    setOutlineSections(newSections);
    
    // Update database
    await supabase
      .from("outlines")
      .update({ sections: newSections })
      .eq("assignment_id", id);
  };

  // Functions to remove plan items
  const removePlanQuestion = async (questionIndex: number) => {
    if (!planNotes) return;
    const newPlanNotes = {
      ...planNotes,
      questions: planNotes.questions.filter((_, i) => i !== questionIndex)
    };
    setPlanNotes(newPlanNotes);
    
    // Update database
    await supabase
      .from("plans")
      .update({ coaching_response: newPlanNotes })
      .eq("assignment_id", id);
  };

  const removeEvidenceItem = async (itemIndex: number) => {
    if (!planNotes) return;
    const newPlanNotes = {
      ...planNotes,
      evidenceChecklist: planNotes.evidenceChecklist.filter((_, i) => i !== itemIndex)
    };
    setPlanNotes(newPlanNotes);
    
    // Update database
    await supabase
      .from("plans")
      .update({ coaching_response: newPlanNotes })
      .eq("assignment_id", id);
  };

  // Track content changes
  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  // Persist panel type states
  useEffect(() => {
    localStorage.setItem('draft-left-panel-type', leftPanelType === null ? 'null' : leftPanelType);
  }, [leftPanelType]);

  useEffect(() => {
    localStorage.setItem('draft-right-panel-type', rightPanelType === null ? 'null' : rightPanelType);
  }, [rightPanelType]);

  // Persist panel sizes
  useEffect(() => {
    localStorage.setItem('draft-left-panel-size', leftPanelSize.toString());
  }, [leftPanelSize]);

  useEffect(() => {
    localStorage.setItem('draft-right-panel-size', rightPanelSize.toString());
  }, [rightPanelSize]);

  // Cleanup ghost assignment on unmount if no content was saved (only for real assignments)
  useEffect(() => {
    if (isGhostAssignment) return; // Don't cleanup ghost assignments this way
    
    return () => {
      // Only delete if we never saved content and the content is empty
      if (!hasContentBeenSaved.current && !contentRef.current.trim() && id) {
        // Delete the ghost assignment
        supabase
          .from("assignments")
          .delete()
          .eq("id", id)
          .then(({ error }) => {
            if (error) console.error("Failed to cleanup ghost assignment:", error);
          });
      }
    };
  }, [id, isGhostAssignment]);

  const loadData = async () => {
    try {
      const { data: assignmentData, error: assignmentError } = await supabase
        .from("assignments")
        .select("*")
        .eq("id", id)
        .single();

      if (assignmentError) throw assignmentError;
      setAssignment(assignmentData);
      setTitle(assignmentData.title);

      // Load existing draft (exclude deleted)
      const { data: draftData } = await supabase
        .from("drafts")
        .select("*")
        .eq("assignment_id", id)
        .is("deleted_at", null)
        .maybeSingle();

      if (draftData) {
        setDraftId(draftData.id);

        const existingContent = draftData.content || "";
        if (existingContent.trim()) {
          setContent(existingContent);
          hasContentBeenSaved.current = true;
        } else {
          // If the draft exists but is empty, initialize it once with outline-based template
          // (prevents re-inserting templates if user later deletes everything)
          const initKey = `draft-template-initialized:${draftData.id}`;
          const alreadyInitialized = localStorage.getItem(initKey) === 'true';

          if (!alreadyInitialized) {
            let templateContent = '';
            
            // Try to load and use outline sections
            try {
              const { data: outlineData } = await supabase
                .from("outlines")
                .select("sections")
                .eq("assignment_id", id)
                .maybeSingle();
              
              if (outlineData?.sections && Array.isArray(outlineData.sections) && outlineData.sections.length > 0) {
                const sections = outlineData.sections as unknown as Array<{ title: string; bullets: string[] }>;
                templateContent = generateDraftFromOutline(sections, {
                  title: assignmentData.title,
                  subject: assignmentData.subject,
                  taskType: assignmentData.task_type,
                  includeTitlePage: true,
                  includeBibliography: true,
                  includeTablesForIA: true,
                });
                setOutlineSections(sections);
              } else {
                templateContent = getTemplateForAssignment(
                  assignmentData.subject,
                  assignmentData.task_type
                );
              }
            } catch {
              templateContent = getTemplateForAssignment(
                assignmentData.subject,
                assignmentData.task_type
              );
            }

            if (templateContent) {
              await supabase
                .from("drafts")
                .update({ content: templateContent })
                .eq("id", draftData.id);

              localStorage.setItem(initKey, 'true');
              setContent(templateContent);
              hasContentBeenSaved.current = true;
            } else {
              setContent(existingContent);
            }
          } else {
            setContent(existingContent);
          }
        }
      } else {
        // Create a new draft if none exists
        // First, try to load outline sections and generate from them
        let templateContent = '';
        
        try {
          const { data: outlineData } = await supabase
            .from("outlines")
            .select("sections")
            .eq("assignment_id", id)
            .maybeSingle();
          
          if (outlineData?.sections && Array.isArray(outlineData.sections) && outlineData.sections.length > 0) {
            // Cast sections to expected type
            const sections = outlineData.sections as unknown as Array<{ title: string; bullets: string[] }>;
            
            // Generate draft from user's outline
            templateContent = generateDraftFromOutline(sections, {
              title: assignmentData.title,
              subject: assignmentData.subject,
              taskType: assignmentData.task_type,
              includeTitlePage: true,
              includeBibliography: true,
              includeTablesForIA: true,
            });
            setOutlineSections(sections);
          } else {
            // Fall back to structure template
            templateContent = getTemplateForAssignment(
              assignmentData.subject,
              assignmentData.task_type
            );
            
            // Also set outline sections from structure for sidebar display
            const templateSections = getOutlineSectionsFromStructure(
              assignmentData.subject,
              assignmentData.task_type
            );
            if (templateSections.length > 0) {
              setOutlineSections(templateSections);
            }
          }
        } catch {
          // Fall back to structure template if outline table doesn't exist
          templateContent = getTemplateForAssignment(
            assignmentData.subject,
            assignmentData.task_type
          );
        }
        
        const { data: newDraft, error: createError } = await supabase
          .from("drafts")
          .insert({
            assignment_id: id,
            content: templateContent,
          })
          .select()
          .single();
        
        if (!createError && newDraft) {
          setDraftId(newDraft.id);
          setContent(templateContent);
          if (templateContent) {
            localStorage.setItem(`draft-template-initialized:${newDraft.id}`, 'true');
            hasContentBeenSaved.current = true;
          }
        }
      }

      // Load plan notes (coaching response from planning phase)
      const { data: planData } = await supabase
        .from("plans")
        .select("coaching_response")
        .eq("assignment_id", id)
        .maybeSingle();

      if (planData?.coaching_response) {
        setPlanNotes(planData.coaching_response as unknown as CoachingResponse);
      }

      // Load outline sections - wrap in try-catch since table might not exist yet
      try {
        const { data: outlineData, error: outlineError } = await supabase
          .from("outlines")
          .select("sections")
          .eq("assignment_id", id)
          .maybeSingle();

        if (!outlineError && outlineData?.sections) {
          const sections = Array.isArray(outlineData.sections) ? outlineData.sections : [];
          setOutlineSections(sections);
        } else {
          // No outline exists or table doesn't exist - load structure template as outline sections
          const templateSections = getOutlineSectionsFromStructure(
            assignmentData.subject,
            assignmentData.task_type
          );
          
          if (templateSections.length > 0) {
            setOutlineSections(templateSections);
            
            // Try to save the template outline to database (might fail if table doesn't exist)
            try {
              await supabase
                .from("outlines")
                .upsert({
                  assignment_id: id,
                  sections: templateSections,
                });
            } catch {
              // Table might not exist yet, just continue with local state
              console.log('Could not save outline to database');
            }
          }
        }
      } catch (outlineLoadError) {
        // If outlines table doesn't exist, still load structure template
        const templateSections = getOutlineSectionsFromStructure(
          assignmentData.subject,
          assignmentData.task_type
        );
        if (templateSections.length > 0) {
          setOutlineSections(templateSections);
        }
      }
    } catch (error: any) {
      toast.error("Failed to load assignment");
    } finally {
      setLoading(false);
    }
  };

  const autoSaveDraft = async () => {
    // For ghost assignments, save to localStorage via context
    if (isGhostAssignment && id) {
      // Calculate word count from HTML content
      let wordCount = 0;
      try {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const text = tempDiv.textContent || tempDiv.innerText || '';
        wordCount = text.trim().split(/\s+/).filter((w: string) => w).length;
      } catch {
        wordCount = 0;
      }

      updateGhostAssignment(id, {
        title,
        draft: {
          content,
          word_count: wordCount,
        },
      });
      hasContentBeenSaved.current = true;
      return;
    }

    // For real assignments, save to Supabase
    try {
      // Calculate word count from HTML content
      let wordCount = 0;
      try {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const text = tempDiv.textContent || tempDiv.innerText || '';
        wordCount = text.trim().split(/\s+/).filter((w: string) => w).length;
      } catch {
        wordCount = 0;
      }

      const { data: existingDraft } = await supabase
        .from("drafts")
        .select("id")
        .eq("assignment_id", id)
        .maybeSingle();

      if (existingDraft) {
        await supabase
          .from("drafts")
          .update({
            content,
            word_count: wordCount,
          })
          .eq("id", existingDraft.id);
      } else {
        await supabase.from("drafts").insert([{
          assignment_id: id,
          content,
          word_count: wordCount,
        }]);
      }

      // Update assignment title if changed
      if (title !== assignment?.title) {
        await supabase
          .from("assignments")
          .update({ title })
          .eq("id", id);
        setAssignment({ ...assignment, title });
      }

      hasContentBeenSaved.current = true;
    } catch (error: any) {
      console.error("Auto-save failed:", error);
    }
  };

  const { debouncedSave } = useAutoSave({
    onSave: autoSaveDraft,
    delay: 2000,
  });

  // Trigger auto-save when content or title changes
  useEffect(() => {
    if ((content || title) && !loading) {
      debouncedSave();
    }
  }, [content, title, debouncedSave, loading]);

  // Extract TOC from BlockNote editor when content changes
  useEffect(() => {
    if (blockNoteEditor?.document) {
      const extractBlockNoteTOC = () => {
        try {
          const headings: Array<{ id: string; level: number; text: string }> = [];
          blockNoteEditor.document.forEach((block: any, index: number) => {
            if (block.type === 'heading') {
              const level = block.props?.level || 1;
              let text = '';
              if (block.content && Array.isArray(block.content)) {
                text = block.content
                  .map((item: any) => {
                    if (typeof item === 'string') return item;
                    if (item && typeof item === 'object' && 'text' in item) {
                      return item.text;
                    }
                    return '';
                  })
                  .join('')
                  .trim();
              }
              headings.push({
                id: block.id || `heading-${index}`,
                level,
                text: text || '(Untitled)',
              });
            }
          });
          setTableOfContents(headings);
        } catch (error) {
          console.error('Failed to extract BlockNote headings:', error);
        }
      };
      extractBlockNoteTOC();
      const interval = setInterval(extractBlockNoteTOC, 2000);
      return () => clearInterval(interval);
    }
  }, [blockNoteEditor, content]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await autoSaveDraft();

      // Only update assignment status in Supabase for real assignments
      if (!isGhostAssignment) {
        await supabase
          .from("assignments")
          .update({ status: "writing" as any })
          .eq("id", id);
      }

      window.gtag?.('event', 'save_draft', {
        assignment_id: id
      });

      toast.success(isGhostAssignment ? "Draft saved locally!" : "Draft saved!");
    } catch (error: any) {
      toast.error("Failed to save draft");
    } finally {
      setSaving(false);
    }
  };

  const handleEvaluate = async () => {
    if (!content.trim()) {
      toast.error("Please write some content first");
      return;
    }

    setIsEvaluating(true);

    try {
      // Extract text content from HTML for evaluation
      let textContent = "";
      try {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        textContent = tempDiv.textContent || tempDiv.innerText || '';
      } catch {
        textContent = content;
      }

      // Get grading criteria for this subject
      const iaCriteriaData = await import('@/data/iaCriteriaData');
      const SUBJECT_KEY_MAP: Record<string, string> = {
        'biology': 'biology',
        'chemistry': 'chemistry',
        'physics': 'physics',
        'business_management': 'businessManagement',
        'economics': 'economics',
        'history': 'history',
        'geography': 'geography',
        'psychology': 'psychology',
        'sehs': 'sehs',
        'math_aa': 'mathAA',
        'math_ai': 'mathAI',
        'lang_a_lang_lit': 'languageALangLit',
        'lang_a_literature': 'languageALangLit',
        'english_b': 'languageB',
        'french_b': 'languageB',
        'german_b': 'languageB',
        'spanish_b': 'languageB',
        'italian_b': 'languageB',
        'japanese_b': 'languageB',
        'mandarin_b': 'languageB',
        'other_b': 'languageB',
        'visual_arts': 'visualArts',
        'computer_science': 'computerScience',
      };

      let gradingCriteria = null;
      if (assignment.subject && assignment.task_type === 'ia') {
        const subjectKey = SUBJECT_KEY_MAP[assignment.subject];
        if (subjectKey) {
          const criteriaData = iaCriteriaData.default[subjectKey as keyof typeof iaCriteriaData.default];
          if (criteriaData) {
            gradingCriteria = criteriaData.criteria.map(c => ({
              name: c.name,
              maxMarks: c.maxMarks,
              levels: c.levels.map(l => `${l.marks}: ${l.descriptor}`)
            }));
          }
        }
      }

      const { data, error } = await supabase.functions.invoke("evaluate-draft", {
        body: {
          content: textContent.trim(),
          subject: assignment.subject,
          taskType: assignment.task_type,
          schoolProgram: user?.user_metadata?.school_program || (isGhostAssignment ? ghostAssignment?.schoolProgram : undefined),
          rubric: [],
          gradingCriteria: gradingCriteria, // Include grading criteria
        },
      });

      if (error) throw error;
      setEvaluation(data);
      toast.success("Evaluation complete!");
    } catch (error: any) {
      console.error("Evaluation error:", error);
      toast.error(error.message || "Failed to evaluate draft");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleImportBlocks = (blocks: Block[]) => {
    if (blockNoteEditor && blocks.length > 0) {
      // Insert blocks at the end of the document
      blockNoteEditor.insertBlocks(blocks, blockNoteEditor.document[blockNoteEditor.document.length - 1]);
      toast.success("Content imported successfully!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="border-b bg-background shrink-0">
        <div className={`container max-w-full mx-auto ${isMobile ? 'px-3 py-2' : 'px-6 py-3'} flex items-center justify-between`}>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <BackButton
              fallbackPath={isGhostAssignment ? "/work" : `/work/assignment/${id}/outline`}
              size="sm"
            />
            <Button variant="ghost" size="icon" className="h-8 w-8 -ml-1" onClick={() => navigate('/work')}>
              <X className="h-4 w-4" />
            </Button>
            {!isMobile && <div className="h-4 w-px bg-border" />}
            {isGhostAssignment && !isMobile && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-destructive/10 rounded text-destructive text-xs font-medium">
                    <CloudOff className="h-3 w-3" />
                    <span>Guest Mode</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your work is saved locally. Sign in to keep it permanently.</p>
                </TooltipContent>
              </Tooltip>
            )}
            <input
              type="text"
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Document"
              className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium border-none outline-none bg-transparent flex-1 min-w-0 placeholder:text-muted-foreground/40`}
            />
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            {!isMobile && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEvaluate}
                  disabled={isEvaluating}
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Evaluating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Evaluate
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowImportModal(true)}
                >
                  <FileUp className="h-4 w-4 mr-2" />
                  Import
                </Button>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowSettingsModal(true)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
              </>
            )}
            <ExportDropdown
              blocks={blockNoteEditor?.document || []}
              title={title || "Untitled Document"}
              pageCount={pageCount}
              author={user?.email || "Student"}
            />

            {/* Collaboration UI removed */}

            {/* Save button hidden - auto-save handles saving */}
          </div>
        </div>
      </div>

      {/* Main content area - full width on mobile, resizable panels on desktop */}
      <div className="flex-1 overflow-hidden">
        {isMobile ? (
          /* Mobile: Full-width editor only - always use BlockNote for best mobile support */
          <div className="h-full overflow-y-auto">
            <div className="container max-w-full mx-auto px-3 py-4">
              <BlockNoteEditor
                initialContent={content}
                onChange={setContent}
                placeholder="Start writing your draft here... Type / for commands"
                onEditorReady={setBlockNoteEditor}
                onPageCountChange={setPageCount}
                onAICommandsReady={setAICommandHandlers}
                disablePagination={true}
                onSelectionChange={handleSelectionChange}
                highlightBlockId={highlightBlockId}
                userContext={{
                  schoolProgram: user?.user_metadata?.school_program || (isGhostAssignment ? ghostAssignment?.schoolProgram : undefined),
                  subject: assignment?.subject || (isGhostAssignment ? ghostAssignment?.subject : undefined),
                  taskType: assignment?.task_type || (isGhostAssignment ? ghostAssignment?.task_type : undefined)
                }}
                collaboration={ydoc && provider ? {
                  ydoc,
                  provider,
                  user: user ? {
                    name: user.email?.split('@')[0] || 'Anonymous',
                    color: getUserColor(user.id),
                  } : undefined,
                } : undefined}
              />
            </div>
          </div>
        ) : (
          /* Desktop: Resizable three-column layout */
          <ResizablePanelGroup direction="horizontal">
          {/* Left Panel (when open and enabled in settings) */}
          {flags.showLeftPanel && leftPanelType !== null && (
            <>
              <ResizablePanel 
                defaultSize={leftPanelSize} 
                minSize={15} 
                maxSize={35}
                onResize={(size) => {
                  setLeftPanelSize(size);
                }}
              >
                <div className="h-full overflow-y-auto bg-muted/30 border-r">
                  <div className="p-4">
                    {/* Panel Selector Row */}
                    <div className="mb-3 pb-3 border-b">
                      <PanelSelector 
                        activePanel={leftPanelType} 
                        onPanelChange={setLeftPanelType} 
                        side="left"
                        showGrading={isIBUser}
                      />
                    </div>
                    
                    {/* Panel Content */}
                    {leftPanelType === 'outline' && (
                      <>
                        {!planNotes && outlineSections.length === 0 ? (
                          tableOfContents.length > 0 ? (
                            <div className="space-y-4">
                              <Card>
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm">Table of Contents</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-1">
                                    {tableOfContents.map((heading, index) => (
                                      <button
                                        key={`${heading.id}-${index}`}
                                        className="w-full text-left px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-sm"
                                        style={{
                                          paddingLeft: `${(heading.level - 1) * 12 + 12}px`,
                                        }}
                                        onClick={() => {
                                          if (blockNoteEditor && heading.id) {
                                            // Scroll to the heading in BlockNote editor
                                            const element = document.querySelector(`[data-id="${heading.id}"]`);
                                            if (element) {
                                              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }
                                          }
                                        }}
                                      >
                                        <span className={`block truncate ${
                                          heading.level === 1 ? 'font-semibold' : 
                                          heading.level === 2 ? 'font-medium' : 
                                          'font-normal text-muted-foreground'
                                        }`}>
                                          {heading.text || '(Untitled)'}
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          ) : (
                            <div className="text-center py-12 text-muted-foreground">
                              <List className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">No planning notes yet</p>
                              <p className="text-xs mt-1">Add headings to create a table of contents</p>
                            </div>
                          )
                        ) : (
                          <div className="space-y-4">
                            {outlineSections.length > 0 && (
                              <Card>
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm">Planned Sections</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <ul className="space-y-3">
                                    {outlineSections.map((section: any, i: number) => (
                                      <li key={i} className="text-sm group/section">
                                        <div className="font-medium text-foreground mb-1 flex items-center justify-between">
                                          <span>{section.title || `Section ${i + 1}`}</span>
                                          <button
                                            onClick={() => removeOutlineSection(i)}
                                            className="opacity-0 group-hover/section:opacity-100 p-1 hover:bg-destructive/10 rounded transition-opacity"
                                            title="Remove section"
                                          >
                                            <Trash2 className="h-3 w-3 text-destructive" />
                                          </button>
                                        </div>
                                        {section.bullets && section.bullets.length > 0 && (
                                          <ul className="mt-1 pl-3 space-y-1">
                                            {section.bullets.map((point: string, j: number) => (
                                              <li key={j} className="text-xs text-muted-foreground flex items-start gap-1 group/bullet">
                                                <span className="text-primary mt-0.5">•</span>
                                                <span className="flex-1">{point}</span>
                                                <button
                                                  onClick={() => removeOutlineBullet(i, j)}
                                                  className="opacity-0 group-hover/bullet:opacity-100 p-0.5 hover:bg-destructive/10 rounded transition-opacity flex-shrink-0"
                                                  title="Remove bullet"
                                                >
                                                  <Trash2 className="h-2.5 w-2.5 text-destructive" />
                                                </button>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                              </Card>
                            )}

                            {planNotes && (
                              <>
                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Clarifying Questions</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <ul className="space-y-2">
                                      {planNotes.questions.map((question, i) => (
                                        <li key={i} className="text-sm p-2 rounded bg-accent/10 border border-accent/20 flex items-start gap-2 group">
                                          <span className="flex-1">{question}</span>
                                          <button
                                            onClick={() => removePlanQuestion(i)}
                                            className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-destructive/10 rounded transition-opacity flex-shrink-0"
                                            title="Remove question"
                                          >
                                            <Trash2 className="h-3 w-3 text-destructive" />
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Thesis Pattern</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-sm p-2 rounded bg-primary/10 border border-primary/20 italic">
                                      {planNotes.thesisPattern}
                                    </p>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Evidence Checklist</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <ul className="space-y-2">
                                      {planNotes.evidenceChecklist.map((item, i) => (
                                        <li key={i} className="text-sm flex items-start gap-2 group">
                                          <span className="text-success mt-0.5">✓</span>
                                          <span className="flex-1">{item}</span>
                                          <button
                                            onClick={() => removeEvidenceItem(i)}
                                            className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-destructive/10 rounded transition-opacity flex-shrink-0"
                                            title="Remove item"
                                          >
                                            <Trash2 className="h-3 w-3 text-destructive" />
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </CardContent>
                                </Card>
                              </>
                            )}
                          </div>
                        )}
                      </>
                    )}
                    
                    {leftPanelType === 'feedback' && (
                      <>
                        {!evaluation ? (
                          <div className="text-center py-12 text-muted-foreground">
                            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-sm">
                              Click "Evaluate" to receive feedback on your writing
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Card>
                              <CardContent className="pt-6">
                                <div className="text-center pb-4 border-b">
                                  <div className="text-4xl font-bold text-primary">{evaluation.overallScore}/7</div>
                                  <p className="text-sm text-muted-foreground mt-1">Overall Score</p>
                                </div>
                              </CardContent>
                            </Card>

                            {evaluation.criteriaGrades && evaluation.criteriaGrades.length > 0 && (
                              <Card>
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm">Grading Criteria Assessment</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    {evaluation.criteriaGrades.map((grade, i) => (
                                      <div key={i} className="p-3 rounded-lg border bg-card">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="font-medium text-sm">{grade.criterion}</span>
                                          <span className="text-lg font-bold text-primary">
                                            {grade.earnedMarks}/{grade.maxMarks}
                                          </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-2">{grade.justification}</p>
                                        {grade.improvements && (
                                          <p className="text-xs text-blue-600 dark:text-blue-400 italic">
                                            💡 {grade.improvements}
                                          </p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            )}

                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Strengths</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2">
                                  {evaluation.strengths.map((strength, i) => (
                                    <li key={i} className="text-sm p-2 rounded bg-success/10 border border-success/20">
                                      {strength}
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Areas for Improvement</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-3">
                                  {evaluation.improvements.map((item, i) => (
                                    <li key={i} className="text-sm p-2 rounded bg-accent/10 border border-accent/20">
                                      <div className="font-medium mb-1">{item.criterion}</div>
                                      <p className="text-muted-foreground mb-2 text-xs">{item.issue}</p>
                                      <p className="text-xs italic">{item.suggestion}</p>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Next Steps</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2">
                                  {evaluation.nextSteps.map((step, i) => (
                                    <li key={i} className="text-sm flex items-start gap-2">
                                      <span className="text-primary mt-0.5">{i + 1}.</span>
                                      <span>{step}</span>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </>
                    )}
                    
                    {leftPanelType === 'comments' && (
                      <CommentsPanel 
                        draftId={draftId || undefined}
                        selectedBlockId={selectedBlockId}
                        selectedText={selectedText}
                        onBlockSelect={setSelectedBlockId}
                        onHighlightBlock={handleHighlightBlock}
                      />
                    )}
                    
                    {leftPanelType === 'grading' && (
                      <GradingCriteriaPanel subject={assignment?.subject} taskType={assignment?.task_type} />
                    )}
                    
                    {leftPanelType === 'toc' && (
                      <div className="space-y-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm flex items-center gap-2">
                              <List className="h-4 w-4" />
                              Table of Contents
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {tableOfContents.length > 0 ? (
                              <div className="space-y-1">
                                {tableOfContents.map((heading, index) => (
                                  <button
                                    key={`${heading.id}-${index}`}
                                    className="w-full text-left px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-sm"
                                    style={{
                                      paddingLeft: `${(heading.level - 1) * 12 + 12}px`,
                                    }}
                                  >
                                    <span className={`block truncate ${
                                      heading.level === 1 ? 'font-semibold' : 
                                      heading.level === 2 ? 'font-medium' : 
                                      'font-normal text-muted-foreground'
                                    }`}>
                                      {heading.text || '(Untitled)'}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground">
                                <List className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No headings yet</p>
                                <p className="text-xs mt-1">Add headings to create a table of contents</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
            </>
          )}

          {/* Center Panel - Editor */}
          <ResizablePanel defaultSize={((!flags.showLeftPanel || leftPanelType === null) && (!flags.showRightPanel || rightPanelType === null)) ? 100 : 55} minSize={30}>
            <div className="h-full relative overflow-y-auto">
              {/* Toggle button for collapsed left panel */}
              {flags.showLeftPanel && leftPanelType === null && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 left-4 z-10 h-8 w-8 bg-card/80 backdrop-blur-sm border shadow-sm"
                  onClick={() => setLeftPanelType(lastLeftPanel)}
                  title={`Open ${getPanelTitle(lastLeftPanel)}`}
                >
                  {(() => {
                    const Icon = getPanelIcon(lastLeftPanel);
                    return Icon ? <Icon className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />;
                  })()}
                </Button>
              )}

              {/* Toggle button for collapsed right panel */}
              {flags.showRightPanel && rightPanelType === null && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 h-8 w-8 bg-card/80 backdrop-blur-sm border shadow-sm"
                  onClick={() => setRightPanelType(lastRightPanel)}
                  title={`Open ${getPanelTitle(lastRightPanel)}`}
                >
                  {(() => {
                    const Icon = getPanelIcon(lastRightPanel);
                    return Icon ? <Icon className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />;
                  })()}
                </Button>
              )}

              {/* Fixed Formatting Toolbar - only show for BlockNote editor */}
              {flags.showMenuHeader && blockNoteEditor && editorType === 'blocknote' && (
                <FixedEditorToolbar
                  editor={blockNoteEditor}
                  onAICommand={(command, selectedText) => {
                    if (!aiCommandHandlers) return;
                    switch (command) {
                      case 'define':
                        aiCommandHandlers.define(selectedText);
                        break;
                      case 'explain':
                        aiCommandHandlers.explain(selectedText);
                        break;
                      case 'synonym':
                        aiCommandHandlers.synonym(selectedText);
                        break;
                      case 'rephrase':
                        aiCommandHandlers.rephrase(selectedText);
                        break;
                      case 'grammar':
                        aiCommandHandlers.grammar(selectedText);
                        break;
                    }
                  }}
                />
              )}

              <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-4 py-8">
                  <div className="max-w-5xl mx-auto">
                    <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
                      {/* Render editor based on selected type */}
                      {editorType === 'blocknote' && (
                        <BlockNoteEditor
                          initialContent={content}
                          onChange={setContent}
                          placeholder="Start writing your draft here... Type / for commands"
                          onEditorReady={setBlockNoteEditor}
                          onPageCountChange={setPageCount}
                          onAICommandsReady={setAICommandHandlers}
                          disablePagination={true}
                          onSelectionChange={handleSelectionChange}
                          highlightBlockId={highlightBlockId}
                          userContext={{
                            schoolProgram: user?.user_metadata?.school_program || (isGhostAssignment ? ghostAssignment?.schoolProgram : undefined),
                            subject: assignment?.subject || (isGhostAssignment ? ghostAssignment?.subject : undefined),
                            taskType: assignment?.task_type || (isGhostAssignment ? ghostAssignment?.task_type : undefined)
                          }}
                          collaboration={ydoc && provider ? {
                            ydoc,
                            provider,
                            user: user ? {
                              name: user.email?.split('@')[0] || 'Anonymous',
                              color: getUserColor(user.id),
                            } : undefined,
                          } : undefined}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>

          {/* Right Panel (when open and enabled in settings) */}
          {flags.showRightPanel && rightPanelType !== null && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel 
                defaultSize={rightPanelSize} 
                minSize={15} 
                maxSize={35}
                onResize={(size) => {
                  setRightPanelSize(size);
                }}
              >
                <div className="h-full overflow-y-auto bg-muted/30 border-l">
                  <div className="p-4">
                    {/* Panel Selector Row */}
                    <div className="mb-3 pb-3 border-b">
                      <PanelSelector 
                        activePanel={rightPanelType} 
                        onPanelChange={setRightPanelType} 
                        side="right"
                        showGrading={isIBUser}
                      />
                    </div>
                    
                    {/* Panel Content */}
                    {rightPanelType === 'outline' && (
                      <>
                        {!planNotes && outlineSections.length === 0 ? (
                          <div className="text-center py-12 text-muted-foreground">
                            <p className="text-sm">
                              No planning notes available for this assignment
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {outlineSections.length > 0 && (
                              <Card>
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm">Planned Sections</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <ul className="space-y-3">
                                    {outlineSections.map((section: any, i: number) => (
                                      <li key={i} className="text-sm group/section">
                                        <div className="font-medium text-foreground mb-1 flex items-center justify-between">
                                          <span>{section.title || `Section ${i + 1}`}</span>
                                          <button
                                            onClick={() => removeOutlineSection(i)}
                                            className="opacity-0 group-hover/section:opacity-100 p-1 hover:bg-destructive/10 rounded transition-opacity"
                                            title="Remove section"
                                          >
                                            <Trash2 className="h-3 w-3 text-destructive" />
                                          </button>
                                        </div>
                                        {section.bullets && section.bullets.length > 0 && (
                                          <ul className="mt-1 pl-3 space-y-1">
                                            {section.bullets.map((point: string, j: number) => (
                                              <li key={j} className="text-xs text-muted-foreground flex items-start gap-1 group/bullet">
                                                <span className="text-primary mt-0.5">•</span>
                                                <span className="flex-1">{point}</span>
                                                <button
                                                  onClick={() => removeOutlineBullet(i, j)}
                                                  className="opacity-0 group-hover/bullet:opacity-100 p-0.5 hover:bg-destructive/10 rounded transition-opacity flex-shrink-0"
                                                  title="Remove bullet"
                                                >
                                                  <Trash2 className="h-2.5 w-2.5 text-destructive" />
                                                </button>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                              </Card>
                            )}

                            {planNotes && (
                              <>
                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Clarifying Questions</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <ul className="space-y-2">
                                      {planNotes.questions.map((question, i) => (
                                        <li key={i} className="text-sm p-2 rounded bg-accent/10 border border-accent/20 flex items-start gap-2 group">
                                          <span className="flex-1">{question}</span>
                                          <button
                                            onClick={() => removePlanQuestion(i)}
                                            className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-destructive/10 rounded transition-opacity flex-shrink-0"
                                            title="Remove question"
                                          >
                                            <Trash2 className="h-3 w-3 text-destructive" />
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Thesis Pattern</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-sm p-2 rounded bg-primary/10 border border-primary/20 italic">
                                      {planNotes.thesisPattern}
                                    </p>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Evidence Checklist</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <ul className="space-y-2">
                                      {planNotes.evidenceChecklist.map((item, i) => (
                                        <li key={i} className="text-sm flex items-start gap-2 group">
                                          <span className="text-success mt-0.5">✓</span>
                                          <span className="flex-1">{item}</span>
                                          <button
                                            onClick={() => removeEvidenceItem(i)}
                                            className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-destructive/10 rounded transition-opacity flex-shrink-0"
                                            title="Remove item"
                                          >
                                            <Trash2 className="h-3 w-3 text-destructive" />
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </CardContent>
                                </Card>
                              </>
                            )}
                          </div>
                        )}
                      </>
                    )}
                    
                    {rightPanelType === 'feedback' && (
                      <>
                        {!evaluation ? (
                          <div className="text-center py-12 text-muted-foreground">
                            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-sm">
                              Click "Evaluate" to receive feedback on your writing
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Card>
                              <CardContent className="pt-6">
                                <div className="text-center pb-4 border-b">
                                  <div className="text-4xl font-bold text-primary">{evaluation.overallScore}/7</div>
                                  <p className="text-sm text-muted-foreground mt-1">Overall Score</p>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Strengths</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2">
                                  {evaluation.strengths.map((strength, i) => (
                                    <li key={i} className="text-sm p-2 rounded bg-success/10 border border-success/20">
                                      {strength}
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Areas for Improvement</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-3">
                                  {evaluation.improvements.map((item, i) => (
                                    <li key={i} className="text-sm p-2 rounded bg-accent/10 border border-accent/20">
                                      <div className="font-medium mb-1">{item.criterion}</div>
                                      <p className="text-muted-foreground mb-2 text-xs">{item.issue}</p>
                                      <p className="text-xs italic">{item.suggestion}</p>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Next Steps</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2">
                                  {evaluation.nextSteps.map((step, i) => (
                                    <li key={i} className="text-sm flex items-start gap-2">
                                      <span className="text-primary mt-0.5">{i + 1}.</span>
                                      <span>{step}</span>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </>
                    )}
                    
                    {rightPanelType === 'comments' && (
                      <CommentsPanel 
                        draftId={draftId || undefined}
                        selectedBlockId={selectedBlockId}
                        selectedText={selectedText}
                        onBlockSelect={setSelectedBlockId}
                        onHighlightBlock={handleHighlightBlock}
                      />
                    )}
                    
                    {rightPanelType === 'grading' && (
                      <GradingCriteriaPanel subject={assignment?.subject} taskType={assignment?.task_type} />
                    )}
                    
                    {rightPanelType === 'toc' && (
                      <div className="space-y-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm flex items-center gap-2">
                              <List className="h-4 w-4" />
                              Table of Contents
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {tableOfContents.length > 0 ? (
                              <div className="space-y-1">
                                {tableOfContents.map((heading, index) => (
                                  <button
                                    key={`${heading.id}-${index}`}
                                    className="w-full text-left px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-sm"
                                    style={{
                                      paddingLeft: `${(heading.level - 1) * 12 + 12}px`,
                                    }}
                                  >
                                    <span className={`block truncate ${
                                      heading.level === 1 ? 'font-semibold' : 
                                      heading.level === 2 ? 'font-medium' : 
                                      'font-normal text-muted-foreground'
                                    }`}>
                                      {heading.text || '(Untitled)'}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground">
                                <List className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No headings yet</p>
                                <p className="text-xs mt-1">Add headings to create a table of contents</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
        )}
      </div>

      <ImportToBlockNoteModal
        open={showImportModal}
        onOpenChange={setShowImportModal}
        onInsert={handleImportBlocks}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </div>
  );
}
