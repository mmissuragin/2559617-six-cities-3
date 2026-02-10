import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OfferFeatures } from './OfferFeatures';
import { TOffer } from '../../../types/offers';

describe('OfferFeatures component', () => {
  const offer: TOffer = {
    id: '1',
    title: 'Test Offer',
    type: 'apartment',
    price: 200,
    previewImage: 'https://example.com/image.jpg',
    city: { name: 'Test City', location: { latitude: 0, longitude: 0, zoom: 10 } },
    location: { latitude: 0, longitude: 0, zoom: 10 },
    isFavorite: false,
    isPremium: true,
    rating: 4,
    description: 'Test description',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Kitchen'],
    host: { name: 'John Doe', avatarUrl: 'https://example.com/avatar.jpg', isPro: true },
    images: [],
    maxAdults: 3,
  };

  it('should render offer features correctly', () => {
    const { container } = render(<OfferFeatures offer={offer} />);

    const wrapper = container.querySelector('.offer__features');
    expect(wrapper).toBeTruthy();

    const typeItem = container.querySelector('.offer__feature--entire');
    expect(typeItem).toBeTruthy();
    expect(typeItem?.textContent).toBe(offer.type);

    const bedroomsItem = container.querySelector('.offer__feature--bedrooms');
    expect(bedroomsItem).toBeTruthy();
    expect(bedroomsItem?.textContent).toBe(`${offer.bedrooms} Bedrooms`);

    const adultsItem = container.querySelector('.offer__feature--adults');
    expect(adultsItem).toBeTruthy();
    expect(adultsItem?.textContent).toBe(`Max ${offer.maxAdults} adults`);
  });

  it('should correctly handle singular forms for 1 bedroom or 1 adult', () => {
    const singularOffer = { ...offer, bedrooms: 1, maxAdults: 1 };
    const { container } = render(<OfferFeatures offer={singularOffer} />);

    const bedroomsItem = container.querySelector('.offer__feature--bedrooms');
    expect(bedroomsItem?.textContent).toBe('1 Bedroom');

    const adultsItem = container.querySelector('.offer__feature--adults');
    expect(adultsItem?.textContent).toBe('Max 1 adult');
  });
});
