import { r as reactExports, j as jsxRuntimeExports, $ as LoaderCircle, a0 as CloudOff, bz as ArrowLeftRight, aN as Save, bA as FileDown, bB as Share2, aT as Bold, aU as Italic, aV as Underline, bb as AlignLeft, bc as AlignCenter, bd as AlignRight, b1 as List, b2 as ListOrdered, ax as FileText } from './vendor-react-BeQHm2Hb.js';
import { u as useAuth, b as useGhostSession, s as supabase, T as Tooltip, c as TooltipTrigger, B as Button, d as TooltipContent, i as cn } from './index-C9tyh6tO.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { g as getTemplateForAssignment } from './structureTemplates-BsE3hUWM.js';
import { c as useParams, u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
import './vendor-react-dom-b1tP6waW.js';
import './vendor-export-COR0N_gy.js';
import './vendor-blocknote-BAmltmDn.js';
import './vendor-prosemirror-l_ukq4jw.js';
import './vendor-yjs-BarRwqAh.js';
import './vendor-tiptap-tuOT8GNt.js';
import './vendor-mantine-CpjnkULY.js';
import './vendor-utils-B8uxCDj6.js';
import './vendor-radix-BjF_gpzx.js';
import './vendor-i18n-BRT6rIp6.js';
import './vendor-datefns-Cgc6WLhj.js';
import './vendor-syncfusion-B9hbBizT.js';
import './vendor-ketcher-B9jnF8te.js';
import './vendor-supabase-B1aOSilF.js';
import './data-ia-DxRN8XI2.js';

function SimpleDraft() {
  const { id } = useParams();
  const { user } = useAuth();
  const { getGhostAssignment, updateGhostAssignment, isGhostMode } = useGhostSession();
  const navigate = useNavigate();
  const [assignment, setAssignment] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [content, setContent] = reactExports.useState("");
  const [title, setTitle] = reactExports.useState("Untitled Document");
  const [saving, setSaving] = reactExports.useState(false);
  const [lastSaved, setLastSaved] = reactExports.useState(null);
  const editorRef = reactExports.useRef(null);
  const saveTimeoutRef = reactExports.useRef();
  const isGhostAssignment = id?.startsWith("ghost_");
  reactExports.useEffect(() => {
    const preferSimpleEditor = localStorage.getItem("tooessay-prefer-simple-editor") === "true";
    if (!preferSimpleEditor && id && location.pathname.includes("/simple-draft")) {
      navigate(`/work/assignment/${id}/draft`, { replace: true });
    }
  }, [id, navigate]);
  reactExports.useEffect(() => {
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
          let draftContent = ghostData.draft?.content || "";
          if (!draftContent && ghostData.subject && ghostData.task_type) {
            draftContent = getTemplateForAssignment(ghostData.subject, ghostData.task_type);
          }
          setContent(draftContent);
        }
      } else if (user) {
        const { data: assignmentData, error: assignmentError } = await supabase.from("assignments").select("*").eq("id", id).eq("user_id", user.id).single();
        if (assignmentError) throw assignmentError;
        if (assignmentData) {
          setAssignment(assignmentData);
          setTitle(assignmentData.title || "Untitled Document");
          const { data: draftData } = await supabase.from("drafts").select("content").eq("assignment_id", id).is("deleted_at", null).maybeSingle();
          let draftContent = draftData?.content || "";
          if (!draftContent && assignmentData.subject && assignmentData.task_type) {
            draftContent = getTemplateForAssignment(assignmentData.subject, assignmentData.task_type);
          }
          setContent(draftContent);
        }
      }
    } catch (error) {
      console.error("Error loading assignment:", error);
      ue.error("Failed to load document");
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
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        });
        ue.success("Saved locally");
      } else if (user) {
        const { error } = await supabase.from("drafts").upsert({
          assignment_id: id,
          content: html,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }, {
          onConflict: "assignment_id"
        });
        if (error) throw error;
        ue.success("Saved to cloud");
      }
      setLastSaved(/* @__PURE__ */ new Date());
    } catch (error) {
      console.error("Error saving:", error);
      ue.error("Failed to save");
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
    }, 2e3);
  };
  const execCommand = (command, value) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };
  const insertPageBreak = () => {
    const pageBreak = document.createElement("div");
    pageBreak.className = "page-break";
    pageBreak.contentEditable = "false";
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
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    ue.success("Downloaded as text file");
  };
  reactExports.useEffect(() => {
    if (editorRef.current && content && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content, loading]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b bg-card px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { variant: "ghost", size: "icon", fallbackPath: "/work" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            onBlur: saveContent,
            className: "text-lg font-medium bg-transparent border-none outline-none w-full max-w-md",
            placeholder: "Untitled Document"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          isGhostMode && !user && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-orange-600 dark:text-orange-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CloudOff, { className: "h-3 w-3" }),
            "Not saved to cloud"
          ] }),
          lastSaved && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Last saved ",
            lastSaved.toLocaleTimeString()
          ] }),
          saving && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }),
            "Saving..."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => {
                if (id) {
                  navigate(`/work/assignment/${id}/draft`);
                }
              },
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Rich Editor" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Switch to BlockNote rich text editor" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: saveContent,
              disabled: saving,
              children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Save now" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: downloadAsText,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Download as text" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => ue.info("Share feature coming soon"),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Share" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b bg-muted/30 px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => execCommand("bold"),
          className: "h-8 w-8 p-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => execCommand("italic"),
          className: "h-8 w-8 p-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => execCommand("underline"),
          className: "h-8 w-8 p-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Underline, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-6 bg-border mx-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => execCommand("justifyLeft"),
          className: "h-8 w-8 p-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlignLeft, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => execCommand("justifyCenter"),
          className: "h-8 w-8 p-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlignCenter, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => execCommand("justifyRight"),
          className: "h-8 w-8 p-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlignRight, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-6 bg-border mx-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => execCommand("insertUnorderedList"),
          className: "h-8 w-8 p-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => execCommand("insertOrderedList"),
          className: "h-8 w-8 p-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-6 bg-border mx-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: insertPageBreak,
            className: "h-8 w-8 p-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Insert page break" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-6 bg-border mx-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          onChange: (e) => execCommand("fontSize", e.target.value),
          className: "h-8 px-2 text-sm border rounded bg-background",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "3", children: "Normal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "Small" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "4", children: "Medium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "5", children: "Large" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "6", children: "Extra Large" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto py-12 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white dark:bg-card shadow-lg mx-auto", style: {
        width: "8.5in",
        minHeight: "14in",
        padding: "1in",
        boxShadow: "0 0 0.5cm rgba(0,0,0,0.1)"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: editorRef,
          contentEditable: true,
          onInput: handleInput,
          className: cn(
            "min-h-[12in] outline-none",
            "prose prose-sm sm:prose lg:prose-lg",
            "dark:prose-invert max-w-none",
            "focus:outline-none",
            "[&:empty]:before:content-['Start_typing...'] [&:empty]:before:text-muted-foreground/50"
          ),
          style: {
            lineHeight: "1.6",
            fontSize: "12pt",
            fontFamily: "Arial, sans-serif"
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
          ` })
    ] }) })
  ] });
}

export { SimpleDraft as default };
