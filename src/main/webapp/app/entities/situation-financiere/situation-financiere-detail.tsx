import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './situation-financiere.reducer';
import { ISituationFinanciere } from 'app/shared/model/situation-financiere.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISituationFinanciereDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SituationFinanciereDetail = (props: ISituationFinanciereDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { situationFinanciereEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.situationFinanciere.detail.title">SituationFinanciere</Translate> [
          <b>{situationFinanciereEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="montantFacture">
              <Translate contentKey="ibamApp.situationFinanciere.montantFacture">Montant Facture</Translate>
            </span>
          </dt>
          <dd>{situationFinanciereEntity.montantFacture}</dd>
          <dt>
            <span id="dateFacturation">
              <Translate contentKey="ibamApp.situationFinanciere.dateFacturation">Date Facturation</Translate>
            </span>
          </dt>
          <dd>
            {situationFinanciereEntity.dateFacturation ? (
              <TextFormat value={situationFinanciereEntity.dateFacturation} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="montantEnCours">
              <Translate contentKey="ibamApp.situationFinanciere.montantEnCours">Montant En Cours</Translate>
            </span>
          </dt>
          <dd>{situationFinanciereEntity.montantEnCours}</dd>
          <dt>
            <Translate contentKey="ibamApp.situationFinanciere.projet">Projet</Translate>
          </dt>
          <dd>{situationFinanciereEntity.projet ? situationFinanciereEntity.projet.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/situation-financiere" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/situation-financiere/${situationFinanciereEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ situationFinanciere }: IRootState) => ({
  situationFinanciereEntity: situationFinanciere.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SituationFinanciereDetail);
