import { TApartmentType } from './offers';
import { TCity, TLocationCoordinates } from './common';

export type TNearbyOffer = {
  id: string;
  title: string;
  type: TApartmentType;
  price: number;
  city: TCity;
  location: TLocationCoordinates;
  isFavorite?: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};
