import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Avancement from './avancement';
import AvancementDetail from './avancement-detail';
import AvancementUpdate from './avancement-update';
import AvancementDeleteDialog from './avancement-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AvancementDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AvancementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AvancementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AvancementDetail} />
      <ErrorBoundaryRoute path={match.url} component={Avancement} />
    </Switch>
  </>
);

export default Routes;
