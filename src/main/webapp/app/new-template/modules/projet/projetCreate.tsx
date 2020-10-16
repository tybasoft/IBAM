import React, { Component, Fragment, useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { Translate, translate } from 'react-jhipster';

import { getEntities as getEntreprises } from 'app/entities/entreprise/entreprise.reducer';
import { IHoraire } from 'app/shared/model/horaire.model';
import { getEntities as getHoraires } from 'app/entities/horaire/horaire.reducer';
import { IDepot } from 'app/shared/model/depot.model';
import { getEntities as getDepots } from 'app/entities/depot/depot.reducer';
import { getEntity, updateEntity, createEntity, reset } from 'app/entities/projet/projet.reducer';

import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';

import * as Icon from 'react-feather';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const ProjetCreate = ({ getEntities, modalOpen, handleClose, entityModel, horaires, entreprises, depots, ...props }) => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const onClick = e => {
    /* eslint-disable no-console */
    console.log('Map clicked', e);
    console.log('Lat', e.latLng.lat());
    console.log('Lng', e.latLng.lng());
    setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  useEffect(() => {
    //   if (isNew) {
    //     props.reset();
    //   } else {
    //     props.getEntity(props.match.params.id);
    //     setCoordinates({ lat: projetEntity.latitude, lng: projetEntity.longitude });
    //   }

    props.getEntreprises();
    props.getHoraires();
    props.getDepots();
  }, []);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...entityModel,
        ...values,
        latitude: coordinates.lat,
        longitude: coordinates.lng
      };

      if (entityModel === null) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
      handleClose();
      getEntities();
    }
  };
  return (
    <Modal isOpen={modalOpen} toggle={() => handleClose()} size="md">
      <ModalHeader toggle={() => handleClose()}>
        <Translate contentKey="ibamApp.projet.home.createLabel">Entreprises</Translate>
      </ModalHeader>
      {/* <AddTodo /> */}
      <AvForm model={entityModel} onSubmit={saveEntity}>
        <ModalBody>
          <Row>
            <Col md={12}>
              <AvGroup>
                <Label id="referenceLabel" for="projet-reference">
                  <Translate contentKey="ibamApp.projet.reference">Reference</Translate>
                </Label>
                <AvField
                  id="projet-reference"
                  type="text"
                  name="reference"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="libelleLabel" for="projet-libelle">
                  <Translate contentKey="ibamApp.projet.libelle">Libelle</Translate>
                </Label>
                <AvField
                  id="projet-libelle"
                  type="text"
                  name="libelle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="descriptionLabel" for="projet-description">
                  <Translate contentKey="ibamApp.projet.description">Description</Translate>
                </Label>
                <AvField id="projet-description" type="text" name="description" />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="dateDebutLabel" for="projet-dateDebut">
                  <Translate contentKey="ibamApp.projet.dateDebut">Date Debut</Translate>
                </Label>
                <AvField id="projet-dateDebut" type="date" className="form-control" name="dateDebut" />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="dateFinLabel" for="projet-dateFin">
                  <Translate contentKey="ibamApp.projet.dateFin">Date Fin</Translate>
                </Label>
                <AvField id="projet-dateFin" type="date" className="form-control" name="dateFin" />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="nbrEmployeLabel" for="projet-nbrEmploye">
                  <Translate contentKey="ibamApp.projet.nbrEmploye">Nbr Employe</Translate>
                </Label>
                <AvField id="projet-nbrEmploye" type="text" name="nbrEmploye" />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="budgetLabel" for="projet-budget">
                  <Translate contentKey="ibamApp.projet.budget">Budget</Translate>
                </Label>
                <AvField id="projet-budget" type="text" name="budget" />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="adresseLabel" for="projet-adresse">
                  <Translate contentKey="ibamApp.projet.adresse">Adresse</Translate>
                </Label>
                <AvField id="projet-adresse" type="text" name="adresse" />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="villeLabel" for="projet-ville">
                  <Translate contentKey="ibamApp.projet.ville">Ville</Translate>
                </Label>
                <AvField id="projet-ville" type="text" name="ville" />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="paysLabel" for="projet-pays">
                  <Translate contentKey="ibamApp.projet.pays">Pays</Translate>
                </Label>
                <AvField id="projet-pays" type="text" name="pays" />
              </AvGroup>
            </Col>
            {/* <AvGroup>
                <Label id="userModifLabel" for="projet-userModif">
                  <Translate contentKey="ibamApp.projet.userModif">User Modif</Translate>
                </Label>
                <AvField id="projet-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="projet-dateModif">
                  <Translate contentKey="ibamApp.projet.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="projet-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup> */}
            <Col md={12}>
              <AvGroup>
                <Label for="projet-entreprise">
                  <Translate contentKey="ibamApp.projet.entreprise">Entreprise</Translate>
                </Label>
                <AvInput id="projet-entreprise" type="select" className="form-control" name="entreprise.id">
                  <option value="" key="0" />
                  {entreprises
                    ? entreprises.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nomCommercial}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label for="projet-horaire">
                  <Translate contentKey="ibamApp.projet.horaire">Horaire</Translate>
                </Label>
                <AvInput id="projet-horaire" type="select" className="form-control" name="horaire.id">
                  <option value="" key="0" />
                  {horaires
                    ? horaires.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label for="projet-depot">
                  <Translate contentKey="ibamApp.projet.depot">Depot</Translate>
                </Label>
                <AvInput id="projet-depot" type="select" className="form-control" name="depot.id">
                  <option value="" key="0" />
                  {depots
                    ? depots.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
            </Col>
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
  entreprises: storeState.entreprise.entities,
  horaires: storeState.horaire.entities,
  depots: storeState.depot.entities,
  projetEntity: storeState.projet.entity,
  loading: storeState.projet.loading,
  updating: storeState.projet.updating,
  updateSuccess: storeState.projet.updateSuccess
});

const mapDispatchToProps = {
  getEntreprises,
  getHoraires,
  getDepots,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjetCreate);
