import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './depot.reducer';
import { IDepot } from 'app/shared/model/depot.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import GoogleMapReact from 'google-map-react';

const LocationPin: any = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
  </div>
);

export interface IDepotDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DepotDetail = (props: IDepotDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { depotEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.depot.detail.title">Depot</Translate> [<b>{depotEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="libelle">
              <Translate contentKey="ibamApp.depot.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{depotEntity.libelle}</dd>
          <dt>
            <span id="adresse">
              <Translate contentKey="ibamApp.depot.adresse">Adresse</Translate>
            </span>
          </dt>
          <dd>{depotEntity.adresse}</dd>
          <dt>
            <span id="tel">
              <Translate contentKey="ibamApp.depot.tel">Tel</Translate>
            </span>
          </dt>
          <dd>{depotEntity.tel}</dd>
          <dt>
            <span id="ville">
              <Translate contentKey="ibamApp.depot.ville">Ville</Translate>
            </span>
          </dt>
          <dd>{depotEntity.ville}</dd>
          <dt>
            <span id="pays">
              <Translate contentKey="ibamApp.depot.pays">Pays</Translate>
            </span>
          </dt>
          <dd>{depotEntity.pays}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.depot.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{depotEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.depot.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={depotEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        {depotEntity.latitude && depotEntity.longitude && <div className="mt-2 mb-2" style={{height: '100vh'}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyC3ptr9KQuVbnjrokZLtgQH01RLrtQeWMA' }}
            defaultCenter={{ lat: depotEntity.latitude, lng: depotEntity.longitude }}
            defaultZoom={10}
          >
            <LocationPin
              lat={depotEntity.latitude}
              lng={depotEntity.longitude}
            />
          </GoogleMapReact>
        </div>}
        { (!depotEntity.latitude || !depotEntity.longitude) &&
        <p>
          <Translate contentKey="ibamApp.depot.nolocal">Aucune information sur la géolocalisation du dépot</Translate>
        </p>
        }
        <Button tag={Link} to="/depot" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/depot/${depotEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ depot }: IRootState) => ({
  depotEntity: depot.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DepotDetail);
