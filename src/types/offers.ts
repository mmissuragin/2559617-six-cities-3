export type TApartmentType = 'apartment' | 'room';
export type TLocationCoordinates = {
    latitude: number;
    longitude: number;
    zoom: number;
}
export type TCity = {
    name: string;
    location: TLocationCoordinates;
}

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
    images: string [];
    maxAdults: number;
}
// это будет отдельный тип для офферов по близости
export type TNearbyOffer = {
  id: string;
  title: string;
  type: 'apartment' | 'room';
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite?: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};
// это будет отдельный тип для комментарией потом
export type TCommentUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type TComment = {
  id: string;
  date: string;
  user: TCommentUser;
  comment: string;
  rating: number;
};
