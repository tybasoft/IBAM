import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDepot } from 'app/shared/model/depot.model';
import { getEntities as getDepots } from 'app/entities/depot/depot.reducer';
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
import { getEntity, updateEntity, createEntity, reset } from './bon-reception.reducer';
import { IBonReception } from 'app/shared/model/bon-reception.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import _debounce from 'lodash.debounce';

export interface IBonReceptionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BonReceptionUpdate = (props: IBonReceptionUpdateProps) => {
  const [errorMessage, seterrorMessage] = useState('');
  const [imageID, setimageID] = useState(null);
  const [imageDeleted, setimageDeleted] = useState(false);
  const [imageFile, setimageFile] = useState(null);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bonReceptionEntity, depots, fournisseurs, loading, updating, imageEntity } = props;

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
    props.history.push('/bon-reception' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.resetImage();
      props.getEntity(props.match.params.id);
    }

    props.getDepots();
    props.getFournisseurs();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    if (bonReceptionEntity.id !== undefined) {
      if (bonReceptionEntity.id.toString() === props.match.params.id && bonReceptionEntity.image !== null) {
        props.getImageEntity(bonReceptionEntity.image.id);
      }
    }
  }, [bonReceptionEntity]);

  const uploadNewImage = values => {
    const storageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name);
    const image = {
      titre: values.dateLivraison,
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
        ...bonReceptionEntity,
        ...values
      };

      if (isNew) {
        image = uploadNewImage(values);
        entity.image = image;

        props.createEntity(entity);
      } else {
        if (bonReceptionEntity.image == null) {
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
          props.deleteImageFile(bonReceptionEntity.image.path.substr(24));
          setimageID(bonReceptionEntity.image.id);
          props.updateEntity(entity);
        } else {
          image = {
            id: bonReceptionEntity.image.id,
            titre: values.dateLivraison,
            path: bonReceptionEntity.image.path.substr(27)
          };
          entity.image = image;

          if (imageFile) {
            (imageStorageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name)), (image.path = imageStorageName);
            entity.image = image;
            imageData.append('file', imageFile);
            imageData.append('storageName', imageStorageName);

            props.deleteImageFile(bonReceptionEntity.image.path.substr(24));
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
          <h2 id="ibamApp.bonReception.home.createOrEditLabel">
            <Translate contentKey="ibamApp.bonReception.home.createOrEditLabel">Create or edit a BonReception</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bonReceptionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="bon-reception-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="bon-reception-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="livreurLabel" for="bon-reception-livreur">
                  <Translate contentKey="ibamApp.bonReception.livreur">Livreur</Translate>
                </Label>
                <AvField id="bon-reception-livreur" type="text" name="livreur" />
              </AvGroup>
              <AvGroup>
                <Label id="remarquesLabel" for="bon-reception-remarques">
                  <Translate contentKey="ibamApp.bonReception.remarques">Remarques</Translate>
                </Label>
                <AvField id="bon-reception-remarques" type="text" name="remarques" />
              </AvGroup>
              <AvGroup>
                <Label id="dateLivraisonLabel" for="bon-reception-dateLivraison">
                  <Translate contentKey="ibamApp.bonReception.dateLivraison">Date Livraison</Translate>
                </Label>
                <AvField
                  id="bon-reception-dateLivraison"
                  type="date"
                  className="form-control"
                  name="dateLivraison"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="bon-reception-userModif">
                  <Translate contentKey="ibamApp.bonReception.userModif">User Modif</Translate>
                </Label>
                <AvField id="bon-reception-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="bon-reception-dateModif">
                  <Translate contentKey="ibamApp.bonReception.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="bon-reception-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="bon-reception-depot">
                  <Translate contentKey="ibamApp.bonReception.depot">Depot</Translate>
                </Label>
                <AvInput id="bon-reception-depot" type="select" className="form-control" name="depot.id">
                  <option value="" key="0" />
                  {depots
                    ? depots.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="bon-reception-fournisseur">
                  <Translate contentKey="ibamApp.bonReception.fournisseur">Fournisseur</Translate>
                </Label>
                <AvInput id="bon-reception-fournisseur" type="select" className="form-control" name="fournisseur.id">
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
                  <Translate contentKey="ibamApp.bonReception.image">Image</Translate>
                </Label>
                {!isNew ? (
                  <div>
                    <dd>
                      {!imageDeleted && bonReceptionEntity.image !== null && imageEntity.path !== undefined ? (
                        <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '300px', border: 'solid 1px' }} />
                      ) : null}
                    </dd>
                    <dd>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => setimageDeleted(true)}
                        disabled={imageDeleted || bonReceptionEntity.image == null}
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
                  id="bon-reception-image"
                  type="file"
                  name="imageFile"
                  accept=".png, .jpg, .jpeg"
                  validate={{ async: validate }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setimageFile(event.target.files[0])}
                  style={{ opacity: '0', position: 'absolute', height: '0px' }}
                />
                <div className="form-group" style={{ marginBottom: '-10px' }}>
                  <Label for="bon-reception-image" className="btn btn-secondary">
                    {translate('entity.inputImageFile')}
                  </Label>
                  <Label className="p-2">
                    {imageFile !== null && imageFile !== undefined ? imageFile.name : translate('entity.noFileChoosed')}
                  </Label>
                </div>
                <AvFeedback>{errorMessage}</AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/bon-reception" replace color="info">
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
  depots: storeState.depot.entities,
  fournisseurs: storeState.fournisseur.entities,
  bonReceptionEntity: storeState.bonReception.entity,
  loading: storeState.bonReception.loading,
  updating: storeState.bonReception.updating,
  updateSuccess: storeState.bonReception.updateSuccess,
  imageEntity: storeState.image.entity,
  errorUpload: storeState.image.errorUpload,
  uploadSuccess: storeState.image.uploadSuccess
});

const mapDispatchToProps = {
  getDepots,
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

export default connect(mapStateToProps, mapDispatchToProps)(BonReceptionUpdate);
