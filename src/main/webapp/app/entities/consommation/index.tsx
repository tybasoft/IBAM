import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Consommation from './consommation';
import ConsommationDetail from './consommation-detail';
import ConsommationUpdate from './consommation-update';
import ConsommationDeleteDialog from './consommation-delete-dialog';


const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ConsommationDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ConsommationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ConsommationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ConsommationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Consommation} />
    </Switch>
  </>
);

export default Routes;
