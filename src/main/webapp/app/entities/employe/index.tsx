import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Employe from './employe';
import EmployeDetail from './employe-detail';
import EmployeUpdate from './employe-update';
import EmployeDeleteDialog from './employe-delete-dialog';
import { ACTION_TYPES, apiUrl } from './employe.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Employe} />
    </Switch>
  </>
);

export default Routes;
