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
