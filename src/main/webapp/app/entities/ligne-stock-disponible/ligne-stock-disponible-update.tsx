import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMateriel } from 'app/shared/model/materiel.model';
import { getEntities as getMateriels } from 'app/entities/materiel/materiel.reducer';
import { IMateriau } from 'app/shared/model/materiau.model';
import { getEntities as getMateriaus } from 'app/entities/materiau/materiau.reducer';
import { IStockDisponible } from 'app/shared/model/stock-disponible.model';
import { getEntities as getStockDisponibles } from 'app/entities/stock-disponible/stock-disponible.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ligne-stock-disponible.reducer';
import { ILigneStockDisponible } from 'app/shared/model/ligne-stock-disponible.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILigneStockDisponibleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LigneStockDisponibleUpdate = (props: ILigneStockDisponibleUpdateProps) => {
  const [materielId, setMaterielId] = useState('0');
  const [materiauId, setMateriauId] = useState('0');
  const [stockDisponibleId, setStockDisponibleId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ligneStockDisponibleEntity, materiels, materiaus, stockDisponibles, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/ligne-stock-disponible' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMateriels();
    props.getMateriaus();
    props.getStockDisponibles();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...ligneStockDisponibleEntity,
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
          <h2 id="ibamApp.ligneStockDisponible.home.createOrEditLabel">
            <Translate contentKey="ibamApp.ligneStockDisponible.home.createOrEditLabel">Create or edit a LigneStockDisponible</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ligneStockDisponibleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="ligne-stock-disponible-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="ligne-stock-disponible-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="quantiteLabel" for="ligne-stock-disponible-quantite">
                  <Translate contentKey="ibamApp.ligneStockDisponible.quantite">Quantite</Translate>
                </Label>
                <AvField
                  id="ligne-stock-disponible-quantite"
                  type="text"
                  name="quantite"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="ligne-stock-disponible-type">
                  <Translate contentKey="ibamApp.ligneStockDisponible.type">Type</Translate>
                </Label>
                <AvField id="ligne-stock-disponible-type" type="text" name="type" />
              </AvGroup>
              <AvGroup>
                <Label for="ligne-stock-disponible-materiel">
                  <Translate contentKey="ibamApp.ligneStockDisponible.materiel">Materiel</Translate>
                </Label>
                <AvInput
                  id="ligne-stock-disponible-materiel"
                  type="select"
                  className="form-control"
                  name="materiel.id"
                  value={isNew ? materiels[0] && materiels[0].id : ligneStockDisponibleEntity.materiel?.id}
                  required
                >
                  {materiels
                    ? materiels.map(otherEntity => (
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
              <AvGroup>
                <Label for="ligne-stock-disponible-materiau">
                  <Translate contentKey="ibamApp.ligneStockDisponible.materiau">Materiau</Translate>
                </Label>
                <AvInput
                  id="ligne-stock-disponible-materiau"
                  type="select"
                  className="form-control"
                  name="materiau.id"
                  value={isNew ? materiaus[0] && materiaus[0].id : ligneStockDisponibleEntity.materiau?.id}
                  required
                >
                  {materiaus
                    ? materiaus.map(otherEntity => (
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
              <AvGroup>
                <Label for="ligne-stock-disponible-stockDisponible">
                  <Translate contentKey="ibamApp.ligneStockDisponible.stockDisponible">Stock Disponible</Translate>
                </Label>
                <AvInput
                  id="ligne-stock-disponible-stockDisponible"
                  type="select"
                  className="form-control"
                  name="stockDisponible.id"
                  value={isNew ? stockDisponibles[0] && stockDisponibles[0].id : ligneStockDisponibleEntity.stockDisponible?.id}
                  required
                >
                  {stockDisponibles
                    ? stockDisponibles.map(otherEntity => (
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
              <Button tag={Link} id="cancel-save" to="/ligne-stock-disponible" replace color="info">
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
  materiels: storeState.materiel.entities,
  materiaus: storeState.materiau.entities,
  stockDisponibles: storeState.stockDisponible.entities,
  ligneStockDisponibleEntity: storeState.ligneStockDisponible.entity,
  loading: storeState.ligneStockDisponible.loading,
  updating: storeState.ligneStockDisponible.updating,
  updateSuccess: storeState.ligneStockDisponible.updateSuccess,
});

const mapDispatchToProps = {
  getMateriels,
  getMateriaus,
  getStockDisponibles,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LigneStockDisponibleUpdate);
