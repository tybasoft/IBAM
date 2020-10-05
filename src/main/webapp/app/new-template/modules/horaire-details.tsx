import { useEffect } from 'react';
import React from 'react';
import { Modal, ModalHeader, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from '../../entities/horaire/horaire.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';

const HoraireDetails = (props: any) => {
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
              <Translate contentKey="ibamApp.horaire.detail.title">Horaire</Translate> [<b>{entity.id}</b>]
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="libelle">
                  <Translate contentKey="ibamApp.horaire.libelle">Libelle</Translate>
                </span>
              </dt>
              <dd>{entity.libelle}</dd>
              <dt>
                <span id="nbrHeurParJr">
                  <Translate contentKey="ibamApp.horaire.nbrHeurParJr">Nbr Heur Par Jr</Translate>
                </span>
              </dt>
              <dd>{entity.nbrHeurParJr}</dd>
              <dt>
                <span id="nbrJourParSem">
                  <Translate contentKey="ibamApp.horaire.nbrJourParSem">Nbr Jour Par Sem</Translate>
                </span>
              </dt>
              <dd>{entity.nbrJourParSem}</dd>
              <dt>
                <span id="heureDebutJr">
                  <Translate contentKey="ibamApp.horaire.heureDebutJr">Heure Debut Jr</Translate>
                </span>
              </dt>
              <dd>{entity.heureDebutJr}</dd>
              <dt>
                <span id="heureFinJr">
                  <Translate contentKey="ibamApp.horaire.heureFinJr">Heure Fin Jr</Translate>
                </span>
              </dt>
              <dd>{entity.heureFinJr}</dd>
              <dt>
                <span id="dureePause">
                  <Translate contentKey="ibamApp.horaire.dureePause">Duree Pause</Translate>
                </span>
              </dt>
              <dd>{entity.dureePause}</dd>
              {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.horaire.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{horaireEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.horaire.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={horaireEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
            </dl>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  entity: storeState.horaire.entity
  //   imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HoraireDetails);
