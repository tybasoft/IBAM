import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './centre-maintenance.reducer';
import { ICentreMaintenance } from 'app/shared/model/centre-maintenance.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICentreMaintenanceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CentreMaintenanceUpdate = (props: ICentreMaintenanceUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { centreMaintenanceEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/centre-maintenance' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
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
        ...centreMaintenanceEntity,
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
          <h2 id="ibamApp.centreMaintenance.home.createOrEditLabel">
            <Translate contentKey="ibamApp.centreMaintenance.home.createOrEditLabel">Create or edit a CentreMaintenance</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : centreMaintenanceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="centre-maintenance-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="centre-maintenance-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="libelleLabel" for="centre-maintenance-libelle">
                  <Translate contentKey="ibamApp.centreMaintenance.libelle">Libelle</Translate>
                </Label>
                <AvField
                  id="centre-maintenance-libelle"
                  type="text"
                  name="libelle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="specialiteLabel" for="centre-maintenance-specialite">
                  <Translate contentKey="ibamApp.centreMaintenance.specialite">Specialite</Translate>
                </Label>
                <AvField id="centre-maintenance-specialite" type="text" name="specialite" />
              </AvGroup>
              <AvGroup>
                <Label id="responsableLabel" for="centre-maintenance-responsable">
                  <Translate contentKey="ibamApp.centreMaintenance.responsable">Responsable</Translate>
                </Label>
                <AvField id="centre-maintenance-responsable" type="text" name="responsable" />
              </AvGroup>
              <AvGroup>
                <Label id="adresseLabel" for="centre-maintenance-adresse">
                  <Translate contentKey="ibamApp.centreMaintenance.adresse">Adresse</Translate>
                </Label>
                <AvField
                  id="centre-maintenance-adresse"
                  type="text"
                  name="adresse"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="telephoneLabel" for="centre-maintenance-telephone">
                  <Translate contentKey="ibamApp.centreMaintenance.telephone">Telephone</Translate>
                </Label>
                <AvField
                  id="centre-maintenance-telephone"
                  type="text"
                  name="telephone"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="centre-maintenance-email">
                  <Translate contentKey="ibamApp.centreMaintenance.email">Email</Translate>
                </Label>
                <AvField id="centre-maintenance-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="centre-maintenance-userModif">
                  <Translate contentKey="ibamApp.centreMaintenance.userModif">User Modif</Translate>
                </Label>
                <AvField id="centre-maintenance-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="centre-maintenance-dateModif">
                  <Translate contentKey="ibamApp.centreMaintenance.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="centre-maintenance-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/centre-maintenance" replace color="info">
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
  centreMaintenanceEntity: storeState.centreMaintenance.entity,
  loading: storeState.centreMaintenance.loading,
  updating: storeState.centreMaintenance.updating,
  updateSuccess: storeState.centreMaintenance.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CentreMaintenanceUpdate);
