
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsContent as TabContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Camera, Plus } from "lucide-react";
import Header from "@/components/Header";
import CommunityStoryCard from "@/components/CommunityStoryCard";
import CommunityGallery from "@/components/CommunityGallery";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

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

  const handleShareStory = () => {
    toast({
      title: t('story.share_title'),
      description: t('story.share_desc'),
    });
  };

  const handleLikeStory = (storyTitle: string) => {
    toast({
      title: t('story.liked_title'),
      description: t('story.liked_desc', { title: storyTitle }),
    });
  };

  const handleConnectCommunity = (community: string) => {
    toast({
      title: t('story.connecting_title'),
      description: t('story.connecting_desc', { community }),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Mobile Responsive */}
      <section className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative text-center text-foreground max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            {t('hero.title')} <span className="text-primary">{t('hero.mozambique')}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 opacity-90 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 touch-target-large px-6 sm:px-8" onClick={handleShareStory}>
            <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            {t('hero.share_story')}
          </Button>
        </div>
      </section>

      {/* Main Content - Mobile Responsive */}
      <section className="container mx-auto px-4 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 h-auto">
            <TabContent value="stories" className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{t('tabs.stories')}</span>
              <span className="sm:hidden">{t('tabs.stories_short') || t('tabs.stories')}</span>
            </TabContent>
            <TabContent value="languages" className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{t('tabs.languages')}</span>
              <span className="sm:hidden">{t('tabs.languages_short') || t('tabs.languages')}</span>
            </TabContent>
            <TabContent value="gallery" className="flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
              <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{t('tabs.gallery')}</span>
              <span className="sm:hidden">{t('tabs.gallery_short') || t('tabs.gallery')}</span>
            </TabContent>
          </TabsList>

          <TabsContent value="stories" className="space-y-6">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t('stories.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                {t('stories.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {communityStories.map((story) => (
                <CommunityStoryCard 
                  key={story.id}
                  story={story} 
                  onLike={() => handleLikeStory(story.title)}
                  onConnect={() => handleConnectCommunity(story.community)}
                />
              ))}
            </div>

            {/* Call to Action - Mobile Responsive */}
            <Card className="p-4 sm:p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">{t('cta.join_title')}</h3>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                {t('cta.join_desc')}
              </p>
              <Button onClick={handleShareStory} className="touch-target-large">
                <Plus className="mr-2 h-4 w-4" />
                {t('cta.share_button')}
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="languages" className="space-y-6">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t('languages.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                {t('languages.subtitle')}
              </p>
            </div>
            
            {/* Languages Hero Image - Mobile Responsive */}
            <div className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden mb-6 sm:mb-8">
              <img
                src="/lovable-uploads/e5eedeb9-ea38-4ef0-b173-f1a2a6fcf2d2.png"
                alt={t('languages.hero_alt')}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{t('languages.hero_title')}</h3>
                <p className="text-xs sm:text-sm opacity-90">{t('languages.hero_subtitle')}</p>
              </div>
            </div>

            {/* Languages Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('languages.portuguese')}</h3>
                <p className="text-muted-foreground mb-1 sm:mb-2 text-sm sm:text-base">{t('languages.official')}</p>
                <p className="text-xs sm:text-sm leading-relaxed">{t('languages.portuguese_desc')}</p>
              </Card>
              
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('languages.makhuwa')}</h3>
                <p className="text-muted-foreground mb-1 sm:mb-2 text-sm sm:text-base">{t('languages.northern')}</p>
                <p className="text-xs sm:text-sm leading-relaxed">{t('languages.makhuwa_desc')}</p>
              </Card>
              
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('languages.changana')}</h3>
                <p className="text-muted-foreground mb-1 sm:mb-2 text-sm sm:text-base">{t('languages.southern')}</p>
                <p className="text-xs sm:text-sm leading-relaxed">{t('languages.changana_desc')}</p>
              </Card>
              
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('languages.sena')}</h3>
                <p className="text-muted-foreground mb-1 sm:mb-2 text-sm sm:text-base">{t('languages.central')}</p>
                <p className="text-xs sm:text-sm leading-relaxed">{t('languages.sena_desc')}</p>
              </Card>
              
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('languages.ndau')}</h3>
                <p className="text-muted-foreground mb-1 sm:mb-2 text-sm sm:text-base">{t('languages.manica_sofala')}</p>
                <p className="text-xs sm:text-sm leading-relaxed">{t('languages.ndau_desc')}</p>
              </Card>
              
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('languages.nyanja')}</h3>
                <p className="text-muted-foreground mb-1 sm:mb-2 text-sm sm:text-base">{t('languages.tete')}</p>
                <p className="text-xs sm:text-sm leading-relaxed">{t('languages.nyanja_desc')}</p>
              </Card>
            </div>

            {/* Language Preservation Call to Action - Mobile Responsive */}
            <Card className="p-4 sm:p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">{t('languages.preserve_title')}</h3>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                {t('languages.preserve_desc')}
              </p>
              <Button onClick={handleShareStory} className="touch-target-large">
                <Plus className="mr-2 h-4 w-4" />
                {t('languages.preserve_button')}
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t('gallery.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                {t('gallery.subtitle')}
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
