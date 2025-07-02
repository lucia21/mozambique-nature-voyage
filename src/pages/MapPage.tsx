
import Header from '@/components/Header';
import InteractiveMap from '@/components/InteractiveMap';
import { useStories } from '@/hooks/useStories';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MapPin } from 'lucide-react';

const MapPage = () => {
  const { data: stories, isLoading, error } = useStories();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
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
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Map</h2>
            <p className="text-muted-foreground">Please try refreshing the page.</p>
          </div>
        </div>
      </div>
    );
  }

  const storiesWithLocation = stories?.filter(story => 
    story.coordinates || (story.province && story.location)
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Story Map</h1>
          <p className="text-muted-foreground">
            Explore stories from communities across Moçambique
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <InteractiveMap stories={stories} height="600px" />
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Map Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold">{storiesWithLocation.length}</div>
                    <p className="text-sm text-muted-foreground">Stories with location</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stories?.length || 0}</div>
                    <p className="text-sm text-muted-foreground">Total stories</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Click on markers to see story details</p>
                  <p>• Zoom in/out to explore different regions</p>
                  <p>• Stories are grouped by location</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
