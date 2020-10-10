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
import { getEntity, updateEntity, createEntity, reset } from './paie.reducer';
import { IPaie } from 'app/shared/model/paie.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPaieUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaieUpdate = (props: IPaieUpdateProps) => {
  const [employeId, setEmployeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { paieEntity, employes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/paie' + props.location.search);
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
    if (errors.length === 0) {
      const entity = {
        ...paieEntity,
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
          <h2 id="ibamApp.paie.home.createOrEditLabel">
            <Translate contentKey="ibamApp.paie.home.createOrEditLabel">Create or edit a Paie</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : paieEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="paie-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="paie-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="datePaiementLabel" for="paie-datePaiement">
                  <Translate contentKey="ibamApp.paie.datePaiement">Date Paiement</Translate>
                </Label>
                <AvField
                  id="paie-datePaiement"
                  type="date"
                  className="form-control"
                  name="datePaiement"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nbrJourTravailLabel" for="paie-nbrJourTravail">
                  <Translate contentKey="ibamApp.paie.nbrJourTravail">Nbr Jour Travail</Translate>
                </Label>
                <AvField
                  id="paie-nbrJourTravail"
                  type="text"
                  name="nbrJourTravail"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="montantPayLabel" for="paie-montantPay">
                  <Translate contentKey="ibamApp.paie.montantPay">Montant Pay</Translate>
                </Label>
                <AvField
                  id="paie-montantPay"
                  type="text"
                  name="montantPay"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nbrHeurSupLabel" for="paie-nbrHeurSup">
                  <Translate contentKey="ibamApp.paie.nbrHeurSup">Nbr Heur Sup</Translate>
                </Label>
                <AvField id="paie-nbrHeurSup" type="text" name="nbrHeurSup" />
              </AvGroup>
              <AvGroup>
                <Label id="dateDebutLabel" for="paie-dateDebut">
                  <Translate contentKey="ibamApp.paie.dateDebut">Date Debut</Translate>
                </Label>
                <AvField id="paie-dateDebut" type="date" className="form-control" name="dateDebut" />
              </AvGroup>
              <AvGroup>
                <Label id="dateFinLabel" for="paie-dateFin">
                  <Translate contentKey="ibamApp.paie.dateFin">Date Fin</Translate>
                </Label>
                <AvField id="paie-dateFin" type="date" className="form-control" name="dateFin" />
              </AvGroup>
              <AvGroup>
                <Label id="remarquesLabel" for="paie-remarques">
                  <Translate contentKey="ibamApp.paie.remarques">Remarques</Translate>
                </Label>
                <AvField id="paie-remarques" type="text" name="remarques" />
              </AvGroup>
              {/* <AvGroup>
                <Label id="userModifLabel" for="paie-userModif">
                  <Translate contentKey="ibamApp.paie.userModif">User Modif</Translate>
                </Label>
                <AvField id="paie-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="paie-dateModif">
                  <Translate contentKey="ibamApp.paie.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="paie-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup> */}
              <AvGroup>
                <Label for="paie-employe">
                  <Translate contentKey="ibamApp.paie.employe">Employe</Translate>
                </Label>
                <AvInput id="paie-employe" type="select" className="form-control" name="employe.id">
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
              <Button tag={Link} id="cancel-save" to="/paie" replace color="info">
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
  paieEntity: storeState.paie.entity,
  loading: storeState.paie.loading,
  updating: storeState.paie.updating,
  updateSuccess: storeState.paie.updateSuccess
});

const mapDispatchToProps = {
  getEmployes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaieUpdate);
