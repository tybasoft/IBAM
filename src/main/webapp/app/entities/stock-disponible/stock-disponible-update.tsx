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
import { getEntity, updateEntity, createEntity, reset } from './stock-disponible.reducer';
import { IStockDisponible } from 'app/shared/model/stock-disponible.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStockDisponibleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StockDisponibleUpdate = (props: IStockDisponibleUpdateProps) => {
  const [materielId, setMaterielId] = useState('0');
  const [materiauId, setMateriauId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { stockDisponibleEntity, materiels, materiaus, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/stock-disponible' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMateriels();
    props.getMateriaus();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...stockDisponibleEntity,
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
          <h2 id="ibamApp.stockDisponible.home.createOrEditLabel">
            <Translate contentKey="ibamApp.stockDisponible.home.createOrEditLabel">Create or edit a StockDisponible</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : stockDisponibleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="stock-disponible-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="stock-disponible-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateStockLabel" for="stock-disponible-dateStock">
                  <Translate contentKey="ibamApp.stockDisponible.dateStock">Date Stock</Translate>
                </Label>
                <AvField
                  id="stock-disponible-dateStock"
                  type="date"
                  className="form-control"
                  name="dateStock"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="stock-disponible-userModif">
                  <Translate contentKey="ibamApp.stockDisponible.userModif">User Modif</Translate>
                </Label>
                <AvField id="stock-disponible-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="remarqueLabel" for="stock-disponible-remarque">
                  <Translate contentKey="ibamApp.stockDisponible.remarque">Remarque</Translate>
                </Label>
                <AvField id="stock-disponible-remarque" type="text" name="remarque" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="stock-disponible-dateModif">
                  <Translate contentKey="ibamApp.stockDisponible.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="stock-disponible-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label id="quantiteLabel" for="stock-disponible-quantite">
                  <Translate contentKey="ibamApp.stockDisponible.quantite">Quantite</Translate>
                </Label>
                <AvField id="stock-disponible-quantite" type="text" name="quantite" />
              </AvGroup>
              <AvGroup>
                <Label for="stock-disponible-materiel">
                  <Translate contentKey="ibamApp.stockDisponible.materiel">Materiel</Translate>
                </Label>
                <AvInput id="stock-disponible-materiel" type="select" className="form-control" name="materiel.id">
                  <option value="" key="0" />
                  {materiels
                    ? materiels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="stock-disponible-materiau">
                  <Translate contentKey="ibamApp.stockDisponible.materiau">Materiau</Translate>
                </Label>
                <AvInput id="stock-disponible-materiau" type="select" className="form-control" name="materiau.id">
                  <option value="" key="0" />
                  {materiaus
                    ? materiaus.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/stock-disponible" replace color="info">
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
  stockDisponibleEntity: storeState.stockDisponible.entity,
  loading: storeState.stockDisponible.loading,
  updating: storeState.stockDisponible.updating,
  updateSuccess: storeState.stockDisponible.updateSuccess,
});

const mapDispatchToProps = {
  getMateriels,
  getMateriaus,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StockDisponibleUpdate);
