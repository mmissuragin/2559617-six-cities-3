import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NearPlacesCard } from './NearPlacesCard';

const mockDispatch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) =>
    selector({
      offers: [
        { id: '1', isFavorite: false },
        { id: '2', isFavorite: true },
      ],
      currentUser: { name: 'John Doe' },
    }),
}));

describe('NearPlacesCard component', () => {
  const defaultProps = {
    id: '1',
    isPremium: true,
    imageSrc: 'https://example.com/image.jpg',
    pricePerNight: 100,
    rating: 80,
    title: 'Test Place',
    type: 'apartment',
  };

  function renderWithRouter(props = defaultProps) {
    return render(
      <BrowserRouter>
        <NearPlacesCard {...props} />
      </BrowserRouter>
    );
  }

  it('should render correctly with given props', () => {
    const { getByText, getByAltText } = renderWithRouter();

    expect(getByText('Premium')).toBeTruthy();
    expect(getByText('€100')).toBeTruthy();
    expect(getByText('Test Place')).toBeTruthy();
    expect(getByText('apartment')).toBeTruthy();
    expect(getByAltText('Place image')).toBeTruthy();
  });

  it('should display bookmark button with correct class based on isFavorite', () => {
    const { container } = renderWithRouter();
    const button = container.querySelector('button.place-card__bookmark-button');
    expect(button?.className).toContain('place-card__bookmark-button');
    expect(button?.className).not.toContain('place-card__bookmark-button--active');
  });

  it('should render correct rating width', () => {
    const { container } = renderWithRouter();
    const ratingSpan = container.querySelector('.place-card__stars span');
    expect(ratingSpan).toHaveStyle('width: 80%');
  });

  it('should contain links to offer page', () => {
    const { container } = renderWithRouter();
    const links = container.querySelectorAll('a');
    links.forEach((link) => {
      expect(link.getAttribute('href')).toBe(`/offer/${defaultProps.id}`);
    });
  });
});
