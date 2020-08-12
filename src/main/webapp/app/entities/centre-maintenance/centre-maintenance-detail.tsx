import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './centre-maintenance.reducer';
import { ICentreMaintenance } from 'app/shared/model/centre-maintenance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICentreMaintenanceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CentreMaintenanceDetail = (props: ICentreMaintenanceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { centreMaintenanceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.centreMaintenance.detail.title">CentreMaintenance</Translate> [<b>{centreMaintenanceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="libelle">
              <Translate contentKey="ibamApp.centreMaintenance.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{centreMaintenanceEntity.libelle}</dd>
          <dt>
            <span id="specialite">
              <Translate contentKey="ibamApp.centreMaintenance.specialite">Specialite</Translate>
            </span>
          </dt>
          <dd>{centreMaintenanceEntity.specialite}</dd>
          <dt>
            <span id="responsable">
              <Translate contentKey="ibamApp.centreMaintenance.responsable">Responsable</Translate>
            </span>
          </dt>
          <dd>{centreMaintenanceEntity.responsable}</dd>
          <dt>
            <span id="adresse">
              <Translate contentKey="ibamApp.centreMaintenance.adresse">Adresse</Translate>
            </span>
          </dt>
          <dd>{centreMaintenanceEntity.adresse}</dd>
          <dt>
            <span id="telephone">
              <Translate contentKey="ibamApp.centreMaintenance.telephone">Telephone</Translate>
            </span>
          </dt>
          <dd>{centreMaintenanceEntity.telephone}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="ibamApp.centreMaintenance.email">Email</Translate>
            </span>
          </dt>
          <dd>{centreMaintenanceEntity.email}</dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.centreMaintenance.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{centreMaintenanceEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.centreMaintenance.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={centreMaintenanceEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
        </dl>
        <Button tag={Link} to="/centre-maintenance" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/centre-maintenance/${centreMaintenanceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ centreMaintenance }: IRootState) => ({
  centreMaintenanceEntity: centreMaintenance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CentreMaintenanceDetail);
