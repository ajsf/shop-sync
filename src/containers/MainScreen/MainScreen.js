import MainScreenLayout from '../../components/MainScreen/MainScreenLayout';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

import React, { Component } from 'react';

export class MainLayout extends Component {
  componentWillUnmount() {
    this.props.stopObservingList();
    this.props.stopObservingListsForUser();
  }

  render() {
    return <MainScreenLayout {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    ...state.list,
    userName: state.auth.userName,
    userId: state.auth.userId,
    loadingActiveList: state.network.operationName === 'loading_active_list',
    loadingLists: state.network.operationName === 'loading_lists',
  };
};

const mapDispatchToProps = {
  createList: (title, userName, userId) =>
    actionCreators.createList(title, userName, userId),
  stopObservingList: () => actionCreators.stopObservingList(),
  stopObservingListsForUser: () => actionCreators.stopObservingListsForUser(),
  openList: listId => actionCreators.observeList(listId),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainLayout);
