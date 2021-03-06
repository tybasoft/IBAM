import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmploye } from 'app/shared/model/employe.model';
import { getEntities as getEmployes } from 'app/entities/employe/employe.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './avancement.reducer';
import { IAvancement } from 'app/shared/model/avancement.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAvancementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AvancementUpdate = (props: IAvancementUpdateProps) => {
  const [employeId, setEmployeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { avancementEntity, employes, loading, updating } = props;

  const { contenuCompteRendu } = avancementEntity;

  const handleClose = () => {
    props.history.push('/avancement' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmployes();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

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
                <Label id="titreCompteRenduLabel" for="avancement-titreCompteRendu">
                  <Translate contentKey="ibamApp.avancement.titreCompteRendu">Titre Compte Rendu</Translate>
                </Label>
                <AvField id="avancement-titreCompteRendu" type="text" name="titreCompteRendu" />
              </AvGroup>
              <AvGroup>
                <Label id="contenuCompteRenduLabel" for="avancement-contenuCompteRendu">
                  <Translate contentKey="ibamApp.avancement.contenuCompteRendu">Contenu Compte Rendu</Translate>
                </Label>
                <AvInput id="avancement-contenuCompteRendu" type="textarea" name="contenuCompteRendu" />
              </AvGroup>
              <AvGroup>
                <Label for="avancement-employe">
                  <Translate contentKey="ibamApp.avancement.employe">Employe</Translate>
                </Label>
                <AvInput id="avancement-employe" type="select" className="form-control" name="employe.id">
                  <option value="" key="0" />
                  {employes
                    ? employes.map(otherEntity => (
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
  employes: storeState.employe.entities,
  avancementEntity: storeState.avancement.entity,
  loading: storeState.avancement.loading,
  updating: storeState.avancement.updating,
  updateSuccess: storeState.avancement.updateSuccess,
});

const mapDispatchToProps = {
  getEmployes,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AvancementUpdate);
