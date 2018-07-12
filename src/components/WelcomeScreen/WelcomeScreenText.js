import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const WelcomeScreenText = props => {
  return (
    <Grid justify="center" container>
      <Grid item>
        <Typography
          color="primary"
          align="center"
          gutterBottom
          variant="headline"
          component="h1"
        >
          Are you tired of texting and emailing grocery lists back and forth
          with family, friends or roommates?
        </Typography>
      </Grid>
      <Grid item>
        <br />
        <Typography gutterBottom align="inherit" variant="subheading">
          Do you wish you could share lists that would automatically stay in
          sync in realtime? Look no further! With Sync-Shopper, you can do all
          that and more!
          <br />
          <br />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WelcomeScreenText;
