import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utils';

const initialState = {
  processing: false,
  error: null,
  operationName: null,
};

const networkOperationStart = (state, action) =>
  updateObject(state, {
    processing: true,
    error: null,
    operationName: action.name,
  });

const networkOperationSuccess = (state, action) =>
  updateObject(state, { processing: false, operationName: null });

const networkOperationFail = (state, action) =>
  updateObject(state, { processing: false, error: action.error });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NETWORK_OPERATION_START:
      return networkOperationStart(state, action);
    case actionTypes.NETWORK_OPERATION_SUCCESS:
      return networkOperationSuccess(state, action);
    case actionTypes.NETWORK_OPERATION_FAIL:
      return networkOperationFail(state, action);
    default:
      return state;
  }
};

export default reducer;
