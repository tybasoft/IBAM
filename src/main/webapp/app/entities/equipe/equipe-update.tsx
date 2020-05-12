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
import { IProjet } from 'app/shared/model/projet.model';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
import { getEntity, updateEntity, createEntity, reset } from './equipe.reducer';
import { IEquipe } from 'app/shared/model/equipe.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEquipeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EquipeUpdate = (props: IEquipeUpdateProps) => {
  const [employeId, setEmployeId] = useState('0');
  const [equipeId, setEquipeId] = useState('0');
  const [projetId, setProjetId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { equipeEntity, employes, projets, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/equipe' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmployes();
    props.getProjets();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...equipeEntity,
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
          <h2 id="ibamApp.equipe.home.createOrEditLabel">
            <Translate contentKey="ibamApp.equipe.home.createOrEditLabel">Create or edit a Equipe</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : equipeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="equipe-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="equipe-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="libelleLabel" for="equipe-libelle">
                  <Translate contentKey="ibamApp.equipe.libelle">Libelle</Translate>
                </Label>
                <AvField
                  id="equipe-libelle"
                  type="text"
                  name="libelle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="equipe-userModif">
                  <Translate contentKey="ibamApp.equipe.userModif">User Modif</Translate>
                </Label>
                <AvField id="equipe-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="equipe-dateModif">
                  <Translate contentKey="ibamApp.equipe.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="equipe-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="equipe-projet">
                  <Translate contentKey="ibamApp.equipe.projet">Projet</Translate>
                </Label>
                <AvInput id="equipe-projet" type="select" className="form-control" name="projet.id">
                  <option value="" key="0" />
                  {projets
                    ? projets.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="equipe-equipe">
                  <Translate contentKey="ibamApp.equipe.equipe">Equipe</Translate>
                </Label>
                <AvInput id="equipe-equipe" type="select" className="form-control" name="equipe.id">
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
              <Button tag={Link} id="cancel-save" to="/equipe" replace color="info">
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
  projets: storeState.projet.entities,
  equipeEntity: storeState.equipe.entity,
  loading: storeState.equipe.loading,
  updating: storeState.equipe.updating,
  updateSuccess: storeState.equipe.updateSuccess
});

const mapDispatchToProps = {
  getEmployes,
  getProjets,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EquipeUpdate);
