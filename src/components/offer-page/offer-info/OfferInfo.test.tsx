import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { OfferInfo } from './OfferInfo';
import { makeFakeOffer } from '../../../utils/mocks';

vi.mock('./OfferFeatures', () => ({
  OfferFeatures: ({ offer }: { offer: any }) => <div data-testid="offer-features">{offer.type}</div>,
}));

vi.mock('./offer-inside/OfferInsideList', () => ({
  OfferInsideList: ({ offer }: { offer: any }) => <div data-testid="offer-inside-list">{offer.goods.join(',')}</div>,
}));

vi.mock('./OfferName', () => ({
  OfferName: ({ offer }: { offer: any }) => <div data-testid="offer-name">{offer.title}</div>,
}));

vi.mock('./OfferPremiumMark', () => ({
  OfferPremiumMark: () => <div data-testid="offer-premium-mark">Premium</div>,
}));

vi.mock('./OfferPrice', () => ({
  OfferPrice: ({ offer }: { offer: any }) => <div data-testid="offer-price">{offer.price}</div>,
}));

vi.mock('./OfferRating', () => ({
  OfferRating: ({ offer }: { offer: any }) => <div data-testid="offer-rating">{offer.rating}</div>,
}));

vi.mock('./offer-host/OfferHost', () => ({
  OfferHost: ({ host, description }: { host: any; description: string }) => (
    <div data-testid="offer-host">{host.name} - {description}</div>
  ),
}));

vi.mock('./offer-reviews/OfferReviews', () => ({
  OfferReviews: () => <div data-testid="offer-reviews" />,
}));

describe('OfferInfo component', () => {
  it('renders all subcomponents and premium mark when offer is premium', () => {
    const offer = makeFakeOffer();
    offer.isPremium = true;

    const { getByTestId } = render(<OfferInfo offer={offer} />);

    expect(getByTestId('offer-premium-mark')).toBeTruthy();
    expect(getByTestId('offer-name')).toBeTruthy();
    expect(getByTestId('offer-rating')).toBeTruthy();
    expect(getByTestId('offer-features')).toBeTruthy();
    expect(getByTestId('offer-price')).toBeTruthy();
    expect(getByTestId('offer-inside-list')).toBeTruthy();
    expect(getByTestId('offer-host')).toBeTruthy();
    expect(getByTestId('offer-reviews')).toBeTruthy();
  });

  it('does not render premium mark when offer is not premium', () => {
    const offer = makeFakeOffer();
    offer.isPremium = false;

    const { queryByTestId } = render(<OfferInfo offer={offer} />);
    expect(queryByTestId('offer-premium-mark')).toBeNull();
  });
});
