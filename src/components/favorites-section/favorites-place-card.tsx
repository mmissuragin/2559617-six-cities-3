import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { toggleFavorite } from '../../store/api-actions/favorites';
import { TOffer } from '../../types/offers';
import { AppRoute } from '../../const';

type Props = {
  offer: TOffer;
};

export function FavoritesPlaceCard({ offer }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleBookmarkClick = () => {
    dispatch(toggleFavorite({ offerId: offer.id, isFavorite: offer.isFavorite }));
  };

  return (
    <article className='favorites__card place-card'>
      {offer.isPremium && (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      )}

      <div className='favorites__image-wrapper place-card__image-wrapper'>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className='place-card__image'
            src={offer.previewImage}
            width={150}
            height={110}
            alt='Place image'
          />
        </Link>
      </div>

      <div className='favorites__card-info place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>

          <button
            className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type='button'
            onClick={handleBookmarkClick}
          >
            <svg className='place-card__bookmark-icon' width={18} height={19}>
              <use href='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>

        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>

        <h2 className='place-card__name'>
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className='place-card__type'>{offer.type}</p>
      </div>
    </article>
  );
}
