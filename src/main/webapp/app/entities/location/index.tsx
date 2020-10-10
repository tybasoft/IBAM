import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Location from './location';
import LocationDetail from './location-detail';
import LocationUpdate from './location-update';
import LocationDeleteDialog from './location-delete-dialog';
import { ACTION_TYPES, apiUrl } from './location.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';



const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LocationDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LocationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LocationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LocationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Location} />
    </Switch>
  </>
);

export default Routes;
