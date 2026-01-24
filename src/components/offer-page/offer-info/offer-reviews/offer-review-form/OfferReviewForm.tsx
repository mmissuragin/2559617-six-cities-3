import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store/store';
import { postCommentByOfferId } from '../../../../../store/api-actions/comments';
import { useParams } from 'react-router-dom';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

export function OfferReviewForm(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const { isCommentsLoading } = useSelector((state: RootState) => state);

  const [formData, setFormData] = React.useState({ rating: '', review: '' });
  const [error, setError] = React.useState<string | null>(null);


  const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const isRatingValid = formData.rating !== '';
  const reviewLength = formData.review.length;
  const isReviewValid = reviewLength >= MIN_REVIEW_LENGTH && reviewLength <= MAX_REVIEW_LENGTH;
  const isFormValid = isRatingValid && isReviewValid;

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!id || !isFormValid) return;

    setError(null);

    try {
      await dispatch(
        postCommentByOfferId({
          offerId: id,
          rating: Number(formData.rating),
          comment: formData.review,
        })
      ).unwrap();

      setFormData({ rating: '', review: '' });
    } catch (err: any) {
      setError(err || 'Failed to submit review');
    }
  };

  return (
    <form className='reviews__form form' onSubmit={handleSubmit}>
      <label className='reviews__label form__label' htmlFor='review'>
        Your review
      </label>

      <div className='reviews__rating-form form__rating'>
        {[5, 4, 3, 2, 1].map((value) => (
          <React.Fragment key={value}>
            <input
              className='form__rating-input visually-hidden'
              name='rating'
              value={value}
              id={`${value}-stars`}
              type='radio'
              checked={formData.rating === String(value)}
              onChange={handleFieldChange}
              disabled={isCommentsLoading}
            />
            <label
              htmlFor={`${value}-stars`}
              className='reviews__rating-label form__rating-label'
              title='rating'
            >
              <svg className='form__star-image' width='37' height='33'>
                <use href='#icon-star'></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>

      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        value={formData.review}
        onChange={handleFieldChange}
        disabled={isCommentsLoading}
      />

      <div className='reviews__button-wrapper'>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          className='reviews__submit form__submit button'
          type='submit'
          disabled={!isFormValid || isCommentsLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
