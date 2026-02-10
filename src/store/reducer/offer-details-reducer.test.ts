import { createReducer } from '@reduxjs/toolkit';
import { offerDetailsReducer } from './offer-details-reducer';
import { initialState } from './initial-state';
import { fetchOfferById, fetchNearbyOffers } from '../api-actions';
import { makeFakeOffer, makeFakeOffers } from '../../utils/mocks';

describe('offerDetailsReducer', () => {
  const reducer = createReducer(initialState, offerDetailsReducer);

  it('should return initial state with unknown action', () => {
    const result = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  describe('fetchOfferById', () => {
    it('should set loading true and reset offer on pending', () => {
      const result = reducer(
        initialState,
        fetchOfferById.pending('1', 'offer-id')
      );

      expect(result.isCurrentOfferLoading).toBe(true);
      expect(result.currentOffer).toBeNull();
    });

    it('should set offer and stop loading on fulfilled', () => {
      const offer = makeFakeOffer();

      const result = reducer(
        initialState,
        fetchOfferById.fulfilled(offer, '1', 'offer-id')
      );

      expect(result.currentOffer).toEqual(offer);
      expect(result.isCurrentOfferLoading).toBe(false);
    });

    it('should reset offer and stop loading on rejected', () => {
      const result = reducer(
        initialState,
        fetchOfferById.rejected(null, '1', 'offer-id')
      );

      expect(result.isCurrentOfferLoading).toBe(false);
      expect(result.currentOffer).toBeNull();
    });
  });

  describe('fetchNearbyOffers', () => {
    it('should set loading true and clear offers on pending', () => {
      const result = reducer(
        initialState,
        fetchNearbyOffers.pending('1', 'offer-id')
      );

      expect(result.isNearbyOffersLoading).toBe(true);
      expect(result.currentNearbyOffers).toEqual([]);
    });

    it('should set nearby offers and stop loading on fulfilled', () => {
      const offers = makeFakeOffers(3);

      const result = reducer(
        initialState,
        fetchNearbyOffers.fulfilled(offers, '1', 'offer-id')
      );

      expect(result.currentNearbyOffers).toEqual(offers);
      expect(result.isNearbyOffersLoading).toBe(false);
    });

    it('should clear nearby offers and stop loading on rejected', () => {
      const result = reducer(
        initialState,
        fetchNearbyOffers.rejected(null, '1', 'offer-id')
      );

      expect(result.isNearbyOffersLoading).toBe(false);
      expect(result.currentNearbyOffers).toEqual([]);
    });
  });
});
