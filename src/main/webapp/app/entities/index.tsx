import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Materiau from './materiau';
import Tva from './tva';
import Marque from './marque';
import Unite from './unite';
import Famille from './famille';
import Image from './image';
import Entreprise from './entreprise';
import LigneBonCommande from './ligne-bon-commande';
import LigneBonReception from './ligne-bon-reception';
import BonCommande from './bon-commande';
import BonReception from './bon-reception';
import Fournisseur from './fournisseur';
import Depot from './depot';
import Projet from './projet';
import Equipe from './equipe';
import Fonction from './fonction';
import Pointage from './pointage';
import Paie from './paie';
import Horaire from './horaire';
import Employe from './employe';
import Materiel from './materiel';
import Assurance from './assurance';
import TypeMateriel from './type-materiel';
import Document from './document';
import Location from './location';
import TransfertMateriel from './transfert-materiel';
import Consommation from './consommation';
import Maintenance from './maintenance';
import CentreMaintenance from './centre-maintenance';
import VisiteTechnique from './visite-technique';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}materiau`} component={Materiau} />
      <ErrorBoundaryRoute path={`${match.url}tva`} component={Tva} />
      <ErrorBoundaryRoute path={`${match.url}marque`} component={Marque} />
      <ErrorBoundaryRoute path={`${match.url}unite`} component={Unite} />
      <ErrorBoundaryRoute path={`${match.url}famille`} component={Famille} />
      <ErrorBoundaryRoute path={`${match.url}image`} component={Image} />
      <ErrorBoundaryRoute path={`${match.url}entreprise`} component={Entreprise} />
      <ErrorBoundaryRoute path={`${match.url}ligne-bon-commande`} component={LigneBonCommande} />
      <ErrorBoundaryRoute path={`${match.url}ligne-bon-reception`} component={LigneBonReception} />
      <ErrorBoundaryRoute path={`${match.url}bon-commande`} component={BonCommande} />
      <ErrorBoundaryRoute path={`${match.url}bon-reception`} component={BonReception} />
      <ErrorBoundaryRoute path={`${match.url}fournisseur`} component={Fournisseur} />
      <ErrorBoundaryRoute path={`${match.url}depot`} component={Depot} />
      <ErrorBoundaryRoute path={`${match.url}projet`} component={Projet} />
      <ErrorBoundaryRoute path={`${match.url}equipe`} component={Equipe} />
      <ErrorBoundaryRoute path={`${match.url}fonction`} component={Fonction} />
      <ErrorBoundaryRoute path={`${match.url}pointage`} component={Pointage} />
      <ErrorBoundaryRoute path={`${match.url}paie`} component={Paie} />
      <ErrorBoundaryRoute path={`${match.url}horaire`} component={Horaire} />
      <ErrorBoundaryRoute path={`${match.url}employe`} component={Employe} />
      <ErrorBoundaryRoute path={`${match.url}materiel`} component={Materiel} />
      <ErrorBoundaryRoute path={`${match.url}assurance`} component={Assurance} />
      <ErrorBoundaryRoute path={`${match.url}type-materiel`} component={TypeMateriel} />
      <ErrorBoundaryRoute path={`${match.url}document`} component={Document} />
      <ErrorBoundaryRoute path={`${match.url}location`} component={Location} />
      <ErrorBoundaryRoute path={`${match.url}transfert-materiel`} component={TransfertMateriel} />
      <ErrorBoundaryRoute path={`${match.url}consommation`} component={Consommation} />
      <ErrorBoundaryRoute path={`${match.url}maintenance`} component={Maintenance} />
      <ErrorBoundaryRoute path={`${match.url}centre-maintenance`} component={CentreMaintenance} />
      <ErrorBoundaryRoute path={`${match.url}visite-technique`} component={VisiteTechnique} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
