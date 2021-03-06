import * as actionTypes from '../actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = user => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    refreshToken: user.refreshToken,
    userId: user.uid,
    userName: user.displayName,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const observeAuthState = () => {
  return {
    type: actionTypes.AUTH_OBSERVE,
  };
};

export const stopObservingAuthState = () => {
  return {
    type: actionTypes.AUTH_STOP_OBSERVING,
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const onLogout = () => {
  return { type: actionTypes.AUTH_ON_LOGOUT };
};
