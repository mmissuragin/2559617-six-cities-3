import { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { TOffer } from '../../types/offers';
import { TNearbyOffer } from '../../types/nearby-offers';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { CITY_CENTERS } from '../../const';

type Props = {
  currentOffer: TOffer;
  nearbyOffers: TNearbyOffer[];
};

export function OfferMap({ currentOffer, nearbyOffers }: Props) {
  const mapRef = useRef<HTMLElement | null>(null);

  const cityName = useSelector((state: RootState) => state.city);

  const mapCenter = currentOffer
    ? currentOffer.city.location
    : CITY_CENTERS[cityName];

  const map = useMap(mapRef, mapCenter);
  const markersRef = useRef<leaflet.Marker[]>([]);

  useEffect(() => {
    if (!map) return;

    map.setView([mapCenter.latitude, mapCenter.longitude], mapCenter.zoom);

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    nearbyOffers.slice(0, 3).forEach((offer) => {
      const marker = leaflet.marker(
        [offer.location.latitude, offer.location.longitude],
        {
          icon: leaflet.icon({
            iconUrl: '/img/pin.svg',
            iconSize: [27, 39],
          }),
        }
      );
      marker.addTo(map);
      markersRef.current.push(marker);
    });

    const currentMarker = leaflet.marker(
      [currentOffer.location.latitude, currentOffer.location.longitude],
      {
        icon: leaflet.icon({
          iconUrl: '/img/pin-active.svg',
          iconSize: [27, 39],
        }),
      }
    );
    currentMarker.addTo(map);
    markersRef.current.push(currentMarker);
  }, [map, currentOffer, nearbyOffers, mapCenter]);

  return <section className="offer__map map" ref={mapRef} style={{ height: '500px' }} />;
}
