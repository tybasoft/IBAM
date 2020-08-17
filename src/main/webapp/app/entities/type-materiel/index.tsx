import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TypeMateriel from './type-materiel';
import TypeMaterielDetail from './type-materiel-detail';
import TypeMaterielUpdate from './type-materiel-update';
import TypeMaterielDeleteDialog from './type-materiel-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TypeMaterielDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TypeMaterielUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TypeMaterielUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TypeMaterielDetail} />
      <ErrorBoundaryRoute path={match.url} component={TypeMateriel} />
    </Switch>
  </>
);

export default Routes;
