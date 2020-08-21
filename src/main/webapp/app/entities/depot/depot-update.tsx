import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './depot.reducer';
import { IDepot } from 'app/shared/model/depot.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDepotUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DepotUpdate = (props: IDepotUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { depotEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/depot');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...depotEntity,
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
          <h2 id="ibamApp.depot.home.createOrEditLabel">
            <Translate contentKey="ibamApp.depot.home.createOrEditLabel">Create or edit a Depot</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : depotEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="depot-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="depot-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="libelleLabel" for="depot-libelle">
                  <Translate contentKey="ibamApp.depot.libelle">Libelle</Translate>
                </Label>
                <AvField
                  id="depot-libelle"
                  type="text"
                  name="libelle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="adresseLabel" for="depot-adresse">
                  <Translate contentKey="ibamApp.depot.adresse">Adresse</Translate>
                </Label>
                <AvField
                  id="depot-adresse"
                  type="text"
                  name="adresse"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="telLabel" for="depot-tel">
                  <Translate contentKey="ibamApp.depot.tel">Tel</Translate>
                </Label>
                <AvField id="depot-tel" type="text" name="tel" />
              </AvGroup>
              <AvGroup>
                <Label id="villeLabel" for="depot-ville">
                  <Translate contentKey="ibamApp.depot.ville">Ville</Translate>
                </Label>
                <AvField id="depot-ville" type="text" name="ville" />
              </AvGroup>
              <AvGroup>
                <Label id="paysLabel" for="depot-pays">
                  <Translate contentKey="ibamApp.depot.pays">Pays</Translate>
                </Label>
                <AvField id="depot-pays" type="text" name="pays" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/depot" replace color="info">
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
  depotEntity: storeState.depot.entity,
  loading: storeState.depot.loading,
  updating: storeState.depot.updating,
  updateSuccess: storeState.depot.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DepotUpdate);
