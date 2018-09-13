import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: 'auto',
  },
});

const AddButton = props => {
  const { classes } = props;

  return (
    <Button
      className={classes.button}
      variant="fab"
      color="primary"
      aria-label="New List"
      onClick={props.onClick}
    >
      <AddIcon />
    </Button>
  );
};

export default withStyles(styles)(AddButton);
