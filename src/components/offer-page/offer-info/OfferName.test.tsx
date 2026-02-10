import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { OfferName } from './OfferName';
import { TOffer } from '../../../types/offers';

vi.mock('../../../store/api-actions/favorites', () => ({
  toggleFavorite: vi.fn(),
}));

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (fn: any) =>
    fn({ currentUser: { name: 'John' } }),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('OfferName component', () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders offer title and bookmark button', () => {
    const { getByText, container } = render(<OfferName offer={offer} />);
    expect(getByText(offer.title)).toBeTruthy();
    const button = container.querySelector('button.offer__bookmark-button');
    expect(button).toBeTruthy();
  });

  it('toggles favorite state and dispatches action', () => {
    const { container } = render(<OfferName offer={offer} />);
    const button = container.querySelector('button.offer__bookmark-button')!;
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledOnce();
  });

  it('renders active class if offer is initially favorite', () => {
    const favOffer = { ...offer, isFavorite: true };
    const { container } = render(<OfferName offer={favOffer} />);
    const button = container.querySelector('button.offer__bookmark-button')!;
    expect(button.className).toContain('--active');
  });
});
