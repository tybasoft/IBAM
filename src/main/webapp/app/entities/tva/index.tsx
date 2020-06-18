import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Tva from './tva';
import TvaDetail from './tva-detail';
import TvaUpdate from './tva-update';
import TvaDeleteDialog from './tva-delete-dialog';
import Import from '../../shared/Repport/import';
import Export from '../../shared/Repport/export';
import { apiUrl, ACTION_TYPES } from './tva.reducer';
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TvaDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TvaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TvaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TvaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Tva} />
    </Switch>
  </>
);

export default Routes;
