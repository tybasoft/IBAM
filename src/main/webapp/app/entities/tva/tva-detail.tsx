import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tva.reducer';
import { ITva } from 'app/shared/model/tva.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITvaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TvaDetail = (props: ITvaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tvaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.tva.detail.title">Tva</Translate> [<b>{tvaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="taux">
              <Translate contentKey="ibamApp.tva.taux">Taux</Translate>
            </span>
          </dt>
          <dd>{tvaEntity.taux}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.tva.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{tvaEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.tva.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={tvaEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/tva" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tva/${tvaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tva }: IRootState) => ({
  tvaEntity: tva.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TvaDetail);
