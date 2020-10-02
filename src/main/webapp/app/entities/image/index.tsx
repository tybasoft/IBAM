import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Image from './image';
import ImageDetail from './image-detail';
import ImageUpdate from './image-update';
import ImageDeleteDialog from './image-delete-dialog';
import Import from '../../shared/Repport/import';

import { ACTION_TYPES, apiUrl } from './image.reducer';
import Export from '../../shared/Repport/export';
const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ImageDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ImageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />

      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ImageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ImageDetail} />
      <ErrorBoundaryRoute path={match.url} component={Image} />
    </Switch>
  </>
);

export default Routes;
