import { useEffect } from 'react';
import React from 'react';
import { Modal, ModalHeader, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from '../../entities/fonction/fonction.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';

const FonctionDetails = (props: any) => {
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
              <Translate contentKey="ibamApp.fonction.detail.title">Fonction</Translate> [<b>{entity.id}</b>]
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="libelle">
                  <Translate contentKey="ibamApp.fonction.libelle">Libelle</Translate>
                </span>
              </dt>
              <dd>{entity.libelle}</dd>
              <dt>
                <span id="description">
                  <Translate contentKey="ibamApp.fonction.description">Description</Translate>
                </span>
              </dt>
              <dd>{entity.description}</dd>
              <dt>
                <span id="competences">
                  <Translate contentKey="ibamApp.fonction.competences">Competences</Translate>
                </span>
              </dt>
              <dd>{entity.competences}</dd>
              {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.fonction.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{fonctionEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.fonction.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={fonctionEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
            </dl>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  entity: storeState.fonction.entity
  //   imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FonctionDetails);
