
-- Create communities table
CREATE TABLE public.communities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  banner_image TEXT,
  location TEXT,
  province TEXT,
  coordinates POINT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create stories table
CREATE TABLE public.stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  community_id UUID REFERENCES public.communities(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  language TEXT DEFAULT 'pt',
  image_url TEXT,
  audio_url TEXT,
  location TEXT,
  province TEXT,
  coordinates POINT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community_members table for user-community relationships
CREATE TABLE public.community_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, community_id)
);

-- Enable RLS on all tables
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;

-- RLS policies for communities
CREATE POLICY "Anyone can view communities"
  ON public.communities FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create communities"
  ON public.communities FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS policies for stories
CREATE POLICY "Anyone can view stories"
  ON public.stories FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own stories"
  ON public.stories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stories"
  ON public.stories FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS policies for community members
CREATE POLICY "Anyone can view community memberships"
  ON public.community_members FOR SELECT
  USING (true);

CREATE POLICY "Users can join communities"
  ON public.community_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave communities"
  ON public.community_members FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create storage bucket for story files
INSERT INTO storage.buckets (id, name, public) VALUES ('stories', 'stories', true);

-- Storage policies for stories bucket
CREATE POLICY "Anyone can view story files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'stories');

CREATE POLICY "Authenticated users can upload story files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'stories');

-- Insert sample communities
INSERT INTO public.communities (name, description, location, province) VALUES
('Maputo Centro', 'Historic center of Maputo with rich cultural heritage', 'Maputo Centro', 'Maputo'),
('Inhambane Traditions', 'Traditional crafts and music from Inhambane', 'Inhambane', 'Inhambane'),
('Tete Agriculture', 'Agricultural communities along the Zambezi River', 'Tete', 'Tete'),
('Nampula Crafts', 'Traditional pottery and weaving community', 'Nampula', 'Nampula');

-- Insert sample stories
INSERT INTO public.stories (user_id, title, description, category, location, province) VALUES
((SELECT id FROM auth.users LIMIT 1), 'Traditional Pottery Making', 'Ancient techniques passed down through generations', 'crafts', 'Nampula', 'Nampula'),
((SELECT id FROM auth.users LIMIT 1), 'Harvest Festival Dance', 'Annual celebration of the harvest season', 'celebrations', 'Tete', 'Tete'),
((SELECT id FROM auth.users LIMIT 1), 'Grandmother Stories', 'Wisdom shared by village elders', 'elder_wisdom', 'Inhambane', 'Inhambane');
