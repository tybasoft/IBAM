import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Modal, ModalHeader, ModalFooter, Table } from 'reactstrap';
import { Translate, Storage, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, getReportEntity } from 'app/entities/bon-reception/bon-reception.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';
import { IBonReception } from 'app/shared/model/bon-reception.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { getEntitiesById as getLigneBonReception } from 'app/entities/ligne-bon-reception/ligne-bon-reception.reducer';

export interface IBonReceptionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BonReceptionDetails = ({ id, handleClose, ...props }) => {
  const { ligneBonReceptionList, bonReceptionEntity, imageEntity } = props;
  useEffect(() => {
    // props.resetImage();

    // props.getImageEntity(props.match.params.id);
    props.getEntity(id);
    props.getLigneBonReception(id);
    // console.warn(props.getImageEntity(id));
  }, []);
  useEffect(() => {
    if (bonReceptionEntity.id !== undefined) {
      if (bonReceptionEntity.id.toString() === id && bonReceptionEntity.image !== null) {
        props.getImage(bonReceptionEntity.image.id);
      }
    }
  }, [bonReceptionEntity]);

  const jsPdfGenerator = () => {
    props.getReportEntity(bonReceptionEntity.id);
  };
  return (
    <Modal isOpen={props.isOpen} toggle={() => handleClose()} size="lg">
      <ModalHeader toggle={() => handleClose()}>
        <Translate contentKey="ibamApp.bonReception.detail.title">BonReception</Translate> [<b>{bonReceptionEntity.id}</b>]
      </ModalHeader>
      {!bonReceptionEntity ? (
        <Row className="pt-3 pl-3 pr-3">'Chargement ...'</Row>
      ) : (
        <Row className="pt-3 pl-3 pr-3">
          <Col md="8">
            <dl className="jh-entity-details">
              <dt>
                <span id="livreur">
                  <Translate contentKey="ibamApp.bonReception.livreur">Livreur</Translate>
                </span>
              </dt>
              <dd>{bonReceptionEntity.livreur}</dd>
              <dt>
                <span id="remarques">
                  <Translate contentKey="ibamApp.bonReception.remarques">Remarques</Translate>
                </span>
              </dt>
              <dd>{bonReceptionEntity.remarques}</dd>
              <dt>
                <span id="dateLivraison">
                  <Translate contentKey="ibamApp.bonReception.dateLivraison">Date Livraison</Translate>
                </span>
              </dt>
              <dd>
                {bonReceptionEntity.dateLivraison ? (
                  <TextFormat value={bonReceptionEntity.dateLivraison} type="date" format="DD-MM-YYYY" />
                ) : null}
              </dd>
              <dd>
                {bonReceptionEntity.dateModif ? <TextFormat value={bonReceptionEntity.dateModif} type="date" format="DD-MM-YYYY" /> : null}
              </dd>
              <dt>
                <Translate contentKey="ibamApp.bonReception.fournisseur">Fournisseur</Translate>
              </dt>
              <dd>{bonReceptionEntity.fournisseur ? bonReceptionEntity.fournisseur.email : ''}</dd>
              <dt>
                <Translate contentKey="ibamApp.bonReception.image">Image</Translate>
              </dt>
              <dd>{bonReceptionEntity.image ? bonReceptionEntity.image.id : ''}</dd>
              <dt>
                <Translate contentKey="ibamApp.bonReception.projet">Projet</Translate>
              </dt>
              <dd>{bonReceptionEntity.projet ? bonReceptionEntity.projet.libelle : ''}</dd>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="hand">
                      <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand">
                      <Translate contentKey="ibamApp.ligneBonCommande.quantite">Quantite</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand">
                      <Translate contentKey="ibamApp.ligneBonReception.prixHt">Prix HT</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="ibamApp.bonCommande.materiausAndMateriels">Materiaus/Materiels</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {ligneBonReceptionList.map((data, i) => (
                    <tr key={`entity-${i}`}>
                      <td>{data.id ? <Link to={`ligne-bon-reception/${data.id}`}>{data.id}</Link> : ''}</td>
                      <td>{data.quantite}</td>
                      <td>{data.prixHt}</td>
                      <td>
                        {data.materiau ? data.materiau.libelle : ''} {data.materiel ? data.materiel.libelle : ''}
                      </td>
                      <td className="text-right"></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </dl>

            <dd>
              <div>
                <Button style={{ height: 60, weight: 100, marginTop: 10 }} onClick={jsPdfGenerator} color="success">
                  Télécharger
                </Button>
              </div>
            </dd>
          </Col>
          <Col md="6">
            {bonReceptionEntity.image !== null ? (
              <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '80%', border: 'solid 1px' }} />
            ) : null}
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = (storeState, { bonReception }: IRootState) => ({
  bonReceptionEntity: storeState.bonReception.entity,
  ligneBonReceptionList: storeState.ligneBonReception.entities,
  imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getReportEntity, getLigneBonReception, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(BonReceptionDetails);
