import { useEffect } from 'react';
import React from 'react';
import { Modal, ModalHeader, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from '../../entities/centre-maintenance/centre-maintenance.reducer';
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
              <Translate contentKey="ibamApp.centreMaintenance.detail.title">CentreMaintenance</Translate> [<b>{entity.id}</b>]
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="libelle">
                  <Translate contentKey="ibamApp.centreMaintenance.libelle">Libelle</Translate>
                </span>
              </dt>
              <dd>{entity.libelle}</dd>
              <dt>
                <span id="specialite">
                  <Translate contentKey="ibamApp.centreMaintenance.specialite">Specialite</Translate>
                </span>
              </dt>
              <dd>{entity.specialite}</dd>
              <dt>
                <span id="responsable">
                  <Translate contentKey="ibamApp.centreMaintenance.responsable">Responsable</Translate>
                </span>
              </dt>
              <dd>{entity.responsable}</dd>
              <dt>
                <span id="adresse">
                  <Translate contentKey="ibamApp.centreMaintenance.adresse">Adresse</Translate>
                </span>
              </dt>
              <dd>{entity.adresse}</dd>
              <dt>
                <span id="telephone">
                  <Translate contentKey="ibamApp.centreMaintenance.telephone">Telephone</Translate>
                </span>
              </dt>
              <dd>{entity.telephone}</dd>
              <dt>
                <span id="email">
                  <Translate contentKey="ibamApp.centreMaintenance.email">Email</Translate>
                </span>
              </dt>
              <dd>{entity.email}</dd>
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
            </dl>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  entity: storeState.centreMaintenance.entity
  //   imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CentreMaintenanceDetails);
