import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/actionCreators';
import Button from '@material-ui/core/Button';

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
    return (
      <div className="App">
        <Button variant="contained" onClick={this.signIn}>
          Sign In
        </Button>
        <button onClick={this.signOut}>Sign Out</button>
        <button onClick={this.stop}>Stop</button>
        <button onClick={this.createList}>Create A List</button>
        <button onClick={this.fetchLists}>Fetch Lists</button>
        <button onClick={this.updateItems}>Update Items</button>
        <button onClick={this.publishList}>Publish List</button>
        <button onClick={this.unpublishList}>Unpublish List</button>
        <button onClick={this.shareList}>share List</button>
        <button onClick={this.assignOwnership}>assign ownership</button>
        <button onClick={this.removeUser}>remove user</button>
        <button onClick={this.deleteList}>delete list</button>
        <button onClick={this.observeList}>observe list</button>
        <button onClick={this.stopObserving}>stop observing</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeListId: state.list.activeListId,
    activeList: state.list.activeList,
  };
};
export default connect(mapStateToProps)(App);
