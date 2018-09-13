import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import EmptyContentWrapper from '../EmptyContentWrapper';
import ListSummaryCard from './ListSummaryCard';

import withLoadingIndicator from '../../../hoc/withLoadingIndicator/withLoadingIndicator';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit,
    minHeight: 400,
    height: '100%',
  },
});

const ShoppingListsLayout = props => {
  console.log('SL LAYOUT', props);

  let content;
  const { lists, classes } = props;
  if (lists && lists.length > 0) {
    const cards = Object.keys(props.lists).map(listId => {
      return (
        <ListSummaryCard
          openList={props.openList}
          key={listId}
          list={lists[listId]}
        />
      );
    });
    content = (
      <Fragment>
        <Typography align="left" gutterBottom variant="body1">
          Your Lists
        </Typography>
        {cards}
      </Fragment>
    );
  } else {
    content = (
      <EmptyContentWrapper createList={props.createList}>
        <Typography variant="headline" gutterBottom component="h3" align="left">
          You have no lists.
        </Typography>
        <Typography component="p" align="left">
          Create a list to get started.
        </Typography>
      </EmptyContentWrapper>
    );
  }
  return <div className={classes.container}>{content}</div>;
};

export default withStyles(styles)(withLoadingIndicator(ShoppingListsLayout));
