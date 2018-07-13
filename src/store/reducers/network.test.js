import reducer from './network';
import * as actionCreators from '../actions/actionCreators';
import { updateObject } from '../../shared/utils';

describe('list reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = reducer(undefined, {});
  });

  it('the initial state should have precessing set to true and error set to null', () => {
    expect(initialState).toEqual({
      processing: true,
      error: null,
    });
  });

  it('should set processing to true and error to null when starting a network operation', () => {
    const action = actionCreators.networkOperationStart();
    const reducedState = reducer(initialState, action);
    expect(reducedState.processing).toBeTruthy();
    expect(reducedState.error).toBeNull();
  });

  it('should set processing to false and set the error message a network operation fails', () => {
    const errorMessage = 'ERROR_MESSAGE';
    const action = actionCreators.networkOperationFail(errorMessage);
    initialState = updateObject(initialState, {
      processing: true,
    });
    const reducedState = reducer(initialState, action);
    expect(reducedState.processing).toBeFalsy();
    expect(reducedState.saved).toBeFalsy();
    expect(reducedState.error).toEqual(errorMessage);
  });

  it('should set processing to false when a network operation is successfull', () => {
    const action = actionCreators.networkOperationSuccess();
    initialState = updateObject(initialState, {
      processing: true,
    });
    const reducedState = reducer(initialState, action);
    expect(reducedState.processing).toBeFalsy();
  });
});
