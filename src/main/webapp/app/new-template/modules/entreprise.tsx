import React, { Component, Fragment, useEffect, useState } from 'react';
// import CustomTabs from '../../components/tabs/customTabs';
// import ContentHeader from '../../components/contentHead/contentHeader';
// import ContentSubHeader from '../../components/contentHead/contentSubHeader';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';

import {
  uploadImage,
  getEntity as getImage,
  deleteImageFile,
  deleteEntity as deleteImageEntity,
  createEntity as createImageEntity,
  reset as resetImage
} from 'app/entities/image/image.reducer';
import { Link, RouteComponentProps } from 'react-router-dom';

import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';

import * as Icon from 'react-feather';

//Prism
// eslint-disable-next-line
import Prism from 'prismjs'; //Include JS
import 'prismjs/themes/prism-okaidia.css'; //Include CSS
import { PrismCode } from 'react-prism'; //Prism Component
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';

import {
  getEntities,
  createEntity,
  deleteEntity,
  updateEntity,
  ACTION_TYPES,
  apiUrl,
  filterEntities
} from '../../entities/entreprise/entreprise.reducer';
import EntrepriseDetails from './entreprise-details';
import { Translate, translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarSearch from '../components/search/Search';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

const Entreprise = (props: any) => {
  console.log(props);

  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const [modalOpen, setModalOpen] = useState(false);
  const [importExportOpen, setImportExportOpen] = useState(null);

  // const [isNew, setIsNew] = useState(true);

  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entityModel, setEntityModel] = useState(null);

  const [imageDeleted, setimageDeleted] = useState(false);
  const [imageID, setimageID] = useState(null);
  const [imageFile, setimageFile] = useState(null);

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, []);

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const handleClose = () => {
    setEntityModel(null);
    setModalOpen(false);
    setimageDeleted(false);
    setimageID(null);
    setimageFile(null);
  };

  const { entrepriseList, match, location, totalItems } = props;

  const openDetails = (id: number) => {
    setSelectedEntity(id);
    console.log('Opening entity id : ', id);
  };

  const uploadNewImage = values => {
    const storageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name);
    const image = {
      titre: values.nomCommercial,
      path: storageName
    };
    const imageData = new FormData();
    imageData.append('file', imageFile);
    imageData.append('storageName', storageName);

    props.uploadImage(imageData);
    return image;
  };

  const confirmDelete = (id: number) => {
    if (confirm("Voulez vous supprimer l'entreprise avec ID " + id)) {
      props.deleteEntity(id);
    }
  };

  // let entityModel = { };

  const editEntity = entreprise => {
    setEntityModel(entreprise);
    console.log(entreprise, entityModel);
    if (entreprise.image) props.getImage(entreprise.image.id);

    // setIsNew(false);
    setModalOpen(true);
  };

  const filter = e => {
    console.log(e);
    props.filterEntities(e);
    // console.log(entrepriseList);
  };

  const saveEntity = (event, errors, values) => {
    let imageStorageName;
    let image;
    let entity;
    const imageData = new FormData();
    if (errors.length === 0) {
      entity = {
        ...entityModel,
        ...values
      };

      console.log('Entity :', entity);

      if (entityModel === null) {
        if (imageFile) {
          image = uploadNewImage(values);
          entity.image = image;
        }
        props.createEntity(entity);
        handleClose();
      } else {
        if (entityModel.image == null) {
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
          props.deleteImageFile(entityModel.image.path.substr(24));
          setimageID(entityModel.image.id);
          props.updateEntity(entity);
        } else {
          image = {
            id: entityModel.image.id,
            titre: values.nomCommercial,
            path: entityModel.image.path.substr(27)
          };
          entity.image = image;

          if (imageFile) {
            (imageStorageName = Date.now().toString() + '.' + /[^.]+$/.exec(imageFile.name)), (image.path = imageStorageName);
            entity.image = image;
            imageData.append('file', imageFile);
            imageData.append('storageName', imageStorageName);

            props.deleteImageFile(entityModel.image.path.substr(24));
            props.uploadImage(imageData);
          }
          props.updateEntity(entity);
        }
      }
    }
  };

  return (
    <Fragment>
      {/* <ContentHeader>Basic Tables </ContentHeader>
        <ContentSubHeader>
          All table styles are inherited in Bootstrap 4, meaning any nested tables will be styled in the same manner as the parent.
        </ContentSubHeader> */}
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CardTitle className="row" style={{ margin: 0 }}>
                <Translate contentKey="ibamApp.entreprise.home.title">Entreprises</Translate>
                <Form className="navbar-form mt-1 ml-auto float-left" role="search">
                  <NavbarSearch search={filter} clear={props.getEntities} />
                </Form>
              </CardTitle>
              <p>
                {' '}
                <Translate contentKey="ibamApp.entreprise.home.description">Entreprises</Translate>
              </p>

              <div className="form-group mb-3 form-group-compose text-center">
                <Button type="button" onClick={() => setModalOpen(true)} className="btn float-left btn-raised btn-danger  my-2 shadow-z-2">
                  <Icon.Plus size={18} className="mr-1" />{' '}
                  <Translate contentKey="ibamApp.entreprise.home.createLabel">Entreprises</Translate>
                </Button>
                {/* <Link onClick={() => setImportExportOpen(true)}> */}
                <Button
                  onClick={() => setImportExportOpen('EXP')}
                  type="button"
                  // onClick={() => setModalOpen(true)}
                  className="btn btn-raised  float-right btn-danger  my-2 shadow-z-2"
                >
                  <Icon.Download size={18} className="mr-1" /> <Translate contentKey="entity.action.download">Entreprises</Translate>
                </Button>
                {/* </Link> */}
                {/* <Link to={`${location.pathname}/import`}> */}
                <Button
                  onClick={() => setImportExportOpen('IMP')}
                  type="button"
                  // onClick={() => setModalOpen(true)}
                  className="btn btn-raised  float-right  mr-2 btn-danger  my-2 shadow-z-2"
                >
                  <Icon.Upload size={18} className="mr-1" />
                  Importer
                  {/* <Translate contentKey="entity.action.download">Entreprises</Translate> */}
                </Button>
                {/* </Link> */}
              </div>
              {entrepriseList && entrepriseList.length > 0 ? (
                <Table striped>
                  <thead>
                    <tr>
                      <th>
                        <Translate contentKey="global.field.id">ID</Translate>
                      </th>
                      <th>
                        <Translate contentKey="ibamApp.entreprise.entiteJuridique">Entite Juridique</Translate>
                      </th>
                      <th>
                        <Translate contentKey="ibamApp.entreprise.nomCommercial">Nom Commercial</Translate>
                      </th>
                      <th>
                        <Translate contentKey="ibamApp.entreprise.adresse">Adresse</Translate>
                      </th>
                      <th>
                        <Translate contentKey="ibamApp.entreprise.capital">Capital</Translate>
                      </th>
                      <th>
                        Actions
                        {/* <Translate contentKey="ibamApp.entreprise.capital">Capital</Translate> */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {entrepriseList.map((entreprise, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          {/* <Button tag={Link} to={`${match.url}/${entreprise.id}`} color="link" size="sm"> */}
                          {entreprise.id}
                          {/* </Button> */}
                        </td>
                        <td onClick={() => openDetails(entreprise.id)} style={{ cursor: 'pointer' }}>
                          {entreprise.entiteJuridique}
                        </td>
                        <td>{entreprise.nomCommercial}</td>
                        <td>{entreprise.adresse}</td>
                        <td>{entreprise.capital}</td>
                        <td>
                          <Icon.Edit onClick={() => editEntity(entreprise)} size={18} className="mr-2" />
                          <Icon.Trash2 onClick={() => confirmDelete(entreprise.id)} size={18} color="#FF586B" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="alert alert-warning">No Entreprises found</div>
              )}
              <div className={entrepriseList && entrepriseList.length > 0 ? '' : 'd-none'}>
                <Row className="justify-content-center">
                  <JhiItemCount
                    page={paginationState.activePage}
                    total={totalItems}
                    itemsPerPage={paginationState.itemsPerPage}
                    i18nEnabled
                  />
                </Row>
                <Row className="justify-content-center">
                  <JhiPagination
                    activePage={paginationState.activePage}
                    onSelect={handlePagination}
                    maxButtons={5}
                    itemsPerPage={paginationState.itemsPerPage}
                    totalItems={props.totalItems}
                  />
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={modalOpen} toggle={() => handleClose()} size="md">
        <ModalHeader toggle={() => handleClose()}>
          <Translate contentKey="ibamApp.entreprise.home.createLabel">Entreprises</Translate>
        </ModalHeader>
        {/* <AddTodo /> */}
        <AvForm model={entityModel} onSubmit={saveEntity}>
          <ModalBody>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="entiteJuridique">Entité Juridique</Label>
                  <AvField className="form-control" type="text" name="entiteJuridique" id="entiteJuridique" required />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="nomCommercial">Nom Commercial</Label>
                  <AvField className="form-control" type="text" name="nomCommercial" id="nomCommercial" required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="adresse">Adresse</Label>
                  <AvField className="form-control" type="text" name="adresse" id="adresse" required />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="capital">Capital</Label>
                  <AvField className="form-control" type="text" name="capital" id="capital" required />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label id="directionLabel" for="entreprise-direction">
                    <Translate contentKey="ibamApp.entreprise.direction">Direction</Translate>
                  </Label>
                  <AvField id="entreprise-direction" type="text" name="direction" />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label id="activiteLabel" for="entreprise-activite">
                    <Translate contentKey="ibamApp.entreprise.activite">Activite</Translate>
                  </Label>
                  <AvField id="entreprise-activite" type="text" name="activite" />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label id="telephoneLabel" for="entreprise-telephone">
                    <Translate contentKey="ibamApp.entreprise.telephone">Telephone</Translate>
                  </Label>
                  <AvField id="entreprise-telephone" type="text" name="telephone" />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label id="emailLabel" for="entreprise-email">
                    <Translate contentKey="ibamApp.entreprise.email">Email</Translate>
                  </Label>
                  <AvField id="entreprise-email" type="text" name="email" />
                </FormGroup>
              </Col>
              <Col md={12}>
                <AvGroup>
                  <Label>
                    <Translate contentKey="ibamApp.entreprise.image">Image</Translate>
                  </Label>
                  {entityModel !== null ? (
                    <div>
                      <dd>
                        {!imageDeleted && entityModel.image !== null && entityModel.image.path !== undefined ? (
                          <img
                            src={props.imageEntity.path + '?' + Math.random()}
                            alt="not found"
                            style={{ width: '300px', border: 'solid 1px' }}
                          />
                        ) : null}
                      </dd>
                      <dd>
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => setimageDeleted(true)}
                          disabled={imageDeleted || entityModel.image == null}
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
                    id="entreprise-image"
                    type="file"
                    name="imageFile"
                    accept=".png, .jpg, .jpeg"
                    // validate={{ async: validate }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setimageFile(event.target.files[0])}
                    style={{ opacity: '0', position: 'absolute', height: '0px' }}
                  />
                  <div className="form-group" style={{ marginBottom: '-10px' }}>
                    <Label for="entreprise-image" className="btn btn-secondary">
                      {translate('entity.inputImageFile')}
                    </Label>
                    <Label className="p-2">
                      {imageFile !== null && imageFile !== undefined ? imageFile.name : translate('entity.noFileChoosed')}
                    </Label>
                  </div>
                  {/* <AvFeedback>{errorMessage}</AvFeedback> */}
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

      <Modal isOpen={importExportOpen !== null} toggle={() => setImportExportOpen(null)} size="md">
        <ModalHeader toggle={() => setImportExportOpen(null)}>{importExportOpen === 'IMP' ? 'Importer' : 'Exporter'}</ModalHeader>
        <ModalBody>
          {importExportOpen === 'IMP' ? <Import apiUrl={apiUrl} /> : <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />}
        </ModalBody>
      </Modal>

      {selectedEntity !== null && (
        <EntrepriseDetails selectedEntity={selectedEntity} setSelectedEntity={openDetails} isOpen={selectedEntity !== null} />
      )}
    </Fragment>
  );
};
// }

const mapStateToProps = ({ entreprise, image }: IRootState) => ({
  entrepriseList: entreprise.entities,
  loading: entreprise.loading,
  updateSuccess: entreprise.updateSuccess,
  imageEntity: image.entity,
  totalItems: entreprise.totalItems
});

const mapDispatchToProps = {
  getEntities,
  createEntity,
  deleteEntity,
  updateEntity,
  filterEntities,

  getImage,
  uploadImage,
  deleteImageFile,
  createImageEntity,
  deleteImageEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Entreprise);

// export default Entreprise;
