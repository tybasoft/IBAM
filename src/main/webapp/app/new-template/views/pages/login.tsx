// import external modules
import React, { Component } from 'react';
import { NavLink, Redirect, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Input, Form, FormGroup, Button, Label, Card, CardBody, CardFooter, Alert } from 'reactstrap';
import { IRootState } from '../../../shared/reducers';
import { login, ACTION_TYPES, getSession } from '../../../shared/reducers/authentication';
import { connect } from 'react-redux';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import axios from 'axios';
import { Storage } from 'react-jhipster';
const AUTH_TOKEN_KEY = 'jhi-authenticationToken';
import { Translate, translate } from 'react-jhipster';

export interface ILoginFormProps {
  loginError: boolean;
  handleLogin: Function;
  location?: any;
  isAuthenticated?: boolean;
}
// export interface ILoginPageProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

class Login extends Component<ILoginFormProps> {
  state = {
    isChecked: true
  };
  handleChecked = e => {
    this.setState((prevState: any) => ({
      isChecked: !prevState.isChecked
    }));
  };

  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    console.log('con', username, password, rememberMe);
    handleLogin(username, password, rememberMe);
    console.log('handled');
  };

  render() {
    const { loginError } = this.props;
    const { location, isAuthenticated } = this.props;
    console.log('Is auth value :', isAuthenticated);
    console.log('Location value :', location);
    const { from } = location?.state || { from: { pathname: '/', search: location?.search } };
    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div className="container">
        <Row className="full-height-vh">
          <Col xs="12" className="d-flex align-items-center justify-content-center">
            <Card className="gradient-indigo-purple text-center width-400">
              <CardBody>
                <h2 className="white py-4">
                  <Translate contentKey="login.title">Authentification</Translate>
                </h2>
                <AvForm className="pt-2" onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Col md="12">
                      <AvField
                        name="username"
                        label={translate('global.form.username.label')}
                        placeholder={translate('global.form.username.placeholder')}
                        required
                        errorMessage={translate('login.messages.error.username')}
                        autoFocus
                      />
                      {/* <Input type="text" className="form-control" name="username" id="inputEmail" placeholder="Username" required /> */}
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col md="12">
                      <AvField
                        name="password"
                        type="password"
                        // label={translate('global.form.username.label')}
                        // placeholder={translate('global.form.username.placeholder')}
                        required
                        errorMessage={translate('login.messages.error.password')}
                        autoFocus
                      />
                      {/* <Input type="password" className="form-control" name="password" id="inputPass" placeholder="Password" required /> */}
                    </Col>
                  </FormGroup>

                  <AvGroup check inline>
                    <Row>
                      <Col md="12">
                        <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0 ml-3">
                          <AvInput
                            type="checkbox"
                            className="custom-control-input"
                            name="rememberMe"
                            checked={this.state.isChecked}
                            // onChange={this.handleChecked}
                            id="rememberMe"
                          />
                          <Label className="custom-control-label float-left white" for="rememberMe">
                            <Translate contentKey="login.form.rememberme">Remember me</Translate>
                          </Label>
                        </div>
                      </Col>
                    </Row>
                  </AvGroup>
                  <Col md="12">
                    {loginError ? (
                      <Alert color="danger">
                        <Translate contentKey="login.messages.error.authentication">
                          <strong>Failed to sign in!</strong> Please check your credentials and try again.
                        </Translate>
                      </Alert>
                    ) : null}
                  </Col>
                  <FormGroup>
                    <Col md="12">
                      <Button type="submit" color="danger" block className="btn-pink btn-raised">
                        <Translate contentKey="login.form.button">Submit</Translate>
                      </Button>
                    </Col>
                  </FormGroup>
                </AvForm>
              </CardBody>
              <CardFooter>
                <div className="float-left">
                  <NavLink to="/pages/forgot-password" className="text-white">
                    <Translate contentKey="login.password.forgot">Forgot Password?</Translate>
                  </NavLink>
                </div>
                <div className="float-right">
                  <NavLink to="/pages/register" className="text-white">
                    <Translate contentKey="login.register">Register</Translate>
                  </NavLink>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError,
  showModal: authentication.showModalLogin
});

// // const mapDispatchToProps = { login };
// const mapDispatchToProps = dispatch => ({
//   login: (username, password) => {
//     dispatch(login(username, password));
//   }
// });

type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps)(Login);
// export default connect(mapStateToProps, mapDispatchToProps)(Login);
