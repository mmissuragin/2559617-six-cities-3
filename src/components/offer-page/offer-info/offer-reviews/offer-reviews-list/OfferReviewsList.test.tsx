import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OfferReviewsList } from './OfferReviewsList';
import { TComment } from '../../../../../types/comments';

const makeComment = (id: string, date: string): TComment => ({
  id,
  comment: `Comment ${id}`,
  date,
  rating: 4,
  user: {
    name: `User ${id}`,
    avatarUrl: `https://example.com/avatar${id}.jpg`,
    isPro: false,
  },
});

describe('OfferReviewsList component', () => {
  it('renders up to 10 sorted reviews', () => {
    const comments = [
      makeComment('1', '2023-01-01T12:00:00.000Z'),
      makeComment('2', '2023-01-02T12:00:00.000Z'),
      makeComment('3', '2023-01-03T12:00:00.000Z'),
      makeComment('4', '2023-01-04T12:00:00.000Z'),
      makeComment('5', '2023-01-05T12:00:00.000Z'),
      makeComment('6', '2023-01-06T12:00:00.000Z'),
      makeComment('7', '2023-01-07T12:00:00.000Z'),
      makeComment('8', '2023-01-08T12:00:00.000Z'),
      makeComment('9', '2023-01-09T12:00:00.000Z'),
      makeComment('10', '2023-01-10T12:00:00.000Z'),
      makeComment('11', '2023-01-11T12:00:00.000Z'),
    ];

    const { container } = render(<OfferReviewsList comments={comments} />);
    const items = container.querySelectorAll('li.reviews__item');
    expect(items.length).toBe(10);

    const firstItemText = items[0].querySelector('.reviews__text')?.textContent;
    expect(firstItemText).toBe('Comment 11');

    const lastItemText = items[items.length - 1].querySelector('.reviews__text')?.textContent;
    expect(lastItemText).toBe('Comment 2');
  });

  it('renders nothing if comments array is empty', () => {
    const { container } = render(<OfferReviewsList comments={[]} />);
    expect(container.querySelectorAll('li.reviews__item').length).toBe(0);
  });
});
