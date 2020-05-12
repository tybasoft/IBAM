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
import { getEntity, updateEntity, createEntity, reset } from './visite-technique.reducer';
import { IVisiteTechnique } from 'app/shared/model/visite-technique.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVisiteTechniqueUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VisiteTechniqueUpdate = (props: IVisiteTechniqueUpdateProps) => {
  const [materielId, setMaterielId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { visiteTechniqueEntity, materiels, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/visite-technique' + props.location.search);
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
        ...visiteTechniqueEntity,
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
          <h2 id="ibamApp.visiteTechnique.home.createOrEditLabel">
            <Translate contentKey="ibamApp.visiteTechnique.home.createOrEditLabel">Create or edit a VisiteTechnique</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : visiteTechniqueEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="visite-technique-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="visite-technique-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="referenceLabel" for="visite-technique-reference">
                  <Translate contentKey="ibamApp.visiteTechnique.reference">Reference</Translate>
                </Label>
                <AvField
                  id="visite-technique-reference"
                  type="text"
                  name="reference"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateVisiteLabel" for="visite-technique-dateVisite">
                  <Translate contentKey="ibamApp.visiteTechnique.dateVisite">Date Visite</Translate>
                </Label>
                <AvField
                  id="visite-technique-dateVisite"
                  type="date"
                  className="form-control"
                  name="dateVisite"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="remarqueLabel" for="visite-technique-remarque">
                  <Translate contentKey="ibamApp.visiteTechnique.remarque">Remarque</Translate>
                </Label>
                <AvField id="visite-technique-remarque" type="text" name="remarque" />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="visite-technique-userModif">
                  <Translate contentKey="ibamApp.visiteTechnique.userModif">User Modif</Translate>
                </Label>
                <AvField id="visite-technique-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="visite-technique-dateModif">
                  <Translate contentKey="ibamApp.visiteTechnique.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="visite-technique-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="visite-technique-materiel">
                  <Translate contentKey="ibamApp.visiteTechnique.materiel">Materiel</Translate>
                </Label>
                <AvInput id="visite-technique-materiel" type="select" className="form-control" name="materiel.id">
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
              <Button tag={Link} id="cancel-save" to="/visite-technique" replace color="info">
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
  visiteTechniqueEntity: storeState.visiteTechnique.entity,
  loading: storeState.visiteTechnique.loading,
  updating: storeState.visiteTechnique.updating,
  updateSuccess: storeState.visiteTechnique.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(VisiteTechniqueUpdate);
