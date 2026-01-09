import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';
import { TOffer, TNearbyOffer, TComment} from '../types/offers';
import { RootState } from './store';
import { setAuthorizationStatus } from './action';
import { AuthorizationStatus } from '../const';

type ThunkApiConfig = {
  state: RootState;
  extra: AxiosInstance;
};

type AuthData = {
  email: string;
  password: string;
};

export const fetchOffers = createAsyncThunk<
  TOffer[],
  void,
  ThunkApiConfig
>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TOffer[]>('/offers');
    return data;
  }
);

export const checkAuth = createAsyncThunk<
  void,
  void,
  ThunkApiConfig
>(
  'user/checkAuth',
  async (_arg, { extra: api, dispatch }) => {
    try {
      await api.get('/login');
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      }
    }
  }
);

export const login = createAsyncThunk<
  void,
  AuthData,
  ThunkApiConfig
>(
  'user/login',
  async ({ email, password }, { extra: api, dispatch }) => {
    await api.post('/login', { email, password });
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  }
);

export const fetchOfferById = createAsyncThunk<
  TOffer,
  string,
  ThunkApiConfig
>(
  'offer/fetchById',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TOffer>(`/offers/${offerId}`);
    return data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<
  TNearbyOffer[],
  string,
  ThunkApiConfig
>(
  'offers/fetchNearbyOffers',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TNearbyOffer[]>(`/offers/${offerId}/nearby`);
    return data;
  }
);

export const fetchCommentsByOfferId = createAsyncThunk<
  TComment[],
  string,
  ThunkApiConfig
>(
  'comments/fetchByOfferId',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TComment[]>(`/comments/${offerId}`);
    return data;
  }
);
