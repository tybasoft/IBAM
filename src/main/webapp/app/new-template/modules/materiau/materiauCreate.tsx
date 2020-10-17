import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, Storage, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMarque } from 'app/shared/model/marque.model';
import { getEntities as getMarques } from 'app/entities/marque/marque.reducer';
import { IUnite } from 'app/shared/model/unite.model';
import { getEntities as getUnites } from 'app/entities/unite/unite.reducer';
import { IFamille } from 'app/shared/model/famille.model';
import { getEntities as getFamilles } from 'app/entities/famille/famille.reducer';
import { ITva } from 'app/shared/model/tva.model';
import { getEntities as getTvas } from 'app/entities/tva/tva.reducer';
import { IImage } from 'app/shared/model/image.model';
import {
  createEntity as createImageEntity,
  getEntity as getImageEntity,
  reset as resetImage,
  deleteEntity as deleteImageEntity,
  uploadImage,
  deleteImageFile
} from 'app/entities/image/image.reducer';
import { getEntity, updateEntity, createEntity, reset } from 'app/entities/materiau/materiau.reducer';
import { IEmploye } from 'app/shared/model/employe.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import _debounce from 'lodash.debounce';
import countries from '../../../../content/countries';
import * as Icon from 'react-feather';

// export interface IEmployeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MateriauCreate = (props: any) => {
  const [errorMessage, seterrorMessage] = useState('');
  const [imageID, setimageID] = useState(null);
  const [imageDeleted, setimageDeleted] = useState(false);
  const [imageFile, setimageFile] = useState(null);
  const [isNew, setIsNew] = useState(props.materiauEntity === undefined);

  const { modalOpen, handleClose, materiauEntity, marques, unites, familles, tvas, loading, updating, imageEntity } = props;

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

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.resetImage();
      // props.getEntity(id);
    }

    props.getMarques();
    props.getUnites();
    props.getFamilles();
    props.getTvas();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    if (materiauEntity.id !== undefined) {
      if (materiauEntity.image !== null) {
        props.getImageEntity(materiauEntity.image.id);
      }
    }
  }, [materiauEntity]);

  const uploadNewImage = values => {
    const storageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name);
    const image = {
      titre: values.libelle,
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
        ...materiauEntity,
        ...values
      };
      if (isNew) {
        if (imageFile) {
          image = uploadNewImage(values);
          entity.image = image;
        }
        props.createEntity(entity);
      } else {
        if (materiauEntity.image == null) {
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
          props.deleteImageFile(materiauEntity.image.path.substr(24));
          setimageID(materiauEntity.image.id);
          props.updateEntity(entity);
        } else {
          image = {
            id: materiauEntity.image.id,
            titre: values.libelle,
            path: materiauEntity.image.path.substr(27)
          };
          entity.image = image;

          if (imageFile) {
            (imageStorageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name)), (image.path = imageStorageName);
            entity.image = image;
            imageData.append('file', imageFile);
            imageData.append('storageName', imageStorageName);

            props.deleteImageFile(materiauEntity.image.path.substr(24));
            props.uploadImage(imageData);
          }
          props.updateEntity(entity);
        }
      }
      handleClose();
    }
  };

  return (
    <Modal isOpen={modalOpen} toggle={() => handleClose()} size="md">
      <ModalHeader toggle={() => handleClose()}>
        <Translate contentKey="ibamApp.projet.home.createLabel">Entreprises</Translate>
      </ModalHeader>
      {/* <AddTodo /> */}
      <AvForm model={isNew ? {} : materiauEntity} onSubmit={saveEntity}>
        <ModalBody>
          <Row>
            <Col md={12}>
              <AvGroup>
                <Label id="libelleLabel" for="materiau-libelle">
                  <Translate contentKey="ibamApp.materiau.libelle">Libelle</Translate>
                </Label>
                <AvField
                  id="materiau-libelle"
                  type="text"
                  name="libelle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="referenceLabel" for="materiau-reference">
                  <Translate contentKey="ibamApp.materiau.reference">Reference</Translate>
                </Label>
                <AvField
                  id="materiau-reference"
                  type="text"
                  name="reference"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="poidsLabel" for="materiau-poids">
                  <Translate contentKey="ibamApp.materiau.poids">Poids</Translate>
                </Label>
                <AvField id="materiau-poids" type="text" name="poids" />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="volumeLabel" for="materiau-volume">
                  <Translate contentKey="ibamApp.materiau.volume">Volume</Translate>
                </Label>
                <AvField id="materiau-volume" type="text" name="volume" />
              </AvGroup>
            </Col>
            <Col md={12}>
              {/* <AvGroup>
                <Label id="userModifLabel" for="materiau-userModif">
                  <Translate contentKey="ibamApp.materiau.userModif">User Modif</Translate>
                </Label>
                <AvField id="materiau-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="materiau-dateModif">
                  <Translate contentKey="ibamApp.materiau.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="materiau-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup> */}
              <AvGroup>
                <Label for="materiau-marque">
                  <Translate contentKey="ibamApp.materiau.marque">Marque</Translate>
                </Label>
                <AvInput id="materiau-marque" type="select" className="form-control" name="marque.id">
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
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label for="materiau-unite">
                  <Translate contentKey="ibamApp.materiau.unite">Unite</Translate>
                </Label>
                <AvInput id="materiau-unite" type="select" className="form-control" name="unite.id">
                  <option value="" key="0" />
                  {unites
                    ? unites.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label for="materiau-famille">
                  <Translate contentKey="ibamApp.materiau.famille">Famille</Translate>
                </Label>
                <AvInput id="materiau-famille" type="select" className="form-control" name="famille.id">
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
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label for="materiau-tva">
                  <Translate contentKey="ibamApp.materiau.tva">Tva</Translate>
                </Label>
                <AvInput id="materiau-tva" type="select" className="form-control" name="tva.id">
                  <option value="" key="0" />
                  {tvas
                    ? tvas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.taux}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label>
                  <Translate contentKey="ibamApp.materiau.image">Image</Translate>
                </Label>
                {!isNew ? (
                  <div>
                    <dd>
                      {!imageDeleted && materiauEntity.image !== null && imageEntity.path !== undefined ? (
                        <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '300px', border: 'solid 1px' }} />
                      ) : null}
                    </dd>
                    <dd>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => setimageDeleted(true)}
                        disabled={imageDeleted || materiauEntity.image == null}
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
                  id="materiau-image"
                  type="file"
                  name="imageFile"
                  accept=".png, .jpg, .jpeg"
                  validate={{ async: validate }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setimageFile(event.target.files[0])}
                  style={{ opacity: '0', position: 'absolute', height: '0px' }}
                />
                <div className="form-group" style={{ marginBottom: '-10px' }}>
                  <Label for="materiau-image" className="btn btn-secondary">
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
  marques: storeState.marque.entities,
  unites: storeState.unite.entities,
  familles: storeState.famille.entities,
  tvas: storeState.tva.entities,
  //   materiauEntity: storeState.materiau.entity,
  loading: storeState.materiau.loading,
  updating: storeState.materiau.updating,
  updateSuccess: storeState.materiau.updateSuccess,
  imageEntity: storeState.image.entity,
  errorUpload: storeState.image.errorUpload,
  uploadSuccess: storeState.image.uploadSuccess
});

const mapDispatchToProps = {
  getMarques,
  getUnites,
  getFamilles,
  getTvas,
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

export default connect(mapStateToProps, mapDispatchToProps)(MateriauCreate);
