import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ligne-bon-reception.reducer';
import { ILigneBonReception } from 'app/shared/model/ligne-bon-reception.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILigneBonReceptionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LigneBonReceptionDetail = (props: ILigneBonReceptionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { ligneBonReceptionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.ligneBonReception.detail.title">LigneBonReception</Translate> [<b>{ligneBonReceptionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantite">
              <Translate contentKey="ibamApp.ligneBonReception.quantite">Quantite</Translate>
            </span>
          </dt>
          <dd>{ligneBonReceptionEntity.quantite}</dd>
          <dt>
            <span id="prixHt">
              <Translate contentKey="ibamApp.ligneBonReception.prixHt">Prix Ht</Translate>
            </span>
          </dt>
          <dd>{ligneBonReceptionEntity.prixHt}</dd>
          <dt>
            <Translate contentKey="ibamApp.ligneBonReception.bonReception">Bon Reception</Translate>
          </dt>
          <dd>{ligneBonReceptionEntity.bonReception ? ligneBonReceptionEntity.bonReception.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.ligneBonReception.materiau">Materiau</Translate>
          </dt>
          <dd>{ligneBonReceptionEntity.materiau ? ligneBonReceptionEntity.materiau.libelle : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.ligneBonReception.materiel">Materiel</Translate>
          </dt>
          <dd>{ligneBonReceptionEntity.materiel ? ligneBonReceptionEntity.materiel.libelle : ''}</dd>
        </dl>
        <Button tag={Link} to="/ligne-bon-reception" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ligne-bon-reception/${ligneBonReceptionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ ligneBonReception }: IRootState) => ({
  ligneBonReceptionEntity: ligneBonReception.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LigneBonReceptionDetail);
