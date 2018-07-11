import {
  updateObject,
  createNewList,
  createListSummary,
  createListAndSummary,
} from './utils';

describe('updateObject function', () => {
  const originalObject = {
    test1: 'test1',
    test2: 2,
  };
  const originalObjectCopy = { ...originalObject };

  const newTest1 = 'newTest1';
  const newTest3 = 'newTest3';

  it('copies the first object passed and overwrites properties from second object passed', () => {
    expect(originalObject).toEqual(originalObjectCopy);

    const expectedObject = {
      test1: newTest1,
      test2: 2,
    };
    const newObject = updateObject(originalObject, { test1: newTest1 });
    expect(newObject).toEqual(expectedObject);
    expect(originalObject).toEqual(originalObjectCopy);
  });

  it('adds additional properties that are not present in the original object', () => {
    expect(originalObject).toEqual(originalObjectCopy);
    const expectedObject = {
      test1: newTest1,
      test2: 2,
      test3: newTest3,
    };
    const newObject = updateObject(originalObject, {
      test1: newTest1,
      test3: newTest3,
    });
    expect(newObject).toEqual(expectedObject);
    expect(originalObject).toEqual(originalObjectCopy);
  });
});

describe('list model util functions', () => {
  const TITLE = 'TEST TITLE';
  const USER = 'TEST USER';
  const USER_ID = '123';

  describe('createList function', () => {
    it('takes title, user name and user id and creates a list object', () => {
      const list = createNewList(TITLE, USER, USER_ID);
      expect(list.title).toBe(TITLE);
      expect(list.createdBy).toBe(USER);
      expect(list.userId).toBe(USER_ID);
    });
  });

  describe('createListSummary function', () => {
    let list;

    beforeEach(() => {
      list = createNewList(TITLE, USER, USER_ID);
    });

    it('creates a summary of the list with the first item', () => {
      const items = {
        APPLES: {
          quantity: 5,
          quantityDescription: '',
        },
        TOMATOES: {
          quantity: 2,
          quantityDescription: 'CANS',
        },
      };
      list['items'] = items;

      const summary = createListSummary(list);

      expect(summary.firstItem.description).toBe('APPLES');
      expect(summary.firstItem.quantity).toBe(5);
      expect(summary.firstItem.quantityDescription).toBe('');
    });

    it('sets firstItem to an empty object if no list items are present', () => {
      const summary = createListSummary(list);
      expect(summary.firstItem).toEqual({});
    });

    it('uses the title, user name and modified date from the original list', () => {
      const summary = createListSummary(list);
      expect(summary.title).toBe(TITLE);
      expect(summary.createdBy).toBe(USER);
      expect(summary.modifiedDate).toBe(list.modifiedDate);
    });

    it('defaults canEdit to false', () => {
      const summary = createListSummary(list);
      expect(summary.canEdit).toBeFalsy();
    });
    
    it('accepts a boolean as a second parameter that sets the canEdit value', () => {
      const summary = createListSummary(list, true);
      expect(summary.canEdit).toBeTruthy();
      const summary2 = createListSummary(list, false);
      expect(summary2.canEdit).toBeFalsy();
    });
  });
});
