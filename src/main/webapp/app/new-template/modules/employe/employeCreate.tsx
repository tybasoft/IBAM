import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, Storage, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEquipe } from 'app/shared/model/equipe.model';
import { getEntities as getEquipes } from 'app/entities/equipe/equipe.reducer';
import { IProjet } from 'app/shared/model/projet.model';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
import { IFonction } from 'app/shared/model/fonction.model';
import { getEntities as getFonctions } from 'app/entities/fonction/fonction.reducer';
import { IImage } from 'app/shared/model/image.model';
import {
  createEntity as createImageEntity,
  getEntity as getImageEntity,
  reset as resetImage,
  deleteEntity as deleteImageEntity,
  uploadImage,
  deleteImageFile
} from 'app/entities/image/image.reducer';
import { getEntity, updateEntity, createEntity, reset } from 'app/entities/employe/employe.reducer';
import { IEmploye } from 'app/shared/model/employe.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import _debounce from 'lodash.debounce';
import countries from '../../../../content/countries';
import * as Icon from 'react-feather';

// export interface IEmployeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeCreate = (props: any) => {
  const [localCountries, setlocalCountries] = useState(null);
  const [errorMessage, seterrorMessage] = useState('');
  const [imageID, setimageID] = useState(null);
  const [imageDeleted, setimageDeleted] = useState(false);
  const [imageFile, setimageFile] = useState(null);
  const [isNew, setIsNew] = useState(props.employeEntity === undefined);

  const { modalOpen, handleClose, employeEntity, equipes, projets, fonctions, loading, updating, imageEntity } = props;

  const validate = _debounce((value, ctx, input, cb) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    if (value && allowedExtensions.exec(value) == null) {
      cb(false);
      seterrorMessage(translate('entity.validation.imageFileType'));
    } else if (value && imageFile.size / Math.pow(1024, 2) > 10) {
      cb(false);
      seterrorMessage(translate('entity.validation.imageFileSize'));
    } else {
      cb(true);
    }
  }, 300);

  useEffect(() => {
    if (imageID !== null) {
      setTimeout(() => {
        props.deleteImageEntity(imageID);
      }, 1000);
    }
  }, [imageID]);

  //   const handleClose = () => {
  //     props.history.push('/employe' + props.location.search);
  //   };

  useEffect(() => {
    const locale = Storage.session.get('locale') === undefined ? 'fr' : Storage.session.get('locale');
    const locales = countries.filter(country => {
      return country.lng === locale;
    });
    locales.sort((a, b) => {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    setlocalCountries(locales);
  }, [Storage.session.get('locale')]);

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.resetImage();
      // props.getEntity(props.match.params.id);
    }

    props.getEquipes();
    props.getProjets();
    props.getFonctions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    if (employeEntity.id !== undefined) {
      if (employeEntity.image !== null) {
        props.getImageEntity(employeEntity.image.id);
      }
    }
  }, [employeEntity]);

  const uploadNewImage = values => {
    const storageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name);
    const image = {
      titre: values.matricule,
      path: storageName
    };
    const imageData = new FormData();
    imageData.append('file', imageFile);
    imageData.append('storageName', storageName);

    props.uploadImage(imageData);
    return image;
  };

  const saveEntity = (event, errors, values) => {
    let imageStorageName;
    let image;
    let entity;
    const imageData = new FormData();
    if (errors.length === 0) {
      entity = {
        ...employeEntity,
        ...values
      };

      if (isNew) {
        if (imageFile) {
          image = uploadNewImage(values);
          entity.image = image;
        }
        props.createEntity(entity);
      } else {
        if (employeEntity.image == null) {
          if (imageFile) {
            image = uploadNewImage(values);
            entity.image = image;
          }
          props.updateEntity(entity);
        } else if (imageDeleted) {
          entity.image = null;

          if (imageFile) {
            image = uploadNewImage(values);
            entity.image = image;
          }
          props.deleteImageFile(employeEntity.image.path.substr(24));
          setimageID(employeEntity.image.id);
          props.updateEntity(entity);
        } else {
          image = {
            id: employeEntity.image.id,
            titre: values.matricule,
            path: employeEntity.image.path.substr(27)
          };
          entity.image = image;

          if (imageFile) {
            (imageStorageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name)), (image.path = imageStorageName);
            entity.image = image;
            imageData.append('file', imageFile);
            imageData.append('storageName', imageStorageName);

            props.deleteImageFile(employeEntity.image.path.substr(24));
            props.uploadImage(imageData);
          }
          props.updateEntity(entity);
        }
      }
    }
  };

  return (
    <Modal isOpen={modalOpen} toggle={() => handleClose()} size="md">
      <ModalHeader toggle={() => handleClose()}>
        <Translate contentKey="ibamApp.projet.home.createLabel">Entreprises</Translate>
      </ModalHeader>
      {/* <AddTodo /> */}
      <AvForm model={isNew ? { nationalite: 'MA' } : employeEntity} onSubmit={saveEntity}>
        <ModalBody>
          <Row>
            <Col md={12}>
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
            </Col>{' '}
            <Col md={12}>
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
            </Col>{' '}
            <Col md={12}>
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
            </Col>{' '}
            <Col md={12}>
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
            </Col>{' '}
            <Col md={12}>
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
            </Col>{' '}
            <Col md={12}>
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
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="dateNaissanceLabel" for="employe-dateNaissance">
                  <Translate contentKey="ibamApp.employe.dateNaissance">Date Naissance</Translate>
                </Label>
                <AvField id="employe-dateNaissance" type="date" className="form-control" name="dateNaissance" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="lieuNaissanceLabel" for="employe-lieuNaissance">
                  <Translate contentKey="ibamApp.employe.lieuNaissance">Lieu Naissance</Translate>
                </Label>
                <AvField id="employe-lieuNaissance" type="text" name="lieuNaissance" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="situationFamLabel" for="employe-situationFam">
                  <Translate contentKey="ibamApp.employe.situationFam">Situation Fam</Translate>
                </Label>
                <AvField id="employe-situationFam" type="text" name="situationFam" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="nationaliteLabel" for="employe-nationalite">
                  <Translate contentKey="ibamApp.employe.nationalite">Nationalite</Translate>
                </Label>
                <AvInput id="employe-nationalite" type="select" className="form-control" name="nationalite">
                  <option value="" key="0" />
                  {localCountries
                    ? localCountries.map(country => (
                        <option value={country.code} key={country.code}>
                          {country.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
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
            </Col>{' '}
            <Col md={12}>
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
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="emailLabel" for="employe-email">
                  <Translate contentKey="ibamApp.employe.email">Email</Translate>
                </Label>
                <AvField id="employe-email" type="text" name="email" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="adresseLabel" for="employe-adresse">
                  <Translate contentKey="ibamApp.employe.adresse">Adresse</Translate>
                </Label>
                <AvField id="employe-adresse" type="text" name="adresse" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="divisionLabel" for="employe-division">
                  <Translate contentKey="ibamApp.employe.division">Division</Translate>
                </Label>
                <AvField id="employe-division" type="text" name="division" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
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
            </Col>{' '}
            <Col md={12}>
              <AvGroup check>
                <Label id="multiPorjetLabel">
                  <AvInput id="employe-multiPorjet" type="checkbox" className="form-check-input" name="multiPorjet" />
                  <Translate contentKey="ibamApp.employe.multiPorjet">Multi Porjet</Translate>
                </Label>
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="dateDepartLabel" for="employe-dateDepart">
                  <Translate contentKey="ibamApp.employe.dateDepart">Date Depart</Translate>
                </Label>
                <AvField id="employe-dateDepart" type="date" className="form-control" name="dateDepart" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="motifDepartLabel" for="employe-motifDepart">
                  <Translate contentKey="ibamApp.employe.motifDepart">Motif Depart</Translate>
                </Label>
                <AvField id="employe-motifDepart" type="text" name="motifDepart" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
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
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label for="employe-equipe">
                  <Translate contentKey="ibamApp.employe.equipe">Equipe</Translate>
                </Label>
                <AvInput id="employe-equipe" type="select" className="form-control" name="equipe.id">
                  <option value="" key="0" />
                  {equipes
                    ? equipes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label for="employe-fonction">
                  <Translate contentKey="ibamApp.employe.fonction">Fonction</Translate>
                </Label>
                <AvInput id="employe-fonction" type="select" className="form-control" name="fonction.id">
                  <option value="" key="0" />
                  {fonctions
                    ? fonctions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label>
                  <Translate contentKey="ibamApp.employe.image">Image</Translate>
                </Label>
                {!isNew ? (
                  <div>
                    <dd>
                      {!imageDeleted && employeEntity.image !== null && imageEntity.path !== undefined ? (
                        <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '300px', border: 'solid 1px' }} />
                      ) : null}
                    </dd>
                    <dd>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => setimageDeleted(true)}
                        disabled={imageDeleted || employeEntity.image == null}
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </dd>
                  </div>
                ) : null}
                <AvInput
                  id="employe-image"
                  type="file"
                  name="imageFile"
                  accept=".png, .jpg, .jpeg"
                  validate={{ async: validate }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setimageFile(event.target.files[0])}
                  style={{ opacity: '0', position: 'absolute', height: '0px' }}
                />
                <div className="form-group" style={{ marginBottom: '-10px' }}>
                  <Label for="employe-image" className="btn btn-secondary">
                    {translate('entity.inputImageFile')}
                  </Label>
                  <Label className="p-2">
                    {imageFile !== null && imageFile !== undefined ? imageFile.name : translate('entity.noFileChoosed')}
                  </Label>
                </div>
                <AvFeedback>{errorMessage}</AvFeedback>
              </AvGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          {/* <div className="form-actions"> */}
          <Button onClick={() => handleClose()} color="warning" className="mr-1" type="button">
            <Icon.X size={16} className="mr-2" color="#FFF" />
            <Translate contentKey="entity.action.cancel">Entreprises</Translate>
          </Button>
          <Button color="primary" type="submit">
            <Icon.CheckSquare size={16} className="mr-2" color="#FFF" />
            <Translate contentKey="entity.action.save">Entreprises</Translate>
          </Button>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  equipes: storeState.equipe.entities,
  projets: storeState.projet.entities,
  fonctions: storeState.fonction.entities,
  //   employeEntity: storeState.employe.entity,
  loading: storeState.employe.loading,
  updating: storeState.employe.updating,
  updateSuccess: storeState.employe.updateSuccess,
  imageEntity: storeState.image.entity,
  errorUpload: storeState.image.errorUpload,
  uploadSuccess: storeState.image.uploadSuccess
});

const mapDispatchToProps = {
  getEquipes,
  getProjets,
  getFonctions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
  createImageEntity,
  uploadImage,
  getImageEntity,
  resetImage,
  deleteImageFile,
  deleteImageEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeCreate);
