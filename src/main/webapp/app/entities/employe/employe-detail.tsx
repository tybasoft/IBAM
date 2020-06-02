import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employe.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';
import { IEmploye } from 'app/shared/model/employe.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeDetail = (props: IEmployeDetailProps) => {
  const { employeEntity, imageEntity } = props;

  useEffect(() => {
    props.resetImage();
    props.getEntity(props.match.params.id);
  }, []);

  useEffect(() => {
    if (employeEntity.id !== undefined) {
      if (employeEntity.id.toString() === props.match.params.id && employeEntity.image !== null) {
        props.getImage(employeEntity.image.id);
      }
    }
  }, [employeEntity]);

  return (
    <Row>
      <Col md="6">
        <h2>
          <Translate contentKey="ibamApp.employe.detail.title">Employe</Translate> [<b>{employeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nom">
              <Translate contentKey="ibamApp.employe.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{employeEntity.nom}</dd>
          <dt>
            <span id="prenom">
              <Translate contentKey="ibamApp.employe.prenom">Prenom</Translate>
            </span>
          </dt>
          <dd>{employeEntity.prenom}</dd>
          <dt>
            <span id="matricule">
              <Translate contentKey="ibamApp.employe.matricule">Matricule</Translate>
            </span>
          </dt>
          <dd>{employeEntity.matricule}</dd>
          <dt>
            <span id="cin">
              <Translate contentKey="ibamApp.employe.cin">Cin</Translate>
            </span>
          </dt>
          <dd>{employeEntity.cin}</dd>
          <dt>
            <span id="sexe">
              <Translate contentKey="ibamApp.employe.sexe">Sexe</Translate>
            </span>
          </dt>
          <dd>{employeEntity.sexe}</dd>
          <dt>
            <span id="tarifJournalier">
              <Translate contentKey="ibamApp.employe.tarifJournalier">Tarif Journalier</Translate>
            </span>
          </dt>
          <dd>{employeEntity.tarifJournalier}</dd>
          <dt>
            <span id="dateNaissance">
              <Translate contentKey="ibamApp.employe.dateNaissance">Date Naissance</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={employeEntity.dateNaissance} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="lieuNaissance">
              <Translate contentKey="ibamApp.employe.lieuNaissance">Lieu Naissance</Translate>
            </span>
          </dt>
          <dd>{employeEntity.lieuNaissance}</dd>
          <dt>
            <span id="situationFam">
              <Translate contentKey="ibamApp.employe.situationFam">Situation Fam</Translate>
            </span>
          </dt>
          <dd>{employeEntity.situationFam}</dd>
          <dt>
            <span id="nationalite">
              <Translate contentKey="ibamApp.employe.nationalite">Nationalite</Translate>
            </span>
          </dt>
          <dd>{employeEntity.nationalite}</dd>
          <dt>
            <span id="dateEntree">
              <Translate contentKey="ibamApp.employe.dateEntree">Date Entree</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={employeEntity.dateEntree} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="tel">
              <Translate contentKey="ibamApp.employe.tel">Tel</Translate>
            </span>
          </dt>
          <dd>{employeEntity.tel}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="ibamApp.employe.email">Email</Translate>
            </span>
          </dt>
          <dd>{employeEntity.email}</dd>
          <dt>
            <span id="adresse">
              <Translate contentKey="ibamApp.employe.adresse">Adresse</Translate>
            </span>
          </dt>
          <dd>{employeEntity.adresse}</dd>
          <dt>
            <span id="division">
              <Translate contentKey="ibamApp.employe.division">Division</Translate>
            </span>
          </dt>
          <dd>{employeEntity.division}</dd>
          <dt>
            <span id="typeContrat">
              <Translate contentKey="ibamApp.employe.typeContrat">Type Contrat</Translate>
            </span>
          </dt>
          <dd>{employeEntity.typeContrat}</dd>
          <dt>
            <span id="multiPorjet">
              <Translate contentKey="ibamApp.employe.multiPorjet">Multi Porjet</Translate>
            </span>
          </dt>
          <dd>{employeEntity.multiPorjet ? 'true' : 'false'}</dd>
          <dt>
            <span id="dateDepart">
              <Translate contentKey="ibamApp.employe.dateDepart">Date Depart</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={employeEntity.dateDepart} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="motifDepart">
              <Translate contentKey="ibamApp.employe.motifDepart">Motif Depart</Translate>
            </span>
          </dt>
          <dd>{employeEntity.motifDepart}</dd>
          {/*
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.employe.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{employeEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.employe.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={employeEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          */}
          <dt>
            <Translate contentKey="ibamApp.employe.projet">Projet</Translate>
          </dt>
          <dd>{employeEntity.projet ? employeEntity.projet.libelle : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.employe.equipe">Equipe</Translate>
          </dt>
          <dd>{employeEntity.equipe ? employeEntity.equipe.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.employe.fonction">Fonction</Translate>
          </dt>
          <dd>{employeEntity.fonction ? employeEntity.fonction.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/employe" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employe/${employeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
      <Col md="6">
        {employeEntity.image !== null ? (
          <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '80%', border: 'solid 1px' }} />
        ) : null}
      </Col>
    </Row>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  employeEntity: storeState.employe.entity,
  imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeDetail);
