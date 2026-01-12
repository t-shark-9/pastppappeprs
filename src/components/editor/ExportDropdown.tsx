import { Block } from '@blocknote/core';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FileDown, FileText, Code } from 'lucide-react';
import { toast } from 'sonner';
import { exportToPDF } from '@/lib/export/pdf-export';
import { exportToDOCX } from '@/lib/export/docx-export';
import { exportToHTML } from '@/lib/export/html-export';

interface ExportDropdownProps {
  blocks: Block[];
  title: string;
  pageCount: number;
  author?: string;
}

export function ExportDropdown({ blocks, title, pageCount, author }: ExportDropdownProps) {
  const handleExport = async (format: 'pdf' | 'docx' | 'html') => {
    try {
      if (!blocks || blocks.length === 0) {
        toast.error('No content to export');
        return;
      }

      toast.loading(`Exporting to ${format.toUpperCase()}...`);

      switch (format) {
        case 'pdf':
          await exportToPDF({ title, blocks, author, pageCount });
          break;
        case 'docx':
          await exportToDOCX({ title, blocks, author });
          break;
        case 'html':
          exportToHTML({ title, blocks, includeStyles: true });
          break;
      }

      toast.dismiss();
      toast.success(`Exported to ${format.toUpperCase()}`);
    } catch (error: any) {
      toast.dismiss();
      toast.error(`Export failed: ${error.message}`);
      console.error('Export error:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <FileDown className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('docx')}>
          <FileText className="h-4 w-4 mr-2" />
          Export as Word (.docx)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('html')}>
          <Code className="h-4 w-4 mr-2" />
          Export as HTML
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
