import { OffersState } from './initial-state';
import { fetchOfferById, fetchNearbyOffers } from '../api-actions';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

export const offerDetailsReducer = (builder: ActionReducerMapBuilder<OffersState>) => {
  builder
    .addCase(fetchOfferById.pending, (state) => {
      state.isCurrentOfferLoading = true;
      state.currentOffer = null;
    })
    .addCase(fetchOfferById.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
      state.isCurrentOfferLoading = false;
    })
    .addCase(fetchOfferById.rejected, (state) => {
      state.isCurrentOfferLoading = false;
      state.currentOffer = null;
    })

    .addCase(fetchNearbyOffers.pending, (state) => {
      state.isNearbyOffersLoading = true;
      state.currentNearbyOffers = [];
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.currentNearbyOffers = action.payload;
      state.isNearbyOffersLoading = false;
    })
    .addCase(fetchNearbyOffers.rejected, (state) => {
      state.isNearbyOffersLoading = false;
      state.currentNearbyOffers = [];
    });
};
