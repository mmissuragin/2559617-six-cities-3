import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OfferPremiumMark } from './OfferPremiumMark';

describe('OfferPremiumMark component', () => {
  it('should render Premium mark', () => {
    const { getByText, container } = render(<OfferPremiumMark />);

    const mark = getByText('Premium');
    expect(mark).toBeTruthy();

    const wrapper = container.querySelector('.offer__mark');
    expect(wrapper).toBeTruthy();
  });
});
