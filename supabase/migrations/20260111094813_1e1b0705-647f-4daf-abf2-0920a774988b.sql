-- Enable realtime for services table
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;

-- Enable realtime for blog_posts table
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;

-- Enable realtime for positions table
ALTER PUBLICATION supabase_realtime ADD TABLE public.positions;