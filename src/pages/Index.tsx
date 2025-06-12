
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Camera, Compass, Heart } from "lucide-react";
import Header from "@/components/Header";
import DestinationCard from "@/components/DestinationCard";
import MapView from "@/components/MapView";
import PhotoGallery from "@/components/PhotoGallery";
import { useToast } from "@/hooks/use-toast";

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

const Index = () => {
  const [activeTab, setActiveTab] = useState("destinations");
  const { toast } = useToast();

  const destinations: Destination[] = [
    {
      id: 1,
      name: "Gorongosa National Park",
      location: "Sofala Province",
      description: "One of Africa's greatest wildlife restoration stories, home to elephants, lions, and diverse ecosystems in the heart of Mozambique.",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
      highlights: ["Wildlife Safari", "Bird Watching", "Conservation Tours", "Cultural Visits"],
      bestTime: "May - October",
      coordinates: [-18.9744, 34.3517] as [number, number]
    },
    {
      id: 2,
      name: "Bazaruto Archipelago",
      location: "Inhambane Province",
      description: "A pristine marine paradise with crystal-clear waters, coral reefs, and traditional dhow sailing experiences.",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
      highlights: ["Snorkeling", "Diving", "Dhow Sailing", "Beach Relaxation"],
      bestTime: "April - September",
      coordinates: [-21.5423, 35.4515] as [number, number]
    },
    {
      id: 3,
      name: "Chimanimani Mountains",
      location: "Manica Province",
      description: "Dramatic mountain landscapes with waterfalls, hiking trails, and unique flora in Mozambique's eastern highlands.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      highlights: ["Hiking", "Waterfalls", "Mountain Views", "Endemic Plants"],
      bestTime: "May - August",
      coordinates: [-19.8167, 33.0000] as [number, number]
    },
    {
      id: 4,
      name: "Quirimbas Archipelago",
      location: "Cabo Delgado Province",
      description: "Remote islands with pristine beaches, coral reefs, and rich Swahili cultural heritage in northern Mozambique.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      highlights: ["Island Hopping", "Cultural Heritage", "Fishing", "Pristine Beaches"],
      bestTime: "June - November",
      coordinates: [-12.3667, 40.7167] as [number, number]
    }
  ];

  const handleExploreDestination = (destination: Destination) => {
    toast({
      title: `Exploring ${destination.name}`,
      description: `Get ready to discover the wonders of ${destination.location}!`,
    });
    
    // Here you could navigate to a detailed destination page
    console.log("Navigating to destination:", destination);
  };

  const handleViewOnMap = (destination: Destination) => {
    setActiveTab("map");
    toast({
      title: "Map View",
      description: `Showing ${destination.name} on the map`,
    });
    
    // Here you could center the map on the destination coordinates
    console.log("Centering map on:", destination.coordinates);
  };

  const handleLocationServices = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location Found!",
            description: `Your coordinates: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please check your browser settings.",
          });
        }
      );
    } else {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by this browser.",
      });
    }
  };

  const handleUploadPhotos = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        toast({
          title: "Photos Selected!",
          description: `${files.length} photo(s) ready to upload. Upload functionality coming soon!`,
        });
      }
    };
    
    input.click();
  };

  const handleLikePhoto = (photoTitle: string) => {
    toast({
      title: "Photo Liked!",
      description: `You liked "${photoTitle}"`,
    });
  };

  const handleSharePhoto = (photoTitle: string) => {
    if (navigator.share) {
      navigator.share({
        title: photoTitle,
        text: `Check out this amazing photo from Mozambique: ${photoTitle}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      toast({
        title: "Share",
        description: `Sharing "${photoTitle}" - Copy the URL to share!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative text-center text-foreground max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Rural <span className="text-primary">Mozambique</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            Explore pristine nature, rich culture, and unforgettable experiences in Mozambique's hidden gems
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => setActiveTab("destinations")}>
            <Compass className="mr-2 h-5 w-5" />
            Start Exploring
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="destinations" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Destinations
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Compass className="h-4 w-4" />
              Map View
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Photo Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="destinations" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Featured Destinations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the natural wonders and cultural treasures of Mozambique's rural areas
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination) => (
                <div key={destination.id}>
                  <DestinationCard 
                    destination={destination} 
                    onExplore={() => handleExploreDestination(destination)}
                    onViewOnMap={() => handleViewOnMap(destination)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Interactive Map</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore destinations on our interactive map and plan your journey
              </p>
            </div>
            
            <MapView 
              destinations={destinations} 
              onLocationServices={handleLocationServices}
              onViewDestination={handleExploreDestination}
            />
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Photo Gallery</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stunning photography showcasing Mozambique's natural beauty and cultural richness
              </p>
            </div>
            
            <PhotoGallery 
              destinations={destinations}
              onUploadPhotos={handleUploadPhotos}
              onLikePhoto={handleLikePhoto}
              onSharePhoto={handleSharePhoto}
            />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;
