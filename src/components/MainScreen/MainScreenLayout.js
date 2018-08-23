import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ListEditorContainer from '../../containers/MainScreen/ListEditorContainer';
import ShoppingListsContainer from '../../containers/MainScreen/ShoppingListsContainer';

const styles = theme => ({
  paperContainer: {
    ...theme.mixins.gutters(),
    minHeight: 400,
    padding: theme.spacing.unit,
  },
});

const MainScreenLayout = props => {
  const { classes } = props;
  return (
    <Grid container className={classes.paperContainer}>
      <Grid item xs={12} sm={4}>
        <ShoppingListsContainer />
      </Grid>
      <Grid item xs={12} sm={8}>
        <ListEditorContainer />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(MainScreenLayout);
