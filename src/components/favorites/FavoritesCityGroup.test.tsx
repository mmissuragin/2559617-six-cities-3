import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesCityGroup } from './FavoritesCityGroup';
import { makeFakeOffer } from '../../utils/mocks';
import { initialState, OffersState } from '../../store/reducer/initial-state';

describe('FavoritesCityGroup', () => {
  it('renders city name and list of offers', () => {
    const cityName = 'Paris';
    const offer1 = makeFakeOffer();
    const offer2 = makeFakeOffer();
    const offers = [offer1, offer2];

    const preloadedState: OffersState = {
      ...initialState,
      city: cityName,
      favorites: {
        offers,
        loading: false,
        error: null,
      },
    };

    const store = configureStore({
      reducer: (state = preloadedState) => state,
      preloadedState,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesCityGroup cityName={cityName} offers={offers} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(cityName)).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBe(offers.length);
  });
});
