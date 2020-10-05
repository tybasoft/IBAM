import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bon-commande.reducer';
import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBonCommandeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BonCommandeDetail = (props: IBonCommandeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bonCommandeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.bonCommande.detail.title">BonCommande</Translate> [<b>{bonCommandeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="datePrevLiv">
              <Translate contentKey="ibamApp.bonCommande.datePrevLiv">Date Prev Liv</Translate>
            </span>
          </dt>
          <dd>
            {bonCommandeEntity.datePrevLiv ? (
              <TextFormat value={bonCommandeEntity.datePrevLiv} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="remarques">
              <Translate contentKey="ibamApp.bonCommande.remarques">Remarques</Translate>
            </span>
          </dt>
          <dd>{bonCommandeEntity.remarques}</dd>
          <dt>
            <span id="dateCreation">
              <Translate contentKey="ibamApp.bonCommande.dateCreation">Date Creation</Translate>
            </span>
          </dt>
          <dd>
            {bonCommandeEntity.dateCreation ? (
              <TextFormat value={bonCommandeEntity.dateCreation} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="valide">
              <Translate contentKey="ibamApp.bonCommande.valide">Valide</Translate>
            </span>
          </dt>
          <dd>{bonCommandeEntity.valide ? 'true' : 'false'}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.bonCommande.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{bonCommandeEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.bonCommande.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            {bonCommandeEntity.dateModif ? (
              <TextFormat value={bonCommandeEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="ibamApp.bonCommande.fournisseur">Fournisseur</Translate>
          </dt>
          <dd>{bonCommandeEntity.fournisseur ? bonCommandeEntity.fournisseur.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.bonCommande.projet">Projet</Translate>
          </dt>
          <dd>{bonCommandeEntity.projet ? bonCommandeEntity.projet.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/bon-commande" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bon-commande/${bonCommandeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bonCommande }: IRootState) => ({
  bonCommandeEntity: bonCommande.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonCommandeDetail);
