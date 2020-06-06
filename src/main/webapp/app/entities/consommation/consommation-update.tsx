import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMateriel } from 'app/shared/model/materiel.model';
import { getEntities as getMateriels } from 'app/entities/materiel/materiel.reducer';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { getEntities as getFournisseurs } from 'app/entities/fournisseur/fournisseur.reducer';
import { IImage } from 'app/shared/model/image.model';
import {
  createEntity as createImageEntity,
  getEntity as getImageEntity,
  reset as resetImage,
  deleteEntity as deleteImageEntity,
  uploadImage,
  deleteImageFile
} from 'app/entities/image/image.reducer';
import { getEntity, updateEntity, createEntity, reset } from './consommation.reducer';
import { IConsommation } from 'app/shared/model/consommation.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import _debounce from 'lodash.debounce';

export interface IConsommationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ConsommationUpdate = (props: IConsommationUpdateProps) => {
  const [errorMessage, seterrorMessage] = useState('');
  const [imageID, setimageID] = useState(null);
  const [imageDeleted, setimageDeleted] = useState(false);
  const [imageFile, setimageFile] = useState(null);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { consommationEntity, materiels, fournisseurs, loading, updating, imageEntity } = props;

  const validate = _debounce((value, ctx, input, cb) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    if (isNew && allowedExtensions.exec(value) == null) {
      cb(false);
      seterrorMessage(translate('entity.validation.imageFileType'));
    } else if (allowedExtensions.exec(value) == null && value !== '') {
      cb(false);
      seterrorMessage(translate('entity.validation.imageFileType'));
    } else if (imageFile) {
      if (Math.round(imageFile.size / Math.pow(1024, 2)) > 10) {
        cb(false);
        seterrorMessage(translate('entity.validation.imageFileSize'));
      }
    }
    cb(true);
  }, 300);

  useEffect(() => {
    if (imageID !== null) {
      setTimeout(() => {
        props.deleteImageEntity(imageID);
      }, 1000);
    }
  }, [imageID]);

  const handleClose = () => {
    props.history.push('/consommation' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.resetImage();
      props.getEntity(props.match.params.id);
    }

    props.getMateriels();
    props.getFournisseurs();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    if (consommationEntity.id !== undefined) {
      if (consommationEntity.id.toString() === props.match.params.id && consommationEntity.image !== null) {
        props.getImageEntity(consommationEntity.image.id);
      }
    }
  }, [consommationEntity]);

  const uploadNewImage = values => {
    const storageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name);
    const image = {
      titre: values.reference,
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
        ...consommationEntity,
        ...values
      };

      if (isNew) {
        image = uploadNewImage(values);
        entity.image = image;

        props.createEntity(entity);
      } else {
        if (consommationEntity.image == null) {
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
          props.deleteImageFile(consommationEntity.image.path.substr(24));
          setimageID(consommationEntity.image.id);
          props.updateEntity(entity);
        } else {
          image = {
            id: consommationEntity.image.id,
            titre: values.reference,
            path: consommationEntity.image.path.substr(27)
          };
          entity.image = image;

          if (imageFile) {
            (imageStorageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name)), (image.path = imageStorageName);
            entity.image = image;
            imageData.append('file', imageFile);
            imageData.append('storageName', imageStorageName);

            props.deleteImageFile(consommationEntity.image.path.substr(24));
            props.uploadImage(imageData);
          }
          props.updateEntity(entity);
        }
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ibamApp.consommation.home.createOrEditLabel">
            <Translate contentKey="ibamApp.consommation.home.createOrEditLabel">Create or edit a Consommation</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : consommationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="consommation-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="consommation-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="referenceLabel" for="consommation-reference">
                  <Translate contentKey="ibamApp.consommation.reference">Reference</Translate>
                </Label>
                <AvField
                  id="consommation-reference"
                  type="text"
                  name="reference"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateAchatLabel" for="consommation-dateAchat">
                  <Translate contentKey="ibamApp.consommation.dateAchat">Date Achat</Translate>
                </Label>
                <AvField
                  id="consommation-dateAchat"
                  type="date"
                  className="form-control"
                  name="dateAchat"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="typeCarburantLabel" for="consommation-typeCarburant">
                  <Translate contentKey="ibamApp.consommation.typeCarburant">Type Carburant</Translate>
                </Label>
                <AvField id="consommation-typeCarburant" type="text" name="typeCarburant" />
              </AvGroup>
              <AvGroup>
                <Label id="montantLabel" for="consommation-montant">
                  <Translate contentKey="ibamApp.consommation.montant">Montant</Translate>
                </Label>
                <AvField
                  id="consommation-montant"
                  type="text"
                  name="montant"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="quantiteLabel" for="consommation-quantite">
                  <Translate contentKey="ibamApp.consommation.quantite">Quantite</Translate>
                </Label>
                <AvField
                  id="consommation-quantite"
                  type="text"
                  name="quantite"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="kilometrageLabel" for="consommation-kilometrage">
                  <Translate contentKey="ibamApp.consommation.kilometrage">Kilometrage</Translate>
                </Label>
                <AvField id="consommation-kilometrage" type="text" name="kilometrage" />
              </AvGroup>
              <AvGroup>
                <Label id="commentaireLabel" for="consommation-commentaire">
                  <Translate contentKey="ibamApp.consommation.commentaire">Commentaire</Translate>
                </Label>
                <AvField id="consommation-commentaire" type="text" name="commentaire" />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="consommation-userModif">
                  <Translate contentKey="ibamApp.consommation.userModif">User Modif</Translate>
                </Label>
                <AvField id="consommation-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="consommation-dateModif">
                  <Translate contentKey="ibamApp.consommation.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="consommation-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="consommation-materiel">
                  <Translate contentKey="ibamApp.consommation.materiel">Materiel</Translate>
                </Label>
                <AvInput id="consommation-materiel" type="select" className="form-control" name="materiel.id">
                  <option value="" key="0" />
                  {materiels
                    ? materiels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="consommation-fournisseur">
                  <Translate contentKey="ibamApp.consommation.fournisseur">Fournisseur</Translate>
                </Label>
                <AvInput id="consommation-fournisseur" type="select" className="form-control" name="fournisseur.id">
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
                <Label>
                  <Translate contentKey="ibamApp.consommation.image">Image</Translate>
                </Label>
                {!isNew ? (
                  <div>
                    <dd>
                      {!imageDeleted && consommationEntity.image !== null && imageEntity.path !== undefined ? (
                        <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '300px', border: 'solid 1px' }} />
                      ) : null}
                    </dd>
                    <dd>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => setimageDeleted(true)}
                        disabled={imageDeleted || consommationEntity.image == null}
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
                  id="consommation-image"
                  type="file"
                  name="imageFile"
                  accept=".png, .jpg, .jpeg"
                  validate={{ async: validate }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setimageFile(event.target.files[0])}
                  style={{ opacity: '0', position: 'absolute', height: '0px' }}
                />
                <div className="form-group" style={{ marginBottom: '-10px' }}>
                  <Label for="consommation-image" className="btn btn-secondary">
                    {translate('entity.inputImageFile')}
                  </Label>
                  <Label className="p-2">
                    {imageFile !== null && imageFile !== undefined ? imageFile.name : translate('entity.noFileChoosed')}
                  </Label>
                </div>
                <AvFeedback>{errorMessage}</AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/consommation" replace color="info">
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
  materiels: storeState.materiel.entities,
  fournisseurs: storeState.fournisseur.entities,
  consommationEntity: storeState.consommation.entity,
  loading: storeState.consommation.loading,
  updating: storeState.consommation.updating,
  updateSuccess: storeState.consommation.updateSuccess,
  imageEntity: storeState.image.entity,
  errorUpload: storeState.image.errorUpload,
  uploadSuccess: storeState.image.uploadSuccess
});

const mapDispatchToProps = {
  getMateriels,
  getFournisseurs,
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

export default connect(mapStateToProps, mapDispatchToProps)(ConsommationUpdate);
