import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ShoppingListsLayout from './ShoppingLists/ShoppingListsLayout';
import ListEditorContainer from '../../containers/MainScreen/ListEditorContainer';

const styles = theme => ({
  paperContainer: {
    ...theme.mixins.gutters(),
    minHeight: 400,
    padding: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit,
    minHeight: 400,
    height: '100%',
  },
});

const MainScreenLayout = props => {
  const { classes } = props;
  const createList = () => {
    props.createList('', props.userName, props.userId);
  };
  return (
    <Grid container className={classes.paperContainer}>
      <Grid item xs={12} sm={4}>
        <ShoppingListsLayout
          openList={props.openList}
          createList={createList}
          paperClass={classes.paper}
          lists={props.lists}
          processing={props.loadingLists}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <ListEditorContainer
          processing={props.loadingActiveList}
          createList={createList}
          paperClass={classes.paper}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(MainScreenLayout);
