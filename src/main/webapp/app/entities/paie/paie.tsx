import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './paie.reducer';
import { IPaie } from 'app/shared/model/paie.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPaieProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Paie = (props: IPaieProps) => {
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

  const { paieList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="paie-heading">
        <Translate contentKey="ibamApp.paie.home.title">Paies</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.paie.home.createLabel">Create new Paie</Translate>
        </Link>
       
      </h2>
      <div className="table-responsive">
        {paieList && paieList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('datePaiement')}>
                  <Translate contentKey="ibamApp.paie.datePaiement">Date Paiement</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nbrJourTravail')}>
                  <Translate contentKey="ibamApp.paie.nbrJourTravail">Nbr Jour Travail</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('montantPay')}>
                  <Translate contentKey="ibamApp.paie.montantPay">Montant Pay</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nbrHeurSup')}>
                  <Translate contentKey="ibamApp.paie.nbrHeurSup">Nbr Heur Sup</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                {/* <th className="hand" onClick={sort('dateDebut')}>
                  <Translate contentKey="ibamApp.paie.dateDebut">Date Debut</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateFin')}>
                  <Translate contentKey="ibamApp.paie.dateFin">Date Fin</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('remarques')}>
                  <Translate contentKey="ibamApp.paie.remarques">Remarques</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userModif')}>
                  <Translate contentKey="ibamApp.paie.userModif">User Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateModif')}>
                  <Translate contentKey="ibamApp.paie.dateModif">Date Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.paie.employe">Employe</Translate> <FontAwesomeIcon icon="sort" />
                </th> */}
                <th />
              </tr>
            </thead>
            <tbody>
              {paieList.map((paie, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${paie.id}`} color="link" size="sm">
                      {paie.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={paie.datePaiement} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{paie.nbrJourTravail}</td>
                  <td>{paie.montantPay}</td>
                  <td>{paie.nbrHeurSup}</td>
                  {/* <td>
                    <TextFormat type="date" value={paie.dateDebut} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={paie.dateFin} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{paie.remarques}</td>
                  <td>{paie.userModif}</td>
                  <td>
                    <TextFormat type="date" value={paie.dateModif} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{paie.employe ? <Link to={`employe/${paie.employe.id}`}>{paie.employe.id}</Link> : ''}</td> */}
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${paie.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${paie.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${paie.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="ibamApp.paie.home.notFound">No Paies found</Translate>
            </div>
          )
        )}
      </div>
      <div className={paieList && paieList.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
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
    </div>
  );
};

const mapStateToProps = ({ paie }: IRootState) => ({
  paieList: paie.entities,
  loading: paie.loading,
  totalItems: paie.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Paie);
