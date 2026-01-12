-- Add deleted_at column to drafts table for soft delete functionality
ALTER TABLE public.drafts
ADD COLUMN deleted_at timestamp with time zone DEFAULT NULL;

-- Create index for faster queries filtering deleted drafts
CREATE INDEX idx_drafts_deleted_at ON public.drafts(deleted_at) WHERE deleted_at IS NULL;

-- Add comment explaining the soft delete pattern
COMMENT ON COLUMN public.drafts.deleted_at IS 'Timestamp when draft was moved to trash. NULL means not deleted.';