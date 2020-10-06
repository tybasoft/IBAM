import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ligne-bon-commande.reducer';
import { ILigneBonCommande } from 'app/shared/model/ligne-bon-commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILigneBonCommandeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LigneBonCommandeDetail = (props: ILigneBonCommandeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { ligneBonCommandeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.ligneBonCommande.detail.title">LigneBonCommande</Translate> [<b>{ligneBonCommandeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantite">
              <Translate contentKey="ibamApp.ligneBonCommande.quantite">Quantite</Translate>
            </span>
          </dt>
          <dd>{ligneBonCommandeEntity.quantite}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.ligneBonCommande.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{ligneBonCommandeEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.ligneBonCommande.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            {ligneBonCommandeEntity.dateModif ? (
              <TextFormat value={ligneBonCommandeEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="ibamApp.ligneBonCommande.materiau">Materiau</Translate>
          </dt>
          <dd>{ligneBonCommandeEntity.materiau ? ligneBonCommandeEntity.materiau.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.ligneBonCommande.materiel">Materiel</Translate>
          </dt>
          <dd>{ligneBonCommandeEntity.materiel ? ligneBonCommandeEntity.materiel.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.ligneBonCommande.bonCommande">Bon Commande</Translate>
          </dt>
          <dd>{ligneBonCommandeEntity.bonCommande ? ligneBonCommandeEntity.bonCommande.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/ligne-bon-commande" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ligne-bon-commande/${ligneBonCommandeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ ligneBonCommande }: IRootState) => ({
  ligneBonCommandeEntity: ligneBonCommande.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LigneBonCommandeDetail);
