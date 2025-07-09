
import { useStories } from '@/hooks/useStories';
import CommunityStoryCard from '@/components/CommunityStoryCard';
import Header from '@/components/Header';
import { Loader2 } from 'lucide-react';

const Feed = () => {
  const { data: stories, isLoading, error } = useStories();

  // Instagram-style sample stories with the newly uploaded images
  const sampleStories = [
    {
      id: 1,
      title: "Cattle Herding Traditions",
      community: "Rural Mozambique",
      province: "Tete",
      author: "Pedro Muthemba",
      description: "Young herders continue the ancient tradition of cattle herding across the vast landscapes of Mozambique. This practice connects us to our ancestors and teaches responsibility, patience, and respect for nature. The bond between herder and cattle represents harmony with our environment.",
      image: "/lovable-uploads/fb9c090c-e1c0-4cce-ab4a-fe7a98278869.png",
      category: "traditions",
      date: "2024-01-15",
      coordinates: [-16.1564, 33.5867] as [number, number],
    },
    {
      id: 2,
      title: "Traditional Art and Sculpture",
      community: "Maputo",
      province: "Maputo",
      author: "Elisabete Sitoe",
      description: "Our traditional sculptures and pottery tell stories of generations past. Each piece represents the soul of our culture, crafted with techniques passed down through families. These artistic expressions preserve our heritage and connect modern communities to ancient wisdom.",
      image: "/lovable-uploads/48744a47-db91-40e5-965d-3376181d9e3a.png",
      category: "crafts",
      date: "2024-01-12",
      coordinates: [-25.9692, 32.5732] as [number, number],
    },
    {
      id: 3,
      title: "Mbira - The Soul of Our Music",
      community: "Inhambane",
      province: "Inhambane",
      author: "Armando Chissano",
      description: "The mbira, our traditional thumb piano, carries the heartbeat of Mozambican culture. Each note connects us to spiritual ceremonies and community gatherings. This sacred instrument brings healing, storytelling, and unity to our people through its gentle melodies.",
      image: "/lovable-uploads/6e6e84ae-4052-4978-80b1-a698004696c7.png",
      category: "music",
      date: "2024-01-10",
      coordinates: [-23.8500, 35.5667] as [number, number],
    },
    {
      id: 4,
      title: "Salt Harvesting Traditions", 
      community: "Beira",
      province: "Sofala",
      author: "Manuel Macuácua",
      description: "Salt harvesting along our coastal regions is both an art and a livelihood. Communities work together during the dry season, creating intricate patterns of salt beds. This traditional practice sustains families and preserves knowledge about coastal resource management.",
      image: "/lovable-uploads/c405e64a-3135-4aee-829d-2cc9ec5d6ed1.png",
      category: "agriculture",
      date: "2024-01-08",
      coordinates: [-19.8433, 34.8389] as [number, number],
    },
    {
      id: 5,
      title: "Farming with Pride",
      community: "Nampula",
      province: "Nampula", 
      author: "João Mahanjane",
      description: "Our farmers work the land with pride and traditional knowledge. From planting to harvest, every step connects us to the earth and our ancestors. The joy in our work reflects the deep satisfaction of feeding our communities and preserving agricultural traditions.",
      image: "/lovable-uploads/022142ad-f998-4900-b101-3342cb726494.png",
      category: "agriculture",
      date: "2024-01-05",
      coordinates: [-15.1165, 39.2666] as [number, number],
    },
    {
      id: 6,
      title: "Community Unity and Culture",
      community: "Cabo Delgado",
      province: "Cabo Delgado",
      author: "Fatima Namashulua",
      description: "Our traditional clothing and community gatherings celebrate the diversity and unity of Mozambican culture. The vibrant colors and patterns represent different regions and tribes coming together in harmony, sharing stories and preserving our collective identity.",
      image: "/lovable-uploads/6f68d633-a5bc-4700-b583-65b82e702a3a.png",
      category: "traditional_clothes",
      date: "2024-01-03",
      coordinates: [-11.2681, 40.5117] as [number, number],
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
