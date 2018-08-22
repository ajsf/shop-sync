import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../config/firebase';
import { withStyles } from '@material-ui/core/styles';

import BackgroundImage from '../BackgroundImage/BackgroundImage';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const uiConfig = {
  //signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

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
    maxWidth: 900,
  },
});

const AuthScreen = props => {
  const { classes } = props;
  return (
    <BackgroundImage>
      <Grid container>
        <Paper className={classes.paper}>
          <Typography align="center" gutterBottom variant="headline">
            Choose a provider to sign in with.
          </Typography>
          <Typography align="center" gutterBottom variant="subheading">
            If you do not have an account, you will be prompted to create one.
          </Typography>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Paper>
      </Grid>
    </BackgroundImage>
  );
};

export default withStyles(styles)(AuthScreen);
