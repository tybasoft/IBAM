import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';


export const ParametrageMenu  = props => (
   <NavDropdown icon="th-list" name={translate('global.menu.entities.Parametrage')}>

    {props.isChefMateriel && <MenuItem icon="asterisk" to="/type-materiel">
      <Translate contentKey="global.menu.entities.typeMateriel" />
    </MenuItem>}
    {(props.isChefMateriel || props.isChefMateriau || props.isMagasinier) && <MenuItem icon="asterisk" to="/marque">
      <Translate contentKey="global.menu.entities.marque" />
    </MenuItem>}
    {(props.isChefMateriel || props.isChefMateriau || props.isMagasinier) &&
     <MenuItem icon="asterisk" to="/famille">
      <Translate contentKey="global.menu.entities.famille" />
    </MenuItem>}
    {(props.isChefMateriel ||props.isChefMateriau || props.isMagasinier) &&
    <MenuItem icon="asterisk" to="/fournisseur">
      <Translate contentKey="global.menu.entities.fournisseur" />
    </MenuItem>}
    {props.isChefMateriel &&
    <MenuItem icon="asterisk" to="/centre-maintenance">
      <Translate contentKey="global.menu.entities.centreMaintenance" />
    </MenuItem>}
   {(props.isChefMateriau|| props.isMagasinier) &&
     <MenuItem icon="asterisk" to="/tva" >
      <Translate  contentKey="global.menu.entities.tva" />
    </MenuItem>}
    {(props.isChefMateriau || props.isMagasinier) &&
    <MenuItem icon="asterisk" to="/unite">
      <Translate contentKey="global.menu.entities.unite" />
    </MenuItem>}
    {props.isResponsableEmp &&
     <MenuItem icon="asterisk" to="/fonction">
      <Translate contentKey="global.menu.entities.fonction" />
    </MenuItem> }
    {(props.isResponsableEmp || props.isResponsableProjet) &&
    <MenuItem icon="asterisk" to="/horaire">
      <Translate contentKey="global.menu.entities.horaire" />
    </MenuItem>}
    </NavDropdown>
    );

 export default ParametrageMenu;   