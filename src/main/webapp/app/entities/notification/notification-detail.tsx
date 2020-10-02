import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NotificationDetail = (props: INotificationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { notificationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.notification.detail.title">Notification</Translate> [<b>{notificationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="libelle">
              <Translate contentKey="ibamApp.notification.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{notificationEntity.libelle}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ibamApp.notification.description">Description</Translate>
            </span>
          </dt>
          <dd>{notificationEntity.description}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="ibamApp.notification.date">Date</Translate>
            </span>
          </dt>
          <dd>
            {notificationEntity.date ? <TextFormat value={notificationEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="source">
              <Translate contentKey="ibamApp.notification.source">Source</Translate>
            </span>
          </dt>
          <dd>{notificationEntity.source}</dd>
          <dt>
            <span id="visualise">
              <Translate contentKey="ibamApp.notification.visualise">Visualise</Translate>
            </span>
          </dt>
          <dd>{notificationEntity.visualise ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="ibamApp.notification.user">User</Translate>
          </dt>
          <dd>{notificationEntity.user ? notificationEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/notification" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/notification/${notificationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ notification }: IRootState) => ({
  notificationEntity: notification.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDetail);
