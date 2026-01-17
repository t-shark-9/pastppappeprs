-- Enable pg_cron extension (must be done by superuser, enabled via Supabase dashboard extensions)
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;

-- Enable pg_net extension for HTTP requests from cron jobs
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;