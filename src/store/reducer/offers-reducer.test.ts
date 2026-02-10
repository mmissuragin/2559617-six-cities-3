import { createReducer } from '@reduxjs/toolkit';
import { offersReducer } from './offers-reducer';
import { initialState } from './initial-state';
import { fetchOffers } from '../api-actions';
import { makeFakeOffers } from '../../utils/mocks';

describe('offersReducer', () => {
  const reducer = createReducer(initialState, offersReducer);

  it('should return initial state with unknown action', () => {
    const result = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  it('should set loading true on fetchOffers.pending', () => {
    const result = reducer(
      initialState,
      fetchOffers.pending('1', undefined)
    );

    expect(result.isOffersLoading).toBe(true);
  });

  it('should set offers and stop loading on fetchOffers.fulfilled', () => {
    const offers = makeFakeOffers(3);

    const result = reducer(
      initialState,
      fetchOffers.fulfilled(offers, '1', undefined)
    );

    expect(result.offers).toEqual(offers);
    expect(result.isOffersLoading).toBe(false);
  });

  it('should stop loading on fetchOffers.rejected', () => {
    const result = reducer(
      initialState,
      fetchOffers.rejected(null, '1', undefined)
    );

    expect(result.isOffersLoading).toBe(false);
  });
});
