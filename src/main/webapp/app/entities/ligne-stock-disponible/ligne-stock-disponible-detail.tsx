import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ligne-stock-disponible.reducer';
import { ILigneStockDisponible } from 'app/shared/model/ligne-stock-disponible.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILigneStockDisponibleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LigneStockDisponibleDetail = (props: ILigneStockDisponibleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { ligneStockDisponibleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.ligneStockDisponible.detail.title">LigneStockDisponible</Translate> [
          <b>{ligneStockDisponibleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantite">
              <Translate contentKey="ibamApp.ligneStockDisponible.quantite">Quantite</Translate>
            </span>
          </dt>
          <dd>{ligneStockDisponibleEntity.quantite}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="ibamApp.ligneStockDisponible.type">Type</Translate>
            </span>
          </dt>
          <dd>{ligneStockDisponibleEntity.type}</dd>
          <dt>
            <Translate contentKey="ibamApp.ligneStockDisponible.materiel">Materiel</Translate>
          </dt>
          <dd>{ligneStockDisponibleEntity.materiel ? ligneStockDisponibleEntity.materiel.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.ligneStockDisponible.materiau">Materiau</Translate>
          </dt>
          <dd>{ligneStockDisponibleEntity.materiau ? ligneStockDisponibleEntity.materiau.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.ligneStockDisponible.stockDisponible">Stock Disponible</Translate>
          </dt>
          <dd>{ligneStockDisponibleEntity.stockDisponible ? ligneStockDisponibleEntity.stockDisponible.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/ligne-stock-disponible" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ligne-stock-disponible/${ligneStockDisponibleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ ligneStockDisponible }: IRootState) => ({
  ligneStockDisponibleEntity: ligneStockDisponible.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LigneStockDisponibleDetail);
