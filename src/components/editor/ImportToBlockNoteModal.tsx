import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, FileText, Eye, Copy, Check, AlertCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Block } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { validateHtmlFile, readHtmlFile, htmlToBlockNote } from "@/lib/import/htmlToBlockNote";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ImportToBlockNoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (blocks: Block[]) => void;
}

export function ImportToBlockNoteModal({ open, onOpenChange, onInsert }: ImportToBlockNoteModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [convertedBlocks, setConvertedBlocks] = useState<Block[] | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create preview editor
  const previewEditor = useCreateBlockNote({
    initialContent: convertedBlocks || undefined,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Only accept .html files
    const fileName = selectedFile.name.toLowerCase();
    if (!fileName.endsWith('.html')) {
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
      // Read HTML file
      const htmlContent = await readHtmlFile(file);
      
      setProgress("Converting to blocks...");
      
      // Convert HTML directly to BlockNote blocks using client-side parser
      const blocks = htmlToBlockNote(htmlContent);
      
      if (blocks.length === 0) {
        throw new Error("No content could be extracted from the file");
      }

      setConvertedBlocks(blocks);
      setShowPreview(true);
      setProgress("");
      toast.success("Preview generated!");
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
      toast.error("No content to insert. Please preview first.");
      return;
    }

    onInsert(convertedBlocks);
    toast.success("Content inserted into editor!");
    handleClear();
    onOpenChange(false);
  };

  const handleCopyJSON = async () => {
    if (!convertedBlocks || convertedBlocks.length === 0) {
      toast.error("No content to copy. Please preview first.");
      return;
    }

    try {
      const json = JSON.stringify(convertedBlocks, null, 2);
      await navigator.clipboard.writeText(json);
      setCopied(true);
      toast.success("JSON copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy JSON");
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Import to BlockNote
          </DialogTitle>
          <DialogDescription>
            Upload an HTML file to import its content into the editor.
          </DialogDescription>
        </DialogHeader>

        {/* Experimental Warning */}
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 flex items-start gap-2 mt-2">
          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div className="text-sm space-y-1">
            <p className="font-semibold text-warning">Experimental Feature</p>
            <p className="text-muted-foreground">
              HTML import may not work perfectly for all files. If the import fails or looks incorrect, 
              try copying and pasting the content directly into the editor instead.
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {/* File Upload Section */}
          {!showPreview && (
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".html"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  disabled={processing}
                />
                
                <label htmlFor="html-file-upload">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={processing}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </label>

                {file && !processing && (
                  <div className="mt-4 text-sm">
                    <p className="font-medium">Selected file:</p>
                    <p className="text-muted-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}

                {processing && (
                  <div className="mt-4 text-sm">
                    <Loader2 className="h-5 w-5 mx-auto mb-2 animate-spin text-primary" />
                    <p className="text-muted-foreground">{progress || "Converting HTML to blocks..."}</p>
                  </div>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="text-xs text-muted-foreground space-y-1 px-2">
                <p className="font-medium">Supported format:</p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li><strong>HTML files:</strong> Single HTML document (.html)</li>
                </ul>
                <p className="font-medium mt-3">Attempts to convert:</p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>Headings, paragraphs, lists (ordered and unordered)</li>
                  <li>Tables with basic structure</li>
                  <li>Images (if accessible), code blocks, blockquotes</li>
                  <li>Inline formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, links</li>
                </ul>
              </div>
            </div>
          )}

          {/* Preview Section */}
          {showPreview && convertedBlocks && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Preview ({convertedBlocks.length} blocks)
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowPreview(false);
                    setConvertedBlocks(null);
                  }}
                >
                  Back to Upload
                </Button>
              </div>

              <div className="border rounded-lg p-4 bg-muted/30 max-h-96 overflow-y-auto">
                <BlockNoteView
                  editor={previewEditor}
                  theme="light"
                  editable={false}
                />
              </div>

              <div className="text-xs text-muted-foreground">
                This is a preview of how your content will appear in the editor.
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-2 pt-4 border-t">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={processing}
              size="sm"
            >
              Clear
            </Button>
          </div>

          <div className="flex gap-2">
            {!showPreview ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={processing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePreview}
                  disabled={!file || processing}
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleCopyJSON}
                  disabled={!convertedBlocks}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy JSON
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleInsert}
                  disabled={!convertedBlocks}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Insert into Editor
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
