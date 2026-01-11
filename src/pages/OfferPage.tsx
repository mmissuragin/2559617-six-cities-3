import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchOfferById, fetchCommentsByOfferId, fetchNearbyOffers } from '../store/api-actions';
import { PageLayout } from '../components/page-layout/PageLayout';
import { OfferGallery } from '../components/offer-page/offer-gallery/OfferGallery';
import { OfferInfo } from '../components/offer-page/offer-info/OfferInfo';
import { MapSection } from '../components/main-page/MapSection';
import { NearPlaces } from '../components/offer-page/near-places/NearPlaces';
import { NotFoundPage } from './NotFoundPage';

export function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { currentOffer, isCurrentOfferLoading } = useSelector(
    (state: RootState) => state
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchCommentsByOfferId(id));
    }
  }, [id, dispatch]);

  if (!isCurrentOfferLoading && !currentOffer) {
    return <NotFoundPage />;
  }

  if (!currentOffer) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout mainClassName="page__main page__main--offer">
      <section className="offer">
        <OfferGallery />
        <OfferInfo offer={currentOffer} />
        <MapSection offers={[currentOffer]} />
        <NearPlaces />
      </section>
    </PageLayout>
  );
}
