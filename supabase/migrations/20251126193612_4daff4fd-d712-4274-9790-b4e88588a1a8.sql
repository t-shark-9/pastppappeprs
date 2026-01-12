-- Add missing columns to plans table
ALTER TABLE plans ADD COLUMN IF NOT EXISTS coaching_response JSONB;
ALTER TABLE plans ADD COLUMN IF NOT EXISTS sections JSONB;