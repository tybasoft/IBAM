import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Famille from './famille';
import FamilleDetail from './famille-detail';
import FamilleUpdate from './famille-update';
import FamilleDeleteDialog from './famille-delete-dialog';
import { ACTION_TYPES, apiUrl } from './famille.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FamilleDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FamilleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FamilleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FamilleDetail} />
      <ErrorBoundaryRoute path={match.url} component={Famille} />
    </Switch>
  </>
);

export default Routes;
