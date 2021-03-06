import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LigneBonCommande from './ligne-bon-commande';
import LigneBonCommandeDetail from './ligne-bon-commande-detail';
import LigneBonCommandeUpdate from './ligne-bon-commande-update';
import LigneBonCommandeDeleteDialog from './ligne-bon-commande-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      {/*<ErrorBoundaryRoute exact path={`${match.url}/new`} component={LigneBonCommandeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LigneBonCommandeUpdate} />*/}
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LigneBonCommandeDetail} />
      <ErrorBoundaryRoute path={match.url} component={LigneBonCommande} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LigneBonCommandeDeleteDialog} />
  </>
);

export default Routes;
