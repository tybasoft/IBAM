import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Equipe from './equipe';
import EquipeDetail from './equipe-detail';
import EquipeUpdate from './equipe-update';
import EquipeDeleteDialog from './equipe-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EquipeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EquipeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EquipeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EquipeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Equipe} />
    </Switch>
  </>
);

export default Routes;
