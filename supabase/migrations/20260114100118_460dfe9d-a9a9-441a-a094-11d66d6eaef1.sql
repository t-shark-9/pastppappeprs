-- Create a new public bucket for raw paper uploads (no RLS issues)
INSERT INTO storage.buckets (id, name, public)
VALUES ('paper-uploads', 'paper-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload to this bucket
CREATE POLICY "Anyone can upload to paper-uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'paper-uploads');

-- Allow anyone to read from this bucket
CREATE POLICY "Anyone can read paper-uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'paper-uploads');