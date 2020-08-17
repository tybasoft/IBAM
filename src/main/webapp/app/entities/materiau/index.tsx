import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Materiau from './materiau';
import MateriauDetail from './materiau-detail';
import MateriauUpdate from './materiau-update';
import MateriauDeleteDialog from './materiau-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MateriauDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MateriauUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MateriauUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MateriauDetail} />
      <ErrorBoundaryRoute path={match.url} component={Materiau} />
    </Switch>
  </>
);

export default Routes;
