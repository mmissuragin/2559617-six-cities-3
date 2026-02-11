import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchOfferById, fetchCommentsByOfferId, fetchNearbyOffers } from '../store/api-actions';
import { PageLayout } from '../components/page-layout/page-layout';
import { OfferGallery } from '../components/offer-page/offer-gallery/offer-gallery';
import { OfferInfo } from '../components/offer-page/offer-info/offer-info';
import { OfferMap } from '../components/offer-page/offer-map';
import { NearPlaces } from '../components/offer-page/near-places/near-places';
import { NotFoundPage } from './not-found-page';

export function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const currentOffer = useSelector(
    (state: RootState) => state.currentOffer
  );

  const currentNearbyOffers = useSelector(
    (state: RootState) => state.currentNearbyOffers
  );

  const isCurrentOfferLoading = useSelector(
    (state: RootState) => state.isCurrentOfferLoading
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
        <OfferMap
          currentOffer={currentOffer}
          nearbyOffers={currentNearbyOffers}
        />
        <NearPlaces />
      </section>
    </PageLayout>
  );
}

