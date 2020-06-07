import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './maintenance.reducer';
import { IMaintenance } from 'app/shared/model/maintenance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMaintenanceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MaintenanceDetail = (props: IMaintenanceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { maintenanceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.maintenance.detail.title">Maintenance</Translate> [<b>{maintenanceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="reference">
              <Translate contentKey="ibamApp.maintenance.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{maintenanceEntity.reference}</dd>
          <dt>
            <span id="datePanne">
              <Translate contentKey="ibamApp.maintenance.datePanne">Date Panne</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={maintenanceEntity.datePanne} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="frais">
              <Translate contentKey="ibamApp.maintenance.frais">Frais</Translate>
            </span>
          </dt>
          <dd>{maintenanceEntity.frais}</dd>
          <dt>
            <span id="technicien">
              <Translate contentKey="ibamApp.maintenance.technicien">Technicien</Translate>
            </span>
          </dt>
          <dd>{maintenanceEntity.technicien}</dd>
          <dt>
            <span id="motif">
              <Translate contentKey="ibamApp.maintenance.motif">Motif</Translate>
            </span>
          </dt>
          <dd>{maintenanceEntity.motif}</dd>
          <dt>
            <span id="problemeFrequent">
              <Translate contentKey="ibamApp.maintenance.problemeFrequent">Probleme Frequent</Translate>
            </span>
          </dt>
          <dd>{maintenanceEntity.problemeFrequent ? 'true' : 'false'}</dd>
          <dt>
            <span id="remarque">
              <Translate contentKey="ibamApp.maintenance.remarque">Remarque</Translate>
            </span>
          </dt>
          <dd>{maintenanceEntity.remarque}</dd>
          <dt>
            <span id="dureePanne">
              <Translate contentKey="ibamApp.maintenance.dureePanne">Duree Panne</Translate>
            </span>
          </dt>
          <dd>{maintenanceEntity.dureePanne}</dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.maintenance.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{maintenanceEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.maintenance.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={maintenanceEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
          <dt>
            <Translate contentKey="ibamApp.maintenance.materiel">Materiel</Translate>
          </dt>
          <dd>{maintenanceEntity.materiel ? maintenanceEntity.materiel.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.maintenance.centreMaintenance">Centre Maintenance</Translate>
          </dt>
          <dd>{maintenanceEntity.centreMaintenance ? maintenanceEntity.centreMaintenance.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.maintenance.image">Image</Translate>
          </dt>
          <dd>{maintenanceEntity.image ? maintenanceEntity.image.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/maintenance" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/maintenance/${maintenanceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ maintenance }: IRootState) => ({
  maintenanceEntity: maintenance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceDetail);
