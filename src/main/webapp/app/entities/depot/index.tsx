import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Depot from './depot';
import DepotDetail from './depot-detail';
import DepotUpdate from './depot-update';
import DepotDeleteDialog from './depot-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DepotDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DepotUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DepotUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DepotDetail} />
      <ErrorBoundaryRoute path={match.url} component={Depot} />
    </Switch>
  </>
);

export default Routes;
