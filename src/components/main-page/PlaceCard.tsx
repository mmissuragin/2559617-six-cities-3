import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setHoveredOffer } from '../../store/action';
import { toggleFavorite } from '../../store/api-actions/favorites';
import { useState } from 'react';
import { TOffer } from '../../types/offers';

type PlaceCardProps = {
  offer: TOffer;
};

export function PlaceCard({ offer }: PlaceCardProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);

  const handleMouseEnter = () => {
    dispatch(setHoveredOffer(offer.id));
  };

  const handleMouseLeave = () => {
    dispatch(setHoveredOffer(null));
  };

  const handleBookmarkClick = () => {
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }

    dispatch(toggleFavorite({ offerId: offer.id, isFavorite }));
    setIsFavorite((prev) => !prev);
  };

  return (
    <article
      className='cities__card place-card'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {offer.isPremium && (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      )}

      <div className='cities__image-wrapper place-card__image-wrapper'>
        <Link to={`/offer/${offer.id}`}>
          <img
            className='place-card__image'
            src={offer.previewImage}
            width='260'
            height='200'
            alt={offer.title}
          />
        </Link>
      </div>

      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
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
            <span style={{ width: `${Math.round(offer.rating)* 20}%` }}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>

        <h2 className='place-card__name'>
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className='place-card__type'>{offer.type}</p>
      </div>
    </article>
  );
}
