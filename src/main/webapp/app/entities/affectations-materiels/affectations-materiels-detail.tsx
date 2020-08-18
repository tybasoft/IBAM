import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './affectations-materiels.reducer';
import { IAffectationsMateriels } from 'app/shared/model/affectations-materiels.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAffectationsMaterielsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AffectationsMaterielsDetail = (props: IAffectationsMaterielsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { affectationsMaterielsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.affectationsMateriels.detail.title">AffectationsMateriels</Translate> [
          <b>{affectationsMaterielsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="dateDebut">
              <Translate contentKey="ibamApp.affectationsMateriels.dateDebut">Date Debut</Translate>
            </span>
          </dt>
          <dd>
            {affectationsMaterielsEntity.dateDebut ? (
              <TextFormat value={affectationsMaterielsEntity.dateDebut} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateFin">
              <Translate contentKey="ibamApp.affectationsMateriels.dateFin">Date Fin</Translate>
            </span>
          </dt>
          <dd>
            {affectationsMaterielsEntity.dateFin ? (
              <TextFormat value={affectationsMaterielsEntity.dateFin} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="description">
              <Translate contentKey="ibamApp.affectationsMateriels.description">Description</Translate>
            </span>
          </dt>
          <dd>{affectationsMaterielsEntity.description}</dd>
          <dt>
            <Translate contentKey="ibamApp.affectationsMateriels.projet">Projet</Translate>
          </dt>
          <dd>{affectationsMaterielsEntity.projet ? affectationsMaterielsEntity.projet.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.affectationsMateriels.materiel">Materiel</Translate>
          </dt>
          <dd>{affectationsMaterielsEntity.materiel ? affectationsMaterielsEntity.materiel.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/affectations-materiels" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/affectations-materiels/${affectationsMaterielsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ affectationsMateriels }: IRootState) => ({
  affectationsMaterielsEntity: affectationsMateriels.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AffectationsMaterielsDetail);
