import { TOffer } from '../../../types/offers';

interface Props {
  offer: TOffer;
}

export function OfferRating({ offer }: Props) {
  return (
    <div className='offer__rating rating'>
      <div className='offer__stars rating__stars'>
        <span style={{ width: `${Math.round(offer.rating)* 20}%` }}></span>
        <span className='visually-hidden'>Rating</span>
      </div>
      <span className='offer__rating-value rating__value'>{offer.rating}</span>
    </div>
  );
}
