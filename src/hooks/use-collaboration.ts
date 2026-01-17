import { useState, useEffect, useCallback, useRef } from 'react';
import * as Y from 'yjs';
import { supabase } from '@/integrations/supabase/client';
import { SupabaseProvider, UserPresence } from '@/lib/supabase-yjs-provider';
import { toast } from 'sonner';

export interface Collaborator {
  id: string;
  user_id: string;
  email: string;
  name?: string;
  role: 'owner' | 'editor' | 'viewer';
  isOnline?: boolean;
  color?: string;
}

export interface UseCollaborationOptions {
  documentType: 'draft' | 'note';
  documentId: string;
  enabled?: boolean;
}

export interface UseCollaborationReturn {
  // Yjs document for collaboration
  ydoc: Y.Doc | null;
  provider: SupabaseProvider | null;
  
  // Collaboration state
  isConnected: boolean;
  isSynced: boolean;
  activeUsers: UserPresence[];
  collaborators: Collaborator[];
  isOwner: boolean;
  canEdit: boolean;
  
  // Actions
  addCollaborator: (email: string, role: 'editor' | 'viewer', documentTitle?: string) => Promise<boolean>;
  removeCollaborator: (userId: string) => Promise<boolean>;
  updateCollaboratorRole: (userId: string, role: 'editor' | 'viewer') => Promise<boolean>;
  loadCollaborators: () => Promise<void>;
}

