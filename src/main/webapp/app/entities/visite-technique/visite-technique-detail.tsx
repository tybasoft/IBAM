import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './visite-technique.reducer';
import { IVisiteTechnique } from 'app/shared/model/visite-technique.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVisiteTechniqueDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VisiteTechniqueDetail = (props: IVisiteTechniqueDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { visiteTechniqueEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.visiteTechnique.detail.title">VisiteTechnique</Translate> [<b>{visiteTechniqueEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="reference">
              <Translate contentKey="ibamApp.visiteTechnique.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{visiteTechniqueEntity.reference}</dd>
          <dt>
            <span id="dateVisite">
              <Translate contentKey="ibamApp.visiteTechnique.dateVisite">Date Visite</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={visiteTechniqueEntity.dateVisite} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="remarque">
              <Translate contentKey="ibamApp.visiteTechnique.remarque">Remarque</Translate>
            </span>
          </dt>
          <dd>{visiteTechniqueEntity.remarque}</dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.visiteTechnique.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{visiteTechniqueEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.visiteTechnique.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={visiteTechniqueEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
          <dt>
            <Translate contentKey="ibamApp.visiteTechnique.materiel">Materiel</Translate>
          </dt>
          <dd>{visiteTechniqueEntity.materiel ? visiteTechniqueEntity.materiel.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/visite-technique" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/visite-technique/${visiteTechniqueEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ visiteTechnique }: IRootState) => ({
  visiteTechniqueEntity: visiteTechnique.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VisiteTechniqueDetail);
