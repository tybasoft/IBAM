import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './type-materiel.reducer';
import { ITypeMateriel } from 'app/shared/model/type-materiel.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITypeMaterielProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TypeMateriel = (props: ITypeMaterielProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { typeMaterielList, match, loading } = props;
  return (
    <div>
      <h2 id="type-materiel-heading">
        <Translate contentKey="ibamApp.typeMateriel.home.title">Type Materiels</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.typeMateriel.home.createLabel">Create new Type Materiel</Translate>
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
        {typeMaterielList && typeMaterielList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.typeMateriel.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.typeMateriel.userModif">User Modif</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.typeMateriel.dateModif">Date Modif</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {typeMaterielList.map((typeMateriel, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${typeMateriel.id}`} color="link" size="sm">
                      {typeMateriel.id}
                    </Button>
                  </td>
                  <td>{typeMateriel.type}</td>
                  <td>{typeMateriel.userModif}</td>
                  <td>
                    <TextFormat type="date" value={typeMateriel.dateModif} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${typeMateriel.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${typeMateriel.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${typeMateriel.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ibamApp.typeMateriel.home.notFound">No Type Materiels found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ typeMateriel }: IRootState) => ({
  typeMaterielList: typeMateriel.entities,
  loading: typeMateriel.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TypeMateriel);
