
import { useParams } from 'react-router-dom';
import { useCommunity, useJoinCommunity, useLeaveCommunity } from '@/hooks/useCommunities';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import CommunityStoryCard from '@/components/CommunityStoryCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Calendar, Loader2 } from 'lucide-react';
import { useState, useMemo } from 'react';

const CommunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: community, isLoading, error } = useCommunity(id!);
  const joinCommunity = useJoinCommunity();
  const leaveCommunity = useLeaveCommunity();

  const isMember = useMemo(() => {
    if (!user || !community?.community_members) return false;
    return community.community_members.some(member => member.user_id === user.id);
  }, [user, community]);

  const handleJoinLeave = async () => {
    if (!user || !community) return;

    if (isMember) {
      await leaveCommunity.mutateAsync({
        communityId: community.id,
        userId: user.id,
      });
    } else {
      await joinCommunity.mutateAsync({
        communityId: community.id,
        userId: user.id,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !community) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive mb-2">Community Not Found</h2>
            <p className="text-muted-foreground">The community you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Community Header */}
      <div className="relative">
        {community.banner_image ? (
          <div className="h-64 md:h-80 overflow-hidden">
            <img
              src={community.banner_image}
              alt={community.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ) : (
          <div className="h-64 md:h-80 bg-gradient-to-r from-primary/20 to-secondary/20" />
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{community.name}</h1>
                  {community.province && (
                    <Badge variant="secondary">{community.province}</Badge>
                  )}
                </div>
                {community.location && (
                  <div className="flex items-center gap-1 text-white/90">
                    <MapPin className="h-4 w-4" />
                    <span>{community.location}</span>
                  </div>
                )}
              </div>
              
              {user && (
                <Button
                  onClick={handleJoinLeave}
                  disabled={joinCommunity.isPending || leaveCommunity.isPending}
                  variant={isMember ? "outline" : "default"}
                  className={isMember ? "border-white text-white hover:bg-white hover:text-black" : ""}
                >
                  {joinCommunity.isPending || leaveCommunity.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isMember ? 'Leave Community' : 'Join Community'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Community Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {community.description || 'No description available.'}
                </p>
                
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>{community.community_members?.length || 0} members</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Created {new Date(community.created_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stories */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Community Stories</h2>
              <p className="text-muted-foreground">
                Stories shared by members of this community
              </p>
            </div>

            {community.stories && community.stories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {community.stories.map((story) => (
                  <CommunityStoryCard
                    key={story.id}
                    story={{
                      id: parseInt(story.id),
                      title: story.title,
                      community: community.name,
                      province: story.province || community.province || '',
                      author: 'Community Member',
                      description: story.description,
                      image: story.image_url || '/placeholder.svg',
                      category: story.category,
                      date: story.created_at,
                      coordinates: [0, 0] as [number, number],
                    }}
                    onLike={() => console.log('Liked story:', story.id)}
                    onConnect={() => console.log('Connect to:', story.id)}
                    onViewOnMap={() => console.log('View on map:', story.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No Stories Yet</h3>
                <p className="text-muted-foreground">
                  This community hasn't shared any stories yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
