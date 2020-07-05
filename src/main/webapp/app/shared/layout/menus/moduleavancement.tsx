import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';


export const  AvancementMenu =  props => (
  
   <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.Avancement')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/projet">
      <Translate contentKey="global.menu.entities.projet" />
    </MenuItem>
   
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);





export default AvancementMenu;
