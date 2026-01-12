import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, FileText, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { htmlToBlockNote, readHtmlFile } from '@/lib/import/htmlToBlockNote';
import { Block } from '@blocknote/core';

interface ImportDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (blocks: Block[]) => void;
}

export function ImportDocumentModal({ open, onOpenChange, onImport }: ImportDocumentModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileName = selectedFile.name.toLowerCase();
      if (fileName.endsWith('.html')) {
        setFile(selectedFile);
      } else {
        toast.error('Please upload an .html file');
        e.target.value = '';
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);
    setProgress('Reading HTML file...');

    try {
      // Read HTML file content
      const htmlContent = await readHtmlFile(file);
      
      setProgress('Converting to blocks...');
      
      // Convert HTML directly to BlockNote blocks
      const blocks = htmlToBlockNote(htmlContent);
      
      setProgress('Inserting content...');
      
      // Pass blocks to parent
      onImport(blocks);
      
      toast.success('Document imported successfully!');
      onOpenChange(false);
      setFile(null);
      setProgress('');
    } catch (error) {
      console.error('Import error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to import document. Try copy/paste instead.');
    } finally {
      setUploading(false);
      setProgress('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import Document</DialogTitle>
          <DialogDescription>
            Upload an HTML file to import its content with formatting preserved.
          </DialogDescription>
        </DialogHeader>

        {/* Experimental Warning */}
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div className="text-sm space-y-1">
            <p className="font-semibold text-warning">Experimental Feature</p>
            <p className="text-muted-foreground">
              HTML import may not work perfectly for all files. If the import fails or looks incorrect, 
              try copying and pasting the content directly into the editor instead.
            </p>
          </div>
        </div>

        <div className="space-y-4 py-4">
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            
            <input
              type="file"
              accept=".html"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              disabled={uploading}
            />
            
            <label htmlFor="file-upload">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={uploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                Select File
              </Button>
            </label>

            {file && !uploading && (
              <div className="mt-4 text-sm">
                <p className="font-medium">Selected file:</p>
                <p className="text-muted-foreground">{file.name}</p>
              </div>
            )}

            {uploading && progress && (
              <div className="mt-4 text-sm">
                <Loader2 className="h-5 w-5 mx-auto mb-2 animate-spin text-primary" />
                <p className="text-muted-foreground">{progress}</p>
              </div>
            )}
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>Supported format:</p>
            <ul className="list-disc list-inside pl-2">
              <li>.html files (exported from Google Docs or other sources)</li>
            </ul>
            <p className="mt-2">
              The import attempts to preserve text, headings, lists, tables, formatting (bold, italic, underline), and images.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Import
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
