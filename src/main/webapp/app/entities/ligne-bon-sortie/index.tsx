import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LigneBonSortie from './ligne-bon-sortie';
import LigneBonSortieDetail from './ligne-bon-sortie-detail';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LigneBonSortieDetail} />
      <ErrorBoundaryRoute path={match.url} component={LigneBonSortie} />
    </Switch>
  </>
);

export default Routes;
