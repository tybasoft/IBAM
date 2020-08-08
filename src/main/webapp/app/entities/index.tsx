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
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import Notification from './notification';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <PrivateRoute path={`${match.url}materiau`} component={Materiau} hasAnyAuthorities={[AUTHORITIES.CHEFMATERIAU,AUTHORITIES.MAGASINIER,AUTHORITIES.ADMIN,AUTHORITIES.USER]} />
      <PrivateRoute
        path={`${match.url}unite`}
        component={Unite}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIAU, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}materiau`}
        component={Materiau}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIAU, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}tva`}
        component={Tva}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIAU, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}unite`}
        component={Unite}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIAU, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}depot`}
        component={Depot}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIAU, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}famille`}
        component={Famille}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIEL, AUTHORITIES.CHEFMATERIAU, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute path={`${match.url}entreprise`} component={Entreprise} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />

      <PrivateRoute
        path={`${match.url}bon-commande`}
        component={BonCommande}
        hasAnyAuthorities={[AUTHORITIES.MAGASINIER, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}bon-reception`}
        component={BonReception}
        hasAnyAuthorities={[AUTHORITIES.MAGASINIER, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}ligne-bon-com`}
        component={LigneBonCommande}
        hasAnyAuthorities={[AUTHORITIES.MAGASINIER, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}ligne-bon-rec`}
        component={LigneBonReception}
        hasAnyAuthorities={[AUTHORITIES.MAGASINIER, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />

      <PrivateRoute
        path={`${match.url}horaire`}
        component={Horaire}
        hasAnyAuthorities={[AUTHORITIES.RESPONSABLEME, AUTHORITIES.RESPONSABLEPROJET, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}projet`}
        component={Projet}
        hasAnyAuthorities={[AUTHORITIES.RESPONSABLEME, AUTHORITIES.RESPONSABLEPROJET, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />

      <PrivateRoute
        path={`${match.url}equipe`}
        component={Equipe}
        hasAnyAuthorities={[AUTHORITIES.RESPONSABLEME, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}paie`}
        component={Paie}
        hasAnyAuthorities={[AUTHORITIES.RESPONSABLEME, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}fonction`}
        component={Fonction}
        hasAnyAuthorities={[AUTHORITIES.RESPONSABLEME, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}employe`}
        component={Employe}
        hasAnyAuthorities={[AUTHORITIES.RESPONSABLEME, AUTHORITIES.POINTEUR, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}pointage`}
        component={Pointage}
        hasAnyAuthorities={[AUTHORITIES.POINTEUR, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />

      <PrivateRoute path={`${match.url}image`} component={Image} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <PrivateRoute
        path={`${match.url}marque`}
        component={Marque}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIAU, AUTHORITIES.CHEFMATERIEL, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}fournisseur`}
        component={Fournisseur}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIAU, AUTHORITIES.CHEFMATERIEL, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute path={`${match.url}document`} component={Document} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <PrivateRoute
        path={`${match.url}materiel`}
        component={Materiel}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIEL, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}assurance`}
        component={Assurance}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIEL, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}type-materiel`}
        component={TypeMateriel}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIEL, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}location`}
        component={Location}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIEL, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}transfert-materiel`}
        component={TransfertMateriel}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIEL, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}consommation`}
        component={Consommation}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIEL, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}maintenance`}
        component={Maintenance}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIEL, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}centre-maintenance`}
        component={CentreMaintenance}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIEL, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}visite-technique`}
        component={VisiteTechnique}
        hasAnyAuthorities={[AUTHORITIES.CHEFMATERIEL, AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <ErrorBoundaryRoute path={`${match.url}notification`} component={Notification} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
