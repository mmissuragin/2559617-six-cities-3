import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { OfferGallery } from './OfferGallery';

vi.mock('./OfferGalleryItem', () => ({
  OfferGalleryItem: vi.fn(({ srcPhoto }) => <div data-testid="gallery-item">{srcPhoto}</div>),
}));

const mockUseSelector = vi.fn();
vi.mock('react-redux', () => ({
  useSelector: (fn: any) => mockUseSelector(fn),
}));

describe('OfferGallery component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render null if currentOffer is not defined', () => {
    mockUseSelector.mockReturnValueOnce(null);
    const { container } = render(<OfferGallery />);
    expect(container.firstChild).toBeNull();
  });

  it('should render gallery container and up to 6 images', () => {
    const images = [
      'img1.jpg',
      'img2.jpg',
      'img3.jpg',
      'img4.jpg',
      'img5.jpg',
      'img6.jpg',
      'img7.jpg',
    ];
    mockUseSelector.mockReturnValueOnce({ images });

    const { container, getAllByTestId } = render(<OfferGallery />);

    expect(container.querySelector('.offer__gallery-container')).toBeTruthy();
    expect(container.querySelector('.offer__gallery')).toBeTruthy();

    const items = getAllByTestId('gallery-item');
    expect(items.length).toBe(6);
    expect(items[0].textContent).toBe('img1.jpg');
    expect(items[5].textContent).toBe('img6.jpg');
  });
});
