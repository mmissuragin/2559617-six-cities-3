import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OfferRating } from './OfferRating';
import { makeFakeOffer } from '../../../utils/mocks';

describe('OfferRating component', () => {
  it('should render rating with correct width and value', () => {
    const offer = makeFakeOffer();
    const { container, getByText } = render(<OfferRating offer={offer} />);

    const ratingSpan = container.querySelector('.offer__stars span');
    expect(ratingSpan).toBeTruthy();
    const expectedWidth = `${Math.round(offer.rating) * 20}%`;
    expect(ratingSpan?.getAttribute('style')).toContain(`width: ${expectedWidth}`);

    const ratingValue = getByText(offer.rating.toString());
    expect(ratingValue).toBeTruthy();
    expect(ratingValue.className).toContain('offer__rating-value');

    const wrapper = container.querySelector('.offer__rating');
    expect(wrapper).toBeTruthy();
  });
});
