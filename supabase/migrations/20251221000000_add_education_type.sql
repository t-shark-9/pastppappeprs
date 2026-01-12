-- Add education_type column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS education_type TEXT,
ADD COLUMN IF NOT EXISTS school_program TEXT;

-- Update handle_new_user function to include new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles without role
  INSERT INTO public.profiles (id, full_name, school_name, education_type, school_program)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'school_name', ''),
    COALESCE(new.raw_user_meta_data->>'education_type', ''),
    COALESCE(new.raw_user_meta_data->>'school_program', '')
  );
  
  -- Insert role into user_roles table
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    new.id,
    COALESCE((new.raw_user_meta_data->>'role')::app_role, 'student'::app_role)
  );
  
  RETURN new;
END;
$$;
