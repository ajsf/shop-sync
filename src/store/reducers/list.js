import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utils';

const EDIT_UPDATE_MODE = 'EDIT_UPDATE_MODE';
const LIVE_UPDATE_MODE = 'LIVE UPDATE_MODE';

export const updateModes = { EDIT_UPDATE_MODE, LIVE_UPDATE_MODE };

const initialState = {
  lists: [],
  activeListId: null,
  activeList: null,
  activeListItemId: null,
  saved: true,
  updateMode: null,
};

const createListSuccess = (state, action) =>
  updateObject(state, {
    saved: true,
    activeListId: action.listId,
    activeList: action.list,
    activeListItemId: null,
  });

const saveListSuccess = (state, action) =>
  updateObject(state, {
    saved: true,
    activeListItemId: null,
  });

const fetchListsSuccess = (state, action) =>
  updateObject(state, {
    lists: action.lists,
  });

const editActiveList = (state, action) =>
  updateObject(state, { activeList: action.updatedList, saved: false });

const setEditUpdateMode = (state, action) =>
  updateObject(state, { updateMode: EDIT_UPDATE_MODE });

const setLiveUpdateMode = (state, action) =>
  updateObject(state, { updateMode: LIVE_UPDATE_MODE });

const deleteListSuccess = (state, action) => updateObject(state, {});

const onListUpdate = (state, action) =>
  updateObject(state, { activeList: action.list });

const clearLists = (state, action) => updateObject(state, initialState);

const setActiveListId = (state, action) =>
  updateObject(state, { activeListId: action.listId, activeList: null });

const selectListItem = (state, action) =>
  updateObject(state, { activeListItemId: action.itemId });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_LIST_SUCCESS:
      return createListSuccess(state, action);
    case actionTypes.SAVE_LIST_SUCCESS:
      return saveListSuccess(state, action);
    case actionTypes.USER_LISTS_UPDATED:
      return fetchListsSuccess(state, action);
    case actionTypes.DELETE_LIST_SUCCESS:
      return deleteListSuccess(state, action);
    case actionTypes.ON_LIST_UPDATE:
      return onListUpdate(state, action);
    case actionTypes.EDIT_ACTIVE_LIST:
      return editActiveList(state, action);
    case actionTypes.SET_EDIT_UPDATE_MODE:
      return setEditUpdateMode(state, action);
    case actionTypes.SET_LIVE_UPDATE_MODE:
      return setLiveUpdateMode(state, action);
    case actionTypes.CLEAR_LISTS:
      return clearLists(state, action);
    case actionTypes.SET_ACTIVE_LIST_ID:
      return setActiveListId(state, action);
    case actionTypes.SELECT_LIST_ITEM:
      return selectListItem(state, action);
    default:
      return state;
  }
};

export default reducer;
