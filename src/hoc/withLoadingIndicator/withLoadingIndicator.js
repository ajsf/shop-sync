import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const withLoadingIndicator = WrappedComponent => {
  return class extends Component {
    render() {
      if (this.props.processing) {
        return (
          <Grid container justify="center">
            <CircularProgress size={60} />
          </Grid>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withLoadingIndicator;
