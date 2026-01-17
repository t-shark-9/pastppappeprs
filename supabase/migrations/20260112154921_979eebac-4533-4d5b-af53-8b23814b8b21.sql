-- Allow service role to upload to grading-guides bucket (for dashboard/manual uploads)
CREATE POLICY "Service role can manage grading guides" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'grading-guides')
WITH CHECK (bucket_id = 'grading-guides');

-- Also create past-papers bucket if it doesn't exist for past papers
INSERT INTO storage.buckets (id, name, public)
VALUES ('past-papers', 'past-papers', true)
ON CONFLICT (id) DO NOTHING;

-- Allow service role to manage past-papers bucket
CREATE POLICY "Service role can manage past papers" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'past-papers')
WITH CHECK (bucket_id = 'past-papers');