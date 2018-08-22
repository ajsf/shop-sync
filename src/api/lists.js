import firebase from '../config/firebase';
import { LISTS_REF, LISTS_BY_UID_REF } from '../config/firebase_consts';

export async function createList(list, summary) {
  const listKey = await firebase
    .database()
    .ref()
    .child(LISTS_REF)
    .push().key;

  const updates = {};
  updates[`/${LISTS_REF}/${listKey}`] = list;
  updates[`/${LISTS_BY_UID_REF}/${list.userId}/${listKey}`] = summary;

  await firebase
    .database()
    .ref()
    .update(updates);
  return listKey;
}

export async function createListItem(listId, item) {
  const itemId = await firebase
    .database()
    .ref()
    .child(`/${LISTS_REF}/${listId}/items/`)
    .push().key;

  const updates = {};
  updates[`/${LISTS_REF}/${listId}/items/${itemId}`] = item;
  await firebase
    .database()
    .ref()
    .update(updates);
  return itemId;
}

export const updateListItem = (listId, itemId, item) => {
  console.log('UPDATING ITEM', item, itemId);
  return firebase
    .database()
    .ref()
    .child(`/${LISTS_REF}/${listId}/items/${itemId}`)
    .update(item);
};

export const deleteListItem = (listId, itemId) => {
  console.log('DELTING ITEM', listId, itemId);
  const updates = {};
  updates[`/${LISTS_REF}/${listId}/items/${itemId}`] = null;
  return firebase
    .database()
    .ref()
    .update(updates);
};

export const setListTitle = (listId, title) => {
  return firebase
    .database()
    .ref()
    .child(`/${LISTS_REF}/${listId}/title/`)
    .set(title);
};

export const publishList = listId => {
  return setListPublicity(listId, true);
};

export const unpublishList = listId => {
  return setListPublicity(listId, false);
};

const setListPublicity = (listId, bool) => {
  return firebase
    .database()
    .ref()
    .child(`/${LISTS_REF}/${listId}/public`)
    .set(bool);
};

export const shareList = (listId, userId, listSummary) => {
  return addListUser(listId, userId, listSummary, 'VIEWER');
};

export const assignListOwnership = (listId, userId, listSummary) => {
  return addListUser(listId, userId, listSummary, 'OWNER');
};

const addListUser = (listId, userId, listSummary, userRole) => {
  const updates = {};
  updates[`/${LISTS_REF}/${listId}/sharedUsers/${userId}`] = userRole;
  updates[`/${LISTS_BY_UID_REF}/${userId}/${listId}`] = listSummary;
  return firebase
    .database()
    .ref()
    .update(updates);
};

export const removeUserFromList = (listId, userId) => {
  const updates = {};
  updates[`/${LISTS_REF}/${listId}/sharedUsers/${userId}`] = null;
  updates[`/${LISTS_BY_UID_REF}/${userId}/${listId}`] = null;
  return firebase
    .database()
    .ref()
    .update(updates);
};

export const deleteList = (listId, userId) => {
  const updates = {};
  updates[`/${LISTS_REF}/${listId}/`] = null;
  updates[`/${LISTS_BY_UID_REF}/${userId}/${listId}`] = null;
  return firebase
    .database()
    .ref()
    .update(updates);
};

export const observeList = listId => {
  return firebase.database().ref(LISTS_REF + '/' + listId);
};

export const observeListsForUser = userId => {
  return firebase
    .database()
    .ref(`/${LISTS_BY_UID_REF}/${userId}/`)
    .orderByChild('modifiedDate');
};
