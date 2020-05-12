import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './materiau.reducer';
import { IMateriau } from 'app/shared/model/materiau.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IMateriauProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Materiau = (props: IMateriauProps) => {
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

  const { materiauList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="materiau-heading">
        <Translate contentKey="ibamApp.materiau.home.title">Materiaus</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.materiau.home.createLabel">Create new Materiau</Translate>
        </Link>
      </h2>
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
                <th className="hand" onClick={sort('userModif')}>
                  <Translate contentKey="ibamApp.materiau.userModif">User Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateModif')}>
                  <Translate contentKey="ibamApp.materiau.dateModif">Date Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.materiau.marque">Marque</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.materiau.unite">Unite</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.materiau.famille">Famille</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.materiau.tva">Tva</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.materiau.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {materiauList.map((materiau, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${materiau.id}`} color="link" size="sm">
                      {materiau.id}
                    </Button>
                  </td>
                  <td>{materiau.libelle}</td>
                  <td>{materiau.reference}</td>
                  <td>{materiau.poids}</td>
                  <td>{materiau.volume}</td>
                  <td>{materiau.userModif}</td>
                  <td>
                    <TextFormat type="date" value={materiau.dateModif} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{materiau.marque ? <Link to={`marque/${materiau.marque.id}`}>{materiau.marque.id}</Link> : ''}</td>
                  <td>{materiau.unite ? <Link to={`unite/${materiau.unite.id}`}>{materiau.unite.id}</Link> : ''}</td>
                  <td>{materiau.famille ? <Link to={`famille/${materiau.famille.id}`}>{materiau.famille.id}</Link> : ''}</td>
                  <td>{materiau.tva ? <Link to={`tva/${materiau.tva.id}`}>{materiau.tva.id}</Link> : ''}</td>
                  <td>{materiau.image ? <Link to={`image/${materiau.image.id}`}>{materiau.image.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${materiau.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${materiau.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${materiau.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="ibamApp.materiau.home.notFound">No Materiaus found</Translate>
            </div>
          )
        )}
      </div>
      <div className={materiauList && materiauList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ materiau }: IRootState) => ({
  materiauList: materiau.entities,
  loading: materiau.loading,
  totalItems: materiau.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Materiau);
