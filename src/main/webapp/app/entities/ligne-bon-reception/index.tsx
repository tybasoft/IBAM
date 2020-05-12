import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LigneBonReception from './ligne-bon-reception';
import LigneBonReceptionDetail from './ligne-bon-reception-detail';
import LigneBonReceptionUpdate from './ligne-bon-reception-update';
import LigneBonReceptionDeleteDialog from './ligne-bon-reception-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LigneBonReceptionDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LigneBonReceptionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LigneBonReceptionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LigneBonReceptionDetail} />
      <ErrorBoundaryRoute path={match.url} component={LigneBonReception} />
    </Switch>
  </>
);

export default Routes;
