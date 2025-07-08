
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Story = Tables<'stories'> & {
  profiles?: {
    full_name: string | null;
  } | null;
  communities?: {
    name: string;
  } | null;
};

export type NewStory = TablesInsert<'stories'>;

export const useStories = () => {
  return useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      // First, get all stories
      const { data: stories, error: storiesError } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (storiesError) throw storiesError;

      if (!stories || stories.length === 0) {
        return [];
      }

      // Get unique user IDs and community IDs for batch fetching
      const userIds = [...new Set(stories.map(story => story.user_id).filter(Boolean))];
      const communityIds = [...new Set(stories.map(story => story.community_id).filter(Boolean))];

      // Fetch profiles for all users
      let profilesMap = new Map();
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', userIds);
        
        if (profiles) {
          profiles.forEach(profile => {
            profilesMap.set(profile.id, profile);
          });
        }
      }

      // Fetch communities
      let communitiesMap = new Map();
      if (communityIds.length > 0) {
        const { data: communities } = await supabase
          .from('communities')
          .select('id, name')
          .in('id', communityIds);
        
        if (communities) {
          communities.forEach(community => {
            communitiesMap.set(community.id, community);
          });
        }
      }

      // Combine data
      const transformedData = stories.map(story => ({
        ...story,
        profiles: profilesMap.get(story.user_id) || null,
        communities: story.community_id ? communitiesMap.get(story.community_id) || null : null,
      }));

      return transformedData as Story[];
    },
  });
};

export const useCreateStory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (story: NewStory) => {
      const { data, error } = await supabase
        .from('stories')
        .insert(story)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      toast({
        title: "Success",
        description: "Your story has been shared successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to share your story. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useUploadFile = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ file, path }: { file: File; path: string }) => {
      const { data, error } = await supabase.storage
        .from('stories')
        .upload(path, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('stories')
        .getPublicUrl(path);

      return publicUrl;
    },
    onError: (error) => {
      toast({
        title: "Upload Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    },
  });
};
