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
    yield put(actionCreators.networkOperationFail(error.message));
  }
}

function listsForUserEventChannel(userId) {
  return eventChannel(emit => {
    listsForUserRef = api.observeListsForUser(userId);
    listsForUserRef.on('value', snapshot => {
      const lists = [];
      snapshot.forEach(listSnapshot => {
        const list = listSnapshot.val();
        list['listId'] = listSnapshot.key;
        lists.push(list);
      });
      emit({ lists: lists.reverse() });
    });
    return () => {
      listsForUserRef.off();
      listsForUserRef = null;
    };
  });
}

export function* observeListsForUserSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart('loading_lists'));
    listsForUserChannel = yield call(listsForUserEventChannel, action.userId);
    let loading = true;
    while (true) {
      const data = yield take(listsForUserChannel);
      yield put(actionCreators.userListsUpdated(data.lists));
      if (loading) {
        yield put(actionCreators.networkOperationSuccess());
        loading = false;
      }
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

export function* createListItemSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    const { listId, item } = action;
    yield call(api.createListItem, listId, item);
    yield put(actionCreators.saveListSuccess(listId));
    yield put(actionCreators.networkOperationSuccess());
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

export function* updateListItemSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.updateListItem, action.listId, action.itemId, action.item);
    yield put(actionCreators.networkOperationSuccess());
    yield put(actionCreators.saveListSuccess(action.listId));
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

export function* deleteListItemSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.deleteListItem, action.listId, action.itemId);
    yield put(actionCreators.networkOperationSuccess());
    yield put(actionCreators.saveListSuccess(action.listId));
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

export function* setListTitleSaga(action) {
  try {
    yield put(actionCreators.networkOperationStart());
    yield call(api.setListTitle, action.listId, action.title);
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
    yield put(actionCreators.networkOperationStart('loading_active_list'));
    if (listChannel) {
      yield call(listChannel.close);
      listChannel = null;
    }
    listChannel = yield call(listEventChannel, action.listId);
    yield put(actionCreators.setActiveListId(action.listId));
    let loading = true;
    while (true) {
      const data = yield take(listChannel);
      yield put(actionCreators.onListUpdate(data.list));
      if (loading) {
        yield put(actionCreators.networkOperationSuccess());
        loading = false;
      }
    }
  } catch (error) {
    yield put(actionCreators.networkOperationFail(error));
  }
}

export function* stopObservingListSaga(action) {
  yield put(actionCreators.setActiveListId(null));
  if (listChannel) {
    yield call(listChannel.close);
    listChannel = null;
  }
}
