import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchOfferById, fetchCommentsByOfferId, fetchNearbyOffers } from '../../store/api-actions';
import { PageLayout } from '../../components/page-layout/PageLayout';
import { OfferGallery } from '../../components/offer-page/offer-gallery/offer-gallery';
import { OfferInfo } from '../../components/offer-page/offer-info/offer-info';
import { MapSection } from '../../components/main-page/map-section';
import { NearPlaces } from '../../components/offer-page/near-places/near-places';
import { NotFoundPage } from '../not-found-page/not-found.page';

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
