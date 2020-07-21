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
import { IFichePointage } from 'app/shared/model/fiche-pointage.model';
import { getEntities as getFichePointages } from 'app/entities/fiche-pointage/fiche-pointage.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pointage.reducer';
import { IPointage } from 'app/shared/model/pointage.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPointageUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PointageUpdate = (props: IPointageUpdateProps) => {
  const [employeId, setEmployeId] = useState('0');
  const [fichePointageId, setFichePointageId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { pointageEntity, employes, fichePointages, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/pointage' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmployes();
    props.getFichePointages();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...pointageEntity,
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
          <h2 id="ibamApp.pointage.home.createOrEditLabel">
            <Translate contentKey="ibamApp.pointage.home.createOrEditLabel">Create or edit a Pointage</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : pointageEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="pointage-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="pointage-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateJourLabel" for="pointage-dateJour">
                  <Translate contentKey="ibamApp.pointage.dateJour">Date Jour</Translate>
                </Label>
                <AvField
                  id="pointage-dateJour"
                  type="date"
                  className="form-control"
                  name="dateJour"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="presenceMatinLabel">
                  <AvInput id="pointage-presenceMatin" type="checkbox" className="form-check-input" name="presenceMatin" />
                  <Translate contentKey="ibamApp.pointage.presenceMatin">Presence Matin</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="presenceAPMLabel">
                  <AvInput id="pointage-presenceAPM" type="checkbox" className="form-check-input" name="presenceAPM" />
                  <Translate contentKey="ibamApp.pointage.presenceAPM">Presence APM</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="nbrHeureSupLabel" for="pointage-nbrHeureSup">
                  <Translate contentKey="ibamApp.pointage.nbrHeureSup">Nbr Heure Sup</Translate>
                </Label>
                <AvField id="pointage-nbrHeureSup" type="text" name="nbrHeureSup" />
              </AvGroup>
              <AvGroup>
                <Label id="remarquesLabel" for="pointage-remarques">
                  <Translate contentKey="ibamApp.pointage.remarques">Remarques</Translate>
                </Label>
                <AvField id="pointage-remarques" type="text" name="remarques" />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="pointage-userModif">
                  <Translate contentKey="ibamApp.pointage.userModif">User Modif</Translate>
                </Label>
                <AvField id="pointage-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="pointage-dateModif">
                  <Translate contentKey="ibamApp.pointage.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="pointage-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="pointage-employe">
                  <Translate contentKey="ibamApp.pointage.employe">Employe</Translate>
                </Label>
                <AvInput id="pointage-employe" type="select" className="form-control" name="employe.id">
                  <option value="" key="0" />
                  {employes
                    ? employes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                           {otherEntity.prenom+""+otherEntity.nom+"("+otherEntity.matricule+")"}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="pointage-fichePointage">
                  <Translate contentKey="ibamApp.pointage.fichePointage">Fiche Pointage</Translate>
                </Label>
                <AvInput id="pointage-fichePointage" type="select" className="form-control" name="fichePointage.id">
                  <option value="" key="0" />
                  {fichePointages
                    ? fichePointages.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/pointage" replace color="info">
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
  fichePointages: storeState.fichePointage.entities,
  pointageEntity: storeState.pointage.entity,
  loading: storeState.pointage.loading,
  updating: storeState.pointage.updating,
  updateSuccess: storeState.pointage.updateSuccess,
});

const mapDispatchToProps = {
  getEmployes,
  getFichePointages,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PointageUpdate);
