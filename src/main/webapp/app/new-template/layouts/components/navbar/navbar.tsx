// import external modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LocaleMenu } from './locale';
import { Translate, Storage, translate } from 'react-jhipster';
// import { isRTL } from 'app/config/translation';
import { setLocale } from '../../../../shared/reducers/locale';
import { locales, languages } from 'app/config/translation';
import { getEntities } from '../../../../entities/notification/notification.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';

import { Form, Media, Collapse, Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Moon,
  Mail,
  Menu,
  MoreVertical,
  Check,
  Bell,
  User,
  AlertTriangle,
  Inbox,
  Phone,
  Calendar,
  Lock,
  X,
  LogOut
} from 'react-feather';
import NavbarSearch from '../../../components/search/Search';
import ReactCountryFlag from 'react-country-flag';

import userImage from '../../../assets/img/portrait/small/avatar-s-1.png';
import userImage2 from '../../../assets/img/portrait/small/avatar-s-2.png';
import userImage3 from '../../../assets/img/portrait/small/avatar-s-3.png';
import userImage4 from '../../../assets/img/portrait/small/avatar-s-4.png';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';

class ThemeNavbar extends Component<any, any> {
  handleClick = e => {
    this.props.toggleSidebarMenu('open');
  };
  constructor(props) {
    super(props);
    this.props.getEntities();
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
      // notificationList: this.props.
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    this.props.setLocale(langKey);
    location.reload();

    // document.querySelector('html').setAttribute('dir', isRTL(langKey) ? 'rtl' : 'ltr');
  };

  render() {
    return (
      <Navbar className="navbar navbar-expand-lg navbar-light bg-faded">
        <div className="container-fluid px-0">
          <div className="navbar-header">
            <Menu size={14} className="navbar-toggle d-lg-none float-left" onClick={this.handleClick.bind(this)} data-toggle="collapse" />
            {/* <Form className="navbar-form mt-1 float-left" role="search">
              <NavbarSearch />
            </Form> */}
            {/* <Moon size={20} color="#333" className="m-2 cursor-pointer"/> */}
            <MoreVertical className="mt-1 navbar-toggler black no-border float-right" size={50} onClick={this.toggle} />
          </div>

          <div className="navbar-container">
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto float-right" navbar>
                <UncontrolledDropdown nav inNavbar className="pr-1">
                  <DropdownToggle nav>
                    <ReactCountryFlag
                      code={languages[this.props.currentLocale].code}
                      countryCode={languages[this.props.currentLocale].code}
                      svg
                    />
                    {languages[this.props.currentLocale].name}
                  </DropdownToggle>
                  <LocaleMenu onClick={this.handleLocaleChange} />
                  {/* <DropdownMenu right>
                    <DropdownItem>
                      <ReactCountryFlag code="us" countryCode="US" svg /> English
                    </DropdownItem>
                    <DropdownItem>
                      <ReactCountryFlag code="fr" countryCode="FR" svg /> Francais
                    </DropdownItem>
                    <DropdownItem>
                      <ReactCountryFlag code="ma" countryCode="MA" svg /> Arabe
                    </DropdownItem> */}
                  {/* <DropdownItem>
                      <ReactCountryFlag code="cn" svg /> Chinese
                    </DropdownItem> */}
                  {/* </DropdownMenu> */}
                </UncontrolledDropdown>
                {/* <NavItem className="pr-1">
                  <Link to="/email/" className="nav-link">
                    <Mail size={20} color="#333" />
                  </Link>
                </NavItem> */}
                <UncontrolledDropdown nav inNavbar className="pr-1">
                  <DropdownToggle nav>
                    {this.props.notificationList &&
                      this.props.notificationList.length > 0 &&
                      this.props.notificationList.filter(notification => notification.visualise === 'true').length > 0 && (
                        <span className="notification-bell-blink" />
                      )}
                    <Bell
                      size={21}
                      className={
                        this.props.notificationList.filter(notification => notification.visualise === 'true').length > 0
                          ? 'text-dark notification-danger animate-shake'
                          : 'text-dark notification-danger'
                      }
                    />
                  </DropdownToggle>
                  <DropdownMenu right className="notification-dropdown">
                    <div className="p-2 text-center  border-bottom-grey border-bottom-lighten-2">
                      <h6 className="mb-0 text-bold-500">Notifications</h6>
                    </div>
                    <PerfectScrollbar className="noti-list bg-grey bg-lighten-5">
                      {this.props.notificationList &&
                        this.props.notificationList.length > 0 &&
                        this.props.notificationList.map((notification, i) => (
                          <Media className="px-3 pt-2 pb-2 media  border-bottom-grey border-bottom-lighten-3">
                            {/* <Media left top href="#">
                          <Media object src={userImage2} alt="Generic placeholder image" className="rounded-circle width-35" />
                        </Media> */}
                            <Media body>
                              <h6 className="mb-0 text-bold-500 font-small-3">
                                {notification.libelle}
                                <span className="text-bold-300 font-small-2 text-muted float-right">
                                  <TextFormat type="date" value={notification.date} format={APP_LOCAL_DATE_FORMAT} />
                                </span>
                              </h6>
                              <span className="font-small-3 line-height-2">{notification.description}</span>
                            </Media>
                          </Media>
                        ))}
                    </PerfectScrollbar>
                    {/* <div className="p-1 text-center border-top-grey border-top-lighten-2">
                      <Link to="/">View All</Link>
                    </div> */}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown nav inNavbar className="pr-1">
                  <DropdownToggle nav>
                    <img src={userImage} alt="logged-in-user" className="rounded-circle width-35" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <span className="font-small-3">
                        {this.props.user.firstName + ' ' + this.props.user.lastName}{' '}
                        <span className="text-muted">({this.props.user.login})</span>
                      </span>
                    </DropdownItem>
                    <DropdownItem divider />

                    <Link to="/pages/user-profile" className="p-0">
                      <DropdownItem>
                        <User size={16} className="mr-1" /> <Translate contentKey="global.menu.profile">Mon profil</Translate>
                      </DropdownItem>
                    </Link>
                    {/* <Link to="/email" className="p-0">
                      <DropdownItem>
                        <Inbox size={16} className="mr-1" /> Email
                      </DropdownItem>
                    </Link> */}
                    {/* <Link to="/contacts" className="p-0">
                      <DropdownItem>
                        <Phone size={16} className="mr-1" /> Contacts
                      </DropdownItem>
                    </Link>
                    <Link to="/calendar" className="p-0">
                      <DropdownItem>
                        <Calendar size={16} className="mr-1" /> Calendar
                      </DropdownItem>
                    </Link> */}
                    <DropdownItem divider />
                    {/* <Link to="/pages/lockscreen" className="p-0">
                      <DropdownItem>
                        <Lock size={16} className="mr-1" /> Lock Screen
                      </DropdownItem>
                    </Link> */}
                    <Link to="/logout" className="p-0">
                      <DropdownItem>
                        <LogOut size={16} className="mr-1" /> <Translate contentKey="global.menu.logout">Se deconnecter</Translate>
                      </DropdownItem>
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </div>
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ locale, notification }: IRootState) => ({
  currentLocale: locale.currentLocale,
  notificationList: notification.entities
});
const mapDispatchToProps = { setLocale, getEntities };
type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ThemeNavbar);
