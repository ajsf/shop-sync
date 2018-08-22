import React, { Component, Fragment } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import WelcomeScreen from './containers/WelcomeScreen/WelcomeScreen';
import AuthScreen from './components/Auth/AuthScreen';
import MainScreen from './containers/MainScreen/MainScreen';
import * as actionCreators from './store/actions/actionCreators';

import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(actionCreators.observeAuthState());
  }

  componentWillUnmount() {
    this.props.dispatch(actionCreators.stopObservingAuthState());
  }

  render() {
    const routes = this.props.isAuthenticated ? (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/" component={MainScreen} />
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
