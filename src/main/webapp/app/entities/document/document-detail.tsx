import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DocumentDetail = (props: IDocumentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { documentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.document.detail.title">Document</Translate> [<b>{documentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="titre">
              <Translate contentKey="ibamApp.document.titre">Titre</Translate>
            </span>
          </dt>
          <dd>{documentEntity.titre}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="ibamApp.document.type">Type</Translate>
            </span>
          </dt>
          <dd>{documentEntity.type}</dd>
          <dt>
            <span id="path">
              <Translate contentKey="ibamApp.document.path">Path</Translate>
            </span>
          </dt>
          <dd>{documentEntity.path}</dd>
          <dt>
            <span id="commentaire">
              <Translate contentKey="ibamApp.document.commentaire">Commentaire</Translate>
            </span>
          </dt>
          <dd>{documentEntity.commentaire}</dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.document.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{documentEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.document.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={documentEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
        </dl>
        <Button tag={Link} to="/document" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/document/${documentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ document }: IRootState) => ({
  documentEntity: document.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetail);
