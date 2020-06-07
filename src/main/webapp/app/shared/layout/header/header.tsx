import { ThemeChooser } from '../../../../content/react-bootstrap-theme-switcher';
import './header.scss';

import React, { useState, useEffect } from 'react';
import { Translate, Storage, translate } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { isRTL } from 'app/config/translation';

import { Home, Brand } from './header-components';
import {
  AdminMenu,
  EntitiesMenu,
  MaterielMenu,
  ModulePersonnelMenu,
  MateriauMenu,
  AvancementMenu,
  ParametrageMenu,
  AccountMenu,
  LocaleMenu
} from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isChefMateriel: boolean;
  isChefMateriau: boolean;
  isMagasinier: boolean;
  isResponsableEmp: boolean;
  isPointeur: boolean;
  isResponsableProjet: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => document.querySelector('html').setAttribute('dir', isRTL(Storage.session.get('locale')) ? 'rtl' : 'ltr'));

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    props.onLocaleChange(langKey);
    document.querySelector('html').setAttribute('dir', isRTL(langKey) ? 'rtl' : 'ltr');
  };

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar" />
      <Navbar dark expand="sm" fixed="top" className="jh-navbar bg-primary">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ml-auto" navbar>
            <Home />
            {props.isAuthenticated && props.isChefMateriel && <MaterielMenu />}
            {props.isAuthenticated && (props.isChefMateriau || props.isMagasinier || props.isUser || props.isAdmin) && (
              <MateriauMenu
                isChefMateriau={props.isChefMateriau}
                isMagasinier={props.isMagasinier}
                isAdmin={props.isAdmin}
                is
                User={props.isUser}
              />
            )}
            {props.isAuthenticated && (props.isResponsableEmp || props.isPointeur) && (
              <ModulePersonnelMenu isResponsableEmp={props.isResponsableEmp} isPointeur={props.isPointeur} />
            )}
            {props.isAuthenticated && props.isResponsableProjet && <AvancementMenu />}
            {props.isAuthenticated &&
              (props.isChefMateriel ||
                props.isMagasinier ||
                props.isResponsableEmp ||
                props.isResponsableProjet ||
                props.isChefMateriau) && (
                <ParametrageMenu
                  isResponsableEmp={props.isResponsableEmp}
                  isMagasinier={props.isMagasinier}
                  isChefMateriel={props.isChefMateriel}
                  isChefMateriau={props.isChefMateriau}
                  isResponsableProjet={props.isResponsableProjet}
                />
              )}
            {/* {props.isAuthenticated && <EntitiesMenu />} */}
            {props.isAuthenticated && props.isAdmin && (
              <AdminMenu showSwagger={props.isSwaggerEnabled} showDatabase={!props.isInProduction} />
            )}
            <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Collapse>
        <ThemeChooser text={translate('global.themeChooser')} />
      </Navbar>
    </div>
  );
};

export default Header;
