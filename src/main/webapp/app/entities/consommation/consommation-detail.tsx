import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './consommation.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';
import { IConsommation } from 'app/shared/model/consommation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConsommationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ConsommationDetail = (props: IConsommationDetailProps) => {
  const { consommationEntity, imageEntity } = props;

  useEffect(() => {
    props.resetImage();
    props.getEntity(props.match.params.id);
  }, []);

  useEffect(() => {
    if (consommationEntity.id !== undefined) {
      if (consommationEntity.id.toString() === props.match.params.id && consommationEntity.image !== null) {
        props.getImage(consommationEntity.image.id);
      }
    }
  }, [consommationEntity]);

  return (
    <Row>
      <Col md="6">
        <h2>
          <Translate contentKey="ibamApp.consommation.detail.title">Consommation</Translate> [<b>{consommationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="reference">
              <Translate contentKey="ibamApp.consommation.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{consommationEntity.reference}</dd>
          <dt>
            <span id="dateAchat">
              <Translate contentKey="ibamApp.consommation.dateAchat">Date Achat</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={consommationEntity.dateAchat} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="typeCarburant">
              <Translate contentKey="ibamApp.consommation.typeCarburant">Type Carburant</Translate>
            </span>
          </dt>
          <dd>{consommationEntity.typeCarburant}</dd>
          <dt>
            <span id="montant">
              <Translate contentKey="ibamApp.consommation.montant">Montant</Translate>
            </span>
          </dt>
          <dd>{consommationEntity.montant}</dd>
          <dt>
            <span id="quantite">
              <Translate contentKey="ibamApp.consommation.quantite">Quantite</Translate>
            </span>
          </dt>
          <dd>{consommationEntity.quantite}</dd>
          <dt>
            <span id="kilometrage">
              <Translate contentKey="ibamApp.consommation.kilometrage">Kilometrage</Translate>
            </span>
          </dt>
          <dd>{consommationEntity.kilometrage}</dd>
          <dt>
            <span id="commentaire">
              <Translate contentKey="ibamApp.consommation.commentaire">Commentaire</Translate>
            </span>
          </dt>
          <dd>{consommationEntity.commentaire}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.consommation.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{consommationEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.consommation.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={consommationEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="ibamApp.consommation.materiel">Materiel</Translate>
          </dt>
          <dd>{consommationEntity.materiel ? consommationEntity.materiel.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.consommation.fournisseur">Fournisseur</Translate>
          </dt>
          <dd>{consommationEntity.fournisseur ? consommationEntity.fournisseur.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/consommation" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/consommation/${consommationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
      <Col md="6">
        {consommationEntity.image !== null ? (
          <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '80%', border: 'solid 1px' }} />
        ) : null}
      </Col>
    </Row>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  consommationEntity: storeState.consommation.entity,
  imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConsommationDetail);
