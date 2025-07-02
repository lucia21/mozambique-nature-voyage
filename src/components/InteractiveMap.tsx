
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useStories } from '@/hooks/useStories';
import type { Story } from '@/hooks/useStories';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  stories?: Story[];
  height?: string;
  center?: [number, number];
  zoom?: number;
}

const InteractiveMap = ({ 
  stories: propStories, 
  height = '400px', 
  center = [-18.2871, 35.2203], // Mozambique center
  zoom = 6 
}: MapProps) => {
  const { data: fetchedStories } = useStories();
  const stories = propStories || fetchedStories || [];

  // Get markers from stories with coordinates
  const markers = stories
    .filter(story => story.coordinates || (story.province && story.location))
    .map(story => {
      // For now, use mock coordinates based on province
      const provinceCoords: Record<string, [number, number]> = {
        'Maputo': [-25.9664, 32.5832],
        'Gaza': [-24.0822, 33.6311],
        'Inhambane': [-23.8650, 35.3833],
        'Sofala': [-19.8433, 34.8519],
        'Manica': [-18.9391, 32.8731],
        'Tete': [-16.1564, 33.5868],
        'Zambézia': [-17.7208, 36.7920],
        'Nampula': [-15.1165, 39.2666],
        'Cabo Delgado': [-11.3408, 40.4467],
        'Niassa': [-13.2543, 36.5608],
      };

      const coords = story.coordinates 
        ? [story.coordinates[0], story.coordinates[1]] as [number, number]
        : provinceCoords[story.province || ''] || center;

      return {
        id: story.id,
        position: coords,
        title: story.title,
        description: story.description,
        author: story.profiles?.full_name || 'Anonymous',
        category: story.category,
      };
    });

  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-sm mb-1">{marker.title}</h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {marker.description}
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {marker.category}
                  </span>
                  <span className="text-gray-500">by {marker.author}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
