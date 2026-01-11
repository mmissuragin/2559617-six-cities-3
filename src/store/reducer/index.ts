import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './initial-state';
import { uiReducer } from './ui-reducer';
import { offersReducer } from './offers-reducer';
import { offerDetailsReducer } from './offer-details-reducer';
import { commentsReducer } from './comments-reducer';
import { authReducer } from './auth-reducer';

export const reducer = createReducer(initialState, (builder) => {
  uiReducer(builder);
  offersReducer(builder);
  offerDetailsReducer(builder);
  commentsReducer(builder);
  authReducer(builder);
});
