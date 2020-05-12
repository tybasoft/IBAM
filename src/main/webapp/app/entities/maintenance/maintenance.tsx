import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './maintenance.reducer';
import { IMaintenance } from 'app/shared/model/maintenance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IMaintenanceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Maintenance = (props: IMaintenanceProps) => {
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

  const { maintenanceList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="maintenance-heading">
        <Translate contentKey="ibamApp.maintenance.home.title">Maintenances</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.maintenance.home.createLabel">Create new Maintenance</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {maintenanceList && maintenanceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reference')}>
                  <Translate contentKey="ibamApp.maintenance.reference">Reference</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('datePanne')}>
                  <Translate contentKey="ibamApp.maintenance.datePanne">Date Panne</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('frais')}>
                  <Translate contentKey="ibamApp.maintenance.frais">Frais</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('technicien')}>
                  <Translate contentKey="ibamApp.maintenance.technicien">Technicien</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('motif')}>
                  <Translate contentKey="ibamApp.maintenance.motif">Motif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('problemeFrequent')}>
                  <Translate contentKey="ibamApp.maintenance.problemeFrequent">Probleme Frequent</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('remarque')}>
                  <Translate contentKey="ibamApp.maintenance.remarque">Remarque</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dureePanne')}>
                  <Translate contentKey="ibamApp.maintenance.dureePanne">Duree Panne</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userModif')}>
                  <Translate contentKey="ibamApp.maintenance.userModif">User Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateModif')}>
                  <Translate contentKey="ibamApp.maintenance.dateModif">Date Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.maintenance.materiel">Materiel</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.maintenance.centreMaintenance">Centre Maintenance</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.maintenance.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {maintenanceList.map((maintenance, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${maintenance.id}`} color="link" size="sm">
                      {maintenance.id}
                    </Button>
                  </td>
                  <td>{maintenance.reference}</td>
                  <td>
                    <TextFormat type="date" value={maintenance.datePanne} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{maintenance.frais}</td>
                  <td>{maintenance.technicien}</td>
                  <td>{maintenance.motif}</td>
                  <td>{maintenance.problemeFrequent ? 'true' : 'false'}</td>
                  <td>{maintenance.remarque}</td>
                  <td>{maintenance.dureePanne}</td>
                  <td>{maintenance.userModif}</td>
                  <td>
                    <TextFormat type="date" value={maintenance.dateModif} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{maintenance.materiel ? <Link to={`materiel/${maintenance.materiel.id}`}>{maintenance.materiel.id}</Link> : ''}</td>
                  <td>
                    {maintenance.centreMaintenance ? (
                      <Link to={`centre-maintenance/${maintenance.centreMaintenance.id}`}>{maintenance.centreMaintenance.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{maintenance.image ? <Link to={`image/${maintenance.image.id}`}>{maintenance.image.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${maintenance.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${maintenance.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${maintenance.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="ibamApp.maintenance.home.notFound">No Maintenances found</Translate>
            </div>
          )
        )}
      </div>
      <div className={maintenanceList && maintenanceList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ maintenance }: IRootState) => ({
  maintenanceList: maintenance.entities,
  loading: maintenance.loading,
  totalItems: maintenance.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Maintenance);
