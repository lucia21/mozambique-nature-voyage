
import { useStories } from '@/hooks/useStories';
import CommunityStoryCard from '@/components/CommunityStoryCard';
import Header from '@/components/Header';
import { Loader2 } from 'lucide-react';

const Feed = () => {
  const { data: stories, isLoading, error } = useStories();

  // Sample stories to display when no real stories exist
  const sampleStories = [
    {
      id: 1,
      title: "Traditional Dhow Fishing",
      community: "Ilha de Moçambique",
      province: "Nampula",
      author: "João Pescador",
      description: "The ancient art of dhow fishing continues along our beautiful coastline. These traditional boats have been used by our ancestors for centuries, connecting us to the sea and our heritage.",
      image: "/lovable-uploads/d3c39541-9bfe-40c5-8349-fbbbf5977b0a.png",
      category: "traditions",
      date: "2024-01-15",
      coordinates: [-15.0324, 40.7381] as [number, number],
    },
    {
      id: 2,
      title: "Sunset at Tofo Beach",
      community: "Tofo",
      province: "Inhambane",
      author: "Maria Santos",
      description: "Every evening, our beach transforms into a canvas of golden light. This is where generations of fishermen have returned home, and where stories are shared under the stars.",
      image: "/lovable-uploads/12506da6-9eb2-49e8-8ce2-ab315282454a.png",
      category: "traditions",
      date: "2024-01-12",
      coordinates: [-23.8500, 35.5667] as [number, number],
    },
    {
      id: 3,
      title: "Community Fire Ceremony",
      community: "Maputo",
      province: "Maputo",
      author: "Carlos Matola",
      description: "Our community gathers for traditional ceremonies that have been passed down through generations. The fire represents unity, warmth, and the sharing of wisdom from our elders.",
      image: "/lovable-uploads/f538a09a-2d41-404b-ad91-ffd4af5611d3.png",
      category: "celebrations",
      date: "2024-01-10",
      coordinates: [-25.9692, 32.5732] as [number, number],
    },
    {
      id: 4,
      title: "Cashew Harvest Season", 
      community: "Nampula",
      province: "Nampula",
      author: "Ana Nhaca",
      description: "The cashew harvest brings our community together. Women work side by side, sharing stories and techniques passed down from their mothers and grandmothers.",
      image: "/lovable-uploads/e09fe7c9-da53-4dbd-96ab-231f8526b53a.png",
      category: "agriculture",
      date: "2024-01-08",
      coordinates: [-15.1165, 39.2666] as [number, number],
    },
    {
      id: 5,
      title: "Traditional Dress Heritage",
      community: "Tete",
      province: "Tete", 
      author: "Beatriz Zimba",
      description: "The beautiful patterns and colors of our traditional dress tell the story of our people. Each design has meaning, representing our connection to the land and our ancestors.",
      image: "/lovable-uploads/abd32d8f-d9fd-4530-bd98-49d4f5dd66c7.png",
      category: "traditional_clothes",
      date: "2024-01-05",
      coordinates: [-16.1564, 33.5867] as [number, number],
    },
    {
      id: 6,
      title: "Herons of the Zambezi",
      community: "Beira",
      province: "Sofala",
      author: "Miguel Chissano",
      description: "These magnificent herons nest in our palm trees along the Zambezi delta. They are symbols of patience and wisdom, teaching us to wait for the right moment and work together.",
      image: "/lovable-uploads/5858e64d-677b-4faa-a986-a25fabd3d23b.png",
      category: "traditions",
      date: "2024-01-03",
      coordinates: [-19.8433, 34.8389] as [number, number],
    },
  ];

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

  // Use real stories if available, otherwise show sample stories
  const displayStories = stories && stories.length > 0 ? stories : [];
  const showSampleStories = displayStories.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Community Stories</h1>
          <p className="text-muted-foreground">
            Discover and connect with stories from communities across Moçambique
          </p>
          {showSampleStories && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Welcome!</strong> Below are sample stories showcasing the beauty of Moçambique. 
                Once community members start sharing their own stories, they will appear here.
              </p>
            </div>
          )}
        </div>

        {showSampleStories ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleStories.map((story) => (
              <CommunityStoryCard
                key={story.id}
                story={story}
                onLike={() => console.log('Liked story:', story.id)}
                onConnect={() => console.log('Connect to:', story.id)}
                onViewOnMap={() => console.log('View on map:', story.id)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayStories.map((story) => (
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
        )}
      </div>
    </div>
  );
};

export default Feed;
