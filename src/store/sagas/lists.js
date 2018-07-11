import firebase from '../../config/firebase';
import * as actionCreators from '../actions/actionCreators/';
import * as actionTypes from '../actions/actionTypes';
import { put, takeEvery, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as api from '../../api/lists';
import { LISTS_REF } from '../../config/firebase_consts';

let listRef;
let chan;

export default function* watchLists() {
  yield takeEvery(actionTypes.CREATE_LIST, createListSaga);
  yield takeEvery(actionTypes.FETCH_LISTS_FOR_USER, fetchListsForUserSaga);
  yield takeEvery(actionTypes.UPDATE_LIST_ITEMS, updateListItemsSaga);
  yield takeEvery(actionTypes.PUBLISH_LIST, publishListSaga);
  yield takeEvery(actionTypes.UNPUBLISH_LIST, unpublishListSaga);
  yield takeEvery(actionTypes.SHARE_LIST, shareListSaga);
  yield takeEvery(actionTypes.ASSIGN_LIST_OWNERSHIP, assignListOwnershipSaga);
  yield takeEvery(actionTypes.REMOVE_USER_FROM_LIST, removeUserFromListSaga);
  yield takeEvery(actionTypes.DELETE_LIST, deleteListSaga);
  yield takeEvery(actionTypes.OBSERVE_LIST, observeListSaga);
  yield takeEvery(actionTypes.STOP_OBSERVING_LIST, stopObservingListSaga);
}

export function* createListSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    const { list, summary } = action;
    const listKey = yield call(api.createList, list, summary);
    yield put(actionCreators.createListSuccess(listKey, action.list));
    yield put(actionCreators.networkOperationSuccess());
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

export function* fetchListsForUserSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    const lists = yield call(api.fetchListsForUser, action.userId);
    yield put(actionCreators.fetchListsSuccess(lists));
    yield put(actionCreators.networkOperationSuccess());
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

function* updateListItemsSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.updateListItems, action.listId, action.listItems);
    yield put(actionCreators.networkOperationSuccess());
    yield put(actionCreators.saveListSuccess(action.listId));
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

function* publishListSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.publishList, action.listId);
    yield put(actionCreators.saveListSuccess(action.listId));
    yield put(actionCreators.networkOperationSuccess());
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

function* unpublishListSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.unpublishList, action.listId);
    yield put(actionCreators.saveListSuccess(action.listId));
    yield put(actionCreators.networkOperationSuccess());
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}
function* shareListSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.shareList, action.listId, action.userId, action.listSummary);
    yield put(actionCreators.saveListSuccess(action.listId));
    yield put(actionCreators.networkOperationSuccess());
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

function* assignListOwnershipSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(
      api.assignListOwnership,
      action.listId,
      action.userId,
      action.listSummary,
    );
    yield put(actionCreators.saveListSuccess(action.listId));
    yield put(actionCreators.networkOperationSuccess());
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

function* removeUserFromListSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.removeUserFromList, action.listId, action.userId);
    yield put(actionCreators.saveListSuccess(action.listId));
    yield put(actionCreators.networkOperationSuccess());
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

function* deleteListSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.deleteList, action.listId, action.userId);
    yield put(actionCreators.deleteListSuccess());
    yield put(actionCreators.networkOperationSuccess());
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

function listEventChannel(listId) {
  return eventChannel(emit => {
    listRef = firebase.database().ref(LISTS_REF + '/' + listId);
    listRef.on('value', snapshot => {
      emit({ list: snapshot.val() });
    });
    return () => {
      listRef.off();
      listRef = null;
    };
  });
}

function* observeListSaga(action) {
  console.log('Observing list', listRef);

  try {
    chan = yield call(listEventChannel, action.listId);
    while (true) {
      const list = yield take(chan);
      yield put(actionCreators.onListUpdate(list));
    }
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

function* stopObservingListSaga(action) {
  yield listRef.off();
  yield (listRef = null);
}
