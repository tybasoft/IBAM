import { useEffect } from 'react';
import React from 'react';
import { Modal, ModalHeader, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from '../../entities/marque/marque.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';

const MarqueDetails = (props: any) => {
  const { entity, imageEntity } = props;

  console.log(props);

  useEffect(() => {
    props.resetImage();
    props.getEntity(props.selectedEntity);
  }, []);

  const closeModal = () => {
    props.setSelectedEntity(null);
  };

  return (
    <Modal isOpen={props.isOpen} toggle={() => closeModal()} size="lg">
      <ModalHeader toggle={() => closeModal()}>Détails de l'entreprise</ModalHeader>
      {!entity ? (
        <Row className="pt-3 pl-3 pr-3">'Chargement ...'</Row>
      ) : (
        <Row className="pt-3 pl-3 pr-3">
          <Col md="8">
            <h2>
              <Translate contentKey="ibamApp.marque.detail.title">Marque</Translate> [<b>{entity.id}</b>]
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="libelle">
                  <Translate contentKey="ibamApp.marque.libelle">Libelle</Translate>
                </span>
              </dt>
              <dd>{entity.libelle}</dd>
              <dt>
                <span id="description">
                  <Translate contentKey="ibamApp.marque.description">Description</Translate>
                </span>
              </dt>
              <dd>{entity.description}</dd>
              {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.marque.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{entity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.marque.dateModif">Date Modif</Translate>
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
  entity: storeState.marque.entity
  //   imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MarqueDetails);
