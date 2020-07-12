import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';




export const MaterielMenu = props => (
  
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.Materiel')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}  >
      
    <MenuItem icon="asterisk" to="/materiel">
      <Translate contentKey="global.menu.entities.materiel" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/assurance">
      <Translate contentKey="global.menu.entities.assurance" />
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
    <MenuItem icon="asterisk" to="/visite-technique">
      <Translate contentKey="global.menu.entities.visiteTechnique" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);

 
    