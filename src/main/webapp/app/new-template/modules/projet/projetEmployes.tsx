import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
// import { getEntities } from './employe.reducer';
import { IEmploye } from 'app/shared/model/employe.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

// export interface IEmployeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ProjetEmploye = (props: any) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  //    const getAllEntities = () => {
  //      props.getEntities(
  //        paginationState.activePage - 1,
  //        paginationState.itemsPerPage,
  //        `${paginationState.sort},${paginationState.order}`
  //      );
  //    };

  //    const sortEntities = () => {
  //      getAllEntities();
  //      props.history.push(
  //        `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
  //      );
  //    };

  //    useEffect(() => {
  //      sortEntities();
  //    }, [paginationState.activePage, paginationState.order, paginationState.sort]);

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

  const { employeList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="employe-heading">
        <Translate contentKey="ibamApp.employe.home.title">Employes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.employe.home.createLabel">Create new Employe</Translate>
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
        {employeList && employeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nom')}>
                  <Translate contentKey="ibamApp.employe.nom">Nom</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prenom')}>
                  <Translate contentKey="ibamApp.employe.prenom">Prenom</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('matricule')}>
                  <Translate contentKey="ibamApp.employe.matricule">Matricule</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('cin')}>
                  <Translate contentKey="ibamApp.employe.cin">Cin</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                {/*
                <th className="hand" onClick={sort('sexe')}>
                  <Translate contentKey="ibamApp.employe.sexe">Sexe</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('tarifJournalier')}>
                  <Translate contentKey="ibamApp.employe.tarifJournalier">Tarif Journalier</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateNaissance')}>
                  <Translate contentKey="ibamApp.employe.dateNaissance">Date Naissance</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lieuNaissance')}>
                  <Translate contentKey="ibamApp.employe.lieuNaissance">Lieu Naissance</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('situationFam')}>
                  <Translate contentKey="ibamApp.employe.situationFam">Situation Fam</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nationalite')}>
                  <Translate contentKey="ibamApp.employe.nationalite">Nationalite</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateEntree')}>
                  <Translate contentKey="ibamApp.employe.dateEntree">Date Entree</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('tel')}>
                  <Translate contentKey="ibamApp.employe.tel">Tel</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="ibamApp.employe.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('adresse')}>
                  <Translate contentKey="ibamApp.employe.adresse">Adresse</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('division')}>
                  <Translate contentKey="ibamApp.employe.division">Division</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('typeContrat')}>
                  <Translate contentKey="ibamApp.employe.typeContrat">Type Contrat</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('multiPorjet')}>
                  <Translate contentKey="ibamApp.employe.multiPorjet">Multi Porjet</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateDepart')}>
                  <Translate contentKey="ibamApp.employe.dateDepart">Date Depart</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('motifDepart')}>
                  <Translate contentKey="ibamApp.employe.motifDepart">Motif Depart</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userModif')}>
                  <Translate contentKey="ibamApp.employe.userModif">User Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateModif')}>
                  <Translate contentKey="ibamApp.employe.dateModif">Date Modif</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.employe.projet">Projet</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.employe.equipe">Equipe</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.employe.fonction">Fonction</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ibamApp.employe.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                */}
                <th />
              </tr>
            </thead>
            <tbody>
              {employeList.map((employe, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employe.id}`} color="link" size="sm">
                      {employe.id}
                    </Button>
                  </td>
                  <td>{employe.nom}</td>
                  <td>{employe.prenom}</td>
                  <td>{employe.matricule}</td>
                  <td>{employe.cin}</td>
                  {/*
                  <td>{employe.sexe}</td>
                  <td>{employe.tarifJournalier}</td>
                  <td>
                    <TextFormat type="date" value={employe.dateNaissance} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{employe.lieuNaissance}</td>
                  <td>{employe.situationFam}</td>
                  <td>{employe.nationalite}</td>
                  <td>
                    <TextFormat type="date" value={employe.dateEntree} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{employe.tel}</td>
                  <td>{employe.email}</td>
                  <td>{employe.adresse}</td>
                  <td>{employe.division}</td>
                  <td>{employe.typeContrat}</td>
                  <td>{employe.multiPorjet ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={employe.dateDepart} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{employe.motifDepart}</td>
                  <td>{employe.userModif}</td>
                  <td>
                    <TextFormat type="date" value={employe.dateModif} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{employe.projet ? <Link to={`projet/${employe.projet.id}`}>{employe.projet.id}</Link> : ''}</td>
                  <td>{employe.equipe ? <Link to={`equipe/${employe.equipe.id}`}>{employe.equipe.id}</Link> : ''}</td>
                  <td>{employe.fonction ? <Link to={`fonction/${employe.fonction.id}`}>{employe.fonction.id}</Link> : ''}</td>
                  <td>{employe.image ? <Link to={`image/${employe.image.id}`}>{employe.image.id}</Link> : ''}</td>
                  */}
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employe.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${employe.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${employe.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="ibamApp.employe.home.notFound">No Employes found</Translate>
            </div>
          )
        )}
      </div>
      <div className={employeList && employeList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ employe }: IRootState) => ({
  //   employeList: employe.entities,
  loading: employe.loading,
  totalItems: employe.totalItems
});

const mapDispatchToProps = {
  //   getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjetEmploye);
