import { useEffect } from 'react';
import React from 'react';
import { Modal, ModalHeader, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from '../../entities/assurance/assurance.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';

const AssuranceDetails = (props: any) => {
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
              <Translate contentKey="ibamApp.assurance.detail.title">Assurance</Translate> [<b>{entity.id}</b>]
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="dateDebut">
                  <Translate contentKey="ibamApp.assurance.dateDebut">Date Debut</Translate>
                </span>
              </dt>
              <dd>
                <TextFormat value={entity.dateDebut} type="date" format={APP_LOCAL_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="dateFin">
                  <Translate contentKey="ibamApp.assurance.dateFin">Date Fin</Translate>
                </span>
              </dt>
              <dd>
                <TextFormat value={entity.dateFin} type="date" format={APP_LOCAL_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="agence">
                  <Translate contentKey="ibamApp.assurance.agence">Agence</Translate>
                </span>
              </dt>
              <dd>{entity.agence}</dd>
              {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.assurance.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{entity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.assurance.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={entity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
              <dt>
                <Translate contentKey="ibamApp.assurance.materiel">Materiel</Translate>
              </dt>
              <dd>{entity.materiel ? entity.materiel.libelle : ''}</dd>
            </dl>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  entity: storeState.assurance.entity
  //   imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AssuranceDetails);
