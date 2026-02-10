import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OfferGalleryItem } from './OfferGalleryItem';

describe('OfferGalleryItem component', () => {
  it('should render image with correct src and alt', () => {
    const srcPhoto = 'https://example.com/photo.jpg';
    const { getByAltText } = render(<OfferGalleryItem srcPhoto={srcPhoto} />);

    const img = getByAltText('Photo studio') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('photo.jpg');
    expect(img.className).toContain('offer__image');
  });

  it('should have wrapper div with correct class', () => {
    const srcPhoto = 'https://example.com/photo.jpg';
    const { container } = render(<OfferGalleryItem srcPhoto={srcPhoto} />);

    const wrapper = container.querySelector('.offer__image-wrapper');
    expect(wrapper).toBeTruthy();
  });
});
