import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bon-reception.reducer';
import { IBonReception } from 'app/shared/model/bon-reception.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBonReceptionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BonReceptionDetail = (props: IBonReceptionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bonReceptionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.bonReception.detail.title">BonReception</Translate> [<b>{bonReceptionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="livreur">
              <Translate contentKey="ibamApp.bonReception.livreur">Livreur</Translate>
            </span>
          </dt>
          <dd>{bonReceptionEntity.livreur}</dd>
          <dt>
            <span id="remarques">
              <Translate contentKey="ibamApp.bonReception.remarques">Remarques</Translate>
            </span>
          </dt>
          <dd>{bonReceptionEntity.remarques}</dd>
          <dt>
            <span id="dateLivraison">
              <Translate contentKey="ibamApp.bonReception.dateLivraison">Date Livraison</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={bonReceptionEntity.dateLivraison} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.bonReception.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{bonReceptionEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.bonReception.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={bonReceptionEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="ibamApp.bonReception.depot">Depot</Translate>
          </dt>
          <dd>{bonReceptionEntity.depot ? bonReceptionEntity.depot.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.bonReception.fournisseur">Fournisseur</Translate>
          </dt>
          <dd>{bonReceptionEntity.fournisseur ? bonReceptionEntity.fournisseur.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.bonReception.image">Image</Translate>
          </dt>
          <dd>{bonReceptionEntity.image ? bonReceptionEntity.image.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/bon-reception" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bon-reception/${bonReceptionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bonReception }: IRootState) => ({
  bonReceptionEntity: bonReception.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonReceptionDetail);
