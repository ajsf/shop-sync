import React, { Component, Fragment } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EmptyContentWrapper from '../../components/MainScreen/EmptyContentWrapper';
import withLoadingIndicator from '../../hoc/withLoadingIndicator/withLoadingIndicator';
import ListEditor from '../../components/MainScreen/ListEditor/ListEditor';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

class ListEditorContainer extends Component {
  onSubmit = item => {
    if (this.props.activeItemId) {
      this.props.updateListItem(
        this.props.listId,
        this.props.activeItemId,
        item,
      );
    } else {
      this.props.createListItem(this.props.listId, item);
    }
  };

  render() {
    let content;
    const { list } = this.props;
    if (list) {
      content = <ListEditor {...this.props} />;
    } else {
      content = (
        <EmptyContentWrapper createList={this.props.createList}>
          <Typography align="left" variant="headline" component="h3">
            Select a list or create a new one.
          </Typography>
        </EmptyContentWrapper>
      );
    }

    return (
      <Paper
        className={this.props.paperClass}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {content}
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    listId: state.list.activeListId,
    list: state.list.activeList,
    activeItemId: state.list.activeListItemId,
  };
};

const mapDispatchToProps = {
  createListItem: (listId, item) => actionCreators.createListItem(listId, item),
  updateListItem: (listId, listItemId, item) =>
    actionCreators.updateListItem(listId, listItemId, item),
  deleteListItem: (listId, listItemId) =>
    actionCreators.deleteListItem(listId, listItemId),
  selectItem: itemId => actionCreators.selectListItem(itemId),
  setListTitle: (listId, title) => actionCreators.setListTitle(listId, title),
};

export default withLoadingIndicator(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ListEditorContainer),
);
