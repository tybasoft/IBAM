import './home.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import {  RouteComponentProps } from 'react-router-dom';
import { login } from 'app/shared/reducers/authentication';
import './home.scss';

export interface IHomeProp extends StateProps,RouteComponentProps<{}> {}

export const Home = (props: IHomeProp) => {
  
  const { account } = props;
  
  
  return (
    <Row>
      <Col md="9">
        {account && account.login ? (
          <div>
            <Alert color="success">
              <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                You are logged in as user {account.login}.
              </Translate>
            </Alert>
          </div>
        ) : (
          <div></div>
           
        )}
       

        
       
      </Col>
     
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account
  
});


const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps)(Home);
