import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BonReception from './bon-reception';
import BonReceptionDetail from './bon-reception-detail';
import BonReceptionUpdate from './bon-reception-update';
import BonReceptionDeleteDialog from './bon-reception-delete-dialog';
import NewLigneBonCommandeDialog from "app/entities/bon-commande/newligne-bon-commandedialog";
import NewBonReceptionUpdate from "app/entities/bon-reception/newligne-bon-receptiondialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BonReceptionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NewBonReceptionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/ligne`} component={NewBonReceptionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BonReceptionDetail} />
      <ErrorBoundaryRoute path={match.url} component={BonReception} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BonReceptionDeleteDialog} />
  </>
);

export default Routes;
