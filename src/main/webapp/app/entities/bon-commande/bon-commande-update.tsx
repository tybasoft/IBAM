import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDepot } from 'app/shared/model/depot.model';
import { getEntities as getDepots } from 'app/entities/depot/depot.reducer';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { getEntities as getFournisseurs } from 'app/entities/fournisseur/fournisseur.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bon-commande.reducer';
import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBonCommandeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BonCommandeUpdate = (props: IBonCommandeUpdateProps) => {
  const [depotId, setDepotId] = useState('0');
  const [fournisseurId, setFournisseurId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bonCommandeEntity, depots, fournisseurs, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/bon-commande' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDepots();
    props.getFournisseurs();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...bonCommandeEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ibamApp.bonCommande.home.createOrEditLabel">
            <Translate contentKey="ibamApp.bonCommande.home.createOrEditLabel">Create or edit a BonCommande</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bonCommandeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="bon-commande-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="bon-commande-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="datePrevLivLabel" for="bon-commande-datePrevLiv">
                  <Translate contentKey="ibamApp.bonCommande.datePrevLiv">Date Prev Liv</Translate>
                </Label>
                <AvField id="bon-commande-datePrevLiv" type="date" className="form-control" name="datePrevLiv" />
              </AvGroup>
              <AvGroup>
                <Label id="remarquesLabel" for="bon-commande-remarques">
                  <Translate contentKey="ibamApp.bonCommande.remarques">Remarques</Translate>
                </Label>
                <AvField id="bon-commande-remarques" type="text" name="remarques" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreationLabel" for="bon-commande-dateCreation">
                  <Translate contentKey="ibamApp.bonCommande.dateCreation">Date Creation</Translate>
                </Label>
                <AvField
                  id="bon-commande-dateCreation"
                  type="date"
                  className="form-control"
                  name="dateCreation"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="valideLabel">
                  <AvInput id="bon-commande-valide" type="checkbox" className="form-check-input" name="valide" />
                  <Translate contentKey="ibamApp.bonCommande.valide">Valide</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="bon-commande-userModif">
                  <Translate contentKey="ibamApp.bonCommande.userModif">User Modif</Translate>
                </Label>
                <AvField id="bon-commande-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="bon-commande-dateModif">
                  <Translate contentKey="ibamApp.bonCommande.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="bon-commande-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="bon-commande-depot">
                  <Translate contentKey="ibamApp.bonCommande.depot">Depot</Translate>
                </Label>
                <AvInput id="bon-commande-depot" type="select" className="form-control" name="depot.id">
                  <option value="" key="0" />
                  {depots
                    ? depots.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="bon-commande-fournisseur">
                  <Translate contentKey="ibamApp.bonCommande.fournisseur">Fournisseur</Translate>
                </Label>
                <AvInput id="bon-commande-fournisseur" type="select" className="form-control" name="fournisseur.id">
                  <option value="" key="0" />
                  {fournisseurs
                    ? fournisseurs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nom}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/bon-commande" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  depots: storeState.depot.entities,
  fournisseurs: storeState.fournisseur.entities,
  bonCommandeEntity: storeState.bonCommande.entity,
  loading: storeState.bonCommande.loading,
  updating: storeState.bonCommande.updating,
  updateSuccess: storeState.bonCommande.updateSuccess
});

const mapDispatchToProps = {
  getDepots,
  getFournisseurs,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonCommandeUpdate);
