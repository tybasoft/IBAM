import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './materiau.reducer';
import { IMateriau } from 'app/shared/model/materiau.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMateriauDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MateriauDetail = (props: IMateriauDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { materiauEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.materiau.detail.title">Materiau</Translate> [<b>{materiauEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="libelle">
              <Translate contentKey="ibamApp.materiau.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{materiauEntity.libelle}</dd>
          <dt>
            <span id="reference">
              <Translate contentKey="ibamApp.materiau.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{materiauEntity.reference}</dd>
          <dt>
            <span id="poids">
              <Translate contentKey="ibamApp.materiau.poids">Poids</Translate>
            </span>
          </dt>
          <dd>{materiauEntity.poids}</dd>
          <dt>
            <span id="volume">
              <Translate contentKey="ibamApp.materiau.volume">Volume</Translate>
            </span>
          </dt>
          <dd>{materiauEntity.volume}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.materiau.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{materiauEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.materiau.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={materiauEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="ibamApp.materiau.marque">Marque</Translate>
          </dt>
          <dd>{materiauEntity.marque ? materiauEntity.marque.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.materiau.unite">Unite</Translate>
          </dt>
          <dd>{materiauEntity.unite ? materiauEntity.unite.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.materiau.famille">Famille</Translate>
          </dt>
          <dd>{materiauEntity.famille ? materiauEntity.famille.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.materiau.tva">Tva</Translate>
          </dt>
          <dd>{materiauEntity.tva ? materiauEntity.tva.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.materiau.image">Image</Translate>
          </dt>
          <dd>{materiauEntity.image ? materiauEntity.image.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/materiau" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/materiau/${materiauEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ materiau }: IRootState) => ({
  materiauEntity: materiau.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MateriauDetail);
