import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../../../store/store';
import { postCommentByOfferId } from '../../../../../store/api-actions/comments';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

const RATINGS = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

export function OfferReviewForm(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const [isFormSending, setIsFormSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isRatingValid = formData.rating !== '';
  const reviewLength = formData.review.length;

  const isReviewValid =
    reviewLength >= MIN_REVIEW_LENGTH &&
    reviewLength <= MAX_REVIEW_LENGTH;

  const isFormValid = isRatingValid && isReviewValid;

  const handleFieldChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!id || !isFormValid || isFormSending) {
      return;
    }

    setIsFormSending(true);
    setError(null);

    dispatch(
      postCommentByOfferId({
        offerId: id,
        rating: Number(formData.rating),
        comment: formData.review,
      })
    )
      .unwrap()
      .then(() => {
        setFormData({ rating: '', review: '' });
      })
      .catch(() => {
        setError('Failed to submit review');
      })
      .finally(() => {
        setIsFormSending(false);
      });
  };

  useEffect(() => {
    setFormData({ rating: '', review: '' });
    setError(null);
    setIsFormSending(false);
  }, [id]);

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {RATINGS.map(({ value, title }) => {
          const inputId = `${value}-stars`;

          return (
            <React.Fragment key={value}>
              <input
                className="form__rating-input visually-hidden"
                type="radio"
                name="rating"
                value={value}
                id={inputId}
                checked={formData.rating === String(value)}
                onChange={handleFieldChange}
                disabled={isFormSending}
              />
              <label
                htmlFor={inputId}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          );
        })}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleFieldChange}
        disabled={isFormSending}
      />

      <div className="reviews__button-wrapper">
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isFormSending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
