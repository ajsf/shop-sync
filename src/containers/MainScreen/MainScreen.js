import MainScreenLayout from '../../components/MainScreen/MainScreenLayout';
import MainScreenMobileLayout from '../../components/MainScreen/MainScreenMobileLayout';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import Media from 'react-media';
import React, { Component } from 'react';

export class MainLayout extends Component {
  componentWillUnmount() {
    this.props.stopObservingList();
    this.props.stopObservingListsForUser();
  }

  render() {
    return (
      <Media query={{ maxWidth: 699 }}>
        {matches =>
          matches ? <MainScreenMobileLayout /> : <MainScreenLayout />
        }
      </Media>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  createList: (title, userName, userId) =>
    actionCreators.createList(title, userName, userId),
  stopObservingList: () => actionCreators.stopObservingList(),
  stopObservingListsForUser: () => actionCreators.stopObservingListsForUser(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainLayout);
