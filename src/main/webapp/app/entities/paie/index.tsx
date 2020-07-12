import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Paie from './paie';
import PaieDetail from './paie-detail';
import PaieUpdate from './paie-update';
import PaieDeleteDialog from './paie-delete-dialog';
import  Paiement  from './paiement-interface';
import { ACTION_TYPES, apiUrl } from './paie.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';


const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/paiement`} component={Paiement} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PaieDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaieUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/import`} component={() => <Import apiUrl={apiUrl} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/export`} component={() => <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaieUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PaieDetail} />
      <ErrorBoundaryRoute path={match.url} component={Paie} />
    
    </Switch>
  </>
);

export default Routes;
