import * as actionTypes from '../actionTypes';

export const networkOperationStart = () => {
  return { type: actionTypes.NETWORK_OPERATION_START };
};

export const networkOperationFail = err => {
  return { type: actionTypes.NETWORK_OPERATION_FAIL, error: err };
};

export const networkOperationSuccess = () => {
  return { type: actionTypes.NETWORK_OPERATION_SUCCESS };
};
