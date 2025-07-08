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
      const { data, error } = await supabase
        .from('stories')
        .select(`
          *,
          profiles(full_name),
          communities(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our Story type
      const transformedData = data?.map(story => ({
        ...story,
        profiles: Array.isArray(story.profiles) ? story.profiles[0] : story.profiles,
        communities: Array.isArray(story.communities) ? story.communities[0] : story.communities,
      })) || [];

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
