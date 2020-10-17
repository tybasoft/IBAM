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
} from '../../../entities/materiau/materiau.reducer';
import { Translate, translate, getSortState, JhiPagination, JhiItemCount, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarSearch from '../../components/search/Search';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
// import EmployeDetails from './employe-details';
import { Link } from 'react-router-dom';
import MateriauCreate from './materiauCreate';
import MateriauDetails from './materiauDetails';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export const Materiau = (props: any) => {
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

  const { materiauList, match, loading, totalItems } = props;
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CardTitle className="row" style={{ margin: 0 }}>
                <Translate contentKey="ibamApp.materiau.home.title">Fonctions</Translate>
                <Form className="navbar-form mt-1 ml-auto float-left" role="search">
                  <NavbarSearch search={filter} clear={props.getEntities} />
                </Form>
              </CardTitle>
              <p>
                {' '}
                <Translate contentKey="ibamApp.materiau.home.description">fonction</Translate>
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
                {materiauList && materiauList.length > 0 ? (
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="hand" onClick={sort('id')}>
                          <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('libelle')}>
                          <Translate contentKey="ibamApp.materiau.libelle">Libelle</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('reference')}>
                          <Translate contentKey="ibamApp.materiau.reference">Reference</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('poids')}>
                          <Translate contentKey="ibamApp.materiau.poids">Poids</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('volume')}>
                          <Translate contentKey="ibamApp.materiau.volume">Volume</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {materiauList.map((materiau, i) => (
                        <tr key={`entity-${i}`}>
                          <td onClick={() => openDetails(materiau.id)} style={{ cursor: 'pointer' }}>
                            {/* <Button tag={Link} to={`${match.url}/${materiau.id}`} color="link" size="sm"> */}
                            {materiau.id}
                            {/* </Button> */}
                          </td>
                          <td onClick={() => openDetails(materiau.id)} style={{ cursor: 'pointer' }}>
                            {materiau.libelle}
                          </td>
                          <td onClick={() => openDetails(materiau.id)} style={{ cursor: 'pointer' }}>
                            {materiau.reference}
                          </td>
                          <td onClick={() => openDetails(materiau.id)} style={{ cursor: 'pointer' }}>
                            {materiau.poids}
                          </td>
                          <td onClick={() => openDetails(materiau.id)} style={{ cursor: 'pointer' }}>
                            {materiau.volume}
                          </td>
                          {/*  <td>{materiau.userModif}</td>
                  <td>
                    <TextFormat type="date" value={materiau.dateModif} format={APP_LOCAL_DATE_FORMAT} />
                  </td> */}
                          <td onClick={() => openDetails(materiau.id)} style={{ cursor: 'pointer' }}>
                            {materiau.marque ? <Link to={`marque/${materiau.marque.id}`}>{materiau.marque.libelle}</Link> : ''}
                          </td>
                          {/*  <td>{materiau.unite ? <Link to={`unite/${materiau.unite.id}`}>{materiau.unite.libelle}</Link> : ''}</td>
                  <td>{materiau.famille ? <Link to={`famille/${materiau.famille.id}`}>{materiau.famille.libelle}</Link> : ''}</td>
                  <td>{materiau.tva ? <Link to={`tva/${materiau.tva.id}`}>{materiau.tva.taux}</Link> : ''}</td>
                  <td>{materiau.image ? <Link to={`image/${materiau.image.id}`}>{materiau.image.id}</Link> : ''}</td>
                  */}{' '}
                          <td>
                            <Icon.Edit onClick={() => editEntity(materiau)} size={18} className="mr-2" />
                            <Icon.Trash2 onClick={() => confirmDelete(materiau.id)} size={18} color="#FF586B" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  !loading && (
                    <div className="alert alert-warning">
                      <Translate contentKey="ibamApp.materiau.home.notFound">No Materiaus found</Translate>
                    </div>
                  )
                )}
              </div>
              <div className={materiauList && materiauList.length > 0 ? '' : 'd-none'}>
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
      <MateriauCreate modalOpen={modalOpen} handleClose={handleClose} materiauEntity={entityModel} />
      {selectedEntity !== null && <MateriauDetails handleClose={handleClose} id={selectedEntity} isOpen={selectedEntity !== null} />}
      <Modal isOpen={importExportOpen !== null} toggle={() => setImportExportOpen(null)} size="md">
        <ModalHeader toggle={() => setImportExportOpen(null)}>{importExportOpen === 'IMP' ? 'Importer' : 'Exporter'}</ModalHeader>
        <ModalBody>
          {importExportOpen === 'IMP' ? <Import apiUrl={apiUrl} /> : <Export apiUrl={apiUrl} action={ACTION_TYPES.REPORT} />}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};
const mapStateToProps = ({ materiau }: IRootState) => ({
  materiauList: materiau.entities,
  loading: materiau.loading,
  totalItems: materiau.totalItems,
  entityModel: materiau.entity
});

const mapDispatchToProps = {
  getEntities,
  filterEntities
};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Materiau);
