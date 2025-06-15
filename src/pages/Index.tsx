
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Camera, Heart, Share2, Plus, MapPin } from "lucide-react";
import Header from "@/components/Header";
import CommunityStoryCard from "@/components/CommunityStoryCard";
import CommunityMap from "@/components/CommunityMap";
import CommunityGallery from "@/components/CommunityGallery";
import { useToast } from "@/hooks/use-toast";

interface CommunityStory {
  id: number;
  title: string;
  community: string;
  province: string;
  author: string;
  description: string;
  image: string;
  category: string;
  date: string;
  coordinates: [number, number];
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("stories");
  const { toast } = useToast();

  const communityStories: CommunityStory[] = [
    {
      id: 1,
      title: "Traditional Fishing in Inhambane",
      community: "Praia do Tofo",
      province: "Inhambane",
      author: "Maria Santos",
      description: "Our community has been fishing these waters for generations. We use traditional dhows and pass down techniques from father to son, mother to daughter.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      category: "traditions",
      date: "2024-01-15",
      coordinates: [-23.8758, 35.5477] as [number, number]
    },
    {
      id: 2,
      title: "Capulana Weaving Traditions",
      community: "Nampula Village",
      province: "Nampula",
      author: "Ana Macamo",
      description: "In our village, every woman learns to weave capulanas. Each pattern tells a story of our ancestors and our hopes for the future.",
      image: "https://images.unsplash.com/photo-1594736797933-d0c501ba2fe8?w=800&h=600&fit=crop",
      category: "crafts",
      date: "2024-01-10",
      coordinates: [-15.1165, 39.2666] as [number, number]
    },
    {
      id: 3,
      title: "Marimba Music in Our Community",
      community: "Chokwe",
      province: "Gaza",
      author: "João Sitoe",
      description: "The marimba is the heart of our celebrations. Our children learn to play as soon as they can hold the mallets.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      category: "music",
      date: "2024-01-08",
      coordinates: [-24.5331, 33.0020] as [number, number]
    },
    {
      id: 4,
      title: "Sustainable Farming Practices",
      community: "Angónia",
      province: "Tete",
      author: "Carlos Tembe",
      description: "We practice crop rotation and natural farming methods that our grandparents taught us, keeping our soil healthy for future generations.",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop",
      category: "agriculture",
      date: "2024-01-05",
      coordinates: [-14.1487, 34.1760] as [number, number]
    }
  ];

  const handleShareStory = () => {
    toast({
      title: "Share Your Story",
      description: "Story sharing feature coming soon! Your voice matters to us.",
    });
  };

  const handleLikeStory = (storyTitle: string) => {
    toast({
      title: "Story Liked!",
      description: `You liked "${storyTitle}"`,
    });
  };

  const handleConnectCommunity = (community: string) => {
    toast({
      title: "Connecting...",
      description: `Connecting with ${community} community`,
    });
  };

  const handleViewOnMap = (story: CommunityStory) => {
    setActiveTab("map");
    toast({
      title: "Map View",
      description: `Showing ${story.community} on the map`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative text-center text-foreground max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Nossa Voz <span className="text-primary">Moçambique</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            A platform where rural communities share their stories, traditions, and way of life
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={handleShareStory}>
            <Plus className="mr-2 h-5 w-5" />
            Share Your Story
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community Stories
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Communities Map
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Community Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Stories from Our Communities</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real stories from real people sharing their culture, traditions, and daily life in rural Mozambique
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityStories.map((story) => (
                <CommunityStoryCard 
                  key={story.id}
                  story={story} 
                  onLike={() => handleLikeStory(story.title)}
                  onConnect={() => handleConnectCommunity(story.community)}
                  onViewOnMap={() => handleViewOnMap(story)}
                />
              ))}
            </div>

            {/* Call to Action */}
            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Join Our Community</h3>
              <p className="text-muted-foreground mb-4">
                Do you have a story to tell? Share your traditions, culture, and way of life with the world.
              </p>
              <Button onClick={handleShareStory}>
                <Plus className="mr-2 h-4 w-4" />
                Share Your Story
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Communities Across Mozambique</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the locations of our storytelling communities and connect with them
              </p>
            </div>
            
            <CommunityMap stories={communityStories} onViewStory={handleConnectCommunity} />
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Community Gallery</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Photos shared by our communities showcasing their daily life, traditions, and culture
              </p>
            </div>
            
            <CommunityGallery 
              stories={communityStories}
              onUploadPhoto={handleShareStory}
              onLikePhoto={handleLikeStory}
            />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;
