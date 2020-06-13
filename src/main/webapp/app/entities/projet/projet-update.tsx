import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEntreprise } from 'app/shared/model/entreprise.model';
import { getEntities as getEntreprises } from 'app/entities/entreprise/entreprise.reducer';
import { IHoraire } from 'app/shared/model/horaire.model';
import { getEntities as getHoraires } from 'app/entities/horaire/horaire.reducer';
import { IDepot } from 'app/shared/model/depot.model';
import { getEntities as getDepots } from 'app/entities/depot/depot.reducer';
import { getEntity, updateEntity, createEntity, reset } from './projet.reducer';
import { IProjet } from 'app/shared/model/projet.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProjetUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProjetUpdate = (props: IProjetUpdateProps) => {
  const [entrepriseId, setEntrepriseId] = useState('0');
  const [horaireId, setHoraireId] = useState('0');
  const [depotId, setDepotId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { projetEntity, entreprises, horaires, depots, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/projet' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEntreprises();
    props.getHoraires();
    props.getDepots();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...projetEntity,
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
          <h2 id="ibamApp.projet.home.createOrEditLabel">
            <Translate contentKey="ibamApp.projet.home.createOrEditLabel">Create or edit a Projet</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : projetEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="projet-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="projet-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="referenceLabel" for="projet-reference">
                  <Translate contentKey="ibamApp.projet.reference">Reference</Translate>
                </Label>
                <AvField
                  id="projet-reference"
                  type="text"
                  name="reference"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="libelleLabel" for="projet-libelle">
                  <Translate contentKey="ibamApp.projet.libelle">Libelle</Translate>
                </Label>
                <AvField
                  id="projet-libelle"
                  type="text"
                  name="libelle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="projet-description">
                  <Translate contentKey="ibamApp.projet.description">Description</Translate>
                </Label>
                <AvField id="projet-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="dateDebutLabel" for="projet-dateDebut">
                  <Translate contentKey="ibamApp.projet.dateDebut">Date Debut</Translate>
                </Label>
                <AvField id="projet-dateDebut" type="date" className="form-control" name="dateDebut" />
              </AvGroup>
              <AvGroup>
                <Label id="dateFinLabel" for="projet-dateFin">
                  <Translate contentKey="ibamApp.projet.dateFin">Date Fin</Translate>
                </Label>
                <AvField id="projet-dateFin" type="date" className="form-control" name="dateFin" />
              </AvGroup>
              <AvGroup>
                <Label id="nbrEmployeLabel" for="projet-nbrEmploye">
                  <Translate contentKey="ibamApp.projet.nbrEmploye">Nbr Employe</Translate>
                </Label>
                <AvField id="projet-nbrEmploye" type="text" name="nbrEmploye" />
              </AvGroup>
              <AvGroup>
                <Label id="budgetLabel" for="projet-budget">
                  <Translate contentKey="ibamApp.projet.budget">Budget</Translate>
                </Label>
                <AvField id="projet-budget" type="text" name="budget" />
              </AvGroup>
              <AvGroup>
                <Label id="adresseLabel" for="projet-adresse">
                  <Translate contentKey="ibamApp.projet.adresse">Adresse</Translate>
                </Label>
                <AvField id="projet-adresse" type="text" name="adresse" />
              </AvGroup>
              <AvGroup>
                <Label id="villeLabel" for="projet-ville">
                  <Translate contentKey="ibamApp.projet.ville">Ville</Translate>
                </Label>
                <AvField id="projet-ville" type="text" name="ville" />
              </AvGroup>
              <AvGroup>
                <Label id="paysLabel" for="projet-pays">
                  <Translate contentKey="ibamApp.projet.pays">Pays</Translate>
                </Label>
                <AvField id="projet-pays" type="text" name="pays" />
              </AvGroup>
              {/* <AvGroup>
                <Label id="userModifLabel" for="projet-userModif">
                  <Translate contentKey="ibamApp.projet.userModif">User Modif</Translate>
                </Label>
                <AvField id="projet-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="projet-dateModif">
                  <Translate contentKey="ibamApp.projet.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="projet-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup> */}
              <AvGroup>
                <Label for="projet-entreprise">
                  <Translate contentKey="ibamApp.projet.entreprise">Entreprise</Translate>
                </Label>
                <AvInput id="projet-entreprise" type="select" className="form-control" name="entreprise.id">
                  <option value="" key="0" />
                  {entreprises
                    ? entreprises.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nomCommercial}
                        </option>

                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="projet-horaire">
                  <Translate contentKey="ibamApp.projet.horaire">Horaire</Translate>
                </Label>
                <AvInput id="projet-horaire" type="select" className="form-control" name="horaire.id">
                  <option value="" key="0" />
                  {horaires
                    ? horaires.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="projet-depot">
                  <Translate contentKey="ibamApp.projet.depot">Depot</Translate>
                </Label>
                <AvInput id="projet-depot" type="select" className="form-control" name="depot.id">
                  <option value="" key="0" />
                  {depots
                    ? depots.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/projet" replace color="info">
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
  entreprises: storeState.entreprise.entities,
  horaires: storeState.horaire.entities,
  depots: storeState.depot.entities,
  projetEntity: storeState.projet.entity,
  loading: storeState.projet.loading,
  updating: storeState.projet.updating,
  updateSuccess: storeState.projet.updateSuccess
});

const mapDispatchToProps = {
  getEntreprises,
  getHoraires,
  getDepots,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjetUpdate);
