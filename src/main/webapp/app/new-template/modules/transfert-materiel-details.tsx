import { useEffect } from 'react';
import React from 'react';
import { Modal, ModalHeader, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from '../../entities/transfert-materiel/transfert-materiel.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';

const CentreMaintenanceDetails = (props: any) => {
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
      <ModalHeader toggle={() => closeModal()}>Détails de l'entreprise</ModalHeader>
      {!entity ? (
        <Row className="pt-3 pl-3 pr-3">'Chargement ...'</Row>
      ) : (
        <Row className="pt-3 pl-3 pr-3">
          <Col md="8">
            <h2>
              <Translate contentKey="ibamApp.transfertMateriel.detail.title">TransfertMateriel</Translate> [<b>{entity.id}</b>]
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="reference">
                  <Translate contentKey="ibamApp.transfertMateriel.reference">Reference</Translate>
                </span>
              </dt>
              <dd>{entity.reference}</dd>
              <dt>
                <span id="dateTransfert">
                  <Translate contentKey="ibamApp.transfertMateriel.dateTransfert">Date Transfert</Translate>
                </span>
              </dt>
              <dd>
                <TextFormat value={entity.dateTransfert} type="date" format={APP_LOCAL_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="commentaire">
                  <Translate contentKey="ibamApp.transfertMateriel.commentaire">Commentaire</Translate>
                </span>
              </dt>
              <dd>{entity.commentaire}</dd>
              {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.transfertMateriel.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{transfertMaterielEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.transfertMateriel.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={transfertMaterielEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
              <dt>
                <Translate contentKey="ibamApp.transfertMateriel.materiel">Materiel</Translate>
              </dt>
              <dd>{entity.materiel ? entity.materiel.libelle : ''}</dd>
              <dt>
                <Translate contentKey="ibamApp.transfertMateriel.projet">Projet</Translate>
              </dt>
              <dd>{entity.projet ? entity.projet.libelle : ''}</dd>
            </dl>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  entity: storeState.transfertMateriel.entity
  //   imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CentreMaintenanceDetails);
