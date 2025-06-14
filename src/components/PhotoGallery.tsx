
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
  onUploadPhotos?: () => void;
  onLikePhoto?: (photoTitle: string) => void;
  onSharePhoto?: (photoTitle: string) => void;
}

const PhotoGallery = ({ destinations, onUploadPhotos, onLikePhoto, onSharePhoto }: PhotoGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Enhanced gallery with more rural Mozambique imagery
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      title: "Wildlife in Gorongosa",
      category: "wildlife",
      location: "Gorongosa National Park"
    },
    {
      url: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop",
      title: "Antelope and Zebra",
      category: "wildlife",
      location: "Niassa Reserve"
    },
    {
      url: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=800&h=600&fit=crop",
      title: "Rural Cattle",
      category: "rural",
      location: "Inhambane Province"
    },
    {
      url: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=800&h=600&fit=crop",
      title: "Forest Cattle",
      category: "rural",
      location: "Manica Province"
    },
    {
      url: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=800&h=600&fit=crop",
      title: "Rural Wildlife",
      category: "wildlife",
      location: "Tete Province"
    },
    {
      url: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&h=600&fit=crop",
      title: "Desert Wildlife",
      category: "wildlife",
      location: "Gaza Province"
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
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      title: "Rural Village",
      category: "rural",
      location: "Zambézia Province"
    },
    {
      url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
      title: "African Savanna",
      category: "nature",
      location: "Gorongosa"
    },
    {
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
      title: "Pristine Coastline",
      category: "beaches",
      location: "Cabo Delgado"
    },
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      title: "Mountain Vista",
      category: "mountains",
      location: "Manica Highlands"
    },
    {
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      title: "Island Paradise",
      category: "beaches",
      location: "Quirimbas Islands"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Photos', count: galleryImages.length + destinations.length },
    { id: 'destinations', name: 'Destinations', count: destinations.length },
    { id: 'wildlife', name: 'Wildlife', count: galleryImages.filter(img => img.category === 'wildlife').length },
    { id: 'nature', name: 'Nature', count: galleryImages.filter(img => img.category === 'nature').length },
    { id: 'beaches', name: 'Beaches', count: galleryImages.filter(img => img.category === 'beaches').length },
    { id: 'mountains', name: 'Mountains', count: galleryImages.filter(img => img.category === 'mountains').length },
    { id: 'rural', name: 'Rural Life', count: galleryImages.filter(img => img.category === 'rural').length }
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
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="bg-white/20 hover:bg-white/30"
                        onClick={() => onLikePhoto?.(image.title)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="bg-white/20 hover:bg-white/30"
                        onClick={() => onSharePhoto?.(image.title)}
                      >
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
        <Button onClick={onUploadPhotos}>
          Upload Photos
        </Button>
      </Card>
    </div>
  );
};

export default PhotoGallery;
