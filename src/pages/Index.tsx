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
      author: "",
      description: "Our community has been fishing these waters for generations. We use traditional dhows and pass down techniques from father to son, mother to daughter.",
      image: "/lovable-uploads/9eec9d57-5f5d-441b-accc-3ff47381265a.png",
      category: "traditions",
      date: "2024-01-15",
      coordinates: [-23.8758, 35.5477] as [number, number]
    },
    {
      id: 2,
      title: "Capulana Weaving Traditions",
      community: "",
      province: "",
      author: "",
      description: "In our villages, every woman learns to weave capulanas. Each pattern tells a story of our ancestors and our hopes for the future. The bright colors represent our joy and resilience.",
      image: "/lovable-uploads/e783d8ae-ef1b-454e-ab3e-9a6139644650.png",
      category: "traditional_clothes",
      date: "2024-01-10",
      coordinates: [-15.1165, 39.2666] as [number, number]
    },
    {
      id: 3,
      title: "Marimba Music in Our Community",
      community: "Chokwe",
      province: "Gaza",
      author: "",
      description: "The marimba is the heart of our celebrations. Our children learn to play as soon as they can hold the mallets, keeping our musical heritage alive.",
      image: "/lovable-uploads/e52dee81-1633-42a1-bca3-d7a8392a500b.png",
      category: "music",
      date: "2024-01-08",
      coordinates: [-24.5331, 33.0020] as [number, number]
    },
    {
      id: 4,
      title: "Sustainable Farming Practices",
      community: "Zona Sul",
      province: "Maputo",
      author: "",
      description: "We practice crop rotation and natural farming methods that our grandparents taught us, keeping our soil healthy for future generations.",
      image: "/lovable-uploads/579fcfdd-6151-407b-b407-66621ccecd8c.png",
      category: "agriculture",
      date: "2024-01-05",
      coordinates: [-14.1487, 34.1760] as [number, number]
    },
    {
      id: 5,
      title: "Tufo Dance of the Island",
      community: "Ilha de Moçambique",
      province: "Nampula",
      author: "",
      description: "The Tufo dance connects us to our Swahili heritage. Women dance in beautiful capulanas while singing ancient songs that tell stories of love, life, and community.",
      image: "/lovable-uploads/63ed636a-ef49-427a-8561-bacca30e4d74.png",
      category: "traditional_dances",
      date: "2024-01-07",
      coordinates: [-15.0355, 40.7386] as [number, number]
    },
    {
      id: 6,
      title: "Elder Wisdom: Living with the Seasons",
      community: "Chimoio",
      province: "Manica",
      author: "",
      description: "Our elders teach us to read the signs of nature - when to plant, when to harvest, how to preserve food for dry seasons. This knowledge has sustained us for centuries.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      category: "elder_wisdom",
      date: "2024-01-03",
      coordinates: [-19.1167, 33.4833] as [number, number]
    }
  ];

  // Rural communities for the map (different from main stories)
  const mapCommunities: CommunityStory[] = [
    {
      id: 8,
      title: "Rice Farming Community",
      community: "Beira Rural",
      province: "Sofala",
      author: "",
      description: "Traditional rice farming methods passed down through generations in rural Sofala province.",
      image: "/lovable-uploads/cfe69b25-dc8d-4ab2-902e-c1956ae3bef5.png",
      category: "agriculture",
      date: "2024-01-01",
      coordinates: [-19.8436, 34.8389] as [number, number]
    },
    {
      id: 9,
      title: "Cattle Herding Traditions",
      community: "Rural Inhambane",
      province: "Inhambane",
      author: "",
      description: "Young herders maintaining ancient cattle traditions in rural communities.",
      image: "/lovable-uploads/e28a1b77-3e08-4174-8235-39f5df2a429d.png",
      category: "traditions",
      date: "2024-01-02",
      coordinates: [-24.2, 35.0] as [number, number]
    },
    {
      id: 10,
      title: "Artisan Community",
      community: "Rural Nampula",
      province: "Nampula",
      author: "",
      description: "Traditional craft makers creating beautiful sculptures and pottery in rural villages.",
      image: "/lovable-uploads/95d8d759-a19d-4fb0-9f4b-972190223e18.png",
      category: "crafts",
      date: "2024-01-03",
      coordinates: [-15.5, 39.5] as [number, number]
    },
    {
      id: 11,
      title: "Salt Production Community",
      community: "Rural Gaza",
      province: "Gaza",
      author: "",
      description: "Traditional salt harvesting methods using ancient techniques by the coast.",
      image: "/lovable-uploads/df55f51e-bda1-469e-8bb2-6fffac05d32f.png",
      category: "traditions",
      date: "2024-01-04",
      coordinates: [-24.5, 33.5] as [number, number]
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
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community Stories
            </TabsTrigger>
            <TabsTrigger value="languages" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Our Languages
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
                Real stories from real people sharing their culture, traditions, dances, and daily life in rural Mozambique
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
                Do you have a story to tell? Share your traditions, culture, dances, and way of life with the world.
              </p>
              <Button onClick={handleShareStory}>
                <Plus className="mr-2 h-4 w-4" />
                Share Your Story
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="languages" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Languages of Mozambique</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Celebrating the linguistic diversity across our beautiful country
              </p>
            </div>
            
            {/* Languages Hero Image */}
            <div className="relative h-64 rounded-lg overflow-hidden mb-8">
              <img
                src="/lovable-uploads/e5eedeb9-ea38-4ef0-b173-f1a2a6fcf2d2.png"
                alt="Languages of Mozambique"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Multilingual Mozambique</h3>
                <p className="text-sm opacity-90">Welcome in many languages</p>
              </div>
            </div>

            {/* Languages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Portuguese</h3>
                <p className="text-muted-foreground mb-2">Official Language</p>
                <p className="text-sm">The official language of Mozambique, used in education, government, and formal communication.</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Makhuwa</h3>
                <p className="text-muted-foreground mb-2">Northern Mozambique</p>
                <p className="text-sm">The most widely spoken Bantu language in Mozambique, primarily in Nampula and Cabo Delgado provinces.</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Changana</h3>
                <p className="text-muted-foreground mb-2">Southern Mozambique</p>
                <p className="text-sm">Spoken mainly in Gaza and Maputo provinces, part of the Tsonga language family.</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Sena</h3>
                <p className="text-muted-foreground mb-2">Central Mozambique</p>
                <p className="text-sm">Primarily spoken in Sofala province, along the Zambezi River valley.</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Ndau</h3>
                <p className="text-muted-foreground mb-2">Manica & Sofala</p>
                <p className="text-sm">Spoken in the mountainous regions of Manica and parts of Sofala province.</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Nyanja</h3>
                <p className="text-muted-foreground mb-2">Tete Province</p>
                <p className="text-sm">Common in Tete province, especially near the borders with Malawi and Zambia.</p>
              </Card>
            </div>

            {/* Language Preservation Call to Action */}
            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Preserve Our Languages</h3>
              <p className="text-muted-foreground mb-4">
                Help us document and preserve the rich linguistic heritage of Mozambique by sharing stories in your native language.
              </p>
              <Button onClick={handleShareStory}>
                <Plus className="mr-2 h-4 w-4" />
                Share in Your Language
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Rural Communities Across Mozambique</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover rural communities and their traditional practices across our beautiful country
              </p>
            </div>
            
            <CommunityMap stories={mapCommunities} onViewStory={handleConnectCommunity} />
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Community Gallery</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Photos shared by our communities showcasing their traditions, culture, and celebrations
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
