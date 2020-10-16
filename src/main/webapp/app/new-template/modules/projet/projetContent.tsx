import { connect } from 'react-redux';
import emailContent from '../../components/email/emailContent';

import React, { useState } from 'react';
// import { Button } from "reactstrap";
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import { VisibilityFilters } from 'app/new-template/redux/actions/email/emailActions';
import ProjetTab from './ProjetTab';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { IRootState } from 'app/shared/reducers';
import ProjetDetails from './projetDetails';
import ProjetDepot from './projetDepot';
import { ProjetMateriel } from './projetMateriel';
import projetEmployes, { ProjetEmploye } from './projetEmployes';

const ProjetContent = ({ projet }) => {
  const [activeTab, setActiveTab] = useState('1');
  console.log('prj', projet);
  return (
    <div className="email-app-mail-content d-none d-md-block h-100">
      {projet.id ? (
        <div className="email-app-mail-content-detail">
          <PerfectScrollbar>
            <div className="email-app-options card-block">
              {/* <div className="row d-md-none">
                <button className="btn btn-raised btn-primary ml-2 back-to-inbox">
                  <i className="fa fa-angle-left" /> Back to inbox
                </button>
              </div> */}
            </div>
            <div>
              <Nav className="mb-3" pills>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === '1'
                    })}
                    onClick={() => {
                      setActiveTab('1');
                    }}
                  >
                    Détails
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === '2'
                    })}
                    onClick={() => {
                      setActiveTab('2');
                    }}
                  >
                    Dépots
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === '3'
                    })}
                    onClick={() => {
                      setActiveTab('3');
                    }}
                  >
                    Materiel
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === '4'
                    })}
                    onClick={() => {
                      setActiveTab('4');
                    }}
                  >
                    Employés
                  </NavLink>
                </NavItem>
              </Nav>
              <div className="email-app-title card-block">
                <h3 className="list-group-item-heading">{projet.libelle}</h3>
              </div>
              <div className="media-list">
                <hr></hr>

                {activeTab === '1' && (
                  <div id="collapse2" role="tabpanel" aria-labelledby="headingCollapse2" className="card-collapse" aria-expanded="false">
                    <div className="card-body px-0">
                      <div className="email-app-text card-block">
                        <ProjetDetails projetEntity={projet} />
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === '2' && (
                  <div id="collapse2" role="tabpanel" aria-labelledby="headingCollapse2" className="card-collapse" aria-expanded="false">
                    <div className="card-body px-0">
                      <div className="email-app-text card-block">
                        {projet.depot ? <ProjetDepot depotEntity={projet.depot} /> : 'Aucune infromation sur le dépôt.'}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === '3' && (
                  <div id="collapse2" role="tabpanel" aria-labelledby="headingCollapse2" className="card-collapse" aria-expanded="false">
                    <div className="card-body px-0">
                      <div className="email-app-text card-block">
                        {projet.materiels ? <ProjetMateriel materielList={projet.materiels} /> : 'Aucun matériel associé à ce projet.'}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === '4' && (
                  <div id="collapse2" role="tabpanel" aria-labelledby="headingCollapse2" className="card-collapse" aria-expanded="false">
                    <div className="card-body px-0">
                      <div className="email-app-text card-block">
                        {projet.employes ? <ProjetEmploye depotEntity={projet.employes} /> : 'Aucun employé associé à ce projet.'}
                      </div>
                    </div>
                  </div>
                )}

                {/* {activeTab === '2' && <div>TAB 2</div>} */}
                <div className="email-app-text-action card-body" />
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      ) : (
        <div className="row h-100">
          <div className="col-sm-12 my-auto">
            <div className="text-center">
              <Icon.Copy size={84} color="#ccc" className="pb-3" />
              <h4>Cliquez sur un projet pour voir plus.</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ProjetContent.propTypes = {
//   emailDetails: PropTypes.object
// };

const mapStateToProps = ({ projet }: IRootState) => ({
  projet: projet.entity
});

export default connect(mapStateToProps)(ProjetContent);
