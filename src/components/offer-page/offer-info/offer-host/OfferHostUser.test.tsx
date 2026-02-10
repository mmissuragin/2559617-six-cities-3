import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OfferHostUser } from './OfferHostUser';

describe('OfferHostUser component', () => {
  const baseHost = {
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg',
    isPro: false,
  };

  it('should render host avatar and name correctly', () => {
    const { getByAltText, getByText, queryByText } = render(<OfferHostUser host={baseHost} />);

    const avatar = getByAltText('Host avatar') as HTMLImageElement;
    expect(avatar).toBeTruthy();
    expect(avatar.src).toBe(baseHost.avatarUrl);
    expect(avatar.className).toContain('offer__avatar');

    const name = getByText(baseHost.name);
    expect(name).toBeTruthy();

    expect(queryByText('Pro')).toBeNull();
    const wrapper = avatar.parentElement;
    expect(wrapper?.className).not.toContain('--pro');
  });

  it('should render Pro status and pro class when host is pro', () => {
    const proHost = { ...baseHost, isPro: true };
    const { getByText, getByAltText } = render(<OfferHostUser host={proHost} />);

    expect(getByText('Pro')).toBeTruthy();
    const wrapper = getByAltText('Host avatar').parentElement;
    expect(wrapper?.className).toContain('--pro');
  });
});
