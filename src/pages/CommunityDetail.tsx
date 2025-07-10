
import { useParams } from 'react-router-dom';
import { useCommunities } from '@/hooks/useCommunities';
import Header from '@/components/Header';
import { Loader2, Users, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CommunityStoryCard from '@/components/CommunityStoryCard';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const CommunityDetail = () => {
  const { id } = useParams();
  const { data: communities, isLoading } = useCommunities();
  const { toast } = useToast();
  const { t } = useLanguage();

  // Sample stories for demonstration
  const sampleStories = [
    {
      id: 1,
      title: "Traditional Fishing Techniques",
      community: "Praia do Tofo",
      province: "Inhambane",
      author: "João Silva",
      description: "Learning the ancient ways of fishing from our elders, using traditional dhows and nets passed down through generations.",
      image: "/lovable-uploads/9eec9d57-5f5d-441b-accc-3ff47381265a.png",
      category: "traditions",
      date: "2024-01-15",
      coordinates: [-23.8758, 35.5477] as [number, number],
    },
    {
      id: 2,
      title: "Capulana Weaving Stories",
      community: "Praia do Tofo",
      province: "Inhambane",
      author: "Maria Santos",
      description: "Every capulana tells a story. In our community, we keep the tradition alive by teaching young women the art of weaving and pattern creation.",
      image: "/lovable-uploads/e783d8ae-ef1b-454e-ab3e-9a6139644650.png",
      category: "traditional_clothes",
      date: "2024-01-10",
      coordinates: [-23.8758, 35.5477] as [number, number],
    },
  ];

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <span className="ml-4 text-xl">{t('common.loading')}</span>
          </div>
        </div>
      </div>
    );
  }

  // For demo purposes, we'll show a sample community
  const community = {
    id: '1',
    name: 'Praia do Tofo',
    location: 'Inhambane',
    province: 'Inhambane',
    description: 'A vibrant coastal community known for traditional fishing and marine conservation.',
    banner_image: '/lovable-uploads/9eec9d57-5f5d-441b-accc-3ff47381265a.png',
    member_count: 245,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Community Hero Section - Mobile Responsive */}
      <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
        <img
          src={community.banner_image}
          alt={community.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
              {community.name}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base opacity-90">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {community.location}, {community.province}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {community.member_count} {t('community.members')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile Responsive */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Community Info Sidebar - Mobile First */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="sticky top-4">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                      {t('community.about')}
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {community.description}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                      {t('community.stats')}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('community.members')}</span>
                        <span className="font-medium">{community.member_count}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('community.stories')}</span>
                        <span className="font-medium">{sampleStories.length}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full touch-target-large">
                    <Users className="mr-2 h-4 w-4" />
                    {t('community.join')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stories Grid - Mobile Responsive */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                {t('community.stories_from')} {community.name}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
                {t('community.discover_stories')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {sampleStories.map((story) => (
                <CommunityStoryCard
                  key={story.id}
                  story={story}
                  onLike={() => handleLikeStory(story.title)}
                  onConnect={() => handleConnectCommunity(story.community)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
