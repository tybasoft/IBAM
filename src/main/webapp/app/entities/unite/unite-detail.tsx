import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './unite.reducer';
import { IUnite } from 'app/shared/model/unite.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUniteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UniteDetail = (props: IUniteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { uniteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.unite.detail.title">Unite</Translate> [<b>{uniteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="libelle">
              <Translate contentKey="ibamApp.unite.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{uniteEntity.libelle}</dd>
          <dt>
            <span id="symbole">
              <Translate contentKey="ibamApp.unite.symbole">Symbole</Translate>
            </span>
          </dt>
          <dd>{uniteEntity.symbole}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ibamApp.unite.description">Description</Translate>
            </span>
          </dt>
          <dd>{uniteEntity.description}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.unite.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{uniteEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.unite.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={uniteEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/unite" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/unite/${uniteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ unite }: IRootState) => ({
  uniteEntity: unite.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UniteDetail);
