import { TComment } from '../../../../../types/comments';
import { OfferReviewsItem } from './OfferReviewsItem';

interface Props {
  comments: TComment[];
}

export function OfferReviewsList({ comments }: Props) {
  return (
    <ul className='reviews__list'>
      {comments.slice(0, 10).map((comment) => (
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
