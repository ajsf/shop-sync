import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import React, { Component } from 'react';
import ShoppingListsLayout from '../../components/MainScreen/ShoppingLists/ShoppingListsLayout';

export class ShoppingListsContainer extends Component {

  render() {
    console.log('SL CONTAINER', this.props);
    return (
      <ShoppingListsLayout
        openList={this.props.openList}
        createList={this.props.createList}
        lists={this.props.lists}
        processing={this.props.loadingLists}
        paperClass={this.props.paperClass}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.list,
    userName: state.auth.userName,
    userId: state.auth.userId,
    loadingLists: state.network.operationName === 'loading_lists',
  };
};

const mapDispatchToProps = {
  stopObservingList: () => actionCreators.stopObservingList(),
  stopObservingListsForUser: () => actionCreators.stopObservingListsForUser(),
  openList: listId => actionCreators.observeList(listId),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppingListsContainer);
