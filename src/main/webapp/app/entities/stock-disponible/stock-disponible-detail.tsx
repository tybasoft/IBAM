import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './stock-disponible.reducer';
import { IStockDisponible } from 'app/shared/model/stock-disponible.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStockDisponibleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StockDisponibleDetail = (props: IStockDisponibleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { stockDisponibleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.stockDisponible.detail.title">StockDisponible</Translate> [<b>{stockDisponibleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="dateStock">
              <Translate contentKey="ibamApp.stockDisponible.dateStock">Date Stock</Translate>
            </span>
          </dt>
          <dd>
            {stockDisponibleEntity.dateStock ? (
              <TextFormat value={stockDisponibleEntity.dateStock} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.stockDisponible.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{stockDisponibleEntity.userModif}</dd>
          <dt>
            <span id="remarque">
              <Translate contentKey="ibamApp.stockDisponible.remarque">Remarque</Translate>
            </span>
          </dt>
          <dd>{stockDisponibleEntity.remarque}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.stockDisponible.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            {stockDisponibleEntity.dateModif ? (
              <TextFormat value={stockDisponibleEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="quantite">
              <Translate contentKey="ibamApp.stockDisponible.quantite">Quantite</Translate>
            </span>
          </dt>
          <dd>{stockDisponibleEntity.quantite}</dd>
          <dt>
            <Translate contentKey="ibamApp.stockDisponible.materiel">Materiel</Translate>
          </dt>
          <dd>{stockDisponibleEntity.materiel ? stockDisponibleEntity.materiel.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.stockDisponible.materiau">Materiau</Translate>
          </dt>
          <dd>{stockDisponibleEntity.materiau ? stockDisponibleEntity.materiau.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/stock-disponible" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/stock-disponible/${stockDisponibleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ stockDisponible }: IRootState) => ({
  stockDisponibleEntity: stockDisponible.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StockDisponibleDetail);
