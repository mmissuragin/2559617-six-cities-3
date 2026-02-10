import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchOffers } from '../store/api-actions';
import { CitiesTabsList } from '../components/cities-tabs/CitiesTabsList';
import { CitiesContainer } from '../components/main-page/CitiesContainer';
import { PageLayout } from '../components/page-layout/PageLayout';
import { Spinner } from '../components/spinner/Spinner';
import { MainPageEmpty } from '../components/main-page/MainPageEmpty';

export function MainPage(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);
  const offers = useSelector((state: RootState) => state.offers);
  const city = useSelector((state: RootState) => state.city);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (isOffersLoading) {
    return <Spinner />;
  }

  const filteredOffers = offers.filter((offer) => offer.city.name === city);

  return (
    <PageLayout
      pageClassName="page page--gray page--main"
      mainClassName="page__main page__main--index"
      showHeaderNavigation
    >
      <CitiesTabsList />
      {filteredOffers.length === 0 ? <MainPageEmpty /> : <CitiesContainer />}
    </PageLayout>
  );
}
