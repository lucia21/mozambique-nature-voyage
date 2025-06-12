
import { MapPin, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

interface MapViewProps {
  destinations: Destination[];
  onLocationServices?: () => void;
  onViewDestination?: (destination: Destination) => void;
}

const MapView = ({ destinations, onLocationServices, onViewDestination }: MapViewProps) => {
  return (
    <div className="space-y-6">
      {/* Map Placeholder - In a real app, this would integrate with Google Maps or Mapbox */}
      <Card className="h-96 bg-gradient-to-br from-primary/10 to-secondary/10">
        <CardContent className="h-full flex items-center justify-center">
          <div className="text-center">
            <Navigation className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
            <p className="text-muted-foreground mb-4">
              Map integration coming soon! For now, explore our destinations below.
            </p>
            <Button variant="outline" onClick={onLocationServices}>
              Enable Location Services
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Destination List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {destinations.map((destination) => (
          <Card key={destination.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{destination.name}</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" />
                    {destination.location}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {destination.description}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onViewDestination?.(destination)}
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MapView;
