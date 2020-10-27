import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Modal, ModalHeader, ModalFooter, Table } from 'reactstrap';
import { Translate, Storage, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, getReportEntity } from 'app/entities/bon-commande/bon-commande.reducer';
import { getEntity as getLigneBonCommande } from 'app/entities/ligne-bon-commande/ligne-bon-commande.reducer';

import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBonCommandeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; }> { }

export const BonCommandeDetails = ({ id, handleClose, ...props }) => {

      useEffect(() => {
            props.getEntity(id);
            props.getLigneBonCommande(id);

      }, []);

      const { ligneBonCommandeList, bonCommandeEntity } = props;
      const jsPdfGenerator = () => {
            props.getReportEntity(bonCommandeEntity.id);
      };
      return (
            <Modal isOpen={props.isOpen} toggle={() => handleClose()} size="lg">
                  <ModalHeader toggle={() => handleClose()}>
                        <Translate contentKey="ibamApp.bonCommande.detail.title">BonCommande</Translate> [<b>{bonCommandeEntity.id}</b>]
      </ModalHeader>
                  {!bonCommandeEntity ? (
                        <Row className="pt-3 pl-3 pr-3">'Chargement ...'</Row>
                  ) : (
                              <Row className="pt-3 pl-3 pr-3">
                                    <Col md="8">
                                          <dl className="jh-entity-details">
                                                <dt>
                                                      <span id="datePrevLiv">
                                                            <Translate contentKey="ibamApp.bonCommande.datePrevLiv">Date Prev Liv</Translate>
                                                      </span>
                                                </dt>
                                                <dd>
                                                      {bonCommandeEntity.datePrevLiv ? <TextFormat value={bonCommandeEntity.datePrevLiv} type="date" format="DD-MM-YYYY" /> : null}
                                                </dd>
                                                <dt>
                                                      <span id="dateCreation">
                                                            <Translate contentKey="ibamApp.bonCommande.dateCreation">Date Creation</Translate>
                                                      </span>
                                                </dt>
                                                <dd>
                                                      {bonCommandeEntity.dateCreation ? <TextFormat value={bonCommandeEntity.dateCreation} type="date" format="DD-MM-YYYY" /> : null}
                                                </dd>
                                                <dt>
                                                      <Translate contentKey="ibamApp.bonCommande.fournisseur">Fournisseur</Translate>
                                                </dt>
                                                <dd>{bonCommandeEntity.fournisseur ? bonCommandeEntity.fournisseur.email : ''}</dd>
                                                <dt>
                                                      <Translate contentKey="ibamApp.bonCommande.projet">Projet</Translate>
                                                </dt>
                                                <dd>{bonCommandeEntity.projet ? bonCommandeEntity.projet.libelle : ''}</dd>

                                                <dt>
                                                      <span id="remarques">
                                                            <Translate contentKey="ibamApp.bonCommande.remarques">Remarques</Translate>
                                                      </span>
                                                </dt>
                                                <dd>{bonCommandeEntity.remarques}</dd>
                                                <dt>
                                                      <span id="valide">
                                                            <Translate contentKey="ibamApp.bonCommande.valide">Valide</Translate>
                                                      </span>
                                                </dt>
                                                <dd>{bonCommandeEntity.valide ? 'true' : 'false'}</dd>

                                                <dd>
                                                      <Table responsive>
                                                            <thead>
                                                                  <tr>
                                                                        <th className="hand">
                                                                              <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                                                                        </th>
                                                                        <th className="hand">
                                                                              <Translate contentKey="ibamApp.ligneBonCommande.quantite">Quantite</Translate> <FontAwesomeIcon icon="sort" />
                                                                        </th>
                                                                        <th>
                                                                              <Translate contentKey="ibamApp.bonCommande.materiausAndMateriels">Materiaus/Materiels</Translate>{' '}
                                                                              <FontAwesomeIcon icon="sort" />
                                                                        </th>
                                                                        <th />
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                                  {ligneBonCommandeList.map((data, i) => (
                                                                        <tr key={`entity-${i}`}>
                                                                              <td>{data.id ? <Link to={`ligne-bon-commande/${data.id}`}>{data.id}</Link> : ''}</td>
                                                                              <td>{data.quantite}</td>
                                                                              <td>
                                                                                    {data.materiau ? data.materiau.libelle : ''} {data.materiel ? data.materiel.libelle : ''}
                                                                              </td>
                                                                              <td className="text-right">
                                                                                    <div className="btn-group flex-btn-group-container"></div>
                                                                              </td>
                                                                        </tr>
                                                                  ))}
                                                            </tbody>
                                                      </Table>
                                                </dd>
                                          </dl>
                                          <dd>
                                                <div>
                                                      <Button style={{ height: 60, weight: 100, marginTop: 10 }} onClick={jsPdfGenerator} color="success">
                                                            Télécharger
            </Button>
                                                </div>
                                          </dd>

                                    </Col>


                              </Row>
                        )}

            </Modal>
      );
};

const mapStateToProps = (storeState, { bonCommande }: IRootState) => ({
      bonCommandeEntity: storeState.bonCommande.entity,
      ligneBonCommandeList: storeState.ligneBonCommande.entities
});

const mapDispatchToProps = {
      getEntity,
      getLigneBonCommande,
      getReportEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(BonCommandeDetails);
