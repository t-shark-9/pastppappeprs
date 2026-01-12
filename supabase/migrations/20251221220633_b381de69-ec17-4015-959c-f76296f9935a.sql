-- Add education_type and school_program columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS education_type text,
ADD COLUMN IF NOT EXISTS school_program text;

-- Update the handle_new_user function to store these fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles with education fields
  INSERT INTO public.profiles (id, full_name, education_type, school_program)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'education_type',
    new.raw_user_meta_data->>'school_program'
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