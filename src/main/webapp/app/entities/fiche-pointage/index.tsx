import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FichePointage from './fiche-pointage';
import FichePointageDetail from './fiche-pointage-detail';
import FichePointageUpdate from './fiche-pointage-update';
import FichePointageDeleteDialog from './fiche-pointage-delete-dialog';
import PointageJour from '../pointage/pointage-interface';
import FichePointagePointagesDetail   from './pointageFiche-detail';
import  PointageJourUpdate from   '../pointage/pointage-update-interface';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/EditListPointage`} component={PointageJourUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/pointer`} component={PointageJour} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FichePointageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/listPointageOfFiche`} component={FichePointagePointagesDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FichePointageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FichePointageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FichePointageDetail} />
      <ErrorBoundaryRoute path={match.url} component={FichePointage} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FichePointageDeleteDialog} />
  </>
);

export default Routes;
