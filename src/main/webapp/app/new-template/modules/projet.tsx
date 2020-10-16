import React, { Component, Fragment, useEffect, useState } from 'react';
import ProjetList from './projet/ProjetList';
import EmailSidebar from '../components/email/emailSidebar';
import ProjetActions from './projet/projetActions';
import ProjetSearch from './projet/projetSearch';
import ProjetContent from './projet/projetContent';
import ProjetCreate from './projet/projetCreate';
import { getEntities, filterEntities } from 'app/entities/projet/projet.reducer';

import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getSortState, Translate } from 'react-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { Button, Row, Col } from 'reactstrap';
import { Mail, Plus, Upload, Download, Link, Edit, Trash } from 'react-feather';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { apiUrl, ACTION_TYPES } from 'app/entities/projet/projet.reducer';
import Export from '../../shared/Repport/export';
import Import from '../../shared/Repport/import';
import NavbarSearch from '../components/search/Search';

const Projet = props => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));
  const [modalOpen, setModalOpen] = useState(false);
  const [entityModel, setEntityModel] = useState(null);
  const [importExportOpen, setImportExportOpen] = useState(null);
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
    setEntityModel(null);
    setModalOpen(false);
  };

  const editEntity = () => {
    setEntityModel(props.selected);
    console.log(props.selected, entityModel);
    //  if (entreprise.image) props.getImage(entreprise.image.id);

    // setIsNew(false);
    setModalOpen(true);
  };

  const filter = e => {
    console.log(e);
    props.filterEntities(e);
    // console.log(entrepriseList);
  };

  const confirmDelete = (id: number) => {
    if (confirm('Voulez vous supprimer le projet avec ID ' + id)) {
      props.deleteEntity(id);
      // projetList = [];
    }
  };

  const { projetList, match, loading, totalItems } = props;

  return (
    <Fragment>
      <div className="email-application">
        <div className="content-overlay"></div>
        {/* <EmailSidebar /> */}
        <div className="ml-1 row">
          <div className="email-app-content-area w-100">
            <div className="email-app-list-mails p-0">
              <Row className="p-2">
                <Col md="12">
                  <Button className="my-2 btn-raised" onClick={() => setModalOpen(true)} color="danger" block>
                    {' '}
                    <Plus size={18} className="mr-1" /> <Translate contentKey="entity.action.create">Entreprises</Translate>
                  </Button>
                </Col>
                <Col md="6">
                  <Button onClick={() => setImportExportOpen('IMP')} className="my-2 btn-raised" color="danger" block>
                    {' '}
                    <Upload size={18} className="mr-1" />
                    Importer
                  </Button>
                </Col>
                <Col md="6">
                  <Button onClick={() => setImportExportOpen('EXP')} className="my-2 btn-raised" color="danger" block>
                    {' '}
                    <Download size={18} className="mr-1" /> <Translate contentKey="entity.action.download">Entreprises</Translate>
                  </Button>
                </Col>
              </Row>
              <div className="email-search-box w-100 bg-white p-2">
                <NavbarSearch search={filter} clear={props.getEntities} />
              </div>
              {props.selected && (
                <div className="email-actions px-2 bg-white">
                  <Row>
                    <Col xs="8">
                      {/* <Button className="float-left email-action-icon"> */}
                      <Edit className="float-left email-action-icon" size={18} color="#212529" onClick={() => editEntity()} />
                      {/* </Button> */}
                      {/* <Button className="float-left email-action-icon"> */}
                      <Trash
                        className="float-left email-action-icon"
                        size={18}
                        color="#212529"
                        onClick={() => confirmDelete(props.selected.id)}
                      />
                      {/* </Button> */}
                    </Col>
                  </Row>
                </div>
              )}
              <ProjetList list={projetList} />
            </div>
            <ProjetContent />
          </div>
        </div>
        <ProjetCreate modalOpen={modalOpen} handleClose={handleClose} entityModel={entityModel} />
      </div>
      <Modal isOpen={importExportOpen !== null} toggle={() => setImportExportOpen(null)} size="md">
        <ModalHeader toggle={() => setImportExportOpen(null)}>{importExportOpen === 'IMP' ? 'Importer' : 'Exporter'}</ModalHeader>
        <ModalBody>
          {importExportOpen === 'IMP' ? <Import apiUrl={apiUrl} /> : <Export apiUrl={apiUrl} action={ACTION_TYPES.REPPORT} />}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = ({ projet }: IRootState) => ({
  projetList: projet.entities,
  loading: projet.loading,
  totalItems: projet.totalItems,
  selected: projet.entity
});

const mapDispatchToProps = {
  getEntities,
  filterEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Projet);

// export default Projet;
