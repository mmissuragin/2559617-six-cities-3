import { TLocationCoordinates } from './types/common';

export enum AppRoute {
    Main = '/',
    Login= '/login',
    Favorites = '/favorites',
    Offer = '/offer'
}


export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const CITIES = [
  { id: 'paris', name: 'Paris' },
  { id: 'cologne', name: 'Cologne' },
  { id: 'brussels', name: 'Brussels' },
  { id: 'amsterdam', name: 'Amsterdam' },
  { id: 'hamburg', name: 'Hamburg' },
  { id: 'dusseldorf', name: 'Dusseldorf' },
];

export const FILTERS = [
  { id: 'popular', name: 'Popular' },
  { id: 'price-low-to-high', name: 'Price: low to high' },
  { id: 'price-high-to-low', name: 'Price: high to low' },
  { id: 'top-rated-first', name: 'Top rated first' },
];

export const CITY_CENTERS: Record<string, TLocationCoordinates> = {
  Paris: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  Cologne: { latitude: 50.9375, longitude: 6.9603, zoom: 10 },
  Brussels: { latitude: 50.8503, longitude: 4.3517, zoom: 13 },
  Amsterdam: { latitude: 52.3676, longitude: 4.9041, zoom: 10 },
  Hamburg: { latitude: 53.5511, longitude: 9.9937, zoom: 10 },
  Dusseldorf: { latitude: 51.2277, longitude: 6.7735, zoom: 10 },
};

