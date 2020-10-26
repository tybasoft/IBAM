import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LigneStockDisponible from './ligne-stock-disponible';
import LigneStockDisponibleDetail from './ligne-stock-disponible-detail';
import LigneStockDisponibleUpdate from './ligne-stock-disponible-update';
import LigneStockDisponibleDeleteDialog from './ligne-stock-disponible-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LigneStockDisponibleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LigneStockDisponibleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LigneStockDisponibleDetail} />
      <ErrorBoundaryRoute path={match.url} component={LigneStockDisponible} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LigneStockDisponibleDeleteDialog} />
  </>
);

export default Routes;
