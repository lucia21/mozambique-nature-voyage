
import { Heart, Users, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

interface CommunityStoryCardProps {
  story: CommunityStory;
  onLike?: () => void;
  onConnect?: () => void;
}

const CommunityStoryCard = ({ story, onLike, onConnect }: CommunityStoryCardProps) => {
  const { t } = useLanguage();

  const getCategoryColor = (category: string) => {
    const colors = {
      traditions: "bg-orange-100 text-orange-800",
      crafts: "bg-purple-100 text-purple-800",
      music: "bg-blue-100 text-blue-800",
      agriculture: "bg-green-100 text-green-800",
      celebrations: "bg-pink-100 text-pink-800",
      traditional_dances: "bg-red-100 text-red-800",
      elder_wisdom: "bg-amber-100 text-amber-800",
      traditional_clothes: "bg-violet-100 text-violet-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getCategoryLabel = (category: string) => {
    return t(`category.${category}`) || category;
  };

  const showLocation = story.community || story.province;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-40 sm:h-48 object-cover"
        />
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
          <Badge className={`${getCategoryColor(story.category)} text-xs sm:text-sm`}>
            {getCategoryLabel(story.category)}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
          <h3 className="text-base sm:text-xl font-bold mb-1 leading-tight">{story.title}</h3>
          {showLocation && (
            <div className="text-xs sm:text-sm mb-1">
              {story.community && story.province ? `${story.community}, ${story.province}` : story.community || story.province}
            </div>
          )}
          {story.author && (
            <div className="text-xs opacity-90">{t('story.by_author', { author: story.author })}</div>
          )}
        </div>
      </div>
      
      <CardContent className="p-4 sm:p-6">
        <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
          {story.description}
        </p>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 sm:mb-4">
          <Calendar className="h-3 w-3" />
          {new Date(story.date).toLocaleDateString('pt-PT')}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onLike}
            className="flex-1 text-xs sm:text-sm touch-target-large"
          >
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">{t('story.support')}</span>
            <span className="sm:hidden">❤️</span>
          </Button>
          <Button 
            size="sm"
            onClick={onConnect}
            className="flex-1 text-xs sm:text-sm touch-target-large"
          >
            <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">{t('story.connect')}</span>
            <span className="sm:hidden">👥</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityStoryCard;
