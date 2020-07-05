import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './type-materiel.reducer';
import { ITypeMateriel } from 'app/shared/model/type-materiel.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITypeMaterielUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TypeMaterielUpdate = (props: ITypeMaterielUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { typeMaterielEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/type-materiel');
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
        ...typeMaterielEntity,
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
          <h2 id="ibamApp.typeMateriel.home.createOrEditLabel">
            <Translate contentKey="ibamApp.typeMateriel.home.createOrEditLabel">Create or edit a TypeMateriel</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : typeMaterielEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="type-materiel-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="type-materiel-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeLabel" for="type-materiel-type">
                  <Translate contentKey="ibamApp.typeMateriel.type">Type</Translate>
                </Label>
                <AvField
                  id="type-materiel-type"
                  type="text"
                  name="type"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="type-materiel-userModif">
                  <Translate contentKey="ibamApp.typeMateriel.userModif">User Modif</Translate>
                </Label>
                <AvField id="type-materiel-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="type-materiel-dateModif">
                  <Translate contentKey="ibamApp.typeMateriel.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="type-materiel-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/type-materiel" replace color="info">
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
  typeMaterielEntity: storeState.typeMateriel.entity,
  loading: storeState.typeMateriel.loading,
  updating: storeState.typeMateriel.updating,
  updateSuccess: storeState.typeMateriel.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TypeMaterielUpdate);
