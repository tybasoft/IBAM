import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Planification from './planification';
import PlanificationDetail from './planification-detail';
import PlanificationUpdate from './planification-update';
import PlanificationDeleteDialog from './planification-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PlanificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PlanificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PlanificationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Planification} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PlanificationDeleteDialog} />
  </>
);

export default Routes;
