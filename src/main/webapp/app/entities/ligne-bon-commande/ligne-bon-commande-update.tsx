import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMateriau } from 'app/shared/model/materiau.model';
import { getEntities as getMateriaus } from 'app/entities/materiau/materiau.reducer';
import { IMateriel } from 'app/shared/model/materiel.model';
import { getEntities as getMateriels } from 'app/entities/materiel/materiel.reducer';
import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { getEntities as getBonCommandes } from 'app/entities/bon-commande/bon-commande.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ligne-bon-commande.reducer';
import { ILigneBonCommande } from 'app/shared/model/ligne-bon-commande.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILigneBonCommandeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LigneBonCommandeUpdate = (props: ILigneBonCommandeUpdateProps) => {
  const [materiauId, setMateriauId] = useState('0');
  const [materielId, setMaterielId] = useState('0');
  const [bonCommandeId, setBonCommandeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ligneBonCommandeEntity, materiaus, materiels, bonCommandes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/ligne-bon-commande' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMateriaus();
    props.getMateriels();
    props.getBonCommandes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...ligneBonCommandeEntity,
        ...values,
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
          <h2 id="ibamApp.ligneBonCommande.home.createOrEditLabel">
            <Translate contentKey="ibamApp.ligneBonCommande.home.createOrEditLabel">Create or edit a LigneBonCommande</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ligneBonCommandeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="ligne-bon-commande-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="ligne-bon-commande-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="quantiteLabel" for="ligne-bon-commande-quantite">
                  <Translate contentKey="ibamApp.ligneBonCommande.quantite">Quantite</Translate>
                </Label>
                <AvField
                  id="ligne-bon-commande-quantite"
                  type="text"
                  name="quantite"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="ligne-bon-commande-materiau">
                  <Translate contentKey="ibamApp.ligneBonCommande.materiau">Materiau</Translate>
                </Label>
                <AvInput id="ligne-bon-commande-materiau" type="select" className="form-control" name="materiau.id">
                  <option value="" key="0" />
                  {materiaus
                    ? materiaus.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="ligne-bon-commande-materiel">
                  <Translate contentKey="ibamApp.ligneBonCommande.materiel">Materiel</Translate>
                </Label>
                <AvInput id="ligne-bon-commande-materiel" type="select" className="form-control" name="materiel.id">
                  <option value="" key="0" />
                  {materiels
                    ? materiels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="ligne-bon-commande-bonCommande">
                  <Translate contentKey="ibamApp.ligneBonCommande.bonCommande">Bon Commande</Translate>
                </Label>
                <AvInput
                  id="ligne-bon-commande-bonCommande"
                  type="select"
                  className="form-control"
                  name="bonCommande.id"
                  value={isNew ? bonCommandes[0] && bonCommandes[0].id : ligneBonCommandeEntity.bonCommande?.id}
                  required
                >
                  {bonCommandes
                    ? bonCommandes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/ligne-bon-commande" replace color="info">
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
  materiaus: storeState.materiau.entities,
  materiels: storeState.materiel.entities,
  bonCommandes: storeState.bonCommande.entities,
  ligneBonCommandeEntity: storeState.ligneBonCommande.entity,
  loading: storeState.ligneBonCommande.loading,
  updating: storeState.ligneBonCommande.updating,
  updateSuccess: storeState.ligneBonCommande.updateSuccess,
});

const mapDispatchToProps = {
  getMateriaus,
  getMateriels,
  getBonCommandes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LigneBonCommandeUpdate);
