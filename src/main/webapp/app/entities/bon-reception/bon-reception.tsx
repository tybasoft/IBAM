import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './bon-reception.reducer';
import { IBonReception } from 'app/shared/model/bon-reception.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IBonReceptionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BonReception = (props: IBonReceptionProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const [search , setSearch] = useState('');

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

  const { bonReceptionList, match, loading, totalItems } = props;

  const bonRecList = bonReceptionList.filter(reception => {
    return reception.dateLivraison.includes(search) ||
      reception.depot.libelle.toLowerCase().includes(search.toLowerCase()) ||
      reception.fournisseur.prenom.toLowerCase().includes(search.toLowerCase()) ||
      reception.fournisseur.nom.toLowerCase().includes(search.toLowerCase()) ||
      reception.livreur.toLowerCase().includes(search.toLowerCase()) ||
      reception.remarques.toLowerCase().includes(search.toLowerCase());
  })
  return (
    <div>
      <h2 id="bon-reception-heading">
        <Translate contentKey="ibamApp.bonReception.home.title">Bon Receptions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.bonReception.home.createLabel">Create new Bon Reception</Translate>
        </Link>
      </h2>
      <form className="md-form search">
        <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={e => setSearch(e.target.value)} />
      </form>
      <br/>
      <div className="table-responsive">
        {bonReceptionList && bonReceptionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('livreur')}>
                  <Translate contentKey="ibamApp.bonReception.livreur">Livreur</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('remarques')}>
                  <Translate contentKey="ibamApp.bonReception.remarques">Remarques</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateLivraison')}>
                  <Translate contentKey="ibamApp.bonReception.dateLivraison">Date Livraison</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userModif')}>
                  <Translate contentKey="ibamApp.bonReception.userModif">User Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateModif')}>
                  <Translate contentKey="ibamApp.bonReception.dateModif">Date Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.bonReception.depot">Depot</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.bonReception.fournisseur">Fournisseur</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.bonReception.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bonRecList.map((bonReception, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${bonReception.id}`} color="link" size="sm">
                      {bonReception.id}
                    </Button>
                  </td>
                  <td>{bonReception.livreur}</td>
                  <td>{bonReception.remarques}</td>
                  <td>
                    <TextFormat type="date" value={bonReception.dateLivraison} format="YYYY-MM-DD" />
                  </td>
                  <td>{bonReception.userModif}</td>
                  <td>
                    <TextFormat type="date" value={bonReception.dateModif} format="YYYY-MM-DD" />
                  </td>
                  <td>{bonReception.depot ? <Link to={`depot/${bonReception.depot.id}`}>{bonReception.depot.libelle}</Link> : ''}</td>
                  <td>
                    {bonReception.fournisseur ? (
                      <Link to={`fournisseur/${bonReception.fournisseur.id}`}>{bonReception.fournisseur.nom}{bonReception.fournisseur.prenom}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{bonReception.image ? <Link to={`image/${bonReception.image.id}`}>{bonReception.image.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bonReception.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${bonReception.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${bonReception.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="ibamApp.bonReception.home.notFound">No Bon Receptions found</Translate>
            </div>
          )
        )}
      </div>
      <div className={bonReceptionList && bonReceptionList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ bonReception }: IRootState) => ({
  bonReceptionList: bonReception.entities,
  loading: bonReception.loading,
  totalItems: bonReception.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonReception);
