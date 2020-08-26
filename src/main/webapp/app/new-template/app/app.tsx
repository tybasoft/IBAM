// import external modules
import React, { useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
// import internal(own) modules
import Router from './router';
import { IRootState } from '../../shared/reducers';
import { hasAnyAuthority } from '../../shared/auth/private-route';
import { AUTHORITIES } from '../../config/constants';
import { hot } from 'react-hot-loader';

import { getSession, logout } from '../../shared/reducers/authentication';
import { getProfile } from '../../shared/reducers/application-profile';
import { setLocale } from '../../shared/reducers/locale';
import { getUserEntities, updateEntity as updateNotification } from '../../entities/notification/notification.reducer';
import { connect } from 'react-redux';

// import Header from 'app/shared/layout/header/header';
// import Footer from 'app/shared/layout/footer/footer';
// import ErrorBoundary from '../app/shared/error/error-boundary';

export interface IAppProps extends StateProps, DispatchProps {}

export const App: any = props => {
  useEffect(() => {
    props.getSession();
    props.getProfile();
  }, []);
  return <Router />;
};

const mapStateToProps = ({ authentication, applicationProfile, locale, notification }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isUser: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.USER]),
  isMagasinier: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.MAGASINIER, AUTHORITIES.ADMIN, AUTHORITIES.USER]),
  isResponsableEmp: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.RESPONSABLEME, AUTHORITIES.ADMIN, AUTHORITIES.USER]),
  isChefMateriel: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.CHEFMATERIEL, AUTHORITIES.ADMIN, AUTHORITIES.USER]),
  isChefMateriau: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.CHEFMATERIAU, AUTHORITIES.ADMIN, AUTHORITIES.USER]),
  isPointeur: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.POINTEUR, AUTHORITIES.ADMIN, AUTHORITIES.USER]),
  isResponsableProjet: hasAnyAuthority(authentication.account.authorities, [
    AUTHORITIES.RESPONSABLEPROJET,
    AUTHORITIES.ADMIN,
    AUTHORITIES.USER
  ]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
  notifications: notification.entities,
  loading: notification.loading
});

const mapDispatchToProps = { setLocale, getSession, getProfile, getUserEntities, updateNotification, logout };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(App);
