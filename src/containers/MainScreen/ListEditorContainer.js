import React from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import EmptyContentWrapper from '../../components/MainScreen/EmptyContentWrapper';
import withLoadingIndicator from '../../hoc/withLoadingIndicator/withLoadingIndicator';
import ListEditor from '../../components/MainScreen/ListEditor/ListEditor';
import * as actionCreators from '../../store/actions/actionCreators';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit,
    minHeight: 400,
    minWidth: 320,
    height: '100%',
  },
});

const ListEditorContainer = props => {
  const createList = () => {
    props.createList('', props.userName, props.userId);
  };

  let content;
  const { list, classes } = props;
  if (list) {
    content = <ListEditor {...props} />;
  } else {
    content = (
      <EmptyContentWrapper createList={createList}>
        <Typography align="left" variant="headline" component="h3">
          Select a list or create a new one.
        </Typography>
      </EmptyContentWrapper>
    );
  }

  return (
    <Paper
      className={classes.container}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {content}
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    userName: state.auth.userName,
    userId: state.auth.userId,
    listId: state.list.activeListId,
    list: state.list.activeList,
    activeItemId: state.list.activeListItemId,
    processing: state.network.operationName === 'loading_active_list',
  };
};

const mapDispatchToProps = {
  createList: (title, userName, userId) =>
    actionCreators.createList(title, userName, userId),
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
  )(withStyles(styles)(ListEditorContainer)),
);
