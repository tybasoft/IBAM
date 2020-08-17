import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Unite from './unite';
import UniteDetail from './unite-detail';
import UniteUpdate from './unite-update';
import UniteDeleteDialog from './unite-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UniteDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UniteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UniteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UniteDetail} />
      <ErrorBoundaryRoute path={match.url} component={Unite} />
    </Switch>
  </>
);

export default Routes;
