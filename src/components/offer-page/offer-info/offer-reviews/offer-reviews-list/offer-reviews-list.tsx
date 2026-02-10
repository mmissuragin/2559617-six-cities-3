import { TComment } from '../../../../../types/comments';
import { OfferReviewsItem } from './offer-reviews-item';

interface Props {
  comments: TComment[];
}

export function OfferReviewsList({ comments }: Props) {
  const sortedComments = [...comments]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 10);

  return (
    <ul className='reviews__list'>
      {sortedComments.map((comment) => (
        <OfferReviewsItem
          key={comment.id}
          userPhoto={comment.user.avatarUrl}
          userName={comment.user.name}
          userRating={comment.rating * 20}
          userText={comment.comment}
          date={comment.date}
        />
      ))}
    </ul>
  );
}
