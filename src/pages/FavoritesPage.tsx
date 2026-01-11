import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { FavoritesPageEmpty } from '../components/favorites/FavoritesPageEmpty';
import { FavoritesSection } from '../components/favorites/FavoritesSection';
import { PageLayout } from '../components/page-layout/PageLayout';

export function FavoritesPage(): JSX.Element {
  const offers = useSelector((state: RootState) => state.offers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <PageLayout
      mainClassName="page__main page__main--favorites"
      showFooter
    >
      {favoriteOffers.length === 0 ? (
        <FavoritesPageEmpty />
      ) : (
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesSection offers={favoriteOffers} />
          </section>
        </div>
      )}
    </PageLayout>
  );
}
