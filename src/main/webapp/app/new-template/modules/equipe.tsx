import React, { Component, Fragment, useEffect, useState } from 'react';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

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
import { getEntities as getEmployes } from 'app/entities/employe/employe.reducer';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
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
} from '../../entities/equipe/equipe.reducer';
import { Translate, translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarSearch from '../components/search/Search';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import EquipeDetails from './equipe-details';

const Equipe = (props: any) => {
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
    props.getEmployes();
    props.getProjets();
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

  const { list, totalItems, materiels, projets, employes } = props;

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
                <Translate contentKey="ibamApp.equipe.home.title">Fonctions</Translate>
                <Form className="navbar-form mt-1 ml-auto float-left" role="search">
                  <NavbarSearch search={filter} clear={props.getEntities} />
                </Form>
              </CardTitle>
              <p>
                {' '}
                <Translate contentKey="ibamApp.equipe.home.description">fonction</Translate>
              </p>

              <div className="form-group mb-3 form-group-compose text-center">
                <Button type="button" onClick={() => setModalOpen(true)} className="btn float-left btn-raised btn-danger  my-2 shadow-z-2">
                  <Icon.Plus size={18} className="mr-1" /> <Translate contentKey="entity.action.create">Fonction</Translate>
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
                        <Translate contentKey="ibamApp.equipe.libelle">Libelle</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      {/*
                <th className="hand" onClick={sort('userModif')}>
                  <Translate contentKey="ibamApp.equipe.userModif">User Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateModif')}>
                  <Translate contentKey="ibamApp.equipe.dateModif">Date Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                */}
                      <th>
                        <Translate contentKey="ibamApp.equipe.projet">Projet</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="ibamApp.equipe.equipe">Equipe</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th />
                      <th>
                        Actions
                        {/* <Translate contentKey="ibamApp.entreprise.capital">Capital</Translate> */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((element, i) => (
                      <tr key={`entity-${i}`}>
                        <td onClick={() => openDetails(element.id)} style={{ cursor: 'pointer' }}>
                          {/* <Button tag={Link} to={`${match.url}/${entreprise.id}`} color="link" size="sm"> */}
                          {element.id}
                          {/* </Button> */}
                        </td>
                        <td onClick={() => openDetails(element.id)} style={{ cursor: 'pointer' }}>
                          {element.libelle}
                        </td>
                        {/*
                  <td>{equipe.userModif}</td>
                  <td>
                    <TextFormat type="date" value={equipe.dateModif} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  */}
                        <td onClick={() => openDetails(element.id)} style={{ cursor: 'pointer' }}>
                          {element.projet ? element.projet.libelle : ''}
                        </td>
                        <td onClick={() => openDetails(element.id)} style={{ cursor: 'pointer' }}>
                          {element.equipe ? element.equipe.nom + ' ' + element.equipe.prenom : ''}
                        </td>
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
          <Translate contentKey="ibamApp.transfertMateriel.home.createLabel">Entreprises</Translate>
        </ModalHeader>
        {/* <AddTodo /> */}
        <AvForm model={entityModel} onSubmit={saveEntity}>
          <ModalBody>
            <Row>
              <Col md={12}>
                <AvGroup>
                  <Label id="libelleLabel" for="equipe-libelle">
                    <Translate contentKey="ibamApp.equipe.libelle">Libelle</Translate>
                  </Label>
                  <AvField
                    id="equipe-libelle"
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
                  <Label for="equipe-projet">
                    <Translate contentKey="ibamApp.equipe.projet">Projet</Translate>
                  </Label>
                  <AvInput id="equipe-projet" type="select" className="form-control" name="projet.id">
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
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <AvGroup>
                  <Label for="equipe-equipe">
                    <Translate contentKey="ibamApp.equipe.equipe">Equipe</Translate>
                  </Label>
                  <AvInput id="equipe-equipe" type="select" className="form-control" name="equipe.id">
                    <option value="" key="0" />
                    {employes
                      ? employes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.prenom + ' ' + otherEntity.nom + ' (' + otherEntity.matricule + ')'}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
              </Col>
              <Col md={12}>
                <AvGroup>
                  <Label for="transfert-materiel-materiel">
                    <Translate contentKey="ibamApp.transfertMateriel.materiel">Materiel</Translate>
                  </Label>
                  <AvInput id="transfert-materiel-materiel" type="select" className="form-control" name="materiel.id">
                    <option value="" key="0" />
                    {materiels
                      ? materiels.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.libelle + ' (' + otherEntity.matricule + ')'}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
              </Col>
              <Col md={12}>
                <AvGroup>
                  <Label for="transfert-materiel-projet">
                    <Translate contentKey="ibamApp.transfertMateriel.projet">Projet</Translate>
                  </Label>
                  <AvInput id="transfert-materiel-projet" type="select" className="form-control" name="projet.id">
                    <option value="" key="0" />
                    {projets
                      ? projets.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.libelle + ' (' + otherEntity.reference + ')'}
                          </option>
                        ))
                      : null}
                  </AvInput>
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
        <EquipeDetails selectedEntity={selectedEntity} setSelectedEntity={openDetails} isOpen={selectedEntity !== null} />
      )}
    </Fragment>
  );
};
// }

const mapStateToProps = ({ equipe, materiel, projet }: IRootState) => ({
  list: equipe.entities,
  loading: equipe.loading,
  updateSuccess: equipe.updateSuccess,
  //   imageEntity: image.entity,
  totalItems: equipe.totalItems,
  materiels: materiel.entities,
  projets: projet.entities
});

const mapDispatchToProps = {
  getEntities,
  createEntity,
  deleteEntity,
  updateEntity,
  filterEntities,

  getEmployes,
  getProjets
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Equipe);

// export default Entreprise;
