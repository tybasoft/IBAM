import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AffectationsMateriels from './affectations-materiels';
import AffectationsMaterielsDetail from './affectations-materiels-detail';
import AffectationsMaterielsUpdate from './affectations-materiels-update';
import AffectationsMaterielsDeleteDialog from './affectations-materiels-delete-dialog';
import {AffectationsMaterielSearch} from "./affectations-materiels-search";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AffectationsMaterielsDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AffectationsMaterielsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AffectationsMaterielsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AffectationsMaterielsDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/search-entities`} component={AffectationsMaterielSearch} />
      <ErrorBoundaryRoute path={match.urMomentl} component={AffectationsMateriels} />
    </Switch>
  </>
);

export default Routes;
