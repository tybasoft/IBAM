import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './marque.reducer';
import { IMarque } from 'app/shared/model/marque.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMarqueDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MarqueDetail = (props: IMarqueDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { marqueEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.marque.detail.title">Marque</Translate> [<b>{marqueEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="libelle">
              <Translate contentKey="ibamApp.marque.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{marqueEntity.libelle}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ibamApp.marque.description">Description</Translate>
            </span>
          </dt>
          <dd>{marqueEntity.description}</dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.marque.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{marqueEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.marque.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={marqueEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
        </dl>
        <Button tag={Link} to="/marque" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/marque/${marqueEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ marque }: IRootState) => ({
  marqueEntity: marque.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MarqueDetail);
