import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileArchive, faFileCsv, faFileExcel, faFileWord, faFileAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import { IRootState } from 'app/shared/reducers';
import { IProjet } from 'app/shared/model/projet.model';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
import { IFamille } from 'app/shared/model/famille.model';
import { getEntities as getFamilles } from 'app/entities/famille/famille.reducer';
import { ITypeMateriel } from 'app/shared/model/type-materiel.model';
import { getEntities as getTypeMateriels } from 'app/entities/type-materiel/type-materiel.reducer';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { getEntities as getFournisseurs } from 'app/entities/fournisseur/fournisseur.reducer';
import { IMarque } from 'app/shared/model/marque.model';
import { getEntities as getMarques } from 'app/entities/marque/marque.reducer';
import { IDocument } from 'app/shared/model/document.model';
import {
  getEntity as getDocumentEntity,
  createEntity as createDocumentEntity,
  reset as resetDocument,
  deleteEntity as deleteDocumentEntity,
  uploadDocument,
  deleteDocumentFile
} from 'app/entities/document/document.reducer';
import { IEmploye } from 'app/shared/model/employe.model';
import { getEntities as getEmployes } from 'app/entities/employe/employe.reducer';
import { IImage } from 'app/shared/model/image.model';
import {
  createEntity as createImageEntity,
  getEntity as getImageEntity,
  reset as resetImage,
  deleteEntity as deleteImageEntity,
  uploadImage,
  deleteImageFile
} from 'app/entities/image/image.reducer';
import { getEntity, updateEntity, createEntity, reset } from './materiel.reducer';
import { IMateriel } from 'app/shared/model/materiel.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import _debounce from 'lodash.debounce';

export interface IMaterielUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MaterielUpdate = (props: IMaterielUpdateProps) => {
  const [errorDocument, seterrorDocument] = useState('');
  const [errorImage, seterrorImage] = useState('');
  const [documentID, setdocumentID] = useState(null);
  const [documentDeleted, setdocumentDeleted] = useState(false);
  const [documentLogo, setdocumentLogo] = useState(null);
  const [imageID, setimageID] = useState(null);
  const [imageDeleted, setimageDeleted] = useState(false);
  const [imageFile, setimageFile] = useState(null);
  const [documentFile, setdocumentFile] = useState(null);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [projetId, setProjetId] = useState('0');
  const {
    materielEntity,
    familles,
    typeMateriels,
    fournisseurs,
    marques,
    employes,
    loading,
    updating,
    projets,
    imageEntity,
    documentEntity
  } = props;

