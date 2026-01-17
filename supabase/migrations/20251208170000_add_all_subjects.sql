-- Add all missing subject values to subject_type enum
-- This adds the complete IB DP subject list

-- Group 1: Studies in Language and Literature
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'lang_a_literature';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'lang_a_lang_lit';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'literature_performance';

-- Group 2: Classical Languages
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'latin';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'classical_greek';

-- Group 2: Language Ab Initio
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'arabic_ab';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'chinese_ab';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'french_ab';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'german_ab';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'hindi_ab';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'japanese_ab';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'korean_ab';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'portuguese_ab';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'russian_ab';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'spanish_ab';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'other_ab';

-- Group 2: Language B (additional)
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'english_b';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'german_b';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'italian_b';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'japanese_b';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'mandarin_b';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'other_b';

-- Group 3: Individuals and Societies (additional)
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'digital_society';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'global_politics';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'philosophy';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'psychology';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'social_cultural_anthropology';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'world_religions';

-- Group 4: Sciences (additional)
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'computer_science';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'design_technology';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'ess';

-- Group 6: The Arts (additional)
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'music';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'theatre';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'dance';
ALTER TYPE subject_type ADD VALUE IF NOT EXISTS 'film';

-- Also update task_type enum for ToK
ALTER TYPE task_type ADD VALUE IF NOT EXISTS 'tok_essay';
ALTER TYPE task_type ADD VALUE IF NOT EXISTS 'tok_exhibition';
