import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './consommation.reducer';
import { IConsommation } from 'app/shared/model/consommation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IConsommationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Consommation = (props: IConsommationProps) => {
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

  const { consommationList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="consommation-heading">
        <Translate contentKey="ibamApp.consommation.home.title">Consommations</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.consommation.home.createLabel">Create new Consommation</Translate>
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
        {consommationList && consommationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reference')}>
                  <Translate contentKey="ibamApp.consommation.reference">Reference</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateAchat')}>
                  <Translate contentKey="ibamApp.consommation.dateAchat">Date Achat</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('typeCarburant')}>
                  <Translate contentKey="ibamApp.consommation.typeCarburant">Type Carburant</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('montant')}>
                  <Translate contentKey="ibamApp.consommation.montant">Montant</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('quantite')}>
                  <Translate contentKey="ibamApp.consommation.quantite">Quantite</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('kilometrage')}>
                  <Translate contentKey="ibamApp.consommation.kilometrage">Kilometrage</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('commentaire')}>
                  <Translate contentKey="ibamApp.consommation.commentaire">Commentaire</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userModif')}>
                  <Translate contentKey="ibamApp.consommation.userModif">User Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateModif')}>
                  <Translate contentKey="ibamApp.consommation.dateModif">Date Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.consommation.materiel">Materiel</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.consommation.fournisseur">Fournisseur</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.consommation.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {consommationList.map((consommation, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${consommation.id}`} color="link" size="sm">
                      {consommation.id}
                    </Button>
                  </td>
                  <td>{consommation.reference}</td>
                  <td>
                    <TextFormat type="date" value={consommation.dateAchat} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{consommation.typeCarburant}</td>
                  <td>{consommation.montant}</td>
                  <td>{consommation.quantite}</td>
                  <td>{consommation.kilometrage}</td>
                  <td>{consommation.commentaire}</td>
                  <td>{consommation.userModif}</td>
                  <td>
                    <TextFormat type="date" value={consommation.dateModif} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {consommation.materiel ? <Link to={`materiel/${consommation.materiel.id}`}>{consommation.materiel.id}</Link> : ''}
                  </td>
                  <td>
                    {consommation.fournisseur ? (
                      <Link to={`fournisseur/${consommation.fournisseur.id}`}>{consommation.fournisseur.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{consommation.image ? <Link to={`image/${consommation.image.id}`}>{consommation.image.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${consommation.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${consommation.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${consommation.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="ibamApp.consommation.home.notFound">No Consommations found</Translate>
            </div>
          )
        )}
      </div>
      <div className={consommationList && consommationList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ consommation }: IRootState) => ({
  consommationList: consommation.entities,
  loading: consommation.loading,
  totalItems: consommation.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Consommation);
