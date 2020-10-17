import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BonSortie from './bon-sortie';
import BonSortieDetail from './bon-sortie-detail';
import BonSortieUpdate from './bon-sortie-update';
import BonSortieDeleteDialog from './bon-sortie-delete-dialog';
import NewBonReceptionUpdate from "app/entities/bon-reception/newligne-bon-receptiondialog";
// import {BonSortieUpdate} from './bon-sortie-updatedialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BonSortieUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BonSortieUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/ligne`} component={BonSortieUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BonSortieDetail} />
      <ErrorBoundaryRoute path={match.url} component={BonSortie} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BonSortieDeleteDialog} />
  </>
);

export default Routes;
