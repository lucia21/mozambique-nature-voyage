
import { useStories } from '@/hooks/useStories';
import CommunityStoryCard from '@/components/CommunityStoryCard';
import Header from '@/components/Header';
import { Loader2, Heart, Users, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Feed = () => {
  const { data: stories, isLoading, error } = useStories();
  const { toast } = useToast();
  const [likedStories, setLikedStories] = useState<Set<number>>(new Set());

  // Updated sample stories for Mozambican rural communities
  const sampleStories = [
    {
      id: 1,
      title: "Pastoreio de Gado",
      community: "Tete Rural",
      province: "Tete",
      author: "Pedro Muthemba",
      description: "Os jovens pastores continuam a tradição antiga de pastorear gado pelas vastas paisagens de Moçambique. Esta prática conecta-nos aos nossos antepassados.",
      image: "/lovable-uploads/fb9c090c-e1c0-4cce-ab4a-fe7a98278869.png",
      category: "traditions",
      date: "2024-01-15",
      coordinates: [-16.1564, 33.5867] as [number, number],
    },
    {
      id: 2,
      title: "Arte Tradicional",
      community: "Maputo",
      province: "Maputo",
      author: "Elisabete Sitoe",
      description: "As nossas esculturas e cerâmica tradicionais contam histórias de gerações passadas. Cada peça representa a alma da nossa cultura.",
      image: "/lovable-uploads/48744a47-db91-40e5-965d-3376181d9e3a.png",
      category: "crafts",
      date: "2024-01-12",
      coordinates: [-25.9692, 32.5732] as [number, number],
    },
    {
      id: 3,
      title: "Mbira - Nossa Música",
      community: "Inhambane",
      province: "Inhambane",
      author: "Armando Chissano",
      description: "A mbira, o nosso piano tradicional, carrega o coração da cultura moçambicana. Cada nota conecta-nos às cerimónias espirituais.",
      image: "/lovable-uploads/6e6e84ae-4052-4978-80b1-a698004696c7.png",
      category: "music",
      date: "2024-01-10",
      coordinates: [-23.8500, 35.5667] as [number, number],
    },
    {
      id: 4,
      title: "Agricultura com Orgulho",
      community: "Nampula",
      province: "Nampula", 
      author: "João Mahanjane",
      description: "Os nossos agricultores trabalham a terra com orgulho e conhecimento tradicional. Do plantio à colheita, cada passo conecta-nos à terra.",
      image: "/lovable-uploads/022142ad-f998-4900-b101-3342cb726494.png",
      category: "agriculture",
      date: "2024-01-05",
      coordinates: [-15.1165, 39.2666] as [number, number],
    },
    {
      id: 5,
      title: "Unidade Comunitária",
      community: "Cabo Delgado",
      province: "Cabo Delgado",
      author: "Fatima Namashulua",
      description: "As nossas roupas tradicionais e encontros comunitários celebram a diversidade e unidade da cultura moçambicana.",
      image: "/lovable-uploads/6f68d633-a5bc-4700-b583-65b82e702a3a.png",
      category: "traditional_clothes",
      date: "2024-01-03",
      coordinates: [-11.2681, 40.5117] as [number, number],
    },
  ];

  const handleLike = (storyId: number) => {
    const newLikedStories = new Set(likedStories);
    if (likedStories.has(storyId)) {
      newLikedStories.delete(storyId);
      toast({
        title: "✅ Apoio removido",
        description: "Removeu o seu apoio desta história.",
      });
    } else {
      newLikedStories.add(storyId);
      toast({
        title: "❤️ História apoiada!",
        description: "Obrigado por apoiar esta história da comunidade.",
      });
    }
    setLikedStories(newLikedStories);
  };

  const handleConnect = (storyId: number) => {
    toast({
      title: "🤝 Pedido enviado!",
      description: "O seu pedido de conexão foi enviado ao contador da história.",
    });
  };

  const handleViewOnMap = (storyId: number) => {
    const story = sampleStories.find(s => s.id === storyId);
    if (story) {
      toast({
        title: "📍 Ver no mapa",
        description: `A mostrar localização de ${story.title} no mapa.`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <span className="ml-4 text-xl">A carregar histórias...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-4xl font-bold text-destructive mb-6">Não foi possível carregar as histórias</h2>
            <p className="text-muted-foreground text-xl mb-8">Por favor, toque para tentar novamente.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Use real stories if available, otherwise show sample stories
  const displayStories = stories && stories.length > 0 ? stories : [];
  const showSampleStories = displayStories.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Simplified header for rural users */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            Histórias da Nossa Comunidade
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Descubra a beleza e cultura de Moçambique
          </p>
          {showSampleStories && (
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl">
              <p className="text-lg text-primary font-medium leading-relaxed">
                ✨ Bem-vindo à nossa comunidade! Estas histórias mostram a rica cultura e paisagens de Moçambique. 
                Partilhe a sua própria história para se conectar com outros.
              </p>
            </div>
          )}
        </div>

        {/* Simplified story feed */}
        <div className="space-y-12">
          {showSampleStories ? (
            sampleStories.map((story) => (
              <div key={story.id} className="animate-fade-in">
                <SimplifiedStoryCard
                  story={story}
                  isLiked={likedStories.has(story.id)}
                  onLike={() => handleLike(story.id)}
                  onConnect={() => handleConnect(story.id)}
                  onViewOnMap={() => handleViewOnMap(story.id)}
                />
              </div>
            ))
          ) : (
            displayStories
              .filter(story => story.image_url)
              .map((story) => (
                <div key={story.id} className="animate-fade-in">
                  <SimplifiedStoryCard
                    story={{
                      id: parseInt(story.id),
                      title: story.title,
                      community: story.communities?.name || story.location || 'Comunidade',
                      province: story.province || '',
                      author: story.profiles?.full_name || 'Anónimo',
                      description: story.description,
                      image: story.image_url || '/placeholder.svg',
                      category: story.category,
                      date: story.created_at,
                      coordinates: [0, 0] as [number, number],
                    }}
                    isLiked={likedStories.has(parseInt(story.id))}
                    onLike={() => handleLike(parseInt(story.id))}
                    onConnect={() => handleConnect(parseInt(story.id))}
                    onViewOnMap={() => handleViewOnMap(parseInt(story.id))}
                  />
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

// Simplified story card component for rural users with limited digital literacy
const SimplifiedStoryCard = ({ story, isLiked, onLike, onConnect, onViewOnMap }: {
  story: any;
  isLiked: boolean;
  onLike: () => void;
  onConnect: () => void;
  onViewOnMap: () => void;
}) => {
  const getCategoryLabel = (category: string) => {
    const labels = {
      traditions: "Tradições",
      crafts: "Artesanato", 
      music: "Música",
      agriculture: "Agricultura",
      celebrations: "Celebrações",
      traditional_dances: "Danças Tradicionais",
      elder_wisdom: "Sabedoria dos Anciãos",
      traditional_clothes: "Roupas Tradicionais"
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <div className="bg-card rounded-3xl shadow-xl overflow-hidden border-2 border-border hover:shadow-2xl transition-all duration-300">
      {/* Simplified header with larger text */}
      <div className="p-6 border-b-2 border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {story.author?.charAt(0) || 'A'}
              </span>
            </div>
            <div>
              <p className="font-bold text-xl text-foreground">{story.author}</p>
              <p className="text-lg text-muted-foreground">
                {story.community}{story.province && `, ${story.province}`}
              </p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-full text-sm font-bold border-2 bg-primary/10 text-primary border-primary/30">
            {getCategoryLabel(story.category)}
          </div>
        </div>
      </div>

      {/* Large image for better visibility */}
      <div className="relative aspect-square">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content with larger text */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4 text-foreground leading-tight">{story.title}</h3>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          {story.description}
        </p>
        
        <div className="flex items-center justify-between text-base text-muted-foreground mb-6">
          <span className="font-medium">{new Date(story.date).toLocaleDateString('pt-PT')}</span>
        </div>

        {/* Large, simplified action buttons */}
        <div className="space-y-4">
          <button
            onClick={onLike}
            className={`w-full flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-200 ${
              isLiked 
                ? 'bg-primary text-primary-foreground shadow-lg transform scale-105' 
                : 'bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/50'
            }`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            {isLiked ? 'Apoiado ❤️' : 'Apoiar'}
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onConnect}
              className="flex items-center justify-center gap-2 bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground font-bold py-3 px-4 rounded-2xl transition-colors text-lg border-2 border-secondary/50"
            >
              <Users className="w-5 h-5" />
              Conectar
            </button>
            <button
              onClick={onViewOnMap}
              className="bg-accent/20 hover:bg-accent/30 text-accent-foreground font-bold py-3 px-4 rounded-2xl transition-colors flex items-center justify-center text-lg border-2 border-accent/50"
            >
              <MapPin className="w-5 h-5" />
              Localização
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
