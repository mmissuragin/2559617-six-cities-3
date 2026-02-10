import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeaderLogo } from './HeaderLogo';
import { BrowserRouter } from 'react-router-dom';

describe('HeaderLogo', () => {
  it('renders link and image', () => {
    render(
      <BrowserRouter>
        <HeaderLogo />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'img/logo.svg');
    expect(img).toHaveAttribute('alt', '6 cities logo');
  });
});
