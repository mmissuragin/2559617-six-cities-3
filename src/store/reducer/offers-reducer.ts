import { OffersState } from './initial-state';
import { fetchOffers } from '../api-actions';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

export const offersReducer = (builder: ActionReducerMapBuilder<OffersState>) => {
  builder
    .addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isOffersLoading = false;
    });
};
