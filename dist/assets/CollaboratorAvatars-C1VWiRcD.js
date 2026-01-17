import { r as reactExports, j as jsxRuntimeExports, bK as Root, bL as Fallback, bM as Image, bN as Panel, bO as PanelGroup, bP as PanelResizeHandle, ay as GripVertical, bQ as Se, Z as TriangleAlert, ax as FileText, bR as Upload, $ as LoaderCircle, br as CircleAlert, bJ as Eye, a9 as Check, bS as Copy, bA as FileDown, bt as Code, bB as Share2, bT as UserPlus, X, b8 as Pencil, bU as Crown } from './vendor-react-BeQHm2Hb.js';
import { i as cn, B as Button, D as DropdownMenu, f as DropdownMenuTrigger, g as DropdownMenuContent, h as DropdownMenuItem, s as supabase, k as TooltipProvider, T as Tooltip, c as TooltipTrigger, d as TooltipContent } from './index-C9tyh6tO.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogTrigger } from './dialog-BQ4GVXEh.js';
import { eJ as cva, eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { F as Ft } from './vendor-blocknote-BAmltmDn.js';
import { h as html2canvas, E, P as Paragraph, H as HeadingLevel, F as File, d as Packer, T as TextRun, A as AlignmentType, I as ImageRun } from './vendor-export-COR0N_gy.js';
import { k as katex } from './vendor-katex-LkNY165q.js';
import { B as Awareness, a as applyUpdate, E as mergeUpdates, e as encodeStateAsUpdate, D as Doc } from './vendor-yjs-BarRwqAh.js';
import { I as Input } from './input-2hnN3JAu.js';
import { L as Label } from './label-BfT9c56I.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-DtVQdYEt.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { S as ScrollArea } from './scroll-area-DHtqER3G.js';

const Avatar = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
    ...props
  }
));
Avatar.displayName = Root.displayName;
const AvatarImage = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { ref, className: cn("aspect-square h-full w-full", className), ...props }));
AvatarImage.displayName = Image.displayName;
const AvatarFallback = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Fallback,
  {
    ref,
    className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
    ...props
  }
));
AvatarFallback.displayName = Fallback.displayName;

const ResizablePanelGroup = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  PanelGroup,
  {
    className: cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className),
    ...props
  }
);
const ResizablePanel = Panel;
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  PanelResizeHandle,
  {
    className: cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    ),
    ...props,
    children: withHandle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-2.5 w-2.5" }) })
  }
);

function htmlToBlockNote(html) {
  if (!html || html.trim() === "") {
    return [{ type: "paragraph", content: [] }];
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks = [];
  const processInlineNodes = (node, currentStyles = {}) => {
    const result = [];
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (text) {
        result.push({
          type: "text",
          text,
          styles: Object.keys(currentStyles).length > 0 ? { ...currentStyles } : void 0
        });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node;
      const tagName = element.tagName.toLowerCase();
      const newStyles = { ...currentStyles };
      if (tagName === "strong" || tagName === "b") newStyles.bold = true;
      if (tagName === "em" || tagName === "i") newStyles.italic = true;
      if (tagName === "u") newStyles.underline = true;
      if (tagName === "s" || tagName === "strike" || tagName === "del") newStyles.strike = true;
      if (tagName === "code") newStyles.code = true;
      if (tagName === "a") {
        const href = element.getAttribute("href");
        if (href) {
          const linkText = element.textContent || "";
          result.push({
            type: "link",
            text: linkText,
            href,
            styles: Object.keys(newStyles).length > 0 ? { ...newStyles } : void 0
          });
          return result;
        }
      }
      Array.from(element.childNodes).forEach((child) => {
        result.push(...processInlineNodes(child, newStyles));
      });
    }
    return result;
  };
  const processList = (listElement, ordered) => {
    const items = [];
    Array.from(listElement.children).forEach((child) => {
      if (child.tagName.toLowerCase() === "li") {
        const content = processInlineNodes(child);
        const blockType = ordered ? "numberedListItem" : "bulletListItem";
        items.push({
          type: blockType,
          content: content.length > 0 ? content : [{ type: "text", text: "", styles: {} }]
        });
        const nestedLists = child.querySelectorAll("ul, ol");
        nestedLists.forEach((nestedList) => {
          const isOrdered = nestedList.tagName.toLowerCase() === "ol";
          items.push(...processList(nestedList, isOrdered));
        });
      }
    });
    return items;
  };
  const processTable = (tableElement) => {
    const rows = [];
    const tableRows = tableElement.querySelectorAll("tr");
    tableRows.forEach((tr) => {
      const cells = [];
      const tableCells = tr.querySelectorAll("td, th");
      tableCells.forEach((cell) => {
        cells.push(cell.textContent?.trim() || "");
      });
      if (cells.length > 0) {
        rows.push(cells);
      }
    });
    if (rows.length === 0) return null;
    return {
      type: "table",
      content: {
        type: "tableContent",
        rows: rows.map((row) => ({
          cells: row.map((cell) => [{ type: "text", text: cell, styles: {} }])
        }))
      }
    };
  };
  const processNode = (node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return [];
    }
    const element = node;
    const tagName = element.tagName.toLowerCase();
    const result = [];
    if (tagName === "span" && element.children.length > 0) {
      Array.from(element.childNodes).forEach((child) => {
        result.push(...processNode(child));
      });
      return result;
    }
    if (tagName === "h1" || tagName === "h2" || tagName === "h3") {
      const level = parseInt(tagName[1]);
      const content = processInlineNodes(element);
      result.push({
        type: "heading",
        props: { level },
        content: content.length > 0 ? content : [{ type: "text", text: "", styles: {} }]
      });
    } else if (tagName === "p") {
      const content = processInlineNodes(element);
      if (content.length > 0 && content.some((c) => c.text.trim())) {
        result.push({
          type: "paragraph",
          content
        });
      }
    } else if (tagName === "ul" || tagName === "ol") {
      const ordered = tagName === "ol";
      result.push(...processList(element, ordered));
    } else if (tagName === "img") {
      const src = element.getAttribute("src");
      const alt = element.getAttribute("alt") || "";
      if (src) {
        result.push({
          type: "image",
          props: {
            url: src,
            caption: alt
          }
        });
      }
    } else if (tagName === "pre") {
      const code = element.querySelector("code");
      const text = code ? code.textContent || "" : element.textContent || "";
      result.push({
        type: "codeBlock",
        props: {
          language: "plaintext"
        },
        content: [{ type: "text", text, styles: {} }]
      });
    } else if (tagName === "blockquote") {
      const content = processInlineNodes(element);
      result.push({
        type: "paragraph",
        content: content.length > 0 ? content : [{ type: "text", text: "", styles: {} }]
      });
    } else if (tagName === "hr") {
      result.push({
        type: "paragraph",
        content: [{ type: "text", text: "---", styles: {} }]
      });
    } else if (tagName === "table") {
      const tableBlock = processTable(element);
      if (tableBlock) {
        result.push(tableBlock);
      }
    } else if (["div", "section", "article", "main", "body"].includes(tagName)) {
      Array.from(element.childNodes).forEach((child) => {
        result.push(...processNode(child));
      });
    }
    return result;
  };
  Array.from(doc.body.childNodes).forEach((node) => {
    blocks.push(...processNode(node));
  });
  return blocks.length > 0 ? blocks : [{ type: "paragraph", content: [] }];
}
function validateHtmlFile(file) {
  const maxSize = 10 * 1024 * 1024;
  if (!file.name.toLowerCase().endsWith(".html")) {
    return { valid: false, error: "Please upload an .html file" };
  }
  if (file.size > maxSize) {
    return { valid: false, error: "This file exceeds the 10MB limit" };
  }
  return { valid: true };
}
async function readHtmlFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      resolve(content);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = reactExports.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, role: "alert", className: cn(alertVariants({ variant }), className), ...props }));
Alert.displayName = "Alert";
const AlertTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { ref, className: cn("mb-1 font-medium leading-none tracking-tight", className), ...props })
);
AlertTitle.displayName = "AlertTitle";
const AlertDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm [&_p]:leading-relaxed", className), ...props })
);
AlertDescription.displayName = "AlertDescription";

