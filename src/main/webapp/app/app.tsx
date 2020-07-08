import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { hot } from 'react-hot-loader';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale } from 'app/shared/reducers/locale';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IAppProps extends StateProps, DispatchProps {}

export const App = (props: IAppProps) => {
  useEffect(() => {
    props.getSession();
    props.getProfile();
  }, []);

  const paddingTop = '60px';
  return (
    <Router basename={baseHref}>
      <div className="app-container" style={{ paddingTop }}>
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
        <ErrorBoundary>
          <Header         
            isAuthenticated={props.isAuthenticated}
            isAdmin={props.isAdmin}
            isUser={props.isUser}
            isChefMateriel={props.isChefMateriel}
            isChefMateriau={props.isChefMateriau}
            isMagasinier ={props.isMagasinier}
            isResponsableEmp ={props.isResponsableEmp}
            isPointeur  ={props.isPointeur}
            isResponsableProjet ={props.isResponsableProjet}
            currentLocale={props.currentLocale}
            onLocaleChange={props.setLocale}
            ribbonEnv={props.ribbonEnv}
            isInProduction={props.isInProduction}
            isSwaggerEnabled={props.isSwaggerEnabled}
          />

        </ErrorBoundary>
        <div className="container-fluid view-container" id="app-view-container">
          <Card className="jh-card">
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </Card>
         
          <Footer />
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = ({ authentication, applicationProfile, locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isUser :  hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.USER]),
  isMagasinier: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.MAGASINIER,AUTHORITIES.ADMIN,AUTHORITIES.USER]),
  isResponsableEmp: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.RESPONSABLEME,AUTHORITIES.ADMIN,AUTHORITIES.USER]),
  isChefMateriel: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.CHEFMATERIEL,AUTHORITIES.ADMIN,AUTHORITIES.USER]),
  isChefMateriau: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.CHEFMATERIAU,AUTHORITIES.ADMIN,AUTHORITIES.USER]),
  isPointeur: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.POINTEUR,AUTHORITIES.ADMIN,AUTHORITIES.USER]),
  isResponsableProjet: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.RESPONSABLEPROJET,AUTHORITIES.ADMIN,AUTHORITIES.USER]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled
});

const mapDispatchToProps = { setLocale, getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
