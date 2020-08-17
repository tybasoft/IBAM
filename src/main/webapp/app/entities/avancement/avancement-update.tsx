import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICompteRendu } from 'app/shared/model/compte-rendu.model';
import { getEntities as getCompteRendus } from 'app/entities/compte-rendu/compte-rendu.reducer';
import { getEntity, updateEntity, createEntity, reset } from './avancement.reducer';
import { IAvancement } from 'app/shared/model/avancement.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAvancementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AvancementUpdate = (props: IAvancementUpdateProps) => {
  const [compteRenduId, setCompteRenduId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { avancementEntity, compteRendus, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/avancement' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCompteRendus();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...avancementEntity,
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
          <h2 id="ibamApp.avancement.home.createOrEditLabel">
            <Translate contentKey="ibamApp.avancement.home.createOrEditLabel">Create or edit a Avancement</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : avancementEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="avancement-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="avancement-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="createdAtLabel" for="avancement-createdAt">
                  <Translate contentKey="ibamApp.avancement.createdAt">Created At</Translate>
                </Label>
                <AvField id="avancement-createdAt" type="date" className="form-control" name="createdAt" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="avancement-updatedAt">
                  <Translate contentKey="ibamApp.avancement.updatedAt">Updated At</Translate>
                </Label>
                <AvField id="avancement-updatedAt" type="date" className="form-control" name="updatedAt" />
              </AvGroup>
              <AvGroup>
                <Label for="avancement-compteRendu">
                  <Translate contentKey="ibamApp.avancement.compteRendu">Compte Rendu</Translate>
                </Label>
                <AvInput id="avancement-compteRendu" type="select" className="form-control" name="compteRendu.id">
                  <option value="" key="0" />
                  {compteRendus
                    ? compteRendus.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/avancement" replace color="info">
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
  compteRendus: storeState.compteRendu.entities,
  avancementEntity: storeState.avancement.entity,
  loading: storeState.avancement.loading,
  updating: storeState.avancement.updating,
  updateSuccess: storeState.avancement.updateSuccess,
});

const mapDispatchToProps = {
  getCompteRendus,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AvancementUpdate);
