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
import { getEntity, updateEntity, createEntity, reset } from './affectations-materiels.reducer';
import { IAffectationsMateriels } from 'app/shared/model/affectations-materiels.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAffectationsMaterielsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AffectationsMaterielsUpdate = (props: IAffectationsMaterielsUpdateProps) => {
  const [projetId, setProjetId] = useState('0');
  const [materielId, setMaterielId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { affectationsMaterielsEntity, projets, materiels, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/affectations-materiels' + props.location.search);
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
        ...affectationsMaterielsEntity,
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
          <h2 id="ibamApp.affectationsMateriels.home.createOrEditLabel">
            <Translate contentKey="ibamApp.affectationsMateriels.home.createOrEditLabel">Create or edit a AffectationsMateriels</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : affectationsMaterielsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="affectations-materiels-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="affectations-materiels-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateDebutLabel" for="affectations-materiels-dateDebut">
                  <Translate contentKey="ibamApp.affectationsMateriels.dateDebut">Date Debut</Translate>
                </Label>
                <AvField
                  id="affectations-materiels-dateDebut"
                  type="date"
                  className="form-control"
                  name="dateDebut"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateFinLabel" for="affectations-materiels-dateFin">
                  <Translate contentKey="ibamApp.affectationsMateriels.dateFin">Date Fin</Translate>
                </Label>
                <AvField id="affectations-materiels-dateFin" type="date" className="form-control" name="dateFin" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="affectations-materiels-description">
                  <Translate contentKey="ibamApp.affectationsMateriels.description">Description</Translate>
                </Label>
                <AvField id="affectations-materiels-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="affectations-materiels-projet">
                  <Translate contentKey="ibamApp.affectationsMateriels.projet">Projet</Translate>
                </Label>
                <AvInput
                  id="affectations-materiels-projet"
                  type="select"
                  className="form-control"
                  name="projet.id"
                  value={isNew ? projets[0] && projets[0].id : affectationsMaterielsEntity.projet?.id}
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
                <Label for="affectations-materiels-materiel">
                  <Translate contentKey="ibamApp.affectationsMateriels.materiel">Materiel</Translate>
                </Label>
                <AvInput
                  id="affectations-materiels-materiel"
                  type="select"
                  className="form-control"
                  name="materiel.id"
                  value={isNew ? materiels[0] && materiels[0].id : affectationsMaterielsEntity.materiel?.id}
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
              <Button tag={Link} id="cancel-save" to="/affectations-materiels" replace color="info">
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
  affectationsMaterielsEntity: storeState.affectationsMateriels.entity,
  loading: storeState.affectationsMateriels.loading,
  updating: storeState.affectationsMateriels.updating,
  updateSuccess: storeState.affectationsMateriels.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(AffectationsMaterielsUpdate);
