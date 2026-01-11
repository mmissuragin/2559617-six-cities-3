import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkApiConfig, AuthData } from './types';
import { setAuthorizationStatus, setCurrentUser } from '../action';
import { AuthorizationStatus } from '../../const';
import { saveToken, dropToken } from '../../services/token';
import { User } from '../../types/user';

type AuthResponse = User & {
  token: string;
};

export const checkAuth = createAsyncThunk<
  void,
  void,
  ThunkApiConfig
>(
  'user/checkAuth',
  async (_arg, { extra: api, dispatch }) => {
    try {
      const { data } = await api.get<AuthResponse>('/login');

      saveToken(data.token);

      const { token, ...user } = data;
      dispatch(setCurrentUser(user));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        dispatch(setCurrentUser(null));
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
    const { data } = await api.post<AuthResponse>('/login', { email, password });

    saveToken(data.token);

    const { token, ...user } = data;
    dispatch(setCurrentUser(user));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  }
);

export const logout = createAsyncThunk<void, void>(
  'user/logout',
  async (_arg, { dispatch }) => {
    dropToken();
    dispatch(setCurrentUser(null));
  }
);
