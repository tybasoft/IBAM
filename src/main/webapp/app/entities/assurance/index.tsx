import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Assurance from './assurance';
import AssuranceDetail from './assurance-detail';
import AssuranceUpdate from './assurance-update';
import AssuranceDeleteDialog from './assurance-delete-dialog';
import { ACTION_TYPES, apiUrl } from './assurance.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AssuranceDeleteDialog} />

      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AssuranceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AssuranceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AssuranceDetail} />
      <ErrorBoundaryRoute path={match.url} component={Assurance} />
    </Switch>
  </>
);

export default Routes;