function ImportToBlockNoteModal({ open, onOpenChange, onInsert }) {
  const [file, setFile] = reactExports.useState(null);
  const [processing, setProcessing] = reactExports.useState(false);
  const [convertedBlocks, setConvertedBlocks] = reactExports.useState(null);
  const [showPreview, setShowPreview] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [copied, setCopied] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  const previewEditor = Se({
    initialContent: convertedBlocks || void 0
  });
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const fileName = selectedFile.name.toLowerCase();
    if (!fileName.endsWith(".html")) {
      setError("Please upload an HTML file");
      e.target.value = "";
      return;
    }
    const validation = validateHtmlFile(selectedFile);
    if (!validation.valid) {
      setError(validation.error || "Invalid file");
      e.target.value = "";
      return;
    }
    setFile(selectedFile);
    setError("");
    setShowPreview(false);
    setConvertedBlocks(null);
  };
  const handlePreview = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }
    setProcessing(true);
    setError("");
    setProgress("Reading HTML file...");
    try {
      const htmlContent = await readHtmlFile(file);
      setProgress("Converting to blocks...");
      const blocks = htmlToBlockNote(htmlContent);
      if (blocks.length === 0) {
        throw new Error("No content could be extracted from the file");
      }
      setConvertedBlocks(blocks);
      setShowPreview(true);
      setProgress("");
      ue.success("Preview generated!");
    } catch (err) {
      console.error("Conversion error:", err);
      setError(err instanceof Error ? err.message : "Failed to read the file. Try copying and pasting the content instead.");
      setProgress("");
    } finally {
      setProcessing(false);
    }
  };
  const handleInsert = () => {
    if (!convertedBlocks || convertedBlocks.length === 0) {
      ue.error("No content to insert. Please preview first.");
      return;
    }
    onInsert(convertedBlocks);
    ue.success("Content inserted into editor!");
    handleClear();
    onOpenChange(false);
  };
  const handleCopyJSON = async () => {
    if (!convertedBlocks || convertedBlocks.length === 0) {
      ue.error("No content to copy. Please preview first.");
      return;
    }
    try {
      const json = JSON.stringify(convertedBlocks, null, 2);
      await navigator.clipboard.writeText(json);
      setCopied(true);
      ue.success("JSON copied to clipboard!");
      setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      ue.error("Failed to copy JSON");
    }
  };
  const handleClear = () => {
    setFile(null);
    setConvertedBlocks(null);
    setShowPreview(false);
    setError("");
    setCopied(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "flex items-center gap-2", children: "Import to BlockNote" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Upload an HTML file to import its content into the editor." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-warning/10 border border-warning/30 rounded-lg p-3 flex items-start gap-2 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-warning flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-warning", children: "Experimental Feature" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "HTML import may not work perfectly for all files. If the import fails or looks incorrect, try copying and pasting the content directly into the editor instead." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto space-y-4 py-4", children: [
      !showPreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed rounded-lg p-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-12 w-12 mx-auto mb-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: ".html",
              onChange: handleFileChange,
              className: "hidden",
              id: "file-upload",
              disabled: processing
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "html-file-upload", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => fileInputRef.current?.click(),
              disabled: processing,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-2" }),
                "Upload File"
              ]
            }
          ) }),
          file && !processing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Selected file:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: file.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              (file.size / 1024).toFixed(2),
              " KB"
            ] })
          ] }),
          processing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 mx-auto mb-2 animate-spin text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: progress || "Converting HTML to blocks..." })
          ] })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground space-y-1 px-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Supported format:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc list-inside pl-2 space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "HTML files:" }),
            " Single HTML document (.html)"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mt-3", children: "Attempts to convert:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside pl-2 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Headings, paragraphs, lists (ordered and unordered)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Tables with basic structure" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Images (if accessible), code blocks, blockquotes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Inline formatting: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "bold" }),
              ", ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "italic" }),
              ", ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("u", { children: "underline" }),
              ", links"
            ] })
          ] })
        ] })
      ] }),
      showPreview && convertedBlocks && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-medium flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }),
            "Preview (",
            convertedBlocks.length,
            " blocks)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => {
                setShowPreview(false);
                setConvertedBlocks(null);
              },
              children: "Back to Upload"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-lg p-4 bg-muted/30 max-h-96 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Ft,
          {
            editor: previewEditor,
            theme: "light",
            editable: false
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "This is a preview of how your content will appear in the editor." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2 pt-4 border-t", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: handleClear,
          disabled: processing,
          size: "sm",
          children: "Clear"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: !showPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => onOpenChange(false),
            disabled: processing,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handlePreview,
            disabled: !file || processing,
            children: processing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
              "Converting..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 mr-2" }),
              "Preview"
            ] })
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: handleCopyJSON,
            disabled: !convertedBlocks,
            children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mr-2" }),
              "Copied!"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4 mr-2" }),
              "Copy JSON"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleInsert,
            disabled: !convertedBlocks,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-2" }),
              "Insert into Editor"
            ]
          }
        )
      ] }) })
    ] })
  ] }) });
}

