import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMateriel } from 'app/shared/model/materiel.model';
import { getEntities as getMateriels } from 'app/entities/materiel/materiel.reducer';
import { getEntity, updateEntity, createEntity, reset } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILocationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocationUpdate = (props: ILocationUpdateProps) => {
  const [materielId, setMaterielId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { locationEntity, materiels, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/location' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMateriels();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...locationEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ibamApp.location.home.createOrEditLabel">
            <Translate contentKey="ibamApp.location.home.createOrEditLabel">Create or edit a Location</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : locationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="location-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="location-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="referenceLabel" for="location-reference">
                  <Translate contentKey="ibamApp.location.reference">Reference</Translate>
                </Label>
                <AvField
                  id="location-reference"
                  type="text"
                  name="reference"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateDebutLabel" for="location-dateDebut">
                  <Translate contentKey="ibamApp.location.dateDebut">Date Debut</Translate>
                </Label>
                <AvField
                  id="location-dateDebut"
                  type="date"
                  className="form-control"
                  name="dateDebut"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateFinLabel" for="location-dateFin">
                  <Translate contentKey="ibamApp.location.dateFin">Date Fin</Translate>
                </Label>
                <AvField id="location-dateFin" type="date" className="form-control" name="dateFin" />
              </AvGroup>
              <AvGroup>
                <Label id="tarifLabel" for="location-tarif">
                  <Translate contentKey="ibamApp.location.tarif">Tarif</Translate>
                </Label>
                <AvField
                  id="location-tarif"
                  type="text"
                  name="tarif"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dureLocationLabel" for="location-dureLocation">
                  <Translate contentKey="ibamApp.location.dureLocation">Dure Location</Translate>
                </Label>
                <AvField id="location-dureLocation" type="text" name="dureLocation" />
              </AvGroup>
              <AvGroup>
                <Label id="montantLocationLabel" for="location-montantLocation">
                  <Translate contentKey="ibamApp.location.montantLocation">Montant Location</Translate>
                </Label>
                <AvField id="location-montantLocation" type="text" name="montantLocation" />
              </AvGroup>
              <AvGroup>
                <Label id="remarqueLabel" for="location-remarque">
                  <Translate contentKey="ibamApp.location.remarque">Remarque</Translate>
                </Label>
                <AvField id="location-remarque" type="text" name="remarque" />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="location-userModif">
                  <Translate contentKey="ibamApp.location.userModif">User Modif</Translate>
                </Label>
                <AvField id="location-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="location-dateModif">
                  <Translate contentKey="ibamApp.location.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="location-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="location-materiel">
                  <Translate contentKey="ibamApp.location.materiel">Materiel</Translate>
                </Label>
                <AvInput id="location-materiel" type="select" className="form-control" name="materiel.id">
                  <option value="" key="0" />
                  {materiels
                    ? materiels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/location" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  materiels: storeState.materiel.entities,
  locationEntity: storeState.location.entity,
  loading: storeState.location.loading,
  updating: storeState.location.updating,
  updateSuccess: storeState.location.updateSuccess
});

const mapDispatchToProps = {
  getMateriels,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationUpdate);
