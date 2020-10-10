import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmploye } from 'app/shared/model/employe.model';
import { getEntities as getEmployes } from 'app/entities/employe/employe.reducer';
import { getEntity, updateEntity, createEntity, reset } from './planification.reducer';
import { IPlanification } from 'app/shared/model/planification.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlanificationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlanificationUpdate = (props: IPlanificationUpdateProps) => {
  const [idsemploye, setIdsemploye] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { planificationEntity, employes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/planification' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmployes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.date_debut = convertDateTimeToServer(values.date_debut);
    values.date_fin = convertDateTimeToServer(values.date_fin);

    if (errors.length === 0) {
      const entity = {
        ...planificationEntity,
        ...values,
        employes: mapIdList(values.employes),
      };

      if (isNew) {
        props.createEntity(entity);
        console.log(entity)
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ibamApp.planification.home.createOrEditLabel">
            <Translate contentKey="ibamApp.planification.home.createOrEditLabel">Create or edit a Planification</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : planificationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="planification-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="planification-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nom_tacheLabel" for="planification-nom_tache">
                  <Translate contentKey="ibamApp.planification.nom_tache">Nom Tache</Translate>
                </Label>
                <AvField id="planification-nom_tache" type="text" name="nom_tache" />
              </AvGroup>
              <AvGroup>
                <Label id="description_tacheLabel" for="planification-description_tache">
                  <Translate contentKey="ibamApp.planification.description_tache">Description Tache</Translate>
                </Label>
                <AvField id="planification-description_tache" type="text" name="description_tache" />
              </AvGroup>
              <AvGroup>
                <Label id="date_debutLabel" for="planification-date_debut">
                  <Translate contentKey="ibamApp.planification.date_debut">Date Debut</Translate>
                </Label>
                <AvInput
                  id="planification-date_debut"
                  type="datetime-local"
                  className="form-control"
                  name="date_debut"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.planificationEntity.date_debut)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="date_finLabel" for="planification-date_fin">
                  <Translate contentKey="ibamApp.planification.date_fin">Date Fin</Translate>
                </Label>
                <AvInput
                  id="planification-date_fin"
                  type="datetime-local"
                  className="form-control"
                  name="date_fin"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.planificationEntity.date_fin)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="planification-employe">
                  <Translate contentKey="ibamApp.planification.employe">Employe</Translate>
                </Label>
                <AvInput
                  id="planification-employe"
                  type="select"
                  multiple
                  className="form-control"
                  name="employes"
                  value={planificationEntity.employes && planificationEntity.employes.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {employes
                    ? employes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/planification" replace color="info">
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
  employes: storeState.employe.entities,
  planificationEntity: storeState.planification.entity,
  loading: storeState.planification.loading,
  updating: storeState.planification.updating,
  updateSuccess: storeState.planification.updateSuccess,
});

const mapDispatchToProps = {
  getEmployes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlanificationUpdate);
