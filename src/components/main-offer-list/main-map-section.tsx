import { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { TOffer } from '../../types/offers';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { CITY_CENTERS } from '../../const';

type Props = {
  offers: TOffer[];
};

export function MainMapSection({ offers }: Props) {
  const mapRef = useRef<HTMLElement | null>(null);
  const hoveredOfferId = useSelector((state: RootState) => state.hoveredOfferId);
  const cityName = useSelector((state: RootState) => state.city);

  const mapCenter = offers.length > 0
    ? offers[0].city.location
    : CITY_CENTERS[cityName];

  const map = useMap(mapRef, mapCenter);
  const markersRef = useRef<leaflet.Marker[]>([]);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.setView([mapCenter.latitude, mapCenter.longitude], mapCenter.zoom);

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    offers.forEach((offer) => {
      const iconUrl = offer.id === hoveredOfferId ? '/img/pin-active.svg' : '/img/pin.svg';
      const marker = leaflet.marker([offer.location.latitude, offer.location.longitude], {
        icon: leaflet.icon({ iconUrl, iconSize: [27, 39] })
      });
      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }, [map, offers, hoveredOfferId, mapCenter]);

  return (
    <section
      className="cities__map map"
      ref={mapRef}
      style={{ height: '500px' }}
    />
  );
}
