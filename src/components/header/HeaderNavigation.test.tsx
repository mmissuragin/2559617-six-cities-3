import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeaderNavigation } from './HeaderNavigation';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

const mockStore = (state: any) =>
  configureStore({
    reducer: (s = state) => s,
  });

describe('HeaderNavigation', () => {
  it('renders Sign in when no user', () => {
    const store = mockStore({ currentUser: null, favorites: { offers: [] } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <HeaderNavigation />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
