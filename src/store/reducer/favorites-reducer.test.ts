import { createReducer } from '@reduxjs/toolkit';
import { favoritesReducer } from './favorites-reducer';
import { initialState } from './initial-state';
import { fetchFavorites, toggleFavorite } from '../api-actions/favorites';
import { makeFakeOffer, makeFakeOffers } from '../../utils/mocks';

describe('favoritesReducer', () => {
  const reducer = createReducer(initialState, favoritesReducer);

  it('should return initial state with unknown action', () => {
    const result = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  it('should set loading true and error null when fetchFavorites is pending', () => {
    const result = reducer(initialState, fetchFavorites.pending('1', undefined));
    expect(result.favorites.loading).toBe(true);
    expect(result.favorites.error).toBeNull();
  });

  it('should set offers and stop loading when fetchFavorites is fulfilled', () => {
    const offers = makeFakeOffers(3);
    const result = reducer(initialState, fetchFavorites.fulfilled(offers, '1', undefined));
    expect(result.favorites.offers).toEqual(offers);
    expect(result.favorites.loading).toBe(false);
  });

  it('should set error and stop loading when fetchFavorites is rejected', () => {
    const result = reducer(initialState, fetchFavorites.rejected(null, '1', undefined));
    expect(result.favorites.loading).toBe(false);
    expect(result.favorites.error).toBe('Failed to load favorites');
  });

  it('should add offer to favorites when toggleFavorite.fulfilled with isFavorite = true', () => {
    const offer = makeFakeOffer();
    const arg = { offerId: offer.id, isFavorite: true };

    const result = reducer(
      initialState,
      toggleFavorite.fulfilled({ ...offer, isFavorite: true }, '1', arg)
    );
    expect(result.favorites.offers).toContainEqual({ ...offer, isFavorite: true });
  });

  it('should remove offer from favorites when toggleFavorite.fulfilled with isFavorite = false', () => {
    const offer = makeFakeOffer();
    const arg = { offerId: offer.id, isFavorite: false };

    const stateWithFavorite = {
      ...initialState,
      favorites: {
        ...initialState.favorites,
        offers: [{ ...offer, isFavorite: true }],
      },
    };

    const result = reducer(
      stateWithFavorite,
      toggleFavorite.fulfilled({ ...offer, isFavorite: false }, '1', arg)
    );
    expect(result.favorites.offers).not.toContainEqual({ ...offer, isFavorite: false });
  });

});
