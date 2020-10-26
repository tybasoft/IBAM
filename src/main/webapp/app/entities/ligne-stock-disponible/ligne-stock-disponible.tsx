import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './ligne-stock-disponible.reducer';
import { ILigneStockDisponible } from 'app/shared/model/ligne-stock-disponible.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ILigneStockDisponibleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const LigneStockDisponible = (props: ILigneStockDisponibleProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));


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
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { ligneStockDisponibleList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="ligne-stock-disponible-heading">
        <Translate contentKey="ibamApp.ligneStockDisponible.home.title">Ligne Stock Disponibles</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.ligneStockDisponible.home.createLabel">Create new Ligne Stock Disponible</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {ligneStockDisponibleList && ligneStockDisponibleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('quantite')}>
                  <Translate contentKey="ibamApp.ligneStockDisponible.quantite">Quantite</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('type')}>
                  <Translate contentKey="ibamApp.ligneStockDisponible.type">Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.ligneStockDisponible.materiel">Materiel</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.ligneStockDisponible.materiau">Materiau</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.ligneStockDisponible.stockDisponible">Stock Disponible</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ligneStockDisponibleList.map((ligneStockDisponible, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${ligneStockDisponible.id}`} color="link" size="sm">
                      {ligneStockDisponible.id}
                    </Button>
                  </td>
                  <td>{ligneStockDisponible.quantite}</td>
                  <td>{ligneStockDisponible.type}</td>
                  <td>
                    {ligneStockDisponible.materiel ? (
                      <Link to={`materiel/${ligneStockDisponible.materiel.id}`}>{ligneStockDisponible.materiel.reference}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {ligneStockDisponible.materiau ? (
                      <Link to={`materiau/${ligneStockDisponible.materiau.id}`}>{ligneStockDisponible.materiau.reference}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {ligneStockDisponible.stockDisponible ? (
                      <Link to={`stock-disponible/${ligneStockDisponible.stockDisponible.id}`}>
                        {ligneStockDisponible.stockDisponible.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${ligneStockDisponible.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${ligneStockDisponible.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${ligneStockDisponible.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="ibamApp.ligneStockDisponible.home.notFound">No Ligne Stock Disponibles found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={ligneStockDisponibleList && ligneStockDisponibleList.length > 0 ? '' : 'd-none'}>
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
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ ligneStockDisponible }: IRootState) => ({
  ligneStockDisponibleList: ligneStockDisponible.entities,
  loading: ligneStockDisponible.loading,
  totalItems: ligneStockDisponible.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LigneStockDisponible);
