import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './fiche-pointage.reducer';
import { IFichePointage } from 'app/shared/model/fiche-pointage.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFichePointageProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FichePointage = (props: IFichePointageProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { fichePointageList, match, loading } = props;
  return (
    <div>
      <h2 id="fiche-pointage-heading">
        <Translate contentKey="ibamApp.fichePointage.home.title">Fiche Pointages</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.fichePointage.home.createLabel">Create new Fiche Pointage</Translate>
        </Link>
      
        <Link to={`${match.url}/pointer`}  className="btn btn-primary mr-2 float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.pointage.home.pointer">Pointer</Translate>
        </Link>

        
      </h2>
      <div className="table-responsive">
        {fichePointageList && fichePointageList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.fichePointage.dateJour">Date Jour</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.fichePointage.projet">Projet</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fichePointageList.map((fichePointage, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${fichePointage.id}`} color="link" size="sm">
                      {fichePointage.id}
                    </Button>
                  </td>
                  <td>
                    {fichePointage.dateJour ? (
                      <TextFormat type="date" value={fichePointage.dateJour} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{fichePointage.projet ? <Link to={`projet/${fichePointage.projet.id}`}>{fichePointage.projet.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${fichePointage.id}/listPointageOfFiche`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.viewPointage">View List</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fichePointage.id}/EditListPointage`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.editPointage">Editer Pointage</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fichePointage.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fichePointage.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fichePointage.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ibamApp.fichePointage.home.notFound">No Fiche Pointages found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ fichePointage }: IRootState) => ({
  fichePointageList: fichePointage.entities,
  loading: fichePointage.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FichePointage);
