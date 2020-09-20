import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/materiau">
      <Translate contentKey="global.menu.entities.materiau" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tva">
      <Translate contentKey="global.menu.entities.tva" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/marque">
      <Translate contentKey="global.menu.entities.marque" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/unite">
      <Translate contentKey="global.menu.entities.unite" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/famille">
      <Translate contentKey="global.menu.entities.famille" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/image">
      <Translate contentKey="global.menu.entities.image" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entreprise">
      <Translate contentKey="global.menu.entities.entreprise" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ligne-bon-commande">
      <Translate contentKey="global.menu.entities.ligneBonCommande" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ligne-bon-reception">
      <Translate contentKey="global.menu.entities.ligneBonReception" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/bon-commande">
      <Translate contentKey="global.menu.entities.bonCommande" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/bon-reception">
      <Translate contentKey="global.menu.entities.bonReception" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/fournisseur">
      <Translate contentKey="global.menu.entities.fournisseur" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/depot">
      <Translate contentKey="global.menu.entities.depot" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/projet">
      <Translate contentKey="global.menu.entities.projet" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/equipe">
      <Translate contentKey="global.menu.entities.equipe" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/fonction">
      <Translate contentKey="global.menu.entities.fonction" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pointage">
      <Translate contentKey="global.menu.entities.pointage" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paie">
      <Translate contentKey="global.menu.entities.paie" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/horaire">
      <Translate contentKey="global.menu.entities.horaire" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/employe">
      <Translate contentKey="global.menu.entities.employe" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/materiel">
      <Translate contentKey="global.menu.entities.materiel" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/assurance">
      <Translate contentKey="global.menu.entities.assurance" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/type-materiel">
      <Translate contentKey="global.menu.entities.typeMateriel" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/document">
      <Translate contentKey="global.menu.entities.document" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/location">
      <Translate contentKey="global.menu.entities.location" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/transfert-materiel">
      <Translate contentKey="global.menu.entities.transfertMateriel" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/consommation">
      <Translate contentKey="global.menu.entities.consommation" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/maintenance">
      <Translate contentKey="global.menu.entities.maintenance" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/centre-maintenance">
      <Translate contentKey="global.menu.entities.centreMaintenance" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/visite-technique">
      <Translate contentKey="global.menu.entities.visiteTechnique" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/notification">
      <Translate contentKey="global.menu.entities.notification" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/fiche-pointage">
      <Translate contentKey="global.menu.entities.fichePointage" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/affectation-materiels">
      <Translate contentKey="global.menu.entities.affectationMateriels" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
