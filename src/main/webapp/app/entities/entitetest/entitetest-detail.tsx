import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './entitetest.reducer';
import { IEntitetest } from 'app/shared/model/entitetest.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEntitetestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EntitetestDetail = (props: IEntitetestDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { entitetestEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.entitetest.detail.title">Entitetest</Translate> [<b>{entitetestEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details"></dl>
        <Button tag={Link} to="/entitetest" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/entitetest/${entitetestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ entitetest }: IRootState) => ({
  entitetestEntity: entitetest.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EntitetestDetail);
