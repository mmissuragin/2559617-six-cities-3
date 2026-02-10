import faker from 'faker';
import { TComment, TCommentUser } from '../types/comments';
import { TCity, TLocationCoordinates } from '../types/common';
import { TApartmentType, TOffer } from '../types/offers';
import { TNearbyOffer } from '../types/nearby-offers';
import { User } from '../types/user';

export const makeFakeLocation = (): TLocationCoordinates => ({
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  zoom: faker.datatype.number({ min: 8, max: 15 }),
});

export const makeFakeCity = (): TCity => ({
  name: faker.address.city(),
  location: makeFakeLocation(),
});

export const makeFakeUser = (): User => ({
  name: faker.name.firstName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
  email: faker.internet.email(),
});

export const makeFakeCommentUser = (): TCommentUser => ({
  name: faker.name.firstName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
});

export const makeFakeComment = (): TComment => ({
  id: faker.datatype.uuid(),
  date: faker.date.recent().toISOString(),
  user: makeFakeCommentUser(),
  comment: faker.lorem.sentence(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
});

export const makeFakeComments = (count = 3): TComment[] =>
  new Array(count).fill(null).map(makeFakeComment);

const makeFakeApartmentType = (): TApartmentType =>
  faker.random.arrayElement(['apartment', 'room']);

export const makeFakeOffer = (): TOffer => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: makeFakeApartmentType(),
  price: faker.datatype.number({ min: 100, max: 500 }),
  previewImage: faker.image.imageUrl(),
  city: makeFakeCity(),
  location: makeFakeLocation(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
  description: faker.lorem.paragraph(),
  bedrooms: faker.datatype.number({ min: 1, max: 5 }),
  goods: new Array(3).fill(null).map(() => faker.commerce.product()),
  host: {
    name: faker.name.firstName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
  },
  images: new Array(6).fill(null).map(() => faker.image.imageUrl()),
  maxAdults: faker.datatype.number({ min: 1, max: 6 }),
});

export const makeFakeOffers = (count = 5): TOffer[] =>
  new Array(count).fill(null).map(makeFakeOffer);

export const makeFakeNearbyOffer = (): TNearbyOffer => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: makeFakeApartmentType(),
  price: faker.datatype.number({ min: 100, max: 500 }),
  city: makeFakeCity(),
  location: makeFakeLocation(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
  previewImage: faker.image.imageUrl(),
});

export const makeFakeNearbyOffers = (count = 3): TNearbyOffer[] =>
  new Array(count).fill(null).map(makeFakeNearbyOffer);

export const makeFakeStoreForApp = (user: User | null = null) => ({
  currentUser: user,
  favorites: {
    offers: [],
    loading: false,
    error: null,
  },
});