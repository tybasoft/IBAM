import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './depot.reducer';
import { IDepot } from 'app/shared/model/depot.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDepotProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Depot = (props: IDepotProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { depotList, match, loading } = props;
  return (
    <div>
      <h2 id="depot-heading">
        <Translate contentKey="ibamApp.depot.home.title">Depots</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.depot.home.createLabel">Create new Depot</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {depotList && depotList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.depot.libelle">Libelle</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.depot.adresse">Adresse</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.depot.tel">Tel</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.depot.ville">Ville</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.depot.pays">Pays</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.depot.userModif">User Modif</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.depot.dateModif">Date Modif</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {depotList.map((depot, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${depot.id}`} color="link" size="sm">
                      {depot.id}
                    </Button>
                  </td>
                  <td>{depot.libelle}</td>
                  <td>{depot.adresse}</td>
                  <td>{depot.tel}</td>
                  <td>{depot.ville}</td>
                  <td>{depot.pays}</td>
                  <td>{depot.userModif}</td>
                  <td>
                    <TextFormat type="date" value={depot.dateModif} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${depot.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${depot.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${depot.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ibamApp.depot.home.notFound">No Depots found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ depot }: IRootState) => ({
  depotList: depot.entities,
  loading: depot.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Depot);
