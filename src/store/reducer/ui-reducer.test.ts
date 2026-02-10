import { createReducer } from '@reduxjs/toolkit';
import { uiReducer } from './ui-reducer';
import { initialState } from './initial-state';
import { changeCity, changeSort, setHoveredOffer } from '../action';

describe('uiReducer', () => {
  const reducer = createReducer(initialState, uiReducer);

  it('should return initial state with unknown action', () => {
    const result = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  it('should change city', () => {
    const city = 'Paris';

    const result = reducer(
      initialState,
      changeCity(city)
    );

    expect(result.city).toBe(city);
  });

  it('should change sort type', () => {
    const sortType = 'price-low-to-high';

    const result = reducer(
      initialState,
      changeSort(sortType)
    );

    expect(result.sortType).toBe(sortType);
  });

  it('should set hovered offer id', () => {
    const offerId = 'offer-id-123';

    const result = reducer(
      initialState,
      setHoveredOffer(offerId)
    );

    expect(result.hoveredOfferId).toBe(offerId);
  });
});
