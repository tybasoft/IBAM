import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AffectationMateriels from './affectation-materiels';
import AffectationMaterielsDetail from './affectation-materiels-detail';
import AffectationMaterielsUpdate from './affectation-materiels-update';
import AffectationMaterielsDeleteDialog from './affectation-materiels-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AffectationMaterielsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AffectationMaterielsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AffectationMaterielsDetail} />
      <ErrorBoundaryRoute path={match.url} component={AffectationMateriels} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AffectationMaterielsDeleteDialog} />
  </>
);

export default Routes;
