import { OfferList } from './OfferList';
import { MapSection } from './MapSection';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function CitiesContainer(): JSX.Element {
  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);

  const filteredOffers = offers.filter((offer) => offer.city.name === city);
  const noOffers = filteredOffers.length === 0;

  return (
    <div className="cities">
      <div className={`cities__places-container container ${noOffers ? 'cities__places-container--empty' : ''}`}>
        {noOffers ? (
          <>
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">
                  We could not find any property available at the moment in {city}
                </p>
              </div>
            </section>

            <div className="cities__right-section">
              <img
                src={`/img/${city.toLowerCase()}.jpg`}
                alt={`Map of ${city}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </>
        ) : (
          <>
            <OfferList />
            <div className="cities__right-section">
              <MapSection offers={filteredOffers} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
