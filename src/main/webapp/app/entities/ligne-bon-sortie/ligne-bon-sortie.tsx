import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './ligne-bon-sortie.reducer';
import { ILigneBonSortie } from 'app/shared/model/ligne-bon-sortie.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ILigneBonSortieProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const LigneBonSortie = (props: ILigneBonSortieProps) => {
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

  const { ligneBonSortieList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="ligne-bon-sortie-heading">
        <Translate contentKey="ibamApp.ligneBonSortie.home.title">Ligne Bon Sorties</Translate>
      </h2>
      <div className="table-responsive">
        {ligneBonSortieList && ligneBonSortieList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('quantite')}>
                  <Translate contentKey="ibamApp.ligneBonSortie.quantite">Quantite</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prixHt')}>
                  <Translate contentKey="ibamApp.ligneBonSortie.prixHt">Prix Ht</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('type')}>
                  <Translate contentKey="ibamApp.ligneBonSortie.type">Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.ligneBonSortie.materiel">Materiel</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.ligneBonSortie.materiau">Materiau</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.ligneBonSortie.bonSortie">Bon Sortie</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ligneBonSortieList.map((ligneBonSortie, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${ligneBonSortie.id}`} color="link" size="sm">
                      {ligneBonSortie.id}
                    </Button>
                  </td>
                  <td>{ligneBonSortie.quantite}</td>
                  <td>{ligneBonSortie.prixHt}</td>
                  <td>{ligneBonSortie.type}</td>
                  <td>
                    {ligneBonSortie.materiel ? <Link to={`materiel/${ligneBonSortie.materiel.id}`}>{ligneBonSortie.materiel.libelle}</Link> : '-------'}
                  </td>
                  <td>
                    {ligneBonSortie.materiau ? <Link to={`materiau/${ligneBonSortie.materiau.id}`}>{ligneBonSortie.materiau.libelle}</Link> : '-------'}
                  </td>
                  <td>
                    {ligneBonSortie.bonSortie ? (
                      <Link to={`bon-sortie/${ligneBonSortie.bonSortie.id}`}>{ligneBonSortie.bonSortie.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${ligneBonSortie.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
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
              <Translate contentKey="ibamApp.ligneBonSortie.home.notFound">No Ligne Bon Sorties found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={ligneBonSortieList && ligneBonSortieList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ ligneBonSortie }: IRootState) => ({
  ligneBonSortieList: ligneBonSortie.entities,
  loading: ligneBonSortie.loading,
  totalItems: ligneBonSortie.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LigneBonSortie);
