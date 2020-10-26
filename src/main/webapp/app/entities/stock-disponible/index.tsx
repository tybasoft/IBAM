import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StockDisponible from './stock-disponible';
import StockDisponibleDetail from './stock-disponible-detail';
import StockDisponibleUpdate from './stock-disponible-update';
import StockDisponibleDeleteDialog from './stock-disponible-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StockDisponibleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StockDisponibleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StockDisponibleDetail} />
      <ErrorBoundaryRoute path={match.url} component={StockDisponible} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={StockDisponibleDeleteDialog} />
  </>
);

export default Routes;
