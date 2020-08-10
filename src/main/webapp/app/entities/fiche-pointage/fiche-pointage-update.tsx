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
import { getEntity, updateEntity, createEntity, reset } from './fiche-pointage.reducer';
import { IFichePointage } from 'app/shared/model/fiche-pointage.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFichePointageUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FichePointageUpdate = (props: IFichePointageUpdateProps) => {
  const [projetId, setProjetId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fichePointageEntity, projets, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/fiche-pointage' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProjets();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.dateModif = convertDateTimeToServer(values.dateModif);

    if (errors.length === 0) {
      const entity = {
        ...fichePointageEntity,
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
          <h2 id="ibamApp.fichePointage.home.createOrEditLabel">
            <Translate contentKey="ibamApp.fichePointage.home.createOrEditLabel">Create or edit a FichePointage</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fichePointageEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="fiche-pointage-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="fiche-pointage-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateJourLabel" for="fiche-pointage-dateJour">
                  <Translate contentKey="ibamApp.fichePointage.dateJour">Date Jour</Translate>
                </Label>
                <AvField id="fiche-pointage-dateJour" type="date" className="form-control" name="dateJour" />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="fiche-pointage-userModif">
                  <Translate contentKey="ibamApp.fichePointage.userModif">User Modif</Translate>
                </Label>
                <AvField id="fiche-pointage-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="fiche-pointage-dateModif">
                  <Translate contentKey="ibamApp.fichePointage.dateModif">Date Modif</Translate>
                </Label>
                <AvInput
                  id="fiche-pointage-dateModif"
                  type="datetime-local"
                  className="form-control"
                  name="dateModif"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.fichePointageEntity.dateModif)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="fiche-pointage-projet">
                  <Translate contentKey="ibamApp.fichePointage.projet">Projet</Translate>
                </Label>
                <AvInput id="fiche-pointage-projet" type="select" className="form-control" name="projet.id">
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
              <Button tag={Link} id="cancel-save" to="/fiche-pointage" replace color="info">
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
  fichePointageEntity: storeState.fichePointage.entity,
  loading: storeState.fichePointage.loading,
  updating: storeState.fichePointage.updating,
  updateSuccess: storeState.fichePointage.updateSuccess,
});

const mapDispatchToProps = {
  getProjets,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FichePointageUpdate);
