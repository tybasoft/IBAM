import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label,Table } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDepot } from 'app/shared/model/depot.model';
import { getEntities as getDepots } from 'app/entities/depot/depot.reducer';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { getEntities as getFournisseurs } from 'app/entities/fournisseur/fournisseur.reducer';
import { IImage } from 'app/shared/model/image.model';
import {getEntities as getMateriau} from "app/entities/materiau/materiau.reducer";
import {getEntities as getProjects} from "app/entities/projet/projet.reducer";
import {getEntities as getMateriels} from "app/entities/materiel/materiel.reducer";
import {getEntitiesById as getLigneBonReception} from "app/entities/ligne-bon-reception/ligne-bon-reception.reducer";
import {getEntity as getOneMateriel} from "app/entities/materiel/materiel.reducer";
import {getEntity as getOneMateriau} from "app/entities/materiau/materiau.reducer";
import { useHistory } from 'react-router-dom';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import {
  createEntity as createImageEntity,
  getEntity as getImageEntity,
  reset as resetImage,
  deleteEntity as deleteImageEntity,
  uploadImage,
  deleteImageFile
} from 'app/entities/image/image.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bon-reception.reducer';
import { getEntities as getCurrencies } from './currency.reducer';
import { IBonReception } from 'app/shared/model/bon-reception.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import _debounce from 'lodash.debounce';
import projet from "app/entities/projet/projet";
import {ICurrency} from "app/shared/model/currency";

export interface IBonReceptionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NewBonReceptionUpdate = (props: IBonReceptionUpdateProps) => {
  const [errorMessage, seterrorMessage] = useState('');
  const [imageID, setimageID] = useState(null);
  const [imageDeleted, setimageDeleted] = useState(false);
  const [imageFile, setimageFile] = useState(null);
  const [modal, setModal] = useState(false);
  const [bigmodal, setBigModal] = useState(true);
  const [materielObj, setMaterielObj] = useState({id: "1"});
  const [materiauObj, setMateriauObj] = useState({id: "1"});
  const [newLines, setNewLines] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const history = useHistory();

  const {currenciesList, ligneBonReceptionList,projets,materiels ,materiaus ,bonReceptionEntity, depots, fournisseurs, loading, updating, imageEntity } = props;

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

  // const handleClose = () => {
  //   props.history.push('/bon-reception' + props.location.search);
  // };
  const handleClose = () => {
    setModal(false);

    // props.history.push('/bon-commande' + props.location.search);
  };
  const handleShow = () => {
    // isOpen=true;
    setModal(true);
    console.warn("Clicked on handleShow : "+modal)

  };

