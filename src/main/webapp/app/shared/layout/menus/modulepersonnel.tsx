import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';



export const  ModulePersonnelMenu   = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.Personnel')} id="account-menu">
   {props.isResponsableEmp && <MenuItem icon="asterisk" to="/projet">
      <Translate contentKey="global.menu.entities.projet" />
    </MenuItem>}
     {props.isResponsableEmp && <MenuItem icon="asterisk" to="/equipe">
      <Translate contentKey="global.menu.entities.equipe" />
    </MenuItem>}
     {props.isResponsableEmp &&
    <MenuItem icon="asterisk" to="/paie">
      <Translate contentKey="global.menu.entities.paie" />
    </MenuItem>}
     {(props.isResponsableEmp  || props.isPointeur) &&
    <MenuItem icon="asterisk" to="/employe">
      <Translate contentKey="global.menu.entities.employe" />
    </MenuItem>}
     {props.isResponsableEmp &&
     <MenuItem icon="asterisk" to="/pointage">
      <Translate contentKey="global.menu.entities.pointage" />
    </MenuItem>}
  </NavDropdown>
);
export  default ModulePersonnelMenu;




