import reducer from './auth';
import * as actionCreators from '../actions/actionCreators';
import { updateObject } from '../../shared/utils';

describe('auth reducer', () => {
  const authToken = 'some-token';
  const uid = 'some-user-id';
  let initialState;

  beforeEach(() => {
    initialState = reducer(undefined, {});
  });

  it('should return the initial state', () => {
    expect(initialState).toEqual({
      refreshToken: null,
      userId: null,
      userName: null,
      error: null,
      loading: true,
    });
  });

  describe('authStart action', () => {
    const action = actionCreators.authStart();

    it('should set error to null and loading to true', () => {
      initialState = updateObject(initialState, {
        error: 'error',
        loading: false,
      });
      expect(initialState.error).toBeTruthy();
      expect(initialState.loading).toBeFalsy();
      const reducedState = reducer(initialState, action);
      expect(reducedState.error).toBeNull();
      expect(reducedState.loading).toBeTruthy();
    });
  });

  describe('authSuccess action', () => {
    const user = { authToken, uid };
    const action = actionCreators.authSuccess(user);

    it('should store the userId', () => {
      expect(initialState.userId).toBeNull();
      const reducedState = reducer(initialState, action);
      expect(reducedState.userId).toEqual(uid);
    });
  });

  describe('authFail action', () => {
    const error = 'ERROR';
    const action = actionCreators.authFail(error);

    it('should store the error message', () => {
      expect(initialState.error).toBeNull();
      const reducedState = reducer(initialState, action);
      expect(reducedState.error).toEqual(error);
    });

    it('should set loading to false', () => {
      initialState = updateObject(initialState, { loading: true });
      expect(initialState.loading).toBeTruthy();
      const reducedState = reducer(initialState, action);
      expect(reducedState.loading).toBeFalsy();
    });
  });

  describe('onLogout action', () => {
    const action = actionCreators.onLogout();

    it('should set userId to null', () => {
      initialState = updateObject(initialState, {
        token: authToken,
        userId: uid,
      });
      expect(initialState.userId).toEqual(uid);
      const reducedState = reducer(initialState, action);
      expect(reducedState.userId).toBeNull();
    });
  });
});
