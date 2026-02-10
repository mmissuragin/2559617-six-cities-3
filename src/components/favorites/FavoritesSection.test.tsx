import { render, screen } from '@testing-library/react';
import { FavoritesSection } from './FavoritesSection';
import { makeFakeOffer, makeFakeCity } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

describe('FavoritesSection', () => {
  const dispatchMock = vi.fn();
  const storeMock = { dispatch: dispatchMock, getState: vi.fn(), subscribe: vi.fn() };

  it('renders groups of offers by city', () => {
    const city1 = makeFakeCity();
    const city2 = makeFakeCity();
    const offer1 = { ...makeFakeOffer(), city: city1 };
    const offer2 = { ...makeFakeOffer(), city: city2 };
    const offer3 = { ...makeFakeOffer(), city: city1 };
    const offers = [offer1, offer2, offer3];

    render(
      <Provider store={storeMock as any}>
        <MemoryRouter>
          <FavoritesSection offers={offers} />
        </MemoryRouter>
      </Provider>
    );

    const cityNames = [city1.name, city2.name];
    cityNames.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
    expect(screen.getAllByRole('listitem').length).toBe(cityNames.length);
  });
});
