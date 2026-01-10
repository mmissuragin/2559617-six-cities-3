import { useEffect, useState, useRef, RefObject } from 'react';
import leaflet, { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapCenter {
  latitude: number;
  longitude: number;
  zoom: number;
}

function useMap(mapRef: RefObject<HTMLElement>, mapCenter: MapCenter): LeafletMap | null {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    const container = mapRef.current;
    if (container && !isRenderedRef.current) {
      const instance = leaflet.map(container, {
        center: [mapCenter.latitude, mapCenter.longitude],
        zoom: mapCenter.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, mapCenter.latitude, mapCenter.longitude, mapCenter.zoom]);

  return map;
}

export default useMap;
