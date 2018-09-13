import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/actionCreators';
import ShoppingListsLayout from '../../components/MainScreen/ShoppingLists/ShoppingListsLayout';

const ShoppingListsContainer = props => {
  const createList = () => {
    props.createList('', props.userName, props.userId);
  };

  return (
    <ShoppingListsLayout
      openList={props.openList}
      createList={createList}
      lists={props.lists}
      processing={props.loadingLists}
      paperClass={props.paperClass}
    />
  );
};

const mapStateToProps = state => {
  return {
    ...state.list,
    userName: state.auth.userName,
    userId: state.auth.userId,
    loadingLists: state.network.operationName === 'loading_lists',
  };
};

const mapDispatchToProps = {
  createList: (title, userName, userId) =>
    actionCreators.createList(title, userName, userId),
  openList: listId => actionCreators.observeList(listId),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppingListsContainer);
