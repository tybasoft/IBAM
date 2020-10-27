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
import { getEntities, deleteEntity, filterEntities, apiUrl } from '../../../entities/bon-commande/bon-commande.reducer';
import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { RouteComponentProps } from 'react-router';
import { getSortState, Translate, TextFormat, JhiItemCount, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarSearch from 'app/new-template/components/search/Search';
import { connect } from 'react-redux';
import BonCommandeCreate from './bonCommandeCreate';
import BonCommandeDetails from './bonCommandeDetails';

export interface IBonCommandeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BonCommande = (props: IBonCommandeProps) => {
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

  const { bonCommandeList, match, loading, totalItems } = props;

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CardTitle className="row" style={{ margin: 0 }}>
                <Translate contentKey="ibamApp.bonCommande.home.title">Bon Commandes</Translate>
                <Form className="navbar-form mt-1 ml-auto float-left" role="search">
                  <NavbarSearch search={filter} clear={props.getEntities} />
                </Form>
              </CardTitle>
              <p>
                {' '}
                <Translate contentKey="ibamApp.bonCommande.home.description">fonction</Translate>
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
                {bonCommandeList && bonCommandeList.length > 0 ? (
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="hand" onClick={sort('id')}>
                          <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('datePrevLiv')}>
                          <Translate contentKey="ibamApp.bonCommande.datePrevLiv">Date Prev Liv</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('remarques')}>
                          <Translate contentKey="ibamApp.bonCommande.remarques">Remarques</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('dateCreation')}>
                          <Translate contentKey="ibamApp.bonCommande.dateCreation">Date Creation</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th className="hand" onClick={sort('valide')}>
                          <Translate contentKey="ibamApp.bonCommande.valide">Valide</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="ibamApp.bonCommande.fournisseur">Fournisseur</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="ibamApp.bonCommande.projet">Projet</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {bonCommandeList.map((bonCommande, i) => (
                        <tr key={`entity-${i}`}>
                          <td onClick={() => openDetails(bonCommande.id)} style={{ cursor: 'pointer' }}>
                            {bonCommande.id}
                          </td>
                          <td onClick={() => openDetails(bonCommande.id)} style={{ cursor: 'pointer' }}>
                            {bonCommande.datePrevLiv ? (
                              <TextFormat type="date" value={bonCommande.datePrevLiv} format={APP_LOCAL_DATE_FORMAT} />
                            ) : null}
                          </td>
                          <td onClick={() => openDetails(bonCommande.id)} style={{ cursor: 'pointer' }}>
                            {bonCommande.remarques}
                          </td>
                          <td onClick={() => openDetails(bonCommande.id)} style={{ cursor: 'pointer' }}>
                            {bonCommande.dateCreation ? (
                              <TextFormat type="date" value={bonCommande.dateCreation} format={APP_LOCAL_DATE_FORMAT} />
                            ) : null}
                          </td>
                          <td onClick={() => openDetails(bonCommande.id)} style={{ cursor: 'pointer' }}>
                            {bonCommande.valide ? 'true' : 'false'}
                          </td>
                          <td>
                            <Icon.Edit onClick={() => editEntity(bonCommande)} size={18} className="mr-2" />
                            <Icon.Trash2 onClick={() => confirmDelete(bonCommande.id)} size={18} color="#FF586B" />
                          </td>
                          <td onClick={() => openDetails(bonCommande.id)} style={{ cursor: 'pointer' }}>
                            {bonCommande.projet ? bonCommande.projet.libelle : ''}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  !loading && (
                    <div className="alert alert-warning">
                      <Translate contentKey="ibamApp.bonCommande.home.notFound">No Bon Commandes found</Translate>
                    </div>
                  )
                )}
              </div>
              {props.totalItems ? (
                <div className={bonCommandeList && bonCommandeList.length > 0 ? '' : 'd-none'}>
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
      <BonCommandeCreate modalOpen={modalOpen} handleClose={handleClose} bonCommandeEntity={entityModel} />
      {selectedEntity !== null && <BonCommandeDetails handleClose={handleClose} id={selectedEntity} isOpen={selectedEntity !== null} />}
      {/* <Modal isOpen={importExportOpen !== null} toggle={() => setImportExportOpen(null)} size="md">
        <ModalHeader toggle={() => setImportExportOpen(null)}>{importExportOpen === 'IMP' ? 'Importer' : 'Exporter'}</ModalHeader>
        <ModalBody>
          {importExportOpen === 'IMP' ? <Import apiUrl={apiUrl} /> : <Export apiUrl={apiUrl} action={ACTION_TYPES.} />}
        </ModalBody>
      </Modal> */}
    </Fragment>
  );
};

const mapStateToProps = ({ bonCommande }: IRootState) => ({
  bonCommandeList: bonCommande.entities,
  loading: bonCommande.loading,
  totalItems: bonCommande.totalItems,
  entityModel: bonCommande.entity
});

const mapDispatchToProps = {
  getEntities,
  deleteEntity,
  filterEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonCommande);
