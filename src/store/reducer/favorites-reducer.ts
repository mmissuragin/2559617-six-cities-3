import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchFavorites, toggleFavorite } from '../api-actions/favorites';
import { OffersState } from './initial-state';
import { resetFavorites } from '../action';

export const favoritesReducer = (builder: ActionReducerMapBuilder<OffersState>) => {
  builder
    .addCase(fetchFavorites.pending, (state) => {
      state.favorites.loading = true;
      state.favorites.error = null;
    })
    .addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favorites.loading = false;
      state.favorites.offers = action.payload;
    })
    .addCase(fetchFavorites.rejected, (state, action) => {
      state.favorites.loading = false;
      state.favorites.error = action.payload ?? 'Failed to load favorites';
    })

    .addCase(resetFavorites, (state) => {
      state.favorites.offers = [];

      state.offers = state.offers.map((offer) => ({
        ...offer,
        isFavorite: false,
      }));

      state.currentNearbyOffers = state.currentNearbyOffers.map((offer) => ({
        ...offer,
        isFavorite: false,
      }));

      if (state.currentOffer) {
        state.currentOffer = {
          ...state.currentOffer,
          isFavorite: false,
        };
      }
    })

    .addCase(toggleFavorite.fulfilled, (state, action) => {
      const updatedOffer = action.payload;

      if (updatedOffer.isFavorite) {
        state.favorites.offers.push(updatedOffer);
      } else {
        state.favorites.offers = state.favorites.offers.filter(
          (offer) => offer.id !== updatedOffer.id
        );
      }

      const index = state.offers.findIndex(
        (offer) => offer.id === updatedOffer.id
      );
      if (index !== -1) {
        state.offers[index] = updatedOffer;
      }

      state.currentNearbyOffers = state.currentNearbyOffers.map((offer) =>
        offer.id === updatedOffer.id ? updatedOffer : offer
      );

      if (state.currentOffer?.id === updatedOffer.id) {
        state.currentOffer = updatedOffer;
      }
    });
};
