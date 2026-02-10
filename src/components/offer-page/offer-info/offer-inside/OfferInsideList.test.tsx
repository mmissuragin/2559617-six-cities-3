import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OfferInsideList } from './OfferInsideList';
import { TOffer } from '../../../../types/offers';

describe('OfferInsideList component', () => {
  const offer: TOffer = {
    id: '1',
    title: 'Test Offer',
    type: 'apartment',
    price: 150,
    previewImage: 'https://example.com/image.jpg',
    city: { name: 'Test City', location: { latitude: 0, longitude: 0, zoom: 10 } },
    location: { latitude: 0, longitude: 0, zoom: 10 },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    description: 'Test description',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Heating', 'Kitchen'],
    host: { name: 'John Doe', avatarUrl: 'https://example.com/avatar.jpg', isPro: false },
    images: [],
    maxAdults: 4,
  };

  it('should render title and list of goods', () => {
    const { getByText, container } = render(<OfferInsideList offer={offer} />);

    const title = getByText("What's inside");
    expect(title).toBeTruthy();
    expect(title.className).toContain('offer__inside-title');

    const wrapper = container.querySelector('.offer__inside');
    expect(wrapper).toBeTruthy();

    const list = container.querySelector('.offer__inside-list');
    expect(list).toBeTruthy();

    offer.goods.forEach((good) => {
      const listItem = getByText(good);
      expect(listItem).toBeTruthy();
      expect(listItem.className).toContain('offer__inside-item');
    });
  });
});
