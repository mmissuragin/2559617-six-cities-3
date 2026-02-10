import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OfferReviewsItem } from './OfferReviewsItem';

describe('OfferReviewsItem component', () => {
  const props = {
    userPhoto: 'https://example.com/photo.jpg',
    userName: 'Jane Doe',
    userRating: 80,
    userText: 'This is a great place!',
    date: '2023-02-10T12:00:00.000Z',
  };

  it('renders user avatar and name correctly', () => {
    const { getByAltText, getByText } = render(<OfferReviewsItem {...props} />);

    const avatar = getByAltText('Reviews avatar') as HTMLImageElement;
    expect(avatar).toBeTruthy();
    expect(avatar.src).toBe(props.userPhoto);
    expect(avatar.className).toContain('reviews__avatar');

    const name = getByText(props.userName);
    expect(name).toBeTruthy();
  });

  it('renders rating with correct width', () => {
    const { container } = render(<OfferReviewsItem {...props} />);
    const ratingSpan = container.querySelector('.reviews__stars span') as HTMLSpanElement;
    expect(ratingSpan.style.width).toBe(`${props.userRating}%`);
  });

  it('renders review text correctly', () => {
    const { getByText } = render(<OfferReviewsItem {...props} />);
    const text = getByText(props.userText);
    expect(text).toBeTruthy();
  });

  it('renders formatted date correctly', () => {
    const { getByText } = render(<OfferReviewsItem {...props} />);
    const formattedDate = new Date(props.date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    const time = getByText(formattedDate);
    expect(time).toBeTruthy();
    expect(time.tagName).toBe('TIME');
  });
});
