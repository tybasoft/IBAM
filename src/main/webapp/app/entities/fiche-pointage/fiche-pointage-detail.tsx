import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './fiche-pointage.reducer';
import { IFichePointage } from 'app/shared/model/fiche-pointage.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFichePointageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FichePointageDetail = (props: IFichePointageDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fichePointageEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.fichePointage.detail.title">FichePointage</Translate> [<b>{fichePointageEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="dateJour">
              <Translate contentKey="ibamApp.fichePointage.dateJour">Date Jour</Translate>
            </span>
          </dt>
          <dd>
            {fichePointageEntity.dateJour ? (
              <TextFormat value={fichePointageEntity.dateJour} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.fichePointage.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{fichePointageEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.fichePointage.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            {fichePointageEntity.dateModif ? (
              <TextFormat value={fichePointageEntity.dateModif} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd> */}
          <dt>
            <Translate contentKey="ibamApp.fichePointage.projet">Projet</Translate>
          </dt>
          <dd>{fichePointageEntity.projet ? fichePointageEntity.projet.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/fiche-pointage" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fiche-pointage/${fichePointageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fichePointage }: IRootState) => ({
  fichePointageEntity: fichePointage.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FichePointageDetail);
