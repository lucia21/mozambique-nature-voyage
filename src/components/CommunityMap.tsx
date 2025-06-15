
import { MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

interface CommunityMapProps {
  stories: CommunityStory[];
  onViewStory?: (community: string) => void;
}

const CommunityMap = ({ stories, onViewStory }: CommunityMapProps) => {
  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <Card className="h-96 bg-gradient-to-br from-primary/10 to-secondary/10">
        <CardContent className="h-full flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Communities Map</h3>
            <p className="text-muted-foreground mb-4">
              Interactive map showing all participating communities across Mozambique.
            </p>
            <Button variant="outline">
              View Full Map
            </Button>
          </div>
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
