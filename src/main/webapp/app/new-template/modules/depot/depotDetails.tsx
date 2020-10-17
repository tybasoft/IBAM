import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Modal, ModalHeader } from 'reactstrap';
import { Translate, Storage, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from 'app/entities/depot/depot.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import countries from '../../../../content/countries';
import { locales } from 'app/config/translation';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export interface IEmployeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const containerStyle = {
  width: '100%',
  height: '400px'
};

export const FournisseurDetails = ({ id, handleClose, ...props }) => {
  useEffect(() => {
    props.getEntity(id);
  }, []);

  const { depotEntity } = props;

  return (
    <Modal isOpen={props.isOpen} toggle={() => handleClose()} size="lg">
      <ModalHeader toggle={() => handleClose()}>
        <Translate contentKey="ibamApp.depot.detail.title">Depot</Translate> [<b>{depotEntity.id}</b>]
      </ModalHeader>
      {!depotEntity ? (
        <Row className="pt-3 pl-3 pr-3">'Chargement ...'</Row>
      ) : (
        <Row className="pt-3 pl-3 pr-3">
          <Col md="8">
            <dl className="jh-entity-details">
              <dt>
                <span id="libelle">
                  <Translate contentKey="ibamApp.depot.libelle">Libelle</Translate>
                </span>
              </dt>
              <dd>{depotEntity.libelle}</dd>
              <dt>
                <span id="adresse">
                  <Translate contentKey="ibamApp.depot.adresse">Adresse</Translate>
                </span>
              </dt>
              <dd>{depotEntity.adresse}</dd>
              <dt>
                <span id="tel">
                  <Translate contentKey="ibamApp.depot.tel">Tel</Translate>
                </span>
              </dt>
              <dd>{depotEntity.tel}</dd>
              <dt>
                <span id="ville">
                  <Translate contentKey="ibamApp.depot.ville">Ville</Translate>
                </span>
              </dt>
              <dd>{depotEntity.ville}</dd>
              <dt>
                <span id="pays">
                  <Translate contentKey="ibamApp.depot.pays">Pays</Translate>
                </span>
              </dt>
              <dd>{depotEntity.pays}</dd>
              <dt>
                <span id="userModif">
                  <Translate contentKey="ibamApp.depot.userModif">User Modif</Translate>
                </span>
              </dt>
              <dd>{depotEntity.userModif}</dd>
              <dt>
                <span id="dateModif">
                  <Translate contentKey="ibamApp.depot.dateModif">Date Modif</Translate>
                </span>
              </dt>
              <dd>
                <TextFormat value={depotEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
              </dd>
            </dl>
            {depotEntity.latitude && depotEntity.longitude && (
              <div className="mt-2 mb-2">
                <LoadScript googleMapsApiKey="AIzaSyC3ptr9KQuVbnjrokZLtgQH01RLrtQeWMA">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{ lat: depotEntity.latitude, lng: depotEntity.longitude }}
                    zoom={10}
                    //   onClick={onClick}
                  >
                    <Marker position={{ lat: depotEntity.latitude, lng: depotEntity.longitude }} />
                    {/* Child components, such as markers, info windows, etc. */}
                    <></>
                  </GoogleMap>
                </LoadScript>
              </div>
            )}
            {(!depotEntity.latitude || !depotEntity.longitude) && (
              <p>
                <Translate contentKey="ibamApp.depot.nolocal">Aucune information sur la géolocalisation du dépot</Translate>
              </p>
            )}
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = ({ depot }: IRootState) => ({
  depotEntity: depot.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(FournisseurDetails);
