
import { useState } from "react";
import { MapPin, Camera, Sun, Waves, Mountain, Trees } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import DestinationCard from "@/components/DestinationCard";
import MapView from "@/components/MapView";
import PhotoGallery from "@/components/PhotoGallery";

const Index = () => {
  const [activeView, setActiveView] = useState<'destinations' | 'map' | 'gallery'>('destinations');

  const destinations = [
    {
      id: 1,
      name: "Bazaruto Archipelago",
      location: "Inhambane Province",
      description: "Pristine islands with crystal-clear waters, perfect for diving and marine life observation.",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop",
      highlights: ["Marine Reserve", "Dugong Sanctuary", "Traditional Dhow Trips"],
      bestTime: "May - October",
      coordinates: [-22.1, 35.4]
    },
    {
      id: 2,
      name: "Gorongosa National Park",
      location: "Sofala Province",
      description: "Mozambique's premier wildlife destination, featuring diverse ecosystems and remarkable conservation success.",
      image: "https://images.unsplash.com/photo-1439886183900-e79ec0057170?w=800&h=600&fit=crop",
      highlights: ["Big Game Safari", "Mount Gorongosa", "Bird Watching"],
      bestTime: "May - September",
      coordinates: [-18.7, 34.0]
    },
    {
      id: 3,
      name: "Chimanimani Mountains",
      location: "Manica Province", 
      description: "Dramatic mountain landscapes with hiking trails, waterfalls, and unique flora.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      highlights: ["Hiking Trails", "Endemic Plants", "Rock Formations"],
      bestTime: "April - August",
      coordinates: [-19.8, 33.0]
    },
    {
      id: 4,
      name: "Ilha de Moçambique",
      location: "Nampula Province",
      description: "UNESCO World Heritage site with rich history, colonial architecture, and cultural significance.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",
      highlights: ["UNESCO Heritage", "Historic Architecture", "Cultural Tours"],
      bestTime: "May - October",
      coordinates: [-15.0, 40.7]
    },
    {
      id: 5,
      name: "Quirimbas Archipelago",
      location: "Cabo Delgado Province",
      description: "Remote tropical paradise with coral reefs, traditional fishing villages, and untouched beaches.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
      highlights: ["Coral Reefs", "Traditional Villages", "Pristine Beaches"],
      bestTime: "April - November",
      coordinates: [-12.3, 40.6]
    },
    {
      id: 6,
      name: "Niassa Reserve",
      location: "Niassa Province",
      description: "Africa's largest wildlife reserve with diverse ecosystems and authentic safari experiences.",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop",
      highlights: ["Wildlife Reserve", "Remote Safari", "Conservation Area"],
      bestTime: "May - October",
      coordinates: [-13.5, 37.0]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&h=800&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Discover Mozambique
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in">
              Explore pristine nature, rich culture, and unforgettable adventures
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Waves className="h-5 w-5" />
                <span>Pristine Beaches</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Mountain className="h-5 w-5" />
                <span>Mountain Adventures</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Trees className="h-5 w-5" />
                <span>Wildlife Safari</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-1 py-4">
            <Button
              variant={activeView === 'destinations' ? 'default' : 'ghost'}
              onClick={() => setActiveView('destinations')}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Destinations
            </Button>
            <Button
              variant={activeView === 'map' ? 'default' : 'ghost'}
              onClick={() => setActiveView('map')}
              className="flex items-center gap-2"
            >
              <Mountain className="h-4 w-4" />
              Map View
            </Button>
            <Button
              variant={activeView === 'gallery' ? 'default' : 'ghost'}
              onClick={() => setActiveView('gallery')}
              className="flex items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              Gallery
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeView === 'destinations' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Featured Destinations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From pristine archipelagos to dramatic mountains, discover the natural wonders that make Mozambique a unique destination.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          </div>
        )}

        {activeView === 'map' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Interactive Map</h2>
              <p className="text-muted-foreground">
                Explore Mozambique's destinations on our interactive map
              </p>
            </div>
            <MapView destinations={destinations} />
          </div>
        )}

        {activeView === 'gallery' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Photo Gallery</h2>
              <p className="text-muted-foreground">
                Stunning images from across Mozambique's diverse landscapes
              </p>
            </div>
            <PhotoGallery destinations={destinations} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sun className="h-6 w-6" />
            <span className="text-xl font-semibold">Discover Mozambique</span>
          </div>
          <p className="text-primary-foreground/80">
            Promoting sustainable tourism in rural Mozambique
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
