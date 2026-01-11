import { TOffer } from '../../../types/offers';

interface Props {
  offer: TOffer;
}

export function OfferFeatures({ offer }: Props) {
  return (
    <ul className='offer__features'>
      <li className='offer__feature offer__feature--entire'>
        {offer.type}
      </li>
      <li className='offer__feature offer__feature--bedrooms'>
        {offer.bedrooms} Bedroom
      </li>
      <li className='offer__feature offer__feature--adults'>
        Max {offer.maxAdults} adult
      </li>
    </ul>
  );
}
