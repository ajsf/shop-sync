import firebase from '../../config/firebase';
import * as actionCreators from '../actions/actionCreators/';
import * as actionTypes from '../actions/actionTypes/auth';
import { call, put, takeEvery, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

let chan;

export default function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_OBSERVE, observeAuthSaga);
  yield takeEvery(actionTypes.AUTH_STOP_OBSERVING, stopObservingAuthSaga);
  yield takeEvery(actionTypes.AUTH_CREATE_ACCOUNT, createAccountSaga);
  yield takeEvery(actionTypes.AUTH_LOGIN, authLoginSaga);
  yield takeEvery(actionTypes.AUTH_LOGOUT, authLogoutSaga);
}

function authEventChannel() {
  return eventChannel(emit => {
    const removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      console.log('Auth event', user);
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

function* observeAuthSaga(action) {
  try {
    chan = yield call(authEventChannel);
    while (true) {
      const user = yield take(chan);
      if (user && user !== 'NO AUTH') {
        console.log('Putting auth success', user);
        yield put(actionCreators.authSuccess(user));
      } else {
        console.log('Putting onLogout');
        yield put(actionCreators.onLogout());
      }
    }
  } catch (error) {
    console.log('error', error);
    yield put(actionCreators.networkOperationFail(error));
  }
}

function* stopObservingAuthSaga(action) {
  yield chan.close();
}

function* createAccountSaga(action) {
  try {
    yield firebase.auth().setPersistence('local');
    yield firebase
      .auth()
      .createUserWithEmailAndPassword(action.email, action.password);
  } catch (error) {
    yield put(actionCreators.authFail(error));
  }
}

function* authLoginSaga(action) {
  try {
    yield firebase.auth().setPersistence('local');
    yield firebase
      .auth()
      .signInWithEmailAndPassword(action.email, action.password);
  } catch (error) {
    yield put(actionCreators.authFail(error));
  }
}

function* authLogoutSaga(action) {
  console.log('Logging out', action);
  yield firebase.auth().signOut();
}
