import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './horaire.reducer';
import { IHoraire } from 'app/shared/model/horaire.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHoraireDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const HoraireDetail = (props: IHoraireDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { horaireEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.horaire.detail.title">Horaire</Translate> [<b>{horaireEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="libelle">
              <Translate contentKey="ibamApp.horaire.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{horaireEntity.libelle}</dd>
          <dt>
            <span id="nbrHeurParJr">
              <Translate contentKey="ibamApp.horaire.nbrHeurParJr">Nbr Heur Par Jr</Translate>
            </span>
          </dt>
          <dd>{horaireEntity.nbrHeurParJr}</dd>
          <dt>
            <span id="nbrJourParSem">
              <Translate contentKey="ibamApp.horaire.nbrJourParSem">Nbr Jour Par Sem</Translate>
            </span>
          </dt>
          <dd>{horaireEntity.nbrJourParSem}</dd>
          <dt>
            <span id="heureDebutJr">
              <Translate contentKey="ibamApp.horaire.heureDebutJr">Heure Debut Jr</Translate>
            </span>
          </dt>
          <dd>{horaireEntity.heureDebutJr}</dd>
          <dt>
            <span id="heureFinJr">
              <Translate contentKey="ibamApp.horaire.heureFinJr">Heure Fin Jr</Translate>
            </span>
          </dt>
          <dd>{horaireEntity.heureFinJr}</dd>
          <dt>
            <span id="dureePause">
              <Translate contentKey="ibamApp.horaire.dureePause">Duree Pause</Translate>
            </span>
          </dt>
          <dd>{horaireEntity.dureePause}</dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.horaire.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{horaireEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.horaire.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={horaireEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
        </dl>
        <Button tag={Link} to="/horaire" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/horaire/${horaireEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ horaire }: IRootState) => ({
  horaireEntity: horaire.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HoraireDetail);
