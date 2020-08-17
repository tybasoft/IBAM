import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VisiteTechnique from './visite-technique';
import VisiteTechniqueDetail from './visite-technique-detail';
import VisiteTechniqueUpdate from './visite-technique-update';
import VisiteTechniqueDeleteDialog from './visite-technique-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VisiteTechniqueDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VisiteTechniqueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VisiteTechniqueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VisiteTechniqueDetail} />
      <ErrorBoundaryRoute path={match.url} component={VisiteTechnique} />
    </Switch>
  </>
);

export default Routes;
