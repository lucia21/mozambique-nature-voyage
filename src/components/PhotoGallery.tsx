
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Heart, Share2 } from "lucide-react";

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

interface PhotoGalleryProps {
  destinations: Destination[];
}

const PhotoGallery = ({ destinations }: PhotoGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Additional gallery images showcasing Mozambique's beauty
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      title: "Wildlife in Gorongosa",
      category: "wildlife",
      location: "Gorongosa National Park"
    },
    {
      url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",
      title: "Cascade Falls",
      category: "nature",
      location: "Chimanimani Mountains"
    },
    {
      url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop",
      title: "Tropical Forest",
      category: "nature",
      location: "Niassa Reserve"
    },
    {
      url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=600&fit=crop",
      title: "Sunrise Through Trees",
      category: "nature",
      location: "Quirimbas Archipelago"
    },
    {
      url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop",
      title: "Ocean Waves",
      category: "beaches",
      location: "Bazaruto Archipelago"
    },
    {
      url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop",
      title: "Mountain Landscape",
      category: "mountains",
      location: "Chimanimani"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Photos', count: galleryImages.length + destinations.length },
    { id: 'destinations', name: 'Destinations', count: destinations.length },
    { id: 'wildlife', name: 'Wildlife', count: galleryImages.filter(img => img.category === 'wildlife').length },
    { id: 'nature', name: 'Nature', count: galleryImages.filter(img => img.category === 'nature').length },
    { id: 'beaches', name: 'Beaches', count: galleryImages.filter(img => img.category === 'beaches').length },
    { id: 'mountains', name: 'Mountains', count: galleryImages.filter(img => img.category === 'mountains').length }
  ];

  const getFilteredImages = () => {
    let images: any[] = [];
    
    if (selectedCategory === 'all' || selectedCategory === 'destinations') {
      images = [...images, ...destinations.map(dest => ({
        url: dest.image,
        title: dest.name,
        category: 'destinations',
        location: dest.location
      }))];
    }
    
    if (selectedCategory === 'all') {
      images = [...images, ...galleryImages];
    } else if (selectedCategory !== 'destinations') {
      images = [...images, ...galleryImages.filter(img => img.category === selectedCategory)];
    }
    
    return images;
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="text-xs"
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {getFilteredImages().map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative group">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-semibold text-sm mb-1">{image.title}</h4>
                    <p className="text-xs opacity-90">{image.location}</p>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full p-0">
              <div className="relative">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                      <p className="text-sm opacity-90">{image.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* Upload Section */}
      <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Share Your Experience</h3>
        <p className="text-muted-foreground mb-4">
          Have you visited these amazing places? Share your photos with fellow travelers!
        </p>
        <Button>
          Upload Photos
        </Button>
      </Card>
    </div>
  );
};

export default PhotoGallery;