  const validateImage = _debounce((value, ctx, input, cb) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    if (value && allowedExtensions.exec(value) == null) {
      cb(false);
      seterrorImage(translate('entity.validation.imageFileType'));
    } else if (value && imageFile.size / Math.pow(1024, 2) > 10) {
      cb(false);
      seterrorImage(translate('entity.validation.imageFileSize'));
    } else {
      cb(true);
    }
  }, 300);

  const validateDocument = _debounce((value, ctx, input, cb) => {
    const allowedExtensions = /(\.pdf|\.txt|\.csv|\.doc|\.docx|\.xls|\.xlsx|\.rar|\.zip)$/i;

    if (value && allowedExtensions.exec(value) == null) {
      cb(false);
      seterrorDocument(translate('entity.validation.documentFileType'));
    } else if (value && documentFile.size / Math.pow(1024, 2) > 10) {
      cb(false);
      seterrorDocument(translate('entity.validation.documentFileSize'));
    } else {
      cb(true);
    }
  }, 300);

  useEffect(() => {
    if (documentEntity !== null && documentEntity.type !== undefined) {
      switch (documentEntity.type.toLocaleLowerCase()) {
        case 'pdf':
          setdocumentLogo(faFilePdf);
          break;
        case 'csv':
          setdocumentLogo(faFileCsv);
          break;
        case 'rar':
        case 'zip':
          setdocumentLogo(faFileArchive);
          break;
        case 'xls':
        case 'xlsx':
          setdocumentLogo(faFileExcel);
          break;
        case 'doc':
        case 'docx':
          setdocumentLogo(faFileWord);
          break;
        default:
          setdocumentLogo(faFileAlt);
          break;
      }
    }
  }, [documentEntity]);

  useEffect(() => {
    if (imageID != null) {
      setTimeout(() => {
        props.deleteImageEntity(imageID);
      }, 1000);
    }
  }, [imageID]);

  useEffect(() => {
    if (documentID != null) {
      setTimeout(() => {
        props.deleteDocumentEntity(documentID);
      }, 1000);
    }
  }, [documentID]);

  const handleClose = () => {
    props.history.push('/materiel' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.resetImage();
      props.resetDocument();
      props.getEntity(props.match.params.id);
    }

    props.getFamilles();
    props.getTypeMateriels();
    props.getFournisseurs();
    props.getMarques();
    props.getProjets();
    props.getEmployes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    const id: number = materielEntity.id;
    if (id !== undefined && id.toString() === props.match.params.id) {
      if (materielEntity.image !== null) {
        props.getImageEntity(materielEntity.image.id);
      }
      if (materielEntity.document !== null) {
        props.getDocumentEntity(materielEntity.document.id);
      }
    }
  }, [materielEntity]);

  const uploadNewImage = values => {
    const StorageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name);
    const image = {
      titre: values.libelle,
      path: StorageName
    };
    const imageData = new FormData();
    imageData.append('file', imageFile);
    imageData.append('storageName', StorageName);

    props.uploadImage(imageData);
    return image;
  };
  const uploadExistingImage = image => {
    const storageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name);
    image.path = storageName;

    const imageData = new FormData();
    imageData.append('file', imageFile);
    imageData.append('storageName', storageName);

    props.deleteImageFile(materielEntity.image.path.substr(24));
    props.uploadImage(imageData);
  };
  const uploadNewDocument = values => {
    const storageName = Date.now().toString() + '-' + documentFile.name;
    const document = {
      titre: values.libelle,
      path: storageName,
      type: '' + /[^.]+$/.exec(documentFile.name)
    };
    const documantData = new FormData();
    documantData.append('file', documentFile);
    documantData.append('storageName', storageName);

    props.uploadDocument(documantData);
    return document;
  };
  const uploadExistingDocument = document => {
    const storageName = Date.now().toString() + '-' + documentFile.name;
    document.path = storageName;
    document.type = '' + /[^.]+$/.exec(documentFile.name);

    const documantData = new FormData();
    documantData.append('file', documentFile);
    documantData.append('storageName', storageName);

    props.deleteDocumentFile(materielEntity.document.path.substr(27));
    props.uploadDocument(documantData);
  };

  const saveEntity = (event, errors, values) => {
    let image;
    let document;
    let entity;
    if (errors.length === 0) {
      entity = {
        ...materielEntity,
        ...values
      };
      window.console.log(entity);
      if (isNew) {
        if (imageFile) {
          image = uploadNewImage(values);
          entity.image = image;
        }
        if (documentFile) {
          document = uploadNewDocument(values);
          entity.document = document;
        }
        props.createEntity(entity);
      } else {
        if (materielEntity.image !== null && !imageDeleted && materielEntity.document !== null && !documentDeleted) {
          image = {
            id: materielEntity.image.id,
            titre: values.libelle,
            path: materielEntity.image.path.substr(27)
          };
          document = {
            id: materielEntity.document.id,
            titre: values.libelle,
            path: materielEntity.document.path.substr(30),
            type: materielEntity.document.type
          };
          entity.image = image;
          entity.document = document;
          if (imageFile) {
            uploadExistingImage(image);
            entity.image = image;
          }
          if (documentFile) {
            uploadExistingDocument(document);
            entity.document = document;
          }
          props.updateEntity(entity);
        } else if (materielEntity.document == null && materielEntity.image == null) {
          if (imageFile) {
            image = uploadNewImage(values);
            entity.image = image;
          }
          if (documentFile) {
            document = uploadNewDocument(values);
            entity.document = document;
          }
          props.updateEntity(entity);
        } else if (imageDeleted && documentDeleted) {
          entity.image = null;
          entity.document = null;
          if (imageFile) {
            image = uploadNewImage(values);
            entity.image = image;
          }
          if (documentFile) {
            document = uploadNewDocument(values);
            entity.document = document;
          }

          props.deleteImageFile(materielEntity.image.path.substr(24));
          props.deleteDocumentFile(materielEntity.document.path.substr(27));
          setimageID(materielEntity.image.id);
          setdocumentID(materielEntity.document.id);
          props.updateEntity(entity);
        } else if (imageDeleted && materielEntity.document == null) {
          entity.image = null;
          if (imageFile) {
            image = uploadNewImage(values);
            entity.image = image;
          }
          if (documentFile) {
            document = uploadNewDocument(values);
            entity.document = document;
          }
          props.deleteImageFile(materielEntity.image.path.substr(24));
          setimageID(materielEntity.image.id);
          props.updateEntity(entity);
        } else if (!imageDeleted && materielEntity.image !== null) {
          image = {
            id: materielEntity.image.id,
            titre: values.libelle,
            path: materielEntity.image.path.substr(27)
          };
          entity.document = null;
          entity.image = image;
          if (documentFile) {
            document = uploadNewDocument(values);
            entity.document = document;
          }
          if (imageFile) {
            uploadExistingImage(image);
            entity.image = image;
          }

          if (documentDeleted) {
            props.deleteDocumentFile(materielEntity.document.path.substr(27));
            setdocumentID(materielEntity.document.id);
            props.updateEntity(entity);
          } else {
            props.updateEntity(entity);
          }
        } else if (documentDeleted && materielEntity.image == null) {
          entity.document = null;
          if (imageFile) {
            image = uploadNewImage(values);
            entity.image = image;
          }
          if (documentFile) {
            document = uploadNewDocument(values);
            entity.document = document;
          }
          props.deleteDocumentFile(materielEntity.document.path.substr(27));
          setdocumentID(materielEntity.document.id);
          props.updateEntity(entity);
        } else if (!documentDeleted && materielEntity.document !== null) {
          document = {
            id: materielEntity.document.id,
            titre: values.libelle,
            path: materielEntity.document.path.substr(30),
            type: materielEntity.document.type
          };
          entity.image = null;
          entity.document = document;
          if (imageFile) {
            image = uploadNewImage(values);
            entity.image = image;
          }
          if (documentFile) {
            uploadExistingDocument(document);
            entity.document = document;
          }

          if (imageDeleted) {
            props.deleteImageFile(materielEntity.image.path.substr(24));
            setimageID(materielEntity.image.id);
            props.updateEntity(entity);
          } else {
            props.updateEntity(entity);
          }
        }
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
                <AvInput id="materiel-etat" type="select" className="form-control" name="etat">
                  <option value="" key="0" />
                  <option value="ON" key="1">
                    {translate('ibamApp.materiel.etatFieldON')}
                  </option>
                  <option value="OFF" key="2">
                    {translate('ibamApp.materiel.etatFieldOFF')}
                  </option>
                </AvInput>
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
              {/* <AvGroup>
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
              </AvGroup> */}
              <AvGroup>
                <Label for="materiel-famille">
                  <Translate contentKey="ibamApp.materiel.famille">Famille</Translate>
                </Label>
                <AvInput id="materiel-famille" type="select" className="form-control" name="famille.id">
                  <option value="" key="0" />
                  {familles
                    ? familles.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
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
                          {otherEntity.type}
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
                          {otherEntity.nomCommercial}
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
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="materiel-projet">
                  <Translate contentKey="ibamApp.materiel.projet">Projet</Translate>
                </Label>
                <AvInput id="materiel-projet" type="select" className="form-control" name="projet.id">
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
                <Label for="materiel-employe">
                  <Translate contentKey="ibamApp.materiel.employe">Employe</Translate>
                </Label>
                <AvInput id="materiel-employe" type="select" className="form-control" name="employe.id">
                  <option value="" key="0" />
                  {employes
                    ? employes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.matricule}
                          {otherEntity.prenom + '   ' + otherEntity.nom + ' (' + otherEntity.matricule + ')'}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label>
                  <Translate contentKey="ibamApp.materiel.document">Document</Translate>
                </Label>
                {!isNew ? (
                  <AvGroup>
                    {!documentDeleted &&
                    materielEntity.document != null &&
                    documentEntity.path !== null &&
                    documentEntity.path !== undefined &&
                    documentLogo !== null ? (
                      <dl>
                        <FontAwesomeIcon icon={documentLogo} color="lightgrey " size="10x" />
                        <dd>{documentEntity.path.substr(27)}</dd>
                      </dl>
                    ) : null}

                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => setdocumentDeleted(true)}
                      disabled={documentDeleted || materielEntity.document == null}
                    >
                      <FontAwesomeIcon icon="trash" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.delete">Delete</Translate>
                      </span>
                    </Button>
                  </AvGroup>
                ) : null}
                <AvInput
                  id="materiel-document"
                  type="file"
                  name="documentFile"
                  accept=".pdf, .doc, .docx, .txt, .rar, .zip, .csv, xls, xlsx"
                  validate={{ async: validateDocument }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setdocumentFile(e.target.files[0])}
                  style={{ opacity: '0', position: 'absolute', height: '0px' }}
                />
                <div className="form-group" style={{ marginBottom: '-10px' }}>
                  <Label for="materiel-document" className="btn btn-secondary">
                    {translate('entity.inputDocumentFile')}
                  </Label>
                  <Label className="p-2">
                    {documentFile !== null && documentFile !== undefined ? documentFile.name : translate('entity.noFileChoosed')}
                  </Label>
                </div>
                <AvFeedback>{errorDocument}</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label>
                  <Translate contentKey="ibamApp.materiel.image">Image</Translate>
                </Label>
                {!isNew ? (
                  <AvGroup>
                    {!imageDeleted && materielEntity.image !== null && imageEntity.path !== undefined ? (
                      <dd>
                        <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '300px', border: 'solid 1px' }} />
                      </dd>
                    ) : null}

                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => setimageDeleted(true)}
                      disabled={imageDeleted || materielEntity.image == null}
                    >
                      <FontAwesomeIcon icon="trash" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.delete">Delete</Translate>
                      </span>
                    </Button>
                  </AvGroup>
                ) : null}
                <AvInput
                  id="materiel-image"
                  type="file"
                  name="imageFile"
                  accept=".png, .jpg, .jpeg"
                  validate={{ async: validateImage }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setimageFile(event.target.files[0])}
                  style={{ opacity: '0', position: 'absolute', height: '0px' }}
                />
                <div className="form-group" style={{ marginBottom: '-10px' }}>
                  <Label for="materiel-image" className="btn btn-secondary">
                    {translate('entity.inputImageFile')}
                  </Label>
                  <Label className="p-2">
                    {imageFile !== null && imageFile !== undefined ? imageFile.name : translate('entity.noFileChoosed')}
                  </Label>
                </div>
                <AvFeedback>{errorImage}</AvFeedback>
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
  employes: storeState.employe.entities,
  projets: storeState.projet.entities,
  materielEntity: storeState.materiel.entity,
  loading: storeState.materiel.loading,
  updating: storeState.materiel.updating,
  updateSuccess: storeState.materiel.updateSuccess,
  imageEntity: storeState.image.entity,
  errorUpload: storeState.image.errorUpload,
  documentEntity: storeState.document.entity,
  errorUploadDoc: storeState.document.errorUpload
});

const mapDispatchToProps = {
  getFamilles,
  getTypeMateriels,
  getFournisseurs,
  getMarques,
  getEmployes,
  getEntity,
  getProjets,
  updateEntity,
  createEntity,
  reset,
  createImageEntity,
  uploadImage,
  getImageEntity,
  resetImage,
  deleteImageFile,
  deleteImageEntity,
  getDocumentEntity,
  createDocumentEntity,
  deleteDocumentEntity,
  resetDocument,
  uploadDocument,
  deleteDocumentFile
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MaterielUpdate);
