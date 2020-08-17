import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './entreprise.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEntrepriseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EntrepriseDetail = (props: IEntrepriseDetailProps) => {
  const { entrepriseEntity, imageEntity } = props;

  useEffect(() => {
    props.resetImage();
    props.getEntity(props.match.params.id);
  }, []);

  useEffect(() => {
    if (entrepriseEntity.id !== undefined) {
      if (entrepriseEntity.id.toString() === props.match.params.id && entrepriseEntity.image !== null) {
        props.getImage(entrepriseEntity.image.id);
      }
    }
  }, [entrepriseEntity]);

  return (
    <Row>
      <Col md="6">
        <h2>
          <Translate contentKey="ibamApp.entreprise.detail.title">Entreprise</Translate> [<b>{entrepriseEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="entiteJuridique">
              <Translate contentKey="ibamApp.entreprise.entiteJuridique">Entite Juridique</Translate>
            </span>
          </dt>
          <dd>{entrepriseEntity.entiteJuridique}</dd>
          <dt>
            <span id="nomCommercial">
              <Translate contentKey="ibamApp.entreprise.nomCommercial">Nom Commercial</Translate>
            </span>
          </dt>
          <dd>{entrepriseEntity.nomCommercial}</dd>
          <dt>
            <span id="adresse">
              <Translate contentKey="ibamApp.entreprise.adresse">Adresse</Translate>
            </span>
          </dt>
          <dd>{entrepriseEntity.adresse}</dd>
          <dt>
            <span id="capital">
              <Translate contentKey="ibamApp.entreprise.capital">Capital</Translate>
            </span>
          </dt>
          <dd>{entrepriseEntity.capital}</dd>
          <dt>
            <span id="direction">
              <Translate contentKey="ibamApp.entreprise.direction">Direction</Translate>
            </span>
          </dt>
          <dd>{entrepriseEntity.direction}</dd>
          <dt>
            <span id="activite">
              <Translate contentKey="ibamApp.entreprise.activite">Activite</Translate>
            </span>
          </dt>
          <dd>{entrepriseEntity.activite}</dd>
          <dt>
            <span id="telephone">
              <Translate contentKey="ibamApp.entreprise.telephone">Telephone</Translate>
            </span>
          </dt>
          <dd>{entrepriseEntity.telephone}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="ibamApp.entreprise.email">Email</Translate>
            </span>
          </dt>
          <dd>{entrepriseEntity.email}</dd>
          {/*
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.entreprise.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{entrepriseEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.entreprise.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={entrepriseEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          */}
        </dl>
        <Button tag={Link} to="/entreprise" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/entreprise/${entrepriseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
      <Col md="6">
        {entrepriseEntity.image !== null ? (
          <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '80%', border: 'solid 1px' }} />
        ) : null}
      </Col>
    </Row>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  entrepriseEntity: storeState.entreprise.entity,
  imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EntrepriseDetail);
