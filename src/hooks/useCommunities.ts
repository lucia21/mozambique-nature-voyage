import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

export type Community = Tables<'communities'> & {
  stories?: Tables<'stories'>[];
  community_members?: Tables<'community_members'>[];
  _count?: {
    stories: number;
    community_members: number;
  };
};

export const useCommunities = () => {
  return useQuery({
    queryKey: ['communities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communities')
        .select(`
          *,
          stories(*),
          community_members(*)
        `);

      if (error) throw error;
      
      // Transform data to include counts
      const communitiesWithCounts = data.map(community => ({
        ...community,
        _count: {
          stories: community.stories?.length || 0,
          community_members: community.community_members?.length || 0,
        }
      }));
      
      return communitiesWithCounts as Community[];
    },
  });
};

export const useCommunity = (id: string) => {
  return useQuery({
    queryKey: ['community', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communities')
        .select(`
          *,
          stories(*),
          community_members(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Community;
    },
  });
};

export const useJoinCommunity = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ communityId, userId }: { communityId: string; userId: string }) => {
      const { data, error } = await supabase
        .from('community_members')
        .insert({ community_id: communityId, user_id: userId })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
      queryClient.invalidateQueries({ queryKey: ['community'] });
      toast({
        title: "Joined Community",
        description: "You have successfully joined the community!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join community.",
        variant: "destructive",
      });
    },
  });
};

export const useLeaveCommunity = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ communityId, userId }: { communityId: string; userId: string }) => {
      const { error } = await supabase
        .from('community_members')
        .delete()
        .eq('community_id', communityId)
        .eq('user_id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
      queryClient.invalidateQueries({ queryKey: ['community'] });
      toast({
        title: "Left Community",
        description: "You have left the community.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to leave community.",
        variant: "destructive",
      });
    },
  });
};
