// import external modules
import React, { Suspense, lazy } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { login } from '../../../shared/reducers/authentication';
import Spinner from '../../components/spinner/spinner';

export interface IHomeProp extends StateProps, RouteComponentProps<{}> {}

// import internal(own) modules
import MainLayout from '../mainLayout';
import FullPageLayout from '../fullpageLayout';
import { connect } from 'react-redux';

const LazyLogin = lazy(() => import('../../views/pages/login'));

const MainLayoutRoute = (props, { ...rest }) => {
  const { account, render } = props;

  const handleLogin = (username, password, rememberMe = false) => {
    console.log('Called from propsi');
    props.login(username, password, rememberMe);
  };

  console.log('Auth state:', props);

  const { location, isAuthenticated } = props;

  return account && account.login ? (
    <Route {...props.rest} render={matchProps => <MainLayout>{render(matchProps)}</MainLayout>} />
  ) : (
    <FullPageLayout>
      <Suspense fallback={<Spinner />}>
        <LazyLogin handleLogin={handleLogin} />
      </Suspense>
    </FullPageLayout>

    //  <div>jj</div>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account
});

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MainLayoutRoute);
