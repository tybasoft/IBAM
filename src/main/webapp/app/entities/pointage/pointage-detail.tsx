import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pointage.reducer';
import { IPointage } from 'app/shared/model/pointage.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPointageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PointageDetail = (props: IPointageDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { pointageEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.pointage.detail.title">Pointage</Translate> [<b>{pointageEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="dateJour">
              <Translate contentKey="ibamApp.pointage.dateJour">Date Jour</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={pointageEntity.dateJour} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="presenceMatin">
              <Translate contentKey="ibamApp.pointage.presenceMatin">Presence Matin</Translate>
            </span>
          </dt>
          <dd>{pointageEntity.presenceMatin ? 'true' : 'false'}</dd>
          <dt>
            <span id="presenceAPM">
              <Translate contentKey="ibamApp.pointage.presenceAPM">Presence APM</Translate>
            </span>
          </dt>
          <dd>{pointageEntity.presenceAPM ? 'true' : 'false'}</dd>
          <dt>
            <span id="nbrHeureSup">
              <Translate contentKey="ibamApp.pointage.nbrHeureSup">Nbr Heure Sup</Translate>
            </span>
          </dt>
          <dd>{pointageEntity.nbrHeureSup}</dd>
          <dt>
            <span id="remarques">
              <Translate contentKey="ibamApp.pointage.remarques">Remarques</Translate>
            </span>
          </dt>
          <dd>{pointageEntity.remarques}</dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.pointage.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{pointageEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.pointage.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={pointageEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
          <dt>
            <Translate contentKey="ibamApp.pointage.employe">Employe</Translate>
          </dt>
          <dd>{pointageEntity.employe ? pointageEntity.employe.cin: ''}</dd>
        </dl>
        <Button tag={Link} to="/pointage" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pointage/${pointageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ pointage }: IRootState) => ({
  pointageEntity: pointage.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PointageDetail);
