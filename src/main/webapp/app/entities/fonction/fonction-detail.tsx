import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './fonction.reducer';
import { IFonction } from 'app/shared/model/fonction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFonctionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FonctionDetail = (props: IFonctionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fonctionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.fonction.detail.title">Fonction</Translate> [<b>{fonctionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="libelle">
              <Translate contentKey="ibamApp.fonction.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{fonctionEntity.libelle}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ibamApp.fonction.description">Description</Translate>
            </span>
          </dt>
          <dd>{fonctionEntity.description}</dd>
          <dt>
            <span id="competences">
              <Translate contentKey="ibamApp.fonction.competences">Competences</Translate>
            </span>
          </dt>
          <dd>{fonctionEntity.competences}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.fonction.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{fonctionEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.fonction.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={fonctionEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/fonction" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fonction/${fonctionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fonction }: IRootState) => ({
  fonctionEntity: fonction.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FonctionDetail);
