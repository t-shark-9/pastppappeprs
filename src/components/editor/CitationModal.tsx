import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Globe, FileText, Newspaper, GraduationCap, Users, Copy, Check, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Citation,
  CitationStyle,
  SourceType,
  formatInlineCitation,
  formatBibliographyEntry,
  getStyleDisplayName,
  getSourceTypeDisplayName,
  generateCitationId,
} from "@/lib/citation-formatter";

interface CitationModalProps {
  open: boolean;
  onClose: () => void;
  onInsert: (inlineCitation: string, citation: Citation, style: CitationStyle) => void;
  draftId?: string;
  existingCitations?: Citation[];
  defaultStyle?: CitationStyle;
}

const sourceTypeIcons: Record<SourceType, React.ReactNode> = {
  book: <BookOpen className="h-4 w-4" />,
  journal: <FileText className="h-4 w-4" />,
  website: <Globe className="h-4 w-4" />,
  newspaper: <Newspaper className="h-4 w-4" />,
  conference: <Users className="h-4 w-4" />,
  thesis: <GraduationCap className="h-4 w-4" />,
  other: <FileText className="h-4 w-4" />,
};

const emptyFormData = (): Omit<Citation, 'id'> => ({
  type: 'book',
  authors: '',
  title: '',
  year: new Date().getFullYear().toString(),
  publisher: '',
  journal: '',
  volume: '',
  issue: '',
  pages: '',
  edition: '',
  url: '',
  accessDate: '',
  websiteName: '',
  newspaper: '',
  conference: '',
  location: '',
  university: '',
  thesisType: '',
  doi: '',
});

