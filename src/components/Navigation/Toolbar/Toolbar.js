import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Layout = props => {
  const { classes } = props;

  const logInOutButton = props.isLoggedIn ? (
    <Button  variant="outlined"  component={Link} to="/logout" color="inherit">
      Logout
    </Button>
  ) : (
    <Button variant="outlined" component={Link} to="/login" color="inherit">
      Login
    </Button>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.flex} variant="title" color="inherit">
            <ButtonBase component={Link} to="/">
              Sync Shopper
            </ButtonBase>
          </Typography>
          {logInOutButton}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Layout);
