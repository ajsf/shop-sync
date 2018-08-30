import { fork, all, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes/';

import * as auth from './auth';
import * as lists from './lists';

function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_OBSERVE, auth.observeAuthSaga);
  yield takeEvery(actionTypes.AUTH_STOP_OBSERVING, auth.stopObservingAuthSaga);
  yield takeEvery(actionTypes.AUTH_LOGOUT, auth.authLogoutSaga);
}

function* watchLists() {
  yield takeEvery(actionTypes.CREATE_LIST, lists.createListSaga);
  yield takeEvery(actionTypes.CREATE_LIST_ITEM, lists.createListItemSaga);
  yield takeEvery(actionTypes.UPDATE_LIST_ITEM, lists.updateListItemSaga);
  yield takeEvery(actionTypes.DELETE_LIST_ITEM, lists.deleteListItemSaga);
  yield takeEvery(actionTypes.SET_LIST_TITLE, lists.setListTitleSaga);
  yield takeEvery(actionTypes.PUBLISH_LIST, lists.publishListSaga);
  yield takeEvery(actionTypes.UNPUBLISH_LIST, lists.unpublishListSaga);
  yield takeEvery(actionTypes.SHARE_LIST, lists.shareListSaga);
  yield takeEvery(
    actionTypes.ASSIGN_LIST_OWNERSHIP,
    lists.assignListOwnershipSaga,
  );
  yield takeEvery(
    actionTypes.REMOVE_USER_FROM_LIST,
    lists.removeUserFromListSaga,
  );
  yield takeEvery(actionTypes.DELETE_LIST, lists.deleteListSaga);
  yield takeEvery(actionTypes.OBSERVE_LIST, lists.observeListSaga);
  yield takeEvery(actionTypes.STOP_OBSERVING_LIST, lists.stopObservingListSaga);
  yield takeEvery(
    actionTypes.OBSERVE_LISTS_FOR_USER,
    lists.observeListsForUserSaga,
  );
  yield takeEvery(
    actionTypes.STOP_OBSERVING_LISTS_FOR_USER,
    lists.stopObservingListsForUserSaga,
  );
}

export default function* rootSaga() {
  yield all([fork(watchAuth), fork(watchLists)]);
}
