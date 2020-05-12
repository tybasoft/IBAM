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
import { getEntity, updateEntity, createEntity, reset } from './assurance.reducer';
import { IAssurance } from 'app/shared/model/assurance.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAssuranceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AssuranceUpdate = (props: IAssuranceUpdateProps) => {
  const [materielId, setMaterielId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { assuranceEntity, materiels, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/assurance' + props.location.search);
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
        ...assuranceEntity,
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
          <h2 id="ibamApp.assurance.home.createOrEditLabel">
            <Translate contentKey="ibamApp.assurance.home.createOrEditLabel">Create or edit a Assurance</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : assuranceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="assurance-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="assurance-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateDebutLabel" for="assurance-dateDebut">
                  <Translate contentKey="ibamApp.assurance.dateDebut">Date Debut</Translate>
                </Label>
                <AvField
                  id="assurance-dateDebut"
                  type="date"
                  className="form-control"
                  name="dateDebut"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateFinLabel" for="assurance-dateFin">
                  <Translate contentKey="ibamApp.assurance.dateFin">Date Fin</Translate>
                </Label>
                <AvField
                  id="assurance-dateFin"
                  type="date"
                  className="form-control"
                  name="dateFin"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="agenceLabel" for="assurance-agence">
                  <Translate contentKey="ibamApp.assurance.agence">Agence</Translate>
                </Label>
                <AvField
                  id="assurance-agence"
                  type="text"
                  name="agence"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="assurance-userModif">
                  <Translate contentKey="ibamApp.assurance.userModif">User Modif</Translate>
                </Label>
                <AvField id="assurance-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="assurance-dateModif">
                  <Translate contentKey="ibamApp.assurance.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="assurance-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="assurance-materiel">
                  <Translate contentKey="ibamApp.assurance.materiel">Materiel</Translate>
                </Label>
                <AvInput id="assurance-materiel" type="select" className="form-control" name="materiel.id">
                  <option value="" key="0" />
                  {materiels
                    ? materiels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/assurance" replace color="info">
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
  assuranceEntity: storeState.assurance.entity,
  loading: storeState.assurance.loading,
  updating: storeState.assurance.updating,
  updateSuccess: storeState.assurance.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(AssuranceUpdate);
