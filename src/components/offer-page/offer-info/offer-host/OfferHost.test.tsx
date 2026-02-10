import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OfferHost } from './OfferHost';

describe('OfferHost component', () => {
  const host = {
    name: 'Jane Doe',
    avatarUrl: 'https://example.com/avatar.jpg',
    isPro: true,
  };

  const description = 'This is a description of the host';

  it('should render the host section with title, user and description', () => {
    const { getByText, getByAltText, container } = render(
      <OfferHost host={host} description={description} />
    );

    const title = getByText('Meet the host');
    expect(title).toBeTruthy();
    expect(title.className).toContain('offer__host-title');

    const avatar = getByAltText('Host avatar') as HTMLImageElement;
    expect(avatar).toBeTruthy();
    expect(avatar.src).toBe(host.avatarUrl);

    const name = getByText(host.name);
    expect(name).toBeTruthy();

    const descriptionText = getByText(description);
    expect(descriptionText).toBeTruthy();
    expect(descriptionText.className).toContain('offer__text');

    const wrapper = container.querySelector('.offer__host');
    expect(wrapper).toBeTruthy();
  });
});