async function exportToPDF(options) {
  const { title, blocks } = options;
  try {
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.width = "8.5in";
    tempContainer.style.backgroundColor = "white";
    tempContainer.style.fontFamily = "Times New Roman, Times, serif";
    tempContainer.style.fontSize = "12pt";
    tempContainer.style.lineHeight = "1.6";
    tempContainer.style.color = "black";
    tempContainer.style.padding = "1in";
    const contentHtml = await blocksToHTML$1(blocks);
    tempContainer.innerHTML = `
      <div style="font-size: 12pt; line-height: 1.6;">
        ${contentHtml}
      </div>
    `;
    document.body.appendChild(tempContainer);
    const canvas = await html2canvas(tempContainer, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: tempContainer.offsetWidth,
      height: tempContainer.offsetHeight,
      windowWidth: tempContainer.offsetWidth,
      windowHeight: tempContainer.offsetHeight
    });
    document.body.removeChild(tempContainer);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new E({
      orientation: "portrait",
      unit: "in",
      format: "letter"
    });
    const imgWidth = 8.5;
    const pageHeight = 11;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    const fileName = `${title.replace(/[^a-z0-9]/gi, "_")}_draft.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
}
async function blocksToHTML$1(blocks) {
  const html = [];
  for (const block of blocks) {
    html.push(await blockToHTML$1(block));
  }
  return html.join("");
}
async function blockToHTML$1(block) {
  const type = block.type;
  const content = block.content || [];
  switch (type) {
    case "heading":
      const level = block.props?.level || 1;
      const headingText = await contentToText(content);
      const headingSizes = {
        1: "20pt",
        2: "16pt",
        3: "14pt"
      };
      const fontSize = headingSizes[level] || "14pt";
      return `<h${level} style="margin-top: 1.2em; margin-bottom: 0.6em; font-weight: bold; font-size: ${fontSize};">${headingText}</h${level}>`;
    case "paragraph":
      const paragraphText = await contentToText(content);
      return `<p style="margin-bottom: 1em; font-size: 12pt;">${paragraphText || "<br/>"}</p>`;
    case "bulletListItem":
      const bulletText = await contentToText(content);
      return `<ul style="margin-left: 1.5em; margin-bottom: 0.5em; font-size: 12pt;"><li style="margin-bottom: 0.3em;">${bulletText}</li></ul>`;
    case "numberedListItem":
      const numberedText = await contentToText(content);
      return `<ol style="margin-left: 1.5em; margin-bottom: 0.5em; font-size: 12pt;"><li style="margin-bottom: 0.3em;">${numberedText}</li></ol>`;
    case "inlineMath":
    case "blockMath":
      const latex = block.props?.latex || "";
      const isBlock = type === "blockMath";
      try {
        const rendered = katex.renderToString(latex, {
          displayMode: isBlock,
          throwOnError: false,
          trust: true
        });
        if (isBlock) {
          return `<div style="text-align: center; margin: 1.2em 0; font-size: 14pt;">${rendered}</div>`;
        }
        return `<span style="font-size: 12pt;">${rendered}</span>`;
      } catch (error) {
        return `<span style="color: red; font-size: 12pt;">[Math Error: ${escapeHtml$1(latex)}]</span>`;
      }
    case "image":
      const src = block.props?.url || "";
      const caption = block.props?.caption || "";
      return `<figure style="margin: 1.5em 0; text-align: center;">
        <img src="${escapeHtml$1(src)}" style="max-width: 6in; max-height: 8in; width: auto; height: auto;" />
        ${caption ? `<figcaption style="font-size: 11pt; color: #666; margin-top: 0.5em;">${escapeHtml$1(caption)}</figcaption>` : ""}
      </figure>`;
    case "table":
      return `<table style="width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 11pt;">
        <tr><td style="border: 1px solid #ccc; padding: 0.5em;">[Table content]</td></tr>
      </table>`;
    default:
      const defaultText = await contentToText(content);
      return `<p style="font-size: 12pt;">${defaultText || ""}</p>`;
  }
}
async function contentToText(content) {
  if (!Array.isArray(content)) return "";
  return content.map((item) => {
    if (typeof item === "string") return escapeHtml$1(item);
    if (item.type === "text") {
      let text = escapeHtml$1(item.text || "");
      const styles = item.styles || {};
      if (styles.bold) text = `<strong>${text}</strong>`;
      if (styles.italic) text = `<em>${text}</em>`;
      if (styles.underline) text = `<u>${text}</u>`;
      if (styles.code) text = `<code style="background: #f4f4f4; padding: 0.2em 0.4em; border-radius: 3px; font-size: 11pt; font-family: 'Courier New', monospace;">${text}</code>`;
      return text;
    }
    return "";
  }).join("");
}
function escapeHtml$1(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

async function exportToDOCX(options) {
  const { title, blocks, author = "Student" } = options;
  try {
    const docParagraphs = [];
    docParagraphs.push(
      new Paragraph({
        text: title,
        heading: HeadingLevel.TITLE,
        spacing: { after: 200 }
      })
    );
    if (author) {
      docParagraphs.push(
        new Paragraph({
          text: `Author: ${author}`,
          spacing: { after: 100 }
        })
      );
    }
    docParagraphs.push(
      new Paragraph({
        text: `Generated: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`,
        spacing: { after: 400 }
      })
    );
    for (const block of blocks) {
      const converted = await blockToDOCX(block);
      docParagraphs.push(...converted);
    }
    const doc = new File({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1440,
              // 1 inch = 1440 twentieths of a point
              right: 1440,
              bottom: 1440,
              left: 1440
            }
          }
        },
        children: docParagraphs
      }]
    });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, "_")}_draft.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating DOCX:", error);
    throw new Error("Failed to generate DOCX. Please try again.");
  }
}
async function blockToDOCX(block) {
  const type = block.type;
  const content = block.content || [];
  switch (type) {
    case "heading":
      const level = block.props?.level || 1;
      const headingLevel = level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3;
      return [
        new Paragraph({
          text: contentToPlainText(content),
          heading: headingLevel,
          spacing: { before: 240, after: 120 }
        })
      ];
    case "paragraph":
      const paragraphRuns = await contentToTextRuns(content);
      return [
        new Paragraph({
          children: paragraphRuns.length > 0 ? paragraphRuns : [new TextRun("")],
          spacing: { after: 200 }
        })
      ];
    case "bulletListItem":
      const bulletRuns = await contentToTextRuns(content);
      return [
        new Paragraph({
          children: bulletRuns,
          bullet: { level: 0 },
          spacing: { after: 100 }
        })
      ];
    case "numberedListItem":
      const numberedRuns = await contentToTextRuns(content);
      return [
        new Paragraph({
          children: numberedRuns,
          numbering: { reference: "default-numbering", level: 0 },
          spacing: { after: 100 }
        })
      ];
    case "inlineMath":
    case "blockMath":
      const latex = block.props?.latex || "";
      const isBlock = type === "blockMath";
      try {
        const imageData = await mathToImage(latex, isBlock);
        return [
          new Paragraph({
            children: [
              new ImageRun({
                type: "png",
                data: imageData,
                transformation: {
                  width: isBlock ? 400 : 200,
                  height: isBlock ? 100 : 50
                }
              })
            ],
            alignment: isBlock ? AlignmentType.CENTER : AlignmentType.LEFT,
            spacing: { before: 120, after: 120 }
          })
        ];
      } catch (error) {
        return [
          new Paragraph({
            children: [new TextRun({ text: `[Math: ${latex}]`, color: "FF0000" })],
            spacing: { after: 100 }
          })
        ];
      }
    case "image":
      const src = block.props?.url || "";
      const caption = block.props?.caption || "";
      try {
        const imageData = await fetchImageAsBuffer(src);
        const paragraphs = [
          new Paragraph({
            children: [
              new ImageRun({
                type: "png",
                data: imageData,
                transformation: { width: 500, height: 300 }
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 }
          })
        ];
        if (caption) {
          paragraphs.push(
            new Paragraph({
              children: [new TextRun({ text: caption, italics: true, size: 20 })],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 }
            })
          );
        }
        return paragraphs;
      } catch (error) {
        return [
          new Paragraph({
            children: [new TextRun({ text: "[Image]", color: "999999" })],
            spacing: { after: 100 }
          })
        ];
      }
    default:
      const defaultRuns = await contentToTextRuns(content);
      return [
        new Paragraph({
          children: defaultRuns.length > 0 ? defaultRuns : [new TextRun("")],
          spacing: { after: 100 }
        })
      ];
  }
}
async function contentToTextRuns(content) {
  if (!Array.isArray(content)) return [];
  return content.map((item) => {
    if (typeof item === "string") return new TextRun(item);
    if (item.type === "text") {
      const text = item.text || "";
      const styles = item.styles || {};
      return new TextRun({
        text,
        bold: styles.bold || false,
        italics: styles.italic || false,
        underline: styles.underline ? {} : void 0,
        font: styles.code ? "Courier New" : void 0
      });
    }
    return new TextRun("");
  });
}
function contentToPlainText(content) {
  if (!Array.isArray(content)) return "";
  return content.map((item) => {
    if (typeof item === "string") return item;
    if (item.type === "text") return item.text || "";
    return "";
  }).join("");
}
async function mathToImage(latex, isBlock) {
  return new Promise((resolve, reject) => {
    try {
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.background = "white";
      container.style.padding = "10px";
      document.body.appendChild(container);
      const rendered = katex.renderToString(latex, {
        displayMode: isBlock,
        throwOnError: false,
        trust: true
      });
      container.innerHTML = rendered;
      const canvas = document.createElement("canvas");
      const scale = 2;
      canvas.width = container.offsetWidth * scale;
      canvas.height = container.offsetHeight * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        document.body.removeChild(container);
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.scale(scale, scale);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.font = "16px serif";
      ctx.fillText(latex, 10, 30);
      document.body.removeChild(container);
      canvas.toBlob((blob) => {
        if (blob) {
          blob.arrayBuffer().then((buffer) => {
            resolve(new Uint8Array(buffer));
          });
        } else {
          reject(new Error("Failed to convert canvas to blob"));
        }
      }, "image/png");
    } catch (error) {
      reject(error);
    }
  });
}
async function fetchImageAsBuffer(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  const buffer = await blob.arrayBuffer();
  return new Uint8Array(buffer);
}

function exportToHTML(options) {
  const { title, blocks, includeStyles = true } = options;
  try {
    const contentHtml = blocksToHTML(blocks);
    const htmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  ${includeStyles ? getStyles() : ""}
</head>
<body>
  <article class="document">
    <header class="document-header">
      <h1>${escapeHtml(title)}</h1>
      <p class="document-meta">Generated: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}</p>
    </header>
    <div class="document-content">
      ${contentHtml}
    </div>
  </article>
</body>
</html>`;
    const blob = new Blob([htmlDocument], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, "_")}_draft.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating HTML:", error);
    throw new Error("Failed to generate HTML. Please try again.");
  }
}
function blocksToHTML(blocks) {
  return blocks.map((block) => blockToHTML(block)).join("");
}
function blockToHTML(block) {
  const type = block.type;
  const content = block.content || [];
  switch (type) {
    case "heading":
      const level = block.props?.level || 1;
      const headingText = contentToHTML(content);
      return `<h${level}>${headingText}</h${level}>`;
    case "paragraph":
      const paragraphText = contentToHTML(content);
      return `<p>${paragraphText || "<br/>"}</p>`;
    case "bulletListItem":
      const bulletText = contentToHTML(content);
      return `<ul><li>${bulletText}</li></ul>`;
    case "numberedListItem":
      const numberedText = contentToHTML(content);
      return `<ol><li>${numberedText}</li></ol>`;
    case "inlineMath":
    case "blockMath":
      const latex = block.props?.latex || "";
      const isBlock = type === "blockMath";
      try {
        const rendered = katex.renderToString(latex, {
          displayMode: isBlock,
          throwOnError: false,
          trust: true
        });
        if (isBlock) {
          return `<div class="math-block">${rendered}</div>`;
        }
        return `<span class="math-inline">${rendered}</span>`;
      } catch (error) {
        return `<span class="math-error">[Math Error: ${escapeHtml(latex)}]</span>`;
      }
    case "image":
      const src = block.props?.url || "";
      const caption = block.props?.caption || "";
      return `<figure>
        <img src="${escapeHtml(src)}" alt="${escapeHtml(caption)}" />
        ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}
      </figure>`;
    case "table":
      return `<table><tr><td>[Table content]</td></tr></table>`;
    default:
      const defaultText = contentToHTML(content);
      return `<p>${defaultText || ""}</p>`;
  }
}
function contentToHTML(content) {
  if (!Array.isArray(content)) return "";
  return content.map((item) => {
    if (typeof item === "string") return escapeHtml(item);
    if (item.type === "text") {
      let text = escapeHtml(item.text || "");
      const styles = item.styles || {};
      if (styles.bold) text = `<strong>${text}</strong>`;
      if (styles.italic) text = `<em>${text}</em>`;
      if (styles.underline) text = `<u>${text}</u>`;
      if (styles.code) text = `<code>${text}</code>`;
      return text;
    }
    return "";
  }).join("");
}
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
function getStyles() {
  return `<style>
    body {
      font-family: 'Times New Roman', Times, serif;
      line-height: 1.6;
      max-width: 8.5in;
      margin: 0 auto;
      padding: 1in;
      background: #f5f5f5;
    }
    
    .document {
      background: white;
      padding: 1in;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .document-header {
      border-bottom: 2px solid #333;
      padding-bottom: 1em;
      margin-bottom: 2em;
    }
    
    .document-header h1 {
      margin: 0;
      font-size: 24pt;
      color: #333;
    }
    
    .document-meta {
      margin: 0.5em 0 0 0;
      color: #666;
      font-size: 11pt;
    }
    
    .document-content h1 { font-size: 20pt; margin-top: 1.5em; margin-bottom: 0.5em; }
    .document-content h2 { font-size: 16pt; margin-top: 1.2em; margin-bottom: 0.5em; }
    .document-content h3 { font-size: 14pt; margin-top: 1em; margin-bottom: 0.5em; }
    
    .document-content p {
      margin-bottom: 1em;
    }
    
    .document-content ul, .document-content ol {
      margin-left: 1.5em;
      margin-bottom: 1em;
    }
    
    .document-content figure {
      text-align: center;
      margin: 1.5em 0;
    }
    
    .document-content figure img {
      max-width: 100%;
      height: auto;
    }
    
    .document-content figcaption {
      font-size: 0.9em;
      color: #666;
      margin-top: 0.5em;
      font-style: italic;
    }
    
    .math-block {
      text-align: center;
      margin: 1em 0;
      font-size: 1.2em;
    }
    
    .math-inline {
      display: inline;
    }
    
    .math-error {
      color: red;
      font-family: monospace;
    }
    
    code {
      background: #f4f4f4;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1em 0;
    }
    
    table td, table th {
      border: 1px solid #ccc;
      padding: 0.5em;
    }
    
    @media print {
      body {
        background: white;
        padding: 0;
      }
      
      .document {
        box-shadow: none;
      }
    }
  </style>`;
}

