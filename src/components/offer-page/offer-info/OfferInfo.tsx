import { OfferFeatures } from './OfferFeatures';
import { OfferInsideList } from './offer-inside/OfferInsideList';
import { OfferName } from './OfferName';
import { OfferPremiumMark } from './OfferPremiumMark';
import { OfferPrice } from './OfferPrice';
import { OfferRating } from './OfferRating';
import { TOffer } from '../../../types/offers';
import { OfferHost } from './offer-host/OfferHost';
import { OfferReviews } from './offer-reviews/OfferReviews';

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
