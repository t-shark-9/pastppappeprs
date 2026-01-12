-- Drop the existing subject_type enum and recreate with new values
ALTER TYPE subject_type RENAME TO subject_type_old;

-- Create new subject_type enum with all IBDP subjects
CREATE TYPE subject_type AS ENUM (
  -- Core
  'tok',
  'ee',
  -- Group 1: Language and Literature
  'english_a',
  -- Group 2: Language Acquisition
  'french_b',
  'spanish_b',
  'swedish_b',
  -- Group 3: Individuals and Societies
  'business_management',
  'economics',
  'geography',
  'history',
  -- Group 4: Sciences
  'sehs',
  'physics',
  'biology',
  'chemistry',
  -- Group 5: Mathematics
  'math_aa',
  'math_ai',
  -- Group 6: Arts
  'visual_arts',
  'drama',
  -- Other
  'other'
);

-- Update assignments table to use new enum
ALTER TABLE assignments 
  ALTER COLUMN subject TYPE subject_type 
  USING (
    CASE subject::text
      WHEN 'lang_a' THEN 'english_a'::subject_type
      WHEN 'lang_b' THEN 'french_b'::subject_type
      WHEN 'math' THEN 'math_aa'::subject_type
      ELSE subject::text::subject_type
    END
  );

-- Update rubrics table to use new enum
ALTER TABLE rubrics 
  ALTER COLUMN subject TYPE subject_type 
  USING (
    CASE subject::text
      WHEN 'lang_a' THEN 'english_a'::subject_type
      WHEN 'lang_b' THEN 'french_b'::subject_type
      WHEN 'math' THEN 'math_aa'::subject_type
      ELSE subject::text::subject_type
    END
  );

-- Drop old enum
DROP TYPE subject_type_old;