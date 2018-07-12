import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconRow from './IconRow';
import WelcomeScreenText from './WelcomeScreenText';
import WelcomeScreenButton from './WelcomeScreenButton';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
    marginBottom: 40,
    width: '90%',
    maxWidth: 600,
  },
  progress: { marginTop: 32, marginBottom: 32 },
});

const SplashScreen = props => {
  const { classes } = props;
  const paperContent = props.networkActive ? (
    <Grid container justify="center">
      <CircularProgress  size={60} className={classes.progress} />
    </Grid>
  ) : (
    <Fragment>
      <IconRow />
      <br />
      <WelcomeScreenText />
      <WelcomeScreenButton />
    </Fragment>
  );
  return (
    <BackgroundImage>
      <Grid container>
        <Paper className={classes.paper} elevation={1}>
          {paperContent}
        </Paper>
      </Grid>
    </BackgroundImage>
  );
};

SplashScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SplashScreen);
