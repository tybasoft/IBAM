import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, RapportConsommation } from './projet.reducer';
import { IProjet } from 'app/shared/model/projet.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjetDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProjetDetail = (props: IProjetDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);
  const getConsommationRepport = () => {
    const res = props.RapportConsommation(props.match.params.id);
  };
  const { projetEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.projet.detail.title">Projet</Translate> [<b>{projetEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="reference">
              <Translate contentKey="ibamApp.projet.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{projetEntity.reference}</dd>
          <dt>
            <span id="libelle">
              <Translate contentKey="ibamApp.projet.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{projetEntity.libelle}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ibamApp.projet.description">Description</Translate>
            </span>
          </dt>
          <dd>{projetEntity.description}</dd>
          <dt>
            <span id="dateDebut">
              <Translate contentKey="ibamApp.projet.dateDebut">Date Debut</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={projetEntity.dateDebut} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateFin">
              <Translate contentKey="ibamApp.projet.dateFin">Date Fin</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={projetEntity.dateFin} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="nbrEmploye">
              <Translate contentKey="ibamApp.projet.nbrEmploye">Nbr Employe</Translate>
            </span>
          </dt>
          <dd>{projetEntity.nbrEmploye}</dd>
          <dt>
            <span id="budget">
              <Translate contentKey="ibamApp.projet.budget">Budget</Translate>
            </span>
          </dt>
          <dd>{projetEntity.budget}</dd>
          <dt>
            <span id="adresse">
              <Translate contentKey="ibamApp.projet.adresse">Adresse</Translate>
            </span>
          </dt>
          <dd>{projetEntity.adresse}</dd>
          <dt>
            <span id="ville">
              <Translate contentKey="ibamApp.projet.ville">Ville</Translate>
            </span>
          </dt>
          <dd>{projetEntity.ville}</dd>
          <dt>
            <span id="pays">
              <Translate contentKey="ibamApp.projet.pays">Pays</Translate>
            </span>
          </dt>
          <dd>{projetEntity.pays}</dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.projet.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{projetEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.projet.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={projetEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
          <dt>
            <Translate contentKey="ibamApp.projet.entreprise">Entreprise</Translate>
          </dt>
          <dd>{projetEntity.entreprise ? projetEntity.entreprise.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.projet.horaire">Horaire</Translate>
          </dt>
          <dd>{projetEntity.horaire ? projetEntity.horaire.id: ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.projet.depot">Depot</Translate>
          </dt>
          <dd>{projetEntity.depot ? projetEntity.depot.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/projet" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/projet/${projetEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>{' '}
        <Button onClick={getConsommationRepport} replace color="success">
          <span className="d-none d-md-inline">
            <Translate contentKey="ibamApp.materiel.detail.consommation">Rapport de consommation</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ projet }: IRootState) => ({
  projetEntity: projet.entity
});

const mapDispatchToProps = { getEntity, RapportConsommation };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjetDetail);
