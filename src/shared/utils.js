export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const createNewList = (title, userName, userId) => {
  return {
    title,
    createdBy: userName,
    userId,
    createDate: new Date(),
    modifiedDate: new Date(),
    public: false,
    items: {},
    sharedUsers: {},
  };
};

export const createListSummary = (list, canEdit = false) => {
  const summary = {
    title: list.title,
    modifiedDate: list.modifiedDate,
    firstItem: {},
    createdBy: list.createdBy,
    canEdit,
  };
  const items = Object.keys(list.items);
  if (items.length >= 1) {
    const firstItemKey = Object.keys(list.items)[0];
    const firstItem = list.items[firstItemKey];
    summary['firstItem'] = { description: firstItemKey, ...firstItem };
  }
  return summary;
};

export const createListAndSummary = (title, userName, userId) => {
  const list = createNewList(title, userName, userId);
  const summary = createListSummary(list, true);
  return { list, summary };
};
