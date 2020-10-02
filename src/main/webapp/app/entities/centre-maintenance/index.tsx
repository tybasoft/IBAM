import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CentreMaintenance from './centre-maintenance';
import CentreMaintenanceDetail from './centre-maintenance-detail';
import CentreMaintenanceUpdate from './centre-maintenance-update';
import CentreMaintenanceDeleteDialog from './centre-maintenance-delete-dialog';
import { ACTION_TYPES, apiUrl } from './centre-maintenance.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';


const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CentreMaintenanceDeleteDialog} />

      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CentreMaintenanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CentreMaintenanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CentreMaintenanceDetail} />
      <ErrorBoundaryRoute path={match.url} component={CentreMaintenance} />
    </Switch>
  </>
);

export default Routes;
