import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Depot from './depot';
import DepotDetail from './depot-detail';
import DepotUpdate from './depot-update';
import DepotDeleteDialog from './depot-delete-dialog';
import { ACTION_TYPES, apiUrl } from './depot.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DepotDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DepotUpdate} />

      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DepotUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DepotDetail} />
      <ErrorBoundaryRoute path={match.url} component={Depot} />
    </Switch>
  </>
);

export default Routes;
