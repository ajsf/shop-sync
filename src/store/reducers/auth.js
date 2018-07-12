import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utils';

const initialState = {
  refreshToken: null,
  userId: null,
  error: null,
  loading: true,
};

const authStart = (state, action) =>
  updateObject(state, { error: null, loading: true });

const authSuccess = (state, action) =>
  updateObject(state, {
    refreshToken: action.refreshToken,
    userId: action.userId,
    error: null,
    loading: false,
  });

const authError = (state, action) =>
  updateObject(state, { error: action.error, loading: false });

const authLogout = (state, action) =>
  updateObject(state, { token: null, userId: null, loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authError(state, action);
    case actionTypes.AUTH_ON_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