function ExportDropdown({ blocks, title, pageCount, author }) {
  const handleExport = async (format) => {
    try {
      if (!blocks || blocks.length === 0) {
        ue.error("No content to export");
        return;
      }
      ue.loading(`Exporting to ${format.toUpperCase()}...`);
      switch (format) {
        case "pdf":
          await exportToPDF({ title, blocks, author, pageCount });
          break;
        case "docx":
          await exportToDOCX({ title, blocks, author });
          break;
        case "html":
          exportToHTML({ title, blocks, includeStyles: true });
          break;
      }
      ue.dismiss();
      ue.success(`Exported to ${format.toUpperCase()}`);
    } catch (error) {
      ue.dismiss();
      ue.error(`Export failed: ${error.message}`);
      console.error("Export error:", error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4 mr-2" }),
      "Export"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => handleExport("pdf"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 mr-2" }),
        "Export as PDF"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => handleExport("docx"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 mr-2" }),
        "Export as Word (.docx)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => handleExport("html"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "h-4 w-4 mr-2" }),
        "Export as HTML"
      ] })
    ] })
  ] });
}

function getUserColor(userId) {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E9",
    "#F8B500",
    "#00CED1"
  ];
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}
class SupabaseProvider {
  channel = null;
  doc;
  documentType;
  documentId;
  awareness;
  isDestroyed = false;
  pendingUpdates = [];
  syncTimeout = null;
  isSyncing = false;
  synced = false;
  onSynced = null;
  onAwarenessUpdate = null;
  constructor(options) {
    this.doc = options.doc;
    this.documentType = options.documentType;
    this.documentId = options.documentId;
    this.awareness = options.awareness || new Awareness(this.doc);
    this.init();
  }
  async init() {
    await this.loadInitialState();
    this.setupRealtimeChannel();
    this.setupDocumentObserver();
    this.setupAwarenessObserver();
  }
  async loadInitialState() {
    try {
      const { data: yjsDoc } = await supabase.from("yjs_documents").select("state").eq("document_type", this.documentType).eq("document_id", this.documentId).maybeSingle();
      if (yjsDoc?.state) {
        const state = new Uint8Array(
          atob(yjsDoc.state).split("").map((c) => c.charCodeAt(0))
        );
        applyUpdate(this.doc, state);
      }
      const { data: updates } = await supabase.from("yjs_updates").select("update_data").eq("document_type", this.documentType).eq("document_id", this.documentId).order("created_at", { ascending: true });
      if (updates) {
        for (const update of updates) {
          const data = new Uint8Array(
            atob(update.update_data).split("").map((c) => c.charCodeAt(0))
          );
          applyUpdate(this.doc, data);
        }
      }
      this.synced = true;
      this.onSynced?.();
    } catch (error) {
      console.error("Failed to load initial state:", error);
    }
  }
  setupRealtimeChannel() {
    const channelName = `collab:${this.documentType}:${this.documentId}`;
    this.channel = supabase.channel(channelName, {
      config: {
        broadcast: { self: false },
        presence: { key: "" }
      }
    });
    this.channel.on("broadcast", { event: "yjs-update" }, ({ payload }) => {
      if (this.isDestroyed) return;
      const update = new Uint8Array(
        atob(payload.update).split("").map((c) => c.charCodeAt(0))
      );
      applyUpdate(this.doc, update, "remote");
    });
    this.channel.on("presence", { event: "sync" }, () => {
      this.broadcastAwareness();
    });
    this.channel.on("presence", { event: "join" }, ({ key, newPresences }) => {
      this.broadcastAwareness();
    });
    this.channel.on("presence", { event: "leave" }, ({ key, leftPresences }) => {
      this.broadcastAwareness();
    });
    this.channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await this.channel?.track({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Anonymous",
            color: getUserColor(user.id),
            online_at: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
      }
    });
  }
  setupDocumentObserver() {
    this.doc.on("update", (update, origin) => {
      if (this.isDestroyed || origin === "remote") return;
      const base64Update = btoa(String.fromCharCode(...update));
      this.channel?.send({
        type: "broadcast",
        event: "yjs-update",
        payload: { update: base64Update }
      });
      this.pendingUpdates.push(update);
      this.schedulePersistence();
    });
  }
  setupAwarenessObserver() {
    this.awareness.on("update", ({ added, updated, removed }) => {
      const localState = this.awareness.getLocalState();
      if (localState) {
        this.channel?.send({
          type: "broadcast",
          event: "awareness-update",
          payload: { state: localState }
        });
      }
    });
  }
  broadcastAwareness() {
    if (!this.channel) return;
    const presenceState = this.channel.presenceState();
    const users = [];
    for (const key in presenceState) {
      const presences = presenceState[key];
      if (Array.isArray(presences)) {
        for (const presence of presences) {
          users.push({
            id: presence.id,
            name: presence.name,
            email: presence.email,
            color: presence.color,
            cursor: presence.cursor
          });
        }
      }
    }
    this.onAwarenessUpdate?.(users);
  }
  schedulePersistence() {
    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
    }
    this.syncTimeout = setTimeout(() => {
      this.persistUpdates();
    }, 1e3);
  }
  async persistUpdates() {
    if (this.isSyncing || this.pendingUpdates.length === 0) return;
    this.isSyncing = true;
    const updates = [...this.pendingUpdates];
    this.pendingUpdates = [];
    try {
      const mergedUpdate = mergeUpdates(updates);
      const base64Update = btoa(String.fromCharCode(...mergedUpdate));
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from("yjs_updates").insert({
        document_type: this.documentType,
        document_id: this.documentId,
        update_data: base64Update,
        user_id: user?.id
      });
      await this.saveFullState();
    } catch (error) {
      console.error("Failed to persist updates:", error);
      this.pendingUpdates = [...updates, ...this.pendingUpdates];
    } finally {
      this.isSyncing = false;
    }
  }
  async saveFullState() {
    try {
      const state = encodeStateAsUpdate(this.doc);
      const base64State = btoa(String.fromCharCode(...state));
      await supabase.from("yjs_documents").upsert({
        document_type: this.documentType,
        document_id: this.documentId,
        state: base64State,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }, {
        onConflict: "document_type,document_id"
      });
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1e3).toISOString();
      await supabase.from("yjs_updates").delete().eq("document_type", this.documentType).eq("document_id", this.documentId).lt("created_at", oneHourAgo);
    } catch (error) {
      console.error("Failed to save full state:", error);
    }
  }
  updateCursor(anchor, head) {
    this.awareness.setLocalStateField("cursor", { anchor, head });
  }
  getAwareness() {
    return this.awareness;
  }
  destroy() {
    this.isDestroyed = true;
    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
    }
    if (this.pendingUpdates.length > 0) {
      this.persistUpdates();
    }
    this.channel?.unsubscribe();
    this.awareness.destroy();
  }
}

