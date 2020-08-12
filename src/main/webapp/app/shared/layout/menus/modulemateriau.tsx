import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';



export const MateriauMenu = props => (
  <NavDropdown
    icon="th-list"
     name={translate('global.menu.entities.Materiau')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}>

     {( props.isChefMateriau || props.isMagasinier) &&   <MenuItem icon="asterisk" to="/materiau">
      <Translate contentKey="global.menu.entities.materiau" />
      </MenuItem>
      }
   
   { props.isMagasinier  &&
    <MenuItem icon="asterisk" to="/depot">
      <Translate contentKey="global.menu.entities.depot" />
    </MenuItem>}
    { props.isMagasinier  &&
    <MenuItem icon="asterisk" to="/projet">
      <Translate contentKey="global.menu.entities.projet" />
    </MenuItem>}
    { props.isMagasinier  &&
    <MenuItem icon="asterisk" to="/ligne-bon-com">
      <Translate contentKey="global.menu.entities.ligneBonCommande" />
    </MenuItem>}
    { props.isMagasinier  &&
    <MenuItem icon="asterisk" to="/ligne-bon-rec">
      <Translate contentKey="global.menu.entities.ligneBonReception" />
    </MenuItem>}
    { props.isMagasinier  &&
    <MenuItem icon="asterisk" to="/bon-commande">
      <Translate contentKey="global.menu.entities.bonCommande" />
    </MenuItem>}
    { props.isMagasinier  &&
    <MenuItem icon="asterisk" to="/bon-reception">
      <Translate contentKey="global.menu.entities.bonReception" />
    </MenuItem>}
    {props.isAdmin &&  <MenuItem icon="asterisk" to="/entreprise">
      <Translate contentKey="global.menu.entities.entreprise" />
    </MenuItem>}
    {(props.isAdmin || props.isUser) && <MenuItem icon="asterisk" to="/image">
      <Translate contentKey="global.menu.entities.image" />
    </MenuItem>}
    {(props.isAdmin || props.isUser) &&  <MenuItem icon="asterisk" to="/document">
      <Translate contentKey="global.menu.entities.document" />
    </MenuItem>}
    </NavDropdown>
);

 
    