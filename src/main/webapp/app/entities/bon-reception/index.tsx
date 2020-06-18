import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BonReception from './bon-reception';
import BonReceptionDetail from './bon-reception-detail';
import BonReceptionUpdate from './bon-reception-update';
import BonReceptionDeleteDialog from './bon-reception-delete-dialog';
import { ACTION_TYPES, apiUrl } from './bon-reception.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BonReceptionDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BonReceptionUpdate} />

      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BonReceptionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BonReceptionDetail} />
      <ErrorBoundaryRoute path={match.url} component={BonReception} />
    </Switch>
  </>
);

export default Routes;
