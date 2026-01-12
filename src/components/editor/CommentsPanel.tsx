import { useState, useEffect } from 'react';
import { MessageSquare, Send, Check, MoreHorizontal, Trash2, Edit2, Reply, CheckCircle, Circle, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useDraftComments, DraftComment } from '@/hooks/use-draft-comments';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';

interface CommentsPanelProps {
  draftId?: string;
  selectedBlockId?: string | null;
  selectedText?: string | null;
  onBlockSelect?: (blockId: string) => void;
  onHighlightBlock?: (blockId: string) => void;
}

function CommentItem({ 
  comment, 
  onReply, 
  onEdit, 
  onDelete, 
  onToggleResolve,
  onBlockClick,
  isReply = false,
  currentUserId,
  isHighlighted = false,
}: {
  comment: DraftComment;
  onReply: (commentId: string) => void;
  onEdit: (comment: DraftComment) => void;
  onDelete: (commentId: string) => void;
  onToggleResolve: (commentId: string, resolved: boolean) => void;
  onBlockClick: (blockId: string) => void;
  isReply?: boolean;
  currentUserId?: string;
  isHighlighted?: boolean;
}) {
  const [showReplies, setShowReplies] = useState(true);
  const isOwner = currentUserId === comment.user_id;
  const initials = (comment.user_name || 'A').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const timeAgo = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true });

  return (
    <div className={cn(
      "group",
      isReply ? "ml-6 pl-4 border-l-2 border-border" : "",
      comment.resolved ? "opacity-60" : "",
      isHighlighted ? "ring-2 ring-primary ring-offset-2 rounded-lg" : ""
    )}>
      <div 
        className={cn(
          "flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer",
          isHighlighted ? "bg-primary/10" : ""
        )}
        onClick={() => onBlockClick(comment.block_id)}
      >
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="text-xs bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm truncate">{comment.user_name}</span>
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
            {comment.resolved && (
              <span className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Resolved
              </span>
            )}
          </div>

          {comment.quoted_text && (
            <div 
              className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded border-l-2 border-primary/50 mb-2"
            >
              "{comment.quoted_text.slice(0, 100)}{comment.quoted_text.length > 100 ? '...' : ''}"
            </div>
          )}

          <p className="text-sm whitespace-pre-wrap">{comment.content}</p>

          <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onReply(comment.id);
                }}
              >
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}

            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleResolve(comment.id, !comment.resolved);
                }}
              >
                {comment.resolved ? (
                  <>
                    <Circle className="h-3 w-3 mr-1" />
                    Reopen
                  </>
                ) : (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Resolve
                  </>
                )}
              </Button>
            )}

            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => onEdit(comment)}>
                    <Edit2 className="h-3 w-3 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(comment.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-1">
          <button
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground ml-3 mb-1"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
          </button>
          {showReplies && comment.replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleResolve={onToggleResolve}
              onBlockClick={onBlockClick}
              isReply
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentsPanel({ draftId, selectedBlockId, selectedText, onBlockSelect, onHighlightBlock }: CommentsPanelProps) {
  const { user } = useAuth();
  const { 
    comments, 
    loading, 
    addComment, 
    updateComment, 
    deleteComment, 
    toggleResolve,
  } = useDraftComments({ draftId: draftId || null });

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<DraftComment | null>(null);
  const [showResolved, setShowResolved] = useState(false);
  const [highlightedBlockId, setHighlightedBlockId] = useState<string | null>(null);

  // Show all comments, sorted by creation date
  const displayComments = [...comments].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Filter by resolved status
  const filteredComments = showResolved 
    ? displayComments 
    : displayComments.filter(c => !c.resolved);

  const unresolvedCount = comments.filter(c => !c.resolved).length;
  const resolvedCount = comments.filter(c => c.resolved).length;

  const targetBlockId = selectedBlockId ?? null;
  const hasSelection = !!(selectedText && selectedText.trim().length > 0);
  const showNewCommentBox = !replyingTo && !editingComment;

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    if (editingComment) {
      await updateComment(editingComment.id, newComment);
      setEditingComment(null);
      setNewComment('');
      return;
    }

    if (replyingTo) {
      const parentComment = comments.find(c => c.id === replyingTo);
      if (parentComment) {
        await addComment(parentComment.block_id, newComment, undefined, replyingTo);
      }
      setReplyingTo(null);
      setNewComment('');
      return;
    }

    if (!targetBlockId) return;

    await addComment(
      targetBlockId,
      newComment,
      hasSelection ? (selectedText || undefined) : undefined
    );

    setNewComment('');
  };

  const handleBlockClick = (blockId: string) => {
    setHighlightedBlockId(blockId);
    onHighlightBlock?.(blockId);
    
    // Remove highlight after 2 seconds
    setTimeout(() => {
      setHighlightedBlockId(null);
    }, 2000);
  };

  if (!draftId) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-3 border-b">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Comments
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Save your draft to enable comments.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-3 border-b">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Comments
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Sign in to view and add comments.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-3 border-b">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Comments
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Comments
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{unresolvedCount} open</span>
            {resolvedCount > 0 && (
              <button
                className="hover:text-foreground"
                onClick={() => setShowResolved(!showResolved)}
              >
                {showResolved ? 'Hide' : 'Show'} {resolvedCount} resolved
              </button>
            )}
          </div>
        </div>
        
        {/* Selection indicator */}
        {hasSelection && (
          <div className="text-xs bg-primary/10 text-primary px-2 py-1.5 rounded border border-primary/20 flex items-center gap-2">
            <span className="flex-1 truncate">
              Selected: "{selectedText?.slice(0, 50)}{(selectedText?.length || 0) > 50 ? '...' : ''}"
            </span>
          </div>
        )}
      </div>

      {/* Add Comment Section */}
      {showNewCommentBox && (
        <div className="p-3 border-b bg-muted/30 shrink-0">
          {!targetBlockId && (
            <p className="text-xs text-muted-foreground mb-2">
              Click inside the editor to choose where your comment should attach.
            </p>
          )}

          <div className="flex gap-2">
            <Textarea
              placeholder={
                hasSelection
                  ? 'Add a comment on the selected text...'
                  : 'Add a comment...'
              }
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[60px] text-sm resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleSubmit();
                }
                if (e.key === 'Escape') {
                  setNewComment('');
                }
              }}
            />
            <div className="flex flex-col gap-1">
              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={!targetBlockId || !newComment.trim()}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            ⌘+Enter to submit • Esc to clear
          </p>
        </div>
      )}

      {/* Comments List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredComments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">
                {targetBlockId
                  ? (hasSelection
                      ? 'Add a comment on the selected text above.'
                      : 'Add a comment above (it will attach to the current paragraph).')
                  : 'Click inside the editor to attach a comment.'}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredComments.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onReply={setReplyingTo}
                  onEdit={(c) => {
                    setEditingComment(c);
                    setNewComment(c.content);
                  }}
                  onDelete={deleteComment}
                  onToggleResolve={toggleResolve}
                  onBlockClick={handleBlockClick}
                  currentUserId={user?.id}
                  isHighlighted={highlightedBlockId === comment.block_id}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Reply/Edit Input */}
      {(replyingTo || editingComment) && (
        <div className="p-3 border-t bg-muted/30 shrink-0">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>
              {editingComment ? 'Editing comment' : 'Replying to comment'}
            </span>
            <button
              className="hover:text-foreground"
              onClick={() => {
                setReplyingTo(null);
                setEditingComment(null);
                setNewComment('');
              }}
            >
              Cancel
            </button>
          </div>
          <div className="flex gap-2">
            <Textarea
              placeholder={
                editingComment 
                  ? 'Edit your comment...'
                  : 'Write a reply...'
              }
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[60px] text-sm resize-none"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleSubmit();
                }
              }}
            />
            <Button
              size="icon"
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            ⌘+Enter to submit
          </p>
        </div>
      )}
    </div>
  );
}