import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Modal, ModalHeader, ModalFooter, Table } from 'reactstrap';
import { Translate, Storage, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity,getReportEntity } from 'app/entities/bon-sortie/bon-sortie.reducer';
import { IBonSortie } from 'app/shared/model/bon-sortie.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import {getEntitiesById as getLigneBonSortie} from "app/entities/ligne-bon-sortie/ligne-bon-sortie.reducer";


export interface IBonSortieDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BonSortieDetails = ({ id, handleClose, ...props }) => {
      useEffect(() => {
            props.getEntity(id);
  props.getLigneBonSortie(id);
      }, []);

  const { ligneBonSortieList,bonSortieEntity } = props;

  const jsPdfGenerator = ()=> {

    props.getReportEntity(bonSortieEntity.id);
  }
      return (
            <Modal isOpen={props.isOpen} toggle={() => handleClose()} size="lg">
                  <ModalHeader toggle={() => handleClose()}>
                       <Translate contentKey="ibamApp.bonSortie.detail.title">BonSortie</Translate> [<b>{bonSortieEntity.id}</b>]
      </ModalHeader>
                  {!bonSortieEntity ? (
                        <Row className="pt-3 pl-3 pr-3">'Chargement ...'</Row>
                  ) : (
                              <Row className="pt-3 pl-3 pr-3">
                                    <Col md="8">
                                          <dl className="jh-entity-details">
                                                <dt>
            <span id="dateSortie">
              <Translate contentKey="ibamApp.bonSortie.dateSortie">Date Sortie</Translate>
                                                      </span>
                                                </dt>
                                                <dd>
            {bonSortieEntity.dateSortie ? (
              <TextFormat value={bonSortieEntity.dateSortie} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
                                                </dd>
                                                <dt>
                                                      <span id="dateCreation">
              <Translate contentKey="ibamApp.bonSortie.dateCreation">Date Creation</Translate>
                                                      </span>
                                                </dt>
                                                <dd>
            {bonSortieEntity.dateCreation ? (
              <TextFormat value={bonSortieEntity.dateCreation} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
                                                </dd>
                                                <dt>
                                                      <span id="remarques">
              <Translate contentKey="ibamApp.bonSortie.remarques">Remarques</Translate>
                                                      </span>
                                                </dt>
          <dd>{bonSortieEntity.remarques}</dd>
                                                <dt>
            <Translate contentKey="ibamApp.bonSortie.projet">Projet</Translate>
                                                </dt>
          <dd>{bonSortieEntity.projet ? bonSortieEntity.projet.libelle : ''}</dd>
        </dl>
                                                      <Table responsive>
                                                            <thead>
                                                                  <tr>
            <th className="hand" >
                                                                              <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                                                                        </th>
                                                                        <th className="hand">
                                                                              <Translate contentKey="ibamApp.ligneBonCommande.quantite">Quantite</Translate> <FontAwesomeIcon icon="sort" />
                                                                        </th>
            <th className="hand">
              <Translate contentKey="ibamApp.ligneBonReception.prixHt">Prix HT</Translate> <FontAwesomeIcon icon="sort" />
            </th>
                                                                        <th>
              <Translate contentKey="ibamApp.bonCommande.materiausAndMateriels">Materiaus/Materiels</Translate> <FontAwesomeIcon icon="sort" />
                                                                        </th>
                                                                        <th />
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
          {ligneBonSortieList.map((data, i) => (
                                                                        <tr key={`entity-${i}`}>
                                                                              <td>
                {data.id ? (
                  <Link to={`ligne-bon-reception/${data.id}`}>{data.id}</Link>
                ) : (
                  ''
                )}
                                                                              </td>
              <td>{data.quantite}</td>
              <td>{data.prixHt}</td>
              <td>{data.materiau ? data.materiau.libelle : ''} {data.materiel ? data.materiel.libelle : ''}</td>
                                                                              <td className="text-right">
                                                                              </td>
                                                                        </tr>
                                                                  ))}
                                                            </tbody>
                                                      </Table>
                                          <dd>
                                                <div>
            <Button style={{ height: 60,weight:100, marginTop: 10 }} onClick={jsPdfGenerator} color="success" >Télécharger</Button>
                                                </div>
                                          </dd>

                                    </Col>


                              </Row>
                        )}

            </Modal>
      );
};

const mapStateToProps = (storeState,{ bonSortie }: IRootState) => ({
  bonSortieEntity: storeState.bonSortie.entity,
  ligneBonSortieList : storeState.ligneBonSortie.entities,
});

const mapDispatchToProps = { getEntity,getLigneBonSortie,getReportEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect<any,any,any>(mapStateToProps, mapDispatchToProps)(BonSortieDetails);
