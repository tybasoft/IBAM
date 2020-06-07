import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './transfert-materiel.reducer';
import { ITransfertMateriel } from 'app/shared/model/transfert-materiel.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransfertMaterielDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransfertMaterielDetail = (props: ITransfertMaterielDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { transfertMaterielEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.transfertMateriel.detail.title">TransfertMateriel</Translate> [<b>{transfertMaterielEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="reference">
              <Translate contentKey="ibamApp.transfertMateriel.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{transfertMaterielEntity.reference}</dd>
          <dt>
            <span id="dateTransfert">
              <Translate contentKey="ibamApp.transfertMateriel.dateTransfert">Date Transfert</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={transfertMaterielEntity.dateTransfert} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="commentaire">
              <Translate contentKey="ibamApp.transfertMateriel.commentaire">Commentaire</Translate>
            </span>
          </dt>
          <dd>{transfertMaterielEntity.commentaire}</dd>
          {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.transfertMateriel.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{transfertMaterielEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.transfertMateriel.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={transfertMaterielEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
          <dt>
            <Translate contentKey="ibamApp.transfertMateriel.materiel">Materiel</Translate>
          </dt>
          <dd>{transfertMaterielEntity.materiel ? transfertMaterielEntity.materiel.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.transfertMateriel.projet">Projet</Translate>
          </dt>
          <dd>{transfertMaterielEntity.projet ? transfertMaterielEntity.projet.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/transfert-materiel" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/transfert-materiel/${transfertMaterielEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ transfertMateriel }: IRootState) => ({
  transfertMaterielEntity: transfertMateriel.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransfertMaterielDetail);
