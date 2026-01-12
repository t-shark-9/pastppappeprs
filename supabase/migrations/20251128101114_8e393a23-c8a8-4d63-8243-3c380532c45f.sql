-- Enable realtime for outlines table
ALTER PUBLICATION supabase_realtime ADD TABLE public.outlines;

-- Enable realtime for plans table
ALTER PUBLICATION supabase_realtime ADD TABLE public.plans;