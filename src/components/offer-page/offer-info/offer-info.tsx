import { OfferFeatures } from './offer-features';
import { OfferInsideList } from './offer-inside/offer-inside-list';
import { OfferName } from './offer-name';
import { OfferPremiumMark } from './offer-premium-mark';
import { OfferPrice } from './offer-price';
import { OfferRating } from './offer-rating';
import { TOffer } from '../../../types/offers';
import { OfferHost } from './offer-host/offer-host-section';
import { OfferReviews } from './offer-reviews/offer-reviews-section';

interface Props {
  offer: TOffer;
}

export function OfferInfo({ offer }: Props): JSX.Element {

  return (
    <div className='offer__container container'>
      <div className='offer__wrapper'>
        {offer.isPremium && <OfferPremiumMark />}
        <OfferName offer={offer} />
        <OfferRating offer={offer} />
        <OfferFeatures offer={offer} />
        <OfferPrice offer={offer} />
        <OfferInsideList offer={offer} />
        <OfferHost host={offer.host} description={offer.description} />
        <OfferReviews />
      </div>
    </div>
  );
}
