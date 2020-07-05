import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VisiteTechnique from './visite-technique';
import VisiteTechniqueDetail from './visite-technique-detail';
import VisiteTechniqueUpdate from './visite-technique-update';
import VisiteTechniqueDeleteDialog from './visite-technique-delete-dialog';
import Export from '../../shared/Repport/export';
import { apiUrl, ACTION_TYPES } from './visite-technique.reducer';
import Import from '../../shared/Repport/import';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VisiteTechniqueDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VisiteTechniqueUpdate} />

      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VisiteTechniqueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VisiteTechniqueDetail} />
      <ErrorBoundaryRoute path={match.url} component={VisiteTechnique} />
    </Switch>
  </>
);

export default Routes;
