import { TOffer } from '../../../types/offers';

interface Props {
  offer: TOffer;
}

export function OfferPrice({ offer }: Props) {
  return (
    <div className='offer__price'>
      <b className='offer__price-value'>&euro;{offer.price}</b>
      <span className='offer__price-text'>&nbsp;night</span>
    </div>
  );
}
