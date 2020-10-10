import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Marque from './marque';
import MarqueDetail from './marque-detail';
import MarqueUpdate from './marque-update';
import MarqueDeleteDialog from './marque-delete-dialog';
import { ACTION_TYPES, apiUrl } from './marque.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MarqueDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MarqueUpdate} />

      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MarqueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MarqueDetail} />
      <ErrorBoundaryRoute path={match.url} component={Marque} />
    </Switch>
  </>
);

export default Routes;
