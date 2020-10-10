import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './planification.reducer';
import { IPlanification } from 'app/shared/model/planification.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlanificationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlanificationDetail = (props: IPlanificationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { planificationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.planification.detail.title">Planification</Translate> [<b>{planificationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nom_tache">
              <Translate contentKey="ibamApp.planification.nom_tache">Nom Tache</Translate>
            </span>
          </dt>
          <dd>{planificationEntity.nom_tache}</dd>
          <dt>
            <span id="description_tache">
              <Translate contentKey="ibamApp.planification.description_tache">Description Tache</Translate>
            </span>
          </dt>
          <dd>{planificationEntity.description_tache}</dd>
          <dt>
            <span id="date_debut">
              <Translate contentKey="ibamApp.planification.date_debut">Date Debut</Translate>
            </span>
          </dt>
          <dd>
            {planificationEntity.date_debut ? (
              <TextFormat value={planificationEntity.date_debut} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="date_fin">
              <Translate contentKey="ibamApp.planification.date_fin">Date Fin</Translate>
            </span>
          </dt>
          <dd>
            {planificationEntity.date_fin ? <TextFormat value={planificationEntity.date_fin} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="ibamApp.planification.employe">Employe</Translate>
          </dt>
          <dd>
            {planificationEntity.employes
              ? planificationEntity.employes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {planificationEntity.employes && i === planificationEntity.employes.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/planification" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/planification/${planificationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ planification }: IRootState) => ({
  planificationEntity: planification.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlanificationDetail);
