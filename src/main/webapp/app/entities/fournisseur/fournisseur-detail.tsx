import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './fournisseur.reducer';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFournisseurDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FournisseurDetail = (props: IFournisseurDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fournisseurEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.fournisseur.detail.title">Fournisseur</Translate> [<b>{fournisseurEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nomCommercial">
              <Translate contentKey="ibamApp.fournisseur.nomCommercial">Nom Commercial</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.nomCommercial}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="ibamApp.fournisseur.type">Type</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.type}</dd>
          <dt>
            <span id="fax">
              <Translate contentKey="ibamApp.fournisseur.fax">Fax</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.fax}</dd>
          <dt>
            <span id="nom">
              <Translate contentKey="ibamApp.fournisseur.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.nom}</dd>
          <dt>
            <span id="prenom">
              <Translate contentKey="ibamApp.fournisseur.prenom">Prenom</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.prenom}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="ibamApp.fournisseur.email">Email</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.email}</dd>
          <dt>
            <span id="tel">
              <Translate contentKey="ibamApp.fournisseur.tel">Tel</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.tel}</dd>
          <dt>
            <span id="adresse">
              <Translate contentKey="ibamApp.fournisseur.adresse">Adresse</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.adresse}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ibamApp.fournisseur.description">Description</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.description}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.fournisseur.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.fournisseur.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={fournisseurEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/fournisseur" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fournisseur/${fournisseurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fournisseur }: IRootState) => ({
  fournisseurEntity: fournisseur.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FournisseurDetail);
