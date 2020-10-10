import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocationDetail = (props: ILocationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { locationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.location.detail.title">Location</Translate> [<b>{locationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="reference">
              <Translate contentKey="ibamApp.location.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{locationEntity.reference}</dd>
          <dt>
            <span id="dateDebut">
              <Translate contentKey="ibamApp.location.dateDebut">Date Debut</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={locationEntity.dateDebut} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateFin">
              <Translate contentKey="ibamApp.location.dateFin">Date Fin</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={locationEntity.dateFin} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="tarif">
              <Translate contentKey="ibamApp.location.tarif">Tarif</Translate>
            </span>
          </dt>
          <dd>{locationEntity.tarif}</dd>
          <dt>
            <span id="dureLocation">
              <Translate contentKey="ibamApp.location.dureLocation">Dure Location</Translate>
            </span>
          </dt>
          <dd>{locationEntity.dureLocation}</dd>
          <dt>
            <span id="montantLocation">
              <Translate contentKey="ibamApp.location.montantLocation">Montant Location</Translate>
            </span>
          </dt>
          <dd>{locationEntity.montantLocation}</dd>
          <dt>
            <span id="remarque">
              <Translate contentKey="ibamApp.location.remarque">Remarque</Translate>
            </span>
          </dt>
          <dd>{locationEntity.remarque}</dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.location.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{locationEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.location.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={locationEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
          <dt>
            <Translate contentKey="ibamApp.location.materiel">Materiel</Translate>
          </dt>
          <dd>{locationEntity.materiel ? locationEntity.materiel.libelle : ''}</dd>
        </dl>
        <Button tag={Link} to="/location" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/location/${locationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ location }: IRootState) => ({
  locationEntity: location.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetail);