function useCollaboration({
  documentType,
  documentId,
  enabled = true
}) {
  const [ydoc, setYdoc] = reactExports.useState(null);
  const [provider, setProvider] = reactExports.useState(null);
  const [isConnected, setIsConnected] = reactExports.useState(false);
  const [isSynced, setIsSynced] = reactExports.useState(false);
  const [activeUsers, setActiveUsers] = reactExports.useState([]);
  const [collaborators, setCollaborators] = reactExports.useState([]);
  const [isOwner, setIsOwner] = reactExports.useState(false);
  const [canEdit, setCanEdit] = reactExports.useState(false);
  const [currentUserId, setCurrentUserId] = reactExports.useState(null);
  const providerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!enabled || !documentId) return;
    const doc = new Doc();
    setYdoc(doc);
    const newProvider = new SupabaseProvider({
      documentType,
      documentId,
      doc
    });
    newProvider.onSynced = () => {
      setIsSynced(true);
      setIsConnected(true);
    };
    newProvider.onAwarenessUpdate = (users) => {
      setActiveUsers(users);
    };
    providerRef.current = newProvider;
    setProvider(newProvider);
    return () => {
      newProvider.destroy();
      doc.destroy();
      providerRef.current = null;
    };
  }, [documentType, documentId, enabled]);
  reactExports.useEffect(() => {
    const checkPermissions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setCurrentUserId(user.id);
      let userIsOwner = false;
      if (documentType === "draft") {
        const { data: draft } = await supabase.from("drafts").select("assignment_id").eq("id", documentId).single();
        if (draft) {
          const { data: assignment } = await supabase.from("assignments").select("user_id").eq("id", draft.assignment_id).single();
          if (assignment?.user_id === user.id) {
            userIsOwner = true;
          }
        }
      } else if (documentType === "note") {
        const { data: note } = await supabase.from("notes").select("user_id").eq("id", documentId).single();
        if (note?.user_id === user.id) {
          userIsOwner = true;
        }
      }
      if (userIsOwner) {
        setIsOwner(true);
        setCanEdit(true);
        const { data: existingOwnerRecord } = await supabase.from("document_collaborators").select("id").eq("document_type", documentType).eq("document_id", documentId).eq("user_id", user.id).eq("role", "owner").maybeSingle();
        if (!existingOwnerRecord) {
          await supabase.from("document_collaborators").insert({
            document_type: documentType,
            document_id: documentId,
            user_id: user.id,
            role: "owner"
          });
        }
        return;
      }
      const { data: collab } = await supabase.from("document_collaborators").select("role").eq("document_type", documentType).eq("document_id", documentId).eq("user_id", user.id).single();
      if (collab) {
        setCanEdit(collab.role === "editor" || collab.role === "owner");
      }
    };
    if (documentId) {
      checkPermissions();
    }
  }, [documentType, documentId]);
  const loadCollaborators = reactExports.useCallback(async () => {
    if (!documentId) return;
    try {
      const { data, error } = await supabase.from("document_collaborators").select(`
          id,
          user_id,
          role,
          invited_email
        `).eq("document_type", documentType).eq("document_id", documentId);
      if (error) throw error;
      const collaboratorsWithProfiles = await Promise.all(
        (data || []).map(async (collab) => {
          const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", collab.user_id).single();
          const { data: authUser } = await supabase.auth.admin?.getUserById?.(collab.user_id) || { data: null };
          return {
            id: collab.id,
            user_id: collab.user_id,
            email: collab.invited_email || authUser?.user?.email || "Unknown",
            name: profile?.full_name || void 0,
            role: collab.role,
            isOnline: activeUsers.some((u) => u.id === collab.user_id)
          };
        })
      );
      setCollaborators(collaboratorsWithProfiles);
    } catch (error) {
      console.error("Failed to load collaborators:", error);
    }
  }, [documentType, documentId, activeUsers]);
  const addCollaborator = reactExports.useCallback(async (email, role, documentTitle) => {
    if (!documentId || !isOwner) {
      ue.error("Only the owner can add collaborators");
      return false;
    }
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("document_collaborators").insert({
        document_type: documentType,
        document_id: documentId,
        user_id: null,
        // Set to null - will be updated when invited user accepts
        role,
        invited_by: user?.id,
        invited_email: email.toLowerCase()
      });
      if (error) {
        if (error.code === "23505") {
          ue.error("This user is already a collaborator");
        } else {
          throw error;
        }
        return false;
      }
      try {
        const { error: emailError } = await supabase.functions.invoke("send-collaboration-invite", {
          body: {
            email,
            documentId,
            documentType,
            permission: role,
            documentTitle: documentTitle || "Untitled Document"
          }
        });
        if (emailError) {
          console.error("Failed to send invitation email:", emailError);
          ue.success(`Added ${email} as ${role} (email notification failed)`);
        } else {
          ue.success(`Invitation sent to ${email}`);
        }
      } catch (emailErr) {
        console.error("Failed to send invitation email:", emailErr);
        ue.success(`Added ${email} as ${role} (email notification failed)`);
      }
      await loadCollaborators();
      return true;
    } catch (error) {
      console.error("Failed to add collaborator:", error);
      ue.error("Failed to add collaborator");
      return false;
    }
  }, [documentType, documentId, isOwner, loadCollaborators]);
  const removeCollaborator = reactExports.useCallback(async (collabId) => {
    if (!documentId || !isOwner) {
      ue.error("Only the owner can remove collaborators");
      return false;
    }
    try {
      const { error } = await supabase.from("document_collaborators").delete().eq("id", collabId);
      if (error) throw error;
      ue.success("Collaborator removed");
      await loadCollaborators();
      return true;
    } catch (error) {
      console.error("Failed to remove collaborator:", error);
      ue.error("Failed to remove collaborator");
      return false;
    }
  }, [documentId, isOwner, loadCollaborators]);
  const updateCollaboratorRole = reactExports.useCallback(async (collabId, role) => {
    if (!documentId || !isOwner) {
      ue.error("Only the owner can change roles");
      return false;
    }
    try {
      const { error } = await supabase.from("document_collaborators").update({ role }).eq("id", collabId);
      if (error) throw error;
      ue.success("Role updated");
      await loadCollaborators();
      return true;
    } catch (error) {
      console.error("Failed to update role:", error);
      ue.error("Failed to update role");
      return false;
    }
  }, [documentId, isOwner, loadCollaborators]);
  reactExports.useEffect(() => {
    if (documentId) {
      loadCollaborators();
    }
  }, [documentId, loadCollaborators]);
  reactExports.useEffect(() => {
    if (!documentId) return;
    const channel = supabase.channel(`collaborators:${documentType}:${documentId}`).on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "document_collaborators",
        filter: `document_id=eq.${documentId}`
      },
      () => {
        loadCollaborators();
      }
    ).subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [documentType, documentId, loadCollaborators]);
  return {
    ydoc,
    provider,
    isConnected,
    isSynced,
    activeUsers,
    collaborators,
    isOwner,
    canEdit,
    addCollaborator,
    removeCollaborator,
    updateCollaboratorRole,
    loadCollaborators
  };
}

