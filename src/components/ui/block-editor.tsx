import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilLine, Sigma } from "lucide-react";

interface BlockEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  onOpenEquation?: () => void;
  onOpenDrawing?: () => void;
}

async function uploadFile(file: File): Promise<string> {
  // Create a unique filename
  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name}`;
  
  // For now, use a data URL (base64) to embed images
  // In production, you'd upload to Supabase Storage
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function BlockEditor({ initialContent, onChange, placeholder, onOpenEquation, onOpenDrawing }: BlockEditorProps) {
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [isEquationOpen, setIsEquationOpen] = useState(false);
  const [pendingInsertPosition, setPendingInsertPosition] = useState<any>(null);

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent 
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile,
  });

  useEffect(() => {
    if (!onChange) return;

    const handleChange = () => {
      const blocks = editor.document;
      onChange(JSON.stringify(blocks));
    };

    editor.onChange(handleChange);
  }, [editor, onChange]);

  // Listen for drawing insertion from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'drawing-saved' && event.data.imageData) {
        // Insert the drawing as an image block
        try {
          const insertBlock = pendingInsertPosition || editor.getTextCursorPosition().block;
          editor.insertBlocks(
            [
              {
                type: "image",
                props: {
                  url: event.data.imageData,
                  caption: "Drawing",
                },
              },
            ],
            insertBlock,
            "after"
          );
        } catch (error) {
          console.error('Error inserting drawing:', error);
        }
        setIsDrawingOpen(false);
        setPendingInsertPosition(null);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [editor, pendingInsertPosition]);

  return (
    <>
      <BlockNoteView 
        editor={editor} 
        theme="light"
        className="min-h-[600px]"
      />

      {/* Drawing Dialog */}
      <Dialog open={isDrawingOpen} onOpenChange={setIsDrawingOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Illustration Editor</DialogTitle>
            <DialogDescription>
              Create drawings and diagrams. Save your illustration to insert it into your draft.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-[calc(95vh-100px)] overflow-hidden">
            <iframe 
              src="/drawings/index.html" 
              className="w-full h-full border-0"
              title="Illustration Editor"
              sandbox="allow-scripts allow-same-origin allow-downloads allow-modals"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Equation Dialog */}
      <Dialog open={isEquationOpen} onOpenChange={setIsEquationOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Equation Editor</DialogTitle>
            <DialogDescription>
              Create mathematical equations and formulas.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 text-center text-muted-foreground">
            <Sigma className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Equation editor coming soon...</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
