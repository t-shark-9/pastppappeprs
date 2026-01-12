/**
 * CollaboraEditor - Collabora Online Editor
 * 
 * Embeds Collabora Online (LibreOffice in the browser).
 * Uses the free online demo version - no Docker required!
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  ExternalLink, 
  FileText, 
  Maximize2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface CollaboraEditorProps {
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

export function CollaboraEditor({
  initialContent,
  onChange,
  onEditorReady,
  onPageCountChange,
  onAICommandsReady,
  userContext,
}: CollaboraEditorProps) {
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
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Collabora Online</h3>
            <p className="text-xs text-muted-foreground">LibreOffice in the browser</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'demo' | 'info')}>
            <TabsList className="h-8">
              <TabsTrigger value="demo" className="text-xs px-3 py-1">Demo</TabsTrigger>
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
              <AlertTitle>Collabora Online Demo</AlertTitle>
              <AlertDescription>
                This embeds the Collabora Online demo. For full integration with your documents,
                check the "Options" tab for free hosting alternatives.
              </AlertDescription>
            </Alert>
            <div className="flex-1 p-4">
              <iframe
                ref={iframeRef}
                src="https://www.collaboraoffice.com/collabora-online-demo/"
                className="w-full h-full rounded-lg border shadow-sm"
                allow="clipboard-read; clipboard-write"
                title="Collabora Online Demo"
              />
            </div>
          </div>
        ) : (
          <div className="p-8 overflow-auto h-full">
            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Try Collabora Online - No Docker Required!</CardTitle>
                  <CardDescription>
                    Multiple free ways to use Collabora Online
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">🌐 Nextcloud (Recommended)</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Sign up for free Nextcloud hosting - includes Collabora Online built-in.
                        No setup required!
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://nextcloud.com/signup/" target="_blank" rel="noopener">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Free Nextcloud
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://try.nextcloud.com/" target="_blank" rel="noopener">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Try Demo
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">☁️ Collabora Online Demo</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Try the official demo directly in your browser - no account needed.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://www.collaboraoffice.com/collabora-online-demo/" target="_blank" rel="noopener">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open Demo
                        </a>
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">📱 rollApp (Free)</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Run LibreOffice Writer in the cloud - works with Google Drive & Dropbox.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://www.rollapp.com/app/lowriter" target="_blank" rel="noopener">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open rollApp
                        </a>
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">📄 Google Docs Alternative</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        CryptPad is a free, privacy-focused alternative with real-time collaboration.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://cryptpad.fr/" target="_blank" rel="noopener">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Try CryptPad
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

export default CollaboraEditor;
