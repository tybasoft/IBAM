import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './pointage.reducer';
import { IPointage } from 'app/shared/model/pointage.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';



export interface IPointageProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Pointage = (props: IPointageProps) => {
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


  const { pointageList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="pointage-heading">
        <Translate contentKey="ibamApp.pointage.home.title">Pointages</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.pointage.home.createLabel">Create new Pointage</Translate>
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
        {pointageList && pointageList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateJour')}>
                  <Translate contentKey="ibamApp.pointage.dateJour">Date Jour</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('presenceMatin')}>
                  <Translate contentKey="ibamApp.pointage.presenceMatin">Presence Matin</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('presenceAPM')}>
                  <Translate contentKey="ibamApp.pointage.presenceAPM">Presence APM</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nbrHeureSup')}>
                  <Translate contentKey="ibamApp.pointage.nbrHeureSup">Nbr Heure Sup</Translate> <FontAwesomeIcon icon="sort" />
                </th>
              {/*   <th className="hand" onClick={sort('remarques')}>
                  <Translate contentKey="ibamApp.pointage.remarques">Remarques</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userModif')}>
                  <Translate contentKey="ibamApp.pointage.userModif">User Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateModif')}>
                  <Translate contentKey="ibamApp.pointage.dateModif">Date Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th> */}
                <th>
                  <Translate contentKey="ibamApp.pointage.employe">Employe</Translate> <FontAwesomeIcon icon="sort" />
                </th>
               {/*  <th>
                  <Translate contentKey="ibamApp.pointage.fichePointage">Fiche Pointage</Translate> <FontAwesomeIcon icon="sort" />
                </th> */}
                <th />
              </tr>
            </thead>
            <tbody>
              {pointageList.map((pointage, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pointage.id}`} color="link" size="sm">
                      {pointage.id}
                    </Button>
                  </td>
                  <td>{pointage.dateJour ? <TextFormat type="date" value={pointage.dateJour} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{pointage.presenceMatin ? 'true' : 'false'}</td>
                  <td>{pointage.presenceAPM ? 'true' : 'false'}</td>
                  <td>{pointage.nbrHeureSup}</td>
                 {/*  <td>{pointage.remarques}</td>
                  <td>{pointage.userModif}</td>
                  <td>
                    {pointage.dateModif ? <TextFormat type="date" value={pointage.dateModif} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td> */}
                  <td>{pointage.employe ? <Link to={`employe/${pointage.employe.id}`}>{pointage.employe.cin}</Link> : ''}</td>
                  {/* <td>
                    {pointage.fichePointage ? (
                      <Link to={`fiche-pointage/${pointage.fichePointage.id}`}>{pointage.fichePointage.id}</Link>
                    ) : (
                      ''
                    )}
                  </td> */}
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pointage.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${pointage.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${pointage.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="ibamApp.pointage.home.notFound">No Pointages found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={pointageList && pointageList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pointage }: IRootState) => ({
  pointageList: pointage.entities,
  loading: pointage.loading,
  totalItems: pointage.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Pointage);
