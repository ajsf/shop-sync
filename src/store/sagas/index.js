import { fork, all } from 'redux-saga/effects';

import watchAuth from './auth';
import watchLists from './lists';

export default function* rootSaga() {
  yield all([fork(watchAuth), fork(watchLists)]);
}
