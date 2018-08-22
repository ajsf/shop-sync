import * as actionTypes from '../actionTypes';

export const networkOperationStart = operationName => {
  return { type: actionTypes.NETWORK_OPERATION_START, name: operationName };
};

export const networkOperationFail = err => {
  return { type: actionTypes.NETWORK_OPERATION_FAIL, error: err };
};

export const networkOperationSuccess = () => {
  return { type: actionTypes.NETWORK_OPERATION_SUCCESS };
};
