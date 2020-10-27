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

import { IRootState } from 'app/shared/reducers';
import { getEntities, deleteEntity, filterEntities } from 'app/entities/bon-reception/bon-reception.reducer';
import { IBonReception } from 'app/shared/model/bon-reception.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { RouteComponentProps } from 'react-router';
import { getSortState, Translate, TextFormat, JhiItemCount, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarSearch from 'app/new-template/components/search/Search';
import { connect } from 'react-redux';
import BonReceptionCreate from './BonReceptionCreate';
import BonReceptionDetails from './BonReceptionDetails';

export interface IBonReceptionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BonReception = (props: IBonReceptionProps) => {
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
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1]
      });
    }
  }, [props.location.search]);

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

  const { bonReceptionList, match, loading, totalItems } = props;
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CardTitle className="row" style={{ margin: 0 }}>
                <Translate contentKey="ibamApp.bonReception.home.title">Bon Receptions</Translate>
                <Form className="navbar-form mt-1 ml-auto float-left" role="search">
                  <NavbarSearch search={filter} clear={props.getEntities} />
                </Form>
              </CardTitle>
              <p>
                {' '}
                <Translate contentKey="ibamApp.bonReception.home.description">fonction</Translate>
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
                {bonReceptionList && bonReceptionList.length > 0 ? (
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="hand" onClick={sort('id')}>
                          <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('livreur')}>
                          <Translate contentKey="ibamApp.bonReception.livreur">Livreur</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('remarques')}>
                          <Translate contentKey="ibamApp.bonReception.remarques">Remarques</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('dateLivraison')}>
                          <Translate contentKey="ibamApp.bonReception.dateLivraison">Date Livraison</Translate>{' '}
                          <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="ibamApp.bonReception.fournisseur">Fournisseur</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="ibamApp.bonReception.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="ibamApp.bonReception.projet">Projet</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {bonReceptionList.map((bonReception, i) => (
                        <tr key={`entity-${i}`}>
                          <td onClick={() => openDetails(bonReception.id)} style={{ cursor: 'pointer' }}>
                            {bonReception.id}
                          </td>
                          <td onClick={() => openDetails(bonReception.id)} style={{ cursor: 'pointer' }}>
                            {bonReception.livreur}
                          </td>
                          <td onClick={() => openDetails(bonReception.id)} style={{ cursor: 'pointer' }}>
                            {bonReception.remarques}
                          </td>
                          <td onClick={() => openDetails(bonReception.id)} style={{ cursor: 'pointer' }}>
                            {bonReception.dateLivraison ? (
                              <TextFormat type="date" value={bonReception.dateLivraison} format="DD-MM-YYYY" />
                            ) : null}
                          </td>
                          <td onClick={() => openDetails(bonReception.id)} style={{ cursor: 'pointer' }}>
                            {bonReception.fournisseur ? bonReception.fournisseur.email : ''}
                          </td>
                          <td>{bonReception.image ? bonReception.image.id : ''}</td>
                          <td>{bonReception.projet ? bonReception.projet.libelle : ''}</td>
                          <td>
                            <Icon.Edit onClick={() => editEntity(bonReception)} size={18} className="mr-2" />
                            <Icon.Trash2 onClick={() => confirmDelete(bonReception.id)} size={18} color="#FF586B" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  !loading && (
                    <div className="alert alert-warning">
                      <Translate contentKey="ibamApp.bonReception.home.notFound">No Bon Receptions found</Translate>
                    </div>
                  )
                )}
              </div>
              {props.totalItems ? (
                <div className={bonReceptionList && bonReceptionList.length > 0 ? '' : 'd-none'}>
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
      <BonReceptionCreate modalOpen={modalOpen} handleClose={handleClose} bonReceptionEntity={entityModel} />
      {selectedEntity !== null && <BonReceptionDetails handleClose={handleClose} id={selectedEntity} isOpen={selectedEntity !== null} />}
      {/* <Modal isOpen={importExportOpen !== null} toggle={() => setImportExportOpen(null)} size="md">
        <ModalHeader toggle={() => setImportExportOpen(null)}>{importExportOpen === 'IMP' ? 'Importer' : 'Exporter'}</ModalHeader>
        <ModalBody>
          {importExportOpen === 'IMP' ? <Import apiUrl={apiUrl} /> : <Export apiUrl={apiUrl} action={ACTION_TYPES.} />}
        </ModalBody>
      </Modal> */}
    </Fragment>
  );
};

const mapStateToProps = ({ bonReception }: IRootState) => ({
  bonReceptionList: bonReception.entities,
  loading: bonReception.loading,
  totalItems: bonReception.totalItems,
  entityModel: bonReception.entity
});

const mapDispatchToProps = {
  getEntities,
  deleteEntity,
  filterEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonReception);
