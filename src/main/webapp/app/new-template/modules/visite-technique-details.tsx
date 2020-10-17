import { useEffect } from 'react';
import React from 'react';
import { Modal, ModalHeader, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from '../../entities/visite-technique/visite-technique.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';

const VisiteTechniqueDetails = (props: any) => {
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
              <Translate contentKey="ibamApp.visiteTechnique.detail.title">VisiteTechnique</Translate> [<b>{entity.id}</b>]
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="reference">
                  <Translate contentKey="ibamApp.visiteTechnique.reference">Reference</Translate>
                </span>
              </dt>
              <dd>{entity.reference}</dd>
              <dt>
                <span id="dateVisite">
                  <Translate contentKey="ibamApp.visiteTechnique.dateVisite">Date Visite</Translate>
                </span>
              </dt>
              <dd>
                <TextFormat value={entity.dateVisite} type="date" format={APP_LOCAL_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="remarque">
                  <Translate contentKey="ibamApp.visiteTechnique.remarque">Remarque</Translate>
                </span>
              </dt>
              <dd>{entity.remarque}</dd>
              {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.visiteTechnique.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{entity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.visiteTechnique.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={entity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
              <dt>
                <Translate contentKey="ibamApp.visiteTechnique.materiel">Materiel</Translate>
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
  entity: storeState.visiteTechnique.entity
  //   imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VisiteTechniqueDetails);
