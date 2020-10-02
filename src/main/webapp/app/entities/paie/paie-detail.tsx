import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './paie.reducer';
import { IPaie } from 'app/shared/model/paie.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaieDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaieDetail = (props: IPaieDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { paieEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.paie.detail.title">Paie</Translate> [<b>{paieEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="datePaiement">
              <Translate contentKey="ibamApp.paie.datePaiement">Date Paiement</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={paieEntity.datePaiement} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="nbrJourTravail">
              <Translate contentKey="ibamApp.paie.nbrJourTravail">Nbr Jour Travail</Translate>
            </span>
          </dt>
          <dd>{paieEntity.nbrJourTravail}</dd>
          <dt>
            <span id="montantPay">
              <Translate contentKey="ibamApp.paie.montantPay">Montant Pay</Translate>
            </span>
          </dt>
          <dd>{paieEntity.montantPay}</dd>
          <dt>
            <span id="nbrHeurSup">
              <Translate contentKey="ibamApp.paie.nbrHeurSup">Nbr Heur Sup</Translate>
            </span>
          </dt>
          <dd>{paieEntity.nbrHeurSup}</dd>
          <dt>
            <span id="dateDebut">
              <Translate contentKey="ibamApp.paie.dateDebut">Date Debut</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={paieEntity.dateDebut} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateFin">
              <Translate contentKey="ibamApp.paie.dateFin">Date Fin</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={paieEntity.dateFin} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="remarques">
              <Translate contentKey="ibamApp.paie.remarques">Remarques</Translate>
            </span>
          </dt>
          <dd>{paieEntity.remarques}</dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.paie.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{paieEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.paie.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={paieEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
          <dt>
            <Translate contentKey="ibamApp.paie.employe">Employe</Translate>
          </dt>
          <dd>{paieEntity.employe ? paieEntity.employe.nom : ''}</dd>
        </dl>
        <Button tag={Link} to="/paie" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/paie/${paieEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ paie }: IRootState) => ({
  paieEntity: paie.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaieDetail);
