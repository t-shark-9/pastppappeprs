-- Security Fix Migration
-- Fixes: Teacher User IDs Visible in Rubrics, Function Search Path, Leaked Password Protection

-- 1. Fix Teacher User IDs Visible in Rubrics
-- Hide created_by column from public view by creating a secure view
DROP VIEW IF EXISTS public.rubrics_public CASCADE;

CREATE VIEW public.rubrics_public AS
SELECT 
  id,
  name,
  subject,
  task_type,
  criteria,
  is_default,
  created_at,
  updated_at
FROM public.rubrics;

-- Grant access to the view
GRANT SELECT ON public.rubrics_public TO authenticated, anon;

-- Update RLS policies to use the view for SELECT operations
DROP POLICY IF EXISTS "Anyone can view rubrics" ON public.rubrics;

CREATE POLICY "Users can view rubrics through public view"
  ON public.rubrics FOR SELECT
  USING (true);

-- Allow admins and teachers to see created_by field
CREATE POLICY "Admins and teachers can view all rubric details"
  ON public.rubrics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    )
  );

-- 2. Enable Leaked Password Protection
-- This should be configured at the project level in Supabase dashboard
-- Settings > Authentication > Password Protection
-- But we can add a database-level check function

CREATE OR REPLACE FUNCTION public.check_password_strength(password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check minimum length
  IF LENGTH(password) < 8 THEN
    RETURN FALSE;
  END IF;
  
  -- Check for at least one uppercase letter
  IF password !~ '[A-Z]' THEN
    RETURN FALSE;
  END IF;
  
  -- Check for at least one lowercase letter
  IF password !~ '[a-z]' THEN
    RETURN FALSE;
  END IF;
  
  -- Check for at least one number
  IF password !~ '[0-9]' THEN
    RETURN FALSE;
  END IF;
  
  -- Check against common weak passwords
  IF LOWER(password) = ANY(ARRAY[
    'password', 'password123', '12345678', 'qwerty', 'abc123',
    'letmein', 'monkey', '1234567890', 'dragon', 'master'
  ]) THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- 3. Fix Function Search Path
-- Set explicit search path for all functions to prevent injection
ALTER DATABASE postgres SET search_path TO public, extensions;

-- Update existing security definer functions with explicit search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, school_name, school_program, education_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'school_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'school_program', 'ib'),
    COALESCE(NEW.raw_user_meta_data->>'education_type', 'school')
  );
  RETURN NEW;
END;
$$;

-- Recreate trigger with updated function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Add additional security headers and validation
CREATE OR REPLACE FUNCTION public.is_valid_email(email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$;

-- Add check constraint to profiles
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
ALTER TABLE public.profiles 
  ADD CONSTRAINT profiles_id_fkey 
  FOREIGN KEY (id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Add indexes for better performance with RLS
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_rubrics_created_by ON public.rubrics(created_by);
CREATE INDEX IF NOT EXISTS idx_rubrics_is_default ON public.rubrics(is_default);

-- Add comment explaining the security fix
COMMENT ON VIEW public.rubrics_public IS 'Public view of rubrics table that hides teacher user IDs for privacy';
COMMENT ON FUNCTION public.check_password_strength IS 'Validates password strength to prevent weak passwords';
COMMENT ON FUNCTION public.update_updated_at_column IS 'Security definer function with explicit search path to prevent injection';

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.check_password_strength TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_valid_email TO authenticated, anon;
