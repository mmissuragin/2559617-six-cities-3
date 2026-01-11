import { AxiosInstance } from 'axios';
import { RootState } from '../store';

export type ThunkApiConfig = {
  state: RootState;
  extra: AxiosInstance;
};

export type AuthData = {
  email: string;
  password: string;
};
