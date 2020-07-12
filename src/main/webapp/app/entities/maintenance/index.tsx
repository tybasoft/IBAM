import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Maintenance from './maintenance';
import MaintenanceDetail from './maintenance-detail';
import MaintenanceUpdate from './maintenance-update';
import MaintenanceDeleteDialog from './maintenance-delete-dialog';
import { ACTION_TYPES, apiUrl } from './maintenance.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';


const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MaintenanceDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MaintenanceUpdate} />

      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MaintenanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MaintenanceDetail} />
      <ErrorBoundaryRoute path={match.url} component={Maintenance} />
    </Switch>
  </>
);

export default Routes;
