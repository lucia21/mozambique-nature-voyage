
import InteractiveMap from './InteractiveMap';
import { MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import type { Story } from '@/hooks/useStories';

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

interface CommunityMapProps {
  stories: CommunityStory[];
  onViewStory?: (community: string) => void;
}

const CommunityMap = ({ stories, onViewStory }: CommunityMapProps) => {
  // Convert CommunityStory to Story format for the InteractiveMap
  const mappedStories: Story[] = stories.map(story => ({
    id: story.id.toString(),
    user_id: '',
    community_id: null,
    title: story.title,
    description: story.description,
    category: story.category,
    language: 'pt',
    image_url: story.image,
    audio_url: null,
    location: story.community,
    province: story.province,
    coordinates: null,
    created_at: story.date,
    updated_at: story.date,
    profiles: {
      full_name: story.author
    },
    communities: {
      name: story.community
    }
  }));

  return (
    <div className="space-y-6">
      {/* Interactive Map */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <InteractiveMap stories={mappedStories} height="400px" />
        </CardContent>
      </Card>

      {/* Communities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stories.map((story) => (
          <Card key={story.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={story.image}
                  alt={story.community}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{story.community}</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" />
                    {story.province}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Users className="h-3 w-3" />
                    Shared by {story.author}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {story.description}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onViewStory?.(story.community)}
                >
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityMap;
