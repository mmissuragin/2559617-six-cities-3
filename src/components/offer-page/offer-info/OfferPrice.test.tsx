import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OfferPrice } from './OfferPrice';
import { makeFakeOffer } from '../../../utils/mocks';

describe('OfferPrice component', () => {
  it('should render price correctly', () => {
    const offer = makeFakeOffer();
    const { getByText, container } = render(<OfferPrice offer={offer} />);

    const priceValue = getByText(`€${offer.price}`);
    expect(priceValue).toBeTruthy();
    expect(priceValue.className).toContain('offer__price-value');

    const priceText = container.querySelector('.offer__price-text');
    expect(priceText).toBeTruthy();
    expect(priceText?.textContent).toBe(' night');

    const wrapper = container.querySelector('.offer__price');
    expect(wrapper).toBeTruthy();
  });
});
