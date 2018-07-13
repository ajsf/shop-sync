import * as sagas from './lists';
import * as actionCreators from '../actions/actionCreators';
import { call, put } from 'redux-saga/effects';
import * as api from '../../api/lists';

describe('lists sagas', () => {
  const ERROR = 'error';
  const userId = 1234;
  let saga;
  let action;

  describe('createListSaga', () => {
    beforeEach(() => {
      action = actionCreators.createList('TEST TITLE', 'NAME', userId);
      saga = sagas.createListSaga(action);
    });

    it('calls createList function with list and summary passed in from action', () => {
      saga.next();
      const next = saga.next().value;
      expect(next).toEqual(call(api.createList, action.list, action.summary));
    });

    it('puts a createListSuccess action on success', () => {
      saga.next();
      saga.next();
      const next = saga.next(userId, action.list).value;
      expect(next).toEqual(
        put(actionCreators.createListSuccess(userId, action.list)),
      );
    });

    it('puts a networkError action on error', () => {
      saga.next();
      const next = saga.throw(ERROR).value;
      expect(next).toEqual(put(actionCreators.networkOperationFail(ERROR)));
    });
  });
});
