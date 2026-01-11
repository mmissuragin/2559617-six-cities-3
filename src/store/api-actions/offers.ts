import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from './types';
import { TOffer } from '../../types/offers';

export const fetchOffers = createAsyncThunk<
  TOffer[],
  void,
  ThunkApiConfig
>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TOffer[]>('/offers');
    return data;
  }
);

export const fetchOfferById = createAsyncThunk<
  TOffer,
  string,
  ThunkApiConfig
>(
  'offer/fetchById',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TOffer>(`/offers/${offerId}`);
    return data;
  }
);
