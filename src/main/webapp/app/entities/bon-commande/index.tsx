import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BonCommande from './bon-commande';
import BonCommandeDetail from './bon-commande-detail';
import BonCommandeUpdate from './bon-commande-update';
import BonCommandeDeleteDialog from './bon-commande-delete-dialog';
import NewLigneBonCommandeDialog from "app/entities/bon-commande/newligne-bon-commandedialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BonCommandeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NewLigneBonCommandeDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/ligne`} component={NewLigneBonCommandeDialog} />

      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BonCommandeDetail} />
      <ErrorBoundaryRoute path={match.url} component={BonCommande} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BonCommandeDeleteDialog} />
  </>
);

export default Routes;
