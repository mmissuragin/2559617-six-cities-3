import { createReducer } from '@reduxjs/toolkit';
import { authReducer } from './auth-reducer';
import { initialState } from './initial-state';
import { setAuthorizationStatus, setCurrentUser } from '../action';
import { AuthorizationStatus } from '../../const';
import { makeFakeUser } from '../../utils/mocks';

describe('authReducer', () => {
  const reducer = createReducer(initialState, authReducer);

  it('should return initial state with unknown action', () => {
    const result = reducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(result).toEqual(initialState);
  });

  it('should set authorizationStatus', () => {
    const result = reducer(
      initialState,
      setAuthorizationStatus(AuthorizationStatus.Auth)
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should set currentUser', () => {
    const fakeUser = makeFakeUser();

    const result = reducer(
      initialState,
      setCurrentUser(fakeUser)
    );

    expect(result.currentUser).toEqual(fakeUser);
  });
});
