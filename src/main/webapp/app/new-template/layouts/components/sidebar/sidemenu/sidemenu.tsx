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

class SideMenuContent extends Component<any, any> {
  render() {
    return (
      <SideMenu className="sidebar-content" toggleSidebarMenu={this.props.toggleSidebarMenu}>
        <SideMenu.MenuMultiItems
          name={translate('global.sidebar.dashboard')}
          Icon={<Home size={18} />}
          ArrowRight={<ChevronRight size={16} />}
          collapsedSidebar={this.props.collapsedSidebar}
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
        {/* <SideMenu.MenuSingleItem badgeColor="danger" badgeText="6">
          <NavLink to="/email" activeClassName="active">
            <i className="menu-icon">
              <Mail size={18} />
            </i>
            <span className="menu-item-text">Email</span>
          </NavLink>
        </SideMenu.MenuSingleItem> */}
        {/* <SideMenu.MenuSingleItem>
          <NavLink to="/chat" activeClassName="active">
            <i className="menu-icon">
              <MessageSquare size={18} />
            </i>
            <span className="menu-item-text">Chat</span>
          </NavLink>
        </SideMenu.MenuSingleItem> */}
        <SideMenu.MenuSingleItem>
          <NavLink to="/contacts" activeClassName="active">
            <i className="menu-icon">
              <Users size={18} />
            </i>
            <span className="menu-item-text">
              <Translate contentKey="global.sidebar.employees">Employés</Translate>
            </span>
          </NavLink>
        </SideMenu.MenuSingleItem>
        {/* <SideMenu.MenuSingleItem>
          <NavLink to="/todo" activeClassName="active">
            <i className="menu-icon">
              <CheckSquare size={18} />
            </i>
            <span className="menu-item-text">Todo</span>
          </NavLink>
        </SideMenu.MenuSingleItem> */}
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
          <NavLink to="/calendar" activeClassName="active">
            <i className="menu-icon">
              <Copy size={18} />
            </i>
            <span className="menu-item-text">
              <Translate contentKey="global.sidebar.projects">Projets</Translate>
            </span>
          </NavLink>
        </SideMenu.MenuSingleItem>

        {/* <SideMenu.MenuMultiItems
          name="Pages"
          Icon={<Copy size={18} />}
          ArrowRight={<ChevronRight size={16} />}
          collapsedSidebar={this.props.collapsedSidebar}
        >
          <NavLink to="/pages/user-profile" className="item" activeClassName="active">
            <span className="menu-item-text">User Profile</span>
          </NavLink>
          <NavLink to="/pages/horizontal-timeline" className="item" activeClassName="active">
            <span className="menu-item-text">Horizontal Timeline</span>
          </NavLink>
          <NavLink to="/pages/vertical-timeline" className="item" activeClassName="active">
            <span className="menu-item-text">Vertical Timeline</span>
          </NavLink>
          <NavLink to="/pages/faq" className="item" activeClassName="active">
            <span className="menu-item-text">FAQ</span>
          </NavLink>
          <NavLink to="/pages/knowledge-base" className="item" activeClassName="active">
            <span className="menu-item-text">Knowledge Base</span>
          </NavLink>
          <NavLink to="/pages/gallery" className="item" activeClassName="active">
            <span className="menu-item-text">Gallery</span>
          </NavLink>
          <NavLink to="/pages/search" className="item" activeClassName="active">
            <span className="menu-item-text">Search</span>
          </NavLink>
          <NavLink to="/pages/invoice" className="item" activeClassName="active">
            <span className="menu-item-text">Invoice</span>
          </NavLink>
          <NavLink to="/pages/blank-page" className="item" activeClassName="active">
            <span className="menu-item-text">Blank Page</span>
          </NavLink>
          <NavLink to="/pages/login" className="item" activeClassName="active">
            <span className="menu-item-text">Login</span>
          </NavLink>
          <NavLink to="/pages/register" className="item" activeClassName="active">
            <span className="menu-item-text">Register</span>
          </NavLink>
          <NavLink to="/pages/forgot-password" className="item" activeClassName="active">
            <span className="menu-item-text">Forgot Password</span>
          </NavLink>
          <NavLink to="/pages/lockscreen" className="item" activeClassName="active">
            <span className="menu-item-text">Lock Screen</span>
          </NavLink>
          <NavLink to="/pages/error" className="item" activeClassName="active">
            <span className="menu-item-text">Error</span>
          </NavLink>
          <NavLink to="/pages/maintenance" className="item" activeClassName="active">
            <span className="menu-item-text">Maintenance</span>
          </NavLink>
        </SideMenu.MenuMultiItems> */}
        {/* <SideMenu.MenuMultiItems
          name="Cards"
          badgeColor="success"
          badgeText="New"
          Icon={<Layers size={18} />}
          ArrowRight={<ChevronRight size={16} />}
          collapsedSidebar={this.props.collapsedSidebar}
        >
          <NavLink to="/cards/basic-card" className="item" activeClassName="active">
            <span className="menu-item-text">Basic Cards</span>
          </NavLink>
          <NavLink to="/cards/extended-card" className="item" activeClassName="active">
            <span className="menu-item-text">Extended Cards</span>
          </NavLink>
          <NavLink to="/cards/statistic-card" className="item" activeClassName="active">
            <span className="menu-item-text">Statistic Cards</span>
          </NavLink>
          <NavLink to="/cards/advanced-card" className="item" activeClassName="active">
            <span className="menu-item-text">Advanced Cards</span>
          </NavLink>
        </SideMenu.MenuMultiItems> */}
        {/* <SideMenu.MenuMultiItems
          name="UI Kit"
          Icon={<Aperture size={18} />}
          ArrowRight={<ChevronRight size={16} />}
          collapsedSidebar={this.props.collapsedSidebar}
        >
          <NavLink to="/uikit/grids" className="item" activeClassName="active">
            <span className="menu-item-text">Grid</span>
          </NavLink>
          <NavLink to="/uikit/typography" className="item" activeClassName="active">
            <span className="menu-item-text">Typography</span>
          </NavLink>
          <NavLink to="/uikit/syntaxhighlighter" className="item" activeClassName="active">
            <span className="menu-item-text">Syntax HighLighter</span>
          </NavLink>
          <NavLink to="/uikit/textutilities" className="item" activeClassName="active">
            <span className="menu-item-text">Text Utility</span>
          </NavLink>
          <NavLink to="/colorpalettes" className="item" activeClassName="active">
            <span className="menu-item-text">Color Pallete</span>
          </NavLink>
          <NavLink to="/uikit/feather" className="item" activeClassName="active">
            <span className="menu-item-text">Icons</span>
          </NavLink>
        </SideMenu.MenuMultiItems> */}

        {/* <SideMenu.MenuMultiItems
          name="Components"
          badgeColor="warning"
          badgeText="22"
          Icon={<Box size={18} />}
          ArrowRight={<ChevronRight size={16} />}
          collapsedSidebar={this.props.collapsedSidebar}
        >
          <SideMenu toggleSidebarMenu={this.props.toggleSidebarMenu}>
            <SideMenu.MenuMultiItems
              name="Bootstrap"
              ArrowRight={<ChevronRight size={16} />}
              collapsedSidebar={this.props.collapsedSidebar}
            >
              <NavLink to="/components/bootstrap/lists" className="item" activeClassName="active">
                <span className="menu-item-text">Lists</span>
              </NavLink>
              <NavLink to="/components/bootstrap/buttons" className="item" activeClassName="active">
                <span className="menu-item-text">Buttons</span>
              </NavLink>
              <NavLink to="/components/bootstrap/breadcrumbs" className="item" activeClassName="active">
                <span className="menu-item-text">Breadcrumbs</span>
              </NavLink>
              <NavLink to="/components/bootstrap/alerts" className="item" activeClassName="active">
                <span className="menu-item-text">Alerts</span>
              </NavLink>
              <NavLink to="/components/bootstrap/badges" className="item" activeClassName="active">
                <span className="menu-item-text">Badges</span>
              </NavLink>
              <NavLink to="/components/bootstrap/dropdowns" className="item" activeClassName="active">
                <span className="menu-item-text">Dropdowns</span>
              </NavLink>
              <NavLink to="/components/bootstrap/input-groups" className="item" activeClassName="active">
                <span className="menu-item-text">Input Groups</span>
              </NavLink>
              <NavLink to="/components/bootstrap/tabs" className="item" activeClassName="active">
                <span className="menu-item-text">Tabs</span>
              </NavLink>
              <NavLink to="/components/bootstrap/media-objects" className="item" activeClassName="active">
                <span className="menu-item-text">Media Objects</span>
              </NavLink>
              <NavLink to="/components/bootstrap/pagination" className="item" activeClassName="active">
                <span className="menu-item-text">Pagination</span>
              </NavLink>
              <NavLink to="/components/bootstrap/progress-bars" className="item" activeClassName="active">
                <span className="menu-item-text">Progress Bars</span>
              </NavLink>
              <NavLink to="/components/bootstrap/modals" className="item" activeClassName="active">
                <span className="menu-item-text">Modals</span>
              </NavLink>
              <NavLink to="/components/bootstrap/collapse" className="item" activeClassName="active">
                <span className="menu-item-text">Collapse</span>
              </NavLink>
              <NavLink to="/components/bootstrap/tooltips" className="item" activeClassName="active">
                <span className="menu-item-text">Tooltips</span>
              </NavLink>
              <NavLink to="/components/bootstrap/popover" className="item" activeClassName="active">
                <span className="menu-item-text">Popover</span>
              </NavLink>
            </SideMenu.MenuMultiItems>
            <SideMenu.MenuMultiItems name="Extra" ArrowRight={<ChevronRight size={16} />} collapsedSidebar={this.props.collapsedSidebar}>
              <NavLink to="/components/extra/select" className="item" activeClassName="active">
                <span className="menu-item-text">Select</span>
              </NavLink>
              <NavLink to="/components/extra/slider" className="item" activeClassName="active">
                <span className="menu-item-text">Range Slider</span>
              </NavLink>
              <NavLink to="/components/extra/upload" className="item" activeClassName="active">
                <span className="menu-item-text">Upload</span>
              </NavLink>
              <NavLink to="/components/extra/editor" className="item" activeClassName="active">
                <span className="menu-item-text">Editor</span>
              </NavLink>
              <NavLink to="/components/extra/drag-and-drop" className="item" activeClassName="active">
                <span className="menu-item-text">Drag and Drop</span>
              </NavLink>
              <NavLink to="/components/extra/input-tags" className="item" activeClassName="active">
                <span className="menu-item-text">Input Tags</span>
              </NavLink>
              <NavLink to="/components/extra/switches" className="item" activeClassName="active">
                <span className="menu-item-text">Switches</span>
              </NavLink>
              <NavLink to="/components/extra/toastr" className="item" activeClassName="active">
                <span className="menu-item-text">Toastr</span>
              </NavLink>
            </SideMenu.MenuMultiItems>
          </SideMenu>
        </SideMenu.MenuMultiItems> */}

        {/* <SideMenu.MenuMultiItems
          name="Forms"
          Icon={<Edit size={18} />}
          ArrowRight={<ChevronRight size={16} />}
          collapsedSidebar={this.props.collapsedSidebar}
        >
          <SideMenu toggleSidebarMenu={this.props.toggleSidebarMenu}>
            <SideMenu.MenuMultiItems name="Elements" ArrowRight={<ChevronRight size={16} />} collapsedSidebar={this.props.collapsedSidebar}>
              <NavLink to="/forms/elements/inputs" className="item" activeClassName="active">
                <span className="menu-item-text">Inputs</span>
              </NavLink>
              <NavLink to="/forms/elements/input-grids" className="item" activeClassName="active">
                <span className="menu-item-text">Input Grids</span>
              </NavLink>
            </SideMenu.MenuMultiItems>
            <SideMenu.MenuMultiItems name="Layouts" ArrowRight={<ChevronRight size={16} />} collapsedSidebar={this.props.collapsedSidebar}>
              <NavLink to="/forms/layouts/basic-forms" className="item" activeClassName="active">
                <span className="menu-item-text">Basic Form</span>
              </NavLink>
              <NavLink to="/forms/layouts/horizontal-forms" className="item" activeClassName="active">
                <span className="menu-item-text">Horizontal Forms</span>
              </NavLink>
              <NavLink to="/forms/layouts/hidden-labels" className="item" activeClassName="active">
                <span className="menu-item-text">Hidden Labels</span>
              </NavLink>
              <NavLink to="/forms/layouts/form-actions" className="item" activeClassName="active">
                <span className="menu-item-text">Form Actions</span>
              </NavLink>
              <NavLink to="/forms/layouts/bordered-forms" className="item" activeClassName="active">
                <span className="menu-item-text">Borderd Form</span>
              </NavLink>
              <NavLink to="/forms/layouts/striped-rows" className="item" activeClassName="active">
                <span className="menu-item-text">Striped Rows</span>
              </NavLink>
            </SideMenu.MenuMultiItems>
          </SideMenu>
          <NavLink to="/forms/validation" className="item" activeClassName="active">
            <span className="menu-item-text">Validation</span>
          </NavLink>
          <NavLink to="/forms/wizard" className="item" activeClassName="active">
            <span className="menu-item-text">Wizard</span>
          </NavLink>
        </SideMenu.MenuMultiItems> */}

        {/* <SideMenu.MenuMultiItems
          name="Tables"
          Icon={<Grid size={18} />}
          ArrowRight={<ChevronRight size={16} />}
          collapsedSidebar={this.props.collapsedSidebar}
        >
          <NavLink to="/tables/regular" className="item" activeClassName="active">
            <span className="menu-item-text">Regular</span>
          </NavLink>
          <NavLink to="/tables/extended" className="item" activeClassName="active">
            <span className="menu-item-text">Extended</span>
          </NavLink>
        </SideMenu.MenuMultiItems> */}

        <SideMenu.MenuMultiItems
          // name="Modules"
          name={translate('global.sidebar.modules')}
          Icon={<Grid size={18} />}
          ArrowRight={<ChevronRight size={16} />}
          collapsedSidebar={this.props.collapsedSidebar}
        >
          <SideMenu toggleSidebarMenu={this.props.toggleSidebarMenu}>
            <SideMenu.MenuMultiItems
              name={translate('global.sidebar.settings')}
              ArrowRight={<ChevronRight size={16} />}
              collapsedSidebar={this.props.collapsedSidebar}
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
            </SideMenu.MenuMultiItems>
            <SideMenu.MenuMultiItems name="Matériel" ArrowRight={<ChevronRight size={16} />} collapsedSidebar={this.props.collapsedSidebar}>
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
            </SideMenu.MenuMultiItems>
            <SideMenu.MenuMultiItems name="Employé" ArrowRight={<ChevronRight size={16} />} collapsedSidebar={this.props.collapsedSidebar}>
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
              <NavLink to="/react-tables/regular" className="item" activeClassName="active">
                <span className="menu-item-text">Avancement technique</span>
              </NavLink>
            </SideMenu.MenuSingleItem>
            <SideMenu.MenuSingleItem>
              <NavLink to="/react-tables/regular" className="item" activeClassName="active">
                <span className="menu-item-text">Situation financière</span>
              </NavLink>
            </SideMenu.MenuSingleItem>
          </SideMenu>
        </SideMenu.MenuMultiItems>

        {this.props.isAdmin && (
          <SideMenu.MenuMultiItems
            name={translate('global.menu.admin.main')}
            Icon={<Sliders size={18} />}
            ArrowRight={<ChevronRight size={16} />}
            collapsedSidebar={this.props.collapsedSidebar}
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
        {/* <SideMenu.MenuSingleItem>
          <a href="https://pixinvent.ticksy.com" target="_blank" rel="noopener noreferrer" activeclassname="active">
            <i className="menu-icon">
              <LifeBuoy size={18} />
            </i>
            <span className="menu-item-text">Support</span>
          </a>
        </SideMenu.MenuSingleItem> */}
      </SideMenu>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});
// const mapDispatchToProps = { setLocale };
// type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, null)(SideMenuContent);
