import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { IRootState } from 'app/shared/reducers';
import { getEntities ,searchInEntities } from './affectations-materiels.reducer';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IAffectationsMaterielsProps extends StateProps1 ,DispatchProps1 ,StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AffectationsMateriels = (props: IAffectationsMaterielsProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));
  const [search , setSearch] = useState('');
  const [field , setField] = useState('');
  // const searchBar: boolean =false;
  // const activeSearch : boolean = false;



  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const searchAllEntities= () => {
     props.searchInEntities();
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
  const searchAffectations =  () => {
    // if (search !== null) {
    searchAllEntities();
    // activeSearch = true;

  // }
    // else {
    //   sortEntities();
    // }
    // if(search===''){
    //   getAllEntities();
    // }
    // else{
    //   searchAllEntities();
    // }
  }
  const disabledSearch = ()=>{

    // activeSearch = false;
    getAllEntities();
  }


  const { affectationsMaterielsList, match, loading, totalItems } = props;


  const affectationsFiltre = affectationsMaterielsList.filter( affectation => {
    return  affectation.projet.libelle.toLowerCase().includes(search.toLowerCase()) ||
      affectation.materiel.libelle.toLowerCase().includes(search.toLowerCase()) ||
      affectation.description.includes(search) ||
      affectation.dateDebut.includes(search) ||
      affectation.dateFin.includes(search);
  })

  return (
    <div>
      <h2 id="affectations-materiels-heading">
        <Translate contentKey="ibamApp.affectationsMateriels.home.title">Affectations Materiels</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.affectationsMateriels.home.createLabel">Create new Affectations Materiels</Translate>
        </Link>
      </h2>
      <form className="md-form search">
        <input className="form-control" type="text" placeholder="Search" aria-label="Search" onClick={searchAffectations} onChange={e => setSearch(e.target.value)} />
        <Link className=" form-control btn btn-primary float-right jh-create-entity" onClick={disabledSearch}>Annuler</Link>
        </form>
      <br/>
      <br/>
      <div className="table-responsive">
        {affectationsMaterielsList && affectationsMaterielsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateDebut')}>
                  <Translate contentKey="ibamApp.affectationsMateriels.dateDebut">Date Debut</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateFin')}>
                  <Translate contentKey="ibamApp.affectationsMateriels.dateFin">Date Fin</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="ibamApp.affectationsMateriels.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.affectationsMateriels.projet">Projet</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.affectationsMateriels.materiel">Materiel</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {affectationsFiltre.map((affectationsMateriels, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${affectationsMateriels.id}`} color="link" size="sm">
                      {affectationsMateriels.id}
                    </Button>
                  </td>
                  <td>
                    {affectationsMateriels.dateDebut ? (
                      <TextFormat type="date" value={affectationsMateriels.dateDebut} format="YYYY-MM-DD" />
                    ) : null}
                  </td>
                  <td>
                    {affectationsMateriels.dateFin ? (
                      <TextFormat type="date" value={affectationsMateriels.dateFin} format="YYYY-MM-DD" />
                    ) : null}
                  </td>
                  <td>{affectationsMateriels.description}</td>
                  <td>
                    {affectationsMateriels.projet ? (
                      <Link to={`projet/${affectationsMateriels.projet.id}`}>{affectationsMateriels.projet.libelle}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {affectationsMateriels.materiel ? (
                      <Link to={`materiel/${affectationsMateriels.materiel.id}`}>{affectationsMateriels.materiel.libelle}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${affectationsMateriels.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${affectationsMateriels.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${affectationsMateriels.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="ibamApp.affectationsMateriels.home.notFound">No Affectations Materiels found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={affectationsMaterielsList && affectationsMaterielsList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ affectationsMateriels }: IRootState) => ({
  affectationsMaterielsList: affectationsMateriels.entities,
  affectationsMaterielsearch: affectationsMateriels.entities,
  loading: affectationsMateriels.loading,
  totalItems: affectationsMateriels.totalItems,
});
const mapStateToProps1 = ({ affectationsMateriels }: IRootState) => ({
  affectationsMaterielsearch: affectationsMateriels.entities,
});


const mapDispatchToProps = {
  getEntities,
  searchInEntities,
};
const mapDispatchToProps1 = {
  searchInEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type StateProps1 = ReturnType<typeof mapStateToProps1>;
type DispatchProps = typeof mapDispatchToProps;
type DispatchProps1 = typeof mapDispatchToProps1;

export  default  connect(mapStateToProps ,mapDispatchToProps)(AffectationsMateriels);


