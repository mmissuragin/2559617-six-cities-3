import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from './types';
import { TNearbyOffer } from '../../types/nearby-offers';

export const fetchNearbyOffers = createAsyncThunk<
  TNearbyOffer[],
  string,
  ThunkApiConfig
>(
  'offers/fetchNearbyOffers',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TNearbyOffer[]>(`/offers/${offerId}/nearby`);
    return data;
  }
);
