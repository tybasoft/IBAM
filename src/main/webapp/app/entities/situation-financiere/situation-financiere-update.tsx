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
import { getEntity, updateEntity, createEntity, reset } from './situation-financiere.reducer';
import { ISituationFinanciere } from 'app/shared/model/situation-financiere.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISituationFinanciereUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}


export const SituationFinanciereUpdate = (props: ISituationFinanciereUpdateProps) => {
  const [projetId, setProjetId] = useState('0');

  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { situationFinanciereEntity, projets, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/situation-financiere' + props.location.search);
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
    if (errors.length === 0) {
      const entity = {
        ...situationFinanciereEntity,
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
          <h2 id="ibamApp.situationFinanciere.home.createOrEditLabel">
            <Translate contentKey="ibamApp.situationFinanciere.home.createOrEditLabel">Create or edit a SituationFinanciere</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : situationFinanciereEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="situation-financiere-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="situation-financiere-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="montantFactureLabel" for="situation-financiere-montantFacture">
                  <Translate contentKey="ibamApp.situationFinanciere.montantFacture">Montant Facture</Translate>
                </Label>
                <AvField
                  id="situation-financiere-montantFacture"
                  type="text"
                  name="montantFacture"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              {isNew ? (
                <AvGroup>
                  <Label id="dateFacturationLabel" for="situation-financiere-dateFacturation">
                    <Translate contentKey="ibamApp.situationFinanciere.dateFacturation">Date Facturation</Translate>
                  </Label>
                  <AvField
                    id="situation-financiere-dateFacturation"
                    type="date"
                    className="form-control"
                    name="dateFacturation"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                    }}
                  />
                </AvGroup>
              ) : null}
              {!isNew ? (
                <AvGroup>
                  <Label id="dateFacturationLabel" for="situation-financiere-dateFacturation">
                    <Translate contentKey="ibamApp.situationFinanciere.dateFacturation">Date Facturation</Translate>
                  </Label>
                  <AvField
                    id="situation-financiere-dateFacturation"
                    type="date"
                    className="form-control"
                    name="dateFacturation"
                    readOnly
                  />
                </AvGroup>
              ) : null}
              {!isNew ? (
                <AvGroup>
                  <Label id="montantEnCoursLabel" for="situation-financiere-montantEnCours">
                    <Translate contentKey="ibamApp.situationFinanciere.montantEnCours">Montant En Cours</Translate>
                  </Label>
                  <AvField id="situation-financiere-montantEnCours" type="text" name="montantEnCours" readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="situation-financiere-projet">
                  <Translate contentKey="ibamApp.situationFinanciere.projet">Projet</Translate>
                </Label>
                <AvInput id="situation-financiere-projet" type="select" className="form-control" name="projet.id">
                  <option value="" key="0" />
                  {projets
                    ? projets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.libelle}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/situation-financiere" replace color="info">
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
  situationFinanciereEntity: storeState.situationFinanciere.entity,
  loading: storeState.situationFinanciere.loading,
  updating: storeState.situationFinanciere.updating,
  updateSuccess: storeState.situationFinanciere.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(SituationFinanciereUpdate);

