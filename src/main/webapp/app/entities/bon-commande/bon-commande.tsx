import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './bon-commande.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IBonCommandeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BonCommande = (props: IBonCommandeProps) => {
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

  const { bonCommandeList, match, loading, totalItems } = props;
  const bonCommandeFiltre = bonCommandeList.filter(bon => {
    return bon.dateCreation.includes(search) ||
      bon.datePrevLiv.includes(search) ||
      bon.remarques.toLowerCase().includes(search.toLowerCase());
  })
  return (
    <div>
      <h2 id="bon-commande-heading">
        <Translate contentKey="ibamApp.bonCommande.home.title">Bon Commandes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.bonCommande.home.createLabel">Create new Bon Commande</Translate>
        </Link>
      </h2>
      <form className="md-form search">
        <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={e => setSearch(e.target.value)} />
      </form>
      <br/>
      <div className="table-responsive">
        {bonCommandeList && bonCommandeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('datePrevLiv')}>
                  <Translate contentKey="ibamApp.bonCommande.datePrevLiv">Date Prev Liv</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('remarques')}>
                  <Translate contentKey="ibamApp.bonCommande.remarques">Remarques</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateCreation')}>
                  <Translate contentKey="ibamApp.bonCommande.dateCreation">Date Creation</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('valide')}>
                  <Translate contentKey="ibamApp.bonCommande.valide">Valide</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.bonCommande.depot">Depot</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.bonCommande.fournisseur">Fournisseur</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bonCommandeFiltre.map((bonCommande, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${bonCommande.id}`} color="link" size="sm">
                      {bonCommande.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={bonCommande.datePrevLiv} format="YYYY-MM-DD"/>
                  </td>
                  <td>{bonCommande.remarques}</td>
                  <td>
                    <TextFormat type="date" value={bonCommande.dateCreation} format="YYYY-MM-DD" />
                  </td>
                  <td>{bonCommande.valide ? 'true' : 'false'}</td>
                  <td>{bonCommande.depot ? <Link to={`depot/${bonCommande.depot.id}`}>{bonCommande.depot.libelle}</Link> : ''}</td>
                  <td>
                    {bonCommande.fournisseur ? (
                      <Link to={`fournisseur/${bonCommande.fournisseur.id}`}>{bonCommande.fournisseur.nom} {bonCommande.fournisseur.prenom}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bonCommande.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${bonCommande.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${bonCommande.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="ibamApp.bonCommande.home.notFound">No Bon Commandes found</Translate>
            </div>
          )
        )}
      </div>
      <div className={bonCommandeList && bonCommandeList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ bonCommande }: IRootState) => ({
  bonCommandeList: bonCommande.entities,
  loading: bonCommande.loading,
  totalItems: bonCommande.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonCommande);
