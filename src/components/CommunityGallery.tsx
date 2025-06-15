
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Heart, Share2, Users } from "lucide-react";

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

interface CommunityGalleryProps {
  stories: CommunityStory[];
  onUploadPhoto?: () => void;
  onLikePhoto?: (photoTitle: string) => void;
}

const CommunityGallery = ({ stories, onUploadPhoto, onLikePhoto }: CommunityGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Additional community photos showcasing Mozambican culture
  const communityPhotos = [
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      title: "Village Life",
      category: "daily_life",
      community: "Zambézia Village",
      author: "Local Community"
    },
    {
      url: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=800&h=600&fit=crop",
      title: "Traditional Farming",
      category: "agriculture",
      community: "Inhambane Province",
      author: "Farmers Collective"
    },
    {
      url: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop",
      title: "Wildlife Conservation",
      category: "traditions",
      community: "Niassa Reserve",
      author: "Conservation Group"
    },
    {
      url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
      title: "Sacred Landscapes",
      category: "elder_wisdom",
      community: "Gorongosa",
      author: "Elders Council"
    },
    {
      url: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=600&fit=crop",
      title: "Festival Dancing",
      category: "traditional_dances",
      community: "Pemba",
      author: "Cultural Group"
    },
    {
      url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      title: "Elder Teaching",
      category: "elder_wisdom",
      community: "Chimoio",
      author: "Community Elders"
    },
    {
      url: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&h=600&fit=crop",
      title: "Traditional Transport",
      category: "daily_life",
      community: "Tete Province",
      author: "Rural Community"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Photos', count: stories.length + communityPhotos.length },
    { id: 'traditions', name: 'Traditions', count: [...stories, ...communityPhotos].filter(item => item.category === 'traditions').length },
    { id: 'traditional_dances', name: 'Traditional Dances', count: [...stories, ...communityPhotos].filter(item => item.category === 'traditional_dances').length },
    { id: 'traditional_clothes', name: 'Traditional Clothes', count: [...stories, ...communityPhotos].filter(item => item.category === 'traditional_clothes').length },
    { id: 'elder_wisdom', name: 'Elder Wisdom', count: [...stories, ...communityPhotos].filter(item => item.category === 'elder_wisdom').length },
    { id: 'languages', name: 'Languages', count: [...stories, ...communityPhotos].filter(item => item.category === 'languages').length },
    { id: 'agriculture', name: 'Agriculture', count: [...stories, ...communityPhotos].filter(item => item.category === 'agriculture').length },
    { id: 'daily_life', name: 'Daily Life', count: communityPhotos.filter(photo => photo.category === 'daily_life').length }
  ];

  const getFilteredImages = () => {
    let images: any[] = [];
    
    // Add story images
    if (selectedCategory === 'all') {
      images = [...images, ...stories.map(story => ({
        url: story.image,
        title: story.title,
        category: story.category,
        community: story.community,
        author: story.author
      }))];
    } else {
      images = [...images, ...stories.filter(story => story.category === selectedCategory).map(story => ({
        url: story.image,
        title: story.title,
        category: story.category,
        community: story.community,
        author: story.author
      }))];
    }
    
    // Add community photos
    if (selectedCategory === 'all') {
      images = [...images, ...communityPhotos];
    } else {
      images = [...images, ...communityPhotos.filter(photo => photo.category === selectedCategory)];
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
                    <p className="text-xs opacity-90">{image.community}</p>
                    <p className="text-xs opacity-75">by {image.author}</p>
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
                      <p className="text-sm opacity-90">{image.community}</p>
                      <p className="text-xs opacity-75">Shared by {image.author}</p>
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
        <Users className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Share Your Community's Cultural Heritage</h3>
        <p className="text-muted-foreground mb-4">
          Upload photos of your traditional dances, clothing, elder wisdom, and cultural practices
        </p>
        <Button onClick={onUploadPhoto}>
          <Camera className="mr-2 h-4 w-4" />
          Upload Photos
        </Button>
      </Card>
    </div>
  );
};

export default CommunityGallery;
