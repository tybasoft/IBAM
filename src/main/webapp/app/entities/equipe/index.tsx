import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Equipe from './equipe';
import EquipeDetail from './equipe-detail';
import EquipeUpdate from './equipe-update';
import EquipeDeleteDialog from './equipe-delete-dialog';
import { ACTION_TYPES, apiUrl } from './equipe.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EquipeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EquipeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EquipeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EquipeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Equipe} />
    </Switch>
  </>
);

export default Routes;
