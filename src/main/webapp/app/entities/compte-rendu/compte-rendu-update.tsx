import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmploye } from 'app/shared/model/employe.model';
import { getEntities as getEmployes } from 'app/entities/employe/employe.reducer';
import { getEntity, updateEntity, createEntity, reset } from './compte-rendu.reducer';
import { ICompteRendu } from 'app/shared/model/compte-rendu.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompteRenduUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompteRenduUpdate = (props: ICompteRenduUpdateProps) => {
  const [employeId, setEmployeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { compteRenduEntity, employes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/compte-rendu' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmployes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...compteRenduEntity,
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
          <h2 id="ibamApp.compteRendu.home.createOrEditLabel">
            <Translate contentKey="ibamApp.compteRendu.home.createOrEditLabel">Create or edit a CompteRendu</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : compteRenduEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="compte-rendu-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="compte-rendu-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titreLabel" for="compte-rendu-titre">
                  <Translate contentKey="ibamApp.compteRendu.titre">Titre</Translate>
                </Label>
                <AvField id="compte-rendu-titre" type="text" name="titre" />
              </AvGroup>
              <AvGroup>
                <Label id="contenuLabel" for="compte-rendu-contenu">
                  <Translate contentKey="ibamApp.compteRendu.contenu">Contenu</Translate>
                </Label>
                <AvField id="compte-rendu-contenu" type="text" name="contenu" />
              </AvGroup>
              <AvGroup>
                <Label for="compte-rendu-employe">
                  <Translate contentKey="ibamApp.compteRendu.employe">Employe</Translate>
                </Label>
                <AvInput id="compte-rendu-employe" type="select" className="form-control" name="employe.id">
                  <option value="" key="0" />
                  {employes
                    ? employes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nom}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/compte-rendu" replace color="info">
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
  compteRenduEntity: storeState.compteRendu.entity,
  loading: storeState.compteRendu.loading,
  updating: storeState.compteRendu.updating,
  updateSuccess: storeState.compteRendu.updateSuccess,
});

const mapDispatchToProps = {
  getEmployes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompteRenduUpdate);
