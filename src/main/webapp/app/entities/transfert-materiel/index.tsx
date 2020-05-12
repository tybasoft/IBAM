import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TransfertMateriel from './transfert-materiel';
import TransfertMaterielDetail from './transfert-materiel-detail';
import TransfertMaterielUpdate from './transfert-materiel-update';
import TransfertMaterielDeleteDialog from './transfert-materiel-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TransfertMaterielDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TransfertMaterielUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TransfertMaterielUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TransfertMaterielDetail} />
      <ErrorBoundaryRoute path={match.url} component={TransfertMateriel} />
    </Switch>
  </>
);

export default Routes;
