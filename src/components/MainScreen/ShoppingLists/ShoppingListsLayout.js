import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import EmptyContentWrapper from '../EmptyContentWrapper';
import ListSummaryCard from './ListSummaryCard';
import withLoadingIndicator from '../../../hoc/withLoadingIndicator/withLoadingIndicator';

const ShoppingListsLayout = props => {
  let content;
  const { lists } = props;
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
  return <div className={props.paperClass}>{content}</div>;
};

export default withLoadingIndicator(ShoppingListsLayout);
