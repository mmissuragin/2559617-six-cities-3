import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../store/store';
import { toggleFavorite } from '../../../store/api-actions/favorites';
import { TOffer } from '../../../types/offers';

interface Props {
  offer: TOffer;
}

export function OfferName({ offer }: Props): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);

  const handleBookmarkClick = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    dispatch(toggleFavorite({ offerId: offer.id, isFavorite }));
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className='offer__name-wrapper'>
      <h1 className='offer__name'>{offer.title}</h1>
      <button
        className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`}
        type='button'
        onClick={handleBookmarkClick}
      >
        <svg className='offer__bookmark-icon' width='31' height='33'>
          <use href='#icon-bookmark'></use>
        </svg>
        <span className='visually-hidden'>
          {isFavorite ? 'In bookmarks' : 'To bookmarks'}
        </span>
      </button>
    </div>
  );
}
