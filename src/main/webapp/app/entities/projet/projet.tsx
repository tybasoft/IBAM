import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './projet.reducer';
import { IProjet } from 'app/shared/model/projet.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProjetProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Projet = (props: IProjetProps) => {
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
    <div>
      <h2 id="projet-heading">
        <Translate contentKey="ibamApp.projet.home.title">Projets</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.projet.home.createLabel">Create new Projet</Translate>
        </Link>
        <Link to={`${match.url}/import`} className="btn btn-primary mr-2 float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.tva.home.importLabel">Import</Translate>
        </Link>
        <Link to={`${match.url}/export`} className="btn btn-primary mr-2 float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.tva.home.exportLabel">Export</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {projetList && projetList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reference')}>
                  <Translate contentKey="ibamApp.projet.reference">Reference</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('libelle')}>
                  <Translate contentKey="ibamApp.projet.libelle">Libelle</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="ibamApp.projet.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateDebut')}>
                  <Translate contentKey="ibamApp.projet.dateDebut">Date Debut</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                {/* <th className="hand" onClick={sort('dateFin')}>
                  <Translate contentKey="ibamApp.projet.dateFin">Date Fin</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nbrEmploye')}>
                  <Translate contentKey="ibamApp.projet.nbrEmploye">Nbr Employe</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('budget')}>
                  <Translate contentKey="ibamApp.projet.budget">Budget</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('adresse')}>
                  <Translate contentKey="ibamApp.projet.adresse">Adresse</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('ville')}>
                  <Translate contentKey="ibamApp.projet.ville">Ville</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('pays')}>
                  <Translate contentKey="ibamApp.projet.pays">Pays</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userModif')}>
                  <Translate contentKey="ibamApp.projet.userModif">User Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateModif')}>
                  <Translate contentKey="ibamApp.projet.dateModif">Date Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.projet.entreprise">Entreprise</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.projet.horaire">Horaire</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.projet.depot">Depot</Translate> <FontAwesomeIcon icon="sort" />
                </th> */}
                <th />
              </tr>
            </thead>
            <tbody>
              {projetList.map((projet, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${projet.id}`} color="link" size="sm">
                      {projet.id}
                    </Button>
                  </td>
                  <td>{projet.reference}</td>
                  <td>{projet.libelle}</td>
                  <td>{projet.description}</td>
                  <td>
                    <TextFormat type="date" value={projet.dateDebut} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  {/* <td>
                    <TextFormat type="date" value={projet.dateFin} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{projet.nbrEmploye}</td>
                  <td>{projet.budget}</td>
                  <td>{projet.adresse}</td>
                  <td>{projet.ville}</td>
                  <td>{projet.pays}</td>
                  <td>{projet.userModif}</td>
                  <td>
                    <TextFormat type="date" value={projet.dateModif} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{projet.entreprise ? <Link to={`entreprise/${projet.entreprise.id}`}>{projet.entreprise.id}</Link> : ''}</td>
                  <td>{projet.horaire ? <Link to={`horaire/${projet.horaire.id}`}>{projet.horaire.id}</Link> : ''}</td>
                  <td>{projet.depot ? <Link to={`depot/${projet.depot.id}`}>{projet.depot.id}</Link> : ''}</td> */}
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${projet.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${projet.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${projet.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="ibamApp.projet.home.notFound">No Projets found</Translate>
            </div>
          )
        )}
      </div>
      <div className={projetList && projetList.length > 0 ? '' : 'd-none'}>
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
