
import { MapPin, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Destination {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  highlights: string[];
  bestTime: string;
  coordinates: [number, number];
}

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-primary">
            <Clock className="h-3 w-3 mr-1" />
            {destination.bestTime}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4" />
            {destination.location}
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {destination.description}
        </p>
        
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
              <Star className="h-4 w-4 text-accent" />
              Highlights
            </h4>
            <div className="flex flex-wrap gap-1">
              {destination.highlights.map((highlight, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button className="w-full" size="sm">
            Explore Destination
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
