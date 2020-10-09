import { useEffect } from 'react';
import React from 'react';
import { Modal, ModalHeader, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from '../../entities/fiche-pointage/fiche-pointage.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';

const FichePointageDetails = (props: any) => {
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
              <Translate contentKey="ibamApp.fichePointage.detail.title">FichePointage</Translate> [<b>{entity.id}</b>]
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="dateJour">
                  <Translate contentKey="ibamApp.fichePointage.dateJour">Date Jour</Translate>
                </span>
              </dt>
              <dd>{entity.dateJour ? <TextFormat value={entity.dateJour} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
              {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.fichePointage.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{entity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.fichePointage.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            {entity.dateModif ? (
              <TextFormat value={entity.dateModif} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd> */}
              <dt>
                <Translate contentKey="ibamApp.fichePointage.projet">Projet</Translate>
              </dt>
              <dd>{entity.projet ? entity.projet.id : ''}</dd>
            </dl>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  entity: storeState.fichePointage.entity
  //   imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FichePointageDetails);
