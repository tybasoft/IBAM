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
  apiUrl,
  filterEntities
} from '../../../entities/affectation-materiels/affectation-materiels.reducer';
import { Translate, translate, getSortState, JhiPagination, JhiItemCount, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarSearch from '../../components/search/Search';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
// import EmployeDetails from './employe-details';
import { Link } from 'react-router-dom';
import AffectationMaterielsCreate from './affectationMaterielCreate';
import AffectationMaterielsDetails from './affectationMaterielDetails';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export const AffectationMateriels = (props: any) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));
  const [modalOpen, setModalOpen] = useState(false);
  const [importExportOpen, setImportExportOpen] = useState(null);

  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entityModel, setEntityModel] = useState(props.entityModel);
  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
    console.log(props.affectationMaterielsList);
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
    console.log('searching', e);
    props.filterEntities(e);
  };

  const { affectationMaterielsList, match, loading, totalItems } = props;
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CardTitle className="row" style={{ margin: 0 }}>
                <Translate contentKey="ibamApp.affectationMateriels.home.title">Fonctions</Translate>
                <Form className="navbar-form mt-1 ml-auto float-left" role="search">
                  <NavbarSearch search={filter} clear={props.getEntities} />
                </Form>
              </CardTitle>
              <p>
                {' '}
                <Translate contentKey="ibamApp.affectationMateriels.home.description">fonction</Translate>
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
                {affectationMaterielsList && affectationMaterielsList.length > 0 ? (
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="hand" onClick={sort('id')}>
                          <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('dateDebut')}>
                          <Translate contentKey="ibamApp.affectationMateriels.dateDebut">Date Debut</Translate>{' '}
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('dateFin')}>
                          <Translate contentKey="ibamApp.affectationMateriels.dateFin">Date Fin</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('description')}>
                          <Translate contentKey="ibamApp.affectationMateriels.description">Description</Translate>{' '}
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="ibamApp.affectationMateriels.projet">Projet</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="ibamApp.affectationMateriels.materiel">Materiel</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {affectationMaterielsList.map((affectationMateriels, i) => (
                        <tr key={`entity-${i}`}>
                          <td onClick={() => openDetails(affectationMateriels.id)} style={{ cursor: 'pointer' }}>
                            {/* <Button tag={Link} to={`${match.url}/${affectationMateriels.id}`} color="link" size="sm"> */}
                            {affectationMateriels.id}
                            {/* </Button> */}
                          </td>
                          <td onClick={() => openDetails(affectationMateriels.id)} style={{ cursor: 'pointer' }}>
                            {affectationMateriels.dateDebut ? (
                              <TextFormat type="date" value={affectationMateriels.dateDebut} format={APP_LOCAL_DATE_FORMAT} />
                            ) : null}
                          </td>
                          <td onClick={() => openDetails(affectationMateriels.id)} style={{ cursor: 'pointer' }}>
                            {affectationMateriels.dateFin ? (
                              <TextFormat type="date" value={affectationMateriels.dateFin} format={APP_LOCAL_DATE_FORMAT} />
                            ) : null}
                          </td>
                          <td onClick={() => openDetails(affectationMateriels.id)} style={{ cursor: 'pointer' }}>
                            {affectationMateriels.description}
                          </td>
                          <td onClick={() => openDetails(affectationMateriels.id)} style={{ cursor: 'pointer' }}>
                            {affectationMateriels.projet ? (
                              <Link to={`projet/${affectationMateriels.projet.id}`}>{affectationMateriels.projet.libelle}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                          <td onClick={() => openDetails(affectationMateriels.id)} style={{ cursor: 'pointer' }}>
                            {affectationMateriels.materiel ? affectationMateriels.materiel.libelle : ''}
                          </td>
                          <td>
                            <Icon.Edit onClick={() => editEntity(affectationMateriels)} size={18} className="mr-2" />
                            <Icon.Trash2 onClick={() => confirmDelete(affectationMateriels.id)} size={18} color="#FF586B" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  !loading && (
                    <div className="alert alert-warning">
                      <Translate contentKey="ibamApp.affectationMateriels.home.notFound">No Affectation Materiels found</Translate>
                    </div>
                  )
                )}
              </div>
              {props.totalItems ? (
                <div className={affectationMaterielsList && affectationMaterielsList.length > 0 ? '' : 'd-none'}>
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
                      itemsPerPage={10}
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
      <AffectationMaterielsCreate modalOpen={modalOpen} handleClose={handleClose} affectationMaterielsEntity={entityModel} />
      {selectedEntity !== null && (
        <AffectationMaterielsDetails handleClose={handleClose} id={selectedEntity} isOpen={selectedEntity !== null} />
      )}
      <Modal isOpen={importExportOpen !== null} toggle={() => setImportExportOpen(null)} size="md">
        <ModalHeader toggle={() => setImportExportOpen(null)}>{importExportOpen === 'IMP' ? 'Importer' : 'Exporter'}</ModalHeader>
        <ModalBody>
          {importExportOpen === 'IMP' ? <Import apiUrl={apiUrl} /> : <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = ({ affectationMateriels }: IRootState) => ({
  affectationMaterielsList: affectationMateriels.entities,
  loading: 10,
  totalItems: affectationMateriels.totalItems,
  entityModel: affectationMateriels.entity
});

const mapDispatchToProps = {
  getEntities,
  filterEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AffectationMateriels);
