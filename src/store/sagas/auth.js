import firebase from '../../config/firebase';
import * as actionCreators from '../actions/actionCreators/';
import { call, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

let chan;

function authEventChannel() {
  return eventChannel(emit => {
    const removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        emit(user);
      } else {
        emit('NO AUTH');
      }
    });

    return () => {
      removeAuthListener();
    };
  });
}

export function* observeAuthSaga(action) {
  try {
    chan = yield call(authEventChannel);
    while (true) {
      const user = yield take(chan);
      if (user && user !== 'NO AUTH') {
        yield put(actionCreators.authSuccess(user));
        yield put(actionCreators.observeListsForUser(user.uid));
      } else {
        yield put(actionCreators.onLogout());
        yield put(actionCreators.clearLists());
      }
    }
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

export function* stopObservingAuthSaga(action) {
  yield call(chan.close());
}

export function* authLogoutSaga(action) {
  yield firebase.auth().signOut();
}
