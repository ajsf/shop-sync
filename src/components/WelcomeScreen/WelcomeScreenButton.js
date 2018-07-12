import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const WelcomeScreenButton = props => {
  return (
    <Grid container justify="center">
      <Grid item>
        <Button
          variant="contained"
          component={Link}
          to="/login"
          color="primary"
        >
          Get Started!
        </Button>
      </Grid>
    </Grid>
  );
};

export default WelcomeScreenButton;
