import { FavoritesCityGroup } from './FavoritesCityGroup';
import { TOffer } from '../../types/offers';

type Props = {
  offers: TOffer[];
};

export function FavoritesSection({ offers }: Props): JSX.Element {
  const offersByCity = offers.reduce<Record<string, TOffer[]>>((acc, offer) => {
    const city = offer.city.name;

    if (!acc[city]) {
      acc[city] = [];
    }

    acc[city].push(offer);

    return acc;
  }, {});

  return (
    <ul className='favorites__list'>
      {Object.entries(offersByCity).map(([cityName, cityOffers]) => (
        <FavoritesCityGroup
          key={cityName}
          cityName={cityName}
          offers={cityOffers}
        />
      ))}
    </ul>
  );
}
