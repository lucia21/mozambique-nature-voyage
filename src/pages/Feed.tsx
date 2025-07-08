
import { useStories } from '@/hooks/useStories';
import CommunityStoryCard from '@/components/CommunityStoryCard';
import Header from '@/components/Header';
import { Loader2 } from 'lucide-react';

const Feed = () => {
  const { data: stories, isLoading, error } = useStories();

  // Instagram-style sample stories with the uploaded images
  const sampleStories = [
    {
      id: 1,
      title: "Traditional Dhow Fishing",
      community: "Ilha de Moçambique",
      province: "Nampula",
      author: "João Pescador",
      description: "The ancient art of dhow fishing continues along our beautiful coastline. These traditional boats have been used by our ancestors for centuries, connecting us to the sea and our heritage. Every morning, fishermen set sail with the rising sun, carrying forward traditions passed down through generations.",
      image: "/lovable-uploads/d3c39541-9bfe-40c5-8349-fbbbf5977b0a.png",
      category: "traditions",
      date: "2024-01-15",
      coordinates: [-15.0324, 40.7381] as [number, number],
    },
    {
      id: 2,
      title: "Golden Sunset at Paradise Beach",
      community: "Tofo",
      province: "Inhambane",
      author: "Maria Santos",
      description: "Every evening, our beach transforms into a canvas of golden light. This magical moment reminds us why we call this place home. The warm colors reflect our vibrant culture and the endless possibilities that each new day brings to our coastal community.",
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
      description: "Our community gathers for traditional ceremonies that have been passed down through generations. The fire represents unity, warmth, and the sharing of wisdom from our elders. These moments strengthen our bonds and preserve our cultural identity.",
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
      description: "The cashew harvest brings our community together in celebration of abundance. Women work side by side, sharing stories and techniques passed down from their mothers and grandmothers. This season represents prosperity, hard work, and the fruits of our dedication to the land.",
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
      description: "The beautiful patterns and colors of our traditional dress tell the story of our people. Each design has meaning, representing our connection to the land and our ancestors. Wearing these clothes is a celebration of who we are and where we come from.",
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
      description: "These magnificent herons nest in our palm trees along the Zambezi delta. They are symbols of patience and wisdom, teaching us to wait for the right moment and work together. Their presence reminds us of the delicate balance between nature and our communities.",
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
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
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
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-destructive mb-4">Unable to Load Stories</h2>
            <p className="text-muted-foreground text-lg">Please refresh the page to try again.</p>
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
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Instagram-style header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Community Stories
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover the beauty and culture of Moçambique
          </p>
          {showSampleStories && (
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-primary/20 rounded-xl">
              <p className="text-sm text-primary font-medium">
                ✨ Welcome to our community! These featured stories showcase the rich culture and landscapes of Moçambique. 
                Share your own story to connect with others.
              </p>
            </div>
          )}
        </div>

        {/* Instagram-style feed */}
        <div className="space-y-8">
          {showSampleStories ? (
            sampleStories.map((story) => (
              <div key={story.id} className="animate-fade-in">
                <InstagramStoryCard
                  story={story}
                  onLike={() => console.log('Liked story:', story.id)}
                  onConnect={() => console.log('Connect to:', story.id)}
                  onViewOnMap={() => console.log('View on map:', story.id)}
                />
              </div>
            ))
          ) : (
            displayStories.map((story) => (
              <div key={story.id} className="animate-fade-in">
                <InstagramStoryCard
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Instagram-style story card component
const InstagramStoryCard = ({ story, onLike, onConnect, onViewOnMap }: {
  story: any;
  onLike: () => void;
  onConnect: () => void;
  onViewOnMap: () => void;
}) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      traditions: "bg-orange-100 text-orange-700 border-orange-200",
      crafts: "bg-purple-100 text-purple-700 border-purple-200",
      music: "bg-blue-100 text-blue-700 border-blue-200",
      agriculture: "bg-green-100 text-green-700 border-green-200",
      celebrations: "bg-pink-100 text-pink-700 border-pink-200",
      traditional_dances: "bg-red-100 text-red-700 border-red-200",
      elder_wisdom: "bg-amber-100 text-amber-700 border-amber-200",
      traditional_clothes: "bg-violet-100 text-violet-700 border-violet-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      traditions: "Traditions",
      crafts: "Crafts", 
      music: "Music",
      agriculture: "Agriculture",
      celebrations: "Celebrations",
      traditional_dances: "Traditional Dances",
      elder_wisdom: "Elder Wisdom",
      traditional_clothes: "Traditional Clothes"
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300">
      {/* Header with author info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {story.author?.charAt(0) || 'A'}
              </span>
            </div>
            <div>
              <p className="font-semibold text-foreground">{story.author}</p>
              <p className="text-sm text-muted-foreground">
                {story.community}{story.province && `, ${story.province}`}
              </p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(story.category)}`}>
            {getCategoryLabel(story.category)}
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="relative aspect-square">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-foreground">{story.title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {story.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{new Date(story.date).toLocaleDateString('pt-PT')}</span>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2">
          <button
            onClick={onLike}
            className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary font-medium py-2 px-4 rounded-xl transition-colors"
          >
            ❤️ Support
          </button>
          <button
            onClick={onConnect}
            className="flex-1 bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground font-medium py-2 px-4 rounded-xl transition-colors"
          >
            🤝 Connect
          </button>
          <button
            onClick={onViewOnMap}
            className="bg-accent/10 hover:bg-accent/20 text-accent-foreground font-medium py-2 px-4 rounded-xl transition-colors"
          >
            📍
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
