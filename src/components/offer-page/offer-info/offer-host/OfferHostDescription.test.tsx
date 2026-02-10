import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OfferHostDescription } from './OfferHostDescription';

describe('OfferHostDescription component', () => {
  it('should render the description text correctly', () => {
    const description = 'This is a test description';
    const { getByText, container } = render(<OfferHostDescription description={description} />);

    const textElement = getByText(description);
    expect(textElement).toBeTruthy();
    expect(textElement.className).toContain('offer__text');

    const wrapper = container.querySelector('.offer__description');
    expect(wrapper).toBeTruthy();
  });
});
