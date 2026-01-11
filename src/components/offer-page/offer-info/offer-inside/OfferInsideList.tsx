import { TOffer } from '../../../../types/offers';

interface Props {
  offer: TOffer;
}

export function OfferInsideList({ offer }: Props) {
  return (
    <div className='offer__inside'>
      <h2 className='offer__inside-title'>What&apos;s inside</h2>
      <ul className='offer__inside-list'>
        {offer.goods.map((good) => (
          <li key={good} className='offer__inside-item'>{good}</li>
        ))}
      </ul>
    </div>
  );
}
