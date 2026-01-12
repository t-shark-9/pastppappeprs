import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface DraftComment {
  id: string;
  draft_id: string;
  block_id: string;
  user_id: string;
  content: string;
  quoted_text: string | null;
  resolved: boolean;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined data
  user_name?: string;
  replies?: DraftComment[];
}

interface UseDraftCommentsProps {
  draftId: string | null;
}

export function useDraftComments({ draftId }: UseDraftCommentsProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<DraftComment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch comments for the draft
  const fetchComments = useCallback(async () => {
    if (!draftId) {
      setComments([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('draft_comments')
        .select('*')
        .eq('draft_id', draftId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Get user profiles for names
      const userIds = [...new Set((data || []).map(c => c.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p.full_name]) || []);

      // Organize into threads (parent comments with replies)
      const commentsWithNames = (data || []).map(c => ({
        ...c,
        user_name: profileMap.get(c.user_id) || 'Anonymous',
      })) as DraftComment[];

      // Separate parent comments and replies
      const parentComments = commentsWithNames.filter(c => !c.parent_id);
      const replies = commentsWithNames.filter(c => c.parent_id);

      // Attach replies to their parents
      const threaded = parentComments.map(parent => ({
        ...parent,
        replies: replies.filter(r => r.parent_id === parent.id),
      }));

      setComments(threaded);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  }, [draftId]);

  // Add a new comment
  const addComment = useCallback(async (
    blockId: string, 
    content: string, 
    quotedText?: string,
    parentId?: string
  ) => {
    if (!draftId || !user) {
      toast.error('You must be logged in to comment');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('draft_comments')
        .insert({
          draft_id: draftId,
          block_id: blockId,
          user_id: user.id,
          content,
          quoted_text: quotedText || null,
          parent_id: parentId || null,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Comment added');
      await fetchComments();
      return data;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      return null;
    }
  }, [draftId, user, fetchComments]);

  // Update a comment
  const updateComment = useCallback(async (commentId: string, content: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('draft_comments')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('id', commentId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Comment updated');
      await fetchComments();
      return true;
    } catch (error) {
      console.error('Error updating comment:', error);
      toast.error('Failed to update comment');
      return false;
    }
  }, [user, fetchComments]);

  // Delete a comment
  const deleteComment = useCallback(async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('draft_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      toast.success('Comment deleted');
      await fetchComments();
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
      return false;
    }
  }, [fetchComments]);

  // Resolve/unresolve a comment
  const toggleResolve = useCallback(async (commentId: string, resolved: boolean) => {
    try {
      const { error } = await supabase
        .from('draft_comments')
        .update({ resolved })
        .eq('id', commentId);

      if (error) throw error;

      toast.success(resolved ? 'Comment resolved' : 'Comment reopened');
      await fetchComments();
      return true;
    } catch (error) {
      console.error('Error toggling resolve:', error);
      toast.error('Failed to update comment');
      return false;
    }
  }, [fetchComments]);

  // Get comments for a specific block
  const getBlockComments = useCallback((blockId: string) => {
    return comments.filter(c => c.block_id === blockId);
  }, [comments]);

  // Get block IDs that have comments
  const getCommentedBlockIds = useCallback(() => {
    return [...new Set(comments.map(c => c.block_id))];
  }, [comments]);

  // Subscribe to realtime updates
  useEffect(() => {
    if (!draftId) return;

    fetchComments();

    const channel = supabase
      .channel(`draft-comments-${draftId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'draft_comments',
          filter: `draft_id=eq.${draftId}`,
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [draftId, fetchComments]);

  return {
    comments,
    loading,
    addComment,
    updateComment,
    deleteComment,
    toggleResolve,
    getBlockComments,
    getCommentedBlockIds,
    refetch: fetchComments,
  };
}
