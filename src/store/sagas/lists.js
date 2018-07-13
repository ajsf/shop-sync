import * as actionCreators from '../actions/actionCreators/';
import { put, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as api from '../../api/lists';

let listRef;
let listChannel;

let listsForUserRef;
let listsForUserChannel;

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

function listsForUserEventChannel(userId) {
  return eventChannel(emit => {
    listsForUserRef = api.observeListsForUser(userId);
    listsForUserRef.on('value', snapshot => {
      emit({ lists: snapshot.val() });
    });
    return () => {
      listsForUserRef.off();
      listsForUserRef = null;
    };
  });
}

export function* observeListsForUserSaga(action) {
  try {
    listsForUserChannel = yield call(listsForUserEventChannel, action.userId);
    while (true) {
      const lists = yield take(listsForUserChannel);
      yield put(actionCreators.userListsUpdated(lists.lists));
    }
  } catch (error) {
    console.log(error);
    yield put(actionCreators.networkOperationFail(error));
  }
}

export function* stopObservingListsForUserSaga(action) {
  if (listsForUserChannel) {
    yield call(listsForUserChannel.close);
  }
}

export function* updateListItemsSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.updateListItems, action.listId, action.listItems);
    yield put(actionCreators.networkOperationSuccess());
    yield put(actionCreators.saveListSuccess(action.listId));
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

export function* publishListSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.publishList, action.listId);
    yield put(actionCreators.saveListSuccess(action.listId));
    yield put(actionCreators.networkOperationSuccess());
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

export function* unpublishListSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.unpublishList, action.listId);
    yield put(actionCreators.saveListSuccess(action.listId));
    yield put(actionCreators.networkOperationSuccess());
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

export function* shareListSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.shareList, action.listId, action.userId, action.listSummary);
    yield put(actionCreators.saveListSuccess(action.listId));
    yield put(actionCreators.networkOperationSuccess());
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

export function* assignListOwnershipSaga(action) {
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

export function* removeUserFromListSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.removeUserFromList, action.listId, action.userId);
    yield put(actionCreators.saveListSuccess(action.listId));
    yield put(actionCreators.networkOperationSuccess());
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

export function* deleteListSaga(action) {
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
    listRef = api.observeList(listId);
    listRef.on('value', snapshot => {
      emit({ list: snapshot.val() });
    });
    return () => {
      listRef.off();
      listRef = null;
    };
  });
}

export function* observeListSaga(action) {
  try {
    listChannel = yield call(listEventChannel, action.listId);
    while (true) {
      const list = yield take(listChannel);
      yield put(actionCreators.onListUpdate(list));
    }
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

export function* stopObservingListSaga(action) {
  if (listChannel) {
    yield call(listChannel.close);
  }
}
