import React, { Component, Fragment } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import WelcomeScreen from './containers/WelcomeScreen/WelcomeScreen';
import AuthScreen from './components/Auth/AuthScreen';
import * as actionCreators from './store/actions/actionCreators';

import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(actionCreators.observeAuthState());
  }

  createList = () => {
    this.props.dispatch(actionCreators.createList('Title', 'Name', 'ID'));
  };

  fetchLists = () => {
    this.props.dispatch(actionCreators.fetchListsForUser('ID'));
  };
  updateItems = () => {
    this.props.dispatch(
      actionCreators.updateListItems(this.props.activeListId, {
        APPLES: { quantity: 2, quantityDescription: '' },
      }),
    );
  };

  publishList = () => {
    this.props.dispatch(actionCreators.publishList(this.props.activeListId));
  };
  unpublishList = () => {
    this.props.dispatch(actionCreators.unpublishList(this.props.activeListId));
  };
  shareList = () => {
    this.props.dispatch(
      actionCreators.shareList(
        this.props.activeListId,
        'ID2',
        this.props.activeList,
      ),
    );
  };
  assignOwnership = () => {
    this.props.dispatch(
      actionCreators.assignListOwnership(
        this.props.activeListId,
        'ID2',
        this.props.activeList,
      ),
    );
  };
  removeUser = () => {
    this.props.dispatch(
      actionCreators.removeUserFromList(this.props.activeListId, 'ID2'),
    );
  };
  deleteList = () => {
    this.props.dispatch(
      actionCreators.deleteList(this.props.activeListId, 'ID'),
    );
  };
  signIn = () => {
    this.props.dispatch(
      actionCreators.authLogin('dubalator@gmail.com', 'abc123'),
    );
  };
  signOut = () => {
    this.props.dispatch(actionCreators.authLogout());
  };

  stop = () => {
    this.props.dispatch(actionCreators.stopObservingAuthState());
  };

  observeList = () => {
    this.props.dispatch(actionCreators.observeList(this.props.activeListId));
  };

  stopObserving = () => {
    this.props.dispatch(
      actionCreators.stopObservingList(this.props.activeListId),
    );
  };

  componentWillUnmount() {
    this.props.dispatch(actionCreators.stopObservingAuthState());
  }
  render() {
    const routes = this.props.isAuthenticated ? (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/login" component={AuthScreen} />
        <Route path="/" component={WelcomeScreen} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <Fragment>
        <CssBaseline />
        <Layout isLoggedIn={this.props.isAuthenticated}>{routes}</Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.userId !== null,
    activeListId: state.list.activeListId,
    activeList: state.list.activeList,
  };
};
export default withRouter(connect(mapStateToProps)(App));
