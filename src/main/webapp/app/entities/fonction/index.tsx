import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Fonction from './fonction';
import FonctionDetail from './fonction-detail';
import FonctionUpdate from './fonction-update';
import FonctionDeleteDialog from './fonction-delete-dialog';
import { ACTION_TYPES, apiUrl } from './fonction.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FonctionDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FonctionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FonctionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FonctionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Fonction} />
    </Switch>
  </>
);

export default Routes;
