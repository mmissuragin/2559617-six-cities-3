import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritesPlaceCard } from './FavoritesPlaceCard';
import { AppRoute } from '../../const';
import { TOffer } from '../../types/offers';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import * as favoritesActions from '../../store/api-actions/favorites';

vi.mock('../../store/api-actions/favorites');

const fakeOffer: TOffer = {
  id: '1',
  title: 'Test place',
  type: 'apartment',
  price: 200,
  previewImage: 'test.jpg',
  city: { name: 'Paris', location: { latitude: 48.85, longitude: 2.35, zoom: 10 } },
  location: { latitude: 48.85, longitude: 2.35, zoom: 10 },
  isFavorite: false,
  isPremium: true,
  rating: 4,
  description: 'Nice place',
  bedrooms: 2,
  goods: ['Wifi', 'Kitchen', 'TV'],
  host: { name: 'John', avatarUrl: 'avatar.jpg', isPro: true },
  images: ['img1.jpg', 'img2.jpg'],
  maxAdults: 2,
};

describe('FavoritesPlaceCard', () => {
  const dispatchMock = vi.fn();
  const storeMock = { dispatch: dispatchMock, getState: vi.fn(), subscribe: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with offer data', () => {
    render(
      <Provider store={storeMock as any}>
        <MemoryRouter>
          <FavoritesPlaceCard offer={fakeOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', fakeOffer.previewImage);

    const titleLink = screen.getByText(fakeOffer.title).closest('a');
    expect(titleLink).toHaveAttribute('href', `${AppRoute.Offer}/${fakeOffer.id}`);

    expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.type)).toBeInTheDocument();
  });

  it('dispatches toggleFavorite when bookmark button is clicked', async () => {
    const toggleFavoriteSpy = vi.spyOn(favoritesActions, 'toggleFavorite');

    render(
      <Provider store={storeMock as any}>
        <MemoryRouter>
          <FavoritesPlaceCard offer={fakeOffer} />
        </MemoryRouter>
      </Provider>
    );

    const bookmarkButton = screen.getByRole('button');
    await userEvent.click(bookmarkButton);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(toggleFavoriteSpy).toHaveBeenCalledWith({
      offerId: fakeOffer.id,
      isFavorite: fakeOffer.isFavorite,
    });
  });
});
