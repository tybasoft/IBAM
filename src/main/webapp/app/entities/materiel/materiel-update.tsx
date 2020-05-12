import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFamille } from 'app/shared/model/famille.model';
import { getEntities as getFamilles } from 'app/entities/famille/famille.reducer';
import { ITypeMateriel } from 'app/shared/model/type-materiel.model';
import { getEntities as getTypeMateriels } from 'app/entities/type-materiel/type-materiel.reducer';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { getEntities as getFournisseurs } from 'app/entities/fournisseur/fournisseur.reducer';
import { IMarque } from 'app/shared/model/marque.model';
import { getEntities as getMarques } from 'app/entities/marque/marque.reducer';
import { IDocument } from 'app/shared/model/document.model';
import { getEntities as getDocuments } from 'app/entities/document/document.reducer';
import { IEmploye } from 'app/shared/model/employe.model';
import { getEntities as getEmployes } from 'app/entities/employe/employe.reducer';
import { IImage } from 'app/shared/model/image.model';
import { getEntities as getImages } from 'app/entities/image/image.reducer';
import { getEntity, updateEntity, createEntity, reset } from './materiel.reducer';
import { IMateriel } from 'app/shared/model/materiel.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMaterielUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MaterielUpdate = (props: IMaterielUpdateProps) => {
  const [familleId, setFamilleId] = useState('0');
  const [typeMaterielId, setTypeMaterielId] = useState('0');
  const [fournisseurId, setFournisseurId] = useState('0');
  const [marqueId, setMarqueId] = useState('0');
  const [documentId, setDocumentId] = useState('0');
  const [employeId, setEmployeId] = useState('0');
  const [imageId, setImageId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { materielEntity, familles, typeMateriels, fournisseurs, marques, documents, employes, images, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/materiel' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getFamilles();
    props.getTypeMateriels();
    props.getFournisseurs();
    props.getMarques();
    props.getDocuments();
    props.getEmployes();
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
        ...materielEntity,
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
          <h2 id="ibamApp.materiel.home.createOrEditLabel">
            <Translate contentKey="ibamApp.materiel.home.createOrEditLabel">Create or edit a Materiel</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : materielEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="materiel-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="materiel-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="libelleLabel" for="materiel-libelle">
                  <Translate contentKey="ibamApp.materiel.libelle">Libelle</Translate>
                </Label>
                <AvField
                  id="materiel-libelle"
                  type="text"
                  name="libelle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="matriculeLabel" for="materiel-matricule">
                  <Translate contentKey="ibamApp.materiel.matricule">Matricule</Translate>
                </Label>
                <AvField id="materiel-matricule" type="text" name="matricule" />
              </AvGroup>
              <AvGroup>
                <Label id="modeleLabel" for="materiel-modele">
                  <Translate contentKey="ibamApp.materiel.modele">Modele</Translate>
                </Label>
                <AvField id="materiel-modele" type="text" name="modele" />
              </AvGroup>
              <AvGroup>
                <Label id="numCarteGriseLabel" for="materiel-numCarteGrise">
                  <Translate contentKey="ibamApp.materiel.numCarteGrise">Num Carte Grise</Translate>
                </Label>
                <AvField
                  id="materiel-numCarteGrise"
                  type="text"
                  name="numCarteGrise"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateIdentificationLabel" for="materiel-dateIdentification">
                  <Translate contentKey="ibamApp.materiel.dateIdentification">Date Identification</Translate>
                </Label>
                <AvField id="materiel-dateIdentification" type="date" className="form-control" name="dateIdentification" />
              </AvGroup>
              <AvGroup>
                <Label id="compteurAchatLabel" for="materiel-compteurAchat">
                  <Translate contentKey="ibamApp.materiel.compteurAchat">Compteur Achat</Translate>
                </Label>
                <AvField id="materiel-compteurAchat" type="text" name="compteurAchat" />
              </AvGroup>
              <AvGroup>
                <Label id="etatLabel" for="materiel-etat">
                  <Translate contentKey="ibamApp.materiel.etat">Etat</Translate>
                </Label>
                <AvField id="materiel-etat" type="text" name="etat" />
              </AvGroup>
              <AvGroup check>
                <Label id="locationLabel">
                  <AvInput id="materiel-location" type="checkbox" className="form-check-input" name="location" />
                  <Translate contentKey="ibamApp.materiel.location">Location</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="materiel-description">
                  <Translate contentKey="ibamApp.materiel.description">Description</Translate>
                </Label>
                <AvField id="materiel-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="materiel-userModif">
                  <Translate contentKey="ibamApp.materiel.userModif">User Modif</Translate>
                </Label>
                <AvField id="materiel-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="materiel-dateModif">
                  <Translate contentKey="ibamApp.materiel.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="materiel-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="materiel-famille">
                  <Translate contentKey="ibamApp.materiel.famille">Famille</Translate>
                </Label>
                <AvInput id="materiel-famille" type="select" className="form-control" name="famille.id">
                  <option value="" key="0" />
                  {familles
                    ? familles.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="materiel-typeMateriel">
                  <Translate contentKey="ibamApp.materiel.typeMateriel">Type Materiel</Translate>
                </Label>
                <AvInput id="materiel-typeMateriel" type="select" className="form-control" name="typeMateriel.id">
                  <option value="" key="0" />
                  {typeMateriels
                    ? typeMateriels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="materiel-fournisseur">
                  <Translate contentKey="ibamApp.materiel.fournisseur">Fournisseur</Translate>
                </Label>
                <AvInput id="materiel-fournisseur" type="select" className="form-control" name="fournisseur.id">
                  <option value="" key="0" />
                  {fournisseurs
                    ? fournisseurs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="materiel-marque">
                  <Translate contentKey="ibamApp.materiel.marque">Marque</Translate>
                </Label>
                <AvInput id="materiel-marque" type="select" className="form-control" name="marque.id">
                  <option value="" key="0" />
                  {marques
                    ? marques.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="materiel-document">
                  <Translate contentKey="ibamApp.materiel.document">Document</Translate>
                </Label>
                <AvInput id="materiel-document" type="select" className="form-control" name="document.id">
                  <option value="" key="0" />
                  {documents
                    ? documents.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="materiel-employe">
                  <Translate contentKey="ibamApp.materiel.employe">Employe</Translate>
                </Label>
                <AvInput id="materiel-employe" type="select" className="form-control" name="employe.id">
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
              <AvGroup>
                <Label for="materiel-image">
                  <Translate contentKey="ibamApp.materiel.image">Image</Translate>
                </Label>
                <AvInput id="materiel-image" type="select" className="form-control" name="image.id">
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
              <Button tag={Link} id="cancel-save" to="/materiel" replace color="info">
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
  familles: storeState.famille.entities,
  typeMateriels: storeState.typeMateriel.entities,
  fournisseurs: storeState.fournisseur.entities,
  marques: storeState.marque.entities,
  documents: storeState.document.entities,
  employes: storeState.employe.entities,
  images: storeState.image.entities,
  materielEntity: storeState.materiel.entity,
  loading: storeState.materiel.loading,
  updating: storeState.materiel.updating,
  updateSuccess: storeState.materiel.updateSuccess
});

const mapDispatchToProps = {
  getFamilles,
  getTypeMateriels,
  getFournisseurs,
  getMarques,
  getDocuments,
  getEmployes,
  getImages,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MaterielUpdate);
