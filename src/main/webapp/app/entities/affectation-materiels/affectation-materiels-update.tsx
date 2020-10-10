import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProjet } from 'app/shared/model/projet.model';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
import { IMateriel } from 'app/shared/model/materiel.model';
import { getEntities as getMateriels } from 'app/entities/materiel/materiel.reducer';
import { getEntity, updateEntity, createEntity, reset } from './affectation-materiels.reducer';
import { IAffectationMateriels } from 'app/shared/model/affectation-materiels.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAffectationMaterielsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AffectationMaterielsUpdate = (props: IAffectationMaterielsUpdateProps) => {
  const [projetId, setProjetId] = useState('0');
  const [materielId, setMaterielId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { affectationMaterielsEntity, projets, materiels, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/affectation-materiels' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProjets();
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
        ...affectationMaterielsEntity,
        ...values,
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
          <h2 id="ibamApp.affectationMateriels.home.createOrEditLabel">
            <Translate contentKey="ibamApp.affectationMateriels.home.createOrEditLabel">Create or edit a AffectationMateriels</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : affectationMaterielsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="affectation-materiels-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="affectation-materiels-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateDebutLabel" for="affectation-materiels-dateDebut">
                  <Translate contentKey="ibamApp.affectationMateriels.dateDebut">Date Debut</Translate>
                </Label>
                <AvField
                  id="affectation-materiels-dateDebut"
                  type="date"
                  className="form-control"
                  name="dateDebut"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateFinLabel" for="affectation-materiels-dateFin">
                  <Translate contentKey="ibamApp.affectationMateriels.dateFin">Date Fin</Translate>
                </Label>
                <AvField id="affectation-materiels-dateFin" type="date" className="form-control" name="dateFin" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="affectation-materiels-description">
                  <Translate contentKey="ibamApp.affectationMateriels.description">Description</Translate>
                </Label>
                <AvField id="affectation-materiels-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="affectation-materiels-projet">
                  <Translate contentKey="ibamApp.affectationMateriels.projet">Projet</Translate>
                </Label>
                <AvInput
                  id="affectation-materiels-projet"
                  type="select"
                  className="form-control"
                  name="projet.id"
                  value={isNew ? projets[0] && projets[0].id : affectationMaterielsEntity.projet?.id}
                  required
                >
                  {projets
                    ? projets.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="affectation-materiels-materiel">
                  <Translate contentKey="ibamApp.affectationMateriels.materiel">Materiel</Translate>
                </Label>
                <AvInput
                  id="affectation-materiels-materiel"
                  type="select"
                  className="form-control"
                  name="materiel.id"
                  value={isNew ? materiels[0] && materiels[0].id : affectationMaterielsEntity.materiel?.id}
                  required
                >
                  {materiels
                    ? materiels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/affectation-materiels" replace color="info">
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
  projets: storeState.projet.entities,
  materiels: storeState.materiel.entities,
  affectationMaterielsEntity: storeState.affectationMateriels.entity,
  loading: storeState.affectationMateriels.loading,
  updating: storeState.affectationMateriels.updating,
  updateSuccess: storeState.affectationMateriels.updateSuccess,
});

const mapDispatchToProps = {
  getProjets,
  getMateriels,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AffectationMaterielsUpdate);
