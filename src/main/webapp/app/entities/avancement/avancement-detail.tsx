import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './avancement.reducer';
import { IAvancement } from 'app/shared/model/avancement.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAvancementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AvancementDetail = (props: IAvancementDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { avancementEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.avancement.detail.title">Avancement</Translate> [<b>{avancementEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="createdAt">
              <Translate contentKey="ibamApp.avancement.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {avancementEntity.createdAt ? (
              <TextFormat value={avancementEntity.createdAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedAt">
              <Translate contentKey="ibamApp.avancement.updatedAt">Updated At</Translate>
            </span>
          </dt>
          <dd>
            {avancementEntity.updatedAt ? (
              <TextFormat value={avancementEntity.updatedAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="ibamApp.avancement.compteRendu">Compte Rendu</Translate>
          </dt>
          <dd>{avancementEntity.compteRendu ? avancementEntity.compteRendu.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/avancement" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/avancement/${avancementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ avancement }: IRootState) => ({
  avancementEntity: avancement.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AvancementDetail);
