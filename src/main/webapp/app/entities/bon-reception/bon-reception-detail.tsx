import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bon-reception.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';
import { IBonReception } from 'app/shared/model/bon-reception.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBonReceptionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BonReceptionDetail = (props: IBonReceptionDetailProps) => {
  const { bonReceptionEntity, imageEntity } = props;

  useEffect(() => {
    props.resetImage();
    props.getEntity(props.match.params.id);
  }, []);

  useEffect(() => {
    if (bonReceptionEntity.id !== undefined) {
      if (bonReceptionEntity.id.toString() === props.match.params.id && bonReceptionEntity.image !== null) {
        props.getImage(bonReceptionEntity.image.id);
      }
    }
  }, [bonReceptionEntity]);

  return (
    <Row>
      <Col md="6">
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
          <dd>{bonReceptionEntity.depot ? bonReceptionEntity.depot.libelle : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.bonReception.fournisseur">Fournisseur</Translate>
          </dt>
          <dd>{bonReceptionEntity.fournisseur ? bonReceptionEntity.fournisseur.nomCommercial : ''}</dd>
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
      <Col md="6">
        {bonReceptionEntity.image !== null ? (
          <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '80%', border: 'solid 1px' }} />
        ) : null}
      </Col>
    </Row>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  bonReceptionEntity: storeState.bonReception.entity,
  imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonReceptionDetail);
