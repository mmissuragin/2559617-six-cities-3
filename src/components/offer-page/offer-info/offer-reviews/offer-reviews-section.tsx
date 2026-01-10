import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

import { OfferReviewForm } from './offer-review-form/offer-review-form';
import { OfferReviewsList } from './offer-reviews-list/offer-reviews-list';

export function OfferReviews() {
  const { currentComments, isCommentsLoading } = useSelector(
    (state: RootState) => state
  );

  if (isCommentsLoading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <section className='offer__reviews reviews'>
      <h2 className='reviews__title'>
        Reviews · <span className='reviews__amount'>{currentComments.length}</span>
      </h2>

      <OfferReviewsList comments={currentComments} />
      <OfferReviewForm />
    </section>
  );
}
