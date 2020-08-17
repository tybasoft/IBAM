import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './entreprise.reducer';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEntrepriseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Entreprise = (props: IEntrepriseProps) => {
  const [search , setSearch] = useState('');

  useEffect(() => {
    props.getEntities();
  }, []);

  const { entrepriseList, match, loading } = props;
  const entrepriseFiltre = entrepriseList.filter(enterprise =>{
    return enterprise.entiteJuridique.toLowerCase().includes(search.toLowerCase()) ||
      enterprise.nomCommercial.toLowerCase().includes(search.toLowerCase()) ||
      enterprise.adresse.toLowerCase().includes(search.toLowerCase()) ||
      enterprise.capital.toLowerCase().includes(search.toLowerCase()) ;
  })
  return (
    <div>
      <h2 id="entreprise-heading">
        <Translate contentKey="ibamApp.entreprise.home.title">Entreprises</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.entreprise.home.createLabel">Create new Entreprise</Translate>
        </Link>
      </h2>
      <form className="md-form search">
        <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={e => setSearch(e.target.value)} />
      </form>
      <br/>
      <div className="table-responsive">
        {entrepriseList && entrepriseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.entreprise.entiteJuridique">Entite Juridique</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.entreprise.nomCommercial">Nom Commercial</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.entreprise.adresse">Adresse</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.entreprise.capital">Capital</Translate>
                </th>
                {/*
                <th>
                  <Translate contentKey="ibamApp.entreprise.direction">Direction</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.entreprise.activite">Activite</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.entreprise.telephone">Telephone</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.entreprise.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.entreprise.userModif">User Modif</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.entreprise.dateModif">Date Modif</Translate>
                </th>
                <th>
                  <Translate contentKey="ibamApp.entreprise.image">Image</Translate>
                </th>
                */}
                <th />
              </tr>
            </thead>
            <tbody>
              {entrepriseFiltre.map((entreprise, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${entreprise.id}`} color="link" size="sm">
                      {entreprise.id}
                    </Button>
                  </td>
                  <td>{entreprise.entiteJuridique}</td>
                  <td>{entreprise.nomCommercial}</td>
                  <td>{entreprise.adresse}</td>
                  <td>{entreprise.capital}</td>
                  {/*
                  <td>{entreprise.direction}</td>
                  <td>{entreprise.activite}</td>
                  <td>{entreprise.telephone}</td>
                  <td>{entreprise.email}</td>
                  <td>{entreprise.userModif}</td>
                  <td>
                    <TextFormat type="date" value={entreprise.dateModif} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{entreprise.image ? <Link to={`image/${entreprise.image.id}`}>{entreprise.image.id}</Link> : ''}</td>
                  */}
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${entreprise.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${entreprise.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${entreprise.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ibamApp.entreprise.home.notFound">No Entreprises found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ entreprise }: IRootState) => ({
  entrepriseList: entreprise.entities,
  loading: entreprise.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Entreprise);
