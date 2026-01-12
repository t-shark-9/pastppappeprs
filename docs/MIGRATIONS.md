# Database Migrations Required

This document outlines the database migrations that need to be applied to your Supabase project.

## 1. Add All IB Subjects to subject_type Enum

**Migration file:** `supabase/migrations/20251208170000_add_all_subjects.sql`

This migration adds all missing IB DP subjects to the `subject_type` enum, including:

### Group 1: Studies in Language and Literature
- `lang_a_literature`
- `lang_a_lang_lit`
- `literature_performance`

### Group 2: Language Acquisition
**Classical Languages:**
- `latin`
- `classical_greek`

**Ab Initio Languages:**
- `arabic_ab`, `chinese_ab`, `french_ab`, `german_ab`, `hindi_ab`
- `japanese_ab`, `korean_ab`, `portuguese_ab`, `russian_ab`, `spanish_ab`, `other_ab`

**Language B (additional):**
- `english_b`, `german_b`, `italian_b`, `japanese_b`, `mandarin_b`, `other_b`

### Group 3: Individuals and Societies
- `digital_society`
- `global_politics`
- `philosophy`
- `psychology`
- `social_cultural_anthropology`
- `world_religions`

### Group 4: Sciences
- `computer_science`
- `design_technology`
- `ess` (Environmental Systems and Societies)

### Group 6: The Arts
- `music`
- `theatre`
- `dance`
- `film`

### Task Types
- `tok_essay`
- `tok_exhibition`

## How to Apply Migrations

### Option 1: Using Supabase CLI (Recommended)

```bash
# Make sure you're logged in to Supabase
supabase login

# Link your project (if not already linked)
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations to remote database
supabase db push
```

### Option 2: Manual SQL Execution

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/20251208170000_add_all_subjects.sql`
4. Click **Run**

### Option 3: Using Supabase Migration Commands

```bash
# Create a new migration (if needed)
supabase migration new add_all_subjects

# Apply all pending migrations
supabase db push
```

## Verification

After applying the migration, verify that the new enum values are available:

```sql
SELECT enum_range(NULL::subject_type);
```

This should return all the subject types including the newly added ones.

## Rollback

PostgreSQL enums cannot easily have values removed. If you need to rollback, you would need to:

1. Create a new enum type with the desired values
2. Update all tables using the old enum to use the new one
3. Drop the old enum

This is generally not recommended for production environments.

## TypeScript Types

After applying the migration, you should regenerate your TypeScript types:

```bash
supabase gen types typescript --local > src/integrations/supabase/types.ts
```

Or if using remote database:

```bash
supabase gen types typescript --project-id YOUR_PROJECT_REF > src/integrations/supabase/types.ts
```

**Note:** The types in `src/integrations/supabase/types.ts` have already been manually updated to include the new subjects, but regenerating ensures they stay in sync with the database.

## Troubleshooting

### Error: "invalid input value for enum subject_type: latin"

This error means the migration hasn't been applied yet. The database doesn't recognize "latin" as a valid subject. Apply the migration using one of the methods above.

### Error: "enum value already exists"

The migration uses `IF NOT EXISTS` syntax, so re-running should be safe. However, if you get this error, the value was already added successfully.

### Error: "permission denied"

Make sure you have admin privileges on the Supabase project. You may need to run the migration as the postgres user through the Supabase dashboard.
