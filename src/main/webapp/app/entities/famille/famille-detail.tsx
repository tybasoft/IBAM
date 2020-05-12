import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './famille.reducer';
import { IFamille } from 'app/shared/model/famille.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFamilleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FamilleDetail = (props: IFamilleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { familleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.famille.detail.title">Famille</Translate> [<b>{familleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="libelle">
              <Translate contentKey="ibamApp.famille.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{familleEntity.libelle}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ibamApp.famille.description">Description</Translate>
            </span>
          </dt>
          <dd>{familleEntity.description}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.famille.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{familleEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.famille.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={familleEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/famille" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/famille/${familleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ famille }: IRootState) => ({
  familleEntity: famille.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FamilleDetail);
