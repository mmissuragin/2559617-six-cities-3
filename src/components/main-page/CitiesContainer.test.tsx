import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CitiesContainer } from './CitiesContainer';
import { vi } from 'vitest';

vi.mock('./OfferList', () => ({
  OfferList: () => <div data-testid="offer-list">OfferList</div>,
}));

vi.mock('./MapSection', () => ({
  MapSection: () => <div data-testid="map-section">MapSection</div>,
}));

function renderWithStore(preloadedState: any) {
  const store = configureStore({
    reducer: (state) => state as any,
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <CitiesContainer />
    </Provider>
  );
}

describe('CitiesContainer', () => {
  it('renders empty state when no offers for selected city', () => {
    renderWithStore({
      city: 'Paris',
      offers: [],
    });

    expect(
      screen.getByText('No places to stay available')
    ).toBeInTheDocument();

    expect(
      screen.getByText(/We could not find any property available at the moment in Paris/i)
    ).toBeInTheDocument();

    expect(screen.queryByTestId('offer-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('map-section')).not.toBeInTheDocument();

    expect(screen.getByAltText('Map of Paris')).toBeInTheDocument();
  });

  it('renders offers and map when offers exist for city', () => {
    renderWithStore({
      city: 'Paris',
      offers: [
        { id: '1', city: { name: 'Paris' } },
        { id: '2', city: { name: 'Paris' } },
      ],
    });

    expect(screen.getByTestId('offer-list')).toBeInTheDocument();
    expect(screen.getByTestId('map-section')).toBeInTheDocument();

    expect(
      screen.queryByText('No places to stay available')
    ).not.toBeInTheDocument();
  });
});
