import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './materiel.reducer';
import { IMateriel } from 'app/shared/model/materiel.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IMaterielProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Materiel = (props: IMaterielProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const [search , setSearch] = useState('');
  const [value , setValue] = useState('');
  const [filtre , setFiltre] = useState([]);
  const { materielList, match, loading, totalItems } = props;




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
    // setFiltre(
    //   materielList.filter( materiel => {
    //     return materiel.libelle.toLowerCase().includes(search.toLowerCase());
    //   })
    // )
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




  const filtreMateriels = materielList.filter( materiel => {
     return materiel.libelle.toLowerCase().includes(search.toLowerCase()) ||
       materiel.matricule.toLowerCase().includes(search.toLowerCase()) ||
       materiel.modele.toLowerCase().includes(search.toLowerCase()) ||
         materiel.numCarteGrise.toLowerCase().includes(search.toLowerCase()) ;

  })





  return (
    <div>
      <h2 id="materiel-heading">
        <Translate contentKey="ibamApp.materiel.home.title">Materiels</Translate>

        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.materiel.home.createLabel">Create new Materiel</Translate>
        </Link>
      </h2>

        <form className="md-form search">
          <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={e => setSearch(e.target.value)} />
        </form>
        <br/>

      <div className="table-responsive">
        {materielList && materielList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('libelle')}>
                  <Translate contentKey="ibamApp.materiel.libelle">Libelle</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('matricule')}>
                  <Translate contentKey="ibamApp.materiel.matricule">Matricule</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('modele')}>
                  <Translate contentKey="ibamApp.materiel.modele">Modele</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('numCarteGrise')}>
                  <Translate contentKey="ibamApp.materiel.numCarteGrise">Num Carte Grise</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('multiProjet')}>
                  <Translate contentKey="ibamApp.materiel.multiProjet">Multi Projet</Translate> <FontAwesomeIcon icon="sort" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filtreMateriels.map((materiel, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${materiel.id}`} color="link" size="sm">
                      {materiel.id}
                    </Button>
                  </td>
                  <td>{materiel.libelle}</td>
                  <td>{materiel.matricule}</td>
                  <td>{materiel.modele}</td>
                  <td>{materiel.numCarteGrise}</td>
                  <td>{materiel.multiProjet ? 'true' : 'false'}</td>

                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${materiel.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${materiel.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${materiel.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="ibamApp.materiel.home.notFound">No Materiels found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={materielList && materielList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ materiel }: IRootState) => ({
  materielList: materiel.entities,
  loading: materiel.loading,
  totalItems: materiel.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Materiel);
