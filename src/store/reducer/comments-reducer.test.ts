import { createReducer } from '@reduxjs/toolkit';
import { commentsReducer } from './comments-reducer';
import { initialState } from './initial-state';
import {
  fetchCommentsByOfferId,
  postCommentByOfferId,
} from '../api-actions';
import { makeFakeComment, makeFakeComments } from '../../utils/mocks';

describe('commentsReducer', () => {
  const reducer = createReducer(initialState, commentsReducer);

  it('should return initial state with unknown action', () => {
    const result = reducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(result).toEqual(initialState);
  });

  it('should set isCommentsLoading to true when fetchCommentsByOfferId is pending', () => {
    const result = reducer(
      initialState,
      fetchCommentsByOfferId.pending('', '')
    );

    expect(result.isCommentsLoading).toBe(true);
  });

  it('should set comments and stop loading when fetchCommentsByOfferId is fulfilled', () => {
    const comments = makeFakeComments(3);

    const result = reducer(
      initialState,
      fetchCommentsByOfferId.fulfilled(comments, '', '')
    );

    expect(result.currentComments).toHaveLength(3);
    expect(result.isCommentsLoading).toBe(false);

    // проверяем сортировку: новые сверху
    expect(
      Date.parse(result.currentComments[0].date)
    ).toBeGreaterThanOrEqual(
      Date.parse(result.currentComments[1].date)
    );
  });

  it('should stop loading when fetchCommentsByOfferId is rejected', () => {
    const result = reducer(
      initialState,
      fetchCommentsByOfferId.rejected(null, '', '')
    );

    expect(result.isCommentsLoading).toBe(false);
  });

  it('should add new comment to the beginning when postCommentByOfferId is fulfilled', () => {
    const existingComments = makeFakeComments(2);
    const newComment = makeFakeComment();

    const stateWithComments = {
      ...initialState,
      currentComments: existingComments,
    };

    const result = reducer(
      stateWithComments,
      postCommentByOfferId.fulfilled(newComment, '', {
        offerId: '1',
        comment: 'text',
        rating: 5,
      })
    );

    expect(result.currentComments[0]).toEqual(newComment);
    expect(result.currentComments).toHaveLength(3);
  });
});
