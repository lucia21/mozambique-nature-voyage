
import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const { t } = useLanguage();

  // Locations with coordinates for Mozambique provinces
  const locations = [
    {
      name: 'Maputo',
      coordinates: { lat: -25.9692, lng: 32.5732 },
      description: t('map.maputo_desc'),
      stories: 15,
      communities: 8
    },
    {
      name: 'Inhambane', 
      coordinates: { lat: -23.8650, lng: 35.3833 },
      description: t('map.inhambane_desc'),
      stories: 12,
      communities: 5
    },
    {
      name: 'Tete',
      coordinates: { lat: -16.1564, lng: 33.5867 },
      description: t('map.tete_desc'),
      stories: 8,
      communities: 4
    },
    {
      name: 'Nampula',
      coordinates: { lat: -15.1165, lng: 39.2666 },
      description: t('map.nampula_desc'),
      stories: 10,
      communities: 6
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t('map.title')}</h1>
          <p className="text-muted-foreground">
            {t('map.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-[600px] bg-gradient-to-br from-blue-50 to-green-50 relative flex items-center justify-center">
                  <div className="text-center">
                    <Navigation className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{t('map.integration_title')}</h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                      {t('map.integration_desc')}
                    </p>
                    <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                      {locations.map((location) => (
                        <button
                          key={location.name}
                          onClick={() => setSelectedLocation(location.name)}
                          className={`p-3 rounded-lg border transition-all ${
                            selectedLocation === location.name
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-white hover:bg-gray-50 border-gray-200'
                          }`}
                        >
                          <MapPin className="h-4 w-4 mx-auto mb-1" />
                          <span className="text-sm font-medium">{location.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t('map.locations_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold">{locations.length}</div>
                    <p className="text-sm text-muted-foreground">{t('map.featured_provinces')}</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {locations.reduce((sum, loc) => sum + loc.stories, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">{t('map.total_stories')}</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {locations.reduce((sum, loc) => sum + loc.communities, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">{t('map.active_communities')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedLocation && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{selectedLocation}</CardTitle>
                </CardHeader>
                <CardContent>
                  {locations
                    .filter(loc => loc.name === selectedLocation)
                    .map(location => (
                      <div key={location.name} className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          {location.description}
                        </p>
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {location.stories} {t('map.stories')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {location.communities} {t('map.communities')}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t('map.coordinates')}: {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                        </div>
                      </div>
                    ))
                  }
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>{t('map.how_to_use')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• {t('map.instruction_1')}</p>
                  <p>• {t('map.instruction_2')}</p>
                  <p>• {t('map.instruction_3')}</p>
                  <p>• {t('map.instruction_4')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location Cards */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">{t('map.featured_locations')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((location) => (
              <Card 
                key={location.name} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedLocation === location.name ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedLocation(location.name)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    {location.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {location.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span>{location.stories} {t('map.stories')}</span>
                    <span>{location.communities} {t('map.communities')}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
