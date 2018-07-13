import * as actionTypes from '../actionTypes';
import { createListAndSummary, createListSummary } from '../../../shared/utils';

// create
export const createList = (title, userName, userId) => {
  const { list, summary } = createListAndSummary(title, userName, userId);
  return {
    type: actionTypes.CREATE_LIST,
    list,
    summary,
  };
};

export const createListSuccess = (listId, list) => {
  return {
    type: actionTypes.CREATE_LIST_SUCCESS,
    listId,
    list,
  };
};

//read
export const observeListsForUser = userId => {
  return {
    type: actionTypes.OBSERVE_LISTS_FOR_USER,
    userId,
  };
};

export const stopObservingListsForUser = () => {
  return {
    type: actionTypes.STOP_OBSERVING_LISTS_FOR_USER,
  };
};

export const userListsUpdated = lists => {
  return {
    type: actionTypes.USER_LISTS_UPDATED,
    lists,
  };
};

export const observeList = listId => {
  return {
    type: actionTypes.OBSERVE_LIST,
    listId,
  };
};

export const stopObservingList = () => {
  return {
    type: actionTypes.STOP_OBSERVING_LIST,
  };
};

export const onListUpdate = list => {
  return {
    type: actionTypes.ON_LIST_UPDATE,
    list,
  };
};

//update
export const updateListItems = (listId, listItems) => {
  return {
    type: actionTypes.UPDATE_LIST_ITEMS,
    listId,
    listItems,
  };
};

export const publishList = listId => {
  return {
    type: actionTypes.PUBLISH_LIST,
    listId,
  };
};

export const unpublishList = listId => {
  return {
    type: actionTypes.UNPUBLISH_LIST,
    listId,
  };
};

export const shareList = (listId, userId, list) => {
  const listSummary = createListSummary(list);
  return {
    type: actionTypes.SHARE_LIST,
    listId,
    userId,
    listSummary,
  };
};

export const assignListOwnership = (listId, userId, list) => {
  const listSummary = createListSummary(list, true);
  return {
    type: actionTypes.ASSIGN_LIST_OWNERSHIP,
    listId,
    userId,
    listSummary,
  };
};

export const removeUserFromList = (listId, userId) => {
  return {
    type: actionTypes.REMOVE_USER_FROM_LIST,
    listId,
    userId,
  };
};

export const saveListSuccess = listId => {
  return {
    type: actionTypes.SAVE_LIST_SUCCESS,
    listId,
  };
};

//delete
export const deleteList = (listId, userId) => {
  return {
    type: actionTypes.DELETE_LIST,
    listId,
    userId,
  };
};
export const deleteListSuccess = id => {
  return {
    type: actionTypes.DELETE_LIST_SUCCESS,
    listId: id,
  };
};

//misc

export const editActiveList = updatedList => {
  return {
    type: actionTypes.EDIT_ACTIVE_LIST,
    updatedList,
  };
};

export const setEditUpdateMode = () => {
  return { type: actionTypes.SET_EDIT_UPDATE_MODE };
};

export const setLiveUpdateMode = () => {
  return { type: actionTypes.SET_LIVE_UPDATE_MODE };
};

export const clearLists = () => {
  return { type: actionTypes.CLEAR_LISTS };
};
