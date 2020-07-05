import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Horaire from './horaire';
import HoraireDetail from './horaire-detail';
import HoraireUpdate from './horaire-update';
import HoraireDeleteDialog from './horaire-delete-dialog';
import Import from '../../shared/Repport/import';

import { ACTION_TYPES, apiUrl } from './horaire.reducer';
import Export from '../../shared/Repport/export';
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={HoraireDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HoraireUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HoraireUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HoraireDetail} />
      <ErrorBoundaryRoute path={match.url} component={Horaire} />
    </Switch>
  </>
);

export default Routes;
