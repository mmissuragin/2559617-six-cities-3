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
  TComment,
  { offerId: string; rating: number; comment: string },
  ThunkApiConfig
>(
  'comments/postCommentByOfferId',
  async ({ offerId, rating, comment }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<TComment>(
        `/comments/${offerId}`,
        { rating, comment }
      );

      return data;
    } catch {
      return rejectWithValue('Failed to post comment');
    }
  }
);
