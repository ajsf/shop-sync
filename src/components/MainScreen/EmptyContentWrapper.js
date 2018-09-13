import React from 'react';
import Grid from '@material-ui/core/Grid';
import AddButton from './AddButton';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: { height: '100%', justify: 'space-around' },
});
const EmptyContentWrapper = props => {
  const { classes } = props;
  return (
    <Grid container direction="column" className={classes.root}>
      {props.children}
      <AddButton onClick={props.createList} />
    </Grid>
  );
};

export default withStyles(styles)(EmptyContentWrapper);
