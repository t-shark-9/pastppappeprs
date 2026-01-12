/**
 * OnlyOfficeEditor - OnlyOffice Document Editor
 * 
 * Embeds OnlyOffice editor.
 * Uses free cloud-hosted options - no Docker required!
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  ExternalLink, 
  FileSpreadsheet, 
  Maximize2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface OnlyOfficeEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  onEditorReady?: (editor: any) => void;
  onPageCountChange?: (count: number) => void;
  onAICommandsReady?: (handlers: {
    define: (text: string) => Promise<void>;
    explain: (text: string) => Promise<void>;
    synonym: (text: string) => Promise<void>;
    rephrase: (text: string) => Promise<void>;
    grammar: (text: string) => Promise<void>;
  }) => void;
  userContext?: {
    schoolProgram?: string;
    subject?: string;
    taskType?: string;
  };
}

export function OnlyOfficeEditor({
  initialContent,
  onChange,
  onEditorReady,
  onPageCountChange,
  onAICommandsReady,
  userContext,
}: OnlyOfficeEditorProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'demo' | 'info'>('demo');

  // Notify ready
  useEffect(() => {
    const editorAPI = {
      getContent: () => null,
      setContent: () => {},
      focus: () => iframeRef.current?.focus(),
    };
    onEditorReady?.(editorAPI);
    
    if (onAICommandsReady) {
      onAICommandsReady({
        define: async (text) => { toast.info(`Define: ${text}`); },
        explain: async (text) => { toast.info(`Explain: ${text}`); },
        synonym: async (text) => { toast.info(`Synonym: ${text}`); },
        rephrase: async (text) => { toast.info(`Rephrase: ${text}`); },
        grammar: async (text) => { toast.info(`Grammar: ${text}`); },
      });
    }
  }, [onEditorReady, onAICommandsReady]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-zinc-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <FileSpreadsheet className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">OnlyOffice</h3>
            <p className="text-xs text-muted-foreground">Document Editor</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'demo' | 'info')}>
            <TabsList className="h-8">
              <TabsTrigger value="demo" className="text-xs px-3 py-1">Editor</TabsTrigger>
              <TabsTrigger value="info" className="text-xs px-3 py-1">Options</TabsTrigger>
            </TabsList>
          </Tabs>
          {activeTab === 'demo' && (
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'demo' ? (
          <div className="h-full flex flex-col">
            <Alert className="m-4 mb-0">
              <Info className="h-4 w-4" />
              <AlertTitle>OnlyOffice Personal</AlertTitle>
              <AlertDescription>
                This embeds OnlyOffice Personal - a free cloud office suite.
                Sign up for free to edit documents with full MS Office compatibility.
              </AlertDescription>
            </Alert>
            <div className="flex-1 p-4">
              <iframe
                ref={iframeRef}
                src="https://personal.onlyoffice.com/"
                className="w-full h-full rounded-lg border shadow-sm"
                allow="clipboard-read; clipboard-write"
                title="OnlyOffice Personal"
              />
            </div>
          </div>
        ) : (
          <div className="p-8 overflow-auto h-full">
            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>OnlyOffice - No Docker Required!</CardTitle>
                  <CardDescription>
                    Free ways to use OnlyOffice online
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4 bg-orange-50 dark:bg-orange-900/20">
                      <h4 className="font-medium mb-2">⭐ OnlyOffice Personal (Recommended)</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Free cloud office suite with 2GB storage. Create documents, spreadsheets, 
                        and presentations with excellent MS Office compatibility.
                      </p>
                      <Button size="sm" asChild>
                        <a href="https://personal.onlyoffice.com/" target="_blank" rel="noopener">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Sign Up Free
                        </a>
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">🖥️ OnlyOffice Desktop</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Download the free desktop app for Windows, macOS, and Linux.
                        Works offline with local files.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://www.onlyoffice.com/desktop.aspx" target="_blank" rel="noopener">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Download Free
                        </a>
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">🌐 OnlyOffice DocSpace</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Free room-based collaboration platform. Great for team document sharing.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://www.onlyoffice.com/docspace.aspx" target="_blank" rel="noopener">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Try DocSpace
                        </a>
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">📁 Nextcloud Integration</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        OnlyOffice is also available through Nextcloud for integrated file management.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://apps.nextcloud.com/apps/onlyoffice" target="_blank" rel="noopener">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Nextcloud App
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnlyOfficeEditor;
