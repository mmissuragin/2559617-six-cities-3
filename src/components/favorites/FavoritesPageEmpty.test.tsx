import { render, screen } from '@testing-library/react';
import { FavoritesPageEmpty } from './FavoritesPageEmpty';

describe('FavoritesPageEmpty', () => {
  it('renders empty favorites page with correct text', () => {
    render(<FavoritesPageEmpty />);

    const heading = screen.getByRole('heading', { hidden: true });
    expect(heading).toHaveTextContent('Favorites (empty)');

    const status = screen.getByText('Nothing yet saved.');
    expect(status).toBeInTheDocument();

    const description = screen.getByText(
      'Save properties to narrow down search or plan your future trips.'
    );
    expect(description).toBeInTheDocument();

    expect(document.querySelector('.page--favorites-empty')).toBeInTheDocument();
    expect(document.querySelector('.favorites--empty')).toBeInTheDocument();
  });
});