function ShareModal({
  isOwner,
  collaborators,
  documentTitle,
  onAddCollaborator,
  onRemoveCollaborator,
  onUpdateRole,
  trigger
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("editor");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const handleAddCollaborator = async () => {
    if (!email.trim()) return;
    setIsLoading(true);
    const success = await onAddCollaborator(email.trim(), role, documentTitle);
    setIsLoading(false);
    if (success) {
      setEmail("");
    }
  };
  const getInitials = (name, email2) => {
    if (name) {
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    }
    if (email2) {
      return email2.slice(0, 2).toUpperCase();
    }
    return "??";
  };
  const getRoleIcon = (role2) => {
    switch (role2) {
      case "owner":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3 w-3" });
      case "editor":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" });
      case "viewer":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" });
      default:
        return null;
    }
  };
  const getRoleBadgeVariant = (role2) => {
    switch (role2) {
      case "owner":
        return "default";
      case "editor":
        return "secondary";
      default:
        return "outline";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: trigger || /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4 mr-2" }),
      "Share"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Share Document" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Invite others to collaborate on this document in real-time." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Invite by email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "email",
                placeholder: "colleague@example.com",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                onKeyDown: (e) => e.key === "Enter" && handleAddCollaborator(),
                className: "flex-1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: (v) => setRole(v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[100px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "editor", children: "Editor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "viewer", children: "Viewer" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleAddCollaborator, disabled: isLoading || !email.trim(), children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "People with access" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[200px] rounded-md border p-2", children: collaborators.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground text-sm", children: "No collaborators yet. Invite someone to get started!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: collaborators.map((collab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AvatarFallback,
                      {
                        className: "text-xs",
                        style: { backgroundColor: collab.color || "#888" },
                        children: getInitials(collab.name, collab.email)
                      }
                    ) }),
                    collab.isOnline && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-background" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: collab.name || collab.email }),
                    collab.name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: collab.email })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: isOwner && collab.role !== "owner" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: collab.role,
                      onValueChange: (v) => onUpdateRole(collab.id, v),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[90px] h-7 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "editor", children: "Editor" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "viewer", children: "Viewer" })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-7 w-7 opacity-0 group-hover:opacity-100",
                      onClick: () => onRemoveCollaborator(collab.id),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: getRoleBadgeVariant(collab.role), className: "gap-1", children: [
                  getRoleIcon(collab.role),
                  collab.role
                ] }) })
              ]
            },
            collab.id
          )) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Editor:" }),
            " Can view and edit the document"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Viewer:" }),
            " Can only view the document"
          ] })
        ] })
      ] })
    ] })
  ] });
}

function CollaboratorAvatars({ users, maxVisible = 4 }) {
  if (users.length === 0) return null;
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = users.length - maxVisible;
  const getInitials = (name) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center -space-x-2", children: [
    visibleUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Avatar,
          {
            className: "h-7 w-7 border-2 border-background ring-2 ring-background cursor-default",
            style: { backgroundColor: user.color },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              AvatarFallback,
              {
                className: "text-[10px] font-medium text-white",
                style: { backgroundColor: user.color },
                children: getInitials(user.name)
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500",
            title: "Online"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TooltipContent, { side: "bottom", className: "text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: user.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: user.email })
      ] })
    ] }, user.id)),
    remainingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-7 w-7 border-2 border-background bg-muted cursor-default", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AvatarFallback, { className: "text-[10px] font-medium", children: [
        "+",
        remainingCount
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs space-y-1", children: users.slice(maxVisible).map((user) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: user.name }, user.id)) }) })
    ] })
  ] }) });
}

export { Avatar as A, CollaboratorAvatars as C, ExportDropdown as E, ImportToBlockNoteModal as I, ResizablePanelGroup as R, ShareModal as S, AvatarFallback as a, ResizablePanel as b, ResizableHandle as c, useCollaboration as u };
