import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOffer } from '../../types/offers';
import { createAPI } from '../../services/api';

const api = createAPI();

export const fetchFavorites = createAsyncThunk<TOffer[], undefined, { rejectValue: string }>(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<TOffer[]>('/favorite');
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const toggleFavorite = createAsyncThunk<
  TOffer,
  { offerId: string; isFavorite: boolean },
  { rejectValue: string }
>(
  'favorites/toggleFavorite',
  async ({ offerId, isFavorite }, { rejectWithValue }) => {
    try {
      const status = isFavorite ? 0 : 1;
      const { data } = await api.post<TOffer>(`/favorite/${offerId}/${status}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
