import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEquipe } from 'app/shared/model/equipe.model';
import { getEntities as getEquipes } from 'app/entities/equipe/equipe.reducer';
import { IProjet } from 'app/shared/model/projet.model';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
import { IFonction } from 'app/shared/model/fonction.model';
import { getEntities as getFonctions } from 'app/entities/fonction/fonction.reducer';
import { IImage } from 'app/shared/model/image.model';
import { getEntities as getImages } from 'app/entities/image/image.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employe.reducer';
import { IEmploye } from 'app/shared/model/employe.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeUpdate = (props: IEmployeUpdateProps) => {
  const [employeId, setEmployeId] = useState('0');
  const [equipeId, setEquipeId] = useState('0');
  const [projetId, setProjetId] = useState('0');
  const [fonctionId, setFonctionId] = useState('0');
  const [imageId, setImageId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeEntity, equipes, projets, fonctions, images, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employe' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEquipes();
    props.getProjets();
    props.getFonctions();
    props.getImages();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...employeEntity,
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
          <h2 id="ibamApp.employe.home.createOrEditLabel">
            <Translate contentKey="ibamApp.employe.home.createOrEditLabel">Create or edit a Employe</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employe-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employe-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomLabel" for="employe-nom">
                  <Translate contentKey="ibamApp.employe.nom">Nom</Translate>
                </Label>
                <AvField
                  id="employe-nom"
                  type="text"
                  name="nom"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="prenomLabel" for="employe-prenom">
                  <Translate contentKey="ibamApp.employe.prenom">Prenom</Translate>
                </Label>
                <AvField
                  id="employe-prenom"
                  type="text"
                  name="prenom"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="matriculeLabel" for="employe-matricule">
                  <Translate contentKey="ibamApp.employe.matricule">Matricule</Translate>
                </Label>
                <AvField
                  id="employe-matricule"
                  type="text"
                  name="matricule"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="cinLabel" for="employe-cin">
                  <Translate contentKey="ibamApp.employe.cin">Cin</Translate>
                </Label>
                <AvField
                  id="employe-cin"
                  type="text"
                  name="cin"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="sexeLabel" for="employe-sexe">
                  <Translate contentKey="ibamApp.employe.sexe">Sexe</Translate>
                </Label>
                <AvInput id="employe-sexe" type="select" className="form-control" name="sexe">
                  <option value="" key="0">
                    chisir Sexe....
                  </option>
                  <option value="Homme" key="1">
                    Homme
                  </option>
                  <option value="Femme" key="2">
                    Femme
                  </option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="tarifJournalierLabel" for="employe-tarifJournalier">
                  <Translate contentKey="ibamApp.employe.tarifJournalier">Tarif Journalier</Translate>
                </Label>
                <AvField
                  id="employe-tarifJournalier"
                  type="text"
                  name="tarifJournalier"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateNaissanceLabel" for="employe-dateNaissance">
                  <Translate contentKey="ibamApp.employe.dateNaissance">Date Naissance</Translate>
                </Label>
                <AvField id="employe-dateNaissance" type="date" className="form-control" name="dateNaissance" />
              </AvGroup>
              <AvGroup>
                <Label id="lieuNaissanceLabel" for="employe-lieuNaissance">
                  <Translate contentKey="ibamApp.employe.lieuNaissance">Lieu Naissance</Translate>
                </Label>
                <AvField id="employe-lieuNaissance" type="text" name="lieuNaissance" />
              </AvGroup>
              <AvGroup>
                <Label id="situationFamLabel" for="employe-situationFam">
                  <Translate contentKey="ibamApp.employe.situationFam">Situation Fam</Translate>
                </Label>
                <AvField id="employe-situationFam" type="text" name="situationFam" />
              </AvGroup>
              <AvGroup>
                <Label id="nationaliteLabel" for="employe-nationalite">
                  <Translate contentKey="ibamApp.employe.nationalite">Nationalite</Translate>
                </Label>
                <AvField id="employe-nationalite" type="text" name="nationalite" />
              </AvGroup>
              <AvGroup>
                <Label id="dateEntreeLabel" for="employe-dateEntree">
                  <Translate contentKey="ibamApp.employe.dateEntree">Date Entree</Translate>
                </Label>
                <AvField
                  id="employe-dateEntree"
                  type="date"
                  className="form-control"
                  name="dateEntree"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="telLabel" for="employe-tel">
                  <Translate contentKey="ibamApp.employe.tel">Tel</Translate>
                </Label>
                <AvField
                  id="employe-tel"
                  type="text"
                  name="tel"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="employe-email">
                  <Translate contentKey="ibamApp.employe.email">Email</Translate>
                </Label>
                <AvField id="employe-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="adresseLabel" for="employe-adresse">
                  <Translate contentKey="ibamApp.employe.adresse">Adresse</Translate>
                </Label>
                <AvField id="employe-adresse" type="text" name="adresse" />
              </AvGroup>
              <AvGroup>
                <Label id="divisionLabel" for="employe-division">
                  <Translate contentKey="ibamApp.employe.division">Division</Translate>
                </Label>
                <AvField id="employe-division" type="text" name="division" />
              </AvGroup>
              <AvGroup>
                <Label id="typeContratLabel" for="employe-typeContrat">
                  <Translate contentKey="ibamApp.employe.typeContrat">Type Contrat</Translate>
                </Label>
                <AvInput id="employe-typeContrat" type="select" className="form-control" name="typeContrat">
                  <option value="" key="0">
                    Choisir Type Contrat....
                  </option>
                  <option value="CDD" key="1">
                    CDD
                  </option>
                  <option value="CDI" key="2">
                    CDI
                  </option>
                  <option value="SST" key="3">
                    SST
                  </option>
                </AvInput>
              </AvGroup>
              <AvGroup check>
                <Label id="multiPorjetLabel">
                  <AvInput id="employe-multiPorjet" type="checkbox" className="form-check-input" name="multiPorjet" />
                  <Translate contentKey="ibamApp.employe.multiPorjet">Multi Porjet</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="dateDepartLabel" for="employe-dateDepart">
                  <Translate contentKey="ibamApp.employe.dateDepart">Date Depart</Translate>
                </Label>
                <AvField id="employe-dateDepart" type="date" className="form-control" name="dateDepart" />
              </AvGroup>
              <AvGroup>
                <Label id="motifDepartLabel" for="employe-motifDepart">
                  <Translate contentKey="ibamApp.employe.motifDepart">Motif Depart</Translate>
                </Label>
                <AvField id="employe-motifDepart" type="text" name="motifDepart" />
              </AvGroup>
              {/*
              <AvGroup>
                <Label id="userModifLabel" for="employe-userModif">
                  <Translate contentKey="ibamApp.employe.userModif">User Modif</Translate>
                </Label>
                <AvField id="employe-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="employe-dateModif">
                  <Translate contentKey="ibamApp.employe.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="employe-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              */}
              <AvGroup>
                <Label for="employe-projet">
                  <Translate contentKey="ibamApp.employe.projet">Projet</Translate>
                </Label>
                <AvInput id="employe-projet" type="select" className="form-control" name="projet.id">
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
                <Label for="employe-equipe">
                  <Translate contentKey="ibamApp.employe.equipe">Equipe</Translate>
                </Label>
                <AvInput id="employe-equipe" type="select" className="form-control" name="equipe.id">
                  <option value="" key="0" />
                  {equipes
                    ? equipes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employe-fonction">
                  <Translate contentKey="ibamApp.employe.fonction">Fonction</Translate>
                </Label>
                <AvInput id="employe-fonction" type="select" className="form-control" name="fonction.id">
                  <option value="" key="0" />
                  {fonctions
                    ? fonctions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employe-image">
                  <Translate contentKey="ibamApp.employe.image">Image</Translate>
                </Label>
                <AvInput id="employe-image" type="select" className="form-control" name="image.id">
                  <option value="" key="0" />
                  {images
                    ? images.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/employe" replace color="info">
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
  equipes: storeState.equipe.entities,
  projets: storeState.projet.entities,
  fonctions: storeState.fonction.entities,
  images: storeState.image.entities,
  employeEntity: storeState.employe.entity,
  loading: storeState.employe.loading,
  updating: storeState.employe.updating,
  updateSuccess: storeState.employe.updateSuccess
});

const mapDispatchToProps = {
  getEquipes,
  getProjets,
  getFonctions,
  getImages,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeUpdate);
