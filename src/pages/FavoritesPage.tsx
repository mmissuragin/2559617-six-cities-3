import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchFavorites } from '../store/api-actions/favorites';
import { FavoritesPageEmpty } from '../components/favorites/FavoritesPageEmpty';
import { FavoritesSection } from '../components/favorites/FavoritesSection';
import { PageLayout } from '../components/page-layout/PageLayout';

export function FavoritesPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { offers, loading, error } = useSelector((state: RootState) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <PageLayout mainClassName="page__main page__main--favorites" showFooter>
      {offers.length === 0 ? (
        <FavoritesPageEmpty />
      ) : (
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesSection offers={offers} />
          </section>
        </div>
      )}
    </PageLayout>
  );
}
