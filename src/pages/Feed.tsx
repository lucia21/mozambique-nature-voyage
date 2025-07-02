
import { useStories } from '@/hooks/useStories';
import CommunityStoryCard from '@/components/CommunityStoryCard';
import Header from '@/components/Header';
import { Loader2 } from 'lucide-react';

const Feed = () => {
  const { data: stories, isLoading, error } = useStories();

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

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Stories</h2>
            <p className="text-muted-foreground">Please try refreshing the page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Community Stories</h1>
          <p className="text-muted-foreground">
            Discover and connect with stories from communities across Moçambique
          </p>
        </div>

        {stories && stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <CommunityStoryCard
                key={story.id}
                story={{
                  id: parseInt(story.id),
                  title: story.title,
                  community: story.communities?.name || story.location || 'Unknown',
                  province: story.province || '',
                  author: story.profiles?.full_name || 'Anonymous',
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
            <h2 className="text-2xl font-semibold mb-2">No Stories Yet</h2>
            <p className="text-muted-foreground mb-4">
              Be the first to share a story from your community!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
