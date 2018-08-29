import reducer, { updateModes } from './list';
import * as actionCreators from '../actions/actionCreators/lists';
import { updateObject, createNewList } from '../../shared/utils';

describe('list reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = reducer(undefined, {});
  });

  it('should return the initial state', () => {
    expect(initialState).toEqual({
      lists: [],
      activeListId: null,
      activeListItemId: null,
      activeList: null,
      saved: true,
      updateMode: null,
    });
  });

  describe('editActiveList action', () => {
    it('should replace the active list with updated list', () => {
      const newList = { id: 'newlistid' };
      const action = actionCreators.editActiveList(newList);
      const reducedState = reducer(initialState, action);
      expect(reducedState.activeList).toEqual(newList);
    });

    it('should set saved to false', () => {
      expect(initialState.saved).toBeTruthy();
      const newList = { id: 'newlistid' };
      const action = actionCreators.editActiveList(newList);
      const reducedState = reducer(initialState, action);
      expect(reducedState.saved).toBeFalsy();
    });
  });

  describe('saveListSuccess action', () => {
    it('should set saved to true', () => {
      initialState = updateObject(initialState, { saved: false });
      expect(initialState.saved).toBeFalsy();
      const action = actionCreators.saveListSuccess();
      const reducedState = reducer(initialState, action);
      expect(reducedState.saved).toBeTruthy();
    });
  });

  describe('setEditUpdateMode action', () => {
    it('should set updateMode to edit', () => {
      expect(initialState.updateMode).toBeNull();
      const action = actionCreators.setEditUpdateMode();
      const reducedState = reducer(initialState, action);
      expect(reducedState.updateMode).toEqual(updateModes.EDIT_UPDATE_MODE);
    });
  });

  describe('setLiveUpdateMode action', () => {
    it('should set updateMode to live', () => {
      expect(initialState.updateMode).toBeNull();
      const action = actionCreators.setLiveUpdateMode();
      const reducedState = reducer(initialState, action);
      expect(reducedState.updateMode).toEqual(updateModes.LIVE_UPDATE_MODE);
    });
  });

  describe('onListUpdate action', () => {
    it('should update the activeList', () => {
      const initialList = { items: ['Test'] };
      const updatedList = { items: ['Test2', 'Test3'] };
      initialState = updateObject(initialState, { activeList: initialList });
      expect(initialState.activeList).toEqual(initialList);
      const action = actionCreators.onListUpdate(updatedList);
      const reducedState = reducer(initialState, action);
      expect(reducedState.activeList).toEqual(updatedList);
    });
  });
});
