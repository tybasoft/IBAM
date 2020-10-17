import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, Storage, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from 'app/entities/depot/depot.reducer';

import { IEmploye } from 'app/shared/model/employe.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import _debounce from 'lodash.debounce';
import countries from '../../../../content/countries';
import * as Icon from 'react-feather';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};
// export interface IEmployeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DepotCreate = (props: any) => {
  const { modalOpen, handleClose, depotEntity, loading, updating } = props;
  const [isNew, setIsNew] = useState(depotEntity === undefined);

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const onClick = e => {
    /* eslint-disable no-console */
    console.log('Map clicked', e);
    console.log('Lat', e.latLng.lat());
    console.log('Lng', e.latLng.lng());
    setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };
  //   const handleClose = () => {
  //     props.history.push('/fournisseur' + props.location.search);
  //   };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      // props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...depotEntity,
        ...values,
        latitude: coordinates.lat,
        longitude: coordinates.lng
      };

      /* eslint-disable no-console */
      console.log('entity to save', entity);

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <Modal isOpen={modalOpen} toggle={() => handleClose()} size="md">
      <ModalHeader toggle={() => handleClose()}>
        <Translate contentKey="ibamApp.depot.home.createOrEditLabel">Create or edit a Depot</Translate>
      </ModalHeader>
      {/* <AddTodo /> */}
      <AvForm model={isNew ? {} : depotEntity} onSubmit={saveEntity}>
        <ModalBody>
          <Row>
            <Col md={12}>
              <AvGroup>
                <Label id="libelleLabel" for="depot-libelle">
                  <Translate contentKey="ibamApp.depot.libelle">Libelle</Translate>
                </Label>
                <AvField
                  id="depot-libelle"
                  type="text"
                  name="libelle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="adresseLabel" for="depot-adresse">
                  <Translate contentKey="ibamApp.depot.adresse">Adresse</Translate>
                </Label>
                <AvField
                  id="depot-adresse"
                  type="text"
                  name="adresse"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="telLabel" for="depot-tel">
                  <Translate contentKey="ibamApp.depot.tel">Tel</Translate>
                </Label>
                <AvField id="depot-tel" type="text" name="tel" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="villeLabel" for="depot-ville">
                  <Translate contentKey="ibamApp.depot.ville">Ville</Translate>
                </Label>
                <AvField id="depot-ville" type="text" name="ville" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="paysLabel" for="depot-pays">
                  <Translate contentKey="ibamApp.depot.pays">Pays</Translate>
                </Label>
                <AvField id="depot-pays" type="text" name="pays" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="userModifLabel" for="depot-userModif">
                  <Translate contentKey="ibamApp.depot.userModif">User Modif</Translate>
                </Label>
                <AvField id="depot-userModif" type="text" name="userModif" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="dateModifLabel" for="depot-dateModif">
                  <Translate contentKey="ibamApp.depot.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="depot-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <div className="mt-2 mb-2">
                <LoadScript googleMapsApiKey="AIzaSyC3ptr9KQuVbnjrokZLtgQH01RLrtQeWMA">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{ lat: 31.76849668242614, lng: -8.264991494140633 }}
                    zoom={10}
                    onClick={onClick}
                  >
                    {coordinates.lng != null && <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} />}
                    {/*{ !isNew && coordinates.lng != null && <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }}/>}*/}

                    <></>
                  </GoogleMap>
                </LoadScript>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          {/* <div className="form-actions"> */}
          <Button onClick={() => handleClose()} color="warning" className="mr-1" type="button">
            <Icon.X size={16} className="mr-2" color="#FFF" />
            <Translate contentKey="entity.action.cancel">Entreprises</Translate>
          </Button>
          <Button color="primary" type="submit">
            <Icon.CheckSquare size={16} className="mr-2" color="#FFF" />
            <Translate contentKey="entity.action.save">Entreprises</Translate>
          </Button>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  //   fournisseurEntity: storeState.fournisseur.entity,
  loading: storeState.fournisseur.loading,
  updating: storeState.fournisseur.updating,
  updateSuccess: storeState.fournisseur.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DepotCreate);
