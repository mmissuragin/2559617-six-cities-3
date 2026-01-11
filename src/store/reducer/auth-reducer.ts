import { OffersState } from './initial-state';
import { setAuthorizationStatus } from '../action';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

export const authReducer = (builder: ActionReducerMapBuilder<OffersState>) => {
  builder.addCase(setAuthorizationStatus, (state, action) => {
    state.authorizationStatus = action.payload;
  });
};
