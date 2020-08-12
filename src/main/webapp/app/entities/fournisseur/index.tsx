import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Fournisseur from './fournisseur';
import FournisseurDetail from './fournisseur-detail';
import FournisseurUpdate from './fournisseur-update';
import FournisseurDeleteDialog from './fournisseur-delete-dialog';
import Import from '../../shared/Repport/import';

import { ACTION_TYPES, apiUrl } from './fournisseur.reducer';
import Export from '../../shared/Repport/export';
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FournisseurDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FournisseurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FournisseurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FournisseurDetail} />
      <ErrorBoundaryRoute path={match.url} component={Fournisseur} />
    </Switch>
  </>
);

export default Routes;
