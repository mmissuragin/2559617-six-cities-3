import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<string>('city/changeCity');
export const changeSort = createAction<string>('sort/changeSort');
export const setHoveredOffer = createAction<string | null>('hoveredOffer/set');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');
