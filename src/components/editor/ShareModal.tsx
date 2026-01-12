import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Share2, UserPlus, X, Crown, Pencil, Eye, Loader2 } from 'lucide-react';
import { Collaborator } from '@/hooks/use-collaboration';
import { SchoolNamePrompt, getSchoolName } from '@/components/prompts/SchoolNamePrompt';

interface ShareModalProps {
  isOwner: boolean;
  collaborators: Collaborator[];
  documentTitle?: string;
  onAddCollaborator: (email: string, role: 'editor' | 'viewer', documentTitle?: string) => Promise<boolean>;
  onRemoveCollaborator: (collabId: string) => Promise<boolean>;
  onUpdateRole: (collabId: string, role: 'editor' | 'viewer') => Promise<boolean>;
  trigger?: React.ReactNode;
}

export function ShareModal({
  isOwner,
  collaborators,
  documentTitle,
  onAddCollaborator,
  onRemoveCollaborator,
  onUpdateRole,
  trigger,
}: ShareModalProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'editor' | 'viewer'>('editor');
  const [isLoading, setIsLoading] = useState(false);
  const [showSchoolPrompt, setShowSchoolPrompt] = useState(false);
  const [hasSchoolName, setHasSchoolName] = useState(false);

  // Check if user has school name when opening
  useEffect(() => {
    if (open) {
      const schoolName = getSchoolName();
      if (!schoolName) {
        // Delay showing the prompt to avoid jarring experience
        setTimeout(() => setShowSchoolPrompt(true), 500);
      } else {
        setHasSchoolName(true);
      }
    }
  }, [open]);

  const handleAddCollaborator = async () => {
    if (!email.trim()) return;
    
    setIsLoading(true);
    const success = await onAddCollaborator(email.trim(), role, documentTitle);
    setIsLoading(false);
    
    if (success) {
      setEmail('');
    }
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return '??';
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-3 w-3" />;
      case 'editor':
        return <Pencil className="h-3 w-3" />;
      case 'viewer':
        return <Eye className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getRoleBadgeVariant = (role: string): 'default' | 'secondary' | 'outline' => {
    switch (role) {
      case 'owner':
        return 'default';
      case 'editor':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Document</DialogTitle>
          <DialogDescription>
            Invite others to collaborate on this document in real-time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Add collaborator form */}
          {isOwner && (
            <div className="space-y-3">
              <Label>Invite by email</Label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="colleague@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCollaborator()}
                  className="flex-1"
                />
                <Select value={role} onValueChange={(v) => setRole(v as 'editor' | 'viewer')}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleAddCollaborator} disabled={isLoading || !email.trim()}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <UserPlus className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Collaborators list */}
          <div className="space-y-2">
            <Label>People with access</Label>
            <ScrollArea className="h-[200px] rounded-md border p-2">
              {collaborators.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No collaborators yet. Invite someone to get started!
                </div>
              ) : (
                <div className="space-y-2">
                  {collaborators.map((collab) => (
                    <div
                      key={collab.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback 
                              className="text-xs"
                              style={{ backgroundColor: collab.color || '#888' }}
                            >
                              {getInitials(collab.name, collab.email)}
                            </AvatarFallback>
                          </Avatar>
                          {collab.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {collab.name || collab.email}
                          </span>
                          {collab.name && (
                            <span className="text-xs text-muted-foreground">
                              {collab.email}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isOwner && collab.role !== 'owner' ? (
                          <>
                            <Select
                              value={collab.role}
                              onValueChange={(v) => onUpdateRole(collab.id, v as 'editor' | 'viewer')}
                            >
                              <SelectTrigger className="w-[90px] h-7 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 opacity-0 group-hover:opacity-100"
                              onClick={() => onRemoveCollaborator(collab.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </>
                        ) : (
                          <Badge variant={getRoleBadgeVariant(collab.role)} className="gap-1">
                            {getRoleIcon(collab.role)}
                            {collab.role}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Permissions info */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Editor:</strong> Can view and edit the document</p>
            <p><strong>Viewer:</strong> Can only view the document</p>
          </div>
        </div>
      </DialogContent>
      
      {/* Prompt for school name when sharing */}
      <SchoolNamePrompt
        open={showSchoolPrompt}
        onOpenChange={setShowSchoolPrompt}
        onComplete={() => setHasSchoolName(true)}
      />
    </Dialog>
  );
}
