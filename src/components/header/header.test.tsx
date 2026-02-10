import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

const mockStore = (state: any) =>
  configureStore({
    reducer: (s = state) => s,
  });

describe('Header', () => {
  it('renders HeaderLogo and HeaderNavigation by default', () => {
    const store = mockStore({ currentUser: null, favorites: { offers: [] } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(logoLink).toBeInTheDocument();

    const signInLink = screen.getByText('Sign in');
    expect(signInLink).toBeInTheDocument();
  });
});
