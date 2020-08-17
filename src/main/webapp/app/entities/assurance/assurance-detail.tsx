import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './assurance.reducer';
import { IAssurance } from 'app/shared/model/assurance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAssuranceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AssuranceDetail = (props: IAssuranceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { assuranceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.assurance.detail.title">Assurance</Translate> [<b>{assuranceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="dateDebut">
              <Translate contentKey="ibamApp.assurance.dateDebut">Date Debut</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={assuranceEntity.dateDebut} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateFin">
              <Translate contentKey="ibamApp.assurance.dateFin">Date Fin</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={assuranceEntity.dateFin} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="agence">
              <Translate contentKey="ibamApp.assurance.agence">Agence</Translate>
            </span>
          </dt>
          <dd>{assuranceEntity.agence}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.assurance.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{assuranceEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.assurance.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={assuranceEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="ibamApp.assurance.materiel">Materiel</Translate>
          </dt>
          <dd>{assuranceEntity.materiel ? assuranceEntity.materiel.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/assurance" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/assurance/${assuranceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ assurance }: IRootState) => ({
  assuranceEntity: assurance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AssuranceDetail);