  const handleCloseBig = () => {
    setBigModal(false);

    // props.history.push('/bon-commande' + props.location.search);
  };
  const handleShowBig = () => {
    // isOpen=true;
    setBigModal(true);
    console.warn("Clicked on handleShow : "+modal)

  };


  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.resetImage();
      props.getEntity(props.match.params.id);
      props.getLigneBonReception(props.match.params.id);
      // console.warn(ligneBonReceptionList);

    }

    // props.getDepots();
    props.getFournisseurs();
    props.getDepots();
    props.getFournisseurs();
    props.getMateriau();
    props.getMateriels();
    props.getProjects();
    props.getCurrencies();
    console.warn(currenciesList);
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
    values.ligneBonRecs = newLines;
    const imageData = new FormData();
    if (errors.length === 0) {
      entity = {
        ...bonReceptionEntity,
        ...values
      };

      if (isNew) {
        if (imageFile) {
          image = uploadNewImage(values);
          entity.image = image;
        }
        props.createEntity(entity);
        handleCloseBig();
        history.push("/bon-reception");
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
          handleCloseBig();
          history.push("/bon-reception");
          window.location.reload(false);
        }
      }
    }
  };
  const [typeLigne, setTypeLigne] = React.useState('materiel');
  const [disableMateriel, setDisableMateriel] = useState();
  const [disableMateriau, setDisableMateriau] = useState();



  const handleChange = (event) => {
    setTypeLigne(event.target.value);
    // if(typeLigne ==='materiel'){
    //   setDisableMateriel(false);
    //   setDisableMateriau(true);
    // }
    // if(typeLigne==='materiau'){
    //   setDisableMateriel(false);
    //   setDisableMateriau(false);
    // }
    // if(typeLigne==='both'){
    //   setDisableMateriel(true);
    //   setDisableMateriau(false);

    // }
  };
  const saveMateriau = (event, errors, values) => {
    console.warn("Add to table Materiau");
    if (errors.length === 0) {
      const entity = {
        // ...bonCommandeEntity,
        // ...ligneBonComs,
        ...values
      };
      newLines.push({materiel:{id:values.materiel} ,
        materiau:{id:values.materiau},quantite:values.quantity,
        prixHt:values.prixHt , currency :values.currency , type:typeLigne});
      // newLines.push({materiel: {id: "3"}, materiau:null, quantite: "1", prixHt: "120", currency: "CDF", type: "materiel"});
      console.warn(newLines);
      setModal(false);

    }
  };


  return (
    <div>

      <Modal size="lg" style={{maxWidth: '900px', width: '100%'}}  isOpen={bigmodal} toggle={handleClose} >

        <ModalHeader toggle={handleClose} >
          <Translate contentKey="ibamApp.bonReception.home.createOrEditLabel">Create or edit a BonCommande</Translate>
        </ModalHeader>
        <div>
          {/*<Row className="justify-content-center">
            <Col md="8">
              <h2 id="ibamApp.bonCommande.home.createOrEditLabel">
                <Translate contentKey="ibamApp.bonCommande.home.createOrEditLabel">Create or edit a BonCommande</Translate>
              </h2>
            </Col>
          </Row>*/}
          <Row  className="justify-content-center">
            <Col md="11">
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
                  <ModalBody id="ibamApp.bonCommande.delete.question">

                  <AvGroup>
                    <Label id="livreurLabel" for="bon-reception-livreur">
                      <Translate contentKey="ibamApp.bonReception.livreur">Livreur</Translate>
                    </Label>
                    <AvField id="bon-reception-livreur" type="text" name="livreur" />
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
                    <Label for="bon-reception-depot">
                      <Translate contentKey="ibamApp.bonReception.projet">Projet</Translate>
                    </Label>
                    <AvInput id="bon-reception-depot" type="select" className="form-control" name="projet.id">
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
                  <AvGroup>
                    <Label for="bon-reception-fournisseur">
                      <Translate contentKey="ibamApp.bonReception.fournisseur">Fournisseur</Translate>
                    </Label>
                    <AvInput id="bon-reception-fournisseur" type="select" className="form-control" name="fournisseur.id">
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
                      <Label id="remarquesLabel" for="bon-reception-remarques">
                        <Translate contentKey="ibamApp.bonReception.remarques">Remarques</Translate>
                      </Label>
                      <AvField id="bon-reception-remarques" type="text" name="remarques" />
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
                    <Button
                      tag={Link}
                      color="primary"
                      size="sm"
                      onClick={handleShow}
                    >
                      <FontAwesomeIcon icon="pencil-alt" />{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="ibamApp.bonCommande.newline">add</Translate>
                        </span>
                    </Button>
                    <Table responsive>
                      <thead>
                      <tr>
                        {/* <th className="hand" >
                          <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                        </th>*/}
                        <th className="hand">
                          <Translate contentKey="ibamApp.ligneBonCommande.quantite">Quantite</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand">
                          <Translate contentKey="ibamApp.ligneBonReception.prixHt">Prix HT</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="ibamApp.bonCommande.materiausAndMateriels">Materiaus/Materiels</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th />
                      </tr>
                      </thead>
                      <tbody>
                      {newLines.map((data, i) => (
                        <tr key={`entity-${i}`}>

                          <td>{data.quantite}</td>
                          <td>{data.prixHt}</td>
                          <td>{data.materiau.id ? data.materiau.id : ''} {data.materiel.id ? data.materiel.id : ''}</td>
                          <td className="text-right">
                            <div className="btn-group flex-btn-group-container">

                              <Button
                                tag={Link}
                                color="danger"
                                size="sm"

                              >
                                <FontAwesomeIcon icon="trash" />{' '}
                                <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </Table>

                  </ModalBody>
                  <ModalFooter>
                    <Button tag={Link} id="cancel-save" to="/bon-reception" replace color="info">
                      <FontAwesomeIcon icon="arrow-left" />
                      &nbsp;
                      <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
                    </Button>
                    &nbsp;
                    <Button   color="primary" id="save-entity"  type="submit"  >
                      <FontAwesomeIcon icon="save" />
                      &nbsp;
                      <Translate contentKey="entity.action.save">Save</Translate>
                    </Button>
                  </ModalFooter>
                </AvForm>
              )}
            </Col>
          </Row>
        </div>


        {/*<ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button color="primary" id="save-entity" type="submit" disabled={saveEntity}>
          <FontAwesomeIcon icon="save" />
          &nbsp;
          <Translate contentKey="entity.action.save">Save</Translate>
        </Button>
        <Button id="jhi-confirm-delete-bonCommande" color="primary" onClick={confirmAdd()}>
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.bonCommande.add">Create</Translate>
        </Button>
      </ModalFooter>*/}
      </Modal>

      {/******************************** Second Modal ********************************/}

      <Modal isOpen={modal} toggle={handleShow}>
        <ModalHeader>
          <Translate contentKey="ibamApp.bonCommande.home.createOrEditLabelLigne">Add</Translate>
        </ModalHeader>
        <AvForm onSubmit={saveMateriau}>
          <ModalBody id="ibamApp.bonCommande.delete.question">
            <ModalBody id="ibamApp.bonCommande.delete.question">
              <FormControl component="fieldset">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup aria-label="type" name="type" value={typeLigne} onChange={handleChange}>
                  <FormControlLabel value="materiel" control={<Radio />} label="Materiel" />
                  <FormControlLabel value="materiau" control={<Radio />} label="Materiau" />
                  <FormControlLabel value="both" control={<Radio />} label="Les deux" />
                </RadioGroup>
              </FormControl>
              {typeLigne==='materiau' || typeLigne==='both' ? (
                  <AvGroup>
                <Label for="bon-commande-depot">
                  <Translate contentKey="ibamApp.bonCommande.materiau">Materiau</Translate>
                </Label>
                <AvInput id="bon-commande-depot" type="select" className="form-control" name="materiau"  disabled={disableMateriau}>
                  <option value="" key="0" />
                  {materiaus
                    ? materiaus.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.libelle}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              ) : null}
              {typeLigne==='materiel' || typeLigne==='both' ? (
              <AvGroup>
                <Label for="bon-commande-materiel" >
                  <Translate contentKey="ibamApp.bonCommande.materiel">Materiel</Translate>
                </Label>
                <AvInput id="bon-commande-materiel" type="select" className="form-control" name="materiel" >
                  <option value="" key="0"  />
                  {materiels
                    ? materiels.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.libelle}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="bon-commande-currency">
                  <Translate contentKey="ibamApp.bonReception.currency">Currency</Translate>
                </Label>
                <AvInput id="bon-commande-materiel" type="select" className="form-control" name="currency">
                  <option value="" key="0"  />
                  {currenciesList
                    ? currenciesList.map(otherEntity => (
                      <option value={otherEntity.currencyCode} key={otherEntity.numericCode}>
                        {otherEntity.currencyCode}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="prixHtLabel" for="ligne-bon-reception-prixHt">
                  <Translate contentKey="ibamApp.ligneBonReception.prixHt">Prix Ht</Translate>
                </Label>
                <AvField id="ligne-bon-reception-prixHt" type="text" name="prixHt" />
              </AvGroup>
              <AvGroup>
                <Label id="remarquesLabel" for="bon-commande-remarques">
                  <Translate contentKey="ibamApp.bonCommande.quantity">Quantite</Translate>
                </Label>
                <AvField id="bon-commande-remarques" type="number" name="quantity" />
              </AvGroup>
            </ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button id="cancel-save" to="/bon-commande" replace color="info" onClick={handleClose}>
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
            </Button>
            &nbsp;
            <Button  color="primary" to="/bon-commande" id="save-entity" type="submit"  >
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>

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
  images: storeState.image.entities,
    currencyList : storeState.bonReception.currenciesList,
  errorUpload: storeState.image.errorUpload,
  uploadSuccess: storeState.image.uploadSuccess,
  projets: storeState.projet.entities,
  materiaus: storeState.materiau.entities,
  materiels: storeState.materiel.entities,
    currenciesList : storeState.currency.entities,
  // tab : storeState.ligneBonCommande.entities,
  // materiau: storeState.materiau.entity,
  // materiel: storeState.materiel.entity,
  //   currency: icurrency,
  ligneBonReceptionList: storeState.ligneBonReception.entities,
  totalItems: storeState.ligneBonReception.totalItems,
});

const mapDispatchToProps = {
  getDepots,
  getFournisseurs,
  getMateriels,
  getMateriau,
  getProjects,
  getEntity,
  updateEntity,
  createEntity,
  reset,
  getCurrencies,
  createImageEntity,
  uploadImage,
  getImageEntity,
  getLigneBonReception,
  resetImage,
  deleteImageFile,
  deleteImageEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NewBonReceptionUpdate);
