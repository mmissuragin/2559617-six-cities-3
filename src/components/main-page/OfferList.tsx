import { PlaceCard } from './PlaceCard';
import { PlacesSorting } from './PlacesSorting';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function OfferList(): JSX.Element {
  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const sortType = useSelector((state: RootState) => state.sortType);

  const filteredOffers = offers.filter((offer) => offer.city.name === city);

  const sortedOffers =
  sortType === 'popular'
    ? filteredOffers
    : [...filteredOffers].sort((a, b) => {
      switch (sortType) {
        case 'price-low-to-high':
          return a.price - b.price;
        case 'price-high-to-low':
          return b.price - a.price;
        case 'top-rated-first':
          return (b.rating ?? 0) - (a.rating ?? 0);
        default:
          return 0;
      }
    });


  return (
    <section className='cities__places places'>
      <h2 className='visually-hidden'>Places</h2>
      <b className='places__found'>
        {filteredOffers.length} place{filteredOffers.length !== 1 && 's'} to stay in {city}
      </b>

      <PlacesSorting />

      <div className='cities__places-list places__list tabs__content'>
        {sortedOffers.map((offer) => (
          <PlaceCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}
