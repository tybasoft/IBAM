import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './fonction.reducer';
import { IFonction } from 'app/shared/model/fonction.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFonctionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FonctionUpdate = (props: IFonctionUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fonctionEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/fonction' + props.location.search);
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
        ...fonctionEntity,
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
          <h2 id="ibamApp.fonction.home.createOrEditLabel">
            <Translate contentKey="ibamApp.fonction.home.createOrEditLabel">Create or edit a Fonction</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fonctionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="fonction-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="fonction-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="libelleLabel" for="fonction-libelle">
                  <Translate contentKey="ibamApp.fonction.libelle">Libelle</Translate>
                </Label>
                <AvField
                  id="fonction-libelle"
                  type="text"
                  name="libelle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="fonction-description">
                  <Translate contentKey="ibamApp.fonction.description">Description</Translate>
                </Label>
                <AvField id="fonction-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="competencesLabel" for="fonction-competences">
                  <Translate contentKey="ibamApp.fonction.competences">Competences</Translate>
                </Label>
                <AvField id="fonction-competences" type="text" name="competences" />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="fonction-userModif">
                  <Translate contentKey="ibamApp.fonction.userModif">User Modif</Translate>
                </Label>
                <AvField id="fonction-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="fonction-dateModif">
                  <Translate contentKey="ibamApp.fonction.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="fonction-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/fonction" replace color="info">
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
  fonctionEntity: storeState.fonction.entity,
  loading: storeState.fonction.loading,
  updating: storeState.fonction.updating,
  updateSuccess: storeState.fonction.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FonctionUpdate);
