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
import { ICentreMaintenance } from 'app/shared/model/centre-maintenance.model';
import { getEntities as getCentreMaintenances } from 'app/entities/centre-maintenance/centre-maintenance.reducer';
import { IImage } from 'app/shared/model/image.model';
import {
  createEntity as createImageEntity,
  getEntity as getImageEntity,
  reset as resetImage,
  deleteEntity as deleteImageEntity,
  uploadImage,
  deleteImageFile
} from 'app/entities/image/image.reducer';
import { getEntity, updateEntity, createEntity, reset } from './maintenance.reducer';
import { IMaintenance } from 'app/shared/model/maintenance.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import _debounce from 'lodash.debounce';

export interface IMaintenanceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MaintenanceUpdate = (props: IMaintenanceUpdateProps) => {
  const [errorMessage, seterrorMessage] = useState('');
  const [imageID, setimageID] = useState(null);
  const [imageDeleted, setimageDeleted] = useState(false);
  const [imageFile, setimageFile] = useState(null);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { maintenanceEntity, materiels, centreMaintenances, loading, updating, imageEntity } = props;

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
    props.history.push('/maintenance' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.resetImage();
      props.getEntity(props.match.params.id);
    }

    props.getMateriels();
    props.getCentreMaintenances();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    if (maintenanceEntity.id !== undefined) {
      if (maintenanceEntity.id.toString() === props.match.params.id && maintenanceEntity.image !== null) {
        props.getImageEntity(maintenanceEntity.image.id);
      }
    }
  }, [maintenanceEntity]);

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
        ...maintenanceEntity,
        ...values
      };

      if (isNew) {
        image = uploadNewImage(values);
        entity.image = image;

        props.createEntity(entity);
      } else {
        if (maintenanceEntity.image == null) {
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
          props.deleteImageFile(maintenanceEntity.image.path.substr(24));
          setimageID(maintenanceEntity.image.id);
          props.updateEntity(entity);
        } else {
          image = {
            id: maintenanceEntity.image.id,
            titre: values.reference,
            path: maintenanceEntity.image.path.substr(27)
          };
          entity.image = image;

          if (imageFile) {
            (imageStorageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name)), (image.path = imageStorageName);
            entity.image = image;
            imageData.append('file', imageFile);
            imageData.append('storageName', imageStorageName);

            props.deleteImageFile(maintenanceEntity.image.path.substr(24));
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
          <h2 id="ibamApp.maintenance.home.createOrEditLabel">
            <Translate contentKey="ibamApp.maintenance.home.createOrEditLabel">Create or edit a Maintenance</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : maintenanceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="maintenance-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="maintenance-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="referenceLabel" for="maintenance-reference">
                  <Translate contentKey="ibamApp.maintenance.reference">Reference</Translate>
                </Label>
                <AvField
                  id="maintenance-reference"
                  type="text"
                  name="reference"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="datePanneLabel" for="maintenance-datePanne">
                  <Translate contentKey="ibamApp.maintenance.datePanne">Date Panne</Translate>
                </Label>
                <AvField
                  id="maintenance-datePanne"
                  type="date"
                  className="form-control"
                  name="datePanne"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="fraisLabel" for="maintenance-frais">
                  <Translate contentKey="ibamApp.maintenance.frais">Frais</Translate>
                </Label>
                <AvField
                  id="maintenance-frais"
                  type="text"
                  name="frais"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="technicienLabel" for="maintenance-technicien">
                  <Translate contentKey="ibamApp.maintenance.technicien">Technicien</Translate>
                </Label>
                <AvField id="maintenance-technicien" type="text" name="technicien" />
              </AvGroup>
              <AvGroup>
                <Label id="motifLabel" for="maintenance-motif">
                  <Translate contentKey="ibamApp.maintenance.motif">Motif</Translate>
                </Label>
                <AvField
                  id="maintenance-motif"
                  type="text"
                  name="motif"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="problemeFrequentLabel">
                  <AvInput id="maintenance-problemeFrequent" type="checkbox" className="form-check-input" name="problemeFrequent" />
                  <Translate contentKey="ibamApp.maintenance.problemeFrequent">Probleme Frequent</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="remarqueLabel" for="maintenance-remarque">
                  <Translate contentKey="ibamApp.maintenance.remarque">Remarque</Translate>
                </Label>
                <AvField id="maintenance-remarque" type="text" name="remarque" />
              </AvGroup>
              <AvGroup>
                <Label id="dureePanneLabel" for="maintenance-dureePanne">
                  <Translate contentKey="ibamApp.maintenance.dureePanne">Duree Panne</Translate>
                </Label>
                <AvField id="maintenance-dureePanne" type="text" name="dureePanne" />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="maintenance-userModif">
                  <Translate contentKey="ibamApp.maintenance.userModif">User Modif</Translate>
                </Label>
                <AvField id="maintenance-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="maintenance-dateModif">
                  <Translate contentKey="ibamApp.maintenance.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="maintenance-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="maintenance-materiel">
                  <Translate contentKey="ibamApp.maintenance.materiel">Materiel</Translate>
                </Label>
                <AvInput id="maintenance-materiel" type="select" className="form-control" name="materiel.id">
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
                <Label for="maintenance-centreMaintenance">
                  <Translate contentKey="ibamApp.maintenance.centreMaintenance">Centre Maintenance</Translate>
                </Label>
                <AvInput id="maintenance-centreMaintenance" type="select" className="form-control" name="centreMaintenance.id">
                  <option value="" key="0" />
                  {centreMaintenances
                    ? centreMaintenances.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label>
                  <Translate contentKey="ibamApp.maintenance.image">Image</Translate>
                </Label>
                {!isNew ? (
                  <div>
                    <dd>
                      {!imageDeleted && maintenanceEntity.image !== null && imageEntity.path !== undefined ? (
                        <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '300px', border: 'solid 1px' }} />
                      ) : null}
                    </dd>
                    <dd>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => setimageDeleted(true)}
                        disabled={imageDeleted || maintenanceEntity.image == null}
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
                  id="maintenance-image"
                  type="file"
                  name="imageFile"
                  accept=".png, .jpg, .jpeg"
                  validate={{ async: validate }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setimageFile(event.target.files[0])}
                  style={{ opacity: '0', position: 'absolute', height: '0px' }}
                />
                <div className="form-group" style={{ marginBottom: '-10px' }}>
                  <Label for="maintenance-image" className="btn btn-secondary">
                    {translate('entity.inputImageFile')}
                  </Label>
                  <Label className="p-2">
                    {imageFile !== null && imageFile !== undefined ? imageFile.name : translate('entity.noFileChoosed')}
                  </Label>
                </div>
                <AvFeedback>{errorMessage}</AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/maintenance" replace color="info">
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
  centreMaintenances: storeState.centreMaintenance.entities,
  maintenanceEntity: storeState.maintenance.entity,
  loading: storeState.maintenance.loading,
  updating: storeState.maintenance.updating,
  updateSuccess: storeState.maintenance.updateSuccess,
  imageEntity: storeState.image.entity,
  errorUpload: storeState.image.errorUpload,
  uploadSuccess: storeState.image.uploadSuccess
});

const mapDispatchToProps = {
  getMateriels,
  getCentreMaintenances,
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

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceUpdate);
