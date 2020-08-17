import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CompteRendu from './compte-rendu';
import CompteRenduDetail from './compte-rendu-detail';
import CompteRenduUpdate from './compte-rendu-update';
import CompteRenduDeleteDialog from './compte-rendu-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CompteRenduDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CompteRenduUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CompteRenduUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CompteRenduDetail} />
      <ErrorBoundaryRoute path={match.url} component={CompteRendu} />
    </Switch>
  </>
);

export default Routes;
