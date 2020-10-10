import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Pointage from './pointage';
import PointageDetail from './pointage-detail';
import PointageUpdate from './pointage-update';
import PointageDeleteDialog from './pointage-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PointageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PointageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PointageDetail} />
      <ErrorBoundaryRoute path={match.url} component={Pointage} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PointageDeleteDialog} />
  </>
);

export default Routes;
