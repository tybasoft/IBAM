import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Unite from './unite';
import UniteDetail from './unite-detail';
import UniteUpdate from './unite-update';
import UniteDeleteDialog from './unite-delete-dialog';
import Export from '../../shared/Repport/export';
import { apiUrl, ACTION_TYPES } from './unite.reducer';
import Import from '../../shared/Repport/import';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UniteDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UniteUpdate} />

      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UniteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UniteDetail} />
      <ErrorBoundaryRoute path={match.url} component={Unite} />
    </Switch>
  </>
);

export default Routes;
