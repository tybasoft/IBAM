import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { login } from 'app/shared/reducers/authentication';
import LoginForm from './login-home';

export interface ILoginPageProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export const LoginPage = (props: ILoginPageProps) => {
 
  
  const handleLogin = (username, password, rememberMe = false) => props.login(username, password, rememberMe);

  const handleClose = () => {
   
    props.history.push('/');
  };

  const { location, isAuthenticated } = props;
  const { from } = (location.state as any) || { from: { pathname: '/', search: location.search } };
  if (isAuthenticated) {
    return <Redirect to={from} />;
  }
  
  return <LoginForm handleLogin={handleLogin} loginError={props.loginError} />;
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError,
  showModal: authentication.showModalLogin
});

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
