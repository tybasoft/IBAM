import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './unite.reducer';
import { IUnite } from 'app/shared/model/unite.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUniteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UniteUpdate = (props: IUniteUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { uniteEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/unite' + props.location.search);
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
        ...uniteEntity,
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
          <h2 id="ibamApp.unite.home.createOrEditLabel">
            <Translate contentKey="ibamApp.unite.home.createOrEditLabel">Create or edit a Unite</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : uniteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="unite-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="unite-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="libelleLabel" for="unite-libelle">
                  <Translate contentKey="ibamApp.unite.libelle">Libelle</Translate>
                </Label>
                <AvField
                  id="unite-libelle"
                  type="text"
                  name="libelle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="symboleLabel" for="unite-symbole">
                  <Translate contentKey="ibamApp.unite.symbole">Symbole</Translate>
                </Label>
                <AvField
                  id="unite-symbole"
                  type="text"
                  name="symbole"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="unite-description">
                  <Translate contentKey="ibamApp.unite.description">Description</Translate>
                </Label>
                <AvField id="unite-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="unite-userModif">
                  <Translate contentKey="ibamApp.unite.userModif">User Modif</Translate>
                </Label>
                <AvField id="unite-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="unite-dateModif">
                  <Translate contentKey="ibamApp.unite.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="unite-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/unite" replace color="info">
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
  uniteEntity: storeState.unite.entity,
  loading: storeState.unite.loading,
  updating: storeState.unite.updating,
  updateSuccess: storeState.unite.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UniteUpdate);