export function CitationModal({
  open,
  onClose,
  onInsert,
  draftId,
  existingCitations = [],
  defaultStyle = 'harvard',
}: CitationModalProps) {
  const [activeTab, setActiveTab] = useState<'new' | 'existing'>('new');
  const [formData, setFormData] = useState<Omit<Citation, 'id'>>(emptyFormData());
  const [style, setStyle] = useState<CitationStyle>(defaultStyle);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setFormData(emptyFormData());
      setActiveTab(existingCitations.length > 0 ? 'existing' : 'new');
    }
  }, [open, existingCitations.length]);

  const updateField = (field: keyof Omit<Citation, 'id'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInsertNew = () => {
    if (!formData.authors.trim() || !formData.title.trim()) {
      toast.error("Please fill in at least Author and Title");
      return;
    }

    const citation: Citation = {
      ...formData,
      id: generateCitationId(),
    };

    const inlineText = formatInlineCitation(citation, style, existingCitations.length);
    onInsert(inlineText, citation, style);
    setFormData(emptyFormData());
  };

  const handleInsertExisting = (citation: Citation, index: number) => {
    const inlineText = formatInlineCitation(citation, style, index);
    onInsert(inlineText, citation, style);
  };

  const handleCopyBibliography = (citation: Citation, index: number) => {
    const text = formatBibliographyEntry(citation, style, index);
    navigator.clipboard.writeText(text);
    setCopiedId(citation.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("Bibliography entry copied");
  };

  const previewCitation: Citation = {
    ...formData,
    id: 'preview',
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Add Citation
          </DialogTitle>
          <DialogDescription>
            Create a new citation or insert from existing references
          </DialogDescription>
        </DialogHeader>

        {/* Style Selector */}
        <div className="flex items-center gap-3 pb-2 border-b">
          <Label className="text-sm font-medium">Citation Style:</Label>
          <Select value={style} onValueChange={(v) => setStyle(v as CitationStyle)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="harvard">Harvard</SelectItem>
              <SelectItem value="apa">APA 7th</SelectItem>
              <SelectItem value="mla">MLA 9th</SelectItem>
              <SelectItem value="vancouver">Vancouver</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
              <SelectItem value="ieee">IEEE</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="text-xs">
            {getStyleDisplayName(style)}
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'new' | 'existing')} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">
              <Plus className="h-4 w-4 mr-2" />
              New Citation
            </TabsTrigger>
            <TabsTrigger value="existing" disabled={existingCitations.length === 0}>
              Existing ({existingCitations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {/* Source Type */}
                <div className="space-y-2">
                  <Label>Source Type</Label>
                  <Select value={formData.type} onValueChange={(v) => updateField('type', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(['book', 'journal', 'website', 'newspaper', 'conference', 'thesis', 'other'] as SourceType[]).map(type => (
                        <SelectItem key={type} value={type}>
                          <div className="flex items-center gap-2">
                            {sourceTypeIcons[type]}
                            {getSourceTypeDisplayName(type)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Common Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label>Author(s) *</Label>
                    <Input
                      placeholder="John Smith, Jane Doe"
                      value={formData.authors}
                      onChange={(e) => updateField('authors', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Separate multiple authors with commas</p>
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label>Title *</Label>
                    <Input
                      placeholder="Title of the work"
                      value={formData.title}
                      onChange={(e) => updateField('title', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Year *</Label>
                    <Input
                      type="text"
                      placeholder="2024"
                      value={formData.year}
                      onChange={(e) => updateField('year', e.target.value)}
                    />
                  </div>

                  {/* Book specific */}
                  {(formData.type === 'book' || formData.type === 'other') && (
                    <>
                      <div className="space-y-2">
                        <Label>Publisher</Label>
                        <Input
                          placeholder="Publisher name"
                          value={formData.publisher}
                          onChange={(e) => updateField('publisher', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Edition</Label>
                        <Input
                          placeholder="e.g., 3rd"
                          value={formData.edition}
                          onChange={(e) => updateField('edition', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          placeholder="City, Country"
                          value={formData.location}
                          onChange={(e) => updateField('location', e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {/* Journal specific */}
                  {formData.type === 'journal' && (
                    <>
                      <div className="col-span-2 space-y-2">
                        <Label>Journal Name</Label>
                        <Input
                          placeholder="Journal of..."
                          value={formData.journal}
                          onChange={(e) => updateField('journal', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Volume</Label>
                        <Input
                          placeholder="12"
                          value={formData.volume}
                          onChange={(e) => updateField('volume', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Issue</Label>
                        <Input
                          placeholder="3"
                          value={formData.issue}
                          onChange={(e) => updateField('issue', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Pages</Label>
                        <Input
                          placeholder="45-67"
                          value={formData.pages}
                          onChange={(e) => updateField('pages', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>DOI</Label>
                        <Input
                          placeholder="10.1000/xyz123"
                          value={formData.doi}
                          onChange={(e) => updateField('doi', e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {/* Website specific */}
                  {formData.type === 'website' && (
                    <>
                      <div className="col-span-2 space-y-2">
                        <Label>Website Name</Label>
                        <Input
                          placeholder="Website name"
                          value={formData.websiteName}
                          onChange={(e) => updateField('websiteName', e.target.value)}
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>URL</Label>
                        <Input
                          placeholder="https://..."
                          value={formData.url}
                          onChange={(e) => updateField('url', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Access Date</Label>
                        <Input
                          placeholder="1 January 2024"
                          value={formData.accessDate}
                          onChange={(e) => updateField('accessDate', e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {/* Thesis specific */}
                  {formData.type === 'thesis' && (
                    <>
                      <div className="space-y-2">
                        <Label>University</Label>
                        <Input
                          placeholder="University name"
                          value={formData.university}
                          onChange={(e) => updateField('university', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Thesis Type</Label>
                        <Input
                          placeholder="PhD, Master's"
                          value={formData.thesisType}
                          onChange={(e) => updateField('thesisType', e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {/* Conference specific */}
                  {formData.type === 'conference' && (
                    <>
                      <div className="col-span-2 space-y-2">
                        <Label>Conference Name</Label>
                        <Input
                          placeholder="Conference name"
                          value={formData.conference}
                          onChange={(e) => updateField('conference', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          placeholder="City, Country"
                          value={formData.location}
                          onChange={(e) => updateField('location', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Pages</Label>
                        <Input
                          placeholder="45-67"
                          value={formData.pages}
                          onChange={(e) => updateField('pages', e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Preview */}
                {formData.authors && formData.title && (
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4 space-y-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">In-text citation preview</Label>
                        <p className="text-sm font-mono bg-background p-2 rounded border mt-1">
                          {formatInlineCitation(previewCitation, style, existingCitations.length)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Bibliography entry preview</Label>
                        <p className="text-sm bg-background p-2 rounded border mt-1 break-words">
                          {formatBibliographyEntry(previewCitation, style, existingCitations.length)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>

            <div className="flex justify-end gap-2 pt-4 border-t mt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleInsertNew}>
                Insert Citation
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="existing" className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[450px]">
              <div className="space-y-3 pr-4">
                {existingCitations.map((citation, index) => (
                  <Card key={citation.id} className="hover:border-primary/50 transition-colors">
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {sourceTypeIcons[citation.type]}
                            <span className="text-xs text-muted-foreground">
                              {getSourceTypeDisplayName(citation.type)}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {style === 'vancouver' || style === 'ieee' ? `[${index + 1}]` : `${citation.year}`}
                            </Badge>
                          </div>
                          <p className="font-medium text-sm truncate">{citation.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{citation.authors}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopyBibliography(citation, index)}
                          >
                            {copiedId === citation.id ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleInsertExisting(citation, index)}
                          >
                            Insert
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground border-t pt-2 break-words">
                        {formatBibliographyEntry(citation, style, index)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
