import { useEffect } from 'react';
import React from 'react';
import { Modal, ModalHeader, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from '../../entities/consommation/consommation.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';

const ConsommationDetails = (props: any) => {
  const { entity, imageEntity } = props;

  console.log(props);

  useEffect(() => {
    props.resetImage();
    props.getEntity(props.selectedEntity);
  }, []);

  const closeModal = () => {
    props.setSelectedEntity(null);
  };

  //   useEffect(() => {
  //     // if (entrepriseEntity.id !== undefined) {
  //     if (entrepriseEntity.image !== undefined && entrepriseEntity.image !== null) {
  //       props.getImage(entrepriseEntity.image.id);
  //     }
  //     // }
  //   }, [entrepriseEntity]);

  return (
    <Modal isOpen={props.isOpen} toggle={() => closeModal()} size="lg">
      <ModalHeader toggle={() => closeModal()}>Détails de la consommation</ModalHeader>
      {!entity ? (
        <Row className="pt-3 pl-3 pr-3">'Chargement ...'</Row>
      ) : (
        <Row className="pt-3 pl-3 pr-3">
          <Col md="8">
            <h2>
              <Translate contentKey="ibamApp.consommation.detail.title">Consommation</Translate> [<b>{entity.id}</b>]
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="reference">
                  <Translate contentKey="ibamApp.consommation.reference">Reference</Translate>
                </span>
              </dt>
              <dd>{entity.reference}</dd>
              <dt>
                <span id="dateAchat">
                  <Translate contentKey="ibamApp.consommation.dateAchat">Date Achat</Translate>
                </span>
              </dt>
              <dd>
                <TextFormat value={entity.dateAchat} type="date" format={APP_LOCAL_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="typeCarburant">
                  <Translate contentKey="ibamApp.consommation.typeCarburant">Type Carburant</Translate>
                </span>
              </dt>
              <dd>{entity.typeCarburant}</dd>
              <dt>
                <span id="montant">
                  <Translate contentKey="ibamApp.consommation.montant">Montant</Translate>
                </span>
              </dt>
              <dd>{entity.montant}</dd>
              <dt>
                <span id="quantite">
                  <Translate contentKey="ibamApp.consommation.quantite">Quantite</Translate>
                </span>
              </dt>
              <dd>{entity.quantite}</dd>
              <dt>
                <span id="kilometrage">
                  <Translate contentKey="ibamApp.consommation.kilometrage">Kilometrage</Translate>
                </span>
              </dt>
              <dd>{entity.kilometrage}</dd>
              <dt>
                <span id="commentaire">
                  <Translate contentKey="ibamApp.consommation.commentaire">Commentaire</Translate>
                </span>
              </dt>
              <dd>{entity.commentaire}</dd>
              {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.consommation.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{entity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.consommation.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={entity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
              <dt>
                <Translate contentKey="ibamApp.consommation.materiel">Materiel</Translate>
              </dt>
              <dd>{entity.materiel ? entity.materiel.libelle : ''}</dd>
              <dt>
                <Translate contentKey="ibamApp.consommation.fournisseur">Fournisseur</Translate>
              </dt>
              <dd>{entity.fournisseur ? entity.fournisseur.nomCommercial : ''}</dd>
            </dl>
            {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.centreMaintenance.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{entity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.centreMaintenance.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={entity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  entity: storeState.consommation.entity
  //   imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConsommationDetails);
