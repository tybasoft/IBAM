import React, { Component, Fragment, useEffect, useState } from 'react';
import ProjetList from './projet/ProjetList';
import EmailSidebar from '../components/email/emailSidebar';
import ProjetActions from './projet/projetActions';
import ProjetSearch from './projet/projetSearch';
import ProjetContent from './projet/projetContent';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from 'app/entities/projet/projet.reducer';
import { getSortState, Translate } from 'react-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { Button, Row, Col } from 'reactstrap';
import { Mail, Plus, Upload, Download } from 'react-feather';

const Projet = props => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

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
                  <Button className="my-2 btn-raised" color="danger" block>
                    <Plus size={18} className="mr-1" /> <Translate contentKey="entity.action.create">Entreprises</Translate>
                  </Button>
                </Col>
                <Col md="6">
                  <Button className="my-2 btn-raised" color="danger" block>
                    <Upload size={18} className="mr-1" />
                    Importer
                  </Button>
                </Col>
                <Col md="6">
                  <Button className="my-2 btn-raised" color="danger" block>
                    <Download size={18} className="mr-1" /> <Translate contentKey="entity.action.download">Entreprises</Translate>
                  </Button>
                </Col>
              </Row>
              <ProjetSearch />
              <div className="email-actions px-2 bg-white">
                <ProjetActions />
              </div>
              <ProjetList list={projetList} />
            </div>
            <ProjetContent />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ projet }: IRootState) => ({
  projetList: projet.entities,
  loading: projet.loading,
  totalItems: projet.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Projet);

// export default Projet;
