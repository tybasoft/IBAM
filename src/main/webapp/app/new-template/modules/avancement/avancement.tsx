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
import Export from '../../../shared/Repport/export';
import Import from '../../../shared/Repport/import';

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
  apiUrl
  // filterEntities
} from '../../../entities/avancement/avancement.reducer';
import { Translate, translate, getSortState, JhiPagination, JhiItemCount, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarSearch from '../../components/search/Search';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
// import EmployeDetails from './employe-details';
import { Link } from 'react-router-dom';
import AvancementCreate from './avancementCreate';
import AvancementDetails from './avancementDetails';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export const Avancement = (props: any) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));
  const [modalOpen, setModalOpen] = useState(false);
  const [importExportOpen, setImportExportOpen] = useState(null);

  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entityModel, setEntityModel] = useState(props.entityModel);
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
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const handleClose = () => {
    setEntityModel(props.entityModel);
    setSelectedEntity(null);
    setModalOpen(false);
  };

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

  const { avancementList, match, loading, totalItems } = props;
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CardTitle className="row" style={{ margin: 0 }}>
                <Translate contentKey="ibamApp.avancement.home.title">Fonctions</Translate>
                <Form className="navbar-form mt-1 ml-auto float-left" role="search">
                  <NavbarSearch search={filter} clear={props.getEntities} />
                </Form>
              </CardTitle>
              <p>
                {' '}
                <Translate contentKey="ibamApp.avancement.home.description">fonction</Translate>
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
              <div className="table-responsive">
                {avancementList && avancementList.length > 0 ? (
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="hand" onClick={sort('id')}>
                          <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('createdAt')}>
                          <Translate contentKey="ibamApp.avancement.createdAt">Created At</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('updatedAt')}>
                          <Translate contentKey="ibamApp.avancement.updatedAt">Updated At</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('titreCompteRendu')}>
                          <Translate contentKey="ibamApp.avancement.titreCompteRendu">Titre Compte Rendu</Translate>{' '}
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('contenuCompteRendu')}>
                          <Translate contentKey="ibamApp.avancement.contenuCompteRendu">Contenu Compte Rendu</Translate>{' '}
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="ibamApp.avancement.employe">Employe</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {avancementList.map((avancement, i) => (
                        <tr key={`entity-${i}`}>
                          <td onClick={() => openDetails(avancement.id)} style={{ cursor: 'pointer' }}>
                            {/* <Button tag={Link} to={`${match.url}/${avancement.id}`} color="link" size="sm"> */}
                            {avancement.id}
                            {/* </Button> */}
                          </td>
                          <td onClick={() => openDetails(avancement.id)} style={{ cursor: 'pointer' }}>
                            {avancement.createdAt ? (
                              <TextFormat type="date" value={avancement.createdAt} format={APP_LOCAL_DATE_FORMAT} />
                            ) : null}
                          </td>
                          <td onClick={() => openDetails(avancement.id)} style={{ cursor: 'pointer' }}>
                            {avancement.updatedAt ? (
                              <TextFormat type="date" value={avancement.updatedAt} format={APP_LOCAL_DATE_FORMAT} />
                            ) : null}
                          </td>
                          <td onClick={() => openDetails(avancement.id)} style={{ cursor: 'pointer' }}>
                            {avancement.titreCompteRendu}
                          </td>
                          <td onClick={() => openDetails(avancement.id)} style={{ cursor: 'pointer' }}>
                            {avancement.contenuCompteRendu}
                          </td>
                          <td onClick={() => openDetails(avancement.id)} style={{ cursor: 'pointer' }}>
                            {avancement.employe ? avancement.employe.nom : ''}
                          </td>
                          <td>
                            <Icon.Edit onClick={() => editEntity(avancement)} size={18} className="mr-2" />
                            <Icon.Trash2 onClick={() => confirmDelete(avancement.id)} size={18} color="#FF586B" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  !loading && (
                    <div className="alert alert-warning">
                      <Translate contentKey="ibamApp.avancement.home.notFound">No Avancements found</Translate>
                    </div>
                  )
                )}
              </div>
              {props.totalItems ? (
                <div className={avancementList && avancementList.length > 0 ? '' : 'd-none'}>
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
              ) : (
                ''
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <AvancementCreate modalOpen={modalOpen} handleClose={handleClose} avancementEntity={entityModel} />
      {selectedEntity !== null && <AvancementDetails handleClose={handleClose} id={selectedEntity} isOpen={selectedEntity !== null} />}
      {/* <Modal isOpen={importExportOpen !== null} toggle={() => setImportExportOpen(null)} size="md">
        <ModalHeader toggle={() => setImportExportOpen(null)}>{importExportOpen === 'IMP' ? 'Importer' : 'Exporter'}</ModalHeader>
        <ModalBody>
          {importExportOpen === 'IMP' ? <Import apiUrl={apiUrl} /> : <Export apiUrl={apiUrl} action={ACTION_TYPES.} />}
        </ModalBody>
      </Modal> */}
    </Fragment>
  );
};

const mapStateToProps = ({ avancement }: IRootState) => ({
  avancementList: avancement.entities,
  loading: avancement.loading,
  totalItems: avancement.totalItems,
  entityModel: avancement.entity
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Avancement);
