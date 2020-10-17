import { useEffect } from 'react';
import React from 'react';
import { Modal, ModalHeader, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from '../../entities/equipe/equipe.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';

const EquipeDetails = (props: any) => {
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
              <Translate contentKey="ibamApp.equipe.detail.title">Equipe</Translate> [<b>{entity.id}</b>]
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="libelle">
                  <Translate contentKey="ibamApp.equipe.libelle">Libelle</Translate>
                </span>
              </dt>
              <dd>{entity.libelle}</dd>
              {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.equipe.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{entity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.equipe.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={entity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
              <dt>
                <Translate contentKey="ibamApp.equipe.projet">Projet</Translate>
              </dt>
              <dd>{entity.projet ? entity.projet.libelle : ''}</dd>
              <dt>
                <Translate contentKey="ibamApp.equipe.equipe">Equipe</Translate>
              </dt>
              <dd>{entity.equipe ? entity.equipe.cin : ''}</dd>
            </dl>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  entity: storeState.equipe.entity
  //   imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EquipeDetails);
