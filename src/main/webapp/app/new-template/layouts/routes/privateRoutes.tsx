// import external modules
import React, { Suspense, lazy } from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { login } from '../../../shared/reducers/authentication';
import Spinner from '../../components/spinner/spinner';

export interface IHomeProp extends StateProps, RouteComponentProps<{}> {}

const LazyEcommerceDashboard = lazy(() => import('../../views/dashboard/ecommerceDashboard'));

// import internal(own) modules
import MainLayout from '../mainLayout';
import FullPageLayout from '../fullpageLayout';
import { connect } from 'react-redux';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

const LazyLogin = lazy(() => import('../../views/pages/login'));

const PrivateLayoutRoutes = (props, { ...rest }) => {
  const { account, render, isAdmin } = props;

  const handleLogin = (username, password, rememberMe = false) => {
    console.log('Called from propsi');
    props.login(username, password, rememberMe);
  };

  console.log('Auth state:', account);

  const { location, isAuthenticated } = props;

  if (account && account.login) {
    if (isAdmin) return <Route {...props.rest} render={matchProps => <MainLayout>{render(matchProps)}</MainLayout>} />;
    props.history.push(`/`);

    return (
      <MainLayout>
        <Suspense fallback={<Spinner />}>
          <LazyEcommerceDashboard />
        </Suspense>
      </MainLayout>
    );
  } else
    return (
      <FullPageLayout>
        <Suspense fallback={<Spinner />}>
          <LazyLogin handleLogin={handleLogin} />
        </Suspense>
      </FullPageLayout>
    );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAdmin: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PrivateLayoutRoutes));
