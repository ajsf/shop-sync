import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircleOutline';

const styles = theme => ({
  root: { height: '100%', justify: 'space-around' },
  button: {
    margin: 'auto',
  },
});

const EmptyContentWrapper = props => {
  const { classes } = props;

  return (
    <Grid container direction="column" className={classes.root}>
      {props.children}
      <Button
        className={classes.button}
        variant="fab"
        color="primary"
        aria-label="New List"
        onClick={props.createList}
      >
        <AddIcon />
      </Button>
    </Grid>
  );
};

export default withStyles(styles)(EmptyContentWrapper);
