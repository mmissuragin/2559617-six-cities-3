import { TCity, TLocationCoordinates } from './common';

export type TApartmentType = 'apartment' | 'room';

export type TOffer = {
  id: string;
  title: string;
  type: TApartmentType;
  price: number;
  previewImage: string;
  city: TCity;
  location: TLocationCoordinates;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
};
