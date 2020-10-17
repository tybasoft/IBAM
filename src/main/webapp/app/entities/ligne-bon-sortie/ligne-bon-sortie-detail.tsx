import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ligne-bon-sortie.reducer';
import { ILigneBonSortie } from 'app/shared/model/ligne-bon-sortie.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILigneBonSortieDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LigneBonSortieDetail = (props: ILigneBonSortieDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { ligneBonSortieEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.ligneBonSortie.detail.title">LigneBonSortie</Translate> [<b>{ligneBonSortieEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantite">
              <Translate contentKey="ibamApp.ligneBonSortie.quantite">Quantite</Translate>
            </span>
          </dt>
          <dd>{ligneBonSortieEntity.quantite}</dd>
          <dt>
            <span id="prixHt">
              <Translate contentKey="ibamApp.ligneBonSortie.prixHt">Prix Ht</Translate>
            </span>
          </dt>
          <dd>{ligneBonSortieEntity.prixHt}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="ibamApp.ligneBonSortie.type">Type</Translate>
            </span>
          </dt>
          <dd>{ligneBonSortieEntity.type}</dd>
          <dt>
            <Translate contentKey="ibamApp.ligneBonSortie.materiel">Materiel</Translate>
          </dt>
          <dd>{ligneBonSortieEntity.materiel ? ligneBonSortieEntity.materiel.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.ligneBonSortie.materiau">Materiau</Translate>
          </dt>
          <dd>{ligneBonSortieEntity.materiau ? ligneBonSortieEntity.materiau.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.ligneBonSortie.bonSortie">Bon Sortie</Translate>
          </dt>
          <dd>{ligneBonSortieEntity.bonSortie ? ligneBonSortieEntity.bonSortie.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/ligne-bon-sortie" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ligne-bon-sortie/${ligneBonSortieEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ ligneBonSortie }: IRootState) => ({
  ligneBonSortieEntity: ligneBonSortie.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LigneBonSortieDetail);
