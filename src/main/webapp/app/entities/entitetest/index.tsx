import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Entitetest from './entitetest';
import EntitetestDetail from './entitetest-detail';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EntitetestDetail} />
      <ErrorBoundaryRoute path={match.url} component={Entitetest} />
    </Switch>
  </>
);

export default Routes;
