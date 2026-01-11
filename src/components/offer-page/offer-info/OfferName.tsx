import { TOffer } from '../../../types/offers';

interface Props {
  offer: TOffer;
}

export function OfferName({ offer }: Props): JSX.Element {
  return (
    <div className='offer__name-wrapper'>
      <h1 className='offer__name'>{offer.title}</h1>
      <button className='offer__bookmark-button button' type='button'>
        <svg className='offer__bookmark-icon' width='31' height='33'>
          <use href='#icon-bookmark'></use>
        </svg>
        <span className='visually-hidden'>To bookmarks</span>
      </button>
    </div>
  );
}
