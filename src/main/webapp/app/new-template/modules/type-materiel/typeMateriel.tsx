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

import { getEntities, ACTION_TYPES, apiUrl, filterEntities } from '../../../entities/type-materiel/type-materiel.reducer';
import { Translate, translate, getSortState, JhiPagination, JhiItemCount, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarSearch from '../../components/search/Search';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
// import EmployeDetails from './employe-details';
import { Link } from 'react-router-dom';
import TypeMaterielCreate from './typeMaterielCreate';
import TypeMaterielDetails from './typeMaterielDetails';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export const TypeMateriel = (props: any) => {
  // const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));
  const [modalOpen, setModalOpen] = useState(false);
  const [importExportOpen, setImportExportOpen] = useState(null);

  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entityModel, setEntityModel] = useState(props.entityModel);

  useEffect(() => {
    props.getEntities();
  }, []);

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

  const { typeMaterielList, match, loading } = props;
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CardTitle className="row" style={{ margin: 0 }}>
                <Translate contentKey="ibamApp.typeMateriel.home.title">Fonctions</Translate>
                <Form className="navbar-form mt-1 ml-auto float-left" role="search">
                  <NavbarSearch search={filter} clear={props.getEntities} />
                </Form>
              </CardTitle>
              <p>
                {' '}
                <Translate contentKey="ibamApp.typeMateriel.home.description">fonction</Translate>
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
                {typeMaterielList && typeMaterielList.length > 0 ? (
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>
                          <Translate contentKey="global.field.id">ID</Translate>
                        </th>
                        <th>
                          <Translate contentKey="ibamApp.typeMateriel.type">Type</Translate>
                        </th>
                        {/* <th>
                  <Translate contentKey="ibamApp.typeMateriel.userModif">User Modif</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.typeMateriel.dateModif">Date Modif</Translate>
                </th> */}
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {typeMaterielList.map((typeMateriel, i) => (
                        <tr key={`entity-${i}`}>
                          <td onClick={() => openDetails(typeMateriel.id)} style={{ cursor: 'pointer' }}>
                            {/* <Button tag={Link} to={`${match.url}/${typeMateriel.id}`} color="link" size="sm"> */}
                            {typeMateriel.id}
                            {/* </Button> */}
                          </td>
                          <td onClick={() => openDetails(typeMateriel.id)} style={{ cursor: 'pointer' }}>
                            {typeMateriel.type}
                          </td>
                          {/* <td>{typeMateriel.userModif}</td>
                  <td>
                    <TextFormat type="date" value={typeMateriel.dateModif} format={APP_LOCAL_DATE_FORMAT} />
                  </td> */}
                          <td>
                            <Icon.Edit onClick={() => editEntity(typeMateriel)} size={18} className="mr-2" />
                            <Icon.Trash2 onClick={() => confirmDelete(typeMateriel.id)} size={18} color="#FF586B" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  !loading && (
                    <div className="alert alert-warning">
                      <Translate contentKey="ibamApp.typeMateriel.home.notFound">No Type Materiels found</Translate>
                    </div>
                  )
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <TypeMaterielCreate modalOpen={modalOpen} handleClose={handleClose} typeMaterielEntity={entityModel} />
      {selectedEntity !== null && <TypeMaterielDetails handleClose={handleClose} id={selectedEntity} isOpen={selectedEntity !== null} />}
      <Modal isOpen={importExportOpen !== null} toggle={() => setImportExportOpen(null)} size="md">
        <ModalHeader toggle={() => setImportExportOpen(null)}>{importExportOpen === 'IMP' ? 'Importer' : 'Exporter'}</ModalHeader>
        <ModalBody>
          {importExportOpen === 'IMP' ? <Import apiUrl={apiUrl} /> : <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = ({ typeMateriel }: IRootState) => ({
  typeMaterielList: typeMateriel.entities,
  loading: typeMateriel.loading,
  entityModel: typeMateriel.entity
});

const mapDispatchToProps = {
  getEntities,
  filterEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TypeMateriel);
