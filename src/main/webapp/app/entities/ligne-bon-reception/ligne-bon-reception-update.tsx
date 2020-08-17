import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBonReception } from 'app/shared/model/bon-reception.model';
import { getEntities as getBonReceptions } from 'app/entities/bon-reception/bon-reception.reducer';
import { IMateriau } from 'app/shared/model/materiau.model';
import { getEntities as getMateriaus } from 'app/entities/materiau/materiau.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ligne-bon-reception.reducer';
import { ILigneBonReception } from 'app/shared/model/ligne-bon-reception.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILigneBonReceptionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LigneBonReceptionUpdate = (props: ILigneBonReceptionUpdateProps) => {
  const [bonReceptionId, setBonReceptionId] = useState('0');
  const [materiauId, setMateriauId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ligneBonReceptionEntity, bonReceptions, materiaus, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/ligne-bon-reception' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBonReceptions();
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
        ...ligneBonReceptionEntity,
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
          <h2 id="ibamApp.ligneBonReception.home.createOrEditLabel">
            <Translate contentKey="ibamApp.ligneBonReception.home.createOrEditLabel">Create or edit a LigneBonReception</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ligneBonReceptionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="ligne-bon-reception-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="ligne-bon-reception-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="quantiteLabel" for="ligne-bon-reception-quantite">
                  <Translate contentKey="ibamApp.ligneBonReception.quantite">Quantite</Translate>
                </Label>
                <AvField
                  id="ligne-bon-reception-quantite"
                  type="text"
                  name="quantite"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="prixHtLabel" for="ligne-bon-reception-prixHt">
                  <Translate contentKey="ibamApp.ligneBonReception.prixHt">Prix Ht</Translate>
                </Label>
                <AvField id="ligne-bon-reception-prixHt" type="text" name="prixHt" />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="ligne-bon-reception-userModif">
                  <Translate contentKey="ibamApp.ligneBonReception.userModif">User Modif</Translate>
                </Label>
                <AvField id="ligne-bon-reception-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="ligne-bon-reception-dateModif">
                  <Translate contentKey="ibamApp.ligneBonReception.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="ligne-bon-reception-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="ligne-bon-reception-bonReception">
                  <Translate contentKey="ibamApp.ligneBonReception.bonReception">Bon Reception</Translate>
                </Label>
                <AvInput id="ligne-bon-reception-bonReception" type="select" className="form-control" name="bonReception.id">
                  <option value="" key="0" />
                  {bonReceptions
                    ? bonReceptions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="ligne-bon-reception-materiau">
                  <Translate contentKey="ibamApp.ligneBonReception.materiau">Materiau</Translate>
                </Label>
                <AvInput id="ligne-bon-reception-materiau" type="select" className="form-control" name="materiau.id">
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
              <Button tag={Link} id="cancel-save" to="/ligne-bon-reception" replace color="info">
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
  bonReceptions: storeState.bonReception.entities,
  materiaus: storeState.materiau.entities,
  ligneBonReceptionEntity: storeState.ligneBonReception.entity,
  loading: storeState.ligneBonReception.loading,
  updating: storeState.ligneBonReception.updating,
  updateSuccess: storeState.ligneBonReception.updateSuccess
});

const mapDispatchToProps = {
  getBonReceptions,
  getMateriaus,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LigneBonReceptionUpdate);
