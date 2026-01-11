import { OffersState } from './initial-state';
import { changeCity, changeSort, setHoveredOffer } from '../action';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

export const uiReducer = (builder: ActionReducerMapBuilder<OffersState>) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(setHoveredOffer, (state, action) => {
      state.hoveredOfferId = action.payload;
    });
};
