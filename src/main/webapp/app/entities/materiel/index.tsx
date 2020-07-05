import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Materiel from './materiel';
import MaterielDetail from './materiel-detail';
import MaterielUpdate from './materiel-update';
import MaterielDeleteDialog from './materiel-delete-dialog';
import { ACTION_TYPES, apiUrl } from './materiel.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MaterielDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/export`}
        component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />}
      />{' '}
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MaterielUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MaterielUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MaterielDetail} />
      <ErrorBoundaryRoute path={match.url} component={Materiel} />
    </Switch>
  </>
);

export default Routes;