export function useCollaboration({
  documentType,
  documentId,
  enabled = true,
}: UseCollaborationOptions): UseCollaborationReturn {
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<SupabaseProvider | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [activeUsers, setActiveUsers] = useState<UserPresence[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  const providerRef = useRef<SupabaseProvider | null>(null);

  // Initialize Yjs and provider
  useEffect(() => {
    if (!enabled || !documentId) return;

    const doc = new Y.Doc();
    setYdoc(doc);

    const newProvider = new SupabaseProvider({
      documentType,
      documentId,
      doc,
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

  // Check ownership and permissions, and ensure owner is registered as collaborator
  useEffect(() => {
    const checkPermissions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      setCurrentUserId(user.id);

      let userIsOwner = false;

      // Check if user is owner
      if (documentType === 'draft') {
        const { data: draft } = await supabase
          .from('drafts')
          .select('assignment_id')
          .eq('id', documentId)
          .single();
        
        if (draft) {
          const { data: assignment } = await supabase
            .from('assignments')
            .select('user_id')
            .eq('id', draft.assignment_id)
            .single();
          
          if (assignment?.user_id === user.id) {
            userIsOwner = true;
          }
        }
      } else if (documentType === 'note') {
        const { data: note } = await (supabase as any)
          .from('notes')
          .select('user_id')
          .eq('id', documentId)
          .single();
        
        if (note?.user_id === user.id) {
          userIsOwner = true;
        }
      }

      if (userIsOwner) {
        setIsOwner(true);
        setCanEdit(true);

        // Ensure owner is registered in document_collaborators
        const { data: existingOwnerRecord } = await (supabase as any)
          .from('document_collaborators')
          .select('id')
          .eq('document_type', documentType)
          .eq('document_id', documentId)
          .eq('user_id', user.id)
          .eq('role', 'owner')
          .maybeSingle();

        if (!existingOwnerRecord) {
          await (supabase as any)
            .from('document_collaborators')
            .insert({
              document_type: documentType,
              document_id: documentId,
              user_id: user.id,
              role: 'owner',
            });
        }
        return;
      }

      // Check collaborator role
      const { data: collab } = await (supabase as any)
        .from('document_collaborators')
        .select('role')
        .eq('document_type', documentType)
        .eq('document_id', documentId)
        .eq('user_id', user.id)
        .single();

      if (collab) {
        setCanEdit(collab.role === 'editor' || collab.role === 'owner');
      }
    };

    if (documentId) {
      checkPermissions();
    }
  }, [documentType, documentId]);

  // Load collaborators
  const loadCollaborators = useCallback(async () => {
    if (!documentId) return;

    try {
      const { data, error } = await (supabase as any)
        .from('document_collaborators')
        .select(`
          id,
          user_id,
          role,
          invited_email
        `)
        .eq('document_type', documentType)
        .eq('document_id', documentId);

      if (error) throw error;

      // Get user profiles for collaborators
      const collaboratorsWithProfiles: Collaborator[] = await Promise.all(
        (data || []).map(async (collab: any) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', collab.user_id)
            .single();

          // Removed: auth.admin?.getUserById() requires service-role key which is not accessible client-side
          const authUser = null;

          return {
            id: collab.id,
            user_id: collab.user_id,
            email: collab.invited_email || authUser?.user?.email || 'Unknown',
            name: profile?.full_name || undefined,
            role: collab.role as 'owner' | 'editor' | 'viewer',
            isOnline: activeUsers.some(u => u.id === collab.user_id),
          };
        })
      );

      setCollaborators(collaboratorsWithProfiles);
    } catch (error) {
      console.error('Failed to load collaborators:', error);
    }
  }, [documentType, documentId, activeUsers]);

  // Add collaborator
  const addCollaborator = useCallback(async (email: string, role: 'editor' | 'viewer', documentTitle?: string): Promise<boolean> => {
    if (!documentId || !isOwner) {
      toast.error('Only the owner can add collaborators');
      return false;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Look up if invited email belongs to existing user via auth admin API is not available
      // So we'll set user_id to null and rely on invited_email for the invitation
      // The invited user will be linked when they accept the invitation
      
      const { error } = await (supabase as any)
        .from('document_collaborators')
        .insert({
          document_type: documentType,
          document_id: documentId,
          user_id: null, // Set to null - will be updated when invited user accepts
          role,
          invited_by: user?.id,
          invited_email: email.toLowerCase(),
        });

      if (error) {
        if (error.code === '23505') {
          toast.error('This user is already a collaborator');
        } else {
          throw error;
        }
        return false;
      }

      // Send invitation email via edge function
      try {
        const { error: emailError } = await supabase.functions.invoke('send-collaboration-invite', {
          body: {
            email,
            documentId,
            documentType,
            permission: role,
            documentTitle: documentTitle || 'Untitled Document',
          },
        });

        if (emailError) {
          console.error('Failed to send invitation email:', emailError);
          toast.success(`Added ${email} as ${role} (email notification failed)`);
        } else {
          toast.success(`Invitation sent to ${email}`);
        }
      } catch (emailErr) {
        console.error('Failed to send invitation email:', emailErr);
        toast.success(`Added ${email} as ${role} (email notification failed)`);
      }

      await loadCollaborators();
      return true;
    } catch (error) {
      console.error('Failed to add collaborator:', error);
      toast.error('Failed to add collaborator');
      return false;
    }
  }, [documentType, documentId, isOwner, loadCollaborators]);

  // Remove collaborator
  const removeCollaborator = useCallback(async (collabId: string): Promise<boolean> => {
    if (!documentId || !isOwner) {
      toast.error('Only the owner can remove collaborators');
      return false;
    }

    try {
      const { error } = await (supabase as any)
        .from('document_collaborators')
        .delete()
        .eq('id', collabId);

      if (error) throw error;

      toast.success('Collaborator removed');
      await loadCollaborators();
      return true;
    } catch (error) {
      console.error('Failed to remove collaborator:', error);
      toast.error('Failed to remove collaborator');
      return false;
    }
  }, [documentId, isOwner, loadCollaborators]);

  // Update collaborator role
  const updateCollaboratorRole = useCallback(async (collabId: string, role: 'editor' | 'viewer'): Promise<boolean> => {
    if (!documentId || !isOwner) {
      toast.error('Only the owner can change roles');
      return false;
    }

    try {
      const { error } = await (supabase as any)
        .from('document_collaborators')
        .update({ role })
        .eq('id', collabId);

      if (error) throw error;

      toast.success('Role updated');
      await loadCollaborators();
      return true;
    } catch (error) {
      console.error('Failed to update role:', error);
      toast.error('Failed to update role');
      return false;
    }
  }, [documentId, isOwner, loadCollaborators]);

  // Load collaborators on mount
  useEffect(() => {
    if (documentId) {
      loadCollaborators();
    }
  }, [documentId, loadCollaborators]);

  // Subscribe to collaborator changes
  useEffect(() => {
    if (!documentId) return;

    const channel = supabase
      .channel(`collaborators:${documentType}:${documentId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'document_collaborators',
          filter: `document_id=eq.${documentId}`,
        },
        () => {
          loadCollaborators();
        }
      )
      .subscribe();

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
    loadCollaborators,
  };
}
