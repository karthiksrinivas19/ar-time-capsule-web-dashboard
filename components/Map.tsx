import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Memory {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
}

interface MapProps {
  memories: Memory[];
  onPinClick: (id: string) => void;
}

const Map = ({ memories, onPinClick }: MapProps) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    // Add markers for each memory
    memories.forEach(memory => {
      const marker = L.marker([memory.latitude, memory.longitude])
        .addTo(mapRef.current!)
        .bindPopup(memory.title)
        .on('click', () => onPinClick(memory.id));
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [memories, onPinClick]);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default Map;
