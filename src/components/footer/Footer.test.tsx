import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders footer with logo link and image', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'main.html');

    const image = screen.getByAltText('6 cities logo');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'img/logo.svg');
    expect(image).toHaveAttribute('width', '64');
    expect(image).toHaveAttribute('height', '33');
  });
});
