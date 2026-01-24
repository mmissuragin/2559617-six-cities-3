import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from './types';
import { TComment } from '../../types/comments';

export const fetchCommentsByOfferId = createAsyncThunk<
  TComment[],
  string,
  ThunkApiConfig
>(
  'comments/fetchByOfferId',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TComment[]>(`/comments/${offerId}`);
    return data;
  }
);

export const postCommentByOfferId = createAsyncThunk<
  void,
  { offerId: string; rating: number; comment: string },
  ThunkApiConfig
>(
  'comments/postCommentByOfferId',
  async ({ offerId, rating, comment }, { extra: api, dispatch, rejectWithValue }) => {
    try {
      await api.post(`/comments/${offerId}`, { rating, comment });
      dispatch(fetchCommentsByOfferId(offerId));
    } catch (err: any) {
      return rejectWithValue('Failed to post comment');
    }
  }
);
