import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkApiConfig, AuthData } from './types';
import { setAuthorizationStatus } from '../action';
import { AuthorizationStatus } from '../../const';

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
