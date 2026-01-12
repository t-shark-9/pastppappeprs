-- Add preferred_language column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferred_language TEXT;

-- Add comment
COMMENT ON COLUMN profiles.preferred_language IS 'User preferred language override (if null, auto-detect from school_program)';
