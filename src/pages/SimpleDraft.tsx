import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Save, Loader2, FileDown, Share2, CloudOff, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, ArrowLeftRight, FileText } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { getTemplateForAssignment } from "@/utils/structureTemplates";

export default function SimpleDraft() {
  const { id } = useParams();
  const { user } = useAuth();
  const { getGhostAssignment, updateGhostAssignment, isGhostMode } = useGhostSession();
  const navigate = useNavigate();
  
  const [assignment, setAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Untitled Document");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  const isGhostAssignment = id?.startsWith('ghost_');

  // Check user preference for rich editor and redirect if needed
  useEffect(() => {
    const preferSimpleEditor = localStorage.getItem('tooessay-prefer-simple-editor') === 'true';
    if (!preferSimpleEditor && id && location.pathname.includes('/simple-draft')) {
      navigate(`/work/assignment/${id}/draft`, { replace: true });
    }
  }, [id, navigate]);

  useEffect(() => {
    loadAssignment();
  }, [id, user]);

  const loadAssignment = async () => {
    if (!id) return;

    setLoading(true);
    try {
      if (isGhostAssignment) {
        const ghostData = getGhostAssignment(id);
        if (ghostData) {
          setAssignment(ghostData);
          setTitle(ghostData.title || "Untitled Document");
          // If no draft content, use template based on subject/task type
          let draftContent = ghostData.draft?.content || "";
          if (!draftContent && ghostData.subject && ghostData.task_type) {
            draftContent = getTemplateForAssignment(ghostData.subject, ghostData.task_type);
          }
          setContent(draftContent);
        }
      } else if (user) {
        // First get the assignment
        const { data: assignmentData, error: assignmentError } = await supabase
          .from('assignments')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (assignmentError) throw assignmentError;
        if (assignmentData) {
          setAssignment(assignmentData);
          setTitle(assignmentData.title || "Untitled Document");
          
          // Then get the draft content
          const { data: draftData } = await supabase
            .from('drafts')
            .select('content')
            .eq('assignment_id', id)
            .is('deleted_at', null)
            .maybeSingle();
          
          let draftContent = draftData?.content || "";
          if (!draftContent && assignmentData.subject && assignmentData.task_type) {
            draftContent = getTemplateForAssignment(assignmentData.subject, assignmentData.task_type);
          }
          setContent(draftContent);
        }
      }
    } catch (error) {
      console.error('Error loading assignment:', error);
      toast.error('Failed to load document');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    if (!id) return;
    
    setSaving(true);
    try {
      const html = editorRef.current?.innerHTML || "";
      
      if (isGhostAssignment) {
        updateGhostAssignment(id, { 
          draft: { content: html },
          updated_at: new Date().toISOString()
        });
        toast.success('Saved locally');
      } else if (user) {
        // Save to drafts table
        const { error } = await supabase
          .from('drafts')
          .upsert({ 
            assignment_id: id,
            content: html,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'assignment_id'
          });

        if (error) throw error;
        toast.success('Saved to cloud');
      }
      
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleInput = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      saveContent();
    }, 2000);
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertPageBreak = () => {
    const pageBreak = document.createElement('div');
    pageBreak.className = 'page-break';
    pageBreak.contentEditable = 'false';
    pageBreak.innerHTML = '<hr style="border: 1px dashed #cbd5e1; margin: 0;" />';
    
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.insertNode(pageBreak);
      range.setStartAfter(pageBreak);
      range.setEndAfter(pageBreak);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    editorRef.current?.focus();
  };

  const downloadAsText = () => {
    const text = editorRef.current?.innerText || "";
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded as text file');
  };

  useEffect(() => {
    if (editorRef.current && content && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content, loading]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <div className="border-b bg-card px-4 py-3">
        <div className="flex items-center gap-4">
          <BackButton variant="ghost" size="icon" fallbackPath="/work" />
          
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={saveContent}
              className="text-lg font-medium bg-transparent border-none outline-none w-full max-w-md"
              placeholder="Untitled Document"
            />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {isGhostMode && !user && (
                <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                  <CloudOff className="h-3 w-3" />
                  Not saved to cloud
                </span>
              )}
              {lastSaved && (
                <span>
                  Last saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
              {saving && (
                <span className="flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Saving...
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (id) {
                      navigate(`/work/assignment/${id}/draft`);
                    }
                  }}
                  className="gap-2"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                  <span className="hidden sm:inline">Rich Editor</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Switch to BlockNote rich text editor</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={saveContent}
                  disabled={saving}
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save now</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={downloadAsText}
                >
                  <FileDown className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download as text</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toast.info('Share feature coming soon')}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand('bold')}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand('italic')}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand('underline')}
            className="h-8 w-8 p-0"
          >
            <Underline className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-2" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyLeft')}
            className="h-8 w-8 p-0"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyCenter')}
            className="h-8 w-8 p-0"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyRight')}
            className="h-8 w-8 p-0"
          >
            <AlignRight className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-2" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand('insertUnorderedList')}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand('insertOrderedList')}
            className="h-8 w-8 p-0"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-2" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={insertPageBreak}
                className="h-8 w-8 p-0"
              >
                <FileText className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert page break</TooltipContent>
          </Tooltip>

          <div className="w-px h-6 bg-border mx-2" />

          <select
            onChange={(e) => execCommand('fontSize', e.target.value)}
            className="h-8 px-2 text-sm border rounded bg-background"
          >
            <option value="3">Normal</option>
            <option value="1">Small</option>
            <option value="4">Medium</option>
            <option value="5">Large</option>
            <option value="6">Extra Large</option>
          </select>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto bg-muted/20">
        <div className="max-w-5xl mx-auto py-12 px-4">
          {/* Paper-like page with margins and shadow */}
          <div className="bg-white dark:bg-card shadow-lg mx-auto" style={{ 
            width: '8.5in',
            minHeight: '14in',
            padding: '1in',
            boxShadow: '0 0 0.5cm rgba(0,0,0,0.1)'
          }}>
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              className={cn(
                "min-h-[12in] outline-none",
                "prose prose-sm sm:prose lg:prose-lg",
                "dark:prose-invert max-w-none",
                "focus:outline-none",
                "[&:empty]:before:content-['Start_typing...'] [&:empty]:before:text-muted-foreground/50"
              )}
              style={{
                lineHeight: '1.6',
                fontSize: '12pt',
                fontFamily: 'Arial, sans-serif',
              }}
            />
          </div>
          
          {/* Page break styling */}
          <style>{`
            .page-break {
              page-break-after: always;
              break-after: page;
              margin: 2rem 0;
              pointer-events: none;
            }
            
            @media print {
              .page-break {
                page-break-after: always;
                break-after: page;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
