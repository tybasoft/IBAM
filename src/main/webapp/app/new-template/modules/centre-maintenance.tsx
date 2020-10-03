import React, { Component, Fragment, useEffect, useState } from 'react';

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
} from '../../entities/fonction/fonction.reducer';
import { Translate, translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarSearch from '../components/search/Search';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import CentreMaintenanceDetails from './centre-maintenance-details';

const CentreMaintenance = (props: any) => {
  console.log(props);

  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const [modalOpen, setModalOpen] = useState(false);
  const [importExportOpen, setImportExportOpen] = useState(null);

  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entityModel, setEntityModel] = useState(null);

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
  };

  const { list, totalItems } = props;

  const openDetails = (id: number) => {
    setSelectedEntity(id);
    console.log('Opening entity id : ', id);
  };

  const confirmDelete = (id: number) => {
    if (confirm("Voulez vous supprimer l'élément avec ID " + id)) {
      props.deleteEntity(id);
    }
  };

  const editEntity = entity => {
    setEntityModel(entity);
    console.log(entity, entityModel);
    setModalOpen(true);
  };

  const filter = e => {
    console.log(e);
    props.filterEntities(e);
  };

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const saveEntity = (event, errors, values) => {
    let entity;
    if (errors.length === 0) {
      entity = {
        ...entityModel,
        ...values
      };

      console.log('Entity :', entity);

      if (entityModel === null) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
      handleClose();
    }
  };

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CardTitle className="row" style={{ margin: 0 }}>
                <Translate contentKey="ibamApp.centreMaintenance.home.title">Fonctions</Translate>
                <Form className="navbar-form mt-1 ml-auto float-left" role="search">
                  <NavbarSearch search={filter} clear={props.getEntities} />
                </Form>
              </CardTitle>
              <p>
                {' '}
                <Translate contentKey="ibamApp.centreMaintenance.home.description">fonction</Translate>
              </p>

              <div className="form-group mb-3 form-group-compose text-center">
                <Button type="button" onClick={() => setModalOpen(true)} className="btn float-left btn-raised btn-danger  my-2 shadow-z-2">
                  <Icon.Plus size={18} className="mr-1" />{' '}
                  <Translate contentKey="ibamApp.centreMaintenance.home.createLabel">Fonction</Translate>
                </Button>
                <Button
                  onClick={() => setImportExportOpen('EXP')}
                  type="button"
                  className="btn btn-raised  float-right btn-danger  my-2 shadow-z-2"
                >
                  <Icon.Download size={18} className="mr-1" /> <Translate contentKey="entity.action.download">Entreprises</Translate>
                </Button>

                <Button
                  onClick={() => setImportExportOpen('IMP')}
                  type="button"
                  className="btn btn-raised  float-right  mr-2 btn-danger  my-2 shadow-z-2"
                >
                  <Icon.Upload size={18} className="mr-1" />
                  {/* Importer */}
                  <Translate contentKey="entity.action.upload">Entreprises</Translate>
                </Button>
              </div>
              {list && list.length > 0 ? (
                <Table striped>
                  <thead>
                    <tr>
                      <th className="hand" onClick={sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={sort('libelle')}>
                        <Translate contentKey="ibamApp.centreMaintenance.libelle">Libelle</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={sort('specialite')}>
                        <Translate contentKey="ibamApp.centreMaintenance.specialite">Specialite</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={sort('responsable')}>
                        <Translate contentKey="ibamApp.centreMaintenance.responsable">Responsable</Translate>{' '}
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={sort('adresse')}>
                        <Translate contentKey="ibamApp.centreMaintenance.adresse">Adresse</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        Actions
                        {/* <Translate contentKey="ibamApp.entreprise.capital">Capital</Translate> */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((element, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          {/* <Button tag={Link} to={`${match.url}/${entreprise.id}`} color="link" size="sm"> */}
                          {element.id}
                          {/* </Button> */}
                        </td>
                        <td onClick={() => openDetails(element.id)} style={{ cursor: 'pointer' }}>
                          {element.libelle}
                        </td>
                        <td>{element.specialite}</td>
                        <td>{element.responsable}</td>
                        <td>{element.adresse}</td>
                        <td>
                          <Icon.Edit onClick={() => editEntity(element)} size={18} className="mr-2" />
                          <Icon.Trash2 onClick={() => confirmDelete(element.id)} size={18} color="#FF586B" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="alert alert-warning">No Entreprises found</div>
              )}
              <div className={list && list.length > 0 ? '' : 'd-none'}>
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
          <Translate contentKey="ibamApp.fonction.home.createLabel">Entreprises</Translate>
        </ModalHeader>
        {/* <AddTodo /> */}
        <AvForm model={entityModel} onSubmit={saveEntity}>
          <ModalBody>
            <Row>
              <Col md={12}>
                <AvGroup>
                  <Label id="libelleLabel" for="centre-maintenance-libelle">
                    <Translate contentKey="ibamApp.centreMaintenance.libelle">Libelle</Translate>
                  </Label>
                  <AvField
                    id="centre-maintenance-libelle"
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
                  <Label id="specialiteLabel" for="centre-maintenance-specialite">
                    <Translate contentKey="ibamApp.centreMaintenance.specialite">Specialite</Translate>
                  </Label>
                  <AvField id="centre-maintenance-specialite" type="text" name="specialite" />
                </AvGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <AvGroup>
                  <Label id="responsableLabel" for="centre-maintenance-responsable">
                    <Translate contentKey="ibamApp.centreMaintenance.responsable">Responsable</Translate>
                  </Label>
                  <AvField id="centre-maintenance-responsable" type="text" name="responsable" />
                </AvGroup>
              </Col>
              <Col md={12}>
                <AvGroup>
                  <Label id="adresseLabel" for="centre-maintenance-adresse">
                    <Translate contentKey="ibamApp.centreMaintenance.adresse">Adresse</Translate>
                  </Label>
                  <AvField
                    id="centre-maintenance-adresse"
                    type="text"
                    name="adresse"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
              </Col>
              <Col md={12}>
                <AvGroup>
                  <Label id="telephoneLabel" for="centre-maintenance-telephone">
                    <Translate contentKey="ibamApp.centreMaintenance.telephone">Telephone</Translate>
                  </Label>
                  <AvField
                    id="centre-maintenance-telephone"
                    type="text"
                    name="telephone"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
              </Col>
              <Col md={12}>
                <AvGroup>
                  <Label id="emailLabel" for="centre-maintenance-email">
                    <Translate contentKey="ibamApp.centreMaintenance.email">Email</Translate>
                  </Label>
                  <AvField id="centre-maintenance-email" type="text" name="email" />
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
        <CentreMaintenanceDetails selectedEntity={selectedEntity} setSelectedEntity={openDetails} isOpen={selectedEntity !== null} />
      )}
    </Fragment>
  );
};
// }

const mapStateToProps = ({ fonction }: IRootState) => ({
  list: fonction.entities,
  loading: fonction.loading,
  updateSuccess: fonction.updateSuccess,
  //   imageEntity: image.entity,
  totalItems: fonction.totalItems
});

const mapDispatchToProps = {
  getEntities,
  createEntity,
  deleteEntity,
  updateEntity,
  filterEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CentreMaintenance);

// export default Entreprise;
