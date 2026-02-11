import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { AuthorizationStatus } from '../../../../const';

import { OfferReviewForm } from './offer-review-form/offer-review-form';
import { OfferReviewsList } from './offer-reviews-list/offer-reviews-list';

export function OfferReviews() {
  const currentComments = useSelector(
    (state: RootState) => state.currentComments
  );

  const isCommentsLoading = useSelector(
    (state: RootState) => state.isCommentsLoading
  );

  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus
  );

  if (isCommentsLoading) {
    return <p>Loading reviews...</p>;
  }

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{currentComments.length}</span>
      </h2>

      <OfferReviewsList comments={currentComments} />

      {isAuth && <OfferReviewForm />}
    </section>
  );
}
