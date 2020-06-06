import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './horaire.reducer';
import { IHoraire } from 'app/shared/model/horaire.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHoraireUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const HoraireUpdate = (props: IHoraireUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { horaireEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/horaire');
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
        ...horaireEntity,
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
          <h2 id="ibamApp.horaire.home.createOrEditLabel">
            <Translate contentKey="ibamApp.horaire.home.createOrEditLabel">Create or edit a Horaire</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : horaireEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="horaire-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="horaire-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="libelleLabel" for="horaire-libelle">
                  <Translate contentKey="ibamApp.horaire.libelle">Libelle</Translate>
                </Label>
                <AvField
                  id="horaire-libelle"
                  type="text"
                  name="libelle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nbrHeurParJrLabel" for="horaire-nbrHeurParJr">
                  <Translate contentKey="ibamApp.horaire.nbrHeurParJr">Nbr Heur Par Jr</Translate>
                </Label>
                <AvField
                  id="horaire-nbrHeurParJr"
                  type="text"
                  name="nbrHeurParJr"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nbrJourParSemLabel" for="horaire-nbrJourParSem">
                  <Translate contentKey="ibamApp.horaire.nbrJourParSem">Nbr Jour Par Sem</Translate>
                </Label>
                <AvField
                  id="horaire-nbrJourParSem"
                  type="text"
                  name="nbrJourParSem"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="heureDebutJrLabel" for="horaire-heureDebutJr">
                  <Translate contentKey="ibamApp.horaire.heureDebutJr">Heure Debut Jr</Translate>
                </Label>
                <AvField id="horaire-heureDebutJr" type="text" name="heureDebutJr" />
              </AvGroup>
              <AvGroup>
                <Label id="heureFinJrLabel" for="horaire-heureFinJr">
                  <Translate contentKey="ibamApp.horaire.heureFinJr">Heure Fin Jr</Translate>
                </Label>
                <AvField id="horaire-heureFinJr" type="text" name="heureFinJr" />
              </AvGroup>
              <AvGroup>
                <Label id="dureePauseLabel" for="horaire-dureePause">
                  <Translate contentKey="ibamApp.horaire.dureePause">Duree Pause</Translate>
                </Label>
                <AvField id="horaire-dureePause" type="text" name="dureePause" />
              </AvGroup>
              {/* <AvGroup>
                <Label id="userModifLabel" for="horaire-userModif">
                  <Translate contentKey="ibamApp.horaire.userModif">User Modif</Translate>
                </Label>
                <AvField id="horaire-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="horaire-dateModif">
                  <Translate contentKey="ibamApp.horaire.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="horaire-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup> */}
              <Button tag={Link} id="cancel-save" to="/horaire" replace color="info">
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
  horaireEntity: storeState.horaire.entity,
  loading: storeState.horaire.loading,
  updating: storeState.horaire.updating,
  updateSuccess: storeState.horaire.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HoraireUpdate);
