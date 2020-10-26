import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './materiel.reducer';
import { IMateriel } from 'app/shared/model/materiel.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMaterielDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MaterielDetail = (props: IMaterielDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { materielEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.materiel.detail.title">Materiel</Translate> [<b>{materielEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="libelle">
              <Translate contentKey="ibamApp.materiel.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{materielEntity.libelle}</dd>
          <dt>
            <span id="matricule">
              <Translate contentKey="ibamApp.materiel.matricule">Matricule</Translate>
            </span>
          </dt>
          <dd>{materielEntity.matricule}</dd>
          <dt>
            <span id="modele">
              <Translate contentKey="ibamApp.materiel.modele">Modele</Translate>
            </span>
          </dt>
          <dd>{materielEntity.modele}</dd>
          <dt>
            <span id="numCarteGrise">
              <Translate contentKey="ibamApp.materiel.numCarteGrise">Num Carte Grise</Translate>
            </span>
          </dt>
          <dd>{materielEntity.numCarteGrise}</dd>
          <dt>
            <span id="dateIdentification">
              <Translate contentKey="ibamApp.materiel.dateIdentification">Date Identification</Translate>
            </span>
          </dt>
          <dd>
            {materielEntity.dateIdentification ? (
              <TextFormat value={materielEntity.dateIdentification} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="compteurAchat">
              <Translate contentKey="ibamApp.materiel.compteurAchat">Compteur Achat</Translate>
            </span>
          </dt>
          <dd>{materielEntity.compteurAchat}</dd>
          <dt>
            <span id="etat">
              <Translate contentKey="ibamApp.materiel.etat">Etat</Translate>
            </span>
          </dt>
          <dd>{materielEntity.etat}</dd>
          <dt>
            <span id="location">
              <Translate contentKey="ibamApp.materiel.location">Location</Translate>
            </span>
          </dt>
          <dd>{materielEntity.location ? 'true' : 'false'}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ibamApp.materiel.description">Description</Translate>
            </span>
          </dt>
          <dd>{materielEntity.description}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.materiel.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{materielEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.materiel.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            {materielEntity.dateModif ? <TextFormat value={materielEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="multiProjet">
              <Translate contentKey="ibamApp.materiel.multiProjet">Multi Projet</Translate>
            </span>
          </dt>
          <dd>{materielEntity.multiProjet ? 'true' : 'false'}</dd>
          <dt>
            <span id="reference">
              <Translate contentKey="ibamApp.materiel.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{materielEntity.reference}</dd>
          <dt>
            <Translate contentKey="ibamApp.materiel.famille">Famille</Translate>
          </dt>
          <dd>{materielEntity.famille ? materielEntity.famille.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.materiel.typeMateriel">Type Materiel</Translate>
          </dt>
          <dd>{materielEntity.typeMateriel ? materielEntity.typeMateriel.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.materiel.fournisseur">Fournisseur</Translate>
          </dt>
          <dd>{materielEntity.fournisseur ? materielEntity.fournisseur.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.materiel.marque">Marque</Translate>
          </dt>
          <dd>{materielEntity.marque ? materielEntity.marque.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.materiel.document">Document</Translate>
          </dt>
          <dd>{materielEntity.document ? materielEntity.document.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.materiel.employe">Employe</Translate>
          </dt>
          <dd>{materielEntity.employe ? materielEntity.employe.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.materiel.image">Image</Translate>
          </dt>
          <dd>{materielEntity.image ? materielEntity.image.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.materiel.projet">Projet</Translate>
          </dt>
          <dd>{materielEntity.projet ? materielEntity.projet.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/materiel" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/materiel/${materielEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ materiel }: IRootState) => ({
  materielEntity: materiel.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MaterielDetail);
