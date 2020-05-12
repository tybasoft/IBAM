import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './image.reducer';
import { IImage } from 'app/shared/model/image.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ImageDetail = (props: IImageDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { imageEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.image.detail.title">Image</Translate> [<b>{imageEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="titre">
              <Translate contentKey="ibamApp.image.titre">Titre</Translate>
            </span>
          </dt>
          <dd>{imageEntity.titre}</dd>
          <dt>
            <span id="path">
              <Translate contentKey="ibamApp.image.path">Path</Translate>
            </span>
          </dt>
          <dd>{imageEntity.path}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.image.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{imageEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.image.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={imageEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/image" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/image/${imageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ image }: IRootState) => ({
  imageEntity: image.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail);
