import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = props => {
  return (
    <Fragment>
      <Toolbar isLoggedIn={props.isLoggedIn} />
      <main>{props.children}</main>
    </Fragment>
  );
};

Layout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Layout;
