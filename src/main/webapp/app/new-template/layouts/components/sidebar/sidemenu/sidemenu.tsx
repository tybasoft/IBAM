// import external modules
import React, { Component } from 'react';

import {
  Home,
  Mail,
  MessageSquare,
  ChevronRight,
  Aperture,
  Box,
  Edit,
  Grid,
  Layers,
  Sliders,
  Map,
  BarChart2,
  Calendar,
  Copy,
  Book,
  CheckSquare,
  LifeBuoy,
  Users
} from 'react-feather';
import { NavLink } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';

// Styling
import '../../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss';
// import internal(own) modules
import SideMenu from '../sidemenuHelper';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

const SideMenuContent = props => {
  return (
    <SideMenu className="sidebar-content" toggleSidebarMenu={props.toggleSidebarMenu}>
      <SideMenu.MenuMultiItems
        name={translate('global.sidebar.dashboard')}
        Icon={<Home size={18} />}
        ArrowRight={<ChevronRight size={16} />}
        collapsedSidebar={props.collapsedSidebar}
      >
        <NavLink to="/" exact className="item" activeClassName="active">
          <span className="menu-item-text">eCommerce</span>
        </NavLink>
        <NavLink to="/analytics-dashboard" exact className="item" activeClassName="active">
          <span className="menu-item-text">Analytics</span>
        </NavLink>
        <NavLink to="/sales-dashboard" exact className="item" activeClassName="active">
          <span className="menu-item-text">Sales</span>
        </NavLink>
      </SideMenu.MenuMultiItems>

      <SideMenu.MenuMultiItems
        name={translate('global.sidebar.employees')}
        ArrowRight={<ChevronRight size={16} />}
        collapsedSidebar={props.collapsedSidebar}
        Icon={<Users size={18} />}
      >
        <NavLink to="/employes" activeClassName="active">
          {/* <i className="menu-icon">
            <Users size={18} />
          </i> */}
          <span className="menu-item-text">
            Fiche employés
            {/* <Translate contentKey="global.sidebar.employees">Employés</Translate> */}
          </span>
        </NavLink>
        <NavLink to="/equipe" className="item" activeClassName="active">
          <span className="menu-item-text">Équipe</span>
        </NavLink>
        <NavLink to="/fiche-pointage" className="item" activeClassName="active">
          <span className="menu-item-text">Fiche pointage</span>
        </NavLink>
        <NavLink to="/react-tables/extended" className="item" activeClassName="active">
          <span className="menu-item-text">Paie</span>
        </NavLink>
        <NavLink to="/react-tables/extended" className="item" activeClassName="active">
          <span className="menu-item-text">Pointage</span>
        </NavLink>
      </SideMenu.MenuMultiItems>

      <SideMenu.MenuSingleItem>
        <NavLink to="/calendar" activeClassName="active">
          <i className="menu-icon">
            <Calendar size={18} />
          </i>

          <span className="menu-item-text">
            <Translate contentKey="global.sidebar.calendar">Calendrier</Translate>
          </span>
        </NavLink>
      </SideMenu.MenuSingleItem>
      <SideMenu.MenuSingleItem>
        <NavLink to="/projet" activeClassName="active">
          <i className="menu-icon">
            <Copy size={18} />
          </i>
          <span className="menu-item-text">
            <Translate contentKey="global.sidebar.projects">Projets</Translate>
          </span>
        </NavLink>
      </SideMenu.MenuSingleItem>
      <SideMenu.MenuMultiItems
        name={translate('global.sidebar.settings')}
        ArrowRight={<ChevronRight size={16} />}
        collapsedSidebar={props.collapsedSidebar}
      >
        <NavLink to="/entreprise" className="item" activeClassName="active">
          <span className="menu-item-text">Entreprise</span>
        </NavLink>
        <NavLink to="/fonction" className="item" activeClassName="active">
          <span className="menu-item-text">Fonction</span>
        </NavLink>
        <NavLink to="/horaire" className="item" activeClassName="active">
          <span className="menu-item-text">Horaire</span>
        </NavLink>
        <NavLink to="/marque" className="item" activeClassName="active">
          <span className="menu-item-text">Marque</span>
        </NavLink>
        <NavLink to="/type-materiel" className="item" activeClassName="active">
          <span className="menu-item-text">Type de materiel</span>
        </NavLink>
      </SideMenu.MenuMultiItems>
      <SideMenu.MenuMultiItems name="Matériel" ArrowRight={<ChevronRight size={16} />} collapsedSidebar={props.collapsedSidebar}>
        <NavLink to="/contacts" activeClassName="active">
          <span className="menu-item-text">Fiche Matériel</span>
        </NavLink>
        <NavLink to="/assurance" className="item" activeClassName="active">
          <span className="menu-item-text">Assurance</span>
        </NavLink>
        <NavLink to="/centre-maintenance" className="item" activeClassName="active">
          <span className="menu-item-text">Centre maintenance</span>
        </NavLink>
        <NavLink to="/consommation" className="item" activeClassName="active">
          <span className="menu-item-text">Consommation</span>
        </NavLink>
        <NavLink to="/location" className="item" activeClassName="active">
          <span className="menu-item-text">Location</span>
        </NavLink>
        <NavLink to="/visite-technique" className="item" activeClassName="active">
          <span className="menu-item-text">Visite technique</span>
        </NavLink>
        <NavLink to="/transfert-materiel" className="item" activeClassName="active">
          <span className="menu-item-text">Transfert materiel</span>
        </NavLink>
        <NavLink to="/affectation-materiels" className="item" activeClassName="active">
          <span className="menu-item-text">Affectation materiel</span>
        </NavLink>
      </SideMenu.MenuMultiItems>
      <SideMenu.MenuMultiItems name="Matériau" ArrowRight={<ChevronRight size={16} />} collapsedSidebar={props.collapsedSidebar}>
        <NavLink to="/materiau" activeClassName="active">
          <span className="menu-item-text">Fiche matériau</span>
        </NavLink>
        <NavLink to="/fournisseur" className="item" activeClassName="active">
          <span className="menu-item-text">Fournisseur</span>
        </NavLink>
        <NavLink to="/centre-maintenance" className="item" activeClassName="active">
          <span className="menu-item-text">Centre maintenance</span>
        </NavLink>
        <NavLink to="/depot" className="item" activeClassName="active">
          <span className="menu-item-text">Dépôt</span>
        </NavLink>
      </SideMenu.MenuMultiItems>
      <SideMenu.MenuMultiItems name="Bons" ArrowRight={<ChevronRight size={16} />} collapsedSidebar={props.collapsedSidebar}>
        <NavLink to="/bon-commande" activeClassName="active">
          <span className="menu-item-text">Bon de commande</span>
        </NavLink>
        <NavLink to="/bon-sortie" className="item" activeClassName="active">
          <span className="menu-item-text">Bon de sortie</span>
        </NavLink>
        <NavLink to="/bon-de-reception" className="item" activeClassName="active">
          <span className="menu-item-text">Bon de reception</span>
        </NavLink>
        <NavLink to="/gestion-financiere" className="item" activeClassName="active">
          <span className="menu-item-text">Gestion financiere</span>
        </NavLink>
        <NavLink to="/fiche-paix" className="item" activeClassName="active">
          <span className="menu-item-text">Fiche de paix</span>
        </NavLink>
      </SideMenu.MenuMultiItems>
      {/* <SideMenu.MenuMultiItems name="Employé" ArrowRight={<ChevronRight size={16} />} collapsedSidebar={props.collapsedSidebar}>
     
      </SideMenu.MenuMultiItems> */}
      <SideMenu.MenuSingleItem>
        <NavLink to="/react-tables/regular" className="item" activeClassName="active">
          <span className="menu-item-text">Avancement des travaux</span>
        </NavLink>
      </SideMenu.MenuSingleItem>
      <SideMenu.MenuSingleItem>
        <NavLink to="/react-tables/regular" className="item" activeClassName="active">
          <span className="menu-item-text">Reglements</span>
        </NavLink>
      </SideMenu.MenuSingleItem>

      {/* <SideMenu.MenuMultiItems
        // name="Modules"
        name={translate('global.sidebar.modules')}
        Icon={<Grid size={18} />}
        ArrowRight={<ChevronRight size={16} />}
        collapsedSidebar={props.collapsedSidebar}
      >
        <SideMenu toggleSidebarMenu={props.toggleSidebarMenu}></SideMenu>
      </SideMenu.MenuMultiItems> */}

      {props.isAdmin && (
        <SideMenu.MenuMultiItems
          name={translate('global.menu.admin.main')}
          Icon={<Sliders size={18} />}
          ArrowRight={<ChevronRight size={16} />}
          collapsedSidebar={props.collapsedSidebar}
        >
          <NavLink to="/admin/user-management" activeClassName="active">
            <span className="menu-item-text">
              <Translate contentKey="global.menu.admin.userManagement">Outils administratifs</Translate>
            </span>
          </NavLink>
          <NavLink to="/admin/metrics" activeClassName="active">
            <span className="menu-item-text">
              <Translate contentKey="global.menu.admin.metrics">Outils administratifs</Translate>
            </span>
          </NavLink>
          <NavLink to="/admin/health" activeClassName="active">
            <span className="menu-item-text">
              <Translate contentKey="global.menu.admin.health">Outils administratifs</Translate>
            </span>
          </NavLink>
          <NavLink to="/admin/configuration" activeClassName="active">
            <span className="menu-item-text">
              <Translate contentKey="global.menu.admin.configuration">Outils administratifs</Translate>
            </span>
          </NavLink>
          <NavLink to="/admin/audits" activeClassName="active">
            <span className="menu-item-text">
              <Translate contentKey="global.menu.admin.audits">Outils administratifs</Translate>
            </span>
          </NavLink>
          <NavLink to="/admin/logs" activeClassName="active">
            <span className="menu-item-text">
              <Translate contentKey="global.menu.admin.logs">Outils administratifs</Translate>
            </span>
          </NavLink>
        </SideMenu.MenuMultiItems>
      )}
      <SideMenu.MenuSingleItem>
        <NavLink to="/pages/documentation" activeClassName="active">
          <i className="menu-icon">
            <Book size={18} />
          </i>
          <span className="menu-item-text">
            <Translate contentKey="global.sidebar.documentation">Documentaion</Translate>
          </span>
        </NavLink>
      </SideMenu.MenuSingleItem>
    </SideMenu>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
  // toggleSidebarMenu: null
});

export default connect<any, any, any>(mapStateToProps, null)(SideMenuContent);
