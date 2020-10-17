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

import { getEntities, ACTION_TYPES, apiUrl, filterEntities } from '../../../entities/fournisseur/fournisseur.reducer';
import { Translate, translate, getSortState, JhiPagination, JhiItemCount, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarSearch from '../../components/search/Search';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
// import EmployeDetails from './employe-details';
import { Link } from 'react-router-dom';
import FournisseurCreate from './fournisseurCreate';
import FournisseurDetails from './fournisseurDetails';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export const Fournisseur = (props: any) => {
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

  const { fournisseurList, match, loading, totalItems } = props;
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CardTitle className="row" style={{ margin: 0 }}>
                <Translate contentKey="ibamApp.fournisseur.home.title">Fonctions</Translate>
                <Form className="navbar-form mt-1 ml-auto float-left" role="search">
                  <NavbarSearch search={filter} clear={props.getEntities} />
                </Form>
              </CardTitle>
              <p>
                {' '}
                <Translate contentKey="ibamApp.fournisseur.home.description">fonction</Translate>
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
                {fournisseurList && fournisseurList.length > 0 ? (
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="hand" onClick={sort('id')}>
                          <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('nomCommercial')}>
                          <Translate contentKey="ibamApp.fournisseur.nomCommercial">Nom Commercial</Translate>{' '}
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('type')}>
                          <Translate contentKey="ibamApp.fournisseur.type">Type</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('fax')}>
                          <Translate contentKey="ibamApp.fournisseur.fax">Fax</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('nom')}>
                          <Translate contentKey="ibamApp.fournisseur.nom">Nom</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('prenom')}>
                          <Translate contentKey="ibamApp.fournisseur.prenom">Prenom</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        {/* <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="ibamApp.fournisseur.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('tel')}>
                  <Translate contentKey="ibamApp.fournisseur.tel">Tel</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('adresse')}>
                  <Translate contentKey="ibamApp.fournisseur.adresse">Adresse</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="ibamApp.fournisseur.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userModif')}>
                  <Translate contentKey="ibamApp.fournisseur.userModif">User Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateModif')}>
                  <Translate contentKey="ibamApp.fournisseur.dateModif">Date Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th> */}
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {fournisseurList.map((fournisseur, i) => (
                        <tr key={`entity-${i}`}>
                          <td onClick={() => openDetails(fournisseur.id)} style={{ cursor: 'pointer' }}>
                            {/* <Button tag={Link} to={`${match.url}/${fournisseur.id}`} color="link" size="sm"> */}
                            {fournisseur.id}
                            {/* </Button> */}
                          </td>
                          <td onClick={() => openDetails(fournisseur.id)} style={{ cursor: 'pointer' }}>
                            {fournisseur.nomCommercial}
                          </td>
                          <td onClick={() => openDetails(fournisseur.id)} style={{ cursor: 'pointer' }}>
                            {fournisseur.type}
                          </td>
                          <td onClick={() => openDetails(fournisseur.id)} style={{ cursor: 'pointer' }}>
                            {fournisseur.fax}
                          </td>
                          <td onClick={() => openDetails(fournisseur.id)} style={{ cursor: 'pointer' }}>
                            {fournisseur.nom}
                          </td>
                          <td onClick={() => openDetails(fournisseur.id)} style={{ cursor: 'pointer' }}>
                            {fournisseur.prenom}
                          </td>
                          {/* <td>{fournisseur.email}</td>
                  <td>{fournisseur.tel}</td>
                  <td>{fournisseur.adresse}</td>
                  <td>{fournisseur.description}</td>
                  <td>{fournisseur.userModif}</td>
                  <td>
                    <TextFormat type="date" value={fournisseur.dateModif} format={APP_LOCAL_DATE_FORMAT} />
                  </td> */}
                          <td>
                            <Icon.Edit onClick={() => editEntity(fournisseur)} size={18} className="mr-2" />
                            <Icon.Trash2 onClick={() => confirmDelete(fournisseur.id)} size={18} color="#FF586B" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  !loading && (
                    <div className="alert alert-warning">
                      <Translate contentKey="ibamApp.fournisseur.home.notFound">No Fournisseurs found</Translate>
                    </div>
                  )
                )}
              </div>
              <div className={fournisseurList && fournisseurList.length > 0 ? '' : 'd-none'}>
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
      <FournisseurCreate modalOpen={modalOpen} handleClose={handleClose} fournisseurEntity={entityModel} />
      {selectedEntity !== null && <FournisseurDetails handleClose={handleClose} id={selectedEntity} isOpen={selectedEntity !== null} />}
      <Modal isOpen={importExportOpen !== null} toggle={() => setImportExportOpen(null)} size="md">
        <ModalHeader toggle={() => setImportExportOpen(null)}>{importExportOpen === 'IMP' ? 'Importer' : 'Exporter'}</ModalHeader>
        <ModalBody>
          {importExportOpen === 'IMP' ? <Import apiUrl={apiUrl} /> : <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};
const mapStateToProps = ({ fournisseur }: IRootState) => ({
  fournisseurList: fournisseur.entities,
  loading: fournisseur.loading,
  totalItems: fournisseur.totalItems,
  entityModel: fournisseur.entity
});

const mapDispatchToProps = {
  getEntities,
  filterEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Fournisseur);
