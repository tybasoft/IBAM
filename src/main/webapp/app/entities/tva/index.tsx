import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Tva from './tva';
import TvaDetail from './tva-detail';
import TvaUpdate from './tva-update';
import TvaDeleteDialog from './tva-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TvaDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TvaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TvaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TvaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Tva} />
    </Switch>
  </>
);

export default Routes;
