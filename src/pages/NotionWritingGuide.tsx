import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Blocks, FileText, Keyboard, Layers, Lightbulb, List, Sparkles, Type } from "lucide-react";

export default function NotionWritingGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <BackButton fallbackPath="/work" className="mb-4" />
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Blocks className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Notion-Style Writing System</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Learn how to use our powerful block-based editor for structured, organized writing.
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-6 shadow-strong">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              What is Block-Based Writing?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our editor uses a <strong>block-based system</strong> inspired by Notion, where each piece 
              of content (paragraph, heading, list, etc.) is a separate block. This gives you incredible 
              flexibility to organize, rearrange, and format your work.
            </p>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <p className="text-sm">
                <strong>Think of it like LEGO blocks:</strong> Each block is independent, but together 
                they build something amazing. You can move, delete, or transform blocks at any time.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card className="mb-6 shadow-strong">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-500">Getting Started</Badge>
              <CardTitle>Creating and Editing Blocks</CardTitle>
            </div>
            <CardDescription>Master the basics of block manipulation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Creating Blocks */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Keyboard className="h-4 w-4 text-blue-500" />
                Creating New Blocks
              </h4>
              <div className="pl-6 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">Enter</Badge>
                  <p>Press <kbd className="px-2 py-1 text-xs bg-muted rounded">Enter</kbd> at the end of a block to create a new one below</p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">/</Badge>
                  <p>Type <kbd className="px-2 py-1 text-xs bg-muted rounded">/</kbd> to open the block menu and choose a block type</p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">+</Badge>
                  <p>Click the <strong>+</strong> button on the left side of any block to insert one above or below</p>
                </div>
              </div>
            </div>

            {/* Transforming Blocks */}
            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-semibold flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-500" />
                Transforming Block Types
              </h4>
              <div className="pl-6 space-y-2 text-sm text-muted-foreground">
                <p>
                  You can change any block into a different type at any time:
                </p>
                <ul className="space-y-1 list-disc pl-5">
                  <li>Click the <strong>⋮⋮</strong> (drag handle) on the left of a block</li>
                  <li>Select "Turn into" from the menu</li>
                  <li>Choose your desired block type</li>
                </ul>
              </div>
            </div>

            {/* Moving Blocks */}
            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-semibold flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-500" />
                Moving and Rearranging
              </h4>
              <div className="pl-6 space-y-2 text-sm text-muted-foreground">
                <p>Reorganize your content by dragging blocks:</p>
                <ul className="space-y-1 list-disc pl-5">
                  <li>Hover over the left side of a block to see the drag handle <strong>⋮⋮</strong></li>
                  <li>Click and drag the handle to move the block</li>
                  <li>Drop it at any position in your document</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Block Types */}
        <Card className="mb-6 shadow-strong">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-purple-500">Block Types</Badge>
              <CardTitle>Available Block Types</CardTitle>
            </div>
            <CardDescription>Different blocks for different content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Paragraph */}
              <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <h4 className="font-semibold text-sm">Paragraph</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Default block type. Use for regular body text and content.
                </p>
                <div className="mt-2 text-xs">
                  <Badge variant="outline">Default</Badge>
                </div>
              </div>

              {/* Headings */}
              <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Type className="h-4 w-4 text-purple-500" />
                  <h4 className="font-semibold text-sm">Headings (H1-H3)</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Structure your document with different heading levels.
                </p>
                <div className="mt-2 flex gap-1">
                  <Badge variant="outline" className="text-xs">/heading1</Badge>
                  <Badge variant="outline" className="text-xs">/h1</Badge>
                </div>
              </div>

              {/* Lists */}
              <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <List className="h-4 w-4 text-purple-500" />
                  <h4 className="font-semibold text-sm">Bulleted List</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Create unordered lists with bullet points.
                </p>
                <div className="mt-2 flex gap-1">
                  <Badge variant="outline" className="text-xs">/bullet</Badge>
                  <Badge variant="outline" className="text-xs">-</Badge>
                  <Badge variant="outline" className="text-xs">*</Badge>
                </div>
              </div>

              {/* Numbered List */}
              <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <List className="h-4 w-4 text-purple-500" />
                  <h4 className="font-semibold text-sm">Numbered List</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Create ordered lists with automatic numbering.
                </p>
                <div className="mt-2 flex gap-1">
                  <Badge variant="outline" className="text-xs">/numbered</Badge>
                  <Badge variant="outline" className="text-xs">1.</Badge>
                </div>
              </div>

              {/* Quote */}
              <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <h4 className="font-semibold text-sm">Quote Block</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Highlight important quotes or excerpts.
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">/quote</Badge>
                </div>
              </div>

              {/* Code */}
              <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <h4 className="font-semibold text-sm">Code Block</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Format code snippets with syntax highlighting.
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">/code</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Text Formatting */}
        <Card className="mb-6 shadow-strong">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-green-500">Formatting</Badge>
              <CardTitle>Text Formatting Options</CardTitle>
            </div>
            <CardDescription>Style your text within blocks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Keyboard Shortcuts</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span><strong>Bold</strong></span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">Cmd/Ctrl + B</code>
                  </div>
                  <div className="flex justify-between">
                    <span><em>Italic</em></span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">Cmd/Ctrl + I</code>
                  </div>
                  <div className="flex justify-between">
                    <span><u>Underline</u></span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">Cmd/Ctrl + U</code>
                  </div>
                  <div className="flex justify-between">
                    <span><code>Code</code></span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">Cmd/Ctrl + E</code>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Markdown Syntax</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span><strong>Bold</strong></span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">**text**</code>
                  </div>
                  <div className="flex justify-between">
                    <span><em>Italic</em></span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">*text*</code>
                  </div>
                  <div className="flex justify-between">
                    <span><code>Code</code></span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">`text`</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg mt-4">
              <p className="text-sm">
                <strong>Pro Tip:</strong> Select text to see the formatting toolbar appear above your selection. 
                This gives you quick access to all formatting options.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Features */}
        <Card className="mb-6 shadow-strong">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-orange-500">Advanced</Badge>
              <CardTitle>Advanced Features</CardTitle>
            </div>
            <CardDescription>Power user techniques</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {/* Selection */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold mb-2">Multi-Block Selection</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Select multiple blocks at once to perform bulk operations:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                  <li>Click the <strong>⋮⋮</strong> handle on the first block</li>
                  <li>Hold <kbd className="px-2 py-0.5 text-xs bg-muted rounded">Shift</kbd> and click another block's handle</li>
                  <li>All blocks in between will be selected</li>
                  <li>Delete, move, or transform them together</li>
                </ul>
              </div>

              {/* Slash Commands */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold mb-2">Slash Commands Menu</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Type <kbd className="px-2 py-0.5 text-xs bg-muted rounded">/</kbd> anywhere to open a menu of all available block types and actions:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <code className="bg-muted px-2 py-1 rounded">/heading</code>
                  <code className="bg-muted px-2 py-1 rounded">/bullet</code>
                  <code className="bg-muted px-2 py-1 rounded">/numbered</code>
                  <code className="bg-muted px-2 py-1 rounded">/quote</code>
                  <code className="bg-muted px-2 py-1 rounded">/code</code>
                  <code className="bg-muted px-2 py-1 rounded">/table</code>
                </div>
              </div>

              {/* Undo/Redo */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold mb-2">Undo & Redo</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Made a mistake? No problem:
                </p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Undo</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">Cmd/Ctrl + Z</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Redo</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">Cmd/Ctrl + Shift + Z</code>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="mb-6 shadow-strong border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Best Practices for Block Writing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">✓ Use Headings</h4>
                <p className="text-xs text-muted-foreground">
                  Structure your work with H1, H2, and H3 headings. This creates a clear hierarchy.
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">✓ One Idea Per Block</h4>
                <p className="text-xs text-muted-foreground">
                  Keep blocks focused. Each paragraph should contain one main idea.
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">✓ Use Lists Wisely</h4>
                <p className="text-xs text-muted-foreground">
                  Lists are great for enumerating points, but don't overuse them.
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">✓ Rearrange Freely</h4>
                <p className="text-xs text-muted-foreground">
                  Don't be afraid to move blocks around to find the best structure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auto-Save Notice */}
        <Card className="shadow-strong bg-green-500/5 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Auto-Save Enabled</h4>
                <p className="text-sm text-muted-foreground">
                  Your work is automatically saved every few seconds. You'll see a "Saving..." indicator 
                  when changes are being saved, and "All changes saved" when complete. No need to worry 
                  about losing your progress!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
