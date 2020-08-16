import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './compte-rendu.reducer';
import { ICompteRendu } from 'app/shared/model/compte-rendu.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompteRenduDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompteRenduDetail = (props: ICompteRenduDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { compteRenduEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.compteRendu.detail.title">CompteRendu</Translate> [<b>{compteRenduEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="titre">
              <Translate contentKey="ibamApp.compteRendu.titre">Titre</Translate>
            </span>
          </dt>
          <dd>{compteRenduEntity.titre}</dd>
          <dt>
            <span id="contenu">
              <Translate contentKey="ibamApp.compteRendu.contenu">Contenu</Translate>
            </span>
          </dt>
          <dd>{compteRenduEntity.contenu}</dd>
          <dt>
            <span id="filePath">
              <Translate contentKey="ibamApp.compteRendu.filePath">File Path</Translate>
            </span>
          </dt>
          <dd>{compteRenduEntity.filePath}</dd>
          <dt>
            <Translate contentKey="ibamApp.compteRendu.employe">Employe</Translate>
          </dt>
          <dd>{compteRenduEntity.employe ? compteRenduEntity.employe.nom : ''}</dd>
        </dl>
        <Button tag={Link} to="/compte-rendu" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/compte-rendu/${compteRenduEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ compteRendu }: IRootState) => ({
  compteRenduEntity: compteRendu.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompteRenduDetail);
