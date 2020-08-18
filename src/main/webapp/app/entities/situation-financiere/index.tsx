import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SituationFinanciere from './situation-financiere';
import SituationFinanciereDetail from './situation-financiere-detail';
import SituationFinanciereUpdate from './situation-financiere-update';
import SituationFinanciereDeleteDialog from './situation-financiere-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SituationFinanciereDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SituationFinanciereUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SituationFinanciereUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SituationFinanciereDetail} />
      <ErrorBoundaryRoute path={match.url} component={SituationFinanciere} />
    </Switch>
  </>
);

export default Routes;
