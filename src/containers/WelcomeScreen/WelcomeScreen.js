import React from 'react';
import { connect } from 'react-redux';
import WelcomeScreenLayout from '../../components/WelcomeScreen/WelcomeScreenLayout';

const WelcomeScreen = props => {
    return <WelcomeScreenLayout networkActive={props.networkActive} />;
};

const mapStateToProps = state => {
  return {
    networkActive: state.auth.loading,
  };
};

export default connect(mapStateToProps)(WelcomeScreen);
