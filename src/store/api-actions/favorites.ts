import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOffer } from '../../types/offers';
import { createAPI } from '../../services/api';
import { RootState, AppDispatch } from '../../store/store';
import { NavigateFunction } from 'react-router-dom';

const api = createAPI();

export const fetchFavorites = createAsyncThunk<TOffer[], undefined, { rejectValue: string }>(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<TOffer[]>('/favorite');
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Failed to update favorite');
    }
  }
);

interface ToggleFavoritePayload {
  offerId: string;
  isFavorite: boolean;
  navigate?: NavigateFunction;
}

export const toggleFavorite = createAsyncThunk<
  TOffer,
  ToggleFavoritePayload,
  { state: RootState; dispatch: AppDispatch; rejectValue: string }
>(
  'favorites/toggleFavorite',
  async ({ offerId, isFavorite, navigate }, { getState, rejectWithValue }) => {
    const { currentUser } = getState();

    if (!currentUser) {
      if (navigate) {
        navigate('/login');
      }
      return rejectWithValue('User not authorized');
    }

    try {
      const status = isFavorite ? 0 : 1;
      const { data } = await api.post<TOffer>(`/favorite/${offerId}/${status}`);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Failed to update favorite');
    }
  }
);
