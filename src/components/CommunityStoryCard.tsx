
import { Heart, Users, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  onViewOnMap?: () => void;
}

const CommunityStoryCard = ({ story, onLike, onConnect, onViewOnMap }: CommunityStoryCardProps) => {
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
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge className={getCategoryColor(story.category)}>
            {getCategoryLabel(story.category)}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{story.title}</h3>
          <div className="flex items-center gap-1 text-sm mb-1">
            <MapPin className="h-3 w-3" />
            {story.community}, {story.province}
          </div>
          <div className="text-xs opacity-90">by {story.author}</div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {story.description}
        </p>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Calendar className="h-3 w-3" />
          {new Date(story.date).toLocaleDateString('pt-PT')}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onLike}
            className="flex-1"
          >
            <Heart className="h-4 w-4 mr-1" />
            Support
          </Button>
          <Button 
            size="sm"
            onClick={onConnect}
            className="flex-1"
          >
            <Users className="h-4 w-4 mr-1" />
            Connect
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onViewOnMap}
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityStoryCard;
