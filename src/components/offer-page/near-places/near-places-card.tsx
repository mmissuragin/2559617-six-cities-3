import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { toggleFavorite } from '../../../store/api-actions/favorites';
import { useState } from 'react';

type Props = {
  id: string;
  isPremium?: boolean;
  imageSrc: string;
  pricePerNight: number;
  rating: number;
  title: string;
  type: string;
};

export function NearPlacesCard({
  id,
  isPremium,
  imageSrc,
  pricePerNight,
  rating,
  title,
  type,
}: Props): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const offer = useSelector((state: RootState) =>
    state.offers.find((o) => o.id === id)
  );
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const [isFavorite, setIsFavorite] = useState(offer?.isFavorite ?? false);

  const handleBookmarkClick = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (offer) {
      dispatch(toggleFavorite({ offerId: offer.id, isFavorite, navigate }));
      setIsFavorite((prev) => !prev);
    }
  };

  return (
    <article className='near-places__card place-card'>
      {isPremium && (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      )}

      <div className='near-places__image-wrapper place-card__image-wrapper'>
        <Link to={`/offer/${id}`}>
          <img className='place-card__image' src={imageSrc} width='260' height='200' alt='Place image' />
        </Link>
      </div>

      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{pricePerNight}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>

          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type='button'
            onClick={handleBookmarkClick}
          >
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use href='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>

        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${rating}%` }}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>

        <h2 className='place-card__name'>
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className='place-card__type'>{type}</p>
      </div>
    </article>
  );
}
