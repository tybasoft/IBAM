import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './equipe.reducer';
import { IEquipe } from 'app/shared/model/equipe.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEquipeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EquipeDetail = (props: IEquipeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { equipeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.equipe.detail.title">Equipe</Translate> [<b>{equipeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="libelle">
              <Translate contentKey="ibamApp.equipe.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{equipeEntity.libelle}</dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.equipe.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{equipeEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.equipe.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={equipeEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
          <dt>
            <Translate contentKey="ibamApp.equipe.projet">Projet</Translate>
          </dt>
          <dd>{equipeEntity.projet ? equipeEntity.projet.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.equipe.equipe">Equipe</Translate>
          </dt>
          <dd>{equipeEntity.equipe ? equipeEntity.equipe.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/equipe" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/equipe/${equipeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ equipe }: IRootState) => ({
  equipeEntity: equipe.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EquipeDetail);
