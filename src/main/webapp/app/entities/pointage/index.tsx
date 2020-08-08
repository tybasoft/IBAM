import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Pointage from './pointage';
import PointageDetail from './pointage-detail';
import PointageUpdate from './pointage-update';
import PointageDeleteDialog from './pointage-delete-dialog';
import PointageJour from './pointage-interface';
import { ACTION_TYPES, apiUrl } from './pointage.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';


const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/pointer`} component={PointageJour} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PointageDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PointageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PointageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PointageDetail} />
      <ErrorBoundaryRoute path={match.url} component={Pointage} />
    </Switch>
  </>
);

export default Routes;
