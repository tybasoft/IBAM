import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IImage } from 'app/shared/model/image.model';
import {
  uploadImage,
  getEntity as getImage,
  deleteImageFile,
  deleteEntity as deleteImageEntity,
  updateEntity as updateImageEntity,
  createEntity as createImageEntity,
  reset as resetImage
} from 'app/entities/image/image.reducer';
import { getEntity, updateEntity, createEntity, reset } from './entreprise.reducer';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import _debounce from 'lodash.debounce';

export interface IEntrepriseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EntrepriseUpdate = (props: IEntrepriseUpdateProps) => {
  const [newEntreprise, setnewEntreprise] = useState(null);
  const [firstUpdate, setfirstUpdate] = useState(false);
  const [imageDeleted, setimageDeleted] = useState(false);
  const [imageID, setimageID] = useState(null);
  const [imageFile, setimageFile] = useState(null);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { entrepriseEntity, loading, updating, imageEntity } = props;

  const validate = _debounce((value, ctx, input, cb) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (isNew) {
      setTimeout(() => {
        cb(allowedExtensions.exec(value) != null);
      }, 500);
    } else {
      setTimeout(() => {
        cb(allowedExtensions.exec(value) != null || (value === '' && !imageDeleted));
      }, 500);
    }
  }, 300);

  const deleteImage = () => {
    setfirstUpdate(true);
    setimageID(entrepriseEntity.image.id);
    const entity = {
      ...entrepriseEntity,
      image: null
    };
    props.updateEntity(entity);
    props.deleteImageFile(entrepriseEntity.image.path.substr(24));
    setimageDeleted(true);
  };

  const handleClose = () => {
    props.history.push('/entreprise');
  };

  useEffect(() => {
    if (newEntreprise !== null) {
      const entity = {
        ...newEntreprise,
        image: imageEntity
      };
      props.updateEntity(entity);
      handleClose();
    }
  }, [imageEntity]);

  useEffect(() => {
    if (entrepriseEntity !== null && entrepriseEntity.id !== undefined) {
      if (entrepriseEntity.image !== null) {
        props.getImage(entrepriseEntity.image.id);
        window.console.log(imageEntity);
      }
    }
    if (!isNew && firstUpdate && entrepriseEntity.image == null) {
      props.deleteImageEntity(imageID);
    }
  }, [entrepriseEntity]);

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.resetImage();
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess && !firstUpdate) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    let imageStorageName;
    let image;
    let entity;
    const imageData = new FormData();
    if (errors.length === 0) {
      if (isNew) {
        imageStorageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name);

        image = {
          titre: values.nomCommercial,
          path: imageStorageName
        };
        entity = {
          ...entrepriseEntity,
          ...values,
          image
        };

        imageData.append('file', imageFile);
        imageData.append('storageName', imageStorageName);

        props.createEntity(entity);
        props.uploadImage(imageData);
      } else {
        if (!imageDeleted && entrepriseEntity.image !== null) {
          imageStorageName = entrepriseEntity.image.path.substr(27);
          image = {
            ...imageEntity,
            titre: values.nomCommercial,
            path: imageStorageName
          };
          entity = {
            ...entrepriseEntity,
            ...values
          };
          imageData.append('file', imageFile);
          imageData.append('storageName', imageStorageName);

          if (imageFile) {
            /* props.updateEntity(entity);
            props.updateImageEntity(image);
            props.uploadImage(imageData); */
            window.console.log('nouvelle image');
            window.console.log(image);
            window.console.log(entity);
          } else {
            // props.updateEntity(entity);
            window.console.log('no image');
            window.console.log(image);
            window.console.log(entity);
          }
        } else {
          imageStorageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name);
          image = {
            titre: values.nomCommercial,
            path: imageStorageName
          };
          entity = {
            ...entrepriseEntity,
            ...values
          };
          imageData.append('file', imageFile);
          imageData.append('storageName', imageStorageName);

          props.createImageEntity(image);
          props.uploadImage(imageData);
          setnewEntreprise(entity);
        }
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ibamApp.entreprise.home.createOrEditLabel">
            <Translate contentKey="ibamApp.entreprise.home.createOrEditLabel">Create or edit a Entreprise</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : entrepriseEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="entreprise-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="entreprise-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="entiteJuridiqueLabel" for="entreprise-entiteJuridique">
                  <Translate contentKey="ibamApp.entreprise.entiteJuridique">Entite Juridique</Translate>
                </Label>
                <AvField id="entreprise-entiteJuridique" type="text" name="entiteJuridique" />
              </AvGroup>
              <AvGroup>
                <Label id="nomCommercialLabel" for="entreprise-nomCommercial">
                  <Translate contentKey="ibamApp.entreprise.nomCommercial">Nom Commercial</Translate>
                </Label>
                <AvField
                  id="entreprise-nomCommercial"
                  type="text"
                  name="nomCommercial"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="adresseLabel" for="entreprise-adresse">
                  <Translate contentKey="ibamApp.entreprise.adresse">Adresse</Translate>
                </Label>
                <AvField id="entreprise-adresse" type="text" name="adresse" />
              </AvGroup>
              <AvGroup>
                <Label id="capitalLabel" for="entreprise-capital">
                  <Translate contentKey="ibamApp.entreprise.capital">Capital</Translate>
                </Label>
                <AvField id="entreprise-capital" type="text" name="capital" />
              </AvGroup>
              <AvGroup>
                <Label id="directionLabel" for="entreprise-direction">
                  <Translate contentKey="ibamApp.entreprise.direction">Direction</Translate>
                </Label>
                <AvField id="entreprise-direction" type="text" name="direction" />
              </AvGroup>
              <AvGroup>
                <Label id="activiteLabel" for="entreprise-activite">
                  <Translate contentKey="ibamApp.entreprise.activite">Activite</Translate>
                </Label>
                <AvField id="entreprise-activite" type="text" name="activite" />
              </AvGroup>
              <AvGroup>
                <Label id="telephoneLabel" for="entreprise-telephone">
                  <Translate contentKey="ibamApp.entreprise.telephone">Telephone</Translate>
                </Label>
                <AvField id="entreprise-telephone" type="text" name="telephone" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="entreprise-email">
                  <Translate contentKey="ibamApp.entreprise.email">Email</Translate>
                </Label>
                <AvField id="entreprise-email" type="text" name="email" />
              </AvGroup>
              {/*
              <AvGroup>
                <Label id="userModifLabel" for="entreprise-userModif">
                  <Translate contentKey="ibamApp.entreprise.userModif">User Modif</Translate>
                </Label>
                <AvField id="entreprise-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="entreprise-dateModif">
                  <Translate contentKey="ibamApp.entreprise.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="entreprise-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              */}
              {isNew ? (
                <AvGroup>
                  <Label for="entreprise-image">
                    <Translate contentKey="ibamApp.entreprise.image">Image</Translate>
                  </Label>
                  <AvInput
                    id="entreprise-image"
                    type="file"
                    name="image"
                    accept=".png, .jpg, .jpeg"
                    validate={{ async: validate }}
                    errorMessage="choisir une image"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setimageFile(e.target.files[0])}
                  />
                </AvGroup>
              ) : null}
              {!isNew ? (
                <AvGroup>
                  <Label for="entreprise-image">
                    <Translate contentKey="ibamApp.entreprise.image">Image</Translate>
                  </Label>
                  <dd>
                    <img src={imageEntity.path} alt="not found" style={{ width: '100%', border: 'solid 1px' }} />
                  </dd>
                  <dd>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => deleteImage()}
                      disabled={imageDeleted || entrepriseEntity.image == null}
                    >
                      <FontAwesomeIcon icon="trash" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.delete">Delete</Translate>
                      </span>
                    </Button>
                  </dd>
                  <AvInput
                    id="entreprise-image"
                    type="file"
                    name="imageFile"
                    accept=".png, .jpg, .jpeg"
                    validate={{ async: validate }}
                    errorMessage="choisir une image"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setimageFile(event.target.files[0])}
                  />
                </AvGroup>
              ) : null}
              <Button tag={Link} id="cancel-save" to="/entreprise" replace color="info">
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
  entrepriseEntity: storeState.entreprise.entity,
  loading: storeState.entreprise.loading,
  updating: storeState.entreprise.updating,
  updateSuccess: storeState.entreprise.updateSuccess,
  errorUpload: storeState.image.errorUpload,
  uploadSuccess: storeState.image.uploadSuccess,
  imageEntity: storeState.image.entity
});

const mapDispatchToProps = {
  uploadImage,
  getImage,
  deleteImageFile,
  deleteImageEntity,
  updateImageEntity,
  createImageEntity,
  getEntity,
  updateEntity,
  createEntity,
  reset,
  resetImage
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EntrepriseUpdate);
