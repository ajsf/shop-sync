import React from 'react';
import ListIcon from '@material-ui/icons/List';
import StoreIcon from '@material-ui/icons/Store';
import CartIcon from '@material-ui/icons/ShoppingCart';
import Grid from '@material-ui/core/Grid';

const IconRow = props => {
  return (
    <Grid container justify="center" spacing={40}>
      <Grid item>
        <ListIcon />
      </Grid>
      <Grid item>
        <StoreIcon />
      </Grid>
      <Grid item>
        <CartIcon />
      </Grid>
    </Grid>
  );
};

export default IconRow;
