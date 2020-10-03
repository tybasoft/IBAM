import { useEffect } from 'react';
import React from 'react';
import { Modal, ModalHeader, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from '../../entities/entreprise/entreprise.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';

const EntrepriseDetails = (props: any) => {
  const { entrepriseEntity, imageEntity } = props;

  console.log(props);

  useEffect(() => {
    props.resetImage();
    props.getEntity(props.selectedEntity);
  }, []);

  const closeModal = () => {
    props.setSelectedEntity(null);
  };

  useEffect(() => {
    // if (entrepriseEntity.id !== undefined) {
    if (entrepriseEntity.image !== undefined && entrepriseEntity.image !== null) {
      props.getImage(entrepriseEntity.image.id);
    }
    // }
  }, [entrepriseEntity]);

  return (
    <Modal isOpen={props.isOpen} toggle={() => closeModal()} size="lg">
      <ModalHeader toggle={() => closeModal()}>Détails de l'entreprise</ModalHeader>
      {!entrepriseEntity ? (
        <Row className="pt-3 pl-3 pr-3">'Chargement ...'</Row>
      ) : (
        <Row className="pt-3 pl-3 pr-3">
          <Col md={'6'}>
            <h2>
              Entreprise [<b>{entrepriseEntity.id}</b>]
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="entiteJuridique">Entite Juridique</span>
              </dt>
              <dd>{entrepriseEntity.entiteJuridique}</dd>
              <dt>
                <span id="nomCommercial">Nom Commercial</span>
              </dt>
              <dd>{entrepriseEntity.nomCommercial}</dd>
              <dt>
                <span id="adresse">Adresse </span>
              </dt>
              <dd>{entrepriseEntity.adresse}</dd>
              <dt>
                <span id="capital">Capital </span>
              </dt>
              <dd>{entrepriseEntity.capital}</dd>
              <dt>
                <span id="direction">Direction </span>
              </dt>
              <dd>{entrepriseEntity.direction}</dd>
              <dt>
                <span id="activite">Activite </span>
              </dt>
              <dd>{entrepriseEntity.activite}</dd>
              <dt>
                <span id="telephone">Telephone </span>
              </dt>
              <dd>{entrepriseEntity.telephone}</dd>
              <dt>
                <span id="email">Email </span>
              </dt>
              <dd>{entrepriseEntity.email}</dd>
              {/*
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.entreprise.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{entrepriseEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.entreprise.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={entrepriseEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          */}
            </dl>
            {/* <Button tag={Link} to="/entreprise" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entreprise/${entrepriseEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button> */}
          </Col>
          <Col md={'6'}>
            {entrepriseEntity.image !== null ? (
              <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '80%', border: 'solid 1px' }} />
            ) : null}
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  entrepriseEntity: storeState.entreprise.entity,
  imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EntrepriseDetails);
