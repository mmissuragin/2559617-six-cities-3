import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { CitiesTabsList } from './CitiesTabsList';
import { reducer } from '../../store/reducer';
import { CITIES } from '../../const';

describe('CitiesTabsList', () => {
  it('dispatches changeCity when a city tab is clicked', () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CitiesTabsList />
        </MemoryRouter>
      </Provider>
    );

    const cityToClick = CITIES[0];
    fireEvent.click(screen.getByText(cityToClick.name));

    expect(store.getState().city).toBe(cityToClick.name);
  });
});
