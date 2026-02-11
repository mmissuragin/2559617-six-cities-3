import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { fetchNearbyOffers } from '../../../store/api-actions';
import { NearPlacesCard } from './near-places-card';
import { useParams } from 'react-router-dom';

export function NearPlaces() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const currentNearbyOffers = useSelector(
    (state: RootState) => state.currentNearbyOffers
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchNearbyOffers(id));
    }
  }, [id, dispatch]);

  const nearbyOffers = currentNearbyOffers.slice(0, 3);

  return (
    <div className='container'>
      <section className='near-places places'>
        <h2 className='near-places__title'>Other places in the neighbourhood</h2>
        <div className='near-places__list places__list'>
          {nearbyOffers.map((offer) => (
            <NearPlacesCard
              key={offer.id}
              id={offer.id}
              isPremium={offer.isPremium}
              imageSrc={offer.previewImage}
              pricePerNight={offer.price}
              rating={(offer.rating / 5) * 100}
              title={offer.title}
              type={offer.type}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
