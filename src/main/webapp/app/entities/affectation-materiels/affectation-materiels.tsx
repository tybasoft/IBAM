import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, searchInEntities } from './affectation-materiels.reducer';
import { IAffectationMateriels } from 'app/shared/model/affectation-materiels.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IAffectationMaterielsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AffectationMateriels = (props: IAffectationMaterielsProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));
  const [search, setSearch] = useState('');

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const getAllEntities = async keyword => {
    await delay(800); // just to wait until you write the whole word and not build glitch...
    if (keyword === null) {
      props.getEntities(keyword, paginationState.activePage - 1, 10, `${paginationState.sort},${paginationState.order}`);
    } else {
      props.getEntities(keyword,paginationState.activePage - 1, 10, `${paginationState.sort},${paginationState.order}`);
    }
  };

  const searchAllEntities = keyword => {
    props.searchInEntities(keyword);
  };

  const sortEntities = keyword => {
    getAllEntities(keyword);
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities('');
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
  const disabledSearch = e => {};
  const { affectationMaterielsList, match, loading, totalItems } = props;

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const searchAffectations = keyword => {
    if (keyword === '') {
      getAllEntities(search.toLowerCase());
    } else {
      searchAllEntities(keyword.toLowerCase());
    }

    // const keyword = "just test 1";
    // await delay(1000);
    // affectationsMaterielsList.join(searchAffectations(keyword));
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  return (
    <div>
      <h2 id="affectation-materiels-heading">
        <Translate contentKey="ibamApp.affectationMateriels.home.title">Affectation Materiels</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.affectationMateriels.home.createLabel">Create new Affectation Materiels</Translate>
        </Link>
      </h2>
      <form className="md-form search">
        <input
          className="form-control"
          type="text"
          id="inputSearch"
          placeholder="Search"
          aria-label="Search"
          onChange={e => sortEntities(e.target.value)}
        />
        <Button className="form-control btn btn-primary float-right" id="target" onClick={disabledSearch} hidden>
          Annuler
        </Button>
      </form>
      <br />
      <br />
      <div className="table-responsive">
        {affectationMaterielsList && affectationMaterielsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateDebut')}>
                  <Translate contentKey="ibamApp.affectationMateriels.dateDebut">Date Debut</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateFin')}>
                  <Translate contentKey="ibamApp.affectationMateriels.dateFin">Date Fin</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="ibamApp.affectationMateriels.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.affectationMateriels.projet">Projet</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.affectationMateriels.materiel">Materiel</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {affectationMaterielsList.map((affectationMateriels, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${affectationMateriels.id}`} color="link" size="sm">
                      {affectationMateriels.id}
                    </Button>
                  </td>
                  <td>
                    {affectationMateriels.dateDebut ? (
                      <TextFormat type="date" value={affectationMateriels.dateDebut} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {affectationMateriels.dateFin ? (
                      <TextFormat type="date" value={affectationMateriels.dateFin} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{affectationMateriels.description}</td>
                  <td>
                    {affectationMateriels.projet ? (
                      <Link to={`projet/${affectationMateriels.projet.id}`}>{affectationMateriels.projet.libelle}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {affectationMateriels.materiel ? (
                      <Link to={`materiel/${affectationMateriels.materiel.id}`}>{affectationMateriels.materiel.libelle}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${affectationMateriels.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${affectationMateriels.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${affectationMateriels.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="ibamApp.affectationMateriels.home.notFound">No Affectation Materiels found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={affectationMaterielsList && affectationMaterielsList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={10}
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

const mapStateToProps = ({ affectationMateriels }: IRootState) => ({
  affectationMaterielsList: affectationMateriels.entities,
  loading: 10,
  totalItems: affectationMateriels.totalItems
});

const mapDispatchToProps = {
  getEntities,
  searchInEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AffectationMateriels);
